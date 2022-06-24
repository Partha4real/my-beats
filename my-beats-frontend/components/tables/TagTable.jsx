import React from "react";
import CustomTable from "../../utils/customTable/CustomTable";
import TableAction from "../../utils/TableAction/TableAction";
import { getAllTag, deleteTag, deleteMultipleTag } from "../../data/tag/action";
import { connect } from "react-redux";
import { useRouter } from "next/dist/client/router";
import CustomDialog from "../../utils/CustomDialog/CustomDialog";

function TagTable({ tag, getAllTag, deleteTag, deleteMultipleTag }) {
    const router = useRouter();
    const [open, setOpen] = React.useState(false);
    const [selectedId, setSelectedId] = React.useState(false);

    React.useEffect(() => {
        getAllTag();
    }, []);

    const handleEdit = (id) => {
        router.query.tagID = `${id}`;
        router.push(router);
    };

    const handleDelete = (id) => {
        setOpen(true);
        setSelectedId(id);
    };

    const columns = React.useMemo(
        () => [
            {
                Header: "Tag Title",
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
            <CustomTable data={tag} columns={columns} deleteSelectedFunction={(ids) => deleteMultipleTag(ids)} />

            <CustomDialog open={open} setOpen={setOpen} deleteFunction={() => deleteTag(selectedId)} />
        </div>
    );
}

const mapStateToProps = (state) => ({
    loader: state.loader,
    tag: state.tag,
});

export default connect(mapStateToProps, { getAllTag, deleteTag, deleteMultipleTag })(TagTable);
