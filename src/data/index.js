import fs from 'fs';
import path from 'path';

const DATA_DIRECTORY = './src/data';
const getData = (folderName) => {
    const folderPath = path.join(DATA_DIRECTORY, folderName);
    const infoPath = path.join(folderPath, 'info.json');

    // Verificar si el archivo info.json existe en la carpeta
    if (fs.existsSync(infoPath)) {
        // Leer el contenido del archivo info.json
        const data = fs.readFileSync(infoPath, 'utf8');
        try {
            return JSON.parse(data);
        } catch (error) {
            console.error(`Error parsing JSON in folder ${folderName}:`, error);
            return null;
        }
    } else {
        console.log(`No info.json found in folder ${folderName}`);
        return null;
    }
};
export  {
    getData
}
