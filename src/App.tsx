import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { JSX, lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import Layout from "./Layout";
import loadingIcon from "./static/icon/icons8-loading.gif";
import { RootState } from "./redux/store";
import NotFound from "./pages/NotFound";

const Home = lazy(() => import("./pages/Home"));
const AboutMe = lazy(() => import("./pages/AboutMe"));
const Projects = lazy(() => import("./pages/Projects"));
const Contact = lazy(() => import("./pages/Contact"));

const LoadingFallback = () => {
  const theme = useSelector((state: RootState) => state.theme.value);
  return (
    <div
      className="flex items-center justify-center w-full h-full p-3 text-xl font-bold bg-gray-200"
      style={
        {
          "--themeColor": theme,
        } as React.CSSProperties
      }
    >
      <motion.img
        animate={{ rotate: [0, 180, 360, 0], x: [0, 20, 0, -20, 0] }}
        transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
        className="mb-[79px] h-auto w-[50px] border-2 border-[var(--themeColor)] rounded-[10px]"
        src={loadingIcon}
        height={1}
        width={1}
        alt="loading"
      />
    </div>
  );
};

const SuspenseRoute = ({
  element: Element,
}: {
  element: React.LazyExoticComponent<() => JSX.Element>;
}) => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Element />
    </Suspense>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <SuspenseRoute element={Home} />,
      },
      {
        path: "about",
        element: <SuspenseRoute element={AboutMe} />,
      },
      {
        path: "projects",
        element: <SuspenseRoute element={Projects} />,
      },
      {
        path: "contact",
        element: <SuspenseRoute element={Contact} />,
      },
      {
        path: "*",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <NotFound />
          </Suspense>
        ),
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
