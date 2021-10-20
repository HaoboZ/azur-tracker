import { Link as MuiLink, LinkProps } from '@mui/material';
import NextLink from 'next/link';

export default function Link( { children, href, ...props }: LinkProps ) {
	return <NextLink href={href} passHref>
		<MuiLink color='inherit' underline='hover' {...props}>
			{children}
		</MuiLink>
	</NextLink>;
}
