import React from "react";
import Head from "next/head";
import DashboardLayout from "../../../layout/dashboardLayout/DashboardLayout";
import GenreComponent from "../../../components/GenreComponent";
import GenreForm from "../../../components/forms/GenreForm";
import { useRouter } from "next/dist/client/router";

export default function Pages() {
  const router = useRouter();

  return (
    <div>
      <Head>
        <title>Genre</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <DashboardLayout>
          {router.asPath.includes("VIEW-GENRE") && <GenreComponent />}
        </DashboardLayout>
      </main>
    </div>
  );
}
