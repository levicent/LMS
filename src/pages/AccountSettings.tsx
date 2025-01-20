import { useState } from "react";
import DefaultLayout from "../layout/DefaultLayout";
import { useForm } from "react-hook-form";
import { useTheme } from "../context/themeContext";
import { useUpdateUser } from "../hooks/useUpdateUser";
import { useFetchUserProfile } from "../hooks/useFetchUserProfile";
import { toast } from "react-toastify";

const Settings = () => {
  interface FormData {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
  }

  const { data: user } = useFetchUserProfile();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user?.email,
      phone: user?.phone,
    },
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");

  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };




  const handleCancel = () => {
    // Reset form to initial values
    reset({
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user?.email,
      phone: user?.phone,
    });
    // Reset file selection and preview
    setSelectedFile(null);
    setPreviewUrl("");
    toast.info("Changes reverted");
  };

  const { mutate, isLoading } = useUpdateUser({
    onSuccess: (data) => {
      console.log(data);
      toast.success("User updated successfully");
    },
    onError: (error) => {
      console.error("Error updating user:", error);
      toast.error(error?.response?.data?.message);
    },
  });




  const handleDeleteClick = () => {
    // Reset the selected file and preview
    setSelectedFile(null);
    setPreviewUrl("");
    toast.info("Profile picture deleted");
  };

  const onSubmit = (data: FormData) => {
    const formData = new FormData();
    formData.append("firstName", data.firstName || "");
    formData.append("lastName", data.lastName || "");
    formData.append("email", data.email || "");
    formData.append("phone", data.phone || "");

    if (selectedFile) {
      formData.append("profilePicture", selectedFile);
    }

    if (!isLoading) {
      mutate(formData as FormData);
    }
    if (isLoading) {

      toast.info('Updating please wait')
    }

  };
  const { theme } = useTheme();

  return (
    <DefaultLayout>
      <div
        className={`mx-auto p-6 dark:bg-gray-900 flex justify-center ${theme === "dark" ? "dark" : ""
          }`}
      >
        <div className="bg-white dark:bg-gray-900 max-w-screen-lg p-4 md:p-8 shadow-md rounded-lg w-full">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form Section */}
            <div className="col-span-1 lg:col-span-2">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
                <h3 className="font-medium text-2xl text-black dark:text-white mb-6">
                  Personal Information
                </h3>

                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {/* First Name */}
                    <div className="col-span-2 md:col-span-1">
                      <label
                        className="block text-sm font-medium text-gray-700 dark:text-white mb-2"
                        htmlFor="firstName"
                      >
                        First Name
                      </label>
                      <input
                        className="w-full rounded-md border border-gray-300 dark:border-gray-600 py-2 px-4 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:text-white"
                        type="text"
                        id="firstName"
                        placeholder="First Name"
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
                    <div className="col-span-2 md:col-span-1">
                      <label
                        className="block text-sm font-medium text-gray-700 dark:text-white mb-2"
                        htmlFor="lastName"
                      >
                        Last Name
                      </label>
                      <input
                        className="w-full rounded-md border border-gray-300 dark:border-gray-600 py-2 px-4 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:text-white"
                        type="text"
                        id="lastName"
                        placeholder="Last Name"
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
                        className="w-full rounded-md border border-gray-300 dark:border-gray-600 py-2 px-4 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:text-white"
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
                        className="w-full rounded-md border border-gray-300 dark:border-gray-600 py-2 px-4 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:text-white"
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
                  </div>

                  <div className="flex justify-between mt-6">
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="w-1/2 mr-2 bg-gray-500 hover:bg-gray-600 text-white py-2 rounded-md font-semibold transition-colors duration-200 focus:outline-none"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="w-1/2 ml-2 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-semibold transition-colors duration-200 focus:outline-none"
                      disabled={isLoading}
                    >
                      {isLoading ? "Please wait" : "Save Changes"}
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Image Upload Section */}
            <div className="col-span-1">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
                <h3 className="font-medium text-2xl text-black dark:text-white mb-6">
                  Your Photo
                </h3>

                <form>
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden">
                      <img
                        className="w-full h-full object-cover"
                        src={
                          previewUrl ||
                          "image/blank-profile-picture-973460_1280.png"
                        }
                        alt="User"
                      />
                    </div>
                    <div className="ml-4">
                      {/* <button
                        type="button"
                        className="text-sm text-blue-600 hover:text-blue-700 focus:outline-none"
                      >
                        Update
                      </button> */}
                      <button
                        type="button"
                        className="text-sm text-red-600 hover:text-red-700 focus:outline-none ml-4"
                        onClick={handleDeleteClick}
                      >
                        Delete
                      </button>
                    </div>
                  </div>

                  <div
                    className="relative mb-5 border-2 border-dashed border-gray-300 rounded-md py-6 px-6 text-center cursor-pointer bg-gray-100 dark:bg-gray-700 dark:text-white hover:border-blue-500 transition-colors"
                    id="FileUpload"
                  >
                    <input
                      type="file"
                      accept="image/*"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      onChange={handleFileChange}
                    />
                    <p className="text-gray-500 dark:text-gray-300">
                      <span className="text-blue-600">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-sm text-gray-400 dark:text-gray-500">
                      SVG, PNG, JPG, GIF (max. 800x400px)
                    </p>
                  </div>

                  <div className="flex justify-between">
                    {/* <button
                      type="submit"
                      className="w-1/2 ml-2 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-semibold transition-colors duration-200 focus:outline-none"
                    >
                      Save
                    </button> */}
                  </div>
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
