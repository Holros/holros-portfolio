import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { lazy, Suspense } from "react";
import Layout from "./Layout";
import { AnimatePresence, motion } from "framer-motion";
import loadingIcon from "./static/icon/icons8-loading.gif";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";

const Home = lazy(() => import("./pages/Home"));
const AboutMe = lazy(() => import("./pages/AboutMe"));
const Projects = lazy(() => import("./pages/Projects"));
const Resume = lazy(() => import("./pages/Resume"));
const Contact = lazy(() => import("./pages/Contact"));
const Freestyle = lazy(() => import("./pages/Freestyle"));

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
      {/* <motion.p
        animate={{ rotate: [0, 5, 0, -5, 0], x: [0, 20, 0, -20, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
        className="mb-[79px] p-2 flex items-center justify-center text-xl border-2 border-[var(--themeColor)] rounded-[8px] text-[black]"
      >Loading...</motion.p> */}
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
  const location = useLocation();
  return (
    <Suspense fallback={<LoadingFallback />}>
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <Element />
        </motion.div>
      </AnimatePresence>
    </Suspense>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* For Loading UI testing */}
            {/* <Route index element={<LoadingFallback />} />
            <Route path="about" element={<LoadingFallback />} /> */}

            <Route index element={<SuspenseRoute element={Home} />} />
            <Route path="about" element={<SuspenseRoute element={AboutMe} />} />
            <Route
              path="projects"
              element={<SuspenseRoute element={Projects} />}
            />
            <Route path="resume" element={<SuspenseRoute element={Resume} />} />
            <Route
              path="contact"
              element={<SuspenseRoute element={Contact} />}
            />
            <Route
              path="freestyle"
              element={<SuspenseRoute element={Freestyle} />}
            />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
