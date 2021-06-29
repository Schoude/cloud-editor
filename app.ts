import { Application } from 'https://deno.land/x/abc@v1.3.3/mod.ts';
import {
  HttpMethod,
  Header,
} from 'https://deno.land/x/abc@v1.3.3/constants.ts';
import {
  CORSConfig,
  cors,
} from 'https://deno.land/x/abc@v1.3.3/middleware/cors.ts';
import { ensureDir } from 'https://deno.land/std@0.99.0/fs/mod.ts';
import { green, bold, blue } from 'https://deno.land/std@0.99.0/fmt/colors.ts';

console.info = (txt: string) =>
  console.log(`${blue(bold('[INFO]'))} ${green(txt)}`);

const app = new Application();

const config: CORSConfig = {
  allowOrigins: ['http://127.0.0.1:3000', 'http://localhost:3000'],
  allowMethods: [HttpMethod.Get, HttpMethod.Post, HttpMethod.Delete],
  allowHeaders: [Header.ContentType],
};
app.use(cors(config));

console.info('Server listening on http://127.0.0.1:1234');

app
  .static('/', 'frontend')
  .static('/storage', 'storage')
  .file('/', 'frontend/index.html')
  .start({ port: 1234 });

app.post('/json', async (c) => {
  await ensureDir('./storage');

  const body = (await c.body) as { fileName: string; file: string };
  const fileName = `${body.fileName}.json`;
  try {
    await Deno.writeTextFile(`storage/${fileName}`, JSON.stringify(body.file));

    console.info('File written to ' + `storage/${fileName}`);
  } catch (e) {
    return e.message;
  }
});

app.get('/files', async (c) => {
  await ensureDir('./storage');

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
