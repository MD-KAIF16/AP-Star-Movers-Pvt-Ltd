// ==============================================================================
// MOCK DATA — Realistic enterprise data for development
// ==============================================================================
import type {
  Profile, VehicleType, Vehicle, Driver, Booking, TrackingEvent,
  Invoice, Payment, SupportTicket, Notification, DashboardStats,
} from "@/types";

// ---- Vehicle Types ----
export const mockVehicleTypes: VehicleType[] = [
  { id: "vt-1", name: "Mini Truck", description: "Tata Ace / Chhota Hathi — Ideal for local deliveries", icon_name: "truck", capacity_weight_kg: 2000, capacity_volume_cft: 120, body_length_ft: 7, base_rate_per_km: 18, is_active: true, sort_order: 1 },
  { id: "vt-2", name: "Pickup Truck", description: "Bolero / Dost — Fast inter-city small goods", icon_name: "truck", capacity_weight_kg: 3000, capacity_volume_cft: 180, body_length_ft: 9, base_rate_per_km: 22, is_active: true, sort_order: 2 },
  { id: "vt-3", name: "14 Feet Truck", description: "Eicher / 14ft — Mid-size industrial cargo", icon_name: "truck", capacity_weight_kg: 5000, capacity_volume_cft: 350, body_length_ft: 14, base_rate_per_km: 28, is_active: true, sort_order: 3 },
  { id: "vt-4", name: "17 Feet Truck", description: "Tata 1109 / 17ft — Voluminous goods and machinery", icon_name: "truck", capacity_weight_kg: 7000, capacity_volume_cft: 500, body_length_ft: 17, base_rate_per_km: 32, is_active: true, sort_order: 4 },
  { id: "vt-5", name: "20 Feet Container", description: "Closed container — Secure electronics & FMCG", icon_name: "container", capacity_weight_kg: 10000, capacity_volume_cft: 700, body_length_ft: 20, base_rate_per_km: 38, is_active: true, sort_order: 5 },
  { id: "vt-6", name: "32 Feet Container", description: "Multi-Axle Container — Large industrial & retail", icon_name: "container", capacity_weight_kg: 22000, capacity_volume_cft: 1500, body_length_ft: 32, base_rate_per_km: 45, is_active: true, sort_order: 6 },
  { id: "vt-7", name: "Trailer", description: "Low-bed / Flatbed — Heavy machinery & equipment", icon_name: "truck", capacity_weight_kg: 30000, capacity_volume_cft: 2000, body_length_ft: 40, base_rate_per_km: 55, is_active: true, sort_order: 7 },
  { id: "vt-8", name: "Oil Tanker", description: "Fuel / Chemical Tanker — Liquid goods transport", icon_name: "truck", capacity_weight_kg: 15000, base_rate_per_km: 50, is_active: true, sort_order: 8 },
];

// ---- Current User ----
export const mockCurrentUser: Profile = {
  id: "usr-001", role: "CUSTOMER", full_name: "Mohammad Kaif", phone: "+91 98765 43210",
  email: "kaif@starlogistics.com", company_name: "Star Logistics Pvt Ltd", gst_number: "09AAACR5055K1Z5",
  avatar_url: "", is_active: true, created_at: "2024-01-15T10:00:00Z",
};

// ---- Customers ----
export const mockCustomers: Profile[] = [
  mockCurrentUser,
  { id: "usr-002", role: "CUSTOMER", full_name: "Priya Sharma", phone: "+91 87654 32109", email: "priya@techcorp.in", company_name: "TechCorp India", gst_number: "07BBBPS1234L1ZP", is_active: true, created_at: "2024-02-20T10:00:00Z" },
  { id: "usr-003", role: "CUSTOMER", full_name: "Rajesh Gupta", phone: "+91 76543 21098", email: "rajesh@steelworks.com", company_name: "Gupta Steel Works", gst_number: "09CCCPG5678M1Z2", is_active: true, created_at: "2024-03-10T10:00:00Z" },
  { id: "usr-004", role: "CUSTOMER", full_name: "Anita Verma", phone: "+91 65432 10987", email: "anita@fmcg.co", company_name: "Verma FMCG Distributors", gst_number: "09DDDAV9012N1Z8", is_active: true, created_at: "2024-04-05T10:00:00Z" },
  { id: "usr-005", role: "CUSTOMER", full_name: "Suresh Yadav", phone: "+91 54321 09876", email: "suresh@buildmart.in", company_name: "BuildMart Construction", gst_number: "09EEESY3456P1Z4", is_active: false, created_at: "2024-05-12T10:00:00Z" },
];

