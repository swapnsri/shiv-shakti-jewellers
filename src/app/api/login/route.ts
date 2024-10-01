// app/api/login/route.ts

import { NextResponse } from "next/server";
import { verifyPassword } from "@/app/utils/login";
import { UserDetails } from "@/app/lib/model/product";
import { connectToDatabase } from "@/app/lib/db/connect";

export async function POST(req: Request) {
  await connectToDatabase();
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 },
      );
    }
    const user = await UserDetails.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 },
      );
    }

    // Verify the password
    const isPasswordValid = await verifyPassword(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 },
      );
    }

    // Handle successful login
    return NextResponse.json({ message: "Login successful" }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Failed to login" }, { status: 500 });
  }
}
