import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Main from "./pages/Main";
import AppContext from "./context/AppContext";
import { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "./style/theme";
import { GlobalStyle } from "./style/GlobalStyle";
import axios from "axios";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Main />}>
      {/*<Route path="dashboard" element={<Dashboard />} />*/}
      {/* ... etc. */}
    </Route>
  )
);

function App() {
  const [selectedPost, setSelectedPost] = useState("");
  const [postData, setPostData] = useState([]);
  const [openPost, setOpenPost] = useState([]);
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    async function fetch() {
      const { data: responsePostData } = await axios.get(
        "http://localhost:4000/post/all"
      );

      setPostData(responsePostData);
    }
    fetch();
  }, []);

  return (
    <AppContext.Provider
      value={{
        selectedPost: selectedPost,
        setSelectedPost: setSelectedPost,

        openPost: openPost,
        setOpenPost: setOpenPost,

        postData: postData,

        theme: theme,
        setTheme: setTheme,
      }}
    >
      <ThemeProvider theme={theme === "dark" ? darkTheme : lightTheme}>
        <GlobalStyle />
        <RouterProvider router={router} />
      </ThemeProvider>
    </AppContext.Provider>
  );
}

export default App;
