import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import Image from "../general/Image";

const ProjectCard = ({ project }: { project: Project }) => {
  const theme = useSelector((state: RootState) => state.theme.value);
  return (
    <div className="flex flex-col gap-1.5 justify-between">
      <div
        className="relative flex aspect-[340/160] items-end w-full overflow-hidden rounded-lg shadow"
        style={{ "--themeColor": theme } as React.CSSProperties}
      >
        <span className="absolute top-4 right-3 font-medium text-white text-[.7188rem] py-1 px-3 rounded-full bg-gray-800 z-1">
          {project.isMobileApp ? "Mobile" : "Web"}
        </span>
        <Image
          src={project.projectPicture}
          height={1}
          width={2}
          alt="project"
          className="object-cover w-full h-full object-top"
        />
      </div>
      <div className="flex flex-col justify-between w-full gap-4 px-3 py-4 bg-[#FAFAFA] rounded-lg grow">
        <div className="flex gap-2 flex-wrap">
          {project.skills.map((skill) => (
            <span
              key={skill.shortName}
              className="font-medium text-[#344054] text-[.7188rem] py-1 px-3 rounded-full bg-[#EAECF0]"
            >
              {skill.fullName}
            </span>
          ))}
        </div>
        {/*  */}
        <div className="flex items-center justify-between gap-2 border-t border-dashed pt-3">
          {project.isMobileApp ? (
            <>
              {project.androidLink && (
                <a
                  href={project.androidLink}
                  rel="noreferrer"
                  target="_blank"
                  className="text-sm font-medium text-gray-600 hover:text-[var(--themeColor)] transition-colors"
                >
                  Android →
                </a>
              )}
              {project.iosLink && (
                <a
                  href={project.iosLink}
                  rel="noreferrer"
                  target="_blank"
                  className="text-sm font-medium text-gray-600 hover:text-[var(--themeColor)] transition-colors"
                >
                  iOS →
                </a>
              )}
            </>
          ) : (
            <>
              {project.liveLink && (
                <a
                  href={project.liveLink}
                  rel="noreferrer"
                  target="_blank"
                  className="text-sm font-medium text-gray-600 hover:text-[var(--themeColor)] transition-colors"
                >
                  View Project →
                </a>
              )}
              {project.githubLink && (
                <a
                  href={project.githubLink}
                  rel="noreferrer"
                  target="_blank"
                  className="text-sm font-medium text-gray-600 hover:text-[var(--themeColor)] transition-colors"
                >
                  View Code →
                </a>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
