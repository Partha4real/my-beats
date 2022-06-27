import React from "react";
import { useRouter } from "next/dist/client/router";
import AddButton from "../utils/AddButton/AddButton";
import SongTable from "./tables/SongTable";

export default function SongComponent() {
    const router = useRouter();
    const handleAddClick = () => {
        router.push("/dashboard/song/ADD-SONG");
    };

    return (
        <div>
            <AddButton heading="View Songs" title="Add Song" handleAddClick={() => handleAddClick()} />
            <SongTable />
        </div>
    );
}
