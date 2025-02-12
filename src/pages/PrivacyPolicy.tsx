import DefaultLayout from "@/layout/DefaultLayout";
import React from "react";

const PrivacyPolicy: React.FC = () => {
    return (
        <DefaultLayout>

            <div className="flex-grow bg-gray-100 dark:bg-gray-900 p-6 lg:px-16 lg:py-12">
                <section>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6 text-center">
                            Privacy Policy
                        </h1>

                        <section className="mt-6">
                            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mt-6">
                                Who We Are
                            </h2>
                            <p className="text-gray-600 dark:text-gray-300">
                                Gurusolas LMS is an online learning platform dedicated to providing
                                high-quality education and training. Our website,{' '}
                                <a
                                    href="https://www.gurusolas.in"
                                    className="text-blue-600 dark:text-blue-400 underline"
                                >
                                    www.gurusolas.in
                                </a>{' '}
                                and its subdomains are owned and operated by us. By using our
                                website or services, you agree to the terms outlined in this
                                Privacy Policy along with our Terms of Service.
                            </p>
                        </section>

                        <section className="mt-6">
                            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mt-6">
                                Type of Data We Collect
                            </h2>
                            <p className="text-gray-600 dark:text-gray-300">
                                We collect different types of information based on your
                                interaction with our platform:
                            </p>
                            <h3 className="text-xl font-semibold text-gray-800 mt-6 dark:text-white">
                                Personal Information
                            </h3>
                            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300">
                                <li>Name</li>
                                <li>Email address</li>
                                <li>Billing address (for purchases)</li>
                                <li>Contact details</li>
                            </ul>

                            <h3 className="text-xl font-semibold text-gray-800 mt-6 dark:text-white">
                                Non-Personal Information
                            </h3>
                            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300">
                                <li>IP addresses</li>
                                <li>Browser types</li>
                                <li>Demographic data</li>
                                <li>Website usage statistics</li>
                            </ul>
                        </section>

                        <section className="mt-6">
                            <h2 className="text-xl font-semibold text-gray-800 mt-6 dark:text-white">
                                Children’s Data
                            </h2>
                            <p className="text-gray-600 dark:text-gray-300">
                                We do not knowingly collect personal information from individuals
                                under 18 years of age. If you believe a child has provided us
                                with their data, please contact us immediately so we can take
                                appropriate action.
                            </p>
                        </section>

                        <section className="mt-6">
                            <h2 className="text-xl font-semibold text-gray-800 mt-6 dark:text-white">
                                Use of Personal Information
                            </h2>
                            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300">
                                <li>To recognize and communicate with you</li>
                                <li>To provide customer support</li>
                                <li>To send newsletters (if opted in)</li>
                                <li>To process payments and subscriptions</li>
                            </ul>
                        </section>

                        <section className="mt-6">
                            <h2 className="text-xl font-semibold text-gray-800 mt-6 dark:text-white">
                                No Data Sharing with Third Parties
                            </h2>
                            <p className="text-gray-600 dark:text-gray-300">
                                We do not share your personal data with third parties except:
                            </p>
                            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300">
                                <li>When required by law</li>
                                <li>When necessary for security or operational purposes</li>
                                <li>If consent is explicitly provided by you</li>
                            </ul>
                        </section>

                        <section className="mt-6">
                            <h2 className="text-xl font-semibold text-gray-800 mt-6 dark:text-white">
                                Data Retention
                            </h2>
                            <p className="text-gray-600 dark:text-gray-300">
                                We retain your data as long as your account remains active. You
                                can delete your account or request data deletion at any time,
                                subject to legal and regulatory requirements.
                            </p>
                        </section>

                        <section className="mt-6">
                            <h2 className="text-xl font-semibold text-gray-800 mt-6 dark:text-white">
                                Contact Information
                            </h2>
                            <p className="text-gray-600 dark:text-gray-300">
                                For privacy-related inquiries, contact us at:
                            </p>
                            <p className="text-gray-700 font-semibold dark:text-gray-300">
                                Email:
                                <a href="mailto:helpline@gurusolas.com" className="text-blue-600 dark:text-blue-400 underline">
                                    helpline@gurusolas.com
                                </a>
                            </p>
                            <p className="text-gray-700 font-semibold dark:text-gray-300">
                                Phone: [Insert Contact Number]
                            </p>
                        </section>
                    </div>
                </section>
            </div>

        </DefaultLayout>
    );
};

export default PrivacyPolicy;