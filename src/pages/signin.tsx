import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";

const Home = () => {
  const session = useSession();
  const supabase = useSupabaseClient();

  const signOutHandler = async () => {
    const { error } = await supabase.auth.signOut();
  };

  return (
    <div className="h-screen w-auto" style={{ padding: "50px 0 100px 0" }}>
      <div className="flex items-center justify-center">
        {!session ? (
          <Auth supabaseClient={supabase} />
        ) : (
          <>
            <button className="btn" onClick={signOutHandler}>
              sign out
            </button>
            <p>Account page will go here.</p>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
