import React from "react";
import CustomTable from "../../utils/customTable/CustomTable";
import TableAction from "../../utils/TableAction/TableAction";
import { getAllGenre, deleteGenre, deleteMultipleGenre } from "../../data/genre/action";
import { connect } from "react-redux";
import { useRouter } from "next/dist/client/router";
import CustomDialog from "../../utils/CustomDialog/CustomDialog";

function GenreTable({ getAllGenre, deleteGenre, deleteMultipleGenre, genre }) {
    const router = useRouter();
    const [open, setOpen] = React.useState(false);
    const [selectedId, setSelectedId] = React.useState(false);

    React.useEffect(() => {
        getAllGenre();
    }, []);

    const handleEdit = (id) => {
        router.query.genreID = `${id}`;
        router.push(router);
    };

    const handleDelete = (id) => {
        setOpen(true);
        setSelectedId(id);
    };

    const columns = React.useMemo(
        () => [
            {
                Header: "Genre Title",
                accessor: "title",
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
            <CustomTable data={genre} columns={columns} deleteSelectedFunction={(ids) => deleteMultipleGenre(ids)} />

            <CustomDialog open={open} setOpen={setOpen} deleteFunction={() => deleteGenre(selectedId)} />
        </div>
    );
}

const mapStateToProps = (state) => ({
    loader: state.loader,
    genre: state.genre,
});

export default connect(mapStateToProps, { getAllGenre, deleteGenre, deleteMultipleGenre })(GenreTable);
