import { TimelineEvent } from '../types';
import { NANI_GALLERY_FILES, PHOTOS } from './photos';

export const TIMELINE_DATA: TimelineEvent[] = [
  {
    id: 'timeline-1',
    number: '01',
    title: 'The Spark & First Hello',
    date: 'December 17, 2023',
    tag: 'The Beginning',
    caption: 'When two strangers crossed paths and everything shifted.',
    description:
      'I remember exactly what you were wearing and you are too shy hajur le menu le mukh chopnu vayeko teyo😂.',
    image: PHOTOS.firstMeet,
    location: 'Premier cafe',
    accentEmoji: '☕',
  },
  
  {
    id: 'timeline-3',
    number: '03',
    title: 'Our First Road Trip & Rainy Day',
    date: 'November 19, 2024',
    tag: 'Adventure',
    caption: 'Me and You Look this photo AWWW🥺',
    description:
      ' First time hami katai travelled gardai thim hjr college dress mai hununtho ani mero sweetshirt 😂',
    image: PHOTOS.roadTripNap,
    location: 'Bhedetar Highway',
    accentEmoji: '🌧️',
  },
  {
    id: 'timeline-4',
    number: '04',
    title: 'Look how happy we are 😂',
    date: 'November 19, 2024',
    tag: 'Happy Happy',
    caption: 'Hajur saga huda ta arkai khusi aauxa🥺.',
    description:
      'Hajur saga huda ta arkai khusi aauxa🥺.',
    image: '/images/nani/WhatsApp Image 2026-08-18 at 5.39.03 PM (1).jpeg',
    location: 'Bhedetar Highway',
    accentEmoji: '🥞',
  },
  {
    id: 'timeline-5',
    number: '05',
    title: 'Today, Tomorrow, and Always ❤️',
    date: 'Present Day',
    tag: 'Our Ongoing Chapter',
    caption: 'Still my favorite notification, best friend, and love.',
    description:
      'Every single day with you feels like a quiet blessing. Thank you for making my everyday life feel so warm, safe, exciting, and full of gentle magic.',
    image:'images/nani/WhatsApp Image 2026-08-18 at 5.29.06 PM.jpeg',
    location: 'Everywhere With You',
    accentEmoji: '💖',
  },
];
