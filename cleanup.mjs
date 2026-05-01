import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";


const __fileName = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__fileName);

const tempDir = path.join(__dirname, 'public', 'temp');
const now = Date.now();
const threeDays = 3 * 24 * 60 * 60 * 1000;

if(fs.existsSync(tempDir)){
    const files = fs.readdirSync(tempDir);

    files.forEach(file=>{
        const match = file.match(/temp_(\d+)_/);
        if(match && match[1]){
            const fileName =parseInt(match[1]);
            if(now - fileName > threeDays){
                try {
                    fs.unlinkSync(path.join(tempDir, file));
                console.log(`Deleted temp file: ${file}`);
                } catch (error) {
                    console.error(`Error deleting temp file: ${file}`, error.message);
                }
            }
        }
    })
}