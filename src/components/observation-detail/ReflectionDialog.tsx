
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { StoredObservation } from "@/components/observation/storage";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";

interface ReflectionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  observation: StoredObservation;
  saveReflection: (reflection: {
    reflection: string;
  }) => void;
}

const ReflectionDialog = ({
  open,
  onOpenChange,
  observation,
  saveReflection,
}: ReflectionDialogProps) => {
  const { toast } = useToast();
  const [reflectionData, setReflectionData] = useState({
    reflection: observation.teacherReflection?.reflection || "",
  });

  const handleInputChange = (value: string) => {
    setReflectionData({ reflection: value });
  };

  const handleSubmit = () => {
    // Basic validation
    if (!reflectionData.reflection.trim()) {
      toast({
        variant: "destructive",
        title: "Täida kõik väljad",
        description: "Palun lisa refleksioon enne salvestamist",
      });
      return;
    }

    saveReflection(reflectionData);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[625px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">Minu refleksioon</DialogTitle>
          <DialogDescription>
            
          </DialogDescription>
        </DialogHeader>

        <Separator className="my-2" />

        <div className="space-y-6 py-3">
          <div className="space-y-2">
            <Label htmlFor="reflection" className="text-base font-medium">
              Katsetused, kogemused, õnnestumised, ebaõnnestumised, mõtted, tunded, analüüs, järeldused, taipamised, õppimiskohad, hinnang, valikud, edasised plaanid:
            </Label>
            <Textarea
              id="reflection"
              value={reflectionData.reflection}
              onChange={(e) => handleInputChange(e.target.value)}
              rows={10}
              placeholder="Kirjelda oma tähelepanekuid..."
              className="resize-none focus:ring-primary"
            />
          </div>
        </div>

        <DialogFooter className="gap-2 mt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Tühista
          </Button>
          <Button onClick={handleSubmit}>
            Salvesta refleksioon
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ReflectionDialog;
