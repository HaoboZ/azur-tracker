import { getDBData } from '@/app/api/dbData';
import { decompressFromUTF16 } from 'lz-string';
import { Cookies } from 'react-cookie';
import { mapValues } from 'remeda';
import { importBackup } from '../../store/reducers/mainReducer';

export default async function loadStore(dispatch) {
	const { main, ...others } = await getDBData();
	dispatch(
		importBackup({
			main,
			...mapValues(others, (value) => JSON.parse(decompressFromUTF16(value))),
		}),
	);
	const cookies = new Cookies();
	Object.entries(main).map(([key, value]) => cookies.set(`timestamp.${key}`, value));
}
