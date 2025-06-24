
-- Add user_id column to functions table
ALTER TABLE public.functions 
ADD COLUMN user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;

-- Add user_id column to guests table  
ALTER TABLE public.guests
ADD COLUMN user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;

-- Enable Row Level Security on functions table
ALTER TABLE public.functions ENABLE ROW LEVEL SECURITY;

-- Enable Row Level Security on guests table
ALTER TABLE public.guests ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for functions table
CREATE POLICY "Users can view their own functions" 
ON public.functions 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own functions" 
ON public.functions 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own functions" 
ON public.functions 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own functions" 
ON public.functions 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create RLS policies for guests table
CREATE POLICY "Users can view their own guests" 
ON public.guests 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own guests" 
ON public.guests 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own guests" 
ON public.guests 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own guests" 
ON public.guests 
FOR DELETE 
USING (auth.uid() = user_id);
