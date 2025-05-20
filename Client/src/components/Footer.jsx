import React from "react";
import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        mt: "auto",
        py: 3,
        px: 2,
        backgroundColor: "#f5f5f5",
        textAlign: "center",
      }}
    >
      <Typography variant="body2" color="text.secondary">
        © {new Date().getFullYear()} GeoGlobe. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
