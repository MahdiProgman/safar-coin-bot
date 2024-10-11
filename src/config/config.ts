import dotenv from 'dotenv';

dotenv.config();

export const TG_TOKEN : string = process.env.TG_TOKEN as string;
export const TG_WEBHOOK : string = process.env.TG_WEBHOOK as string;
export const APP_DOMAIN : string = process.env.APP_DOMAIN as string;
export const PORT : string = process.env.PORT as string;