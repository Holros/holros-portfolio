import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import Layout from "./Layout";

const Home = lazy(() => import("./pages/Home"));
const AboutMe = lazy(() => import("./pages/AboutMe"));
const Projects = lazy(() => import("./pages/Projects"));
const Resume = lazy(() => import("./pages/Resume"));
const Contact = lazy(() => import("./pages/Contact"));

const LoadingFallback = () => (
  <div className="flex items-center justify-center w-full h-full p-3 mt-5 text-xl font-bold bg-gray-200 border border-red">
    <p>Loading...</p>
  </div>
);

const SuspenseRoute = ({ element: Element }: { element: React.LazyExoticComponent<() => JSX.Element> }) => (
  <Suspense fallback={<LoadingFallback />}>
    <Element />
  </Suspense>
);

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
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;