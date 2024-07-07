import { useSession } from "next-auth/react";
import Layout from "../components/Layout";

export default function Home() {
  const { data: session } = useSession();
  return (
    <Layout>
      <div className="flex items-center justify-between">
        <div className="text-blue-900">
          Assalamu Alaykum va Rohmatullohi va Barokatuh,{" "}
          <b>{session?.user?.name}</b>
        </div>

        <div className="bg-gray-300 rounded-lg flex gap-1 overflow-hidden">
          <img src={session?.user?.image} alt="user image" className="w-6 h-6" />
          <h6 className="text-black px-2">{session?.user?.name}</h6>
        </div>
      </div>
    </Layout>
  );
}
