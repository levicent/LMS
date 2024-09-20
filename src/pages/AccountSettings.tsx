import DefaultLayout from "../layout/DefaultLayout";
import { useForm } from "react-hook-form";
import { useTheme } from "../context/themeContext";
import { useUpdateUser } from "../hooks/useUpdateUser";
import { useFetchUserProfile } from "../hooks/useFetchUserProfile";
import { useEffect } from "react";

const Settings = () => {
  interface FormData {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    // password?: string;
    // confirmPassword?: string;
  }

  const { data: user } = useFetchUserProfile();

  const {
    register,
    handleSubmit,
    // watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user?.email,
      phone: user?.phone,
      // password: user?.password,
      // confirmPassword: user?.password,
    },
  });

  useEffect(() => {
    if (user) {
      setValue("firstName", user.firstName);
      setValue("lastName", user.lastName);
      setValue("email", user.email);
      setValue("phone", user.phone);
    }
  }, [user, setValue]);

  const { mutate } = useUpdateUser({
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.error("Error updating user:", error);
    },
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
    // const { confirmPassword, password, ...rest } = data;
    // if (password !== confirmPassword) {
    //   console.log("Passwords do not match");
    // }
    // console.log({ ...rest, password });
    // mutate({ ...rest, password });
    mutate(data);
  };

  // Watch password to validate confirm password
  // const password = watch("password");

  const { theme } = useTheme();

  return (
    <DefaultLayout>
      <div
        className={`mx-auto p-6 dark:bg-gray-900 flex justify-center ${
          theme === "dark" ? "dark" : ""
        }`}
      >
        <div className="bg-white dark:bg-gray-900 max-w-screen-lg">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            <div className="col-span-1 xl:col-span-2">
              <div className="bg-white dark:bg-boxdark rounded p-6 dark:bg-gray-800 shadow-lg">
                <h3 className="font-medium text-xl text-black dark:text-white mb-4">
                  Personal Information
                </h3>

                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {/* First Name */}
                    <div className="col-span-2">
                      <label
                        className="block text-sm font-medium text-gray-700 dark:text-white mb-2"
                        htmlFor="firstName"
                      >
                        First Name
                      </label>
                      <input
                        className="w-full rounded-md border border-gray-300 dark:border-strokedark py-2 px-4 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:text-white dark:border-none"
                        type="text"
                        id="firstName"
                        placeholder="Your First Name"
                        {...register("firstName", {
                          required: false,
                        })}
                      />
                      {errors.firstName && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.firstName.message}
                        </p>
                      )}
                    </div>

                    {/* Last Name */}
                    <div className="col-span-2">
                      <label
                        className="block text-sm font-medium text-gray-700 dark:text-white mb-2"
                        htmlFor="lastName"
                      >
                        Last Name
                      </label>
                      <input
                        className="w-full rounded-md border border-gray-300 dark:border-strokedark py-2 px-4 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:text-white dark:border-none"
                        type="text"
                        id="lastName"
                        placeholder="Your Last Name"
                        {...register("lastName", {
                          required: false,
                        })}
                      />
                      {errors.lastName && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.lastName.message}
                        </p>
                      )}
                    </div>

                    {/* Phone Number */}
                    <div className="col-span-2">
                      <label
                        className="block text-sm font-medium text-gray-700 dark:text-white mb-2"
                        htmlFor="phone"
                      >
                        Phone Number
                      </label>
                      <input
                        className="w-full rounded-md border border-gray-300 dark:border-strokedark py-2 px-4 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:text-white dark:border-none"
                        type="text"
                        id="phone"
                        placeholder="Phone Number"
                        {...register("phone", {
                          required: false,
                          pattern: {
                            value: /^[0-9]*$/,
                            message: "Invalid phone number",
                          },
                        })}
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.phone.message}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div className="col-span-2">
                      <label
                        className="block text-sm font-medium text-gray-700 dark:text-white mb-2"
                        htmlFor="email"
                      >
                        Email Address
                      </label>
                      <input
                        className="w-full rounded-md border border-gray-300 dark:border-strokedark py-2 px-4 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:text-white dark:border-none"
                        type="email"
                        id="email"
                        placeholder="Email Address"
                        {...register("email", {
                          required: false,
                          pattern: {
                            value:
                              /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                            message: "Invalid email address",
                          },
                        })}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.email.message}
                        </p>
                      )}
                    </div>

                    {/* Password */}
                    {/* <div className="col-span-2">
                      <label
                        className="block text-sm font-medium text-gray-700 dark:text-white mb-2"
                        htmlFor="password"
                      >
                        Password
                      </label>
                      <input
                        className="w-full rounded-md border border-gray-300 dark:border-strokedark py-2 px-4 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:text-white dark:border-none"
                        type="password"
                        id="password"
                        placeholder="Change password"
                        {...register("password", {
                          required: false,
                          minLength: {
                            value: 6,
                            message: "Password must be at least 6 characters",
                          },
                        })}
                      />
                      {errors.password && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.password.message}
                        </p>
                      )}
                    </div> */}

                    {/* Confirm Password */}
                    {/* <div className="col-span-2">
                      <label
                        className="block text-sm font-medium text-gray-700 dark:text-white mb-2"
                        htmlFor="confirmPassword"
                      >
                        Re-type password
                      </label>
                      <input
                        className="w-full rounded-md border border-gray-300 dark:border-strokedark py-2 px-4 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:text-white dark:border-none"
                        type="password"
                        id="confirmPassword"
                        placeholder="Re-type password"
                        {...register("confirmPassword", {
                          required: false,
                          validate: (value) =>
                            value === password || "Passwords do not match",
                        })}
                      />
                      {errors.confirmPassword && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.confirmPassword.message}
                        </p>
                      )}
                    </div> */}
                  </div>

                  <button
                    className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-semibold transition-colors duration-200 focus:outline-none"
                    type="submit"
                  >
                    Save Changes
                  </button>
                </form>
              </div>
            </div>
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Your Photo
                </h3>
              </div>
              <div className="p-7">
                <form action="#">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="h-14 w-14 rounded-full">
                      <img
                        src="image/blank-profile-picture-973460_1280.png"
                        alt="User"
                      />
                    </div>
                    <div>
                      <span className="mb-1.5 text-black dark:text-white">
                        Edit your photo
                      </span>
                      <span className="flex gap-2.5">
                        <button className="text-sm hover:text-primary">
                          Delete
                        </button>
                        <button className="text-sm hover:text-primary">
                          Update
                        </button>
                      </span>
                    </div>
                  </div>

                  <div
                    id="FileUpload"
                    className="relative mb-5.5 block w-full cursor-pointer appearance-none rounded border border-dashed border-primary bg-gray py-4 px-4 dark:bg-meta-4 sm:py-7.5"
                  >
                    <input
                      type="file"
                      accept="image/*"
                      className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
                    />
                    <div className="flex flex-col items-center justify-center space-y-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M7.99999 3.33333V12.6667"
                            stroke="white"
                            strokeWidth="1.25"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M3.33331 8H12.6666"
                            stroke="white"
                            strokeWidth="1.25"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                      <p>
                        <span className="text-primary">Click to upload</span> or
                        drag and drop
                      </p>
                      <p className="mt-1.5">
                        SVG, PNG, JPG or GIF (max. 800x400px)
                      </p>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90 lg:px-8 xl:px-10"
                  >
                    Save
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Settings;
