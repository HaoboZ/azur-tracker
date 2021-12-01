import { Link as MuiLink, LinkProps } from '@mui/material';
import NextLink from 'next/link';

export default function Link( { children, href, ...props }: LinkProps ) {
	return (
		<NextLink passHref href={href}>
			<MuiLink color='inherit' underline='hover' {...props}>
				{children}
			</MuiLink>
		</NextLink>
	);
}
