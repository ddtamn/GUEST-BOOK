import { createClient } from '@supabase/supabase-js';
// import { env } from '$env/dynamic/public';

const supabase = createClient(
	'https://xyxsiuaxedneofkbjsej.supabase.co',
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh5eHNpdWF4ZWRuZW9ma2Jqc2VqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzM0MjU3NTUsImV4cCI6MTk4OTAwMTc1NX0.8MBu6aioyxUwOCrpGaEXXtlznwTHgP9zafPmxVCDqAQ'
);

export default supabase;
