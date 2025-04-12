import { auth } from "./firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

export async function signUpWithEmail(email: string, password: string) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return { success: true, user: userCredential.user };
  } catch (error) {
    console.error("Error signing up:", error);
    return { success: false, error };
  }
}