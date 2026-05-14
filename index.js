import fs from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dbPath = join(__dirname, './src/db');

export const getAnimeImage = async (name) => {
    const allData = await getAllData();
    const query = name.toLowerCase();
    
    return allData.filter(d => 
        (d.name && d.name.toLowerCase().includes(query)) || 
        (d.source && d.source.toLowerCase().includes(query))
    ); 
};

export const getAllData = async () => {
    if (!fs.existsSync(dbPath)) return [];
    const files = fs.readdirSync(dbPath).filter(f => f.endsWith('.js'));
    
    return Promise.all(files.map(async (f) => {
        const filePath = pathToFileURL(join(dbPath, f)).href;
        const { default: data } = await import(filePath);

        const baseUrl = 'https://raw.githubusercontent.com/Dev-FelixOfc/WimagesLib/main/img/';
        
        return {
            ...data,
            imageUrl: data.imageUrl || `${baseUrl}${data.file}`
        };
    }));
};

export const getFullGacha = async () => {
    const all = await getAllData();
    if (all.length === 0) return null;
    return all[Math.floor(Math.random() * all.length)];
};