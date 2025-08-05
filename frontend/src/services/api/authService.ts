import api from './axios';
import type { User } from '../../features/auth/authSlice';

interface LoginRequest {
  email: string;
  password: string;
}

interface RegisterRequest {
  email: string;
  password: string;
  fullName: string;
}

interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

interface AuthResponse {
  token: string;
  user: User;
}

// Mock data
const mockAuthResponse: AuthResponse = {
  token: 'mock-jwt-token',
  user: {
    id: '1',
    email: 'admin@example.com',
    name: 'Admin User',
    role: 'ADMIN'
  }
};

export const authService = {
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    // Backend hazır olduğunda:
    // const response = await api.post<AuthResponse>('/auth/login', data);
    // return response.data;

    // Mock response
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock validation
    if (data.email !== 'admin@example.com' || data.password !== 'admin123') {
      throw new Error('E-posta veya şifre hatalı');
    }
    
    return mockAuthResponse;
  },

  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    // Backend hazır olduğunda:
    // const response = await api.post<AuthResponse>('/auth/register', data);
    // return response.data;

    // Mock response
    await new Promise(resolve => setTimeout(resolve, 1000));
    return {
      ...mockAuthResponse,
      user: {
        ...mockAuthResponse.user,
        email: data.email,
        name: data.fullName,
        role: 'USER'
      }
    };
  },

  changePassword: async (data: ChangePasswordRequest): Promise<void> => {
    // Backend hazır olduğunda:
    // await api.post('/auth/change-password', data);

    // Mock response
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock validation
    if (data.currentPassword !== 'admin123') {
      throw new Error('Mevcut şifre hatalı');
    }
    
    // Başarılı
    return;
  },

  logout: async (): Promise<void> => {
    // Backend hazır olduğunda:
    // await api.post('/auth/logout');
    localStorage.removeItem('token');
  },

  getCurrentUser: async (): Promise<User> => {
    // Backend hazır olduğunda:
    // const response = await api.get<User>('/auth/me');
    // return response.data;

    // Mock response
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockAuthResponse.user;
  }
};