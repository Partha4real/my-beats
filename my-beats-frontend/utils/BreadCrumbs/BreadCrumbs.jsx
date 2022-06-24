import * as React from "react";
import { emphasize, styled } from "@mui/material/styles";
import { Breadcrumbs, Chip } from "@mui/material";
import { ExpandMore, Home } from "@mui/icons-material";

const StyledBreadcrumb = styled(Chip)(({ theme }) => {
  const backgroundColor =
    theme.palette.mode === "light"
      ? theme.palette.grey[100]
      : theme.palette.grey[800];
  return {
    backgroundColor,
    height: theme.spacing(3),
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightRegular,
    "&:hover, &:focus": {
      backgroundColor: emphasize(backgroundColor, 0.06),
    },
    "&:active": {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(backgroundColor, 0.12),
    },
  };
});

export default function BreadCrumbs() {
  //   const handleClick = (event) => {
  //     event.preventDefault();
  //     console.info("You clicked a breadcrumb.");
  //   };
  return (
    <div role="presentation">
      <Breadcrumbs aria-label="breadcrumb">
        <StyledBreadcrumb
          component="a"
          href="#"
          label="Home"
          icon={<Home fontSize="small" />}
        />
        <StyledBreadcrumb component="a" href="#" label="Catalog" />
      </Breadcrumbs>
    </div>
  );
}
