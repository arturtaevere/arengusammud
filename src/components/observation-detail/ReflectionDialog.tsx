
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
import { StoredObservation } from "@/components/observation/storage";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

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
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Minu refleksioon</DialogTitle>
          <DialogDescription>
            Mõtiskle tagasiside ja oma õpetamispraktika üle vastates järgmistele küsimustele.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <h3 className="font-medium">
              1. Kas ma olen märganud midagi konkreetset, mille põhjal võib järeldada, et see uus õpetamistehnika mõjutab positiivselt õpilaste õppimist või kaasatust?
            </h3>
            <Textarea
              value={reflectionData.positiveImpact}
              onChange={(e) => handleInputChange("positiveImpact", e.target.value)}
              rows={4}
              placeholder="Kirjelda oma tähelepanekuid..."
            />
          </div>

          <div className="space-y-2">
            <h3 className="font-medium">
              2. Milliste raskustega puutusin kokku selle arengusammu rakendamisel ja kuidas nendega edaspidi toime tulla?
            </h3>
            <Textarea
              value={reflectionData.challengesFaced}
              onChange={(e) => handleInputChange("challengesFaced", e.target.value)}
              rows={4}
              placeholder="Kirjelda raskusi ja lahendusi..."
            />
          </div>

          <div className="space-y-2">
            <h3 className="font-medium">
              3. Mida teha, et selle arengusammu kasutamine muutuks mul harjumuspäraseks?
            </h3>
            <Textarea
              value={reflectionData.habitFormation}
              onChange={(e) => handleInputChange("habitFormation", e.target.value)}
              rows={4}
              placeholder="Kirjelda oma plaani..."
            />
          </div>
        </div>

        <DialogFooter>
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
