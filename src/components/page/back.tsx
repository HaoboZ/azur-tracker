import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { Button, ButtonProps } from '@mui/material';
import { useRouter } from 'next/router';

export default function PageBack( { name, ...props }: { name?: string } & ButtonProps ) {
	const router = useRouter();
	
	return <Button
		startIcon={ <ArrowBackIcon/> }
		onClick={ () => router.back() }
		{ ...props }>{ name }</Button>;
}
