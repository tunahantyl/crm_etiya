import { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  Paper,
  Chip,
} from '@mui/material';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import { pageContainerStyles, pageHeaderStyles, tableContainerStyles } from '../../styles/commonStyles';

// Mock data
const mockTasks = [
  {
    id: 1,
    title: 'Müşteri Görüşmesi',
    description: 'Yeni teklif hakkında görüşme',
    status: 'PENDING',
    customerName: 'Ahmet Yılmaz',
    assignedTo: 'Destek Ekibi',
    dueDate: '2024-02-15',
  },
  {
    id: 2,
    title: 'Sözleşme Hazırlama',
    description: 'Yeni dönem sözleşmesi hazırlanacak',
    status: 'IN_PROGRESS',
    customerName: 'Ayşe Demir',
    assignedTo: 'Satış Ekibi',
    dueDate: '2024-02-20',
  },
  {
    id: 3,
    title: 'Teknik Destek',
    description: 'Sistem entegrasyonu desteği',
    status: 'COMPLETED',
    customerName: 'Mehmet Kaya',
    assignedTo: 'Teknik Ekip',
    dueDate: '2024-02-10',
  },
];

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
  const [selectedTask, setSelectedTask] = useState<number | null>(null);

  const handleEdit = (id: number) => {
    navigate(`/tasks/${id}`);
  };

  const handleAddNew = () => {
    navigate('/tasks/new');
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
      minWidth: 120,
      renderCell: (params) => (
        <Chip
          label={getStatusLabel(params.value)}
          color={getStatusColor(params.value)}
          size="small"
        />
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

  return (
    <Box>
      <Box sx={pageHeaderStyles}>
        <Typography variant="h5" fontWeight="medium">
          Görevler
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddNew}
          sx={{ px: 3 }}
        >
          Yeni Görev
        </Button>
      </Box>

      <Paper sx={pageContainerStyles}>
        <Box sx={tableContainerStyles}>
          <DataGrid
            rows={mockTasks}
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