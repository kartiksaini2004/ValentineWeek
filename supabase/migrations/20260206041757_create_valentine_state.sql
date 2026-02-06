/*
  # Valentine's Day App Schema

  1. New Tables
    - `valentine_state`
      - `id` (uuid, primary key)
      - `has_accepted` (boolean) - Whether she said yes
      - `days_visited` (jsonb) - Array of days that have been visited
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
  
  2. Security
    - Enable RLS on `valentine_state` table
    - Add policy for public access (since this is a personal romantic app)
*/

CREATE TABLE IF NOT EXISTS valentine_state (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  has_accepted boolean DEFAULT false,
  days_visited jsonb DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE valentine_state ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read valentine state"
  ON valentine_state FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Anyone can insert valentine state"
  ON valentine_state FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Anyone can update valentine state"
  ON valentine_state FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);