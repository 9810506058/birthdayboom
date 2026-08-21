import { MemoryPhoto } from '../types';
import { NANI_GALLERY_FILES, naniPhoto } from './photos';

const FEATURED: MemoryPhoto[] = [
  {
    id: 'photo-1',
    title: 'The First Hello',
    caption: 'Shy smiles, wooden stairs, and the exact second my world got warmer.',
    date: 'Dec 17, 2023',
    location: 'Premier Cafe',
    category: 'romantic',
    image: naniPhoto('firstvet.jpeg'),
    aspect: 'tall',
    polaroidNote: 'First vet, first spark ☕',
    heartsCount: 242,
  },
  {
    id: 'photo-2',
    title: 'Heart Filter Chaos',
    caption: 'You with a crown of pink hearts, me half in the frame — still my favorite kind of selfie.',
    date: 'A silly day',
    location: 'Wherever you laughed',
    category: 'cute',
    image: naniPhoto('2nd.jpeg'),
    aspect: 'tall',
    polaroidNote: 'Certified cutie with extra hearts 💗',
    heartsCount: 188,
  },
  {
    id: 'photo-3',
    title: 'Sleepy On My Shoulder',
    caption: 'College dress, my sweatshirt, highway trees blurring past — you trusted me enough to rest.',
    date: 'Nov 19, 2024',
    location: 'Bhedetar Highway',
    category: 'travel',
    image: naniPhoto('WhatsApp Image 2026-08-18 at 5.39.03 PM (2).jpeg'),
    aspect: 'wide',
    polaroidNote: 'Safest place: right here 🥺',
    heartsCount: 310,
  },
];

const CATEGORIES: MemoryPhoto['category'][] = ['cute', 'romantic', 'date-night', 'travel'];
const ASPECTS: MemoryPhoto['aspect'][] = ['tall', 'square', 'wide', 'tall'];
const NOTES = [
  'A little piece of us 💞',
  'I keep this one close 🥹',
  'Proof you make ordinary days glow ✨',
  'My favorite view, always 🌸',
  'Saved this because I love you 💌',
  'Us being us 🫶',
];

const featuredFiles = new Set(FEATURED.map((p) => p.image));

const rest: MemoryPhoto[] = NANI_GALLERY_FILES.map((file, index) => {
  const image = naniPhoto(file);
  return { file, image, index };
})
  .filter((item) => !featuredFiles.has(item.image))
  .map((item, i) => ({
    id: `photo-${i + 4}`,
    title: `Moment ${i + 1} with You`,
    caption: 'One of the photos I never get tired of looking at. You, me, and a memory I want to keep forever.',
    date: 'Our story',
    location: 'With you',
    category: CATEGORIES[i % CATEGORIES.length],
    image: item.image,
    aspect: ASPECTS[i % ASPECTS.length],
    polaroidNote: NOTES[i % NOTES.length],
    heartsCount: 80 + ((i * 17) % 140),
  }));

export const MEMORIES_DATA: MemoryPhoto[] = [...FEATURED, ...rest];
