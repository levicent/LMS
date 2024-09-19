import DefaultLayout from "../layout/DefaultLayout";

const Settings = () => {
  return (
    <DefaultLayout>
      <div
        className={`mx-auto p-6 dark:bg-gray-900 flex justify-center $
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

                <form>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
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
                        name="firstName"
                        id="firstName"
                        placeholder="Your First Name"
                      />
                    </div>
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
                        name="lastName"
                        id="lastName"
                        placeholder="Your Last Name"
                      />
                    </div>

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
                        name="phone"
                        id="phone"
                        placeholder="Phone Number"
                      />
                    </div>

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
                        name="email"
                        id="email"
                        placeholder="Email Address"
                      />
                    </div>

                    <div className="col-span-2">
                      <label
                        className="block text-sm font-medium text-gray-700 dark:text-white mb-2"
                        htmlFor="password"
                      >
                        Password
                      </label>
                      <input
                        className="w-full rounded-md border border-gray-300 dark:border-strokedark py-2 px-4 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:text-white dark:border-none"
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Change password"
                      />
                    </div>

                    <div className="col-span-2">
                      <label
                        className="block text-sm font-medium text-gray-700 dark:text-white mb-2"
                        htmlFor="password"
                      >
                        Re-type password
                      </label>
                      <input
                        className="w-full rounded-md border border-gray-300 dark:border-strokedark py-2 px-4 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:text-white dark:border-none"
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Re-type password"
                      />
                    </div>
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

            <div className="col-span-1">
              <div className="bg-white dark:bg-boxdark rounded shadow-md p-6">
                <h3 className="font-medium text-xl text-black dark:text-white mb-4">
                  Subscription Status
                </h3>
                <div className="text-gray-700 dark:text-gray-300">
                  <p className="text-green-600 dark:text-green-400">
                    Your subscription is active until <span>date</span>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Settings;
