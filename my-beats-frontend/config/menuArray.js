import {
  Album,
  BubbleChart,
  LibraryMusic,
  LocalOfferOutlined,
  SupervisedUserCircle,
} from "@mui/icons-material";

const menuArray = [
  {
    text: "Artist",
    icon: <SupervisedUserCircle />,
    link: "dashboard/artist/VIEW-ARTIST",
  },
  {
    text: "Album",
    icon: <Album />,
    link: "dashboard/album/VIEW-ALBUM",
  },
  {
    text: "Song",
    icon: <LibraryMusic />,
    link: "dashboard/song/VIEW-SONG",
  },
  {
    text: "Genre",
    icon: <BubbleChart />,
    link: "dashboard/genre/VIEW-GENRE",
  },
  {
    text: "Tag",
    icon: <LocalOfferOutlined />,
    link: "dashboard/tag/VIEW-TAG",
  },
];

export default menuArray;
