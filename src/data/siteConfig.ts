import { SiteConfig } from '../types';

/**
 * =========================================================================
 * 💖 COUPLE'S MASTER CONFIGURATION FILE
 * =========================================================================
 * Customize all primary names, dates, messages and secrets right here!
 *
 * DATE FORMAT TIP:
 * Use 'YYYY-MM-DD' for specialDate (e.g., '2023-10-14' or '2024-02-14')
 * The secret login page checks against this exact date.
 */
export const SITE_CONFIG: SiteConfig = {
  myName: 'Prashant',
  herName: 'Sani Nani',
  
  // 🔐 The secret date needed to unlock the website (YYYY-MM-DD)
  // Default is October 14th (2023-10-14). You can change this to your special anniversary!
  specialDate: '2061-05-09',
  specialDateFormatted: '2061-05-09',
  specialDateHint: 'Hint: The Day Where my angel born',
  birthdayDate: 'August ',
  anniversaryDate: '2023-12-17',
  relationshipStartDate: '2023-12-17',
  
  // 🌟 Welcome Hero Page
  heroHeadline: 'Welcome to Our Little World ❤️',
  heroSubheadline: 'Made with love, memories, and way too many feelings.',
  
  // 🎂 Birthday Message
  mainBirthdayMessage:
    'Happy Birthday Maya ❤️🎂I hope this birthday brings you lots of happiness, beautiful memories, and everything you’ve been wishing for. 🥹❤️ I hope you always keep that beautiful smile on your face and never stop being the amazing person you are..',
  
  // 💌 Secret Message (Page 13)
  secretFinalMessage:
    'Out of all the places I could be, all the people I could meet, and all the stories I could live...\n\nI am happiest when our story is the one I am living.',
  
  // 🎬 Final Page 14 Animated Line-by-Line Tribute
  finalSurpriseLines: [
    'Thank you for being part of my life.',
    'Thank you for every laugh that made my stomach hurt.',
    'For every late-night, completely stupid conversation.',
    'For every quiet moment when neither of us had to say a word.',
    'For every beautiful memory we have tucked away.',
    'And for every little adventure still waiting ahead of us.',
    'I would choose you again. In every lifetime.',
  ],

  themeColors: {
    accent: '#f43f5e',
    pinkGlow: 'rgba(244, 63, 94, 0.4)',
  }
};
