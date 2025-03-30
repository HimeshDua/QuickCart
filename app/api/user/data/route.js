import { NextResponse } from 'next/server';
import connectDB from '@/config/db';
import User from '@/models/User.model';
import { getAuth } from '@clerk/nextjs/server';  // Fix incorrect import

export async function GET(req) {
  try {
    const { userId } = getAuth(req);
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const userData = await User.findById(userId);
    if (!userData) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(userData, { status: 200 });
    
  } catch (error) { 
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
