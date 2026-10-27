export interface Service { id: string; no: string; eyebrow: string; name: string; description: string; basePrice: number; icon: string }
export interface Option { id: string; name: string; multiplier: number }
export interface Selection { serviceId: string; packageId: string; vehicleId: string }
export const SERVICES: Service[];
export const PACKAGES: Option[];
export const VEHICLES: Option[];
export function estimateCost(selection: Selection): number;
export function money(value: number): string;
