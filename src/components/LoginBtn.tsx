import { useSession, signIn, signOut } from "next-auth/react";
export default function LoginBtn(props: { primary: boolean }) {
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
      <button
        className={`${
          props.primary ? "btn-primary" : "btn mt-4 w-max"
        } btn mr-2`}
        onClick={() => signIn()}
      >
        Sign in
      </button>
    </>
  );
}
