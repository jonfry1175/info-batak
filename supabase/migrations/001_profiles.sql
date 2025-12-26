-- ============================================================================
-- Migration: 001_profiles.sql
-- Description: Creates the profiles table for storing user data from Google OAuth
-- Requirements: 3.1, 3.2, 3.3
-- ============================================================================

-- Create profiles table that extends auth.users
-- Stores user profile information from Google OAuth authentication
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  display_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Add comment to table for documentation
COMMENT ON TABLE public.profiles IS 'User profiles extending Supabase auth.users with Google OAuth data';
COMMENT ON COLUMN public.profiles.id IS 'References auth.users(id), primary key';
COMMENT ON COLUMN public.profiles.email IS 'User email from Google OAuth';
COMMENT ON COLUMN public.profiles.display_name IS 'User display name (full_name from Google)';
COMMENT ON COLUMN public.profiles.avatar_url IS 'User avatar URL from Google profile';
COMMENT ON COLUMN public.profiles.created_at IS 'Timestamp when profile was created';
COMMENT ON COLUMN public.profiles.updated_at IS 'Timestamp when profile was last updated';

-- ============================================================================
-- Row Level Security (RLS) Policies
-- Requirement 3.3: Enforce RLS policies to protect user information
-- ============================================================================

-- Enable Row Level Security on profiles table
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view their own profile
CREATE POLICY "Users can view own profile" 
  ON public.profiles
  FOR SELECT 
  USING (auth.uid() = id);

-- Policy: Users can update their own profile
CREATE POLICY "Users can update own profile" 
  ON public.profiles
  FOR UPDATE 
  USING (auth.uid() = id);

-- Policy: Allow insert for authenticated users (for trigger)
CREATE POLICY "Enable insert for authenticated users only" 
  ON public.profiles
  FOR INSERT 
  WITH CHECK (auth.uid() = id);

-- ============================================================================
-- Trigger Function: Auto-create profile on user signup
-- Requirements 3.1, 3.2: Store user's id, email, display name, avatar URL,
-- and include created_at/updated_at timestamps
-- ============================================================================

-- Function to handle new user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, display_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to automatically create profile when a new user signs up
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================================================
-- Function: Auto-update updated_at timestamp
-- ============================================================================

-- Function to automatically update the updated_at column
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update updated_at on profile changes
DROP TRIGGER IF EXISTS on_profile_updated ON public.profiles;
CREATE TRIGGER on_profile_updated
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
