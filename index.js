import fs from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const imagesPath = join(__dirname, './img');

export const getGachaImage = () => {
    const files = fs.readdirSync(imagesPath);
    const randomFile = files[Math.floor(Math.random() * files.length)];
    return join(imagesPath, randomFile);
};

export const allImages = fs.readdirSync(imagesPath);