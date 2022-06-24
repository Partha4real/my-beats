import React from "react";
import AddButton from "../utils/AddButton/AddButton";
import ArtistTable from "./tables/ArtistTable";
import { useRouter } from "next/dist/client/router";

export default function ArtistComponent() {
    const router = useRouter();
    const handleAddClick = () => {
        router.push("/dashboard/artist/ADD-ARTIST");
    };

    return (
        <div>
            <AddButton heading="View Artists" title="Add Artist" handleAddClick={() => handleAddClick()} />
            <ArtistTable />
        </div>
    );
}
