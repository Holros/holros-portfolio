import { notifications } from "@mantine/notifications";
import { AxiosError } from "axios";

export const handleError = (error: unknown) => {
  if (error instanceof AxiosError) {
    if (error?.response?.data) {
      return {
        message: error.response.data.message as string,
        errors: error.response.data.errors || null,
      };
    }
    return {
      message: error?.message || "An error occurred. Please try again.",
      errors: null,
    };
  }

  if (error instanceof Error) {
    return {
      message: error.message,
      errors: null,
    };
  }

  return {
    message: "An error occurred",
    errors: null,
  };
};

export const showToast = (type: "success" | "error", message: string) => {
  return notifications.show({
    title: type === "success" ? "Success" : "Error",
    message: message,
    color: type === "success" ? "green" : "red",
  });
};

export const createFormData = (
  data: Record<string, any>,
  fileField: string,
  file: File | null
) => {
  const formData = new FormData();
  Object.keys(data).forEach((key) => {
    if (key === "skills") {
      formData.append("skills", JSON.stringify(data[key]));
      return;
    } else if (data[key] !== undefined && data[key] !== null) {
      formData.append(key, data[key]);
    }
  });
  if (file) {
    formData.append(fileField, file);
  }
  return formData;
};
