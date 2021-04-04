import { drive_v3 } from 'googleapis';

export default async function getData( drive: drive_v3.Drive, file: drive_v3.Schema$File ) {
	if ( !file.id ) return null;
	try {
		const { data } = await drive.files.get( {
			fileId: file.id,
			alt:    'media'
		} as drive_v3.Params$Resource$Files$Get );
		return data as any;
	} catch ( e ) {
		throw e;
	}
};
