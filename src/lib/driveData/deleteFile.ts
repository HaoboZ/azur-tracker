import { drive_v3 } from 'googleapis';

export default async function deleteFile( drive: drive_v3.Drive, file: drive_v3.Schema$File ) {
	await drive.files.delete( {
		fileId: file?.id
	} as drive_v3.Params$Resource$Files$Delete );
}
