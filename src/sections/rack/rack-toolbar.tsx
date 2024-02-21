import { Box, Button } from '@mui/material';
import {
  GridToolbarExport,
  GridToolbarContainer,
  GridToolbarQuickFilter,
  GridToolbarFilterButton,
  GridToolbarColumnsButton,
  GridToolbarDensitySelector,
} from '@mui/x-data-grid';

interface ProductToolbarProps {
  handleNew: () => void;
}

const RackToolbar = ({ handleNew }: ProductToolbarProps) => (
  <GridToolbarContainer
    sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}
  >
    <Box>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <GridToolbarExport />
    </Box>

    <Box>
      <GridToolbarQuickFilter />
      <Button sx={{ marginX: 2 }} variant="contained" onClick={handleNew}>
        New Rack
      </Button>
    </Box>
  </GridToolbarContainer>
);

export default RackToolbar;
