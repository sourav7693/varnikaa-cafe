"use client";

import { login } from "@/actions/auth";
import { useActionState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

type LoginState = {
  success?: boolean;
  message?: string;
  errors?: Record<string, string>;
};

export default function LoginForm() {
  const [state, action, pending] = useActionState<LoginState, FormData>(
    async (_prevState, formData) => {
      return await login(formData);
    },
    { success: false, message: "", errors: {} }
  );

  const router = useRouter();

  useEffect(() => {
    if (state?.success) {
      router.replace("/admin-dashboard");
    }
  }, [state, router]);

  return (
    <div className="flex flex-col items-center justify-center gap-4 bg-defined-green/90 p-8 rounded-xl">
      <Image
        src="/logo.svg"
        alt="Logo"
        width={100}
        height={100}
        className="mb-4 w-[14rem] h-full object-cover"
      />
      <h1 className="text-2xl font-semibold text-white">
        Welcome Back to Admin Panel
      </h1>
      <p className="text-white text-xl">Login to Continue</p>

      <form className="w-full flex flex-col gap-4" action={action}>
        <div>
          <input
            id="email"
            name="email"
            type="email"
            className="h-12 w-full bg-white border outline-none border-amber-300 rounded-2xl px-2"
            placeholder="Email"
          />
          {state.errors?.email && (
            <p className="text-white text-sm">{state.errors.email}</p>
          )}
        </div>

        <div>
          <input
            id="password"
            name="password"
            type="password"
            className="h-12 w-full bg-white border outline-none border-amber-300 rounded-2xl px-2"
            placeholder="Password"
          />
          {state.errors?.password && (
            <p className="text-white text-sm">{state.errors.password}</p>
          )}
        </div>

        {/* Global message (non-field errors) */}
        {state.message && (
          <p className="text-orange-200 text-center">{state.message}</p>
        )}

        <button
          disabled={pending}
          className="bg-white text-defined-green font-semibold py-2 px-6 rounded-2xl"
          type="submit"
        >
          {pending ? "Logging in..." : "Login"}
        </button>
      </form>
      <div className="text-right">
        <Link
          href="/reset-password"
          className="text-white text-sm hover:underline hover:text-amber-200"
        >
          Forgot Password?
        </Link>
      </div>
    </div>
  );
}
