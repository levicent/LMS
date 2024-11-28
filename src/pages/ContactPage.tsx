import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom";
import { MapPin, Phone, Mail } from "lucide-react";
import emailjs from 'emailjs-com';
import ParticlesComponent from "../components/ParticleBackground/ParticleBackground";
import { toast } from "react-toastify";


type FormValues = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const ContactPage: React.FC = () => {
  // const navigate = useNavigate();
  // const authContext = useContext(AuthContext);

  // if (!authContext) {
  //   throw new Error("useAuth must be used within an AuthProvider");
  // }

  // const { isAuthenticated } = authContext;

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      console.log("Form submitted:", data);
    
      //Temp solution for sending email need to private api keys 
      const serviceId = "service_zoy2ar8"; 
      const templateId = "template_w9cotza";  
      const userId = "US5PROKqMNZyOxfFw"; 
      console.log(serviceId)
      const templateParams = {
        from_name: data.name,
        from_email: data.email,
        subject: data.subject,
        message: data.message,
      };

      await emailjs.send(serviceId, templateId, templateParams, userId);
      toast.success("Your message has been sent successfully!");
      reset();
    } catch (error) {
      console.error("Failed to send the message", error);
      toast.error("Failed to send the message. Please try again later.");
    }
  };

  // if (!isAuthenticated) {
  //   // Redirect to login page if not authenticated
  //   navigate("/signin");
  //   return null;
  // }

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Background Particles */}
     
      <ParticlesComponent id="tsparticles" className="absolute inset-0 z-0" />

      {/* Content Wrapper */}
      <div className="relative z-10 w-full max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="bg-gray-900 bg-opacity-75 backdrop-filter backdrop-blur-lg rounded-lg shadow-2xl overflow-hidden">
          <div className="md:flex">
            {/* Left Column for Text */}
            <div className="md:w-1/2 p-6 sm:p-8 bg-blue-600">
              <h1 className="text-3xl font-bold text-white mb-4">Contact Us</h1>
              <p className="text-white mb-6">
                We'd love to hear from you. Please fill out this form or use our
                contact information below.
              </p>
              <div className="space-y-4 text-white">
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 mr-3" />
                  <span className="text-sm">
                    123 Learning Street, Education City, 12345
                  </span>
                </div>
                <div className="flex items-center">
                  <Phone className="w-5 h-5 mr-3" />
                  <span className="text-sm">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center">
                  <Mail className="w-5 h-5 mr-3" />
                  <span className="text-sm">lms_contact@levicent.com</span>
                </div>
              </div>
            </div>

            {/* Right Column for Contact Form */}
            <div className="md:w-1/2 p-6 sm:p-8">
              <h2 className="text-2xl font-bold text-white mb-6">
                Send us a Message
              </h2>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    Full Name
                  </label>
                  <input
                    {...register("name", {
                      required: "Name is required",
                      minLength: {
                        value: 2,
                        message: "Name must have at least 2 characters",
                      },
                    })}
                    id="name"
                    type="text"
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    Email Address
                  </label>
                  <input
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value:
                          /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                        message: "Invalid email format",
                      },
                    })}
                    id="email"
                    type="email"
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    Subject
                  </label>
                  <input
                    {...register("subject", {
                      required: "Subject is required",
                    })}
                    id="subject"
                    type="text"
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {errors.subject && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.subject.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    Message
                  </label>
                  <textarea
                    {...register("message", {
                      required: "Message is required",
                      minLength: {
                        value: 10,
                        message: "Message must have at least 10 characters",
                      },
                      maxLength: {
                        value: 500,
                        message: "Message must not exceed 500 characters",
                      },
                    })}
                    id="message"
                    rows={4}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    style={{ minHeight: "80px", maxHeight: "200px" }}
                  ></textarea>
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                <div>
                  <button
                    type="submit"
                    className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link
            to="/"
            className="text-blue-400 hover:text-blue-300 font-medium"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
