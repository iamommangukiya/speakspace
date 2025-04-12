"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { 
  User, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  GoogleAuthProvider,
  updateProfile
} from "firebase/auth";
import { auth, googleProvider, db, storage } from "@/lib/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<User>;
  signupWithEmail: (email: string, password: string) => Promise<User>; // Updated return type
  signInWithGoogle: () => Promise<User | null>;
  signInWithGoogleRedirect: () => Promise<void>;
  logout: () => Promise<void>;
  updateUserProfile: (data: { displayName?: string, photoURL?: string }) => Promise<void>;
  uploadProfilePicture: (file: File) => Promise<string>;
  error: string | null;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => { throw new Error("Login function not implemented"); },
  signupWithEmail: async () => { throw new Error("Signup function not implemented"); }, // Updated default
  signInWithGoogle: async () => { throw new Error("Google sign-in not implemented"); },
  signInWithGoogleRedirect: async () => {},
  logout: async () => {},
  updateUserProfile: async () => {},
  uploadProfilePicture: async () => { return ""; },
  error: null,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setIsLoading(false);
    });

    // Check for redirect result
    const checkRedirectResult = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result) {
          setUser(result.user);
          
          // Create or update user document in Firestore
          const userRef = doc(db, "users", result.user.uid);
          const userDoc = await getDoc(userRef);
          
          if (!userDoc.exists()) {
            await setDoc(userRef, {
              uid: result.user.uid,
              email: result.user.email,
              displayName: result.user.displayName,
              photoURL: result.user.photoURL,
              createdAt: new Date()
            });
          }
        }
      } catch (error) {
        console.error("Redirect result error:", error);
      }
    };
    
    checkRedirectResult();

    return () => unsubscribe();
  }, []);

  // Existing login function
  const login = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      return userCredential.user;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  // Existing Google sign-in function with popup
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      setUser(result.user);
      return result.user;
    } catch (error: any) {
      // Check if it's the popup-closed-by-user error
      if (error.code === 'auth/popup-closed-by-user') {
        console.log('Sign-in popup was closed before completing authentication');
        // Don't throw for this specific error - it's a user action, not a failure
        return null;
      }
      
      console.error("Google sign-in error:", error);
      setError(error.message);
      throw error;
    }
  };

  // New Google sign-in function with redirect
  const signInWithGoogleRedirect = async () => {
    try {
      await signInWithRedirect(auth, googleProvider);
      // The page will redirect to Google and then back to your app
      // The result will be handled in the useEffect above
    } catch (error: any) {
      console.error("Google redirect sign-in error:", error);
      setError(error.message);
      throw error;
    }
  };

  const signupWithEmail = async (email: string, password: string) => {
    setError(null);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const newUser = userCredential.user;
      
      // Create user document in Firestore
      const userRef = doc(db, "users", newUser.uid);
      await setDoc(userRef, {
        uid: newUser.uid,
        email: newUser.email,
        createdAt: new Date()
      });
      
      setUser(newUser);
      return newUser;
    } catch (error: any) {
      setError(error.message);
      throw error;
    }
  };

  const logout = async () => {
    setError(null);
    try {
      await signOut(auth);
    } catch (error: any) {
      setError(error.message);
      throw error;
    }
  };

  // Add update profile function
  const updateUserProfile = async (data: { displayName?: string, photoURL?: string }) => {
    if (!user) throw new Error("No user logged in");
    
    try {
      // Update Firebase Auth profile
      await updateProfile(user, data);
      
      // Update Firestore user document
      const userRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userRef);
      
      if (userDoc.exists()) {
        await setDoc(userRef, { ...userDoc.data(), ...data }, { merge: true });
      } else {
        await setDoc(userRef, {
          uid: user.uid,
          email: user.email,
          ...data
        });
      }
      
      // Force refresh the user object
      setUser({ ...user });
    } catch (error: any) {
      console.error("Error updating profile:", error);
      setError(error.message);
      throw error;
    }
  };

  // Add profile picture upload function
  const uploadProfilePicture = async (file: File) => {
    if (!user) throw new Error("No user logged in");
    
    try {
      // Create a reference to the user's profile picture in Firebase Storage
      const storageRef = ref(storage, `profile_pictures/${user.uid}`);
      
      // Upload the file
      await uploadBytes(storageRef, file);
      
      // Get the download URL
      const downloadURL = await getDownloadURL(storageRef);
      
      return downloadURL;
    } catch (error: any) {
      console.error("Error uploading profile picture:", error);
      setError(error.message);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        signInWithGoogle,
        signInWithGoogleRedirect, // Add the new method to the context
        signupWithEmail,
        logout,
        updateUserProfile,
        uploadProfilePicture,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
