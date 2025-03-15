
import { useState } from 'react';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import CircleCard from './CircleCard';
import { studyCircles } from '@/data/study-circles/data';

const CircleTabs = () => {
  const [activeTab, setActiveTab] = useState('circle1');

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mb-8">
      <TabsList className="w-full mb-6 flex-col sm:flex-row">
        {studyCircles.map(circle => (
          <TabsTrigger 
            key={circle.id} 
            value={circle.id} 
            className="flex-1 h-auto py-2"
          >
            {circle.title}
          </TabsTrigger>
        ))}
      </TabsList>

      {studyCircles.map(circle => (
        <TabsContent 
          key={circle.id} 
          value={circle.id} 
          className="animate-fade-in"
        >
          <CircleCard circle={circle} />
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default CircleTabs;
