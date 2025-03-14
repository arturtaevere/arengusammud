
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, CheckSquare, FileText, ListTodo, Video } from "lucide-react";
import VideoPlayer from "@/components/VideoPlayer";
import VideoUploader from "@/components/VideoUploader";

// Types for the component props
interface ActionStepDetailsProps {
  stepDetails: {
    title: string;
    description: string;
    reason?: string;
    successCriteria?: string[];
    practiceTask?: string[];
    examples?: string;
    videoUrl?: string;
  };
  videoUrl: string;
  onVideoUploaded: (url: string) => void;
}

const ActionStepDetails: React.FC<ActionStepDetailsProps> = ({
  stepDetails,
  videoUrl,
  onVideoUploaded
}) => {
  return (
    <div className="mb-8">
      <Tabs defaultValue="reason" className="w-full">
        <TabsList className="mb-6 w-full justify-start overflow-x-auto">
          <TabsTrigger value="reason" className="flex items-center">
            <FileText className="h-4 w-4 mr-2" />
            Põhjendus
          </TabsTrigger>
          <TabsTrigger value="criteria" className="flex items-center">
            <CheckSquare className="h-4 w-4 mr-2" />
            Edukriteeriumid
          </TabsTrigger>
          <TabsTrigger value="practice" className="flex items-center">
            <ListTodo className="h-4 w-4 mr-2" />
            Harjutusülesanne
          </TabsTrigger>
          <TabsTrigger value="examples" className="flex items-center">
            <BookOpen className="h-4 w-4 mr-2" />
            Näited
          </TabsTrigger>
          <TabsTrigger value="video" className="flex items-center">
            <Video className="h-4 w-4 mr-2" />
            Video
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="reason" className="animate-fade-in">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-medium mb-4">Põhjendus</h3>
              <div className="prose max-w-none">
                <p>{stepDetails?.reason}</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="criteria" className="animate-fade-in">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-medium mb-4">Edukriteeriumid</h3>
              <ul className="space-y-2 list-disc pl-5">
                {stepDetails?.successCriteria?.map((criterion, index) => (
                  <li key={index}>{criterion}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="practice" className="animate-fade-in">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-medium mb-4">Harjutusülesanne</h3>
              <ul className="space-y-2 list-disc pl-5">
                {stepDetails?.practiceTask?.map((task, index) => (
                  <li key={index}>{task}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="examples" className="animate-fade-in">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-medium mb-4">Näited</h3>
              <div className="prose max-w-none">
                {stepDetails?.examples?.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="mb-4">{paragraph}</p>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="video" className="animate-fade-in">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-medium mb-4">Video</h3>
              
              {videoUrl ? (
                <div className="space-y-4">
                  <VideoPlayer src={videoUrl} />
                  <div className="mt-4">
                    <VideoUploader 
                      onVideoUploaded={onVideoUploaded} 
                      existingVideoUrl={videoUrl}
                      hideVideoPreview={true}
                    />
                  </div>
                </div>
              ) : (
                <VideoUploader onVideoUploaded={onVideoUploaded} />
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ActionStepDetails;
