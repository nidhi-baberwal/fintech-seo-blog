# AI-Powered SEO Blog Generator

A reusable Nuxt application that generates SEO-friendly blog content from uploaded CSV datasets using Google's Gemini AI.

## Live Demo

[View Live Website](https://fintech-seo-blog.vercel.app/)

## Features

- Upload CSV files and preview the uploaded data.
- Parse CSV files using PapaParse.
- Generate SEO-friendly blog content using Google Gemini AI.
- Automatically generate blog titles, meta descriptions, introductions, headings and insights.
- Calculate statistics such as total companies, total funding, average funding and highest funding.
- Display uploaded dataset information in a dynamic ranking table.
- Reuse the same blog template for different datasets, such as fintech and healthtech.
- Server-side rendering (SSR) for improved SEO.
- Responsive layout with horizontal scrolling for wide tables.

## Tech Stack

- Nuxt 4
- Vue 3
- TypeScript
- Google Gemini AI
- PapaParse
- CSS

## Getting Started

### 1. Clone the repository

bash
git clone https://github.com/nidhi-baberwal


### 2. Navigate to the project folder

bash
cd fintech-seo-blog


### 3. Install dependencies

bash
npm install


### 4. Configure environment variables

Create a `.env` file in the project root and add your Gemini API key:

```env
GEMINI_API_KEY=your_gemini_api_key
```



### 5. Run the development server

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

## How It Works

1. Open the upload page.
2. Select a CSV file.
3. The application parses the CSV and displays a preview.
4. The dataset is sent to the Gemini AI API to generate blog content.
5. The generated content and dataset are saved locally.
6. The application displays the generated blog using a reusable template.
7. Statistics and the ranking table are calculated from the uploaded dataset.

## Project Structure

```text
fintech-seo-blog/
├── app/
│   └── pages/
│       ├── index.vue
│       ├── upload.vue
│       └── blog.vue
├── server/
│   └── api/
│       ├── blog.get.ts
│       ├── upload.post.ts
│       ├── generate.post.ts
│       └── generated-blog.get.ts
├── data/
│   └── fintech_companies_seed.csv
├── .env
├── .gitignore
├── nuxt.config.ts
└── package.json
```

## Notes

- A valid Google Gemini API key is required for AI content generation.
- Generated blog data is currently stored locally in `.data/generated-blog.json`.
- For production deployment, persistent storage should be configured because serverless hosting platforms may not retain local file changes.

## Future Improvements

- Add persistent database or cloud storage.
- Support multiple generated blog pages.
- Improve CSV validation and error handling.
- Add more SEO and content customisation options.