
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-16">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
      </div>
      
      <div className="container px-4 z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
          {/* Hero Content */}
          <div className="flex-1 text-center lg:text-left">
            <h1 
              className="font-bold tracking-tight mb-6 animate-fade-in"
            >
              Arengusammud aitavad õpetajal <span className="text-blue-500">kasvada</span>
            </h1>
            
            <p 
              className="text-xl mb-8 text-muted-foreground max-w-2xl mx-auto lg:mx-0 animate-fade-in [animation-delay:100ms]"
            >
              Õpipartnerluse ja õpiringide kaudu saab õpetaja paremini jõuda iga õppijani ning toetada ennastjuhtiva õppija kujunemist.
            </p>
            
            <div 
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in [animation-delay:200ms]"
            >
              <Button 
                size="lg" 
                className="text-lg transition-all duration-300 hover:scale-105"
                onClick={() => navigate('/auth')}
              >
                Alusta
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="text-lg transition-all duration-300 hover:scale-105"
                onClick={() => navigate('/features')}
              >
                Vaata võimalusi
              </Button>
            </div>
            
            <div 
              className="mt-12 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 text-sm text-muted-foreground animate-fade-in [animation-delay:300ms]"
            >
              <div className="flex items-center gap-2">
                <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Individuaalne juhendamine</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Praktilised sammud</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Kasulik tagasiside</span>
              </div>
            </div>
          </div>
          
          {/* Hero Image */}
          <div 
            className="flex-1 animate-fade-in [animation-delay:400ms]"
          >
            <div className="relative">
              <div className="relative z-10 glass rounded-2xl overflow-hidden shadow-xl">
                <img 
                  src="/lovable-uploads/c8a3998f-a27c-4656-a90e-cd9d4431e4da.png" 
                  alt="Õpetajad koostöös" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -bottom-4 -right-4 w-64 h-64 bg-blue-50 rounded-full mix-blend-multiply filter blur-2xl opacity-50"></div>
              <div className="absolute -top-4 -left-4 w-64 h-64 bg-purple-50 rounded-full mix-blend-multiply filter blur-2xl opacity-50"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
