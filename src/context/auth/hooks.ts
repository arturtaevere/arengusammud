
import { useContext } from 'react';
import { AuthContext } from './AuthProvider';

// Create a hook for using the context
export const useAuth = () => useContext(AuthContext);
