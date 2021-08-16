import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

const GOOGLE_AUTHORIZATION_URL = `https://accounts.google.com/o/oauth2/v2/auth?${
	new URLSearchParams( {
		prompt       : 'consent',
		access_type  : 'offline',
		response_type: 'code'
	} )}`;

// noinspection JSUnusedGlobalSymbols
export default NextAuth( {
	providers: [
		Providers.Google( {
			clientId        : process.env.GOOGLE_ID,
			clientSecret    : process.env.GOOGLE_SECRET,
			authorizationUrl: GOOGLE_AUTHORIZATION_URL,
			scope           : [
				'https://www.googleapis.com/auth/userinfo.profile',
				'https://www.googleapis.com/auth/userinfo.email',
				'https://www.googleapis.com/auth/drive.appdata'
			].join( ' ' )
		} )
	],
	callbacks: {
		async jwt( token, user, account ) {
			// Initial sign in
			if ( account && user ) {
				return {
					accessToken : account.accessToken,
					refreshToken: account.refresh_token,
					...user
				};
			}
			return token;
		}
	},
	secret   : process.env.SECRET
} );
