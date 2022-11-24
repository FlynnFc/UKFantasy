import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import Link from "next/link";
export default function LoginBtn() {
  const session = useSession();
  const supabase = useSupabaseClient();

  const signOutHandler = async () => {
    const { error } = await supabase.auth.signOut();
  };

  if (session?.user) {
    return (
      <>
        <button onClick={signOutHandler} className=" btn mr-2">
          Sign out
        </button>
      </>
    );
  }

  return (
    <>
      <Link href={"./signin"}>
        <button className="btn-primary btn mr-2">Sign in</button>
      </Link>
    </>
  );
}
