import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { setHeading } from "../redux/slice/headingSlice";
import { useSelector } from "react-redux";
import ProjectCard from "../components/projects/ProjectCard";
import { RootState } from "../redux/store";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import api from "api/api";
import { Loader2, Rabbit } from "lucide-react";
import ProjectCardSkeleton from "components/projects/ProjectCardSkeleton";

const Projects = () => {
  const theme = useSelector((state: RootState) => state.theme.value);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setHeading("PROJECTS"));
  }, [dispatch]);

  const [skills, setSkills] = useState<string[]>([]);

  const fetchSkills = async (): Promise<Skill[]> => {
    const response = await api.get("/user/skills");
    return response.data.data;
  };

  const { data: mySkills, isLoading: mySkillsIsLoading } = useQuery({
    queryKey: ["/user/skills"],
    queryFn: fetchSkills,
  });

  const fetchProjects = async ({
    pageParam = 1,
  }): Promise<{
    projects: Project[];
    pagination: Pagination;
  }> => {
    const response = await api.get("/user/projects", {
      params: {
        page: pageParam,
        ...(skills.length > 0 && { skills: skills }),
      },
      paramsSerializer: {
        indexes: null,
      },
    });
    return response.data.data;
  };

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["/user/projects", skills],
      queryFn: fetchProjects,
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        return lastPage?.pagination?.hasNextPage
          ? lastPage?.pagination?.currentPage + 1
          : undefined;
      },
    });
  const projects = data?.pages.flatMap((page) => page.projects) || [];

  const observer = useRef<IntersectionObserver | null>(null);

  const observerRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isFetchingNextPage) return;

      // Disconnect previous observer
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });

      if (node) observer.current.observe(node);
    },
    [isFetchingNextPage, fetchNextPage, hasNextPage]
  );

  return (
    <div style={{ "--themeColor": theme } as React.CSSProperties}>
      <p className="text-xl mb-5" data-aos="zoom-in">
        Take a look at some of the <span className="font-bold">projects</span> I
        have worked on
      </p>

      <div className="flex flex-col gap-3 mb-5">
        <p className="text-sm font-medium">Filter by:</p>
        <div className="flex gap-2 flex-wrap">
          {mySkillsIsLoading || !mySkills
            ? Array.from({ length: 12 }).map((_, i) => (
                <span
                  key={i}
                  className="rounded-full bg-gray-800 w-[5.3894rem] h-[1.6138rem]"
                />
              ))
            : mySkills.map((skill) => (
                <span
                  key={skill.shortName}
                  className={`${
                    skills.includes(skill.shortName)
                      ? "bg-[var(--themeColor)] text-gray-800"
                      : "text-white bg-gray-800"
                  } font-medium text-[.7188rem] py-1 px-3 rounded-full cursor-pointer hover:scale-95`}
                  onClick={() => {
                    setSkills((prev) =>
                      prev.includes(skill.shortName)
                        ? prev.filter((s) => s !== skill.shortName)
                        : [...prev, skill.shortName]
                    );
                  }}
                >
                  {skill.fullName}
                </span>
              ))}
        </div>
      </div>

      <div className="flex flex-col gap-5">
        <div
          className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-5"
          data-aos="fade-up"
        >
          {isLoading || !data ? (
            Array.from({ length: 10 }).map((_, i) => (
              <ProjectCardSkeleton key={i} />
            ))
          ) : projects.length < 1 ? (
            <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
              <Rabbit size={100} strokeWidth={1} />

              <h3 className="text-lg font-semibold text-gray-800 mb-1">
                No projects found
              </h3>

              <p className="text-sm text-gray-500 max-w-md">
                There are no projects matching your selected filters at the
                moment. Try changing the filter to see more results.
              </p>
            </div>
          ) : (
            projects?.map((project: Project, index: number) => (
              <ProjectCard key={`${project.id} ${index}`} project={project} />
            ))
          )}
        </div>

        {hasNextPage && !isFetchingNextPage && (
          <div ref={observerRef} aria-hidden className="h-2" />
        )}

        {isFetchingNextPage && (
          <div className="flex justify-center py-6">
            <Loader2
              strokeWidth={2}
              className="text-[var(--themeColor)] animate-spin"
              size={50}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;
