import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Project } from "../../projectTypes";
import Image from "../general/Image";

const ProjectCard = ({ project }: { project: Project }) => {
  const theme = useSelector((state: RootState) => state.theme.value);
  return (
    <div
      className="relative flex items-end w-full overflow-hidden rounded-lg shadow hover:outline outline-gray-400"
      data-aos="fade-up"
      style={{ "--themeColor": theme } as React.CSSProperties}
    >
      <Image
        src={project.img}
        height={1}
        width={2}
        alt="project"
        className="object-cover w-full h-auto max-w-full max-h-full min-h-full rounded-lg"
      />
      <div className="absolute z-10 flex flex-col w-full gap-2 p-2">
        <div className="flex gap-[6px] flex-wrap">
          {project.tools.map((tool) => (
            <span
              key={tool}
              className="text-[var(--themeColor)] text-[11px] p-1 rounded-lg font-bold bg-gray-700"
            >
              {tool}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between gap-2">
          <a
            href={project.link}
            rel="noreferrer"
            target="_blank"
            className="rounded-lg font-bold py-1 px-2 text-sm bg-[var(--themeColor)] hover:text-gray-700 border border-[var(--themeColor)] text-white"
          >
            Live Site
          </a>
          {project.github && (
            <a
              href={project.github}
              rel="noreferrer"
              target="_blank"
              className="rounded-lg font-bold py-1 px-2 text-sm bg-[var(--themeColor)] hover:text-gray-700 border border-[var(--themeColor)] text-white"
            >
              Code
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
