import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import customerReducer from '../features/customers/customerSlice';
import taskReducer from '../features/tasks/taskSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    customers: customerReducer,
    tasks: taskReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;