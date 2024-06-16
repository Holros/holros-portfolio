import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setHeading } from "../redux/slice/headingSlice";
import { useSelector } from "react-redux";
import ProjectCard from "../components/ProjectCard/ProjectCard";

const Projects = () => {
  const theme = useSelector((state) => state.theme.value);
  const projectArray = useSelector((state) => state.projectArray.value);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setHeading("PROJECTS"));
  }, [dispatch]);
  return (
    <div style={{ "--themeColor": theme }}>
      <p className="font-[montserrat] text-xl mb-5">
        Take a look at some of the <span className="font-bold">projects</span> I
        have worked on
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {projectArray?.map((project, index) => (
          <ProjectCard key={`${project.link} ${index}`} project={project} />
        ))}
      </div>
    </div>
  );
};

export default Projects;
