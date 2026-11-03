
<script setup lang="ts">
const { data, pending, error } = await useFetch('/api/blog')

useSeoMeta({
  title: 'Top 100 UK Fintech Companies by Total Fundraising',
  description:
    'Explore the top 100 UK fintech companies ranked by total fundraising, with funding statistics and company insights.',
  ogTitle: 'Top 100 UK Fintech Companies',
  ogDescription:
    'Discover the UK fintech companies leading in total fundraising.'
})

const formatMoney = (amount: number) => {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    maximumFractionDigits: 0
  }).format(amount)
}
</script>

<template>
  <main class="container">
    <p class="eyebrow">UK FINTECH LANDSCAPE</p>

    <h1>Top 100 UK Fintech Companies by Total Fundraising</h1>

    <p class="intro">
      Explore the UK's leading fintech companies ranked by total
      fundraising. Discover funding trends, company locations and
      the businesses shaping financial technology.
    </p>

    <p v-if="pending">Loading company data...</p>
    <p v-else-if="error">Unable to load company data. Please try again.</p>

    <template v-else-if="data">
      <section class="stats">
        <article class="stat-card">
          <h2>{{ data.totalCompanies }}</h2>
          <p>Total companies</p>
        </article>

        <article class="stat-card">
          <h2>{{ formatMoney(data.totalFunding) }}</h2>
          <p>Total funding</p>
        </article>

        <article class="stat-card">
          <h2>{{ formatMoney(data.averageFunding) }}</h2>
          <p>Average funding</p>
        </article>

        <article class="stat-card">
          <h2>{{ formatMoney(data.highestFunding) }}</h2>
          <p>Highest funding</p>
        </article>
      </section>

      <section class="insights">
        <h2>Key insights</h2>
        <p>
          London is home to
          <strong>{{ data.regions.London ?? 0 }} of the
          {{ data.totalCompanies }}</strong> companies in this ranking.
        </p>
        <p>
          The average company has raised
          <strong>{{ formatMoney(data.averageFunding) }}</strong>.
        </p>
      </section>

      <section>
        <h2>Company rankings</h2>
        <p class="table-description">
          All 100 companies ranked by total fundraising.
        </p>

        <div class="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Rank</th>
                <th>Company</th>
                <th>Region</th>
                <th>Stage</th>
                <th>Employees</th>
                <th>Total raised</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="company in data.companies" :key="company.rank">
                <td>{{ company.rank }}</td>
                <td>
                  <a
                    v-if="company.website"
                    :href="company.website"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {{ company.company }}
                  </a>
                  <span v-else>{{ company.company }}</span>
                </td>
                <td>{{ company.region }}</td>
                <td>{{ company.stage }}</td>
                <td>{{ company.employees }}</td>
                <td>{{ formatMoney(company.totalRaised) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </template>
  </main>
</template>

<style>
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  background: #f7f8fc;
  color: #20283a;
  font-family: Arial, sans-serif;
}

.container {
  max-width: 1150px;
  margin: 0 auto;
  padding: 48px 24px;
}

.eyebrow {
  color: #4263eb;
  font-size: 13px;
  font-weight: bold;
  letter-spacing: 1.5px;
}

h1 {
  max-width: 850px;
  font-size: clamp(30px, 5vw, 46px);
  line-height: 1.15;
  margin-bottom: 18px;
}

.intro {
  max-width: 760px;
  color: #667085;
  font-size: 17px;
  line-height: 1.7;
}

.stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 18px;
  margin: 36px 0;
}

.stat-card {
  background: white;
  border: 1px solid #e6e9f0;
  border-radius: 12px;
  padding: 22px;
}

.stat-card h2 {
  font-size: 25px;
  margin: 0 0 8px;
}

.stat-card p,
.table-description {
  color: #667085;
  margin: 0;
}

.insights {
  background: white;
  border: 1px solid #e6e9f0;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 36px;
  line-height: 1.7;
}

.table-wrapper {
  overflow-x: auto;
  background: white;
  border: 1px solid #e6e9f0;
  border-radius: 12px;
  margin-top: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
  min-width: 750px;
  text-align: left;
}

th,
td {
  padding: 15px 18px;
  border-bottom: 1px solid #e6e9f0;
  white-space: nowrap;
}

th {
  background: #f0f3f9;
  font-size: 13px;
}

td a {
  color: #3158c9;
  text-decoration: none;
  font-weight: 600;
}

td a:hover {
  text-decoration: underline;
}

@media (max-width: 750px) {
  .stats {
    grid-template-columns: repeat(2, 1fr);
  }

  .container {
    padding: 30px 16px;
  }
}
</style>
