import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your-project-id',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false, // Set to false for real-time updates
})

export const imageBuilder = (source: any) => {
  return source.asset?._ref 
    ? `https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}/${source.asset._ref.replace(/^(image|file)-/, '').replace(/-\w+$/, '')}-${source.asset.hotspot?.width || 800}x${source.asset.hotspot?.height || 600}.jpg`
    : null
}
