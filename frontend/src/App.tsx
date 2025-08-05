import { BrowserRouter } from 'react-router-dom';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Layout from './components/layout/Layout';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
  },
});

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Layout>
          <h1>Content will go here</h1>
        </Layout>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;