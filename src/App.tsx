import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { lazy, Suspense } from "react";
import Layout from "./Layout";
import { AnimatePresence, motion } from "framer-motion";

const Home = lazy(() => import("./pages/Home"));
const AboutMe = lazy(() => import("./pages/AboutMe"));
const Projects = lazy(() => import("./pages/Projects"));
const Resume = lazy(() => import("./pages/Resume"));
const Contact = lazy(() => import("./pages/Contact"));
const Freestyle = lazy(() => import("./pages/Freestyle"));

const LoadingFallback = () => (
  <div className="flex items-center justify-center w-full h-full p-3 mt-5 text-xl font-bold bg-gray-200 border border-red">
    <p>Loading...</p>
  </div>
);

const SuspenseRoute = ({ element: Element }: { element: React.LazyExoticComponent<() => JSX.Element> }) => {
  const location = useLocation()
 return(
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
    </Suspense>)
};

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<SuspenseRoute element={Home} />} />
            <Route 
              path="about" 
              element={<SuspenseRoute element={AboutMe} />} 
            />
            <Route 
              path="projects" 
              element={<SuspenseRoute element={Projects} />} 
            />
            <Route 
              path="resume" 
              element={<SuspenseRoute element={Resume} />} 
            />
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
