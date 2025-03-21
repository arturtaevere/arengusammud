
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { RefreshCw } from 'lucide-react';

interface UsersRefreshControlsProps {
  onRefresh: () => void;
}

const UsersRefreshControls = ({ onRefresh }: UsersRefreshControlsProps) => {
  const { refreshUsers } = useAuth();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { toast } = useToast();

  const handleManualRefresh = () => {
    setIsRefreshing(true);
    
    try {
      console.log('Manual refresh requested');
      // Force refresh from the auth context
      refreshUsers();
      
      // Small delay to ensure storage is updated
      setTimeout(() => {
        // Refresh the component
        onRefresh();
        
        toast({
          title: "Kasutajate nimekiri värskendatud",
          description: "Kasutajate nimekiri on edukalt uuendatud.",
        });
        setIsRefreshing(false);
      }, 300);
    } catch (error) {
      console.error('Error refreshing users:', error);
      toast({
        variant: "destructive",
        title: "Värskendamine ebaõnnestus",
        description: "Viga kasutajate nimekirja värskendamisel",
      });
      setIsRefreshing(false);
    }
  };

  return (
    <div className="flex gap-2">
      <Button
        onClick={handleManualRefresh}
        variant="outline"
        size="sm"
        disabled={isRefreshing}
        className="gap-2"
      >
        <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
        Värskenda nimekirja
      </Button>
    </div>
  );
};

export default UsersRefreshControls;
