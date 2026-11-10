import Papa from 'papaparse'

export default defineEventHandler(async () => {
  const csvText = await useStorage('assets:server')
  .getItem<string>('fintech_companies_seed.csv')

if (!csvText) {
  throw createError({
    statusCode: 500,
    statusMessage: 'CSV file not found'
  })
}

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

  const companies = result.data.map((row) => ({
    rank: Number(row.Rank),
    company: row.Company,
    region: row.Region,
    stage: row.Stage,
    employees: row.Employees || 'Not provided',
    totalRaised: Number(
      row['Total Raised']?.replace(/[^0-9.]/g, '') || 0
    ),
    description: row.Description,
    website: row.Website,
    industries: row.Industries
  })).sort((a, b) => a.rank - b.rank)

  const totalFunding = companies.reduce(
    (total, company) => total + company.totalRaised,
    0
  )

  const regionCounts = companies.reduce<Record<string, number>>(
    (counts, company) => {
      counts[company.region] = (counts[company.region] || 0) + 1
      return counts
    },
    {}
  )

  return {
    title: 'Top 100 UK Fintech Companies by Total Fundraising',
    totalCompanies: companies.length,
    totalFunding,
    averageFunding: totalFunding / companies.length,
    highestFunding: Math.max(...companies.map(c => c.totalRaised)),
    regions: regionCounts,
    companies
  }
})
