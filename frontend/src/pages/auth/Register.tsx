import { useEffect } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Alert,
  CircularProgress,
} from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { register, clearError } from '../../features/auth/authSlice';

const validationSchema = yup.object({
  fullName: yup
    .string()
    .min(3, 'Ad Soyad en az 3 karakter olmalıdır')
    .required('Ad Soyad zorunludur'),
  email: yup
    .string()
    .email('Geçerli bir e-posta adresi giriniz')
    .required('E-posta adresi zorunludur'),
  password: yup
    .string()
    .min(6, 'Şifre en az 6 karakter olmalıdır')
    .required('Şifre zorunludur'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Şifreler eşleşmiyor')
    .required('Şifre tekrarı zorunludur'),
});

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  const formik = useFormik({
    initialValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const { confirmPassword, ...registerData } = values;
      const resultAction = await dispatch(register(registerData));
      if (register.fulfilled.match(resultAction)) {
        navigate('/dashboard');
      }
    },
  });

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: '#f5f5f5',
        p: 2,
      }}
    >
      <Paper
        elevation={2}
        sx={{
          p: 4,
          width: '100%',
          maxWidth: 400,
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
        }}
      >
        <Typography variant="h5" component="h1" align="center" gutterBottom>
          CRM Sistemine Kayıt
        </Typography>

        {error && (
          <Alert severity="error" onClose={() => dispatch(clearError())}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            id="fullName"
            name="fullName"
            label="Ad Soyad"
            value={formik.values.fullName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.fullName && Boolean(formik.errors.fullName)}
            helperText={formik.touched.fullName && formik.errors.fullName}
            disabled={loading}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            id="email"
            name="email"
            label="E-posta"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            disabled={loading}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            id="password"
            name="password"
            label="Şifre"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            disabled={loading}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            id="confirmPassword"
            name="confirmPassword"
            label="Şifre Tekrarı"
            type="password"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
            helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
            disabled={loading}
            sx={{ mb: 3 }}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Kayıt Ol'}
          </Button>
        </Box>

        <Box sx={{ textAlign: 'center', mt: 2 }}>
          <Typography variant="body2" color="text.secondary">
            Zaten hesabınız var mı?{' '}
            <Button
              onClick={() => navigate('/login')}
              sx={{ textTransform: 'none' }}
            >
              Giriş Yap
            </Button>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default Register;