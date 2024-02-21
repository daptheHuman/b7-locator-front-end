import { Box, Button } from '@mui/material';
import {
  GridToolbarExport,
  GridToolbarContainer,
  GridToolbarQuickFilter,
  GridToolbarFilterButton,
  GridToolbarColumnsButton,
  GridToolbarDensitySelector,
} from '@mui/x-data-grid';

interface ReferencedToolbarProps {
  handleNewSampleClick: () => void;
}

const SampleToolbar = ({ handleNewSampleClick }: ReferencedToolbarProps) => (
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
      <Button sx={{ marginX: 2 }} variant="contained" onClick={handleNewSampleClick}>
        New Sample
      </Button>
    </Box>
  </GridToolbarContainer>
);

export default SampleToolbar;
