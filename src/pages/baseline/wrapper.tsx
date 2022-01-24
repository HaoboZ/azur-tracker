import Navigation from './navigation';

export default function Wrapper( { children } ) {
	return (
		<Navigation>
			{children}
		</Navigation>
	);
}
