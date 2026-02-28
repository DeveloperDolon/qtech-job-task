
import dotend from 'dotenv';
import path from 'path';

dotend.config({path: path.join((process.cwd(), '.env'))});

export default {
    DB_URL: process.env.DATABASE_URL ?? '',
}
