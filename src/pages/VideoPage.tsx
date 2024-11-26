import { List, Play, Settings, Volume2 } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function VideoPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex h-14 items-center gap-4 border-b bg-background px-6">
        <Link to="/">Udemy</Link>
        <h1 className="text-lg font-semibold">
          Angular - The Complete Guide (2024 Edition)
        </h1>
      </header>
      <div className="grid md:grid-cols-[1fr_300px]">
        <main className="flex flex-col">
          <div className="relative aspect-video bg-black">
            <img
              alt="Course video"
              className="object-cover"
              height={720}
              src="/placeholder.svg"
              width={1280}
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-4">
              <div className="flex items-center gap-4">
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 rounded-full"
                >
                  <Play className="h-4 w-4" />
                </Button>
                <Progress value={33} className="h-1" />
                <div className="flex items-center gap-2">
                  <Button size="icon" variant="ghost" className="h-8 w-8">
                    <Volume2 className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="ghost" className="h-8 w-8">
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 p-4">
            <Tabs defaultValue="overview">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="qa">Q&A</TabsTrigger>
                <TabsTrigger value="notes">Notes</TabsTrigger>
                <TabsTrigger value="announcements">Announcements</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
                <TabsTrigger value="learning-tools">Learning tools</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="mt-4">
                <h2 className="text-2xl font-bold">
                  Master Angular (formerly &quot;Angular 2&quot;) and build
                  awesome, reactive web apps
                </h2>
                <p className="mt-2 text-muted-foreground">
                  Join the most comprehensive and popular Angular course on
                  Udemy and learn all about this amazing framework from the
                  ground up, in great depth.
                </p>
              </TabsContent>
            </Tabs>
          </div>
        </main>
        <aside className="border-l">
          <Card className="h-full rounded-none border-0">
            <div className="flex items-center justify-between p-4">
              <h2 className="text-lg font-semibold">Course content</h2>
              <Button size="icon" variant="ghost">
                <List className="h-4 w-4" />
              </Button>
            </div>
            <ScrollArea className="h-[calc(100vh-8rem)]">
              <div className="space-y-4 p-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">
                      82. Passing Data from Parent to Child with Inputs
                    </h3>
                    <span className="text-sm text-muted-foreground">10min</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">
                      83. Outputting Data in a Table
                    </h3>
                    <span className="text-sm text-muted-foreground">5min</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">
                      84. Formatting Output with a Pipe
                    </h3>
                    <span className="text-sm text-muted-foreground">2min</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">
                      85. Using Signals & Resetting The Form After Submission
                    </h3>
                    <span className="text-sm text-muted-foreground">10min</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">
                      86. Using a Service for Cross-Component Communication
                    </h3>
                    <span className="text-sm text-muted-foreground">10min</span>
                  </div>
                </div>
              </div>
            </ScrollArea>
          </Card>
        </aside>
      </div>
    </div>
  );
}
export default VideoPage;
