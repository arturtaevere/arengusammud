
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import ActionStepDetails from "@/components/action-step/ActionStepDetails";
import ActionStepNotFound from "@/components/action-step/ActionStepNotFound";
import { ActionStepsService } from "@/services/ActionStepsService";
import { ActionStepDetails as ActionStepDetailsType } from "@/services/actionStepData";

const ActionStepDetail = () => {
  const { stepId } = useParams<{ stepId: string }>();
  const [stepDetails, setStepDetails] = useState<ActionStepDetailsType | null>(null);
  const [videoUrl, setVideoUrl] = useState<string>("");
  
  useEffect(() => {
    if (stepId) {
      const details = ActionStepsService.getActionStepDetails(stepId);
      setStepDetails(details);
      
      const savedVideoUrl = ActionStepsService.getVideoUrl(stepId);
      if (savedVideoUrl) {
        setVideoUrl(savedVideoUrl);
      }
    }
  }, [stepId]);
  
  const handleVideoUploaded = (url: string) => {
    setVideoUrl(url);
    console.log("Video URL updated:", url);
    
    // Save to localStorage when a video is uploaded or changed
    if (stepId) {
      ActionStepsService.saveVideoUrl(stepId, url);
    }
    
    if (stepDetails) {
      setStepDetails({
        ...stepDetails,
        videoUrl: url
      });
    }
  };
  
  if (!stepDetails) {
    return <ActionStepNotFound />;
  }
  
  return (
    <div className="min-h-screen bg-gray-50/50">
      <Navbar />
      
      <main className="container mx-auto px-4 py-24">
        <div className="mb-6">
          <Button variant="ghost" size="sm" asChild className="mb-4">
            <Link to="/competences">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Tagasi õpieesmärkide juurde
            </Link>
          </Button>
          
          <h1 className="text-3xl font-bold mb-2">{stepDetails?.title}</h1>
          <p className="text-muted-foreground mb-6">{stepDetails?.description}</p>
          
          <ActionStepDetails
            stepDetails={stepDetails}
            videoUrl={videoUrl}
            onVideoUploaded={handleVideoUploaded}
          />
        </div>
      </main>
    </div>
  );
};

export default ActionStepDetail;
