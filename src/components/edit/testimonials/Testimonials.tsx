import { Modal } from "@mantine/core";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "api/api";
import { createFormData, handleError, showToast } from "api/utils";
import FancyButton from "components/general/FancyButton";
import Input from "components/inputs/Input";
import TextFieldInput from "components/inputs/TextFieldInput";
import { Loader2, Plus, UploadCloud } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDisclosure } from "@mantine/hooks";
import IndividualTestimonials from "./IndividualTestimonials";

interface FormData {
  id: string;
  firstName: string;
  lastName: string;
  testimonial: string;
  profilePicture: string;
}

export default function Testimonials() {
  const queryClient = useQueryClient();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [opened, { open, close }] = useDisclosure(false);

  const { data, isLoading } = useQuery({
    queryKey: ["/user"],
    queryFn: async (): Promise<User> => (await api.get("/user")).data.data,
  });

  const testimonials = data?.testimonials;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm<FormData>();

  const createMutation = useMutation({
    mutationFn: (data: FormData) => {
      const formData = createFormData(data, "profilePicture", selectedFile);
      return api.post("/admin/testimonial/create", formData, { useAuth: true });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/user"] });
      close();
      reset();
      showToast("success", "Testimonial added");
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
      <Modal
        size="lg"
        opened={opened}
        onClose={close}
        withCloseButton={true}
        title="New Testimonial"
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-6 rounded-lg flex flex-col gap-4 border border-gray-300 animate-in slide-in-from-top-4 fade-in"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

          <TextFieldInput
            errors={errors}
            placeholder="Insert testimonial here..."
            register={register}
            registerName="testimonial"
            label="Testimonial"
            validation={{
              required: "Required",
              minLength: { value: 10, message: "Too short" },
            }}
          />

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Client Picture</label>
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
            text={"Add Testimonial"}
            type="submit"
            isLoading={createMutation.isPending}
          />
        </form>
      </Modal>
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Testimonials</h2>
        <button
          onClick={open}
          className={`flex items-center gap-2 px-4 py-2 rounded font-bold ${"bg-gray-600 text-white hover:bg-gray-700"}`}
        >
          {<Plus size={18} />}
          {"Add New"}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {isLoading ? (
          <Loader2 className="animate-spin" />
        ) : (
          testimonials?.map((t: Testimonial) => (
            <IndividualTestimonials
              id={t.id}
              firstName={t.firstName}
              lastName={t.lastName}
              testimonial={t.testimonial}
              profilePicture={t.profilePicture}
            />
          ))
        )}
      </div>
    </div>
  );
}
