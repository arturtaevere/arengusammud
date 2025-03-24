
import { useContext } from 'react';
import { AuthContext } from './AuthProvider';

// Export our new hooks
export { useAuthSession } from './hooks/useAuthSession';
export { useVerification } from './hooks/useVerification';
export { useAuthHandlers } from './hooks/useAuthHandlers';

// Create a hook for using the context
export const useAuth = () => useContext(AuthContext);
