import { Tooltip, TooltipProps, Typography, TypographyProps } from '@mui/material';
import { useEffect, useRef, useState } from 'react';

export default function OverflowTypography( { children, tooltipProps, ...props }: {
	tooltipProps: TooltipProps
} & TypographyProps ) {
	const contentRef = useRef<HTMLElement>();
	
	const [ overFlowed, setOverFlowed ] = useState( false );
	
	useEffect( () => {
		const checkOverflow = () => setOverFlowed( contentRef.current.scrollWidth > contentRef.current.clientWidth );
		checkOverflow();
		window.addEventListener( 'resize', checkOverflow );
		return () => window.removeEventListener( 'resize', checkOverflow );
	}, [ contentRef.current ] );
	
	return <Tooltip title={children} disableHoverListener={!overFlowed} arrow {...tooltipProps}>
		<Typography
			ref={contentRef}
			{...props}
			sx={{
				whiteSpace  : 'nowrap',
				overflow    : 'hidden',
				textOverflow: 'ellipsis',
				...props.sx
			}}>
			{children}
		</Typography>
	</Tooltip>;
}
