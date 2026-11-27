import { createServer } from "node:http";
import { readFile } from "node:fs/promises";

const port = Number(process.env.PORT ?? 3000);
const pages = new Map([
    ["/", ["index.html", "text/html"]],
    ["/style.css", ["style.css", "text/css"]],
    ["/app.js", ["app.js", "text/javascript"]],
]);
createServer(async (request, response) => {
    const route = pages.get(request.url.split("?")[0]);
    if (!["GET", "HEAD"].includes(request.method)) {
        response.writeHead(405, { Allow: "GET, HEAD" }).end();
        return;
    }
    if (!route) {
        response.writeHead(404).end("Not found");
        return;
    }
    try {
        const body = await readFile(new URL(route[0], import.meta.url));
        response.writeHead(200, { "Content-Type": route[1] + "; charset=utf-8" });
        response.end(request.method === "HEAD" ? undefined : body);
    } catch {
        response.writeHead(500).end("Page unavailable");
    }
}).listen(port, "127.0.0.1", () => console.log(`http://127.0.0.1:${port}`));
