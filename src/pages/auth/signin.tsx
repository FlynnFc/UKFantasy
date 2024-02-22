import { getProviders, signIn } from "next-auth/react";
import { SiFaceit, SiSteam, SiTwitter } from "react-icons/si";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { useRouter } from "next/router";
export default function SignIn(props: { providers: any }) {
  const callback = useRouter();
  console.log(props);
  const url = callback.query.callbackUrl as string;
  return (
    <div
      className="flex h-screen items-start justify-center"
      style={{ overflow: "hidden", position: "relative" }}
    >
      <div className="mb-10 mt-20 flex w-96 flex-col items-center rounded-md bg-base-300 shadow-lg shadow-base-300">
        <h1 className="pt-4 text-3xl font-bold text-base-content">Sign in</h1>
        <div className="flex h-full w-96 flex-col items-stretch justify-center gap-2 rounded-md p-6">
          {props.providers &&
            Object.values(props.providers).map((provider: any) => {
              if (provider.name === "Twitter") {
                return (
                  <div
                    className="flex justify-center"
                    key={provider.name}
                    style={{ marginBottom: 0 }}
                  >
                    <button
                      className={`btn btn-lg flex w-[20rem] justify-center border-none bg-[#1D9BF0] text-xl text-white hover:bg-[#1876b4] `}
                      onClick={() => signIn(provider.id, { callbackUrl: url })}
                    >
                      Sign in with {provider.name}
                      <SiTwitter className="mx-4 inline" />
                    </button>
                  </div>
                );
              } else if (provider.name === "Google") {
                return (
                  <div
                    className="flex justify-center"
                    key={provider.name}
                    style={{ marginBottom: 0 }}
                  >
                    <button
                      className={`btn btn-lg flex w-[20rem] justify-center border-none bg-slate-100 text-xl text-slate-700 hover:bg-slate-300`}
                      onClick={() => signIn(provider.id, { callbackUrl: url })}
                    >
                      Sign in with {provider.name}
                      <FcGoogle className="m-0 mx-4 inline p-0 text-xl font-bold" />
                    </button>
                  </div>
                );
              } else if (provider.name.toLowerCase() === "steam") {
                return (
                  <div
                    className="flex justify-center"
                    key={provider.name}
                    style={{ marginBottom: 0 }}
                  >
                    <button
                      className={`btn btn-lg flex w-[20rem] justify-center border-none bg-gray-800 text-xl text-white hover:bg-gray-900  `}
                      onClick={() => signIn(provider.id, { callbackUrl: url })}
                    >
                      Sign in with {provider.name}
                      <SiSteam className="mx-4 inline" />
                    </button>
                  </div>
                );
              } else {
                return (
                  <div
                    className="flex justify-center"
                    key={provider.name}
                    style={{ marginBottom: 0 }}
                  >
                    <button
                      className={`btn btn-lg flex w-[20rem] justify-center border-none bg-orange-500 text-xl text-white hover:bg-orange-800  `}
                      onClick={() => signIn(provider.id, { callbackUrl: url })}
                    >
                      Sign in with {provider.name}
                      <SiFaceit className="mx-4 inline" />
                    </button>
                  </div>
                );
              }
            })}
        </div>

        <div className="mb-2 w-full space-y-2 border-base-100 px-6 pb-4">
          <p className="text-error">Email coming soon</p>
          <input
            type="text"
            placeholder="Email"
            className="w-full rounded-lg bg-base-100 p-3"
          />
          <button className="btn btn-outline w-full" disabled>
            Sign in
          </button>
          <p className="link text-left text-sm">
            <Link href={`/privacy`}>privacy policy</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const providers = await getProviders();
  return {
    props: {
      providers,
    },
  };
}
