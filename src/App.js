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
    setPostData([
      {
        type: "directory",
        title: "일상",
        children: [
          {
            type: "post",
            title: "고등학교",
            path: "/일상/고등학교",
          },
        ],
      },
      {
        type: "directory",
        title: "Tech",
        children: [
          {
            type: "post",
            title: "Tech1",
            path: "/Tech/Tech1",
            data: {
              date: "2022.11.09",
              tag: ["기술", "리뷰"],
              content: "내요오오오오옹옹",
            },
          },
          {
            type: "post",
            title: "Tech2",
            path: "/Tech/Tech2",
          },
          {
            type: "directory",
            title: "Tech3",
            children: [
              {
                type: "post",
                title: "Tech31",
                path: "/Tech/Tech3/Tech31",
              },
              {
                type: "post",
                title: "Tech32",
                path: "/Tech/Tech3/Tech32",
              },
            ],
          },
          {
            type: "post",
            title: "Tech3",
            path: "/Tech/Tech3",
          },
        ],
      },
    ]);
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
