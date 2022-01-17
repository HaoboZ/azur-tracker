import { useWideMedia } from '../../../hooks/useWideMedia';
import BottomBar from './bottomBar';
import TitleBar from './titleBar';

export default function Navigation( { children } ) {
	if ( useWideMedia() ) {
		return <TitleBar>{children}</TitleBar>;
	} else {
		return <BottomBar>{children}</BottomBar>;
	}
}
