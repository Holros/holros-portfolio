import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "api/api";
import { handleError, showToast } from "api/utils";
import FancyButton from "components/general/FancyButton";
import Input from "components/inputs/Input";
import TextFieldInput from "components/inputs/TextFieldInput";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  homePageAbout: string;
  jobTitle: string;
  landingPageAbout: string;
  resumeLink: string;
  password?: string;
}

export default function ProfileInfo() {
  const { data: userData, isLoading } = useQuery({
    queryKey: ["/user"],
    queryFn: async (): Promise<User> => (await api.get("/user")).data.data,
  });

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormData>({
    values: userData
      ? {
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
          homePageAbout: userData.homePageAbout,
          jobTitle: userData.jobTitle,
          landingPageAbout: userData.landingPageAbout,
          resumeLink: userData.resumeLink,
        }
      : undefined,
  });

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: FormData) => {
      // Remove password if empty to avoid hashing empty string
      const payload = { ...data };
      if (!payload.password) delete payload.password;
      return api.patch("/admin/user/update", payload, { useAuth: true });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/user"] });
      showToast("success", "Profile updated successfully");
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

  if (isLoading) return <Loader2 className="animate-spin text-gray-500" />;

  return (
    <form
      onSubmit={handleSubmit((data) => {
        mutate(data);
      })}
      className="flex flex-col gap-5 max-w-2xl"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Input
          placeholder=""
          label="First Name"
          registerName="firstName"
          register={register}
          errors={errors}
          validation={{ required: "Required" }}
        />
        <Input
          placeholder=""
          label="Last Name"
          registerName="lastName"
          register={register}
          errors={errors}
          validation={{ required: "Required" }}
        />
      </div>
      <Input
        placeholder=""
        label="Job Title"
        registerName="jobTitle"
        register={register}
        errors={errors}
        validation={{ required: "Required" }}
      />
      <TextFieldInput
        errors={errors}
        placeholder=""
        register={register}
        registerName="homePageAbout"
        label="Home Page About"
        validation={{ required: "Required" }}
      />
      <TextFieldInput
        errors={errors}
        placeholder=""
        register={register}
        registerName="landingPageAbout"
        label="Landing Page About"
        validation={{ required: "Required" }}
      />
      <Input
        placeholder=""
        label="Resume Link"
        registerName="resumeLink"
        register={register}
        errors={errors}
        validation={{ required: "Required" }}
      />
      <Input
        placeholder=""
        label="New Password (optional)"
        registerName="password"
        type="password"
        register={register}
        errors={errors}
      />

      <FancyButton text="Update Profile" type="submit" isLoading={isPending} />
    </form>
  );
}
