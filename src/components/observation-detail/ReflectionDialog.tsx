
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
    positiveImpact: string;
    challengesFaced: string;
    habitFormation: string;
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
    positiveImpact: observation.teacherReflection?.positiveImpact || "",
    challengesFaced: observation.teacherReflection?.challengesFaced || "",
    habitFormation: observation.teacherReflection?.habitFormation || "",
  });

  const handleInputChange = (field: keyof typeof reflectionData, value: string) => {
    setReflectionData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = () => {
    // Basic validation
    if (!reflectionData.positiveImpact.trim() || 
        !reflectionData.challengesFaced.trim() || 
        !reflectionData.habitFormation.trim()) {
      toast({
        variant: "destructive",
        title: "Täida kõik väljad",
        description: "Palun vasta kõigile küsimustele enne salvestamist",
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
            <Label htmlFor="positiveImpact" className="text-base font-medium">
              1. Kas ma olen märganud midagi konkreetset, mille põhjal võib järeldada, et see uus õpetamistehnika mõjutab positiivselt õpilaste õppimist või kaasatust?
            </Label>
            <Textarea
              id="positiveImpact"
              value={reflectionData.positiveImpact}
              onChange={(e) => handleInputChange("positiveImpact", e.target.value)}
              rows={4}
              placeholder="Kirjelda oma tähelepanekuid..."
              className="resize-none focus:ring-primary"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="challengesFaced" className="text-base font-medium">
              2. Milliste raskustega puutusin kokku selle arengusammu rakendamisel ja kuidas nendega edaspidi toime tulla?
            </Label>
            <Textarea
              id="challengesFaced"
              value={reflectionData.challengesFaced}
              onChange={(e) => handleInputChange("challengesFaced", e.target.value)}
              rows={4}
              placeholder="Kirjelda raskusi ja lahendusi..."
              className="resize-none focus:ring-primary"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="habitFormation" className="text-base font-medium">
              3. Mida teha, et selle arengusammu kasutamine muutuks mul harjumuspäraseks?
            </Label>
            <Textarea
              id="habitFormation"
              value={reflectionData.habitFormation}
              onChange={(e) => handleInputChange("habitFormation", e.target.value)}
              rows={4}
              placeholder="Kirjelda oma plaani..."
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
