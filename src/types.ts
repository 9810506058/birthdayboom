export interface SiteConfig {
  myName: string;
  herName: string;
  specialDate: string; // YYYY-MM-DD format for matching or date picker
  specialDateFormatted: string;
  specialDateHint: string;
  birthdayDate: string;
  anniversaryDate: string;
  relationshipStartDate: string;
  heroHeadline: string;
  heroSubheadline: string;
  mainBirthdayMessage: string;
  secretFinalMessage: string;
  finalSurpriseLines: string[];
  themeColors: {
    accent: string;
    pinkGlow: string;
  };
}

export interface TimelineEvent {
  id: string;
  number: string;
  title: string;
  date: string;
  caption: string;
  description: string;
  tag: string;
  image: string;
  location?: string;
  accentEmoji?: string;
}

export interface MemoryPhoto {
  id: string;
  title: string;
  caption: string;
  date: string;
  location?: string;
  category: 'romantic' | 'travel' | 'date-night' | 'cute' | 'all' | 'video';
  image: string;
  mediaType?: 'photo' | 'video';
  videoUrl?: string;
  poster?: string;
  aspect?: 'tall' | 'wide' | 'square';
  polaroidNote?: string;
  heartsCount?: number;
}

export interface FunnyMoment {
  id: string;
  title: string;
  category: 'unserious' | 'fail' | 'meme' | 'inside-joke';
  story: string;
  caption: string;
  image: string;
  punchline: string;
  soundEffect?: string;
}

export interface LoveLetter {
  id: string;
  envelopeTitle: string;
  icon: string;
  previewSnippet: string;
  date: string;
  salutation: string;
  body: string[];
  closing: string;
  signature: string;
  postscript?: string;
}

export interface ReasonLove {
  id: number;
  number: string;
  title: string;
  description: string;
  iconName: string;
  tag: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  choiceA: string;
  choiceB: string;
  correctChoice: 'A' | 'B';
  explanation: string;
  reactionA: string;
  reactionB: string;
}

export interface FlipCardItem {
  id: string;
  frontIcon: string;
  frontBadge: string;
  frontTitle: string;
  backDate: string;
  backMemory: string;
  backQuote: string;
}

export interface BucketListItem {
  id: string;
  title: string;
  category: 'travel' | 'date' | 'milestone' | 'fun';
  icon: string;
  completed: boolean;
  notes?: string;
}

export interface SongTrack {
  id: string;
  title: string;
  artist: string;
  coverImage: string;
  duration: string;
  lyricsSnippet: string;
  personalNote: string;
  audioUrl?: string; // Optional external url or synthesized track
}
