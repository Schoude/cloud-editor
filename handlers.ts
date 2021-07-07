import { ensureDir, Context } from './deps.ts';

export async function getFiles(c: Context) {
  await ensureDir('./storage');

  const files: string[] = [];
  for await (const dirEntry of Deno.readDir('./storage')) {
    files.push(dirEntry.name.replace(/.json/, ''));
  }

  c.json(files, 200);
}

export async function getFile(c: Context) {
  const fileName = c.params.fileName.replaceAll('%20', ' ');
  const text = await Deno.readTextFile(`storage/${fileName}.json`);
  const payload = { fileName, contents: text };

  c.json(payload, 200);
}

export async function createFile(c: Context) {
  await ensureDir('./storage');

  const body = (await c.body) as { fileName: string; file: string };
  const fileName = `${body.fileName}.json`;
  try {
    await Deno.writeTextFile(`storage/${fileName}`, JSON.stringify(body.file));

    console.info('File written to ' + `storage/${fileName}`);
  } catch (error) {
    c.json(error, 500);
  }
}

export async function deleteFile(c: Context) {
  const fileName = c.params.fileName.replaceAll('%20', ' ');
  try {
    await Deno.remove(`storage/${fileName}.json`);
    c.response.status = 200;
  } catch (error) {
    c.json(error, 500);
  }
}
