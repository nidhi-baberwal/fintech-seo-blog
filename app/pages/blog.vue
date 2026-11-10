<script setup lang="ts">
interface GeneratedBlog {
  rows: Record<string, string>[]
  columns: string[]
  content: {
    title: string
    metaDescription: string
    introduction: string
    headings: string[]
    insights: string[]
  }
  filename: string
}

// Fetch saved blog data from the server
const { data: blog, pending, error } = await useFetch<GeneratedBlog>(
  '/api/generated-blog'
)

const getFundingColumn = () => {
  if (!blog.value) return null

  return blog.value.columns.find(column =>
    /total raised|total funding|funding raised|amount raised|total investment|investment/i.test(column)
  ) ?? null
}

const getNumber = (value: string | undefined) => {
  return Number(value?.replace(/[^0-9.-]/g, '') || 0)
}

const statistics = computed(() => {
  if (!blog.value) return null

  const rows = blog.value.rows
  const fundingColumn = getFundingColumn()

  const fundingValues = fundingColumn
    ? rows.map(row => getNumber(row[fundingColumn]))
    : []

  const totalFunding = fundingValues.reduce(
    (sum, amount) => sum + amount,
    0
  )

  return {
    totalCompanies: rows.length,
    totalFunding,
    averageFunding: rows.length ? totalFunding / rows.length : 0,
    highestFunding: fundingValues.length
      ? Math.max(...fundingValues)
      : 0,
    fundingColumn
  }
})

const formatMoney = (amount: number) => {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    maximumFractionDigits: 0
  }).format(amount)
}

// Dynamic SEO metadata
useSeoMeta({
  title: () => blog.value?.content.title || 'Generated Industry Blog',
  description: () => blog.value?.content.metaDescription || ''
})
</script>

<template>
  <main class="container">

    <template v-if="blog && statistics">

      <p class="eyebrow">AI-GENERATED INDUSTRY BLOG</p>

      <h1>{{ blog.content.title }}</h1>

      <p class="intro">
        {{ blog.content.introduction }}
      </p>

      <section class="stats">
        <article class="stat-card">
          <h2>{{ statistics.totalCompanies }}</h2>
          <p>Total companies</p>
        </article>

        <article class="stat-card">
          <h2>{{ formatMoney(statistics.totalFunding) }}</h2>
          <p>Total funding</p>
        </article>

        <article class="stat-card">
          <h2>{{ formatMoney(statistics.averageFunding) }}</h2>
          <p>Average funding</p>
        </article>

        <article class="stat-card">
          <h2>
            {{ statistics.fundingColumn
              ? formatMoney(statistics.highestFunding)
              : 'N/A' }}
          </h2>
          <p>Highest funding</p>
        </article>
      </section>

      <section class="insights">
        <h2>Key insights</h2>

        <ul>
          <li
            v-for="(insight, index) in blog.content.insights"
            :key="index"
          >
            {{ insight }}
          </li>
        </ul>
      </section>

      <section class="headings">
        <h2>Industry overview</h2>

        <article
          v-for="(heading, index) in blog.content.headings"
          :key="index"
        >
          <h3>{{ heading }}</h3>
        </article>
      </section>

      <section>
        <h2>Company rankings</h2>

        <p class="table-description">
          Dataset: {{ blog.filename }}
        </p>

        <div class="table-wrapper">
          <table>
            <thead>
              <tr>
                <th
                  v-for="column in blog.columns"
                  :key="column"
                >
                  {{ column }}
                </th>
              </tr>
            </thead>

            <tbody>
              <tr
                v-for="(row, index) in blog.rows"
                :key="index"
              >
                <td
                  v-for="column in blog.columns"
                  :key="column"
                >
                  {{ row[column] }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <p class="meta-description">
        <strong>Meta description:</strong>
        {{ blog.content.metaDescription }}
      </p>

    </template>

    <section v-else class="empty-state">
      <h1>No generated blog found</h1>
      <p>Please upload a CSV file to generate an industry blog.</p>
      <NuxtLink to="/upload">Go to CSV upload</NuxtLink>
    </section>

  </main>
</template>

<style scoped>
.container {
  max-width: 1150px;
  margin: auto;
  padding: 45px 24px;
  color: #20283a;
}

.eyebrow {
  color: #4263eb;
  font-size: 13px;
  font-weight: bold;
  letter-spacing: 1.5px;
}

h1 {
  font-size: clamp(30px, 5vw, 44px);
  line-height: 1.2;
}

.intro {
  max-width: 800px;
  color: #667085;
  font-size: 17px;
  line-height: 1.7;
}

.stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 18px;
  margin: 35px 0;
}

.stat-card,
.insights {
  background: white;
  border: 1px solid #e6e9f0;
  border-radius: 12px;
  padding: 22px;
}

.stat-card h2 {
  font-size: 24px;
  margin: 0 0 8px;
  overflow-wrap: anywhere;
}

.stat-card p {
  color: #667085;
}

.insights {
  margin-bottom: 35px;
  line-height: 1.8;
}

.headings {
  margin-bottom: 35px;
}

.headings article {
  padding: 10px 0;
  border-bottom: 1px solid #e6e9f0;
}


.table-wrapper {
  width: 100%;
  overflow-x: auto;
  margin-top: 20px;
  border: 1px solid #e6e9f0;
  border-radius: 12px;
  background: white;
}

table {
  width: 100%;
  min-width: 850px;
  border-collapse: collapse;
  text-align: left;
  table-layout: auto;
}

th,
td {
  padding: 14px;
  border-bottom: 1px solid #e6e9f0;
  border-right: 1px solid #e6e9f0;
  white-space: nowrap;
}

th {
  background: #f0f3f9;
  color: #20283a;
  font-weight: 600;
}

td {
  color: #344054;
}

tbody tr:nth-child(even) {
  background: #f9fafb;
}

@media (max-width: 600px) {
  .table-wrapper {
    width: 100%;
    overflow-x: auto;
  }

  table {
    min-width: 850px;
    font-size: 13px;
  }

  th,
  td {
    padding: 10px;
  }
}

.meta-description {
  margin-top: 30px;
  color: #667085;
  line-height: 1.7;
}

.empty-state {
  text-align: center;
  padding: 80px 20px;
}

.empty-state a {
  color: #3158c9;
}

@media (max-width: 750px) {
  .stats {
    grid-template-columns: repeat(2, 1fr);
  }

  .container {
    padding: 30px 16px;
  }
}

@media (max-width: 420px) {
  .stats {
    grid-template-columns: 1fr;
  }
}
</style>
