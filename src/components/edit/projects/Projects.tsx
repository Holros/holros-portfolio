import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import api from "api/api";
import { createFormData, handleError, showToast } from "api/utils";
import FancyButton from "components/general/FancyButton";
import Input from "components/inputs/Input";
import { Loader2, Plus, UploadCloud } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import IndividualProject from "./IndividualProject";

interface FormData {
  id: string;
  isMobileApp: boolean;
  projectName: string;
  githubLink?: string;
  liveLink?: string;
  androidLink?: string;
  iosLink?: string;
  skills: { fullName: string; shortName: string }[];
  projectPicture: string;
}

export default function Projects() {
  const queryClient = useQueryClient();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [opened, { open, close }] = useDisclosure(false);

  const { data: availableSkills } = useQuery({
    queryKey: ["/user/skills"],
    queryFn: async (): Promise<Skill[]> =>
      (await api.get("/user/skills")).data.data,
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
      },
    });
    return response.data.data;
  };

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["/user/projects"],
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
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
    setValue,
    setError,
  } = useForm<FormData>({
    defaultValues: { isMobileApp: false, skills: [] },
  });

  const isMobileApp = watch("isMobileApp");
  const currentSkills = watch("skills") || [];

  const createMutation = useMutation({
    mutationFn: (data: FormData) => {
      const formData = createFormData(data, "projectPicture", selectedFile);
      formData.set("isMobileApp", String(data.isMobileApp));
      return api.post("/admin/project/create", formData, { useAuth: true });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/user/projects"] });
      close();
      reset();
      setSelectedFile(null);
      showToast("success", "Project created");
    },
    onError: (err: unknown) => {
      const error: ApiWithFormError<FormData> = handleError(err);
      if (error.errors) {
        error.errors.forEach((e) => {
          setError(e.field, {
            message: e.message,
          });
        });
      }
      if (error.message && !error.errors) {
        showToast("error", error.message);
      }
    },
  });

  const onSubmit = (data: FormData) => {
    createMutation.mutate(data);
  };

  const handleSkillChange = (shortName: string, checked: boolean) => {
    const skillObj = availableSkills?.find(
      (s: Skill) => s.shortName === shortName
    );
    if (!skillObj) return;

    if (checked) {
      setValue("skills", [
        ...currentSkills,
        { shortName, fullName: skillObj.fullName },
      ]);
    } else {
      setValue(
        "skills",
        currentSkills.filter((s) => s.shortName !== shortName)
      );
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <Modal
        size="lg"
        opened={opened}
        onClose={close}
        withCloseButton={true}
        title="New Testimonial"
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-6 rounded-lg flex flex-col gap-4 animate-in slide-in-from-top-4 fade-in"
        >
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-bold">{"New Project"}</h3>
          </div>

          <div className="flex items-center gap-3 border border-gray-400 p-3 rounded bg-white">
            <input
              type="checkbox"
              id="isMobile"
              {...register("isMobileApp")}
              className="w-5 h-5 accent-gray-600"
            />
            <label htmlFor="isMobile" className="font-bold cursor-pointer">
              Is this a Mobile App?
            </label>
          </div>

          <Input
            placeholder=""
            label="Project Name"
            registerName="projectName"
            register={register}
            errors={errors}
            validation={{ required: "Required" }}
          />

          {isMobileApp ? (
            <div key="mobile" className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                placeholder=""
                label="Android Link"
                registerName="androidLink"
                register={register}
                errors={errors}
                validation={{ required: "Required for Mobile Apps" }}
              />
              <Input
                placeholder=""
                label="iOS Link"
                registerName="iosLink"
                register={register}
                errors={errors}
                validation={{ required: "Required for Mobile Apps" }}
              />
            </div>
          ) : (
            <div key="web" className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                placeholder=""
                label="Live Link"
                registerName="liveLink"
                register={register}
                errors={errors}
              />
              <Input
                placeholder=""
                label="Github Link"
                registerName="githubLink"
                register={register}
                errors={errors}
              />
            </div>
          )}

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Technologies Used</label>
            <div className="flex flex-wrap gap-2 p-3 rounded border border-gray-300 max-h-40 overflow-y-auto bg-white">
              {availableSkills?.map((skill: Skill) => {
                const isChecked = currentSkills.some(
                  (s) => s.shortName === skill.shortName
                );
                return (
                  <label
                    key={skill.shortName}
                    className={`flex items-center gap-2 cursor-pointer px-2 py-1 rounded border transition-colors ${
                      isChecked
                        ? "bg-gray-100 border-gray-400 text-gray-800"
                        : "bg-gray-200 border-gray-300 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={(e) =>
                        handleSkillChange(skill.shortName, e.target.checked)
                      }
                      className="accent-gray-600"
                    />
                    <input type="hidden" {...register("skills")} />
                    <span className="text-sm">{skill.fullName}</span>
                  </label>
                );
              })}
            </div>
            {errors.skills && (
              <span className="text-red-500 text-sm">
                {errors.skills.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Project Image</label>
            <div className="relative border-2 border-dashed border-gray-400 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:border-gray-600 transition-colors bg-white">
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  e.target.files && setSelectedFile(e.target.files[0])
                }
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <UploadCloud size={32} className="mb-2 text-gray-500" />
              <p className="text-sm text-gray-700">
                {selectedFile ? selectedFile.name : "Click to upload image"}
              </p>
            </div>
            {errors.projectPicture && (
              <span className="text-red-500 text-sm">
                {errors.projectPicture.message}
              </span>
            )}
          </div>

          <FancyButton
            text={"Create Project"}
            type="submit"
            isLoading={createMutation.isPending}
          />
        </form>
      </Modal>
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Projects List</h2>
        <button
          onClick={open}
          className={`flex items-center gap-2 px-4 py-2 rounded font-bold transition ${"bg-gray-600 text-white hover:bg-gray-700"}`}
        >
          {<Plus size={18} />}
          {"Add New Project"}
        </button>
      </div>

      {/* List */}
      <div className="flex flex-col gap-4">
        {isLoading ? (
          <Loader2 className="animate-spin self-center" />
        ) : projects.length < 1 ? (
          <p className="text-center text-gray-500">No projects found.</p>
        ) : (
          projects?.map((project: Project) => (
            <IndividualProject
              key={project.id}
              id={project.id}
              projectName={project.projectName}
              projectPicture={project.projectPicture}
              skills={project.skills}
              availableSkills={availableSkills || []}
              isItAMobileApp={project.isMobileApp}
              githubLink={project.githubLink ? project.githubLink : undefined}
              liveLink={project.liveLink ? project.liveLink : undefined}
              androidLink={
                project.androidLink ? project.androidLink : undefined
              }
              iosLink={project.iosLink ? project.iosLink : undefined}
            />
          ))
        )}
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
}
