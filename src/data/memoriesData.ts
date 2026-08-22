import { MemoryPhoto } from '../types';
import { NANI_GALLERY_FILES, naniPhoto } from './photos';

const FEATURED: MemoryPhoto[] = [
  {
    id: 'video-1',
    title: 'It was my favorite video',
    caption: 'Hajur saga hasdai hjr ko kapal milaudai',
    date: 'Dec 2024',
    location: 'k2',
    category: 'video',
    mediaType: 'video',
 image: "images/nani/nanihehe.jpeg",
    videoUrl: 'images/nani/us.mp4',
    aspect: 'tall',
    polaroidNote: 'Pure joy on camera 🎥❤️',
    heartsCount: 520,
  },
  {
    id: 'video-2',
    title: 'Sweet Birthday Memories Reel 🎞️',
    caption: 'Watching your eyes light up with happiness. I could replay this video a million times and never get bored.',
    date: 'Special Day',
    location: 'Everywhere with You',
    category: 'video',
    mediaType: 'video',
    image: "images/nani/reelphoto.jpeg",
    videoUrl: 'images/nani/usone.mp4',
    aspect: 'tall',
    polaroidNote: 'Forever my favorite reel ✨',
    heartsCount: 480,
  },
  {
    id: 'photo-1',
    title: 'The First Hello',
    caption: 'Shy smiles, wooden stairs, and the exact second my world got warmer.',
    date: 'Dec 17, 2023',
    location: 'Premier Cafe',
    category: 'video',
    mediaType: 'video',
    image: naniPhoto('firstvet.jpeg'),
     videoUrl: 'images/nani/firstvet.mp4',
    aspect: 'tall',
    polaroidNote: 'First vet, first spark ☕',
    heartsCount: 242,
  },
  {
    id: 'photo-2',
    title: 'Heart Filter Chaos',
    caption: 'You with a crown of pink hearts, me half in the frame — still my favorite kind of selfie.',
    date: 'A silly day',
    category: 'video',
    mediaType: 'video',
    image: naniPhoto('duet.jpeg'),
    videoUrl: 'images/nani/duet.mp4',
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
   {
    id: 'photo-3',
    title: 'your looks',
  caption:"tmro tyo nasalu herai",
    date: 'birsey hau date nai',
    location: 'balgram ko plotting',
    category: 'travel',
    image: naniPhoto('2nd.jpeg'),
    aspect: 'wide',
    polaroidNote: 'Your eyes are adorable 🥺',
    heartsCount: 310,
  },
];

const CATEGORIES: MemoryPhoto['category'][] = ['cute', 'romantic', 'date-night', 'travel'];
const ASPECTS: MemoryPhoto['aspect'][] = ['tall', 'square', 'wide', 'tall'];

const featuredFiles = new Set(FEATURED.map((p) => p.image));

const rest: MemoryPhoto[] = NANI_GALLERY_FILES.map((file, index) => {
  const image = naniPhoto(file);
  return { file, image, index };
})
  .filter((item) => !featuredFiles.has(item.image))
  .map((item, i) => ({
    id: `photo-${i + 3}`,
    caption: 'One of the photos I never get tired of looking at. You, me, and a memory I want to keep forever.',
    date: 'Our story',
    location: 'With you',
    category: CATEGORIES[i % CATEGORIES.length],
    image: item.image,
    aspect: ASPECTS[i % ASPECTS.length],
    heartsCount: 80 + ((i * 17) % 140),
  }));

export const MEMORIES_DATA: MemoryPhoto[] = [...FEATURED, ...rest];
