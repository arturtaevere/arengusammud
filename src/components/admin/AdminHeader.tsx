
import React from 'react';

interface AdminHeaderProps {
  onRefreshUsers: () => void;
}

const AdminHeader = ({ onRefreshUsers }: AdminHeaderProps) => {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold mb-2">Kasutajate haldus</h1>
      <p className="text-muted-foreground">
        Siit leiad kõik registreeritud kasutajad ja nende info.
      </p>
      <button 
        onClick={onRefreshUsers}
        className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
      >
        Lähtesta kasutajate nimekiri
      </button>
    </div>
  );
};

export default AdminHeader;
