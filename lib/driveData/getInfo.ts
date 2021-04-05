import { drive_v3 } from 'googleapis';

export default async function getInfo( drive: drive_v3.Drive, name: string ): Promise<drive_v3.Schema$File>;
export default async function getInfo( drive: drive_v3.Drive ): Promise<drive_v3.Schema$File[]>;
export default async function getInfo( drive: drive_v3.Drive, name?: string ) {
	try {
		const { data: { files } } = await drive.files.list( {
			spaces: 'appDataFolder',
			q:      name && `name="${name}"`,
			fields: 'nextPageToken, files(id, name, md5Checksum, modifiedTime)'
		} as drive_v3.Params$Resource$Files$List );
		
		if ( !files.length ) return name ? { name } : [];
		return name ? files[ 0 ] : files;
	} catch ( e ) {
		throw e;
	}
};
