import { Link as MuiLink, LinkProps } from '@material-ui/core';
import NextLink from 'next/link';
import React from 'react';

export default function Link( { children, href, ...props }: LinkProps ) {
	return <NextLink href={href} passHref>
		<MuiLink
			variant='h6'
			color='inherit'
			underline='none'
			{...props}>
			{children}
		</MuiLink>
	</NextLink>;
}
