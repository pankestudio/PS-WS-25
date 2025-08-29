import { createClient } from '@sanity/client';
import type { SiteData } from '../types';

// The Sanity client is now imported as an ES module.
// This avoids race conditions with script tags and is the modern approach.
const client = createClient({
  // --- Configuration Updated ---
  // The correct project ID has been added.
  // The dataset has been updated to the one you specified.
  projectId: 'ncwupy17', 
  dataset: 'pankestudio-web', // CORRECTED: Was 'production'
  apiVersion: '2024-03-11', // Use a UTC date string for the API version
  useCdn: true, // `false` if you want to ensure fresh data on every request
  perspective: 'published', // BEST PRACTICE: Ensures only published content is fetched
});

// This GROQ query fetches all the different content types for your site in one request.
const groqQuery = `{
  "artistInfo": *[_type == "artistInfo"][0]{
    _id,
    name,
    statement,
    vision
  },
  "bookPages": *[_type == "bookPage"] | order(pageNumber asc){
    _id,
    pageNumber,
    "imageUrl": image.asset->url,
    title,
    description
  },
  "nextProject": *[_type == "projectShowcase"][0]{
    _id,
    title,
    description,
    "imageUrl": image.asset->url
  },
  "videoProject": *[_type == "videoProject"][0]{
    _id,
    "videoUrl": videoFile.asset->url,
    "posterUrl": posterImage.asset->url
  },
  "finalImage": *[_type == "finalImage"][0]{
    _id,
    "imageUrl": image.asset->url
  },
  "footerInfo": *[_type == "footerInfo"][0]{
    _id,
    copyright,
    email,
    socials
  },
  "projectsData": *[_type == "project"] | order(year desc){
    _id,
    title,
    year,
    "imageUrl": image.asset->url
  },
  "exhibitionsData": *[_type == "exhibition"] | order(date desc){
    _id,
    title,
    venue,
    date,
    type
  },
  "aboutInfo": *[_type == "about"][0]{
    _id,
    "imageUrl": image.asset->url,
    bio
  }
}`;

export const fetchAllData = async (): Promise<SiteData> => {
  try {
    const data = await client.fetch(groqQuery);
    return data;
  } catch (error) {
    console.error("Error fetching data from Sanity:", error);
    // In a real app, you might want to return a default/fallback state
    // or handle this error more gracefully in the UI.
    throw error;
  }
};
