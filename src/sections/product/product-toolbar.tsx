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
  handleNewSampleClick: () => void;
}

const ProductToolbar = ({ handleNewSampleClick }: ProductToolbarProps) => (
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
      <Button sx={{ marginX: 5 }} variant="contained" onClick={handleNewSampleClick}>
        New Product
      </Button>
    </Box>
  </GridToolbarContainer>
);

export default ProductToolbar;
