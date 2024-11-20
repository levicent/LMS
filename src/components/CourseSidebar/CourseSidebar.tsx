import { useState } from "react";
import { ChevronDown, ChevronUp, Play } from "lucide-react";

interface Section {
  sectionId: string;
  title: string;
  videos: { id: string; title: string; duration: string }[];
}

interface CourseSidebarProps {
  sections: Section[];
  onVideoSelect: (sectionId: string, videoId: string) => void;
}

function CourseSidebar({ sections = [], onVideoSelect }: CourseSidebarProps) {
  const [openSection, setOpenSection] = useState<string | null>(null);

  return (
    <div className="mt-20 w-80 border-l border-gray-200 dark:border-gray-700 h-screen fixed top-0 right-0 bg-white dark:bg-gray-800 overflow-y-auto">
      <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4">
        <h2 className="text-lg font-semibold dark:text-white">
          Course content
        </h2>
        {/* <p className="text-sm text-gray-500 dark:text-white">
          {sections.length} sections •{" "}
          {sections.reduce((acc, section) => acc + section.videos.length, 0)}{" "}
          lectures
        </p> */}
      </div>

      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {sections.map((section, sectionIndex) => {
          const isOpen = openSection === section.sectionId;

          return (
            <div key={section.sectionId} className="bg-white dark:bg-gray-800">
              <button
                onClick={() =>
                  setOpenSection(isOpen ? null : section.sectionId)
                }
                className="w-full text-left p-4 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center justify-between"
              >
                <div className="flex-1">
                  <h3 className="font-medium dark:text-white">
                    Section {sectionIndex + 1}: {section.title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-white">
                    {section.videos.length} lectures
                  </p>
                </div>
                {isOpen ? (
                  <ChevronUp className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                )}
              </button>

              {isOpen && (
                <div className="bg-gray-50 dark:bg-gray-900">
                  {section.videos.map((video, videoIndex) => (
                    <button
                      key={video.id}
                      onClick={() => onVideoSelect(section.sectionId, video.id)}
                      className="w-full text-left p-3 pl-6 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-start gap-3 "
                    >
                      <Play className="w-4 h-4 mt-1 text-gray-400" />
                      <div className="flex-1 min-w-0 ">
                        <p className="text-sm dark:text-white">
                          {videoIndex + 1}. {video.title}
                        </p>
                        <p className="text-xs text-gray-500">
                          {video.duration}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CourseSidebar;
