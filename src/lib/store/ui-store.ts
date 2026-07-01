import { create } from 'zustand';
import { FleetVehicle } from '@/lib/fleet-data';

interface UIState {
  isBookTruckModalOpen: boolean;
  isVehicleDetailsModalOpen: boolean;
  prefilledVehicleName: string | null;
  selectedVehicle: FleetVehicle | null;
  
  openBookTruckModal: (vehicleName?: string) => void;
  closeBookTruckModal: () => void;
  
  openVehicleDetailsModal: (vehicle: FleetVehicle) => void;
  closeVehicleDetailsModal: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  isBookTruckModalOpen: false,
  isVehicleDetailsModalOpen: false,
  prefilledVehicleName: null,
  selectedVehicle: null,

  openBookTruckModal: (vehicleName?: string) => set({ 
    isBookTruckModalOpen: true, 
    prefilledVehicleName: vehicleName || null 
  }),
  closeBookTruckModal: () => set({ 
    isBookTruckModalOpen: false, 
    prefilledVehicleName: null 
  }),

  openVehicleDetailsModal: (vehicle) => set({ 
    isVehicleDetailsModalOpen: true, 
    selectedVehicle: vehicle 
  }),
  closeVehicleDetailsModal: () => set({ 
    isVehicleDetailsModalOpen: false,
    selectedVehicle: null 
  }),
}));
