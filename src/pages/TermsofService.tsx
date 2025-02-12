import DefaultLayout from "@/layout/DefaultLayout";
import React from "react";

const TermsOfService: React.FC = () => {
    return (
        <DefaultLayout>

            <div className="flex-grow bg-gray-100 dark:bg-gray-900 p-6 lg:px-16 lg:py-12">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6 text-center">
                    Terms of Service
                </h1>
                <p className="mb-4 text-gray-600 dark:text-gray-300">
                    Welcome to Gurusolas LMS! These Terms of Service ("Terms") govern your
                    use of the Gurusolas Learning Management System (LMS), including all
                    courses, content, services, and features provided by Gurusolas. By
                    accessing or using our platform, you agree to abide by these Terms. If
                    you do not agree, please do not use our services.
                </p>

                <div className="mb-4">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white mt-6">
                        Website and Service
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300">
                        Gurusolas LMS provides a learning management system via the website at{" "}
                        <a
                            href="https://www.gurusolas.in"
                            className="text-blue-600 hover:underline"
                        >
                            www.gurusolas.in
                        </a>{" "}
                        and its subdomains ("Website"), which enables you to create and manage
                        online courses ("Service").
                    </p>
                </div>

                <div className="mb-4">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white mt-6">
                        Licence
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300">
                        If you follow these Terms, we grant you a non-exclusive,
                        non-transferable licence to access and use the Service via the Website
                        according to the specifications of the subscription plan you have paid
                        for.
                    </p>
                </div>

                <div className="mb-4">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white mt-6">
                        Change in Terms of Service
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300">
                        We may change these Terms of Service at any time by giving 15 days’
                        notice via our website.
                    </p>
                </div>

                <div className="mb-4">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white mt-6">
                        Account Security
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300">
                        You must ensure that your username and password are confidential. If
                        you believe your password has been compromised, you must contact us
                        immediately at <span className="text-blue-600">contact@gurusolas.in</span>.
                    </p>
                </div>

                <div className="mb-4">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white mt-6">
                        Use of Services
                    </h2>
                    <ul className="list-disc list-inside ml-4">
                        <li className="text-gray-600 dark:text-gray-300">
                            Your use of the Services will comply with all applicable laws and
                            regulations.
                        </li>
                        <li className="text-gray-600 dark:text-gray-300">
                            Your Content will not infringe or violate any third party
                            intellectual property rights or any laws.
                        </li>
                        <li className="text-gray-600 dark:text-gray-300">
                            If you use the Services on behalf of a third party, you have all
                            necessary authorizations.
                        </li>
                    </ul>
                </div>

                <div className="mb-4">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white mt-6">
                        Support
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300">
                        If you experience technical difficulties with the Service, you should
                        make all reasonable efforts to investigate and diagnose the issue
                        before contacting us.
                    </p>
                </div>

                <div className="mb-4">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white mt-6">
                        Transfer of Rights
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300">
                        You cannot assign or transfer any rights under these Terms to another
                        person without our written agreement.
                    </p>
                </div>

                <div className="mb-4">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white mt-6">
                        User Registration
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300">
                        Users must register for an account to access portions of the Services.
                        The customer agrees that all information provided during registration
                        will be accurate and up-to-date.
                    </p>
                </div>

                <div className="mb-4">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white mt-6">
                        Contact Information
                    </h2>
                    <ul className="list-disc list-inside ml-4">
                        <li className="text-gray-600 dark:text-gray-300">
                            Email: contact@gurusolas.in
                        </li>
                        <li className="text-gray-600 dark:text-gray-300">
                            Phone: 9876543210
                        </li>
                    </ul>
                </div>
            </div>

        </DefaultLayout>
    );
};

export default TermsOfService;