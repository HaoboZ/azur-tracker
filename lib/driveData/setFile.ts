import { drive_v3 } from 'googleapis';

export default async function setFile(
	drive: drive_v3.Drive,
	file: drive_v3.Schema$File,
	data: string
) {
	const modifiedTime = new Date().toISOString();
	try {
		const media = {
			mimeType: 'application/json',
			body:     data
		};
		
		if ( file?.id ) {
			await drive.files.update( {
				fileId:      file.id,
				media,
				requestBody: { modifiedTime }
			} as drive_v3.Params$Resource$Files$Update );
		} else {
			await drive.files.create( {
				resource: {
					name:    file.name,
					parents: [ 'appDataFolder' ],
					modifiedTime
				},
				media
			} as drive_v3.Params$Resource$Files$Create );
		}
	} catch ( e ) {
		throw e;
	}
	return modifiedTime;
};
