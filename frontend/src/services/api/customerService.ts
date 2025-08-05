import api from './axios';

export interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  createdAt: string;
  isActive: boolean;
}

interface CustomerCreateRequest {
  name: string;
  email: string;
  phone: string;
}

interface CustomerUpdateRequest extends CustomerCreateRequest {
  isActive: boolean;
}

// Mock data
const mockCustomers: Customer[] = [
  {
    id: 1,
    name: 'Ahmet Yılmaz',
    email: 'ahmet@example.com',
    phone: '555-0101',
    createdAt: '2024-01-15',
    isActive: true
  },
  {
    id: 2,
    name: 'Ayşe Demir',
    email: 'ayse@example.com',
    phone: '555-0102',
    createdAt: '2024-01-16',
    isActive: true
  },
  {
    id: 3,
    name: 'Mehmet Kaya',
    email: 'mehmet@example.com',
    phone: '555-0103',
    createdAt: '2024-01-17',
    isActive: false
  }
];

export const customerService = {
  getAll: async (): Promise<Customer[]> => {
    // Backend hazır olduğunda:
    // const response = await api.get<Customer[]>('/customers');
    // return response.data;

    // Mock response
    await new Promise(resolve => setTimeout(resolve, 1000));
    return mockCustomers;
  },

  getById: async (id: number): Promise<Customer> => {
    // Backend hazır olduğunda:
    // const response = await api.get<Customer>(`/customers/${id}`);
    // return response.data;

    // Mock response
    await new Promise(resolve => setTimeout(resolve, 500));
    const customer = mockCustomers.find(c => c.id === id);
    if (!customer) {
      throw new Error('Customer not found');
    }
    return customer;
  },

  create: async (data: CustomerCreateRequest): Promise<Customer> => {
    // Backend hazır olduğunda:
    // const response = await api.post<Customer>('/customers', data);
    // return response.data;

    // Mock response
    await new Promise(resolve => setTimeout(resolve, 1000));
    const newCustomer: Customer = {
      id: Math.max(...mockCustomers.map(c => c.id)) + 1,
      ...data,
      createdAt: new Date().toISOString(),
      isActive: true
    };
    mockCustomers.push(newCustomer);
    return newCustomer;
  },

  update: async (id: number, data: CustomerUpdateRequest): Promise<Customer> => {
    // Backend hazır olduğunda:
    // const response = await api.put<Customer>(`/customers/${id}`, data);
    // return response.data;

    // Mock response
    await new Promise(resolve => setTimeout(resolve, 1000));
    const index = mockCustomers.findIndex(c => c.id === id);
    if (index === -1) {
      throw new Error('Customer not found');
    }
    const updatedCustomer = {
      ...mockCustomers[index],
      ...data
    };
    mockCustomers[index] = updatedCustomer;
    return updatedCustomer;
  },

  delete: async (id: number): Promise<void> => {
    // Backend hazır olduğunda:
    // await api.delete(`/customers/${id}`);

    // Mock response
    await new Promise(resolve => setTimeout(resolve, 1000));
    const index = mockCustomers.findIndex(c => c.id === id);
    if (index === -1) {
      throw new Error('Customer not found');
    }
    mockCustomers.splice(index, 1);
  }
};