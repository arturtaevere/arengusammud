
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
  const [activeTab, setActiveTab] = useState('circle2');

  return (
    <div className="w-full mb-8">
      {studyCircles.map(circle => (
        <CircleCard key={circle.id} circle={circle} />
      ))}
    </div>
  );
};

export default CircleTabs;
