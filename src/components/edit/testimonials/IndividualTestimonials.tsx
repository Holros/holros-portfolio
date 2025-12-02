import { Modal } from "@mantine/core";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "api/api";
import { createFormData, handleError, showToast } from "api/utils";
import FancyButton from "components/general/FancyButton";
import Input from "components/inputs/Input";
import TextFieldInput from "components/inputs/TextFieldInput";
import { Edit2, Trash2, UploadCloud } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDisclosure } from "@mantine/hooks";


interface FormData {
  id: string;
  firstName: string;
  lastName: string;
  testimonial: string;
  profilePicture: string;
}

export default function IndividualTestimonials({
  id,
  firstName,
  lastName,
  profilePicture,
  testimonial,
}: {
  id: string;
  firstName: string;
  lastName: string;
  testimonial: string;
  profilePicture: string;
}) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [opened, { open, close }] = useDisclosure(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormData>();

  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: ({ data }: { data: FormData }) => {
      const formData = createFormData(data, "profilePicture", selectedFile);
      return api.patch(`/admin/testimonial/update/${id}`, formData, {
        useAuth: true,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/user"] });
      close();
      showToast("success", "Testimonial updated");
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
      api.delete(`/admin/testimonial/delete/${id}`, { useAuth: true }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/user"] });
      showToast("success", "Testimonial deleted");
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

  return (
    <>
      <Modal
        size="lg"
        opened={opened}
        onClose={close}
        withCloseButton={true}
        title="Edit Testimonial"
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-6 rounded-lg flex flex-col gap-4 border border-gray-300 animate-in slide-in-from-top-4 fade-in"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              defaultValue={firstName}
              placeholder=""
              label="First Name"
              registerName="firstName"
              register={register}
              errors={errors}
              validation={{ required: "Required" }}
            />
            <Input
              defaultValue={lastName}
              placeholder=""
              label="Last Name"
              registerName="lastName"
              register={register}
              errors={errors}
              validation={{ required: "Required" }}
            />
          </div>

          <TextFieldInput
            defaultValue={testimonial}
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
            <label className="text-sm font-medium">
              Client Picture {"(Leave empty to keep current)"}
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
            text={"Update Testimonial"}
            type="submit"
            isLoading={updateMutation.isPending}
          />
        </form>
      </Modal>
      <div className="bg-white p-4 rounded-lg border border-gray-300 flex gap-4 shadow-sm">
        <img
          src={profilePicture}
          alt={firstName}
          className="w-12 h-12 rounded-full object-cover bg-gray-100"
        />
        <div className="flex-1">
          <p className="font-bold text-gray-800">
            {firstName} {lastName}
          </p>
          <p className="text-sm italic line-clamp-3 text-gray-600">
            "{testimonial}"
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <button
              onClick={open}
            className="text-gray-600 hover:text-gray-800"
            title="Edit"
          >
            <Edit2 size={16} />
          </button>
          <button
            onClick={() => {
              deleteMutation.mutate();
            }}
            className="text-red-600 hover:text-red-800"
            title="Delete"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </>
  );
}
