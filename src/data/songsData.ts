import { SongTrack } from '../types';
import { PHOTOS } from './photos';

export const SONGS_DATA: SongTrack[] = [
  {
    id: 'song-1',
    title: 'Until I Found You',
    artist: 'Stephen Sanchez',
    coverImage: PHOTOS.roadTripNap,
    duration: '2:58',
    lyricsSnippet: '"Heaven when I held you again... how could we ever just be friends?"',
    personalNote: 'This was playing in the background during our first late-night car ride. Every time the chords start, I instantly picture you looking out the window with the city lights on your face.',
  },
  {
    id: 'song-2',
    title: 'Lover',
    artist: 'Taylor Swift',
    coverImage: PHOTOS.firstMeet,
    duration: '3:41',
    lyricsSnippet: '"Can I go where you go? Can we always be this close forever and ever?"',
    personalNote: 'Our kitchen slow-dance anthem. No matter what kind of day we had, this song always resets our energy into pure warmth.',
  },
  {
    id: 'song-3',
    title: 'Golden Hour',
    artist: 'JVKE',
    coverImage: PHOTOS.polaroidA,
    duration: '3:29',
    lyricsSnippet: '"It\'s your world and I\'m just in it... ain\'t no way you\'re not a blessing."',
    personalNote: 'You in the passenger seat with the golden sunset shining in your hair. Still the prettiest scene I have ever witnessed.',
  }
];
