import { Modal } from "@mantine/core";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "api/api";
import { handleError, showToast } from "api/utils";
import { Edit2, Trash2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { useDisclosure } from "@mantine/hooks";
import Input from "components/inputs/Input";
import FancyButton from "components/general/FancyButton";

interface FormData {
  id?: string;
  shortName: string;
  fullName: string;
}

export default function IndvidualSkill({
  shortName,
  fullName,
}: {
  shortName: string;
  fullName: string;
}) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormData>();

  const [opened, { open, close }] = useDisclosure(false);

  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: ({ data }: { data: FormData }) =>
      api.patch(`/admin/skill/update/${shortName}`, data, {
        useAuth: true,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/user"] });
      queryClient.invalidateQueries({ queryKey: ["/user/skills"] });
      close();
      showToast("success", "Skill updated");
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
      api.delete(`/admin/skill/delete/${shortName}`, { useAuth: true }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/user"] });
      queryClient.invalidateQueries({ queryKey: ["/user/skills"] });
      showToast("success", "Skill deleted");
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
        title="Edit Skill"
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 bg-gray-100 p-4 rounded-lg border border-gray-300"
        >
          <div className="flex flex-col gap-4 md:flex-row flex-1 *:flex-1">
            <Input
              placeholder="Enter full name"
              label="Full Name"
              registerName="fullName"
              defaultValue={fullName}
              register={register}
              errors={errors}
              validation={{ required: "Required" }}
            />
            <Input
              label="Short Name (ID)"
              registerName="shortName"
              placeholder="lowercase, no spaces"
              defaultValue={shortName}
              register={register}
              errors={errors}
              validation={{ required: "Required" }}
            />
          </div>
          <div className="flex flex-col gap-2 items-center">
            <FancyButton
              text={"Update"}
              type="submit"
              isLoading={updateMutation.isPending}
            />
          </div>
        </form>
      </Modal>

      <div
        key={shortName}
        className={`flex justify-between items-center p-3 rounded border border-gray-300 bg-white shadow-sm`}
      >
        <span className="font-medium truncate mr-2 text-gray-800">
          {fullName}
        </span>
        <div className="flex gap-2">
          <button
            onClick={open}
            className="text-gray-600 hover:text-gray-800 transition-colors"
          >
            <Edit2 size={16} />
          </button>
          <button
            onClick={() => deleteMutation.mutate()}
            className="text-red-600 hover:text-red-800 transition-colors"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </>
  );
}
