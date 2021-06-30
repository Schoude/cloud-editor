import { createFile, deleteFile, getFile, getFiles } from './handlers.ts';
import { Application } from 'https://deno.land/x/abc@v1.3.3/mod.ts';
import {
  HttpMethod,
  Header,
} from 'https://deno.land/x/abc@v1.3.3/constants.ts';
import {
  CORSConfig,
  cors,
} from 'https://deno.land/x/abc@v1.3.3/middleware/cors.ts';
import { green, bold, blue } from 'https://deno.land/std@0.99.0/fmt/colors.ts';

console.info = (txt: string) =>
  console.log(`${blue(bold('[INFO]'))} ${green(txt)}`);

const app = new Application();

const corsConfig: CORSConfig = {
  allowOrigins: ['http://127.0.0.1:3000', 'http://localhost:3000'],
  allowMethods: [HttpMethod.Get, HttpMethod.Post, HttpMethod.Delete],
  allowHeaders: [Header.ContentType],
};

app
  .use(cors(corsConfig))
  .static('/', 'frontend')
  .static('/storage', 'storage')
  .file('/', 'frontend/index.html')
  // routes
  .post('/json', createFile)
  .get('/files', getFiles)
  .get('/file/:fileName', getFile)
  .delete('/file/:fileName', deleteFile)
  .start({ port: 1234 });

console.info('Server listening on http://127.0.0.1:1234');
