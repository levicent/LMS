import { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import TeacherLayout from "@/layout/TeacherLayout";

function PDFPage() {

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);


    const navigate = useNavigate()

    const { courseId, sectionId, videoId } = useParams<{
        courseId: string;
        sectionId: string;
        videoId: string;
    }>();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            // Optional: Validate file type
            if (file.type !== "application/pdf") {
                toast.error("Please select a valid PDF file.");
                return;
            }
            setSelectedFile(file);
        }
    };


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!selectedFile) {
            toast.error("Please select a PDF file to upload.");
            return;
        }

        // Prepare form data
        const formData = new FormData();
        formData.append("file", selectedFile);

        setIsUploading(true);

        try {
            // Adjust the endpoint as needed
            const response = await axios.post(
                `/api/upload/${courseId}/${sectionId}/${videoId}`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            console.log("PDF uploaded:", response.data);
            toast.success("PDF uploaded successfully!");
            // Navigate to another page, e.g., back to the course page
            navigate(`/courses/${courseId}`);
        } catch (error) {
            console.error("Error uploading PDF:", error);
            toast.error("Failed to upload PDF.");
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <TeacherLayout>


            <div className="container mx-auto p-4 max-w-md">
                <h1 className="text-2xl font-bold mb-4">Upload PDF for Video</h1>
                <p className="mb-4 text-gray-700">
                    <strong>Note:</strong> Only one PDF per video is allowed.
                </p>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="pdfFile" className="block text-sm font-medium text-gray-700">
                            Select PDF File:
                        </label>
                        <input
                            type="file"
                            id="pdfFile"
                            accept="application/pdf"
                            onChange={handleFileChange}
                            className="mt-1 block w-full"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isUploading}
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                    >
                        {isUploading ? "Uploading..." : "Upload PDF"}
                    </button>
                </form>

            </div >
        </TeacherLayout>

    )
}

export default PDFPage
