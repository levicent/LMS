import React, { useState } from "react";
import { useQueryClient } from "react-query";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import useAddSection from "@/hooks/useAddSection";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import TeacherLayout from "@/layout/TeacherLayout";
import { toast } from "react-toastify";

import { useUpdateSection } from "@/hooks/useUpdateSection";

interface UpdateSection {
  courseId: string;
  sectionId: string;
  title: string;
}

const AddSectionPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { courseId } = useParams<{ courseId: string }>();
  const addSectionMutation = useAddSection();

  const { sectionId, title: initialTitle } = location.state || {};
  const { mutate: updateSection } = useUpdateSection();
  const queryClient = useQueryClient();

  const [title, setTitle] = useState<string>(initialTitle || "");
  const handleAddSection = async () => {
    if (!title.trim()) {
      toast.error("Section title is required");
      return;
    }

    try {
      await toast.promise(addSectionMutation.mutateAsync({ courseId, title }), {
        pending: "Adding section...",
        success: "Section added successfully!",
        error: "Failed to create section",
      });
      setTitle("");
      navigate(`/instructor/dashboard/course/${courseId}`);
    } catch (error) {
      console.error("Error creating section:", error);
    }
  };

  const handleEditSection = ({ courseId, sectionId, title }: UpdateSection) => {
    try {
      updateSection(
        { courseId, sectionId, title },
        {
          onSuccess: () => {
            toast.success("Section updated successfully.");
            queryClient.invalidateQueries(["course", courseId]);
            queryClient.invalidateQueries("sections");
            navigate(`/instructor/dashboard/course/${courseId}`);
          },
          onError: (error: any) => {
            console.error("Error updating section: ", error);
            toast.error("Error updating section.");
          },
        }
      );
    } catch (error) {
      console.error("Error updating section: ", error);
      toast.error("Error updating section.");
    }
  };

  const handleSubmit = async () => {
    if (!courseId) {
      toast.error("Course ID is required");
      return;
    }

    if (sectionId) {
      handleEditSection({ courseId, sectionId, title });
    } else {
      await handleAddSection();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleAddSection();
    }
  };

  return (
    <TeacherLayout>
      <div className="min-h-screen p-4 md:p-8 max-w-2xl mx-auto">
        <Button
          variant="ghost"
          className="mb-6 hover:text-white"
          onClick={() => window.history.back()}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Course
        </Button>

        <Card className="bg-gray-100 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-gray-900">
              Add a New Section
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label
                  htmlFor="title"
                  className="text-sm font-medium text-gray-900"
                >
                  Section Title
                </Label>
                <Input
                  id="title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Enter section title"
                  className="w-full bg-white text-black placeholder:text-gray-500 border-gray-300"
                  autoFocus
                />
                <p className="text-sm text-gray-500">
                  Give your section a clear and descriptive title
                </p>
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col sm:flex-row gap-4">
            <Button
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white"
              onClick={handleSubmit}
              disabled={addSectionMutation.isLoading || !title.trim()}
            >
              {sectionId ? "Update Section" : "Add Section"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </TeacherLayout>
  );
};

export default AddSectionPage;
