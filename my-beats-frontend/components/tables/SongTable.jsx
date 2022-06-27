import React from "react";
import moment from "moment";
import CustomTable from "../../utils/customTable/CustomTable";
import TableAction from "../../utils/TableAction/TableAction";
import { getAllSong, deleteSong, deleteMultipleSong } from "../../data/song/action";
import { connect } from "react-redux";
import { useRouter } from "next/dist/client/router";
import CustomDialog from "../../utils/CustomDialog/CustomDialog";
import uniqueId from "../../hooks/uniqueId";

function SongTable({ song, getAllSong, deleteSong, deleteMultipleSong }) {
    const router = useRouter();
    const [open, setOpen] = React.useState(false);
    const [selectedId, setSelectedId] = React.useState(false);

    React.useEffect(() => {
        getAllSong();
    }, []);

    const handleEdit = (id) => {
        router.push(`/dashboard/song/UPDATE-SONG?songID=${id}`);
    };

    const handleDelete = (id) => {
        setOpen(true);
        setSelectedId(id);
    };

    const columns = React.useMemo(
        () => [
            {
                Header: "Title",
                accessor: "title",
            },
            {
                Header: "Artist",
                accessor: "artist",
                Cell: ({ row }) => (
                    <div className="genreTagContainer">
                        {row.original.artist.map((item) => (
                            <span key={uniqueId()} className="genreTagContainer-item">
                                {item.name}
                            </span>
                        ))}
                    </div>
                ),
            },
            {
                Header: "Album",
                accessor: "album",
                Cell: ({ row }) => (
                    <div className="genreTagContainer">
                        {row.original.album.map((item) => (
                            <span key={uniqueId()} className="genreTagContainer-item">
                                {item.name}
                            </span>
                        ))}
                    </div>
                ),
            },
            {
                Header: "Song Image",
                accessor: "musicPicture",
                Cell: ({ row }) => <img src={row.original.musicPicture} alt="" className="tableRoundImage" />,
            },
            {
                Header: "Total Download",
                accessor: "totalDownload",
            },
            {
                Header: "Genre",
                accessor: "genre",
                Cell: ({ row }) => (
                    <div className="genreTagContainer">
                        {row.original.genre.map((item) => (
                            <span key={uniqueId()} className="genreTagContainer-item">
                                {item.title}
                            </span>
                        ))}
                    </div>
                ),
            },
            {
                Header: "Release Date",
                accessor: "releaseDate",
                Cell: ({ row }) => moment(row.original.releaseDate).format("LL"),
            },
            {
                Header: "Action",
                accessor: "action",
                Cell: ({ row }) => (
                    <TableAction
                        handleEdit={() => handleEdit(row.original._id)}
                        handleDelete={() => handleDelete(row.original._id)}
                    />
                ),
            },
        ],
        [],
    );
    return (
        <div className="tableContainer">
            <CustomTable data={song} columns={columns} deleteSelectedFunction={(ids) => deleteMultipleSong(ids)} />

            <CustomDialog open={open} setOpen={setOpen} deleteFunction={() => deleteSong(selectedId)} />
        </div>
    );
}

const mapStateToProps = (state) => ({
    loader: state.loader,
    song: state.song,
});

export default connect(mapStateToProps, { getAllSong, deleteSong, deleteMultipleSong })(SongTable);
