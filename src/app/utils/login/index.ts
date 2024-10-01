import argon2 from "argon2";

export async function hashPassword(password: string): Promise<string> {
  try {
    const hashedPassword = await argon2.hash(password);
    return hashedPassword;
  } catch (err) {
    console.error("Error hashing password:", err);
    throw new Error("Failed to hash password");
  }
}

export async function verifyPassword(
  plainPassword: string,
  hashedPassword: string,
): Promise<boolean> {
  try {
    const isMatch = await argon2.verify(hashedPassword, plainPassword);
    return isMatch;
  } catch (err) {
    console.error("Error verifying password:", err);
    return false;
  }
}
