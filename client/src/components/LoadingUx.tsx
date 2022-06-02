import { CircularProgress, Box } from "@mui/material/";

export const LoadingUx = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        top: "0",
        left: "0",
        borderRadius: "5px",
        width: "100%",
        height: "100%",
        opacity: "5%",
      }}
    >
      <CircularProgress sx={{ maxHeight: "100%", color: "black" }} />
    </Box>
  );
};
