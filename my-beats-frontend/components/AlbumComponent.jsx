import { useRouter } from "next/dist/client/router";
import React from "react";
import AddButton from "../utils/AddButton/AddButton";
import AlbumTable from "./tables/AlbumTable";

export default function AlbumComponent() {
  const router = useRouter();
  const handleAddClick = () => {
    router.push("/dashboard/album/ADD-ALBUM");
  };

  return (
    <div>
      <AddButton
        heading="View Albums"
        title="Add Album"
        handleAddClick={() => handleAddClick()}
      />
      <AlbumTable />
    </div>
  );
}
