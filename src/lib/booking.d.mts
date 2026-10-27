import type { Selection } from "./catalog.mjs";
export interface Booking extends Selection { name: string; contactPhone: string; carModel: string; preferredDate: string }
export function normalizeWhatsAppNumber(raw: string | undefined): string | null;
export function buildBookingMessage(booking: Booking): string;
export function buildWhatsAppUrl(number: string | undefined, message: string): string | null;
export function isContactPhoneValid(value: string): boolean;
