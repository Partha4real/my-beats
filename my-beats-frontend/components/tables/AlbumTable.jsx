import React from "react";
import CustomTable from "../../utils/customTable/CustomTable";
import stringTruncate from "../../hooks/stringTruncate";
import TableAction from "../../utils/TableAction/TableAction";
import { getAllAlbum, deleteAlbum, deleteMultipleAlbum } from "../../data/album/action";
import { connect } from "react-redux";
import { useRouter } from "next/dist/client/router";
import CustomDialog from "../../utils/CustomDialog/CustomDialog";

function AlbumTable({ album, getAllAlbum, deleteAlbum, deleteMultipleAlbum }) {
    const router = useRouter();
    const [open, setOpen] = React.useState(false);
    const [selectedId, setSelectedId] = React.useState(false);

    React.useEffect(() => {
        getAllAlbum();
    }, []);

    const handleEdit = (id) => {
        router.push(`/dashboard/artist/UPDATE-ARTIST?artistID=${id}`);
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
            },
            {
                Header: "Album Image",
                accessor: "albumPicture",
                Cell: ({ row }) => <img src={row.original.albumPicture} alt="" className="tableRoundImage" />,
            },
            {
                Header: "Genre",
                accessor: "genre",
            },
            {
                Header: "Album Description",
                accessor: "description",
                Cell: ({ row }) => stringTruncate(row.original.description, 50),
            },
            {
                Header: "Release Date",
                accessor: "releaseDate",
                // Cell: ({ row }) => stringTruncate(row.original.description, 50),
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
