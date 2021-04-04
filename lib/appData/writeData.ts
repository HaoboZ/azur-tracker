import { drive_v3 } from 'googleapis';

export default async function writeData(
	drive: drive_v3.Drive,
	file: drive_v3.Schema$File,
	data: string
) {
	try {
		const media = {
			mimeType: 'application/json',
			body:     data
		};
		
		if ( file?.id ) {
			await drive.files.update( {
				fileId:      file.id,
				media,
				requestBody: {
					modifiedTime: new Date().toISOString()
				}
			} as drive_v3.Params$Resource$Files$Update );
		} else {
			await drive.files.create( {
				resource: {
					name:         file.name,
					parents:      [ 'appDataFolder' ],
					modifiedTime: new Date().toISOString()
				},
				media
			} as drive_v3.Params$Resource$Files$Create );
		}
	} catch ( e ) {
		throw e;
	}
};
