import React from 'react';

import { Tooltip } from '@mui/material';
import { GridRenderCellParams } from '@mui/x-data-grid';

const RenderExpandableCell = (props: GridRenderCellParams) => {
  const [isOverflowed, setIsOverflow] = React.useState(false);
  const { value } = props;

  const textElementRef = React.useRef<HTMLSpanElement | null>(null);

  const checkOverflow = () => {
    // Using getBoundingClientRect, instead of scrollWidth and clientWidth, to get width with fractional accuracy
    const clientWidth = textElementRef.current!.getBoundingClientRect().width;

    textElementRef.current!.style.overflow = 'visible';
    const contentWidth = textElementRef.current!.getBoundingClientRect().width;
    textElementRef.current!.style.overflow = 'hidden';

    setIsOverflow(contentWidth > clientWidth);
  };

  React.useEffect(() => {
    checkOverflow();
    window.addEventListener('resize', checkOverflow);
    return () => {
      window.removeEventListener('resize', checkOverflow);
    };
  }, []);

  return (
    <Tooltip title={value} disableHoverListener={!isOverflowed}>
      <span
        ref={textElementRef}
        style={{
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        {value}
      </span>
    </Tooltip>
  );
};

export default RenderExpandableCell;
