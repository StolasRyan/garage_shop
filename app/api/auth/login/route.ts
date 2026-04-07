import { getDB } from "@/utils/api-routes";
import { randomBytes } from "crypto";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  console.log('login called');
  try {
    const { phoneNumber, password } = await request.json();
    const db = await getDB();

    const user = await db.collection("user").findOne({ phoneNumber });
    if (!user) {
      NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const bcrypt = await import("bcrypt");

    const isPasswordValid = await bcrypt.compare(password, user?.password)

    if (!isPasswordValid) {
      NextResponse.json({ message: "Invalid password" }, { status: 401});
    } 

    const sessionId = randomBytes(16).toString('hex');
    console.log('created sessionId:', sessionId);
    const expiresIn = 30 * 24 * 60 *60;

    const expiresAt = new Date(Date.now() + expiresIn * 1000);

    await db.collection('session').insertOne({
      token: sessionId,
      userId: user?._id.toString(),
      expiresAt: expiresAt,
      expiresIn: expiresIn,
      createdAt: new Date(),
      updatedAt: new Date(),
      ipAddress: request.headers.get('x-forwarded-for') || '',
      userAgent: request.headers.get('user-agent') || '',
    })

    // const responseData = {
    //     success: true,
    //     user: {
    //         _id: user?._id,
    //         phoneNumber: user?.phoneNumber,
    //         surname: user?.surname,
    //         name: user?.name,
    //         email: user?.email,
    //     }
    // };

    const responseData = {
      success: true,
      message: "Login successful",
    }

    const response = NextResponse.json(responseData);

    response.cookies.set('session', sessionId,{
      httpOnly:true,
      sameSite:'lax',
      expires:expiresAt,
      path:'/'
    })
    console.log('cookie set:', sessionId);
    return response;

  } catch (error) {
    console.error('Autorisation server error', error);
    return NextResponse.json({ error: 'Eternal server error' }, { status: 500 });
  }
}
