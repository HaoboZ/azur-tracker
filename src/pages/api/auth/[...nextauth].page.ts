import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

const GOOGLE_AUTHORIZATION_URL = 'https://accounts.google.com/o/oauth2/v2/auth';

// noinspection JSUnusedGlobalSymbols
export default NextAuth( {
	providers: [
		GoogleProvider( {
			clientId     : process.env.GOOGLE_ID,
			clientSecret : process.env.GOOGLE_SECRET,
			authorization: {
				url   : GOOGLE_AUTHORIZATION_URL,
				params: {
					prompt       : 'consent',
					access_type  : 'offline',
					response_type: 'code',
					scope        : [
						'https://www.googleapis.com/auth/userinfo.profile',
						'https://www.googleapis.com/auth/userinfo.email',
						'https://www.googleapis.com/auth/drive.appdata'
					].join( ' ' )
				}
			}
		} )
	],
	callbacks: {
		async jwt( { token, account, profile, user } ) {
			console.log( token, account, profile, user );
			// initial sign in
			if ( account && profile ) {
				return {
					accessToken : account.access_token,
					refreshToken: account.refresh_token,
					...profile
				};
			}
			return token;
		}
	},
	secret   : process.env.SECRET
} );
