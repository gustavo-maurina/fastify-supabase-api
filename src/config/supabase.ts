import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
dotenv.config();

console.log(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_SECRET as string
);

const createSupabase = () => {
  return createClient(
    process.env.SUPABASE_URL as string,
    process.env.SUPABASE_SECRET as string
  );
};

export const supabase = createSupabase();
