
import React from 'react';
import { TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UserCheck, UserCog } from 'lucide-react';

const TabsHeader = () => {
  return (
    <TabsList className="grid w-full grid-cols-2 mb-4">
      <TabsTrigger value="conducted" className="flex items-center justify-center gap-2">
        <UserCheck className="h-4 w-4" />
        <span className="hidden sm:inline">Mina õpipartnerina</span>
        <span className="sm:hidden">Õpipartner</span>
      </TabsTrigger>
      <TabsTrigger value="received" className="flex items-center justify-center gap-2">
        <UserCog className="h-4 w-4" />
        <span className="hidden sm:inline">Mina õpetajana</span>
        <span className="sm:hidden">Õpetaja</span>
      </TabsTrigger>
    </TabsList>
  );
};

export default TabsHeader;
