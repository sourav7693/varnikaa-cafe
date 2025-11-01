"use client";

import { useActionState, useState } from "react";
import { requestReset, verifyResetCode } from "@/actions/auth";

type ResetState = {
  success?: boolean;
  message?: string;
  step?: "email" | "verify";
};

export default function ResetPasswordForm() {
  const [step, setStep] = useState<"email" | "verify">("email");
  const [email, setEmail] = useState("");
  const [state, action, pending] = useActionState<ResetState, FormData>(
    async (_prev, formData) => {
      if (step === "email") {
        const res = await requestReset(formData);
        if (res.success) {
          setEmail(formData.get("email") as string);
          setStep("verify");
        }
        return res;
      } else {
        return await verifyResetCode(formData);
      }
    },
    { success: false, message: "" }
  );

  return (
    <div className="flex flex-col items-center justify-center gap-6  p-8 w-full ">
      <h1 className="text-2xl font-semibold text-defined-green">
        {step === "email" ? "Forgot Password?" : "Reset Your Password"}
      </h1>

      <form className="w-full flex flex-col gap-4" action={action}>
        {step === "email" ? (
          <>
            <input
              name="email"
              type="email"
              className="h-12 w-full bg-gray-100 border border-defined-green/40 rounded-2xl px-3 outline-none"
              placeholder="Enter your registered email"
              required
            />
          </>
        ) : (
          <>
            <input type="hidden" name="email" value={email} />
            <input
              name="code"
              type="text"
              className="h-12 w-full bg-gray-100 border border-defined-green/40 rounded-2xl px-3 outline-none"
              placeholder="Enter verification code"
              required
            />
            <input
              name="newPassword"
              type="password"
              className="h-12 w-full bg-gray-100 border border-defined-green/40 rounded-2xl px-3 outline-none"
              placeholder="New Password"
              required
            />
            <input
              name="confirmPassword"
              type="password"
              className="h-12 w-full bg-gray-100 border border-defined-green/40 rounded-2xl px-3 outline-none"
              placeholder="Confirm Password"
              required
            />
          </>
        )}

        {state?.message && (
          <p
            className={`text-center ${
              state.success ? "text-green-600" : "text-red-500"
            }`}
          >
            {state.message}
          </p>
        )}

        <button
          disabled={pending}
          type="submit"
          className="bg-defined-green text-white font-semibold py-2 px-6 rounded-2xl disabled:opacity-60"
        >
          {pending
            ? "Please wait..."
            : step === "email"
            ? "Send Verification Code"
            : "Reset Password"}
        </button>
      </form>
    </div>
  );
}
