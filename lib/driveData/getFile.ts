import { drive_v3 } from 'googleapis';

export default async function getFile( drive: drive_v3.Drive, file: drive_v3.Schema$File ) {
	if ( !file.id ) return null;
	const { data } = await drive.files.get( {
		fileId: file.id,
		alt   : 'media'
	} as drive_v3.Params$Resource$Files$Get );
	return data;
}
