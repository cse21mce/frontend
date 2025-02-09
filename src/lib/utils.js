import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { formatDistance } from 'date-fns'



export const languages = [
  { "value": "english", "label": "English" },
  { "value": "hindi", "label": "हिन्दी" },
  { "value": "urdu", "label": "اردو" },
  // { "value": "punjabi", "label": "ਪੰਜਾਬੀ" },
  { "value": "gujrati", "label": "ગુજરાતી" },
  { "value": "marathi", "label": "मराठी" },
  { "value": "telugu", "label": "తెలుగు" },
  { "value": "kannada", "label": "ಕನ್ನಡ" },
  { "value": "malayalam", "label": "മലയാളം" },
  { "value": "tamil", "label": "தமிழ்" },
  // { "value": "odia", "label": "ଓଡ଼ିଆ" },
  { "value": "bengali", "label": "বাংলা" },
  // { "value": "assamese", "label": "অসমীয়া" },
  // { "value": "manipuri_meitei", "label": "মৈতৈ" }
]

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}
// Encode a string for use in a URL
export const encodeURL = (text) => encodeURIComponent(text).replace(/%20/g, '+');

// Decode a URL-encoded string
export const decodeURL = (url) => decodeURIComponent(url).replace(/\+/g, ' ');

export const parseDatePosted = (datePostedStr) => {

  const datePosted = new Date(datePostedStr);

  return formatDistance(datePosted, new Date(), { addSuffix: true });
};