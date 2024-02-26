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
  setPackageWeightDialog: React.Dispatch<React.SetStateAction<boolean>>;
}
const DestroyToolbar = ({ samples, setPackageWeightDialog }: DestroyToolbarProps) => {
  const hasSample = samples.length > 0;

  const buttonHandler = () => {
    setPackageWeightDialog(true);
  };
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <GridToolbarExport />
      <Button variant="contained" disabled={!hasSample} onClick={buttonHandler}>
        Destroy
      </Button>
    </GridToolbarContainer>
  );
};

export default DestroyToolbar;
