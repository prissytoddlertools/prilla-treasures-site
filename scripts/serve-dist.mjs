import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';

const port = Number(process.env.PORT ?? 4322);
const home = await readFile(new URL('../dist/index.html', import.meta.url));

const server = createServer((request, response) => {
  if (request.url !== '/') {
    response.writeHead(404, { 'Content-Type': 'text/plain' });
    response.end('Not found');
    return;
  }

  response.writeHead(200, {
    'Content-Type': 'text/html; charset=utf-8',
    'Cache-Control': 'public, max-age=60',
  });
  response.end(home);
});

server.listen(port, '127.0.0.1', () => {
  console.log(`Static test server ready at http://127.0.0.1:${port}`);
});
