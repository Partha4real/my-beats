import React from "react";
import CustomTable from "../../utils/customTable/CustomTable";
import stringTruncate from "../../hooks/stringTruncate";
import TableAction from "../../utils/TableAction/TableAction";

const data = [
  {
    name: "Taylor Swift",
    artistImage:
      "https://variety.com/wp-content/uploads/2020/01/taylor-swift-variety-cover-5-16x9-1000.jpg?w=681&h=383&crop=1",
    bioData:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    genre: ["red", "1989"],
  },
  {
    name: "Taylor Swift",
    artistImage:
      "https://variety.com/wp-content/uploads/2020/01/taylor-swift-variety-cover-5-16x9-1000.jpg?w=681&h=383&crop=1",
    bioData:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    genre: ["red", "1989"],
  },
  {
    name: "Taylor Swift",
    artistImage:
      "https://variety.com/wp-content/uploads/2020/01/taylor-swift-variety-cover-5-16x9-1000.jpg?w=681&h=383&crop=1",
    bioData:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    genre: ["red", "1989"],
  },
];

export default function AlbumTable() {
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
        Cell: ({ row }) => (
          <img
            src={row.original.albumPicture}
            alt=""
            className="tableRoundImage"
          />
        ),
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
        Cell: ({ row }) => <TableAction />,
      },
    ],
    []
  );
  return (
    <div className="tableContainer">
      <CustomTable data={data} columns={columns} />

      {/* <DialogPopup
        open={open}
        setOpen={setOpen}
        form={<DoctorTypeForm id={UpdateId} width={12} setOpen={setOpen} />}
      /> */}
    </div>
  );
}
