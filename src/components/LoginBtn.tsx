import { useSession, signIn, signOut } from "next-auth/react";
export default function LoginBtn() {
  const { data: session } = useSession();
  if (session?.user) {
    return (
      <>
        <button className="btn" onClick={() => signOut()}>
          Sign out
        </button>
      </>
    );
  }

  return (
    <>
      <button className="btn-primary btn mr-2" onClick={() => signIn()}>
        Sign in
      </button>
    </>
  );
}
