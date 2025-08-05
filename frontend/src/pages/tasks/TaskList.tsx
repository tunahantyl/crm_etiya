import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Typography,
  Paper,
  Chip,
  Alert,
  CircularProgress,
} from '@mui/material';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { fetchTasks, fetchTasksByUser, updateTaskStatus } from '../../features/tasks/taskSlice';
import { pageContainerStyles, pageHeaderStyles, tableContainerStyles } from '../../styles/commonStyles';

const getStatusColor = (status: string) => {
  switch (status) {
    case 'PENDING':
      return 'warning';
    case 'IN_PROGRESS':
      return 'info';
    case 'COMPLETED':
      return 'success';
    default:
      return 'default';
  }
};

const getStatusLabel = (status: string) => {
  switch (status) {
    case 'PENDING':
      return 'Beklemede';
    case 'IN_PROGRESS':
      return 'Devam Ediyor';
    case 'COMPLETED':
      return 'Tamamlandı';
    default:
      return status;
  }
};

const TaskList = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { tasks, loading, error } = useAppSelector((state) => state.tasks);
  const [selectedTask, setSelectedTask] = useState<number | null>(null);

  useEffect(() => {
    // Admin tüm görevleri görür, normal kullanıcı sadece kendi görevlerini
    if (user?.role === 'ADMIN') {
      dispatch(fetchTasks());
    } else if (user?.id) {
      dispatch(fetchTasksByUser(user.id));
    }
  }, [dispatch, user]);

  const handleEdit = (id: number) => {
    navigate(`/tasks/${id}`);
  };

  const handleAddNew = () => {
    navigate('/tasks/new');
  };

  const handleStatusChange = async (taskId: number, newStatus: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED') => {
    await dispatch(updateTaskStatus({ id: taskId, status: newStatus }));
  };

  const columns: GridColDef[] = [
    {
      field: 'title',
      headerName: 'Görev',
      flex: 1,
      minWidth: 200,
    },
    {
      field: 'customerName',
      headerName: 'Müşteri',
      flex: 1,
      minWidth: 150,
    },
    {
      field: 'assignedTo',
      headerName: 'Atanan',
      flex: 1,
      minWidth: 150,
    },
    {
      field: 'status',
      headerName: 'Durum',
      flex: 1,
      minWidth: 150,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Chip
            label={getStatusLabel(params.value)}
            color={getStatusColor(params.value)}
            onClick={() => {
              const currentStatus = params.value;
              let newStatus: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
              
              switch (currentStatus) {
                case 'PENDING':
                  newStatus = 'IN_PROGRESS';
                  break;
                case 'IN_PROGRESS':
                  newStatus = 'COMPLETED';
                  break;
                default:
                  newStatus = 'PENDING';
              }
              
              handleStatusChange(params.row.id, newStatus);
            }}
            sx={{ cursor: 'pointer' }}
          />
        </Box>
      ),
    },
    {
      field: 'dueDate',
      headerName: 'Bitiş Tarihi',
      flex: 1,
      minWidth: 150,
      valueFormatter: (params) => {
        return new Date(params.value).toLocaleDateString('tr-TR');
      },
    },
    {
      field: 'actions',
      headerName: 'İşlemler',
      flex: 1,
      minWidth: 120,
      sortable: false,
      renderCell: (params) => (
        <Button
          size="small"
          startIcon={<EditIcon />}
          onClick={() => handleEdit(params.row.id)}
        >
          Düzenle
        </Button>
      ),
    },
  ];

  if (loading && !tasks.length) {
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
          Görevler
        </Typography>
        {user?.role === 'ADMIN' && (
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAddNew}
            sx={{ px: 3 }}
          >
            Yeni Görev
          </Button>
        )}
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Paper sx={pageContainerStyles}>
        <Box sx={tableContainerStyles}>
          <DataGrid
            rows={tasks}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 10 },
              },
              sorting: {
                sortModel: [{ field: 'dueDate', sort: 'asc' }],
              },
            }}
            pageSizeOptions={[10, 25, 50]}
            checkboxSelection
            disableRowSelectionOnClick
            onRowSelectionModelChange={(newSelection) => {
              setSelectedTask(newSelection[0] as number);
            }}
            sx={{
              '& .MuiDataGrid-columnHeaders': {
                backgroundColor: '#f5f5f5',
                borderBottom: 'none',
              },
              '& .MuiDataGrid-cell': {
                borderBottom: '1px solid #f0f0f0',
              },
              '& .MuiDataGrid-row:hover': {
                backgroundColor: '#f8f8f8',
              },
            }}
          />
        </Box>
      </Paper>
    </Box>
  );
};

export default TaskList;