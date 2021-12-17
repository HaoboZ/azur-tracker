import { Link as MuiLink, LinkProps as MuiLinkProps, styled, SxProps } from '@mui/material';
import clsx from 'clsx';
import { LinkProps as NextLinkProps } from 'next/dist/client/link';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { AnchorHTMLAttributes, forwardRef } from 'react';

const Anchor = styled( 'a' )( {} );

export type PageLinkComponentProps =
	NextLinkProps
	& { sx?: SxProps }
	& Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>;

export const PageLinkComponent = forwardRef<HTMLAnchorElement, PageLinkComponentProps>( function ( {
	href,
	as,
	replace,
	scroll,
	shallow,
	prefetch,
	locale,
	...props
}, ref ) {
	return (
		<NextLink
			passHref
			href={href}
			prefetch={prefetch}
			as={as}
			replace={replace}
			scroll={scroll}
			shallow={shallow}
			locale={locale}>
			<Anchor ref={ref} {...props}/>
		</NextLink>
	);
} );

export type PageLinkProps =
	{ activeClassName?: string }
	& PageLinkComponentProps
	& Omit<MuiLinkProps, 'href'>;

const PageLink = forwardRef<HTMLAnchorElement, PageLinkProps>( function ( {
	activeClassName = 'active',
	className: initialClassName,
	href,
	role,
	...props
}, ref ) {
	const router = useRouter();
	const pathname = typeof href === 'string' ? href : href.pathname;
	const className = clsx( initialClassName, {
		[ activeClassName ]: router.pathname === pathname && activeClassName
	} );
	
	const isExternal = typeof href === 'string' && ( href.indexOf( 'http' ) === 0 || href.indexOf( 'mailto:' ) === 0 );
	
	if ( isExternal ) return <MuiLink ref={ref} className={className} href={href} {...props}/>;
	
	return (
		<MuiLink
			ref={ref}
			component={PageLinkComponent}
			href={href}
			className={className}
			{...props}
		/>
	);
} );

export default PageLink;
