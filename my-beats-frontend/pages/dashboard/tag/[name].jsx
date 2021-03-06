import React from "react";
import Head from "next/head";
import DashboardLayout from "../../../layout/dashboardLayout/DashboardLayout";
import TagComponent from "../../../components/TagComponent";
import { useRouter } from "next/dist/client/router";

export default function Pages() {
  const router = useRouter();

  return (
    <div>
      <Head>
        <title>Tag</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <DashboardLayout>
          {router.asPath.includes("VIEW-TAG") && <TagComponent />}
        </DashboardLayout>
      </main>
    </div>
  );
}
