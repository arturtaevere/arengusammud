// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://kjmkrnwdambdfjzmlnii.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtqbWtybndkYW1iZGZqem1sbmlpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI1NTMwMDMsImV4cCI6MjA1ODEyOTAwM30.ayLDilZCxvfS1DO5IN5xrZk8cidclVWVNv6H51tLhII";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);