// ---- Drivers ----
export const mockDrivers: Driver[] = [
  { id: "drv-001", name: "Ramesh Yadav", phone: "+91 99887 76655", license_no: "UP05 20220012345", license_expiry: "2027-06-15", status: "ON_TRIP", rating: 4.8, total_trips: 342, is_verified: true, is_active: true, created_at: "2023-01-10T10:00:00Z" },
  { id: "drv-002", name: "Sunil Kumar", phone: "+91 88776 65544", license_no: "UP05 20210067890", license_expiry: "2026-12-01", status: "AVAILABLE", rating: 4.5, total_trips: 218, is_verified: true, is_active: true, created_at: "2023-03-15T10:00:00Z" },
  { id: "drv-003", name: "Vikram Singh", phone: "+91 77665 54433", license_no: "DL01 20230034567", license_expiry: "2028-03-20", status: "AVAILABLE", rating: 4.9, total_trips: 156, is_verified: true, is_active: true, created_at: "2023-06-01T10:00:00Z" },
  { id: "drv-004", name: "Manoj Tiwari", phone: "+91 66554 43322", license_no: "UP32 20200098765", license_expiry: "2026-09-10", status: "OFF_DUTY", rating: 4.2, total_trips: 89, is_verified: true, is_active: true, created_at: "2023-08-20T10:00:00Z" },
  { id: "drv-005", name: "Deepak Chauhan", phone: "+91 55443 32211", license_no: "HR06 20220045678", license_expiry: "2027-01-05", status: "ON_TRIP", rating: 4.7, total_trips: 275, is_verified: true, is_active: true, created_at: "2023-02-14T10:00:00Z" },
];

// ---- Vehicles ----
export const mockVehicles: Vehicle[] = [
  { id: "veh-001", registration_no: "UP 70 AT 1234", vehicle_type_id: "vt-6", vehicle_type: mockVehicleTypes[5], status: "IN_TRANSIT", make: "Tata", model: "Prima 4028.S", year: 2022, fitness_expiry: "2027-03-15", insurance_expiry: "2026-12-01", is_active: true, created_at: "2022-06-01T10:00:00Z" },
  { id: "veh-002", registration_no: "UP 70 BT 5678", vehicle_type_id: "vt-5", vehicle_type: mockVehicleTypes[4], status: "AVAILABLE", make: "Ashok Leyland", model: "Boss 1616", year: 2023, fitness_expiry: "2028-01-20", insurance_expiry: "2027-06-15", is_active: true, created_at: "2023-01-15T10:00:00Z" },
  { id: "veh-003", registration_no: "UP 70 CT 9012", vehicle_type_id: "vt-3", vehicle_type: mockVehicleTypes[2], status: "AVAILABLE", make: "Eicher", model: "Pro 2049", year: 2023, fitness_expiry: "2028-06-01", insurance_expiry: "2027-09-01", is_active: true, created_at: "2023-04-01T10:00:00Z" },
  { id: "veh-004", registration_no: "UP 70 DT 3456", vehicle_type_id: "vt-1", vehicle_type: mockVehicleTypes[0], status: "MAINTENANCE", make: "Tata", model: "Ace Gold", year: 2021, fitness_expiry: "2026-08-01", insurance_expiry: "2026-07-15", is_active: true, created_at: "2021-09-01T10:00:00Z" },
  { id: "veh-005", registration_no: "UP 70 ET 7890", vehicle_type_id: "vt-8", vehicle_type: mockVehicleTypes[7], status: "IN_TRANSIT", make: "Bharat Benz", model: "2823R", year: 2022, fitness_expiry: "2027-11-01", insurance_expiry: "2027-03-01", is_active: true, created_at: "2022-11-01T10:00:00Z" },
  { id: "veh-006", registration_no: "UP 70 FT 2345", vehicle_type_id: "vt-4", vehicle_type: mockVehicleTypes[3], status: "AVAILABLE", make: "Tata", model: "1109", year: 2023, fitness_expiry: "2028-04-01", insurance_expiry: "2027-10-01", is_active: true, created_at: "2023-05-01T10:00:00Z" },
];

