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
import { login, clearError } from '../../features/auth/authSlice';

const validationSchema = yup.object({
  email: yup
    .string()
    .email('Geçerli bir e-posta adresi giriniz')
    .required('E-posta adresi zorunludur'),
  password: yup
    .string()
    .min(6, 'Şifre en az 6 karakter olmalıdır')
    .required('Şifre zorunludur'),
});

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);

  useEffect(() => {
    // Sayfa yüklendiğinde hata mesajını temizle
    dispatch(clearError());
  }, [dispatch]);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const resultAction = await dispatch(login(values));
      if (login.fulfilled.match(resultAction)) {
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
          CRM Sistemine Giriş
        </Typography>

        {error && (
          <Alert severity="error" onClose={() => dispatch(clearError())}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={formik.handleSubmit}>
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
            sx={{ mb: 3 }}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Giriş Yap'}
          </Button>
        </Box>

        <Box sx={{ textAlign: 'center', mt: 2 }}>
          <Typography variant="body2" color="text.secondary">
            Hesabınız yok mu?{' '}
            <Button
              onClick={() => navigate('/register')}
              sx={{ textTransform: 'none' }}
            >
              Kayıt Ol
            </Button>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default Login;