import fs from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dbPath = join(__dirname, './src/db');
const imgPath = join(__dirname, './img');

export const getFullGacha = async () => {
    const files = fs.readdirSync(dbPath).filter(f => f.endsWith('.js'));
    const randomFile = files[Math.floor(Math.random() * files.length)];
    
    const { default: data } = await import(`./src/db/${randomFile}`);
    
    return {
        ...data,
        fullPath: join(imgPath, data.file)
    };
};

export const getAllData = async () => {
    const files = fs.readdirSync(dbPath).filter(f => f.endsWith('.js'));
    return Promise.all(files.map(async (f) => {
        const { default: data } = await import(`./src/db/${f}`);
        return data;
    }));
};