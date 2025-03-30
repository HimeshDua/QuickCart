import { v2 as cloudinary } from 'cloudinary';
import { NextResponse } from 'next/server';
import connectDB from '@/config/db';
import { getAuth } from '@clerk/nextjs/server';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function POST(req) {
  try {
    const { userId } = getAuth(req)
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const isSeller = await authSeller(userId)
    if (!isSeller) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await req.formData();

    const name = formData.get('name');
    const description = formData.get('description');
    const price = formData.get('price');
    const offerPrice = formData.get('offerPrice');
    const category = formData.get('category');

    const files = formData.getAll('images');
    if (!files || files.length === 0) {
      return NextResponse.json({ error: 'No images provided' }, { status: 400 });
    }

    const result = await Promise.all(files.map(async (file) => {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream({ resource_type: "auto" }, (error, result) => {
          if (error) {
            console.error('Error uploading image:', error);
            reject(error);
          } else {
            resolve(result.secure_url);
          }
        }).end(buffer);
      });
    }));


    return NextResponse.json({ url: stream }, { status: 200 });
  } catch (error) {
    console.error('Error uploading image:', error);
    return NextResponse.json({ error: 'Failed to upload image' }, { status: 500 });
  }

}