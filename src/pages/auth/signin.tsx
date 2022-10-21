import { getProviders, signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
export default function SignIn(props: { providers: any }) {
  console.log(props.providers);
  return (
    <div
      className="mt-[20%] flex items-center justify-center"
      style={{ overflow: "hidden", position: "relative" }}
    >
      <div className="flex w-96 items-center justify-center rounded-md bg-primary p-6 shadow-md">
        {props.providers &&
          Object.values(props.providers).map((provider: any) => (
            <div
              className="flex justify-center"
              key={provider.name}
              style={{ marginBottom: 0 }}
            >
              <div
                className="btn-lg btn"
                onClick={() =>
                  signIn(provider.id, { callbackUrl: "/demo/dashboard" })
                }
              >
                Sign in with {provider.name}
                <FcGoogle className="mx-4 inline" />
              </div>
            </div>
          ))}
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
