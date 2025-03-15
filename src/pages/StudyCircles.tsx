
import Navbar from '@/components/Navbar';
import CircleTabs from '@/components/study-circles/CircleTabs';

const StudyCircles = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Õpiringid</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Õpiringid on koht, kus saate teiste õpetajatega mõtestada õppimise ja õpetamise alusprintsiipe.
          </p>
          
          <CircleTabs />
        </div>
      </div>
    </div>
  );
};

export default StudyCircles;
