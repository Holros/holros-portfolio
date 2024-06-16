import { useSelector } from "react-redux";

const ProjectCard = ({ project }) => {
  const theme = useSelector((state) => state.theme.value);
  return (
    <div
      className="w-full relative flex items-end hover:outline outline-gray-400 shadow-lg rounded-lg overflow-hidden"
      style={{ "--themeColor": theme }}
    >
      <img
        src={project.img}
        alt="project"
        className="max-w-full h-auto w-full rounded-lg"
      />
      <div className="absolute flex flex-col gap-2 w-full p-2 z-10">
        <div className="flex gap-[6px] flex-wrap">
          {project.tools.map((tool) => (
            <span
              key={tool}
              className="text-[var(--themeColor)] text-[12px] p-1 rounded-lg font-bold bg-gray-700"
            >
              {tool}
            </span>
          ))}
        </div>
        <div className="flex justify-between gap-2 items-center"><a
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
        )}</div>
      </div>
    </div>
  );
};

export default ProjectCard;
