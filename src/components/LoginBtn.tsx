import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import toast from "react-hot-toast";
import Link from "next/link";
export default function LoginBtn() {
  const session = useSession();
  const supabase = useSupabaseClient();

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    return error;
  };

  const signOutHandler = async () => {
    toast.promise(signOut(), {
      loading: "signing out...",
      success: <b>signed out!</b>,
      error: <b>Could not sign out.</b>,
    });
  };

  return (
    <>
      {session?.user ? (
        <button onClick={signOutHandler} className=" btn mr-2">
          Sign out
        </button>
      ) : (
        <Link href={"./signin"}>
          <button className="btn-primary btn mr-2">Sign in</button>
        </Link>
      )}
    </>
  );
}
