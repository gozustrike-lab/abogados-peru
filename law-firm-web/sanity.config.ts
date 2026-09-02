import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './sanity/schemaTypes'

export const config = defineConfig({
  name: 'law-firm-cms',
  title: 'Law Firm CMS',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your-project-id',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  plugins: [structureTool()],
  schema: {
    types: schemaTypes,
  },
})
