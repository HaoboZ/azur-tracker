import { google } from 'googleapis';

export default new google.auth.OAuth2(
	process.env.GOOGLE_CLIENT_ID,
	process.env.GOOGLE_CLIENT_SECRET,
	`${process.env.GOOGLE_CLIENT_REDIRECT_URI}/api/auth/callback`
);
