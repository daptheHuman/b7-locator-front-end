import { Button } from '@mui/material';
import {
  GridToolbarExport,
  GridToolbarContainer,
  GridRowSelectionModel,
  GridToolbarFilterButton,
  GridToolbarColumnsButton,
  GridToolbarDensitySelector,
} from '@mui/x-data-grid';

interface DestroyToolbarProps {
  rowSelectionModel: GridRowSelectionModel;
}
const DestroyToolbar = ({ rowSelectionModel }: DestroyToolbarProps) => {
  const hasSelection = rowSelectionModel.length > 0;

  const handleDestroy = () => {};
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <GridToolbarExport />
      <Button variant="contained" disabled={!hasSelection} onClick={handleDestroy}>
        Destroy
      </Button>
    </GridToolbarContainer>
  );
};

export default DestroyToolbar;
