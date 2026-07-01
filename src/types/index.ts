// ==============================================================================
// A P STAR MOVERS — Enterprise TypeScript Definitions
// ==============================================================================

// ---- Enums ----
export type UserRole = "CUSTOMER" | "ADMIN" | "MANAGER" | "OPERATOR" | "SUPPORT";

export type BookingStatus =
  | "DRAFT" | "QUOTED" | "PENDING" | "CONFIRMED"
  | "VEHICLE_ASSIGNED" | "DISPATCHED" | "PICKUP_STARTED"
  | "GOODS_LOADED" | "IN_TRANSIT" | "REACHED_DESTINATION"
  | "DELIVERED" | "COMPLETED" | "CANCELLED";

export type PaymentStatus = "PENDING" | "ADVANCE_PAID" | "PARTIAL" | "COMPLETED" | "REFUNDED" | "FAILED";
export type PaymentMethod = "UPI" | "CARD" | "NET_BANKING" | "CASH" | "WALLET";
export type VehicleStatus = "AVAILABLE" | "IN_TRANSIT" | "MAINTENANCE" | "OUT_OF_SERVICE";
export type DriverStatus = "AVAILABLE" | "ON_TRIP" | "OFF_DUTY" | "INACTIVE";
export type TicketStatus = "OPEN" | "IN_PROGRESS" | "RESOLVED" | "CLOSED";
export type TicketPriority = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
export type InvoiceStatus = "DRAFT" | "ISSUED" | "PAID" | "OVERDUE" | "CANCELLED";

// ---- Core Entities ----
export interface Profile {
  id: string;
  role: UserRole;
  full_name: string;
  phone: string;
  email: string;
  company_name?: string;
  gst_number?: string;
  avatar_url?: string;
  is_active: boolean;
  created_at: string;
}

export interface VehicleType {
  id: string;
  name: string;
  description: string;
  icon_name: string;
  capacity_weight_kg: number;
  capacity_volume_cft?: number;
  body_length_ft?: number;
  base_rate_per_km: number;
  is_active: boolean;
  sort_order: number;
}

export interface Vehicle {
  id: string;
  registration_no: string;
  vehicle_type_id: string;
  vehicle_type?: VehicleType;
  status: VehicleStatus;
  make: string;
  model: string;
  year: number;
  fitness_expiry: string;
  insurance_expiry: string;
  is_active: boolean;
  created_at: string;
}

export interface Driver {
  id: string;
  name: string;
  phone: string;
  email?: string;
  license_no: string;
  license_expiry: string;
  status: DriverStatus;
  rating: number;
  total_trips: number;
  is_verified: boolean;
  is_active: boolean;
  created_at: string;
}

export interface Booking {
  id: string;
  tracking_id: string;
  customer_id: string;
  customer?: Profile;
  pickup_address: string;
  pickup_city: string;
  pickup_state: string;
  dropoff_address: string;
  dropoff_city: string;
  dropoff_state: string;
  vehicle_type_id: string;
  vehicle_type?: VehicleType;
  assigned_vehicle_id?: string;
  assigned_vehicle?: Vehicle;
  assigned_driver_id?: string;
  assigned_driver?: Driver;
  scheduled_pickup: string;
  actual_delivery?: string;
  estimated_delivery?: string;
  status: BookingStatus;
  distance_km: number;
  base_amount: number;
  gst_amount: number;
  discount_amount: number;
  total_amount: number;
  advance_amount: number;
  payment_status: PaymentStatus;
  contact_name: string;
  contact_phone: string;
  special_instructions?: string;
  created_at: string;
}

export interface CargoDetails {
  id: string;
  booking_id: string;
  material_type: string;
  weight_kg: number;
  packages_count: number;
  is_fragile: boolean;
  is_hazardous: boolean;
  requires_loading: boolean;
  requires_unloading: boolean;
  insurance_required: boolean;
  notes?: string;
}

export interface TrackingEvent {
  id: string;
  booking_id: string;
  status: BookingStatus;
  title: string;
  description?: string;
  location_description?: string;
  timestamp: string;
}

export interface Invoice {
  id: string;
  invoice_number: string;
  booking_id: string;
  booking?: Booking;
  customer_id: string;
  customer?: Profile;
  base_amount: number;
  cgst: number;
  sgst: number;
  igst: number;
  discount: number;
  total_amount: number;
  status: InvoiceStatus;
  due_date: string;
  paid_at?: string;
  created_at: string;
}

export interface Payment {
  id: string;
  booking_id: string;
  invoice_id?: string;
  amount: number;
  method: PaymentMethod;
  transaction_reference?: string;
  status: PaymentStatus;
  created_at: string;
}

export interface SupportTicket {
  id: string;
  ticket_number: string;
  customer_id: string;
  customer?: Profile;
  booking_id?: string;
  subject: string;
  description: string;
  category: string;
  priority: TicketPriority;
  status: TicketStatus;
  assigned_to?: string;
  created_at: string;
}

export interface Notification {
  id: string;
  user_id: string;
  title: string;
  body: string;
  type: string;
  is_read: boolean;
  link?: string;
  created_at: string;
}

// ---- Booking Wizard State ----
export interface BookingWizardState {
  // Step 1: Route
  pickup_address: string;
  pickup_city: string;
  pickup_state: string;
  dropoff_address: string;
  dropoff_city: string;
  dropoff_state: string;
  scheduled_date: string;
  scheduled_time: string;
  // Step 2: Vehicle
  vehicle_type_id: string;
  // Step 3: Cargo
  material_type: string;
  weight_kg: number;
  packages_count: number;
  is_fragile: boolean;
  is_hazardous: boolean;
  requires_loading: boolean;
  requires_unloading: boolean;
  insurance_required: boolean;
  cargo_notes: string;
  // Step 4: Contact
  contact_name: string;
  contact_phone: string;
  contact_email: string;
  company_name: string;
  gst_number: string;
  special_instructions: string;
}

// ---- Dashboard Stats ----
export interface DashboardStats {
  todaysBookings: number;
  pendingOrders: number;
  completedOrders: number;
  revenueToday: number;
  totalCustomers: number;
  totalDrivers: number;
  totalVehicles: number;
  openComplaints: number;
  revenueGrowth: number;
  monthlyRevenue: { month: string; revenue: number }[];
  bookingsByStatus: { status: string; count: number }[];
  recentBookings: Booking[];
}
