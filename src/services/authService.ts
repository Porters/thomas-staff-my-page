import { api } from './api'
import type { LoginCredentials, OtpVerification, AuthResponse } from '../types'

export const authService = {
  login: async (credentials: LoginCredentials) => {
    const response = await api.post<{ requiresOtp: boolean }>('/auth/login', credentials)
    return response.data
  },

  verifyOtp: async (data: OtpVerification) => {
    const response = await api.post<AuthResponse>('/auth/verify-otp', data)
    if (response.data.token) {
      localStorage.setItem('authToken', response.data.token)
    }
    return response.data
  },

  logout: () => {
    localStorage.removeItem('authToken')
  },

  getCurrentUser: async () => {
    const response = await api.get<AuthResponse['user']>('/auth/me')
    return response.data
  },

  requestPasswordReset: async (email: string) => {
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

  resetPassword: async (email: string, newPassword: string) => {
    // Mock implementation - replace with actual API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    return { success: true, message: 'Password reset successfully' }
  },
}
