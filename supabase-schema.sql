-- ==============================================================================
-- A P STAR MOVERS — ENTERPRISE TMS DATABASE SCHEMA
-- Version: 1.0 (Production-Ready)
-- ==============================================================================
-- INSTRUCTIONS: Copy this entire script and paste it into Supabase SQL Editor.
-- Click "Run" to execute. It will create everything automatically.
-- ==============================================================================


-- =====================
-- 1. CUSTOM ENUMS
-- =====================
CREATE TYPE user_role AS ENUM ('CUSTOMER', 'ADMIN', 'MANAGER', 'OPERATOR', 'SUPPORT');
CREATE TYPE booking_status AS ENUM ('DRAFT', 'QUOTED', 'PENDING', 'CONFIRMED', 'VEHICLE_ASSIGNED', 'DISPATCHED', 'PICKUP_STARTED', 'GOODS_LOADED', 'IN_TRANSIT', 'REACHED_DESTINATION', 'DELIVERED', 'COMPLETED', 'CANCELLED');
CREATE TYPE payment_status AS ENUM ('PENDING', 'ADVANCE_PAID', 'PARTIAL', 'COMPLETED', 'REFUNDED', 'FAILED');
CREATE TYPE payment_method AS ENUM ('UPI', 'CARD', 'NET_BANKING', 'CASH', 'WALLET');
CREATE TYPE vehicle_status AS ENUM ('AVAILABLE', 'IN_TRANSIT', 'MAINTENANCE', 'OUT_OF_SERVICE');
CREATE TYPE driver_status AS ENUM ('AVAILABLE', 'ON_TRIP', 'OFF_DUTY', 'INACTIVE');
CREATE TYPE ticket_status AS ENUM ('OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED');
CREATE TYPE ticket_priority AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL');
CREATE TYPE document_type AS ENUM ('RC', 'LICENSE', 'INSURANCE', 'FITNESS', 'PERMIT', 'POD', 'EWAY_BILL', 'GST_CERT', 'PROFILE_PHOTO', 'OTHER');
CREATE TYPE invoice_status AS ENUM ('DRAFT', 'ISSUED', 'PAID', 'OVERDUE', 'CANCELLED');


-- =====================
-- 2. USER PROFILES
-- =====================
CREATE TABLE profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    role user_role DEFAULT 'CUSTOMER' NOT NULL,
    full_name TEXT NOT NULL DEFAULT '',
    phone TEXT,
    email TEXT,
    company_name TEXT,
    gst_number TEXT,
    avatar_url TEXT,
    credit_limit NUMERIC(12,2) DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_profiles_role ON profiles(role);
CREATE INDEX idx_profiles_phone ON profiles(phone);
CREATE INDEX idx_profiles_email ON profiles(email);


-- =====================
-- 3. FLEET — VEHICLE TYPES
-- =====================
CREATE TABLE vehicle_types (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    description TEXT,
    icon_name TEXT DEFAULT 'truck',
    capacity_weight_kg NUMERIC(10,2) NOT NULL,
    capacity_volume_cft NUMERIC(10,2),
    body_length_ft NUMERIC(5,1),
    base_rate_per_km NUMERIC(8,2) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);


