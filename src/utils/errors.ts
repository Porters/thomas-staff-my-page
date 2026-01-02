import axios from 'axios'
import type { AxiosError } from 'axios'

export interface ApiError {
  message: string
  statusCode?: number
  errors?: Record<string, string[]>
}

/**
 * Parse API error response
 */
export const parseApiError = (error: unknown): ApiError => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<{
      message?: string
      errors?: Record<string, string[]>
    }>

    return {
      message: axiosError.response?.data?.message || axiosError.message || 'An error occurred',
      statusCode: axiosError.response?.status,
      errors: axiosError.response?.data?.errors,
    }
  }

  if (error instanceof Error) {
    return {
      message: error.message,
    }
  }

  return {
    message: 'An unexpected error occurred',
  }
}

/**
 * Log error to error tracking service (e.g., Sentry)
 */
export const logError = (error: unknown, context?: Record<string, unknown>): void => {
  // TODO: Integrate with Sentry or other error tracking service
  console.error('Error:', error, context)
}
