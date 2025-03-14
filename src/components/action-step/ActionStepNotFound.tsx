
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";

const ActionStepNotFound = () => {
  return (
    <div className="min-h-screen bg-gray-50/50">
      <Navbar />
      <main className="container mx-auto px-4 py-24">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Arengusammu ei leitud</h1>
          <Button asChild>
            <Link to="/competences">Tagasi õpieesmärkide juurde</Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default ActionStepNotFound;
