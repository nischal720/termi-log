import fs from "fs";

export default function createFileAdapter(path = "server.log") {
    return {
        write({ time, type, message }) {
            const line = `[${time}] [${type.toUpperCase()}]-> ${message}\n`;
            fs.appendFileSync(path, line);
        }
    };
}
