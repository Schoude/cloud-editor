import { Application } from 'https://deno.land/x/abc@v1.3.3/mod.ts'
import {
  CORSConfig,
  cors,
} from 'https://deno.land/x/abc@v1.3.3/middleware/cors.ts'
// import { HttpMethod } from 'https://deno.land/x/abc@v1.3.3/constants.ts'

const app = new Application()

const config: CORSConfig = {
  allowOrigins: ['http://127.0.0.1:3000'],
}
app.use(cors(config))

console.log('http://127.0.0.1:8080/')

app
  .static('/', 'frontend')
  .static('/storage', 'storage')
  .file('/', 'frontend/index.html')
  .start({ port: 8080 })

app.post('/json', async c => {
  const body = await c.body

  try {
    await Deno.writeTextFile('./storage/my-file.json', JSON.stringify(body))

    console.log('Written to ' + 'storage/my-file.json')
  } catch (e) {
    return e.message
  }
})

app.get('/files', async c => {
  const files: string[] = []

  for await (const dirEntry of Deno.readDir('./storage')) {
    files.push(dirEntry.name)
  }
  c.response.status = 200
  c.response.body = JSON.stringify(files)
})
