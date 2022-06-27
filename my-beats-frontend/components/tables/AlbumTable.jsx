import React from "react";
import CustomTable from "../../utils/customTable/CustomTable";
import moment from "moment";
import TableAction from "../../utils/TableAction/TableAction";
import { getAllAlbum, deleteAlbum, deleteMultipleAlbum } from "../../data/album/action";
import { connect } from "react-redux";
import { useRouter } from "next/dist/client/router";
import CustomDialog from "../../utils/CustomDialog/CustomDialog";
import uniqueId from "../../hooks/uniqueId";

function AlbumTable({ album, getAllAlbum, deleteAlbum, deleteMultipleAlbum }) {
    const router = useRouter();
    const [open, setOpen] = React.useState(false);
    const [selectedId, setSelectedId] = React.useState(false);

    React.useEffect(() => {
        getAllAlbum();
    }, []);

    const handleEdit = (id) => {
        router.push(`/dashboard/album/UPDATE-ALBUM?albumID=${id}`);
    };

    const handleDelete = (id) => {
        setOpen(true);
        setSelectedId(id);
    };

    const columns = React.useMemo(
        () => [
            {
                Header: "Album Name",
                accessor: "name",
            },
            {
                Header: "Album Artist",
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
                Header: "Album Image",
                accessor: "albumPicture",
                Cell: ({ row }) => <img src={row.original.albumPicture} alt="" className="tableRoundImage" />,
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
            <CustomTable data={album} columns={columns} deleteSelectedFunction={(ids) => deleteMultipleAlbum(ids)} />

            <CustomDialog open={open} setOpen={setOpen} deleteFunction={() => deleteAlbum(selectedId)} />
        </div>
    );
}

const mapStateToProps = (state) => ({
    loader: state.loader,
    album: state.album,
});

export default connect(mapStateToProps, { getAllAlbum, deleteAlbum, deleteMultipleAlbum })(AlbumTable);
