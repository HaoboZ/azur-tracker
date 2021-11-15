import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions: NextAuthOptions = {
	providers: [
		GoogleProvider( {
			clientId     : process.env.GOOGLE_ID,
			clientSecret : process.env.GOOGLE_SECRET,
			authorization: {
				url   : 'https://accounts.google.com/o/oauth2/v2/auth',
				params: {
					prompt       : 'consent',
					access_type  : 'offline',
					response_type: 'code',
					scope        : [
						'openid',
						'https://www.googleapis.com/auth/userinfo.email',
						'https://www.googleapis.com/auth/userinfo.profile',
						'https://www.googleapis.com/auth/drive.appdata'
					].join( ' ' )
				}
			}
		} )
	],
	callbacks: {
		async jwt( { token, account } ) {
			// initial sign in
			if ( account ) {
				return {
					...token,
					accessToken : account.access_token,
					refreshToken: account.refresh_token
				};
			}
			return token;
		}
	},
	secret   : process.env.SECRET
};
// noinspection JSUnusedGlobalSymbols
export default NextAuth( authOptions );
