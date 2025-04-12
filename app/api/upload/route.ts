import { NextResponse } from 'next/server';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

// Initialize S3 client with proper configuration
const S3 = new S3Client({
  region: 'auto',
  endpoint: process.env.CLOUDFLARE_ENDPOINT,
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.CLOUDFLARE_SECRET_ACCESS_KEY || '',
  },
  forcePathStyle: true
});

export async function POST(request: Request) {
  try {
    // Validate environment variables first
    if (!process.env.CLOUDFLARE_BUCKET_NAME || 
        !process.env.CLOUDFLARE_ACCESS_KEY_ID || 
        !process.env.CLOUDFLARE_SECRET_ACCESS_KEY) {
      throw new Error('Missing required environment variables');
    }

    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const userId = formData.get('userId') as string;

    if (!file || !userId) {
      return NextResponse.json({ 
        error: 'Missing required fields' 
      }, { status: 400 });
    }

    // Get file extension
    const fileExt = file.name.split('.').pop()?.toLowerCase();
    const allowedExts = ['pdf', 'doc', 'docx'];
    
    if (!fileExt || !allowedExts.includes(fileExt)) {
      return NextResponse.json({ 
        error: 'Invalid file type. Only PDF, DOC, and DOCX files are allowed' 
      }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const key = `resumes/${userId}/${Date.now()}-${file.name}`;

    try {
      await S3.send(new PutObjectCommand({
        Bucket: process.env.CLOUDFLARE_BUCKET_NAME,
        Key: key,
        Body: buffer,
        ContentType: file.type,
      }));

      const url = `${process.env.CLOUDFLARE_PUBLIC_URL}/${key}`;
      return NextResponse.json({ 
        success: true, 
        url,
        message: 'File uploaded successfully' 
      });

    } catch (uploadError: any) {
      console.error('Upload error details:', uploadError);
      return NextResponse.json({ 
        error: 'Storage upload failed',
        details: uploadError.message 
      }, { status: 500 });
    }
  } catch (error: any) {
    console.error('Request error:', error);
    return NextResponse.json({ 
      error: 'Request failed',
      details: error.message 
    }, { status: 500 });
  }
}