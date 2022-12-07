import { getProviders, signIn } from "next-auth/react";
import { FaDiscord } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
export default function SignIn(props: { providers: any }) {
  console.log(props.providers);
  return (
    <div
      className="flex h-screen items-center justify-center"
      style={{ overflow: "hidden", position: "relative" }}
    >
      <div className="mb-10 flex w-96 flex-col items-center rounded-md bg-base-300 shadow-lg shadow-base-300">
        <div className="flex h-full w-96 flex-col items-stretch  justify-center space-y-2 rounded-md bg-primary p-6 shadow-md">
          {props.providers &&
            Object.values(props.providers).map((provider: any) => (
              <div
                className="flex justify-center"
                key={provider.name}
                style={{ marginBottom: 0 }}
              >
                <div
                  className={`btn-lg btn border-none ${
                    provider.name === "Discord"
                      ? "bg-[#5865F2] hover:bg-[#4550c6]"
                      : null
                  }`}
                  onClick={() =>
                    signIn(provider.id, { callbackUrl: "/epic36" })
                  }
                >
                  Sign in with {provider.name}
                  {provider.name === "Google" ? (
                    <FcGoogle className="mx-4 inline" />
                  ) : provider.name === "Discord" ? (
                    <FaDiscord className="mx-3 inline" />
                  ) : null}
                </div>
              </div>
            ))}
        </div>
        <h1 className="pb-4 pt-6 text-3xl font-bold text-base-content">
          Sign in
        </h1>
        <div className="my-2 w-full space-y-2 border-b-2 border-base-100 p-6 pb-4">
          <p className="text-error">Email coming soon</p>
          <input
            type="text"
            placeholder="Email"
            className="w-full rounded-lg bg-base-100 p-3"
          />{" "}
          <input
            type="password"
            placeholder="Password"
            className="w-full rounded-lg bg-base-100 p-3"
          />
          <button className="btn-outline btn w-full" disabled>
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: {
      providers,
    },
  };
}
