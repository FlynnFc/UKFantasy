import { useSession } from "@supabase/auth-helpers-react";
import Link from "next/link";
export default function LoginBtn() {
  const session = useSession();

  if (session?.user) {
    return (
      <>
        <Link href={"./authtest"}>
          <button className=" btn mr-2">Sign out</button>
        </Link>
      </>
    );
  }

  return (
    <>
      <Link href={"./authtest"}>
        <button className="btn-primary btn mr-2">Sign in</button>
      </Link>
    </>
  );
}
