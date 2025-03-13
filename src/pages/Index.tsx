
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
            <h2 className="text-4xl font-bold mb-4">Transforming Teacher Development</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our platform provides a structured approach to coaching that helps teachers grow through actionable steps and real-time feedback.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              title="Action Steps Library"
              description="Browse our extensive library of research-backed teaching strategies organized by competency areas."
              icon={<ClipboardList className="h-6 w-6" />}
            />
            <FeatureCard
              title="Lesson Observations"
              description="Conduct structured observations to gather evidence of teaching practices in real classroom settings."
              icon={<BookOpen className="h-6 w-6" />}
            />
            <FeatureCard
              title="Structured Feedback"
              description="Provide specific, actionable feedback that helps teachers improve their practice."
              icon={<MessageSquare className="h-6 w-6" />}
            />
            <FeatureCard
              title="Progress Tracking"
              description="Monitor implementation of action steps and track improvement over time."
              icon={<RefreshCw className="h-6 w-6" />}
            />
            <FeatureCard
              title="Coaching Frameworks"
              description="Access proven coaching frameworks that guide the development process."
              icon={<BookCheck className="h-6 w-6" />}
            />
            <FeatureCard
              title="Collaborative Learning"
              description="Connect teachers with coaches for a supportive professional learning experience."
              icon={<Users className="h-6 w-6" />}
            />
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to elevate teaching excellence?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of schools transforming their professional development with TeachSpire.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="text-lg transition-all duration-300 hover:scale-105"
                onClick={() => navigate('/auth')}
              >
                Get Started Free
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="text-lg transition-all duration-300 hover:scale-105"
                onClick={() => navigate('/features')}
              >
                Learn More
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
              <div className="font-semibold text-xl">TeachSpire</div>
              <p className="text-muted-foreground mt-2">Elevating teaching through expert coaching</p>
            </div>
            <div className="flex space-x-8">
              <div className="space-y-4">
                <h3 className="font-medium">Product</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Features</a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Pricing</a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Case Studies</a></li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="font-medium">Company</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">About</a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Blog</a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Contact</a></li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="font-medium">Legal</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Privacy</a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Terms</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-200 mt-12 pt-8 text-center text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} TeachSpire. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
