
import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'

export default defineEventHandler(async () => {
  const filePath = resolve(
    process.cwd(),
    '.data/generated-blog.json'
  )

  try {
    const fileContent = await readFile(filePath, 'utf-8')

    return JSON.parse(fileContent)
  } catch (error) {
    throw createError({
      statusCode: 404,
      statusMessage: 'No generated blog found. Please upload a CSV first.'
    })
  }
})
