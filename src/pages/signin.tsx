import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";

const Home = () => {
  const session = useSession();
  const supabase = useSupabaseClient();

  const signOutHandler = async () => {
    const { error } = await supabase.auth.signOut();
  };

  return (
    <div className="h-screen" style={{ padding: "50px 0 100px 0" }}>
      <div className="mt-16 flex items-center justify-center">
        {!session ? (
          <div className="w-[30rem] rounded bg-primary p-6">
            <Auth
              supabaseClient={supabase}
              appearance={{ theme: ThemeSupa }}
              theme="dark"
              providers={["google", "twitter"]}
            />
          </div>
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
