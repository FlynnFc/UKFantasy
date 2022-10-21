import { useSession, signIn, signOut } from "next-auth/react";
export default function LoginBtn() {
  const { data: session } = useSession();
  if (session?.user) {
    return (
      <>
        <p className=" absolute left-5 hidden text-base font-semibold sm:inline ">
          You are signed in as {session.user.name}
        </p>
        <button className="btn" onClick={() => signOut()}>
          Sign out
        </button>
      </>
    );
  }
  return (
    <>
      <button
        className="btn-primary btn-active btn mr-2"
        onClick={() => signIn()}
      >
        Sign in
      </button>
    </>
  );
}
