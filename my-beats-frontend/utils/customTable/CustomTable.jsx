import React, { useEffect } from "react";
import { useTable, useGlobalFilter, useRowSelect, useSortBy } from "react-table";
import {
    Button,
    Toolbar,
    Typography,
    Grid,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
} from "@mui/material";
import GlobalFilter from "./GlobalFilter";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";
import CustomDialog from "../CustomDialog/CustomDialog";
import uniqueId from "../../hooks/uniqueId";

const useStyles = makeStyles((theme) => ({}));

const IndeterminateCheckbox = React.forwardRef(({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef();
    const resolvedRef = ref || defaultRef;

    React.useEffect(() => {
        resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    return (
        <>
            <input key={uniqueId()} type="checkbox" ref={resolvedRef} {...rest} />
        </>
    );
});

export default function CustomTable({
    columns,
    data = [],
    searchTitle,
    setSearchValue,
    gettingFilterValue,
    globalSearch,
    deleteSelectedFunction,
}) {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [IDS, setIDS] = React.useState([]);
    const [open, setOpen] = React.useState(false);

    // array of selected ids
    let selectedID;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        state,
        selectedFlatRows,
        setGlobalFilter,
    } = useTable(
        {
            columns,
            data,
        },
        useGlobalFilter,
        useSortBy,
        useRowSelect,
        (hooks) => {
            hooks.visibleColumns.push((columns) => {
                return [
                    {
                        id: uniqueId(),
                        Header: ({ getToggleAllRowsSelectedProps }) => (
                            <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
                        ),
                        Cell: ({ row }) => (
                            <IndeterminateCheckbox key={uniqueId()} {...row.getToggleRowSelectedProps()} />
                        ),
                    },
                    ...columns,
                ];
            });
        },
    );
    const { globalFilter } = state;

    useEffect(() => {
        if (gettingFilterValue) {
            setGlobalFilter(gettingFilterValue);
            setSearchValue(globalFilter);
        }
    }, [gettingFilterValue, globalFilter, setGlobalFilter, setSearchValue]);

    const handleSelectedRows = () => {
        selectedID = selectedFlatRows.map((row) => row.original._id);
        setIDS(selectedID);
        setOpen(true);
    };

    return (
        <>
            <div className={classes.root}>
                {globalSearch && (
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Typography className={classes.searchText}>{searchTitle}</Typography>

                            <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
                        </Grid>
                        <Grid item xs={6}></Grid>
                    </Grid>
                )}
                {selectedFlatRows.length > 0 ? (
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Toolbar>
                                {selectedFlatRows.length > 0 && (
                                    <Typography
                                        color="steelblue"
                                        variant="subtitle1"
                                        component="p"
                                        fontWeight="600"
                                        flex="1"
                                    >
                                        {selectedFlatRows.length} selected
                                    </Typography>
                                )}

                                {selectedFlatRows.length > 0 && (
                                    <Button
                                        variant="contained"
                                        color="error"
                                        style={{ minWidth: 120 }}
                                        size="small"
                                        onClick={handleSelectedRows}
                                    >
                                        {selectedFlatRows.length === data.length ? "Deleted All" : "Delete Selected"}
                                    </Button>
                                )}
                            </Toolbar>
                        </Grid>
                    </Grid>
                ) : null}
                <TableContainer>
                    <Table {...getTableProps()} aria-labelledby="tableTitle" size="small" stickyHeader>
                        <TableHead>
                            {headerGroups.map((headerGroup) => {
                                return (
                                    <TableRow key={uniqueId()} {...headerGroup.getHeaderGroupProps()}>
                                        {headerGroup.headers.map((column) => {
                                            return (
                                                <TableCell
                                                    key={uniqueId()}
                                                    {...column.getHeaderProps(column.getSortByToggleProps())}
                                                >
                                                    <Typography
                                                        key={uniqueId()}
                                                        variant="button"
                                                        color="black"
                                                        component="div"
                                                        fontWeight="700"
                                                        display="flex"
                                                    >
                                                        {column.render("Header")}
                                                        {column.isSorted ? (
                                                            column.isSortedDesc ? (
                                                                <KeyboardArrowDown fontSize="small" />
                                                            ) : (
                                                                <KeyboardArrowUp fontSize="small" />
                                                            )
                                                        ) : null}
                                                    </Typography>
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                        </TableHead>
                        {data.length < 1 ? (
                            <TableBody>
                                <TableRow key={uniqueId()}>
                                    <TableCell key={uniqueId()} colSpan={headerGroups[0].headers.length}>
                                        <Typography variant="subtitle1" color="GrayText" component="p" fontWeight="700">
                                            NO DATA AVAILABLE
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        ) : (
                            <TableBody {...getTableBodyProps()}>
                                {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                    prepareRow(row);
                                    return (
                                        <TableRow key={uniqueId()} {...row.getRowProps()} hover>
                                            {row.cells.map((cell) => {
                                                return (
                                                    <TableCell
                                                        key={uniqueId()}
                                                        {...cell.getCellProps()}
                                                        padding="checkbox"
                                                    >
                                                        <Typography
                                                            key={uniqueId()}
                                                            variant="subtitle2"
                                                            color="grey"
                                                            component="div"
                                                            display="flex"
                                                        >
                                                            {cell.render("Cell")}
                                                        </Typography>
                                                    </TableCell>
                                                );
                                            })}
                                        </TableRow>
                                    );
                                })}
                                {emptyRows > 0 && (
                                    <TableRow key={uniqueId()} style={{ height: 40 * emptyRows }}>
                                        <TableCell key={uniqueId()} colSpan={headerGroups[0].headers.length} />
                                    </TableRow>
                                )}
                            </TableBody>
                        )}
                    </Table>
                </TableContainer>

                {data.length < 1 ? (
                    <Typography color="textSecondary" variant="body1" align="right">
                        Options are Disabled
                    </Typography>
                ) : (
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={data.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                )}
            </div>

            <CustomDialog open={open} setOpen={setOpen} deleteFunction={() => deleteSelectedFunction(IDS)} />
        </>
    );
}
