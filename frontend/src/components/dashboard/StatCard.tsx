import { Card, CardContent, Typography, Box } from '@mui/material';
import { ReactNode } from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
}

const StatCard = ({ title, value, icon }: StatCardProps) => {
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          {icon}
        </Box>
        <Typography variant="h5" component="div">
          {value}
        </Typography>
        <Typography color="text.secondary">
          {title}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default StatCard;