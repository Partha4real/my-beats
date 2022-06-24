import React from "react";
import Head from "next/head";
import DashboardLayout from "../../../layout/dashboardLayout/DashboardLayout";
import { useRouter } from "next/dist/client/router";
import AlbumComponent from "../../../components/AlbumComponent";
import AlbumForm from "../../../components/forms/AlbumForm";

export default function Pages() {
  const router = useRouter();

  return (
    <div>
      <Head>
        <title>Album</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <DashboardLayout>
          {router.asPath.includes("VIEW-ALBUM") && <AlbumComponent />}
          {router.asPath.includes("ADD-ALBUM") && <AlbumForm />}
        </DashboardLayout>
      </main>
    </div>
  );
}
