import connectDB from '@/config/db';
import User from '@/models/User.model';
import { currentUser, getAuth } from '@clerk/nextjs/server'
// import { NextApiRequest, NextApiResponse } from 'next'

/////////////////////////////////////////////////////////////////

export async function GET(req) {

  const { userId } = getAuth(req);
  if (!userId) {
    return Response.json({ error: 'Unauthorized hehe' }, { status: 401 });
  }

  const user = await currentUser();
  if (!user) {
    return Response.json({ error: 'User not found' }, { status: 404 });
  }

  await connectDB();

  const { id, firstName, lastName, emailAddresses, imageUrl } = user;
  const email = emailAddresses[0].emailAddress;

  let existingUser = await User.findOne({ _id: id });

  if (!existingUser) {
    // If user doesn't exist, create a new one
    existingUser = new User({
      _id: id,
      name: firstName + " " + lastName,
      email,
      imageUrl,
    });
    await existingUser.save();
  } else {
    // If user exists, update their info
    existingUser.name = firstName + " " + lastName;
    existingUser.email = email;
    existingUser.imageUrl = imageUrl;
    await existingUser.save();
  }

  return Response.json(existingUser, { status: 200 });
}
