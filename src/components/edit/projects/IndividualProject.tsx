import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "api/api";
import { createFormData, handleError, showToast } from "api/utils";
import FancyButton from "components/general/FancyButton";
import Input from "components/inputs/Input";
import { Edit2, Trash2, UploadCloud } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

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

export default function IndividualProject({
  id,
  projectName,
  projectPicture,
  skills,
  availableSkills,
  isItAMobileApp,
  liveLink,
  githubLink,
  androidLink,
  iosLink,
}: {
  id: string;
  projectName: string;
  projectPicture: string;
  skills: Skill[];
  availableSkills: Skill[];
  isItAMobileApp: boolean;
  liveLink?: string;
  githubLink?: string;
  androidLink?: string;
  iosLink?: string;
}) {
  const queryClient = useQueryClient();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [opened, { open, close }] = useDisclosure(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setError,
    setValue,
  } = useForm<FormData>({
    defaultValues: {
      isMobileApp: isItAMobileApp,
      skills: skills,
      projectName: projectName,
      liveLink: liveLink,
      githubLink: githubLink,
      androidLink: androidLink,
      iosLink: iosLink,
    },
  });

  const isMobileApp = watch("isMobileApp");
  const currentSkills = watch("skills") || [];

  const updateMutation = useMutation({
    mutationFn: ({ data }: { data: FormData }) => {
      const formData = createFormData(data, "projectPicture", selectedFile);
      formData.set("isMobileApp", String(data.isMobileApp));
      return api.patch(`/admin/project/update/${id}`, formData, {
        useAuth: true,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/user/projects"] });
      close();
      showToast("success", "Project updated");
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

  const deleteMutation = useMutation({
    mutationFn: () =>
      api.delete(`/admin/project/delete/${id}`, { useAuth: true }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/user/projects"] });
      showToast("success", "Project deleted");
    },
    onError: (err: unknown) => {
      const error: ApiWithError = handleError(err);
      if (error.message && !error.errors) {
        showToast("error", error.message);
      }
    },
  });

  const onSubmit = (data: FormData) => {
    updateMutation.mutate({ data });
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
    <>
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
            <h3 className="text-lg font-bold">{"Edit Project"}</h3>
          </div>

          <div className="flex items-center gap-3 border border-gray-400 p-3 rounded bg-white">
            <input
              type="checkbox"
              defaultChecked={isItAMobileApp}
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
            <label className="text-sm font-medium">
              Project Image {"(Leave empty to keep current)"}
            </label>
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
          </div>

          <FancyButton
            text={"Update Project"}
            type="submit"
            isLoading={updateMutation.isPending}
          />
        </form>
      </Modal>
      <div
        key={id}
        className="flex gap-4 p-4 bg-white rounded-lg border border-gray-300 items-start shadow-md"
      >
        <img
          src={projectPicture}
          alt={projectName}
          className="w-20 h-20 object-cover rounded bg-gray-100"
        />
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-800">{projectName}</h3>
          <div className="flex gap-2 mt-1 flex-wrap">
            {skills.map((s) => (
              <span
                key={s.shortName}
                className="text-xs bg-gray-100 px-2 py-1 text-gray-700 rounded"
              >
                {s.fullName}
              </span>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <button
            onClick={open}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded transition"
            title="Edit"
          >
            <Edit2 size={20} />
          </button>
          <button
            onClick={() => {
              deleteMutation.mutate();
            }}
            className="p-2 text-red-600 hover:bg-gray-100 rounded transition"
            title="Delete"
          >
            <Trash2 size={20} />
          </button>
        </div>
      </div>
    </>
  );
}
