import { Box, Tooltip } from '@mui/material';
import { GridEditInputCell, GridRenderEditCellParams } from '@mui/x-data-grid';

export const InputCellTooltip = (props: GridRenderEditCellParams) => {
  const { error, message } = props;

  return (
    <Tooltip open={!!error} title={message}>
      <Box>
        <GridEditInputCell {...props} />
      </Box>
    </Tooltip>
  );
};
