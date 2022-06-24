import React from "react";
import Head from "next/head";
import DashboardLayout from "../../../layout/dashboardLayout/DashboardLayout";
import SongComponent from "../../../components/SongComponent";
import SongForm from "../../../components/forms/SongForm";
import { useRouter } from "next/dist/client/router";

export default function Pages() {
  const router = useRouter();
  return (
    <div>
      <Head>
        <title>Song</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <DashboardLayout>
          {router.asPath.includes("VIEW-SONG") && <SongComponent />}
          {router.asPath.includes("ADD-SONG") && <SongForm />}
        </DashboardLayout>
      </main>
    </div>
  );
}
