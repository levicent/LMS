import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useAddSection from "@/hooks/useAddSection";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Loader2 } from "lucide-react";

const AddSectionPage: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [title, setTitle] = useState<string>("");
  const addSectionMutation = useAddSection();

  const handleAddSection = async () => {
    try {
      if (!title.trim()) {
        toast.error("Section title is required");
        return;
      }
      await addSectionMutation.mutateAsync({ courseId, title });
      toast.success("Section created successfully!");
      setTitle("");
    } catch (error) {
      toast.error("Failed to create section");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddSection();
    }
  };

  return (
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
          <CardTitle className="text-2xl font-semibold text-gray-900">Add a New Section</CardTitle>
        </CardHeader>
        
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-sm font-medium text-gray-900">
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
            onClick={handleAddSection}
            disabled={addSectionMutation.isLoading || !title.trim()}
          >
            {addSectionMutation.isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating...
              </>
            ) : (
              'Add Section'
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AddSectionPage;