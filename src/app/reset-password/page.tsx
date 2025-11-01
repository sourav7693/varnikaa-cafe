import ResetPasswordForm from "@/components/admin/ResetPasswordForm";

export const metadata = {
  title: "Reset Password | Varnikaa Cafe",
  description: "Reset your account password securely via email verification.",
};

export default function ResetPasswordPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-defined-green/90 p-6">
      <ResetPasswordForm />
    </div>
  );
}
