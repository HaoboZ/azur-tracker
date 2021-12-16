import { Tooltip, TooltipProps, Typography, TypographyProps } from '@mui/material';
import { useRef, useState } from 'react';
import useEventEffect from '../lib/hooks/useEventEffect';

export default function OverflowTypography( { tooltipProps, ...props }: {
	tooltipProps: TooltipProps
} & TypographyProps ) {
	const contentRef = useRef<HTMLElement>();
	
	const [ overFlowed, setOverFlowed ] = useState( false );
	
	useEventEffect( window, 'resize', () => {
		if ( !contentRef.current ) return;
		setOverFlowed( contentRef.current.scrollWidth > contentRef.current.clientWidth );
	}, [ contentRef.current ], true );
	
	return (
		<Tooltip arrow title={props.children} disableHoverListener={!overFlowed} {...tooltipProps}>
			<Typography
				ref={contentRef}
				{...props}
				sx={{
					whiteSpace  : 'nowrap',
					overflow    : 'hidden',
					textOverflow: 'ellipsis',
					...props.sx
				}}
			/>
		</Tooltip>
	);
}
