import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

const GOOGLE_AUTHORIZATION_URL = `https://accounts.google.com/o/oauth2/v2/auth?${
	new URLSearchParams( {
		prompt       : 'consent',
		access_type  : 'offline',
		response_type: 'code'
	} )}`;

// noinspection JSUnusedGlobalSymbols
export default NextAuth( {
	providers: [
		GoogleProvider( {
			clientId     : process.env.GOOGLE_ID,
			clientSecret : process.env.GOOGLE_SECRET,
			authorization: {
				url   : GOOGLE_AUTHORIZATION_URL,
				params: {
					scope: [
						'https://www.googleapis.com/auth/userinfo.profile',
						'https://www.googleapis.com/auth/userinfo.email',
						'https://www.googleapis.com/auth/drive.appdata'
					].join( ' ' )
				}
			}
		} )
	],
	callbacks: {
		async jwt( { token, user, account } ) {
			// initial sign in
			if ( account && user ) {
				return {
					accessToken : account.access_token,
					refreshToken: account.refresh_token,
					...user
				};
			}
			return token;
		}
	},
	secret   : process.env.SECRET
} );
