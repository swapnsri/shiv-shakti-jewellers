import { NextResponse } from "next/server";
import { hashPassword } from "@/app/utils/login";
import { UserDetails } from "@/app/lib/model/product"; // Adjust the import path if needed

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { message: "Username, email, and password are required" },
        { status: 400 },
      );
    }

    // Hash the password
    const hashedPassword = await hashPassword(password);

    // Create a new user document
    const newUser = new UserDetails({
      email,
      password: hashedPassword,
    });

    // Save the new user
    await newUser.save();

    return NextResponse.json(
      { message: "User registered successfully" },
      { status: 201 },
    );
  } catch (err: any) {
    console.error(err);
    if (err.code === 11000) {
      // MongoDB duplicate key error code
      // Extract the key that caused the conflict if needed
      // const duplicateKey = Object.keys(err.keyValue || {}).join(", ");
      return NextResponse.json(
        { message: `Email ${err.keyValue.email} is already registered ` },
        { status: 409 }, // Conflict status code
      );
    }
    return NextResponse.json(
      { message: "Failed to register user" },
      { status: 500 },
    );
  }
}
