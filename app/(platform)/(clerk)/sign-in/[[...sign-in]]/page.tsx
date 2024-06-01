import { SignIn } from "@clerk/nextjs";

export default function SignInPage({
  params,
}: {
  params: {
    sign_in: string[];
  };
}) {
  console.log(params);
  return (
    <SignIn
      // 로그인 성공 시
      fallbackRedirectUrl="/"
      // 로그인 실패 시
      signUpFallbackRedirectUrl="/sign-up"
    />
  );
}
