import { addSection } from "@/services/videoApi";
import { useMutation } from "react-query"; // Make sure to import your addSection function

const useAddSection = () => {
  return useMutation(
    ({ courseId, title }: any) => addSection(courseId, title),
    {
      onSuccess: (data) => {
        console.log("Section added successfully", data);
      },
      onError: (error) => {
        console.error("Error adding section", error);
      },
    }
  );
};

export default useAddSection;