// ---- Bookings ----
export const mockBookings: Booking[] = [
  {
    id: "bk-001", tracking_id: "BKG-2024-0156", customer_id: "usr-001", customer: mockCurrentUser,
    pickup_address: "Industrial Area Phase-2, Prayagraj", pickup_city: "Prayagraj", pickup_state: "Uttar Pradesh",
    dropoff_address: "Sector 62, Noida", dropoff_city: "Noida", dropoff_state: "Uttar Pradesh",
    vehicle_type_id: "vt-6", vehicle_type: mockVehicleTypes[5],
    assigned_vehicle_id: "veh-001", assigned_vehicle: mockVehicles[0],
    assigned_driver_id: "drv-001", assigned_driver: mockDrivers[0],
    scheduled_pickup: "2024-05-12T09:00:00Z", estimated_delivery: "2024-05-13T18:00:00Z",
    status: "IN_TRANSIT", distance_km: 620, base_amount: 27900, gst_amount: 5022, discount_amount: 0, total_amount: 32922,
    advance_amount: 10000, payment_status: "ADVANCE_PAID",
    contact_name: "Mohammad Kaif", contact_phone: "+91 98765 43210", created_at: "2024-05-10T14:30:00Z",
  },
  {
    id: "bk-002", tracking_id: "BKG-2024-0157", customer_id: "usr-001", customer: mockCurrentUser,
    pickup_address: "Civil Lines, Prayagraj", pickup_city: "Prayagraj", pickup_state: "Uttar Pradesh",
    dropoff_address: "Kanpur Industrial Estate, Kanpur", dropoff_city: "Kanpur", dropoff_state: "Uttar Pradesh",
    vehicle_type_id: "vt-5", vehicle_type: mockVehicleTypes[4],
    status: "PENDING", distance_km: 210, base_amount: 7980, gst_amount: 1436, discount_amount: 500, total_amount: 8916,
    scheduled_pickup: "2024-05-12T10:00:00Z",
    advance_amount: 0, payment_status: "PENDING",
    contact_name: "Mohammad Kaif", contact_phone: "+91 98765 43210", created_at: "2024-05-11T10:00:00Z",
  },
  {
    id: "bk-003", tracking_id: "BKG-2024-0155", customer_id: "usr-001", customer: mockCurrentUser,
    pickup_address: "Naini Industrial Area, Prayagraj", pickup_city: "Prayagraj", pickup_state: "Uttar Pradesh",
    dropoff_address: "Andheri East, Mumbai", dropoff_city: "Mumbai", dropoff_state: "Maharashtra",
    vehicle_type_id: "vt-7", vehicle_type: mockVehicleTypes[6],
    assigned_vehicle_id: "veh-005", assigned_driver_id: "drv-005", assigned_driver: mockDrivers[4],
    scheduled_pickup: "2024-05-08T06:00:00Z", actual_delivery: "2024-05-10T14:00:00Z",
    status: "DELIVERED", distance_km: 1350, base_amount: 74250, gst_amount: 13365, discount_amount: 2000, total_amount: 85615,
    advance_amount: 30000, payment_status: "COMPLETED",
    contact_name: "Mohammad Kaif", contact_phone: "+91 98765 43210", created_at: "2024-05-06T11:00:00Z",
  },
  {
    id: "bk-004", tracking_id: "BKG-2024-0158", customer_id: "usr-002",
    customer: mockCustomers[1],
    pickup_address: "Sector 18, Gurgaon", pickup_city: "Gurgaon", pickup_state: "Haryana",
    dropoff_address: "MG Road, Bangalore", dropoff_city: "Bangalore", dropoff_state: "Karnataka",
    vehicle_type_id: "vt-5", vehicle_type: mockVehicleTypes[4],
    assigned_vehicle_id: "veh-002", assigned_driver_id: "drv-003", assigned_driver: mockDrivers[2],
    scheduled_pickup: "2024-05-14T08:00:00Z",
    status: "CONFIRMED", distance_km: 2150, base_amount: 81700, gst_amount: 14706, discount_amount: 5000, total_amount: 91406,
    advance_amount: 25000, payment_status: "ADVANCE_PAID",
    contact_name: "Priya Sharma", contact_phone: "+91 87654 32109", created_at: "2024-05-12T16:00:00Z",
  },
  {
    id: "bk-005", tracking_id: "BKG-2024-0159", customer_id: "usr-003",
    customer: mockCustomers[2],
    pickup_address: "Steel Market, Raipur", pickup_city: "Raipur", pickup_state: "Chhattisgarh",
    dropoff_address: "Bhiwandi, Mumbai", dropoff_city: "Mumbai", dropoff_state: "Maharashtra",
    vehicle_type_id: "vt-7", vehicle_type: mockVehicleTypes[6],
    status: "QUOTED", distance_km: 1100, base_amount: 60500, gst_amount: 10890, discount_amount: 0, total_amount: 71390,
    scheduled_pickup: "2024-05-15T09:00:00Z",
    advance_amount: 0, payment_status: "PENDING",
    contact_name: "Rajesh Gupta", contact_phone: "+91 76543 21098", created_at: "2024-05-13T09:00:00Z",
  },
];

