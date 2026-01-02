import { api } from './api'
import { setAuthToken, removeAuthToken, API_ENDPOINTS } from '@/utils'
import type { LoginCredentials, OtpVerification, AuthResponse } from '../types'

export const authService = {
  login: async (credentials: LoginCredentials) => {
    const response = await api.post<{ requiresOtp: boolean }>(API_ENDPOINTS.AUTH.LOGIN, credentials)
    return response.data
  },

  verifyOtp: async (data: OtpVerification) => {
    const response = await api.post<AuthResponse>(API_ENDPOINTS.AUTH.VERIFY_OTP, data)
    if (response.data.token) {
      setAuthToken(response.data.token)
    }
    return response.data
  },

  logout: () => {
    removeAuthToken()
  },

  getCurrentUser: async () => {
    const response = await api.get<AuthResponse['user']>(API_ENDPOINTS.AUTH.ME)
    return response.data
  },

  requestPasswordReset: async (_email: string) => {
    // Mock implementation - replace with actual API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    return { success: true, message: 'OTP sent to email' }
  },

  verifyPasswordResetOtp: async (email: string, otp: string) => {
    // Mock implementation - replace with actual API call
    await new Promise((resolve) => setTimeout(resolve, 500))
    if (otp.length !== 6) {
      throw new Error('Invalid OTP')
    }
    return { success: true, message: 'OTP verified' }
  },

  resetPassword: async (_email: string, _newPassword: string) => {
    // Mock implementation - replace with actual API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    return { success: true, message: 'Password reset successfully' }
  },
}
