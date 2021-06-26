import { Application } from 'https://deno.land/x/abc@v1.3.3/mod.ts';
import {
  HttpMethod,
  Header,
} from 'https://deno.land/x/abc@v1.3.3/constants.ts';
import {
  CORSConfig,
  cors,
} from 'https://deno.land/x/abc@v1.3.3/middleware/cors.ts';

const app = new Application();

const config: CORSConfig = {
  allowOrigins: ['http://127.0.0.1:3000', 'http://localhost:3000'],
  allowMethods: [HttpMethod.Get, HttpMethod.Post, HttpMethod.Delete],
  allowHeaders: [Header.ContentType],
};
app.use(cors(config));

console.log('http://127.0.0.1:8080');

app
  .static('/', 'frontend')
  .static('/storage', 'storage')
  .file('/', 'frontend/index.html')
  .start({ port: 8080 });

app.post('/json', async (c) => {
  const body = (await c.body) as { fileName: string; file: string };
  const fileName = `${body.fileName}.json`;
  try {
    await Deno.writeTextFile(`storage/${fileName}`, JSON.stringify(body.file));

    console.log('Written to ' + `storage/${fileName}`);
  } catch (e) {
    return e.message;
  }
});

app.get('/files', async (c) => {
  const files: string[] = [];

  for await (const dirEntry of Deno.readDir('./storage')) {
    files.push(dirEntry.name.replace(/.json/, ''));
  }
  c.response.status = 200;
  c.response.body = JSON.stringify(files);
});

app.get('/file/:fileName', async (c) => {
  const fileName = c.params.fileName.replaceAll('%20', ' ');
  const text = await Deno.readTextFile(`storage/${fileName}.json`);
  const payload = { fileName, contents: text };

  c.response.status = 200;
  c.response.body = JSON.stringify(payload);
});

app.delete('/file/:fileName', async (c) => {
  const fileName = c.params.fileName.replaceAll('%20', ' ');
  try {
    await Deno.remove(`storage/${fileName}.json`);
    c.response.status = 200;
  } catch (error) {
    c.response.status = 500;
  }
});