// ---- Tracking Events ----
export const mockTrackingEvents: TrackingEvent[] = [
  { id: "te-1", booking_id: "bk-001", status: "PENDING", title: "Booking Created", description: "Your booking has been placed successfully.", timestamp: "2024-05-10T14:30:00Z" },
  { id: "te-2", booking_id: "bk-001", status: "CONFIRMED", title: "Booking Confirmed", description: "Your booking has been confirmed by our operations team.", timestamp: "2024-05-10T15:00:00Z" },
  { id: "te-3", booking_id: "bk-001", status: "VEHICLE_ASSIGNED", title: "Vehicle Assigned", description: "Tata Prima 4028.S (UP 70 AT 1234) has been assigned.", location_description: "Prayagraj Depot", timestamp: "2024-05-11T08:00:00Z" },
  { id: "te-4", booking_id: "bk-001", status: "DISPATCHED", title: "Driver Assigned", description: "Ramesh Yadav (+91 99887 76655) will handle your shipment.", timestamp: "2024-05-11T09:00:00Z" },
  { id: "te-5", booking_id: "bk-001", status: "PICKUP_STARTED", title: "Pickup Started", description: "Driver is en route to pickup location.", location_description: "Prayagraj", timestamp: "2024-05-12T08:30:00Z" },
  { id: "te-6", booking_id: "bk-001", status: "GOODS_LOADED", title: "Goods Loaded", description: "All cargo has been loaded successfully.", location_description: "Industrial Area Phase-2, Prayagraj", timestamp: "2024-05-12T10:00:00Z" },
  { id: "te-7", booking_id: "bk-001", status: "IN_TRANSIT", title: "In Transit", description: "Your shipment is on the way to the destination.", location_description: "Lucknow Highway", timestamp: "2024-05-12T12:00:00Z" },
];

// ---- Invoices ----
export const mockInvoices: Invoice[] = [
  { id: "inv-001", invoice_number: "INV-2024-0301", booking_id: "bk-003", customer_id: "usr-001", customer: mockCurrentUser, base_amount: 74250, cgst: 6682, sgst: 6682, igst: 0, discount: 2000, total_amount: 85615, status: "PAID", due_date: "2024-05-20", paid_at: "2024-05-10T14:00:00Z", created_at: "2024-05-10T14:05:00Z" },
  { id: "inv-002", invoice_number: "INV-2024-0302", booking_id: "bk-001", customer_id: "usr-001", customer: mockCurrentUser, base_amount: 27900, cgst: 2511, sgst: 2511, igst: 0, discount: 0, total_amount: 32922, status: "ISSUED", due_date: "2024-05-25", created_at: "2024-05-12T10:00:00Z" },
];

