import api from './axios';

export type TaskStatus = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';

export interface Task {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  customerId: number;
  customerName: string;
  assignedUserId: string;
  assignedTo: string;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
}

interface TaskCreateRequest {
  title: string;
  description: string;
  customerId: number;
  assignedUserId: string;
  dueDate: string;
}

interface TaskUpdateRequest extends Partial<TaskCreateRequest> {
  status?: TaskStatus;
}

// Mock data
const mockTasks: Task[] = [
  {
    id: 1,
    title: 'Müşteri Görüşmesi',
    description: 'Yeni teklif hakkında görüşme',
    status: 'PENDING',
    customerId: 1,
    customerName: 'Ahmet Yılmaz',
    assignedUserId: '1',
    assignedTo: 'Destek Ekibi',
    dueDate: '2024-02-15',
    createdAt: '2024-01-20',
    updatedAt: '2024-01-20'
  },
  {
    id: 2,
    title: 'Sözleşme Hazırlama',
    description: 'Yeni dönem sözleşmesi hazırlanacak',
    status: 'IN_PROGRESS',
    customerId: 2,
    customerName: 'Ayşe Demir',
    assignedUserId: '2',
    assignedTo: 'Satış Ekibi',
    dueDate: '2024-02-20',
    createdAt: '2024-01-21',
    updatedAt: '2024-01-22'
  },
  {
    id: 3,
    title: 'Teknik Destek',
    description: 'Sistem entegrasyonu desteği',
    status: 'COMPLETED',
    customerId: 3,
    customerName: 'Mehmet Kaya',
    assignedUserId: '3',
    assignedTo: 'Teknik Ekip',
    dueDate: '2024-02-10',
    createdAt: '2024-01-19',
    updatedAt: '2024-01-23'
  }
];

export const taskService = {
  getAll: async (): Promise<Task[]> => {
    // Backend hazır olduğunda:
    // const response = await api.get<Task[]>('/tasks');
    // return response.data;

    // Mock response
    await new Promise(resolve => setTimeout(resolve, 1000));
    return mockTasks;
  },

  getById: async (id: number): Promise<Task> => {
    // Backend hazır olduğunda:
    // const response = await api.get<Task>(`/tasks/${id}`);
    // return response.data;

    // Mock response
    await new Promise(resolve => setTimeout(resolve, 500));
    const task = mockTasks.find(t => t.id === id);
    if (!task) {
      throw new Error('Task not found');
    }
    return task;
  },

  create: async (data: TaskCreateRequest): Promise<Task> => {
    // Backend hazır olduğunda:
    // const response = await api.post<Task>('/tasks', data);
    // return response.data;

    // Mock response
    await new Promise(resolve => setTimeout(resolve, 1000));
    const newTask: Task = {
      id: Math.max(...mockTasks.map(t => t.id)) + 1,
      ...data,
      status: 'PENDING',
      customerName: 'Mock Customer', // Gerçek müşteri adı backend'den gelecek
      assignedTo: 'Mock User', // Gerçek kullanıcı adı backend'den gelecek
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    mockTasks.push(newTask);
    return newTask;
  },

  update: async (id: number, data: TaskUpdateRequest): Promise<Task> => {
    // Backend hazır olduğunda:
    // const response = await api.put<Task>(`/tasks/${id}`, data);
    // return response.data;

    // Mock response
    await new Promise(resolve => setTimeout(resolve, 1000));
    const index = mockTasks.findIndex(t => t.id === id);
    if (index === -1) {
      throw new Error('Task not found');
    }
    const updatedTask = {
      ...mockTasks[index],
      ...data,
      updatedAt: new Date().toISOString()
    };
    mockTasks[index] = updatedTask;
    return updatedTask;
  },

  updateStatus: async (id: number, status: TaskStatus): Promise<Task> => {
    // Backend hazır olduğunda:
    // const response = await api.patch<Task>(`/tasks/${id}/status`, { status });
    // return response.data;

    // Mock response
    return taskService.update(id, { status });
  },

  getByCustomerId: async (customerId: number): Promise<Task[]> => {
    // Backend hazır olduğunda:
    // const response = await api.get<Task[]>(`/tasks?customerId=${customerId}`);
    // return response.data;

    // Mock response
    await new Promise(resolve => setTimeout(resolve, 1000));
    return mockTasks.filter(t => t.customerId === customerId);
  },

  getByAssignedUserId: async (userId: string): Promise<Task[]> => {
    // Backend hazır olduğunda:
    // const response = await api.get<Task[]>(`/tasks?assignedUserId=${userId}`);
    // return response.data;

    // Mock response
    await new Promise(resolve => setTimeout(resolve, 1000));
    return mockTasks.filter(t => t.assignedUserId === userId);
  }
};