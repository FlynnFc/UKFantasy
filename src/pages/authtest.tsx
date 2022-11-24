import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";

const Home = () => {
  const session = useSession();
  const supabase = useSupabaseClient();

  const signOutHandler = async () => {
    const { error } = await supabase.auth.signOut();
  };

  return (
    <div className="container" style={{ padding: "50px 0 100px 0" }}>
      {!session ? (
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          theme="dark"
        />
      ) : (
        <>
          <button className="btn" onClick={signOutHandler}>
            sign out
          </button>
          <p>Account page will go here.</p>
        </>
      )}
    </div>
  );
};

export default Home;
