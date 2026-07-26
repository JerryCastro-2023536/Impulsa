import { IncomingMessage } from "http";

export async function ReadBody(req : IncomingMessage): Promise<string> {
    return new Promise((resolve, reject) =>{
        let body = "";
        req.on("data", (chunk) =>{
            body += chunk;
        });
        req.on("end", () =>{
            resolve(body);
        });
        req.on("error", reject);
    });
}