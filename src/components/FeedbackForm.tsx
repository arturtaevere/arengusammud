
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Send, Save } from 'lucide-react';

const FeedbackForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedbackType, setFeedbackType] = useState<'praise' | 'suggestion' | 'question'>('praise');
  const [observationId, setObservationId] = useState<string>('');
  const [feedbackContent, setFeedbackContent] = useState<string>('');
  const [actionSteps, setActionSteps] = useState<string>('');
  const [isPrivate, setIsPrivate] = useState<boolean>(false);
  
  // Mock list of recent observations
  const recentObservations = [
    { id: 'obs-1', teacher: 'Jane Smith', subject: 'Mathematics', date: '2023-05-15' },
    { id: 'obs-2', teacher: 'Alex Johnson', subject: 'Science', date: '2023-05-10' },
    { id: 'obs-3', teacher: 'Maria Garcia', subject: 'English', date: '2023-05-05' },
  ];
  
  // Submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!observationId) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please select an observation.",
      });
      return;
    }
    
    if (!feedbackContent) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Feedback content cannot be empty.",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log({
      observationId,
      feedbackType,
      feedbackContent,
      actionSteps,
      isPrivate,
    });
    
    toast({
      title: "Feedback sent",
      description: "Your feedback has been sent successfully.",
    });
    
    setIsSubmitting(false);
    navigate('/feedback');
  };
  
  // Template suggestions based on feedback type
  const getSuggestion = () => {
    switch (feedbackType) {
      case 'praise':
        return "I really appreciated how you [specific example]. This was effective because [reason].";
      case 'suggestion':
        return "One approach to consider is [suggestion]. This might help with [benefit].";
      case 'question':
        return "I'm curious about [question]? I'd love to understand more about your thinking here.";
      default:
        return "";
    }
  };
  
  // Handler for using template
  const useTemplate = () => {
    setFeedbackContent(getSuggestion());
  };
  
  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex items-center mb-6">
        <Button 
          variant="ghost" 
          size="sm" 
          className="mr-2"
          onClick={() => navigate('/feedback')}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <h1 className="text-2xl font-semibold">Provide Feedback</h1>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Select Observation</CardTitle>
            <CardDescription>
              Choose which lesson observation you're providing feedback for
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Label htmlFor="observation-select">Recent Observations</Label>
              <Select onValueChange={setObservationId}>
                <SelectTrigger id="observation-select">
                  <SelectValue placeholder="Select an observation" />
                </SelectTrigger>
                <SelectContent>
                  {recentObservations.map((obs) => (
                    <SelectItem key={obs.id} value={obs.id}>
                      {obs.teacher} - {obs.subject} ({obs.date})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Feedback</CardTitle>
            <CardDescription>
              Provide constructive feedback on the observed lesson
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Tabs 
              defaultValue="praise" 
              value={feedbackType}
              onValueChange={(value) => setFeedbackType(value as 'praise' | 'suggestion' | 'question')}
              className="w-full"
            >
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="praise">Praise</TabsTrigger>
                <TabsTrigger value="suggestion">Suggestion</TabsTrigger>
                <TabsTrigger value="question">Question</TabsTrigger>
              </TabsList>
              
              <div className="bg-muted/20 p-4 rounded-md mb-4">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-sm font-medium">Template</h4>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={useTemplate} 
                    type="button"
                    className="text-xs h-7"
                  >
                    Use Template
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground italic">{getSuggestion()}</p>
              </div>
              
              <div className="space-y-4">
                <Label htmlFor="feedback-content">Feedback Content</Label>
                <Textarea
                  id="feedback-content"
                  placeholder="Enter your feedback here..."
                  className="min-h-[150px]"
                  value={feedbackContent}
                  onChange={(e) => setFeedbackContent(e.target.value)}
                />
              </div>
            </Tabs>
            
            <Separator className="my-6" />
            
            <div className="space-y-4">
              <Label htmlFor="action-steps">Recommended Action Steps (Optional)</Label>
              <Textarea
                id="action-steps"
                placeholder="Suggest specific actions the teacher can take..."
                className="min-h-[100px]"
                value={actionSteps}
                onChange={(e) => setActionSteps(e.target.value)}
              />
              <p className="text-sm text-muted-foreground">
                Tip: Be specific and actionable with your recommendations.
              </p>
            </div>
            
            <div className="flex items-center space-x-2 mt-6">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="private-feedback"
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  checked={isPrivate}
                  onChange={(e) => setIsPrivate(e.target.checked)}
                />
                <Label htmlFor="private-feedback" className="text-sm font-normal cursor-pointer">
                  Make this feedback private
                </Label>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => navigate('/feedback')}
            >
              Cancel
            </Button>
            <div className="space-x-2">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => {
                  toast({
                    title: "Feedback saved",
                    description: "Your feedback has been saved as a draft.",
                  });
                }}
              >
                <Save className="mr-2 h-4 w-4" />
                Save Draft
              </Button>
              <Button 
                type="submit" 
                disabled={isSubmitting}
              >
                <Send className="mr-2 h-4 w-4" />
                {isSubmitting ? "Sending..." : "Send Feedback"}
              </Button>
            </div>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
};

export default FeedbackForm;