-- =====================
-- 4. FLEET — VEHICLES
-- =====================
CREATE TABLE vehicles (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    registration_no TEXT UNIQUE NOT NULL,
    vehicle_type_id UUID REFERENCES vehicle_types(id) NOT NULL,
    status vehicle_status DEFAULT 'AVAILABLE' NOT NULL,
    make TEXT,
    model TEXT,
    year INT,
    fitness_expiry DATE,
    insurance_expiry DATE,
    permit_expiry DATE,
    gps_device_id TEXT,
    current_lat NUMERIC(10,7),
    current_lng NUMERIC(10,7),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_vehicles_status ON vehicles(status);
CREATE INDEX idx_vehicles_type ON vehicles(vehicle_type_id);


-- =====================
-- 5. DRIVERS
-- =====================
CREATE TABLE drivers (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id),
    name TEXT NOT NULL,
    phone TEXT UNIQUE NOT NULL,
    email TEXT,
    license_no TEXT UNIQUE NOT NULL,
    license_expiry DATE NOT NULL,
    status driver_status DEFAULT 'AVAILABLE' NOT NULL,
    rating NUMERIC(3,2) DEFAULT 5.00,
    total_trips INT DEFAULT 0,
    is_verified BOOLEAN DEFAULT FALSE,
    emergency_contact_name TEXT,
    emergency_contact_phone TEXT,
    current_lat NUMERIC(10,7),
    current_lng NUMERIC(10,7),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_drivers_status ON drivers(status);
CREATE INDEX idx_drivers_phone ON drivers(phone);


-- =====================
-- 6. SAVED LOCATIONS (Address Book)
-- =====================
CREATE TABLE locations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    customer_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    label TEXT,
    address_line TEXT NOT NULL,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    pincode TEXT NOT NULL,
    lat NUMERIC(10,7),
    lng NUMERIC(10,7),
    is_default BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_locations_customer ON locations(customer_id);


-- =====================
-- 7. BOOKINGS (Core Order)
-- =====================
CREATE TABLE bookings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    tracking_id TEXT UNIQUE NOT NULL,
    customer_id UUID REFERENCES profiles(id) NOT NULL,

    -- Locations
    pickup_address TEXT NOT NULL,
    pickup_city TEXT NOT NULL,
    pickup_state TEXT NOT NULL,
    pickup_pincode TEXT,
    pickup_lat NUMERIC(10,7),
    pickup_lng NUMERIC(10,7),
    dropoff_address TEXT NOT NULL,
    dropoff_city TEXT NOT NULL,
    dropoff_state TEXT NOT NULL,
    dropoff_pincode TEXT,
    dropoff_lat NUMERIC(10,7),
    dropoff_lng NUMERIC(10,7),

    -- Vehicle & Assignment
    vehicle_type_id UUID REFERENCES vehicle_types(id) NOT NULL,
    assigned_vehicle_id UUID REFERENCES vehicles(id),
    assigned_driver_id UUID REFERENCES drivers(id),

    -- Schedule
    scheduled_pickup TIMESTAMPTZ NOT NULL,
    preferred_pickup_window TEXT,
    actual_pickup TIMESTAMPTZ,
    actual_delivery TIMESTAMPTZ,
    estimated_delivery TIMESTAMPTZ,

    -- Status & Financials
    status booking_status DEFAULT 'PENDING' NOT NULL,
    distance_km NUMERIC(10,2),
    base_amount NUMERIC(12,2),
    gst_amount NUMERIC(12,2),
    discount_amount NUMERIC(12,2) DEFAULT 0,
    total_amount NUMERIC(12,2),
    advance_amount NUMERIC(12,2) DEFAULT 0,
    payment_status payment_status DEFAULT 'PENDING' NOT NULL,

    -- Customer Info
    contact_name TEXT,
    contact_phone TEXT,
    contact_email TEXT,
    company_name TEXT,
    gst_number TEXT,
    special_instructions TEXT,

    -- Metadata
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    cancelled_at TIMESTAMPTZ,
    cancellation_reason TEXT
);

CREATE INDEX idx_bookings_customer ON bookings(customer_id);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_bookings_tracking ON bookings(tracking_id);
CREATE INDEX idx_bookings_created ON bookings(created_at DESC);
CREATE INDEX idx_bookings_driver ON bookings(assigned_driver_id);
CREATE INDEX idx_bookings_vehicle ON bookings(assigned_vehicle_id);


-- =====================
-- 8. CARGO DETAILS
-- =====================
CREATE TABLE cargo_details (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    booking_id UUID REFERENCES bookings(id) ON DELETE CASCADE NOT NULL,
    material_type TEXT NOT NULL,
    weight_kg NUMERIC(10,2),
    volume_cft NUMERIC(10,2),
    packages_count INT DEFAULT 1,
    is_fragile BOOLEAN DEFAULT FALSE,
    is_hazardous BOOLEAN DEFAULT FALSE,
    is_liquid BOOLEAN DEFAULT FALSE,
    requires_loading BOOLEAN DEFAULT FALSE,
    requires_unloading BOOLEAN DEFAULT FALSE,
    requires_packing BOOLEAN DEFAULT FALSE,
    insurance_required BOOLEAN DEFAULT FALSE,
    notes TEXT
);

CREATE INDEX idx_cargo_booking ON cargo_details(booking_id);


