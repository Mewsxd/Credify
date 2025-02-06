import { createClient } from "@supabase/supabase-js";

// Define the type for environment variables
type EnvType = {
  SUPABASE_URL: string;
  SUPABASE_SERVICE_ROLE_KEY: string;
};

// Validate and extract environment variables
const env: EnvType = {
  SUPABASE_URL: process.env.SUPABASE_URL as string,
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY as string,
};

// Check if required environment variables are present
if (!env.SUPABASE_URL || !env.SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error(
    "Supabase URL and API key are required in environment variables."
  );
}

// Create the Supabase client
const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);

export default supabase;
