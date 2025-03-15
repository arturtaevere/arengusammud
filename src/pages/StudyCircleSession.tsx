
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { allSessions } from '@/data/study-circles/sessions';
import { SessionContent } from '@/data/study-circles/sessions/types';

const StudyCircleSession = () => {
  const { sessionId } = useParams<{ sessionId: string }>();
  const [sessionData, setSessionData] = useState<SessionContent | undefined>();
  
  useEffect(() => {
    // Find the session data based on the ID
    const session = allSessions.find(s => s.id === sessionId);
    if (session) {
      setSessionData(session);
    }
  }, [sessionId]);

  if (!sessionData) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="container mx-auto px-4 pt-24 pb-16 flex flex-col items-center justify-center flex-1">
          <Card className="max-w-lg w-full p-6">
            <CardContent className="pt-6 text-center">
              <h2 className="text-xl font-semibold mb-4">Sessiooni ei leitud</h2>
              <p className="mb-8 text-muted-foreground">
                Kahjuks ei leidnud me sessiooni, mida otsite.
              </p>
              <Button asChild>
                <Link to="/study-circles">Tagasi õpiringide juurde</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <Button
              variant="ghost"
              className="mb-4 -ml-2 text-muted-foreground hover:text-foreground"
              asChild
            >
              <Link to="/study-circles" className="flex items-center">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Tagasi õpiringide juurde
              </Link>
            </Button>
            
            <div className="text-sm font-medium text-muted-foreground mb-2">
              {sessionData.circleName} • Sessioon {sessionData.session}
            </div>
            <h1 className="text-3xl font-bold mb-6">{sessionData.title}</h1>
            
            <div className={cn("prose prose-lg max-w-none text-foreground")}>
              {sessionData.content}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyCircleSession;
