import connectDB from '@/config/db';
import User from '@/models/User.model';
import { currentUser, getAuth } from '@clerk/nextjs/server'
export const runtime = "nodejs";


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
  console.log("Connected to MongoDB");

  const { id, firstName, lastName, emailAddresses, imageUrl } = user;
  const emails = emailAddresses.map(e => e.emailAddress); // Extract all emails



  let existingUser = await User.findOne({ _id: id });

  if (!existingUser) {
    // If user doesn't exist, create a new one
    existingUser = new User({
      _id: id,
      name: firstName + " " + lastName,
      emails,
      imageUrl,
    });
    await existingUser.save();
    console.log("New user created:", existingUser);

  } else {
    // If user exists, update their info
    existingUser.name = firstName + " " + lastName;
    existingUser.emails = emails;
    existingUser.imageUrl = imageUrl;
    await existingUser.save();
    console.log("User updated:", existingUser);
  }

  return Response.json(existingUser, { status: 200 });
}