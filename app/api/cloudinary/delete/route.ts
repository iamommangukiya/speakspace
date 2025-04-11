import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary on the server side
cloudinary.config({
  cloud_name: 'deydhodei',
  api_key: '427231474913434',
  api_secret: '9ieJPZAE7f-rpnxwjULrszi2aiQ'
});

export async function POST(request: Request) {
  try {
    const { publicId } = await request.json();
    
    // Delete the image from Cloudinary
    const result = await cloudinary.uploader.destroy(publicId);
    
    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error('Error deleting image:', error);
    return NextResponse.json(
      { error: 'Failed to delete image' },
      { status: 500 }
    );
  }
}