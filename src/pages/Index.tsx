
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import FeatureCard from '@/components/FeatureCard';
import { ClipboardList, BookOpen, MessageSquare, BookCheck, Users, RefreshCw } from 'lucide-react';

const Index = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  // Redirect authenticated users to dashboard
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <Hero />
      
      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Õpetajate arengu toetamine</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Meie platvorm pakub struktureeritud lähenemist juhendamisele, mis aitab õpetajatel areneda läbi praktiliste sammude ja kohese tagasiside.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              title="Arengumeetodite kogumik"
              description="Sirvi meie laialdast valikkut teaduspõhiseid õpetamisvõtteid, mis on organiseeritud pädevusvaldkondade kaupa."
              icon={<ClipboardList className="h-6 w-6" />}
            />
            <FeatureCard
              title="Tundide vaatlused"
              description="Vii läbi struktureeritud vaatlusi, et koguda tõendeid õpetamispraktikate kohta reaalses klassiruumis."
              icon={<BookOpen className="h-6 w-6" />}
            />
            <FeatureCard
              title="Struktureeritud tagasiside"
              description="Paku konkreetset, praktilist tagasisidet, mis aitab õpetajatel oma praktikat täiustada."
              icon={<MessageSquare className="h-6 w-6" />}
            />
            <FeatureCard
              title="Edusammude jälgimine"
              description="Jälgi arengumeetodite rakendamist ja paranemine aja jooksul."
              icon={<RefreshCw className="h-6 w-6" />}
            />
            <FeatureCard
              title="Juhendamisraamistikud"
              description="Kasuta tõestatud juhendamisraamistikke, mis suunavad arengut."
              icon={<BookCheck className="h-6 w-6" />}
            />
            <FeatureCard
              title="Koostöine õppimine"
              description="Ühenda õpetajad juhendajatega toetavaks professionaalseks õppimiskogemuseks."
              icon={<Users className="h-6 w-6" />}
            />
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Valmis tõstma õpetamiskvaliteeti?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Liitu tuhandete koolidega, kes muudavad oma professionaalset arengut Arengusammude abil.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="text-lg transition-all duration-300 hover:scale-105"
                onClick={() => navigate('/auth')}
              >
                Alusta tasuta
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="text-lg transition-all duration-300 hover:scale-105"
                onClick={() => navigate('/features')}
              >
                Rohkem infot
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="font-semibold text-xl">Arengusammud</div>
              <p className="text-muted-foreground mt-2">Õpetamise kvaliteedi tõstmine läbi ekspertjuhendamise</p>
            </div>
            <div className="flex space-x-8">
              <div className="space-y-4">
                <h3 className="font-medium">Toode</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Võimalused</a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Hinnad</a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Näidislood</a></li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="font-medium">Ettevõte</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Meist</a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Blogi</a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Kontakt</a></li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="font-medium">Õiguslik</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Privaatsus</a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Tingimused</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-200 mt-12 pt-8 text-center text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} Arengusammud. Kõik õigused kaitstud.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
