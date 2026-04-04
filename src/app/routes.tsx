import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomePage from "../pages/Home/Home";
import MenusPage from "../pages/Menus";
import GalleryPage from "../pages/Gallery";
import AboutPage from "../pages/About";
import ContactPage from "../pages/Contact";

const router = createBrowserRouter([
  {
    path: "/jmcw",
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "menus",
        element: <MenusPage />,
      },
      {
        path: "gallery",
        element: <GalleryPage />,
      },
      {
        path: "about",
        element: <AboutPage />,
      },
      {
        path: "contact",
        element: <ContactPage />,
      },
    ],
  },
]);

export default router;
