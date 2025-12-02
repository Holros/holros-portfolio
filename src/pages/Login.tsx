import PageWrapper from "components/wrappers/PageWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "redux/store";
import { RegisterOptions, useForm } from "react-hook-form";
import FancyButton from "components/general/FancyButton";
import { useMutation } from "@tanstack/react-query";
import api, { setAuthTokens } from "api/api";
import { AxiosError } from "axios";
import Input from "components/inputs/Input";
import PasswordInput from "components/inputs/PasswordInput";
import { login } from "../redux/slice/isLoggedInSlice";
import { handleError } from "api/utils";

interface FormData {
  email: string;
  password: string;
}

const inputArray: {
  label: string;
  name: keyof FormData;
  type: string;
  placeholder: string;
  validation: RegisterOptions<FormData, keyof FormData>;
}[] = [
  {
    label: "Email",
    name: "email",
    type: "text",
    placeholder: "Enter your email address",
    validation: {
      required: {
        value: true,
        message: `Email address is required`,
      },
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: "Enter a valid email address",
      },
    },
  },
  {
    label: "Password*",
    name: "password",
    type: "password",
    placeholder: "Enter your password",
    validation: {
      required: {
        value: true,
        message: `Password is required`,
      },
    },
  },
];

export default function Login() {
  const theme = useSelector((state: RootState) => state.theme.value);
  const dispatch = useDispatch();

  const [nonFieldError, setNonFieldError] = useState<string | null>("");

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormData>({});

  const { isPending, mutate } = useMutation({
    mutationKey: ["/auth/login"],
    mutationFn: async (
      formData: FormData
    ): Promise<{
      accessToken: string;
      refreshToken: string;
    }> => {
      const { data } = await api.post("/auth/login", formData);
      return data.data.tokens;
    },
    retry: false,
    onSuccess: (data) => {
      setAuthTokens(data.accessToken, data.refreshToken);
      dispatch(login());
    },
    onError: (err: AxiosError) => {
      const error: ApiWithFormError<FormData> = handleError(err);
      if (error.errors) {
        error.errors.forEach((e) => {
          setError(e.field, {
            message: e.message,
          });
        });
      }
      if (error.message && !error.errors) {
        setNonFieldError(error.message);
      }
    },
  });

  const onSubmit = (data: FormData) => {
    mutate(data);
  };

  return (
    <PageWrapper heading="LOGIN">
      <div
        className="flex flex-col gap-[3.4375rem]"
        style={{ "--themeColor": theme } as React.CSSProperties}
      >
        <p className="text-xl" data-aos="zoom-in">
          Welcome back — <span className="font-bold">sign in</span> to edit your
          portfolio.
        </p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-[2.75rem] w-full max-w-lg mx-auto"
        >
          <div className="flex flex-col gap-5">
            <Input
              type="email"
              label="Email"
              registerName="email"
              placeholder="Enter your email address"
              register={register}
              errors={errors}
              validation={inputArray[0].validation}
            />
            <PasswordInput
              label="Password"
              registerName="password"
              placeholder="Enter your password"
              register={register}
              errors={errors}
              validation={inputArray[1].validation}
            />

            {nonFieldError && (
              <p className="text-center text-red-500 -mt-2 -mb-8">
                {nonFieldError}
              </p>
            )}
          </div>

          <FancyButton text="Log in" type="submit" isLoading={isPending} />
        </form>
      </div>
    </PageWrapper>
  );
}