-- =====================
-- 9. TRACKING EVENTS (Timeline)
-- =====================
CREATE TABLE tracking_events (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    booking_id UUID REFERENCES bookings(id) ON DELETE CASCADE NOT NULL,
    status booking_status NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    location_description TEXT,
    lat NUMERIC(10,7),
    lng NUMERIC(10,7),
    logged_by UUID REFERENCES profiles(id),
    timestamp TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_tracking_booking ON tracking_events(booking_id);
CREATE INDEX idx_tracking_timestamp ON tracking_events(timestamp DESC);


-- =====================
-- 10. INVOICES
-- =====================
CREATE TABLE invoices (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    invoice_number TEXT UNIQUE NOT NULL,
    booking_id UUID REFERENCES bookings(id) NOT NULL,
    customer_id UUID REFERENCES profiles(id) NOT NULL,
    base_amount NUMERIC(12,2) NOT NULL,
    cgst NUMERIC(12,2) DEFAULT 0,
    sgst NUMERIC(12,2) DEFAULT 0,
    igst NUMERIC(12,2) DEFAULT 0,
    discount NUMERIC(12,2) DEFAULT 0,
    total_amount NUMERIC(12,2) NOT NULL,
    status invoice_status DEFAULT 'DRAFT' NOT NULL,
    due_date DATE,
    paid_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_invoices_booking ON invoices(booking_id);
CREATE INDEX idx_invoices_customer ON invoices(customer_id);


-- =====================
-- 11. PAYMENTS
-- =====================
CREATE TABLE payments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    booking_id UUID REFERENCES bookings(id) NOT NULL,
    invoice_id UUID REFERENCES invoices(id),
    amount NUMERIC(12,2) NOT NULL,
    method payment_method NOT NULL,
    transaction_reference TEXT,
    status payment_status DEFAULT 'PENDING' NOT NULL,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_payments_booking ON payments(booking_id);


-- =====================
-- 12. SUPPORT TICKETS
-- =====================
CREATE TABLE support_tickets (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    ticket_number TEXT UNIQUE NOT NULL,
    customer_id UUID REFERENCES profiles(id) NOT NULL,
    booking_id UUID REFERENCES bookings(id),
    subject TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT DEFAULT 'GENERAL',
    priority ticket_priority DEFAULT 'MEDIUM' NOT NULL,
    status ticket_status DEFAULT 'OPEN' NOT NULL,
    assigned_to UUID REFERENCES profiles(id),
    resolved_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_tickets_customer ON support_tickets(customer_id);
CREATE INDEX idx_tickets_status ON support_tickets(status);


-- =====================
-- 13. DOCUMENTS (Storage Metadata)
-- =====================
CREATE TABLE documents (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    entity_type TEXT NOT NULL, -- 'VEHICLE', 'DRIVER', 'BOOKING'
    entity_id UUID NOT NULL,
    document_type document_type NOT NULL,
    file_name TEXT NOT NULL,
    file_url TEXT NOT NULL,
    file_size_bytes BIGINT,
    is_verified BOOLEAN DEFAULT FALSE,
    verified_by UUID REFERENCES profiles(id),
    uploaded_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_documents_entity ON documents(entity_type, entity_id);


-- =====================
-- 14. NOTIFICATIONS
-- =====================
CREATE TABLE notifications (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    body TEXT NOT NULL,
    type TEXT DEFAULT 'INFO',
    is_read BOOLEAN DEFAULT FALSE,
    link TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_notifications_user ON notifications(user_id);
CREATE INDEX idx_notifications_unread ON notifications(user_id, is_read) WHERE is_read = FALSE;


-- =====================
-- 15. AUDIT LOGS
-- =====================
CREATE TABLE audit_logs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    table_name TEXT NOT NULL,
    record_id UUID NOT NULL,
    action TEXT NOT NULL,
    old_data JSONB,
    new_data JSONB,
    performed_by UUID,
    ip_address INET,
    timestamp TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_audit_table ON audit_logs(table_name);
CREATE INDEX idx_audit_timestamp ON audit_logs(timestamp DESC);


-- =====================
-- 16. REVIEWS
-- =====================
CREATE TABLE reviews (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    booking_id UUID REFERENCES bookings(id) NOT NULL,
    customer_id UUID REFERENCES profiles(id) NOT NULL,
    driver_id UUID REFERENCES drivers(id),
    rating INT CHECK (rating >= 1 AND rating <= 5) NOT NULL,
    comment TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_reviews_booking ON reviews(booking_id);


-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

-- Enable RLS on all critical tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE cargo_details ENABLE ROW LEVEL SECURITY;
ALTER TABLE tracking_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE support_tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- PROFILES
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Admin full access to profiles" ON profiles FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'ADMIN')
);

-- BOOKINGS
CREATE POLICY "Customers view own bookings" ON bookings FOR SELECT USING (auth.uid() = customer_id);
CREATE POLICY "Customers insert own bookings" ON bookings FOR INSERT WITH CHECK (auth.uid() = customer_id);
CREATE POLICY "Staff view all bookings" ON bookings FOR SELECT USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('ADMIN', 'MANAGER', 'OPERATOR'))
);

-- LOCATIONS
CREATE POLICY "Customers manage own locations" ON locations FOR ALL USING (auth.uid() = customer_id);

-- CARGO DETAILS
CREATE POLICY "Customers view own cargo" ON cargo_details FOR SELECT USING (
    EXISTS (SELECT 1 FROM bookings WHERE bookings.id = cargo_details.booking_id AND bookings.customer_id = auth.uid())
);
CREATE POLICY "Customers insert cargo" ON cargo_details FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM bookings WHERE bookings.id = cargo_details.booking_id AND bookings.customer_id = auth.uid())
);

-- TRACKING EVENTS
CREATE POLICY "Customers view own tracking" ON tracking_events FOR SELECT USING (
    EXISTS (SELECT 1 FROM bookings WHERE bookings.id = tracking_events.booking_id AND bookings.customer_id = auth.uid())
);
CREATE POLICY "Staff view all tracking" ON tracking_events FOR SELECT USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('ADMIN', 'MANAGER', 'OPERATOR'))
);

