import fs from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dbPath = join(__dirname, './src/db');
const imgPath = join(__dirname, './img');

export const getAnimeImage = async (name) => {
    const allData = await getAllData();
    const result = allData.filter(d => 
        (d.name && d.name.toLowerCase().includes(name.toLowerCase())) || 
        (d.anime && d.anime.toLowerCase().includes(name.toLowerCase()))
    );
    return result; 
};

export const getAllData = async () => {
    if (!fs.existsSync(dbPath)) return [];
    const files = fs.readdirSync(dbPath).filter(f => f.endsWith('.js'));
    
    return Promise.all(files.map(async (f) => {
        const filePath = pathToFileURL(join(dbPath, f)).href;
        const { default: data } = await import(filePath);
        return {
            ...data,
            imageUrl: data.imageUrl || `https://raw.githubusercontent.com/Dev-FelixOfc/wimages-lib/main/img/${data.file}`
        };
    }));
};

export const getFullGacha = async () => {
    const all = await getAllData();
    if (all.length === 0) return null;
    return all[Math.floor(Math.random() * all.length)];
};