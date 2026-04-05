import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomePage from "../pages/Home/Home";
import MenusPage from "../pages/Menus/Menus";
import AboutPage from "../pages/About";
import ContactPage from "../pages/Contact";
import GalleryPage from "../pages/Gallery/Gallery";

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
        path: "/jmcw/menus",
        element: <MenusPage />,
      },
      {
        path: "/jmcw/gallery",
        element: <GalleryPage />,
      },
      {
        path: "/jmcw/about",
        element: <AboutPage />,
      },
      {
        path: "/jmcw/contact",
        element: <ContactPage />,
      },
    ],
  },
]);

export default router;
