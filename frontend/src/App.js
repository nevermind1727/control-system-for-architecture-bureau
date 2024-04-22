import { useMemo, useEffect } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "theme";
import { useSelector } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import Routes from "./Routes/Routes";
import { useDispatch } from "react-redux";
import { getHouses } from "state/housesSlice";
import axios from "axios";

function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAllHouses = async () => {
      const response = await axios.get("http://localhost:3004/houses");
      dispatch(getHouses(response.data));
    };
    fetchAllHouses();
  }, []);
  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes />
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
