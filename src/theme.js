import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        primary: {
            main: "#131b35",
            light: "#3c415f",
            dark: "#000010"
        },
        secondary: {
            main: "#00e676",
            light: "#66ffa6",
            dark: "#00b248"
        }
    },
    // typography: {
    //     button: {
    //         textTransform: "none"
    //     }
    // },
});

export default theme;
