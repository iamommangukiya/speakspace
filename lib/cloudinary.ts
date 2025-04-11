'use client';

// Client-side implementation that doesn't rely on Node.js fs module
export const uploadImage = async (file: File, folder: string = 'profile_pictures'): Promise<string> => {
  // Create a FormData instance for the upload
  const formData = new FormData();
  formData.append('file', file); // Append the actual file, not base64
  formData.append('upload_preset', 'ml_default'); // Changed to your custom preset name
  formData.append('folder', folder);

  try {
    const response = await fetch(`https://api.cloudinary.com/v1_1/deydhodei/image/upload`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Cloudinary upload error:', errorData);
      throw new Error(`Upload failed: ${errorData.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    return data.secure_url;
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    throw error;
  }
};

export const deleteImage = async (publicId: string): Promise<void> => {
  // For deletion, we'll use the server-side API route
  try {
    const response = await fetch('/api/cloudinary/delete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ publicId }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Delete failed: ${errorData.error || 'Unknown error'}`);
    }
  } catch (error) {
    console.error('Error deleting from Cloudinary:', error);
    throw error;
  }
};