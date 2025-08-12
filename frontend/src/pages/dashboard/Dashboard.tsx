import { Box, Typography, Grid, Paper } from '@mui/material';
import StatCard from '../../components/dashboard/StatCard';
import TaskStatusChart from '../../components/dashboard/TaskStatusChart';
import TaskTrendChart from '../../components/dashboard/TaskTrendChart';
import { useAppSelector } from '../../app/hooks';
import PeopleIcon from '@mui/icons-material/People';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { pageContainerStyles, pageHeaderStyles } from '../../styles/commonStyles';

// Mock data
const mockStats = {
  totalCustomers: 150,
  totalTasks: 48,
  completedTasks: 32,
  pendingTasks: 16,
  userStats: {
    assignedTasks: 8,
    completedTasks: 5,
    pendingTasks: 3
  }
};

// Mock chart data
const mockTaskStatus = {
  pending: 16,
  inProgress: 20,
  completed: 32
};

const mockTaskTrend = {
  labels: ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'],
  completed: [2, 3, 4, 3, 5, 2, 3],
  created: [3, 4, 3, 5, 4, 3, 4]
};

const Dashboard = () => {
  const { user } = useAppSelector((state) => state.auth);
  const isAdmin = user?.role === 'ADMIN';

  return (
    <Box>
      <Box sx={pageHeaderStyles}>
        <Typography variant="h5" fontWeight="medium">
          {isAdmin ? 'Yönetici Paneli' : 'Görev Takip Paneli'}
        </Typography>
      </Box>

      <Box sx={{ ...pageContainerStyles, p: 0 }}>
        <Grid container spacing={3} sx={{ p: 3 }}>
          {isAdmin ? (
            // Admin Dashboard
            <>
              <Grid item xs={12} sm={6} md={3}>
                <StatCard
                  title="Toplam Müşteri"
                  value={mockStats.totalCustomers}
                  icon={<PeopleIcon />}
                  color="#2196f3"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <StatCard
                  title="Toplam Görev"
                  value={mockStats.totalTasks}
                  icon={<AssignmentIcon />}
                  color="#4caf50"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <StatCard
                  title="Tamamlanan Görevler"
                  value={mockStats.completedTasks}
                  icon={<CheckCircleIcon />}
                  color="#ff9800"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <StatCard
                  title="Bekleyen Görevler"
                  value={mockStats.pendingTasks}
                  icon={<AccessTimeIcon />}
                  color="#f44336"
                />
              </Grid>
            </>
          ) : (
            // User Dashboard
            <>
              <Grid item xs={12} sm={6} md={4}>
                <StatCard
                  title="Atanan Görevler"
                  value={mockStats.userStats.assignedTasks}
                  icon={<AssignmentIcon />}
                  color="#2196f3"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <StatCard
                  title="Tamamladığım Görevler"
                  value={mockStats.userStats.completedTasks}
                  icon={<CheckCircleIcon />}
                  color="#4caf50"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <StatCard
                  title="Bekleyen Görevlerim"
                  value={mockStats.userStats.pendingTasks}
                  icon={<AccessTimeIcon />}
                  color="#f44336"
                />
              </Grid>
            </>
          )}

          {/* Grafikler */}
          <Grid item xs={12} md={6}>
            <TaskStatusChart data={mockTaskStatus} />
          </Grid>
          <Grid item xs={12} md={6}>
            <TaskTrendChart data={mockTaskTrend} />
          </Grid>

          {/* Yakında eklenecek: Son aktiviteler, yaklaşan görevler tablosu */}
        </Grid>
      </Box>
    </Box>
  );
};

export default Dashboard;