
// This file re-exports all auth functionality from the new structure
// to maintain backward compatibility

import { AuthProvider, useAuth } from './auth';
export { AuthProvider, useAuth };
export default { AuthProvider, useAuth };