// ---- Payments ----
export const mockPayments: Payment[] = [
  { id: "pay-001", booking_id: "bk-003", invoice_id: "inv-001", amount: 30000, method: "UPI", transaction_reference: "UPI/205678901234", status: "COMPLETED", created_at: "2024-05-06T12:00:00Z" },
  { id: "pay-002", booking_id: "bk-003", invoice_id: "inv-001", amount: 55615, method: "NET_BANKING", transaction_reference: "NEFT/ICIC/20240510", status: "COMPLETED", created_at: "2024-05-10T14:00:00Z" },
  { id: "pay-003", booking_id: "bk-001", invoice_id: "inv-002", amount: 10000, method: "UPI", transaction_reference: "UPI/305678901234", status: "COMPLETED", created_at: "2024-05-10T15:00:00Z" },
];

// ---- Support Tickets ----
export const mockSupportTickets: SupportTicket[] = [
  { id: "tkt-001", ticket_number: "TKT-2024-0045", customer_id: "usr-001", customer: mockCurrentUser, booking_id: "bk-003", subject: "Delivery delay for BKG-2024-0155", description: "The shipment was supposed to arrive by May 9 but was delayed by one day. Please provide a reason.", category: "DELIVERY", priority: "MEDIUM", status: "RESOLVED", created_at: "2024-05-10T16:00:00Z" },
  { id: "tkt-002", ticket_number: "TKT-2024-0046", customer_id: "usr-002", customer: mockCustomers[1], subject: "Invoice discrepancy", description: "The GST amount on invoice INV-2024-0302 seems incorrect. Please re-check.", category: "BILLING", priority: "HIGH", status: "OPEN", created_at: "2024-05-13T11:00:00Z" },
];

// ---- Notifications ----
export const mockNotifications: Notification[] = [
  { id: "ntf-001", user_id: "usr-001", title: "Booking Confirmed", body: "Your booking BKG-2024-0156 has been confirmed.", type: "BOOKING", is_read: true, link: "/tracking/bk-001", created_at: "2024-05-10T15:00:00Z" },
  { id: "ntf-002", user_id: "usr-001", title: "Vehicle Assigned", body: "Tata Prima 4028.S has been assigned to BKG-2024-0156.", type: "BOOKING", is_read: true, link: "/tracking/bk-001", created_at: "2024-05-11T08:00:00Z" },
  { id: "ntf-003", user_id: "usr-001", title: "Shipment In Transit", body: "Your shipment BKG-2024-0156 is now in transit.", type: "TRACKING", is_read: false, link: "/tracking/bk-001", created_at: "2024-05-12T12:00:00Z" },
  { id: "ntf-004", user_id: "usr-001", title: "Payment Received", body: "₹10,000 advance for BKG-2024-0156 received.", type: "PAYMENT", is_read: false, link: "/invoices", created_at: "2024-05-10T15:05:00Z" },
];

// ---- Admin Dashboard Stats ----
export const mockDashboardStats: DashboardStats = {
  todaysBookings: 32,
  pendingOrders: 18,
  completedOrders: 28,
  revenueToday: 125430,
  totalCustomers: 1250,
  totalDrivers: 85,
  totalVehicles: 120,
  openComplaints: 7,
  revenueGrowth: 16,
  monthlyRevenue: [
    { month: "Jan", revenue: 1245000 }, { month: "Feb", revenue: 1380000 },
    { month: "Mar", revenue: 1520000 }, { month: "Apr", revenue: 1690000 },
    { month: "May", revenue: 1872430 }, { month: "Jun", revenue: 0 },
  ],
  bookingsByStatus: [
    { status: "Pending", count: 18 }, { status: "Confirmed", count: 12 },
    { status: "In Transit", count: 24 }, { status: "Delivered", count: 156 },
    { status: "Cancelled", count: 8 },
  ],
  recentBookings: mockBookings,
};
