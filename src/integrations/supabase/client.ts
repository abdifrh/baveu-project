// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://bojwnsqstcmwatehcxnu.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJvanduc3FzdGNtd2F0ZWhjeG51Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEyNzE4NDYsImV4cCI6MjA1Njg0Nzg0Nn0.uktzc-lafU0K8AXXVlcUFHY7Auv6HRuyp2f5maueSYY";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);