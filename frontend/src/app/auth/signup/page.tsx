import AuthForm from "@/components/auth/AuthForm";

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-100 dark:from-[#0a0a0a] dark:to-[#171717]">
      <AuthForm mode="signup" />
    </div>
  );
}
