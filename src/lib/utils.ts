import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const ADMIN_PHONE = "916376228917"; // Replace with actual admin number
export const WHATSAPP_GROUP_LINK = "https://chat.whatsapp.com/"; // Replace with actual group link
