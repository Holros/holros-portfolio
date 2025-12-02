import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "api/api";
import { handleError, showToast } from "api/utils";
import FancyButton from "components/general/FancyButton";
import Input from "components/inputs/Input";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import IndvidualSkill from "./IndvidualSkill";

interface FormData {
  id?: string;
  shortName: string;
  fullName: string;
}

export default function Skills() {
  const queryClient = useQueryClient();

  const { data: skills, isLoading } = useQuery({
    queryKey: ["/user/skills"],
    queryFn: async (): Promise<Skill[]> =>
      (await api.get("/user/skills")).data.data,
  });

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<FormData>();

  const createMutation = useMutation({
    mutationFn: (data: FormData) =>
      api.post("/admin/skill/create", data, { useAuth: true }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/user"] });
      queryClient.invalidateQueries({ queryKey: ["/user/skills"] });
      reset();
      showToast("success", "Skill added");
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
  return (
    <div className="flex flex-col gap-8">
      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 bg-gray-100 p-4 rounded-lg border border-gray-300"
      >
        <div className="flex flex-col gap-4 md:flex-row flex-1 *:flex-1">
          <Input
            placeholder="Enter full name"
            label="Full Name"
            registerName="fullName"
            register={register}
            errors={errors}
            validation={{ required: "Required" }}
          />
          <Input
            label="Short Name (ID)"
            registerName="shortName"
            placeholder="lowercase, no spaces"
            register={register}
            errors={errors}
            validation={{ required: "Required" }}
          />
        </div>
        <div className="flex flex-col gap-2 items-center">
          <FancyButton
            text={"Add"}
            type="submit"
            isLoading={createMutation.isPending}
          />
        </div>
      </form>

      {/* List */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {isLoading ? (
          <Loader2 className="animate-spin" />
        ) : (
          skills?.map((skill: Skill) => (
            <IndvidualSkill
              key={skill.shortName}
              shortName={skill.shortName}
              fullName={skill.fullName}
            />
          ))
        )}
      </div>
    </div>
  );
}
