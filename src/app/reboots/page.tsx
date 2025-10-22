import LoginForm from "@/components/admin/LoginForm";
// import SignupForm from "@/components/admin/SignupForm"

const page = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-amber-500/10">
      <LoginForm />
      {/* <SignupForm /> */}
    </div>
  );
};

export default page;
