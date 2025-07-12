import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setHeading } from "../redux/slice/headingSlice";
import { useSelector } from "react-redux";
import ProjectCard from "../components/projectCard/ProjectCard";
import { Project } from "../projectTypes";
import { RootState } from "../redux/store";

const Projects = () => {
  const theme = useSelector((state: RootState) => state.theme.value);
  const projectArray = useSelector(
    (state: RootState) => state.projectArray.value
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setHeading("PROJECTS"));
  }, [dispatch]);
  return (
    <div style={{ "--themeColor": theme } as React.CSSProperties}>
      <p className="text-xl mb-5" data-aos="zoom-in">
        Take a look at some of the <span className="font-bold">projects</span> I
        have worked on
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-5">
        {projectArray?.map((project: Project, index: number) => (
          <ProjectCard key={`${project.link} ${index}`} project={project} />
        ))}
      </div>
    </div>
  );
};

export default Projects;
