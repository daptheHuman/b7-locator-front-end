import React from 'react';
import { MdShelves } from 'react-icons/md';
import { FaBoxOpen } from 'react-icons/fa6';

import { Grid } from '@mui/material';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { getRackCount } from '../api/rack';
import { getProductCount } from '../api/product';
import AppWidgetSummary from '../app-widget-summary';

// ----------------------------------------------------------------------

export default function AppView() {
  const [productCount, setProductCount] = React.useState<number>(0);
  const [rackCount, setRackCount] = React.useState<number>(0);

  const fetchData = React.useCallback(() => {
    getProductCount().then((_count) => {
      setProductCount(_count);
    });

    getRackCount().then((_count) => {
      setRackCount(_count);
    });
  }, []);

  React.useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <Container maxWidth="xl">
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Typography variant="h4" sx={{ mb: 5 }}>
            Hi, Welcome 👋
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <AppWidgetSummary
            sx={{}}
            icon={<FaBoxOpen size={50} />}
            title="Products stored"
            total={productCount}
          />
        </Grid>
        <Grid item xs={3}>
          <AppWidgetSummary
            sx={{}}
            icon={<MdShelves size={50} />}
            title="Total Rack"
            total={rackCount}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
