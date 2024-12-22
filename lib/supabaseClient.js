// lib/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rcqkuhkouicibnkwmjtb.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJjcWt1aGtvdWljaWJua3dtanRiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjkyNTk3ODksImV4cCI6MjA0NDgzNTc4OX0.uSeLbVKeTQwBtpFLfdSQmQ8ArdjCZxAZHwn3LfrK9Lc';
 
export const supabase = createClient(supabaseUrl, supabaseAnonKey);