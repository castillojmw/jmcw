import { createHashRouter } from "react-router-dom";
import App from "../App";
import HomePage from "../pages/Home/Home";
import MenusPage from "../pages/Menus/Menus";
import AboutPage from "../pages/About/About";
import GalleryPage from "../pages/Gallery/Gallery";

const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/menus",
        element: <MenusPage />,
      },
      {
        path: "/gallery",
        element: <GalleryPage />,
      },
      {
        path: "/about",
        element: <AboutPage />,
      },
    ],
  },
]);

export default router;
