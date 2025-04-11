"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { MainNav } from "@/components/main-nav"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Loader2, Save, X } from "lucide-react"
import { useAuth } from "@/components/auth-provider"
import { doc, getDoc, setDoc } from "firebase/firestore"
import { db, storage } from "@/lib/firebase"
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage"
import { updateProfile } from "firebase/auth"
import { uploadImage } from "@/lib/cloudinary";
import { deleteImage } from "@/lib/cloudinary";

export default function EditProfile() {
  const { user, isLoading: authLoading } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [isFetching, setIsFetching] = useState(true)
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    bio: "",
    skills: "",
    website: "",
    photoURL: ""
  })

  // Initialize form with user data from Firestore
  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) return
      
      try {
        setIsFetching(true)
        // Get user document from Firestore
        const userDoc = await getDoc(doc(db, "users", user.uid))
        
        if (userDoc.exists()) {
          const userData = userDoc.data()
          setFormData({
            name: user.displayName || userData.name || "",
            email: user.email || "",
            bio: userData.bio || "",
            skills: userData.skills || "",
            website: userData.website || "",
            photoURL: user.photoURL || userData.photoURL || ""
          })
        } else {
          // If no user document exists, initialize with auth data
          setFormData({
            name: user.displayName || "",
            email: user.email || "",
            bio: "",
            skills: "",
            website: "",
            photoURL: user.photoURL || ""
          })
        }
      } catch (error) {
        console.error("Error fetching user data:", error)
      } finally {
        setIsFetching(false)
      }
    }

    fetchUserData()
  }, [user])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!user || !e.target.files || e.target.files.length === 0) return;
    
    const file = e.target.files[0];
    setIsLoading(true);
    
    try {
      // Upload to Cloudinary instead of Firebase Storage
      const downloadURL = await uploadImage(file);
      
      // Update form data with new photo URL
      setFormData(prev => ({
        ...prev,
        photoURL: downloadURL
      }));
      
    } catch (error) {
      console.error("Error uploading profile picture:", error);
    } finally {
      setIsLoading(false);
    }
  }

  const handleRemovePhoto = async () => {
    if (!user || !formData.photoURL) return;
    
    setIsLoading(true);
    
    try {
      // Extract public ID from Cloudinary URL
      const urlParts = formData.photoURL.split('/');
      const publicIdWithExtension = urlParts[urlParts.length - 1];
      const publicId = publicIdWithExtension.split('.')[0];
      
      // Delete from Cloudinary
      await deleteImage(`profile_pictures/${publicId}`);
      
      // Update form data
      setFormData(prev => ({
        ...prev,
        photoURL: ""
      }));
      
    } catch (error) {
      console.error("Error removing profile picture:", error);
    } finally {
      setIsLoading(false);
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return
    
    setIsLoading(true)

    try {
      // Update Firebase Auth profile
      await updateProfile(user, {
        displayName: formData.name,
        photoURL: formData.photoURL
      })
      
      // Update or create Firestore user document
      const userRef = doc(db, "users", user.uid)
      await setDoc(userRef, {
        uid: user.uid,
        name: formData.name,
        email: formData.email,
        bio: formData.bio,
        skills: formData.skills,
        website: formData.website,
        photoURL: formData.photoURL,
        updatedAt: new Date().toISOString()
      }, { merge: true })

      router.push("/profile")
    } catch (error) {
      console.error("Error updating profile:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    router.push("/profile")
  }

  if (authLoading || isFetching) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="h-8 w-8 text-blue-600 animate-spin" />
      </div>
    )
  }

  // Get initials for avatar
  const getInitials = () => {
    if (!formData.name) return "U"
    return formData.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <MainNav />
      <main className="container mx-auto pt-24 pb-16 px-4">
        <div className="flex items-center mb-8">
          <Button variant="ghost" size="icon" className="mr-2" onClick={handleCancel}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Edit Profile</h1>
            <p className="text-slate-500 mt-1">Update your personal information</p>
          </div>
        </div>

        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit}>
            <Card className="shadow-sm border-0 bg-white">
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Update your profile details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col md:flex-row items-center gap-6 mb-6">
                  <div className="w-24 h-24 rounded-full overflow-hidden flex items-center justify-center">
                    {formData.photoURL ? (
                      <img src={formData.photoURL} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-blue-100 flex items-center justify-center">
                        <span className="text-3xl font-bold text-blue-600">{getInitials()}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-medium mb-2">Profile Picture</h3>
                    <p className="text-sm text-slate-500 mb-3">
                      Upload a new profile picture or avatar. Recommended size: 300x300px.
                    </p>
                    <div className="flex gap-3">
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="sm"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={isLoading}
                      >
                        Upload Image
                      </Button>
                      <input 
                        type="file" 
                        ref={fileInputRef}
                        className="hidden" 
                        accept="image/*"
                        onChange={handleFileChange}
                      />
                      {formData.photoURL && (
                        <Button 
                          type="button" 
                          variant="ghost" 
                          size="sm" 
                          className="text-red-500"
                          onClick={handleRemovePhoto}
                          disabled={isLoading}
                        >
                          <X className="h-4 w-4 mr-1" />
                          Remove
                        </Button>
                      )}
                    </div>
                  </div>
                </div>

                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      required
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Your email address"
                      required
                      disabled
                    />
                    <p className="text-xs text-slate-500">Email cannot be changed</p>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      name="bio"
                      value={formData.bio}
                      onChange={handleChange}
                      placeholder="Tell us about yourself"
                      rows={4}
                    />
                    <p className="text-xs text-slate-500">
                      Brief description for your profile. This will be displayed on your public profile.
                    </p>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="skills">Skills</Label>
                    <Input
                      id="skills"
                      name="skills"
                      value={formData.skills}
                      onChange={handleChange}
                      placeholder="Your skills (comma separated)"
                    />
                    <p className="text-xs text-slate-500">
                      Add your skills separated by commas (e.g., Technical Interviews, System Design, Algorithms)
                    </p>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      name="website"
                      value={formData.website}
                      onChange={handleChange}
                      placeholder="https://example.com"
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button type="button" variant="outline" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </form>
        </div>
      </main>
    </div>
  )
}