-- INVOICES
CREATE POLICY "Customers view own invoices" ON invoices FOR SELECT USING (auth.uid() = customer_id);
CREATE POLICY "Staff view all invoices" ON invoices FOR SELECT USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('ADMIN', 'MANAGER'))
);

-- PAYMENTS
CREATE POLICY "Customers view own payments" ON payments FOR SELECT USING (
    EXISTS (SELECT 1 FROM bookings WHERE bookings.id = payments.booking_id AND bookings.customer_id = auth.uid())
);

-- SUPPORT TICKETS
CREATE POLICY "Customers manage own tickets" ON support_tickets FOR ALL USING (auth.uid() = customer_id);
CREATE POLICY "Staff view all tickets" ON support_tickets FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('ADMIN', 'MANAGER', 'SUPPORT'))
);

-- NOTIFICATIONS
CREATE POLICY "Users view own notifications" ON notifications FOR ALL USING (auth.uid() = user_id);

-- REVIEWS
CREATE POLICY "Customers manage own reviews" ON reviews FOR ALL USING (auth.uid() = customer_id);


-- ==============================================================================
-- TRIGGERS & FUNCTIONS
-- ==============================================================================

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email, phone, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'phone', NULL),
    'CUSTOMER'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Auto-update updated_at on profile changes
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
CREATE TRIGGER bookings_updated_at BEFORE UPDATE ON bookings FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
CREATE TRIGGER vehicles_updated_at BEFORE UPDATE ON vehicles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
CREATE TRIGGER drivers_updated_at BEFORE UPDATE ON drivers FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
CREATE TRIGGER tickets_updated_at BEFORE UPDATE ON support_tickets FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- Generate tracking ID for bookings
CREATE OR REPLACE FUNCTION public.generate_tracking_id()
RETURNS TRIGGER AS $$
DECLARE
  seq_num INT;
BEGIN
  SELECT COUNT(*) + 1 INTO seq_num FROM bookings;
  NEW.tracking_id := 'BKG-' || TO_CHAR(NOW(), 'YYYY') || '-' || LPAD(seq_num::TEXT, 4, '0');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER booking_tracking_id
  BEFORE INSERT ON bookings
  FOR EACH ROW
  WHEN (NEW.tracking_id IS NULL OR NEW.tracking_id = '')
  EXECUTE FUNCTION public.generate_tracking_id();


-- ==============================================================================
-- SEED DATA — Vehicle Types
-- ==============================================================================
INSERT INTO vehicle_types (name, description, capacity_weight_kg, capacity_volume_cft, body_length_ft, base_rate_per_km, sort_order) VALUES
('Mini Truck',        'Tata Ace / Chhota Hathi — Ideal for local deliveries',         2000,  120,   7, 18.00, 1),
('Pickup Truck',      'Bolero / Dost — Fast inter-city small goods',                   3000,  180,   9, 22.00, 2),
('14 Feet Truck',     'Eicher / 14ft — Mid-size industrial cargo',                     5000,  350,  14, 28.00, 3),
('17 Feet Truck',     'Tata 1109 / 17ft — Voluminous goods and machinery',             7000,  500,  17, 32.00, 4),
('20 Feet Container', 'Closed container — Secure electronics & FMCG',                 10000,  700,  20, 38.00, 5),
('32 Feet Container', 'Multi-Axle Container — Large industrial & retail shipments',   22000, 1500,  32, 45.00, 6),
('Trailer',           'Low-bed / Flatbed Trailer — Heavy machinery & equipment',      30000, 2000,  40, 55.00, 7),
('Oil Tanker',        'Fuel / Chemical Tanker — Liquid goods transport',               15000, NULL, NULL, 50.00, 8);
