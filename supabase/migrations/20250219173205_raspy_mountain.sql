/*
  # Initial Schema Setup for Car Import Calculator

  1. Tables
    - users (handled by Supabase Auth)
    - calculations
      - Stores car import calculations
      - Links to user who created the calculation
    - saved_vehicles
      - Frequently used vehicle configurations
      - Links to user who saved the vehicle

  2. Security
    - Enable RLS on all tables
    - Add policies for user access
*/

-- Calculations table
CREATE TABLE calculations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  vehicle_make text NOT NULL,
  vehicle_model text NOT NULL,
  vehicle_year int NOT NULL,
  engine_type text NOT NULL,
  purchase_price_eur numeric(10,2) NOT NULL,
  co2_emissions int,
  weight_kg int NOT NULL,
  engine_displacement_cc int,
  exchange_rate numeric(10,4) NOT NULL,
  vat_amount numeric(10,2) NOT NULL,
  customs_duty numeric(10,2) NOT NULL,
  co2_tax numeric(10,2),
  recycling_fee numeric(10,2) NOT NULL,
  other_fees numeric(10,2) NOT NULL,
  total_cost_chf numeric(10,2) NOT NULL,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Saved vehicles table
CREATE TABLE saved_vehicles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  vehicle_make text NOT NULL,
  vehicle_model text NOT NULL,
  vehicle_year int NOT NULL,
  engine_type text NOT NULL,
  co2_emissions int,
  weight_kg int NOT NULL,
  engine_displacement_cc int,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE calculations ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_vehicles ENABLE ROW LEVEL SECURITY;

-- Policies for calculations
CREATE POLICY "Users can create their own calculations"
  ON calculations
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own calculations"
  ON calculations
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own calculations"
  ON calculations
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own calculations"
  ON calculations
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Policies for saved vehicles
CREATE POLICY "Users can create their own saved vehicles"
  ON saved_vehicles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own saved vehicles"
  ON saved_vehicles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own saved vehicles"
  ON saved_vehicles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own saved vehicles"
  ON saved_vehicles
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
CREATE TRIGGER update_calculations_updated_at
  BEFORE UPDATE ON calculations
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_saved_vehicles_updated_at
  BEFORE UPDATE ON saved_vehicles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();