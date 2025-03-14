
// This file now re-exports all auth functionality from the new structure
// to maintain backward compatibility

import { AuthProvider, useAuth, SCHOOLS } from './auth';

export { AuthProvider, useAuth, SCHOOLS };
export default { AuthProvider, useAuth, SCHOOLS };
