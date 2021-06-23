import { google } from 'googleapis';

export const auth = new google.auth.OAuth2( process.env.NEXT_PUBLIC_GOOGLE_ID, process.env.GOOGLE_SECRET );
