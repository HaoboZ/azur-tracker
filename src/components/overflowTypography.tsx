import { Tooltip, TooltipProps, Typography, TypographyProps } from '@mui/material';
import { useRef, useState } from 'react';
import useEventEffect from '../lib/hooks/useEventEffect';

export default function OverflowTypography( { tooltipProps, ...props }: {
	tooltipProps?: TooltipProps
} & TypographyProps ) {
	const contentRef = useRef<HTMLElement>();
	
	const [ overFlowed, setOverFlowed ] = useState( false );
	
	useEventEffect( window, {
		name    : 'resize',
		listener: () => {
			if ( !contentRef.current ) return;
			setOverFlowed( contentRef.current.scrollWidth > contentRef.current.clientWidth );
		},
		callOnce: true
	}, [ contentRef.current ] );
	
	return (
		<Tooltip arrow title={props.children} disableHoverListener={!overFlowed} {...tooltipProps}>
			<Typography ref={contentRef} noWrap {...props}/>
		</Tooltip>
	);
}
