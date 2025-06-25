// src/lib/constants/utils.ts

import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Merge Tailwind CSS classes conditionally.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format various types of error objects into readable strings.
 */
export function formatError(error: unknown): string {
  if (error instanceof Error) {
    return error.message
  }

  if (typeof error === 'string') {
    return error
  }

  try {
    return JSON.stringify(error)
  } catch {
    return 'Unknown error'
  }
}

/**
 * Convert complex objects into plain JavaScript objects (e.g., for serialization).
 */
export function convertToPlainObject<T>(data: T): T {
  return JSON.parse(JSON.stringify(data))
}
