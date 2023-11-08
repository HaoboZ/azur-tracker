import { redirect, RedirectType } from 'next/navigation';

export default function Main() {
	redirect('/z', RedirectType.replace);
}
