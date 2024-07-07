import { useSession, signIn } from "next-auth/react";
import Navigation from "./Nav";

export default function Layout({children}) {
  const { data: session } = useSession();
  if (!session) {
    return (
      <>
        <div className="bg-blue-900 w-screen h-screen flex items-center">
          <div className="text-center w-full">
            <button
              onClick={() => signIn("google")}
              className="bg-white border-none focus:outline-none rounded-lg px-4 py-2"
            >
              Login with Google
            </button>
          </div>
        </div>
      </>
    );
  }
  return (
    <div className="bg-blue-900 min-h-screen flex">
      <Navigation />
      <div className="bg-white flex-grow rounded-lg mt-1 mr-1 mb-2 p-4">{children}</div>
    </div>
  );
}
