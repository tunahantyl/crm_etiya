import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Alert,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import trLocale from 'date-fns/locale/tr';
import { pageContainerStyles, pageHeaderStyles, formStyles } from '../../styles/commonStyles';

// Mock data
const mockCustomers = [
  { id: '1', name: 'Ahmet Yılmaz' },
  { id: '2', name: 'Ayşe Demir' },
  { id: '3', name: 'Mehmet Kaya' },
];

const mockUsers = [
  { id: '1', name: 'Admin Kullanıcı' },
  { id: '2', name: 'Destek Kullanıcısı' },
];

const validationSchema = yup.object({
  title: yup
    .string()
    .min(3, 'Başlık en az 3 karakter olmalıdır')
    .required('Başlık zorunludur'),
  description: yup
    .string()
    .min(10, 'Açıklama en az 10 karakter olmalıdır')
    .required('Açıklama zorunludur'),
  status: yup
    .string()
    .required('Durum zorunludur'),
  customerId: yup
    .string()
    .required('Müşteri seçimi zorunludur'),
  dueDate: yup
    .date()
    .nullable()
    .min(new Date(), 'Bitiş tarihi geçmiş bir tarih olamaz')
    .required('Bitiş tarihi zorunludur'),
  assignedUserId: yup
    .string()
    .required('Atanacak kişi seçimi zorunludur'),
});

const TaskForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      status: 'PENDING',
      customerId: '',
      dueDate: null,
      assignedUserId: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      setError(null);
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log('Görev kaydedildi:', values);
        navigate('/tasks');
      } catch (err) {
        setError('Görev kaydedilemedi. Lütfen tekrar deneyiniz.');
      } finally {
        setIsLoading(false);
      }
    },
  });

  useEffect(() => {
    if (isEditMode) {
      setIsLoading(true);
      setTimeout(() => {
        formik.setValues({
          title: 'Müşteri Araması',
          description: 'Yeni teklif hakkında müşteriyi ara',
          status: 'PENDING',
          customerId: '1',
          dueDate: new Date('2024-02-15'),
          assignedUserId: '1',
        });
        setIsLoading(false);
      }, 1000);
    }
  }, [isEditMode, formik.setValues]);

  if (isLoading && isEditMode) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={pageHeaderStyles}>
        <Typography variant="h5" fontWeight="medium">
          {isEditMode ? 'Görev Düzenle' : 'Yeni Görev'}
        </Typography>
      </Box>

      <Paper sx={{ ...pageContainerStyles, maxWidth: 800, mx: 'auto' }}>
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}
        
        <Box component="form" onSubmit={formik.handleSubmit} sx={formStyles}>
          <Stack spacing={3}>
            <TextField
              fullWidth
              label="Başlık"
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
              disabled={isLoading}
              required
            />

            <TextField
              fullWidth
              label="Açıklama"
              name="description"
              multiline
              rows={4}
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.description && Boolean(formik.errors.description)}
              helperText={formik.touched.description && formik.errors.description}
              disabled={isLoading}
              required
            />

            <Box sx={{ display: 'flex', gap: 2 }}>
              <FormControl 
                fullWidth 
                error={formik.touched.status && Boolean(formik.errors.status)}
                required
              >
                <InputLabel>Durum</InputLabel>
                <Select
                  name="status"
                  value={formik.values.status}
                  label="Durum"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  disabled={isLoading}
                >
                  <MenuItem value="PENDING">Beklemede</MenuItem>
                  <MenuItem value="IN_PROGRESS">Devam Ediyor</MenuItem>
                  <MenuItem value="COMPLETED">Tamamlandı</MenuItem>
                </Select>
              </FormControl>

              <FormControl 
                fullWidth 
                error={formik.touched.customerId && Boolean(formik.errors.customerId)}
                required
              >
                <InputLabel>Müşteri</InputLabel>
                <Select
                  name="customerId"
                  value={formik.values.customerId}
                  label="Müşteri"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  disabled={isLoading}
                >
                  {mockCustomers.map((customer) => (
                    <MenuItem key={customer.id} value={customer.id}>
                      {customer.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            <Box sx={{ display: 'flex', gap: 2 }}>
              <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={trLocale}>
                <DatePicker
                  label="Bitiş Tarihi"
                  value={formik.values.dueDate}
                  onChange={(value) => formik.setFieldValue('dueDate', value)}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      required: true,
                      error: formik.touched.dueDate && Boolean(formik.errors.dueDate),
                      helperText: formik.touched.dueDate && formik.errors.dueDate as string,
                    }
                  }}
                  disabled={isLoading}
                />
              </LocalizationProvider>

              <FormControl 
                fullWidth 
                error={formik.touched.assignedUserId && Boolean(formik.errors.assignedUserId)}
                required
              >
                <InputLabel>Atanacak Kişi</InputLabel>
                <Select
                  name="assignedUserId"
                  value={formik.values.assignedUserId}
                  label="Atanacak Kişi"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  disabled={isLoading}
                >
                  {mockUsers.map((user) => (
                    <MenuItem key={user.id} value={user.id}>
                      {user.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 2 }}>
              <Button
                variant="outlined"
                onClick={() => navigate('/tasks')}
                disabled={isLoading}
                size="large"
                sx={{ minWidth: 120 }}
              >
                İptal
              </Button>
              <Button
                type="submit"
                variant="contained"
                disabled={isLoading}
                size="large"
                sx={{ minWidth: 120 }}
              >
                {isLoading ? <CircularProgress size={24} /> : 'Kaydet'}
              </Button>
            </Box>
          </Stack>
        </Box>
      </Paper>
    </Box>
  );
};

export default TaskForm;