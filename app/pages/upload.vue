<script setup lang="ts">

const selectedFile = ref<File | null>(null)
const previewData = ref<Record<string, string>[]>([])
const columns = ref<string[]>([])
const errorMessage = ref('')

const handleFileChange = async (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]

  errorMessage.value = ''
  previewData.value = []
  columns.value = []

  if (!file) {
    selectedFile.value = null
    return
  }

  if (!file.name.toLowerCase().endsWith('.csv')) {
    errorMessage.value = 'Please select a CSV file.'
    selectedFile.value = null
    return
  }

  selectedFile.value = file

  const formData = new FormData()
  formData.append('file', file)

  try {
    const response = await $fetch('/api/upload', {
      method: 'POST',
      body: formData
    })

    previewData.value = response.rows
    columns.value = response.columns
  } catch (error) {
    errorMessage.value = 'Could not upload the CSV file.'
    console.error(error)
  }
}
</script>

<template>
  <main class="upload-page">
    <section class="upload-card">
      <p class="eyebrow">SEO BLOG GENERATOR</p>

      <h1>Upload Your CSV</h1>

      <p class="intro">
        Upload a CSV file containing company data to generate an SEO-ready
        industry blog.
      </p>

      <label class="file-label">
        <span>Select CSV file</span>

        <input
          type="file"
          accept=".csv,text/csv"
          @change="handleFileChange"
        />
      </label>

      <p v-if="selectedFile" class="file-name">
        Selected: {{ selectedFile.name }}
      </p>

      <p v-if="errorMessage" class="error">
        {{ errorMessage }}
      </p>

      <div v-if="columns.length > 0" class="preview">
        <h2>CSV Preview</h2>

        <p>
          {{ columns.length }} columns found
        </p>

        <div class="table-wrapper">
          <table>
            <thead>
              <tr>
                <th
                  v-for="column in columns"
                  :key="column"
                >
                  {{ column }}
                </th>
              </tr>
            </thead>

            <tbody>
              <tr
                v-for="(row, index) in previewData"
                :key="index"
              >
                <td
                  v-for="column in columns"
                  :key="column"
                >
                  {{ row[column] }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.upload-page {
  min-height: 100vh;
  padding: 60px 20px;
  background: #f8fafc;
}

.upload-card {
  max-width: 1000px;
  margin: 0 auto;
  padding: 40px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.06);
}

.eyebrow {
  margin-bottom: 10px;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 1.5px;
  color: #64748b;
}

h1 {
  margin: 0;
  font-size: 38px;
  color: #0f172a;
}

.intro {
  max-width: 650px;
  margin: 15px 0 30px;
  color: #64748b;
  line-height: 1.6;
}

.file-label {
  display: inline-flex;
  align-items: center;
  padding: 12px 18px;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
}

.file-label input {
  display: none;
}

.file-name {
  margin-top: 15px;
  color: #334155;
}

.error {
  margin-top: 15px;
  color: #dc2626;
}

.preview {
  margin-top: 35px;
}

.preview h2 {
  margin-bottom: 8px;
}

.preview p {
  color: #64748b;
}

.table-wrapper {
  margin-top: 20px;
  overflow-x: auto;
}

table {
  width: 100%;
  min-width: 700px;
  border-collapse: collapse;
}

th,
td {
  padding: 12px;
  border-bottom: 1px solid #e2e8f0;
  text-align: left;
  white-space: nowrap;
}

th {
  background: #f1f5f9;
  font-weight: 700;
}

td {
  color: #475569;
}

@media (max-width: 600px) {
  .upload-card {
    padding: 25px 20px;
  }

  h1 {
    font-size: 30px;
  }
}
</style>
