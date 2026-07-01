// ==============================================================================
// ABSTRACTED SERVICE LAYER — Replace mock implementations with Supabase later
// ==============================================================================
import type { Booking, VehicleType, Driver, Vehicle, Invoice, Payment, SupportTicket, Notification, Profile, TrackingEvent, DashboardStats } from "@/types";
import { mockBookings, mockVehicleTypes, mockDrivers, mockVehicles, mockInvoices, mockPayments, mockSupportTickets, mockNotifications, mockCurrentUser, mockCustomers, mockTrackingEvents, mockDashboardStats } from "@/lib/mock-data";

// Simulate network delay for realistic feel
const delay = (ms: number = 300) => new Promise((r) => setTimeout(r, ms));

// ---- Auth Service ----
export const authService = {
  async getCurrentUser(): Promise<Profile> {
    await delay(100);
    return mockCurrentUser;
  },
};

// ---- Booking Service ----
export const bookingService = {
  async getAll(): Promise<Booking[]> {
    await delay();
    return mockBookings;
  },
  async getByCustomer(customerId: string): Promise<Booking[]> {
    await delay();
    return mockBookings.filter((b) => b.customer_id === customerId);
  },
  async getById(id: string): Promise<Booking | undefined> {
    await delay();
    return mockBookings.find((b) => b.id === id);
  },
  async getByTrackingId(trackingId: string): Promise<Booking | undefined> {
    await delay();
    return mockBookings.find((b) => b.tracking_id === trackingId);
  },
  async getTrackingEvents(bookingId: string): Promise<TrackingEvent[]> {
    await delay();
    return mockTrackingEvents.filter((t) => t.booking_id === bookingId);
  },
};

// ---- Vehicle Type Service ----
export const vehicleTypeService = {
  async getAll(): Promise<VehicleType[]> {
    await delay();
    return mockVehicleTypes.filter((v) => v.is_active).sort((a, b) => a.sort_order - b.sort_order);
  },
};

// ---- Vehicle Service ----
export const vehicleService = {
  async getAll(): Promise<Vehicle[]> {
    await delay();
    return mockVehicles;
  },
};

// ---- Driver Service ----
export const driverService = {
  async getAll(): Promise<Driver[]> {
    await delay();
    return mockDrivers;
  },
};

// ---- Customer Service ----
export const customerService = {
  async getAll(): Promise<Profile[]> {
    await delay();
    return mockCustomers;
  },
};

// ---- Invoice Service ----
export const invoiceService = {
  async getAll(): Promise<Invoice[]> {
    await delay();
    return mockInvoices;
  },
  async getByCustomer(customerId: string): Promise<Invoice[]> {
    await delay();
    return mockInvoices.filter((i) => i.customer_id === customerId);
  },
};

// ---- Payment Service ----
export const paymentService = {
  async getAll(): Promise<Payment[]> {
    await delay();
    return mockPayments;
  },
};

// ---- Support Ticket Service ----
export const ticketService = {
  async getAll(): Promise<SupportTicket[]> {
    await delay();
    return mockSupportTickets;
  },
  async getByCustomer(customerId: string): Promise<SupportTicket[]> {
    await delay();
    return mockSupportTickets.filter((t) => t.customer_id === customerId);
  },
};

// ---- Notification Service ----
export const notificationService = {
  async getByUser(userId: string): Promise<Notification[]> {
    await delay();
    return mockNotifications.filter((n) => n.user_id === userId);
  },
};

// ---- Dashboard Service ----
export const dashboardService = {
  async getStats(): Promise<DashboardStats> {
    await delay(200);
    return mockDashboardStats;
  },
};
