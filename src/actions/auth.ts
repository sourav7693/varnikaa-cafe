"use server";
import User from "@/models/User";
import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";
import { connectDb } from "@/lib/connection";
import { redirect } from "next/navigation";
import { generateCustomId } from "@/helper/generateCustomId";
import nodemailer from "nodemailer";
import { randomInt } from "crypto";

export async function signup(formData: FormData) {
  await connectDb();

  const name = (formData.get("name") as string)?.trim();
  const email = (formData.get("email") as string)?.trim();
  const password = (formData.get("password") as string)?.trim();

  if (!name || !email || !password) {
    return { success: false, data: null, message: "All fields are required" };
  }
  if (!/\S+@\S+\.\S+/.test(email)) {
    return { success: false, data: null, message: "Invalid email format" };
  }
  if (password.length < 6) {
    return { success: false, data: null, message: "Password must be at least 6 characters long" };
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return {
      success: false,
      message: "User already exists with this email.",
    };
  }

  const newUser = new User({
    userId: await generateCustomId(User, "userId", "userId"),
    name,
    email,
    password,
  });

  await newUser.save();

  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const token = await new SignJWT({
    userId: newUser.userId,
    email: newUser.email,
    name: newUser.name,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1d")
    .sign(secret);

  (await cookies()).set("session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 1, // 1 day
    path: "/",
  });

  return { success: true };
}

export async function login(formData: FormData) {
  await connectDb();

  const email = (formData.get("email") as string)?.trim();
  const password = (formData.get("password") as string)?.trim();

  const errors: Record<string, string> = {};

  if (!email) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    errors.email = "Invalid email format";
  }

  if (!password) {
    errors.password = "Password is required";
  }

  if (Object.keys(errors).length > 0) {
    return { success: false, errors };
  }

  const user = await User.findOne({ email });
  if (!user) {
    return {
      success: false,
      errors: { email: "No user found with this email." },
    };
  }

  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    return {
      success: false,
      errors: { password: "Incorrect password." },
    };
  }

  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const token = await new SignJWT({
    userId: user.userId,
    email: user.email,
    name: user.name,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1d")
    .sign(secret);

  (await cookies()).set("session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24, // 1 day
    path: "/",
  });

  return { success: true };
}


export async function logout() {
  (await cookies()).delete("session");
  redirect("/reboots");
}

export async function getUser() {
  const token = (await cookies()).get("session")?.value;
  if (!token) return null;

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch (err) {
    return null;
  }
}

// Temporary store
const otpStore = new Map<string, { code: string; expires: number }>();

export async function requestReset(formData: FormData) {
  await connectDb();
  const email = (formData.get("email") as string)?.trim();

  if (!email) return { success: false, message: "Email is required" };
  const user = await User.findOne({ email });
  if (!user)
    return { success: false, message: "No user found with this email" };

  const code = randomInt(100000, 999999).toString();
  otpStore.set(email, { code, expires: Date.now() + 5 * 60 * 1000 }); // 5 min expiry

  // --- Configure Mailer ---
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // use SSL
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});


  await transporter.sendMail({
    from: `"Varnikaa Café" <${process.env.SMTP_USER}>`,
    to: email,
    subject: "Password Reset Verification Code",
    html: `<p>Your verification code is: <b>${code}</b></p><p>It will expire in 5 minutes.</p>`,
  });

  return { success: true, message: "Verification code sent to your email." };
}

export async function verifyResetCode(formData: FormData) {
  await connectDb();
  const email = (formData.get("email") as string)?.trim();
  const code = (formData.get("code") as string)?.trim();
  const newPassword = (formData.get("newPassword") as string)?.trim();
  const confirmPassword = (formData.get("confirmPassword") as string)?.trim();

  if (!email || !code || !newPassword || !confirmPassword)
    return { success: false, message: "All fields are required." };

  if (newPassword !== confirmPassword)
    return { success: false, message: "Passwords do not match." };

  const otpData = otpStore.get(email);
  if (!otpData)
    return { success: false, message: "No OTP request found or expired." };

  if (Date.now() > otpData.expires)
    return { success: false, message: "OTP expired. Please request again." };

  if (otpData.code !== code)
    return { success: false, message: "Invalid verification code." };

  const user = await User.findOne({ email });
  if (!user) return { success: false, message: "User not found." };

  user.password = newPassword;
  await user.save();

  otpStore.delete(email); // clear OTP

  return {
    success: true,
    message: "Password reset successful. You can now log in.",
  };
}
