import Head from "next/head";
import { useRouter } from "next/router";
import useSWR from "swr";
import Dashboard from "../../components/dashboard";
import { fetcher } from "../../utils/fetcher";

const Expat = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data, error } = useSWR(`/api/expats/${id}`, fetcher);

  if (error) return <p>Error getting expat</p>;

  if (!data) return <p>Loading...</p>;

  return (
    <>
      <Head>
        <title>WiiQare | Expat</title>
      </Head>
      <Dashboard title={data.name}>
        <div className="text-lg">Email: {data.email}</div>
        <div className="text-lg">KYC: {data.kyc}</div>
        {/* <button className="rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white">
          Mark KYC as Complete
        </button> */}
      </Dashboard>
    </>
  );
};

export default Expat;
