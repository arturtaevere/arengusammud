
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeft, Upload } from "lucide-react";
import ActionStepDetails from "@/components/action-step/ActionStepDetails";
import ActionStepNotFound from "@/components/action-step/ActionStepNotFound";
import { ActionStepsService } from "@/services/ActionStepsService";
import VideoUploader from "@/components/VideoUploader";
import { toast } from "@/components/ui/use-toast";
import CSVImportModal from "@/components/action-step/CSVImportModal";

const ActionStepDetail = () => {
  const { stepId } = useParams<{ stepId: string }>();
  const navigate = useNavigate();
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [showImportModal, setShowImportModal] = useState(false);
  
  useEffect(() => {
    if (!stepId) return;
    
    // Get video URL for this step
    const storedVideoUrl = ActionStepsService.getVideoUrl(stepId);
    setVideoUrl(storedVideoUrl);
  }, [stepId]);

  // Handle video upload
  const handleVideoUploaded = (url: string) => {
    if (!stepId) return;
    
    ActionStepsService.saveVideoUrl(stepId, url);
    setVideoUrl(url);
    
    toast({
      title: url ? "Video lisatud" : "Video eemaldatud",
      description: url ? "Video on edukalt lisatud" : "Video on eemaldatud",
    });
  };

  // Get action step details
  const actionStepDetails = stepId ? ActionStepsService.getActionStepDetails(stepId) : null;
  
  // Handle import success
  const handleImportSuccess = () => {
    // Reload the current page to reflect new data
    window.location.reload();
  };

  if (!stepId) {
    return <ActionStepNotFound />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-24">
        <div className="flex justify-between items-center mb-6">
          <Button
            variant="outline"
            onClick={() => navigate(-1)}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Tagasi
          </Button>
          
          <Button
            variant="outline"
            onClick={() => setShowImportModal(true)}
          >
            <Upload className="mr-2 h-4 w-4" />
            Impordi CSV
          </Button>
        </div>
        
        {actionStepDetails ? (
          <>
            <ScrollArea className="h-[calc(100vh-250px)] pr-4">
              <ActionStepDetails 
                stepDetails={actionStepDetails}
                videoUrl={videoUrl}
                onVideoUploaded={handleVideoUploaded}
              />
            </ScrollArea>
          </>
        ) : (
          <ActionStepNotFound />
        )}
      </main>
      
      <CSVImportModal 
        open={showImportModal}
        onOpenChange={setShowImportModal}
        onImportSuccess={handleImportSuccess}
      />
    </div>
  );
};

export default ActionStepDetail;
