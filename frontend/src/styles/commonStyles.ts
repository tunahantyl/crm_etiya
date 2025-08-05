export const pageContainerStyles = {
  backgroundColor: 'white',
  borderRadius: 2,
  boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
  p: 3,
};

export const pageHeaderStyles = {
  mb: 3,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

export const formStyles = {
  '& .MuiTextField-root, & .MuiFormControl-root': {
    mb: 2,
  },
};

export const tableContainerStyles = {
  height: 'calc(100vh - 250px)',
  width: '100%',
  '& .MuiDataGrid-root': {
    border: 'none',
    backgroundColor: 'white',
    '& .MuiDataGrid-cell:focus': {
      outline: 'none',
    },
  },
};

export const buttonGroupStyles = {
  display: 'flex',
  gap: 2,
  justifyContent: 'flex-end',
  mt: 3,
};

export const cardStyles = {
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  p: 3,
  borderRadius: 2,
  boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
  transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  },
};