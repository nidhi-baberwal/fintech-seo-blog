import Papa from 'papaparse'

export default defineEventHandler(async (event) => {
  const formData = await readMultipartFormData(event)

  const file = formData?.find(
    (item) => item.name === 'file'
  )

  if (!file?.data) {
    throw createError({
      statusCode: 400,
      statusMessage: 'CSV file is required'
    })
  }

  const csvText = file.data.toString('utf-8')

  const result = Papa.parse<Record<string, string>>(csvText, {
    header: true,
    skipEmptyLines: true
  })

  if (result.errors.length > 0) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Could not read the CSV file'
    })
  }

  const rows = result.data.filter((row) =>
    Object.values(row).some((value) => value?.trim())
  )

  return {
    success: true,
    filename: file.filename,
    rowCount: rows.length,
    columns: result.meta.fields ?? [],
    rows: rows.slice(0, 100)
  }
})