import React from "react";
import CustomTable from "../../utils/customTable/CustomTable";
import stringTruncate from "../../hooks/stringTruncate";
import TableAction from "../../utils/TableAction/TableAction";
import { getAllArtist, deleteArtist, deleteMultipleArtist } from "../../data/artist/action";
import { connect } from "react-redux";
import { useRouter } from "next/dist/client/router";
import CustomDialog from "../../utils/CustomDialog/CustomDialog";
import uniqueId from "../../hooks/uniqueId";

function ArtistTable({ getAllArtist, deleteArtist, deleteMultipleArtist, artist }) {
    const router = useRouter();
    const [open, setOpen] = React.useState(false);
    const [selectedId, setSelectedId] = React.useState(false);

    React.useEffect(() => {
        getAllArtist();
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
                Header: "Artist Name",
                accessor: "name",
            },
            {
                Header: "Artist Image",
                accessor: "artistImage",
                Cell: ({ row }) => <img src={row.original.artistImage} alt="" className="tableRoundImage" />,
            },
            {
                Header: "Artist Bio-Data",
                accessor: "bioData",
                Cell: ({ row }) => stringTruncate(row.original.bioData, 50),
            },
            {
                Header: "Genre",
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
            <CustomTable data={artist} columns={columns} deleteSelectedFunction={(ids) => deleteMultipleArtist(ids)} />

            <CustomDialog open={open} setOpen={setOpen} deleteFunction={() => deleteArtist(selectedId)} />
        </div>
    );
}

const mapStateToProps = (state) => ({
    loader: state.loader,
    artist: state.artist,
});

export default connect(mapStateToProps, { getAllArtist, deleteArtist, deleteMultipleArtist })(ArtistTable);
