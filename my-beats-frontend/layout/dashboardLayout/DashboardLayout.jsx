import * as React from "react";
import { CssBaseline, Divider, IconButton, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { Box } from "@mui/system";
import Navbar from "../../components/Navbar/Navbar";
import menuArray from "../../config/menuArray";
import { useRouter } from "next/dist/client/router";
import titleCase from "../../hooks/titleCase";
import BreadCrumbs from "../../utils/BreadCrumbs/BreadCrumbs";
import { makeStyles } from "@mui/styles";
import AlertMessage from "../../utils/AlertMessage/AlertMessage";
import { connect } from "react-redux";

const drawerWidth = 240;

const useStyles = makeStyles({
    list: {
        padding: 0,
    },
    listItem: {
        borderRight: "3px solid red",
        background: "lightpink",
        "&:hover": {
            background: "lightpink",
        },
    },
    listItemText: {
        "& .MuiTypography-root": {
            fontWeight: 600,
        },
    },
});

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up("sm")]: {
        width: `calc(${theme.spacing(9)} + 1px)`,
    },
});

const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    ...(open && {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme),
    }),
    ...(!open && {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
    }),
}));

function DashboardLayout({ alertMessage = [], children }) {
    const router = useRouter();
    const theme = useTheme();
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);
    const [active, setActive] = React.useState("Artist");

    React.useEffect(() => {
        let page = router.asPath.split("/dashboard")[1].split("/")[1];
        setActive(titleCase(page));
    }, [router]);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <Navbar open={open} handleDrawerOpen={() => handleDrawerOpen()} />
            <AlertMessage
                isOpen={alertMessage.isOpen}
                message={alertMessage.message}
                alertType={alertMessage.alertType}
            />
            <Drawer variant="permanent" open={open}>
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === "rtl" ? <ChevronRight /> : <ChevronLeft />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List className={classes.list}>
                    {menuArray.map((menu) => (
                        <ListItem
                            button
                            key={menu.text}
                            className={active === menu.text ? classes.listItem : ""}
                            onClick={() => {
                                setActive(menu.text);
                                router.replace(`http://localhost:3000/${menu.link}`);
                            }}
                        >
                            <ListItemIcon style={{ color: active === menu.text ? "red" : "black" }}>
                                {menu.icon}
                            </ListItemIcon>
                            <ListItemText
                                primary={menu.text}
                                className={active === menu.text ? classes.listItemText : ""}
                            />
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <DrawerHeader />
                <BreadCrumbs />
                <br />
                {children}
            </Box>
        </Box>
    );
}

function mapStateToProps(state) {
    return { alertMessage: state.alertMessage };
}

export default connect(mapStateToProps)(DashboardLayout);
