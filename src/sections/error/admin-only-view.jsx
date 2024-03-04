import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { RouterLink } from 'src/routes/components';

// ----------------------------------------------------------------------

export default function AdminOnlyView() {
  return (
    <Container>
      <Box
        sx={{
          py: 12,
          maxWidth: 500,
          mx: 'auto',
          display: 'flex',
          minHeight: '100vh',
          textAlign: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <Typography variant="h3" sx={{ mb: 1 }}>
          Sorry,this page is only for admin.
        </Typography>

        <Typography sx={{ color: 'text.secondary' }}>
          Your role is not an admin. This page require admin role.
        </Typography>

        <Button href="/" size="large" variant="contained" component={RouterLink}>
          Go to Home
        </Button>
      </Box>
    </Container>
  );
}
