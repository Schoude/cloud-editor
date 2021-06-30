import {
  Application,
  HttpMethod,
  CORSConfig,
  cors,
  Header,
  green,
  bold,
  blue,
} from './deps.ts';
import { createFile, deleteFile, getFile, getFiles } from './handlers.ts';

const app = new Application();

const corsConfig: CORSConfig = {
  allowOrigins: [
    'http://127.0.0.1:3000',
    'http://localhost:3000',
    'http://localhost:1234',
  ],
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

console.info = (txt: string) =>
  console.log(`${blue(bold('[INFO]'))} ${green(txt)}`);

console.info('Server listening on http://127.0.0.1:1234');
