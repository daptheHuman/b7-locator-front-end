import { Button } from '@mui/material';
import {
  GridToolbarExport,
  GridToolbarContainer,
  GridToolbarFilterButton,
  GridToolbarColumnsButton,
  GridToolbarDensitySelector,
} from '@mui/x-data-grid';

interface DestroyToolbarProps {
  samples: ReferencedSample[] | RetainedSample[];
  handleDestroy: () => void;
}
const DestroyToolbar = ({ samples, handleDestroy }: DestroyToolbarProps) => {
  const hasSample = samples.length > 0;

  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <GridToolbarExport />
      <Button variant="contained" disabled={!hasSample} onClick={handleDestroy}>
        Destroy
      </Button>
    </GridToolbarContainer>
  );
};

export default DestroyToolbar;
