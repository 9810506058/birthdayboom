export interface BirthdayCard {
  id: number;
  cardNumber: string;
  themeColor: string;
  accentBg: string;
  icon: string;
  envelopeTitle: string;
  teaser: string;
  sweetMessage: string;
  subNote: string;
  emojiReaction: string;
}

export const SPECIAL_BIRTHDAY_CARDS: BirthdayCard[] = [
  {
    id: 1,
    cardNumber: '01',
    themeColor: 'from-pink-400 to-rose-500',
    accentBg: 'bg-rose-50 dark:bg-rose-950/40',
    icon: '✨',
    envelopeTitle: 'Smile Check',
    teaser: 'Tap to unwrap a little truth...',
    sweetMessage: 'Did you know your smile is literally my favorite view in this entire world? Every time you laugh, my whole day gets 1000x brighter.',
    subNote: 'Please keep smiling like that forever, birthday girl. 💖',
    emojiReaction: '🥰',
  },
  {
    id: 2,
    cardNumber: '02',
    themeColor: 'from-amber-400 to-pink-500',
    accentBg: 'bg-amber-50 dark:bg-amber-950/40',
    icon: '👑',
    envelopeTitle: 'The Real Royalty',
    teaser: 'A secret only I know...',
    sweetMessage: 'Even when your hair is messy and you are in oversized clothes doing nothing, you are the most stunning girl I have ever seen.',
    subNote: 'Natural, gorgeous, and all mine. 👑',
    emojiReaction: '✨',
  },
  {
    id: 3,
    cardNumber: '03',
    themeColor: 'from-rose-400 to-red-500',
    accentBg: 'bg-rose-50 dark:bg-rose-950/40',
    icon: '🎟️',
    envelopeTitle: 'Unlimited Coupon',
    teaser: 'Special golden ticket inside...',
    sweetMessage: 'This card entitles you to unlimited tight hugs, forehead kisses, and back rubs whenever you want them. No expiration date, ever.',
    subNote: 'Redeemable 24/7/365 with lifetime guarantee! 🫂',
    emojiReaction: '💌',
  },
  {
    id: 4,
    cardNumber: '04',
    themeColor: 'from-violet-400 to-pink-500',
    accentBg: 'bg-violet-50 dark:bg-violet-950/40',
    icon: '🌟',
    envelopeTitle: 'My Birthday Wish for You',
    teaser: 'My heart’s biggest prayer...',
    sweetMessage: 'I wish that every dream tucked inside your heart comes true this year. And I promise to stand by you and clap the loudest for every single one.',
    subNote: 'Your biggest fan, today and always. 🌠',
    emojiReaction: '🌸',
  },
  {
    id: 5,
    cardNumber: '05',
    themeColor: 'from-pink-500 to-purple-600',
    accentBg: 'bg-pink-50 dark:bg-pink-950/40',
    icon: '🍫',
    envelopeTitle: 'Snack & Cuddle Pass',
    teaser: 'Something delicious for today...',
    sweetMessage: 'Today you are officially excused from making any tough decisions. I will fetch the snacks, play your favorite movie, and let you steal all the blankets.',
    subNote: 'You deserve to be spoiled rotten today. 🍓',
    emojiReaction: '🍿',
  },
  {
    id: 6,
    cardNumber: '06',
    themeColor: 'from-rose-400 to-fuchsia-500',
    accentBg: 'bg-fuchsia-50 dark:bg-fuchsia-950/40',
    icon: '🏡',
    envelopeTitle: 'My Safest Place',
    teaser: 'Where I belong...',
    sweetMessage: 'Home isn’t four walls to me anymore — it is anywhere you are. Whenever you hold my hand, everything in the world just feels right.',
    subNote: 'Thank you for being my peace. 🤍',
    emojiReaction: '🕊️',
  },
  {
    id: 7,
    cardNumber: '07',
    themeColor: 'from-yellow-400 to-rose-400',
    accentBg: 'bg-yellow-50 dark:bg-yellow-950/40',
    icon: '🧸',
    envelopeTitle: 'Cutest Human Award',
    teaser: 'Official recognition...',
    sweetMessage: 'You are so effortlessly cute even when you are sleepy, pouting, or arguing about something silly. I adore every little expression you make.',
    subNote: 'Winner of my heart every single day. 🎀',
    emojiReaction: '🥺',
  },
  {
    id: 8,
    cardNumber: '08',
    themeColor: 'from-purple-400 to-pink-500',
    accentBg: 'bg-purple-50 dark:bg-purple-950/40',
    icon: '🎂',
    envelopeTitle: 'The Miracle of You',
    teaser: 'Why today is so precious...',
    sweetMessage: 'The universe became so much kinder, softer, and more beautiful the exact day you were born. I am endlessly grateful that our paths crossed.',
    subNote: 'Happy Birthday to my favorite human in existence. 🍰',
    emojiReaction: '🎉',
  },
  {
    id: 9,
    cardNumber: '09',
    themeColor: 'from-rose-500 to-red-600',
    accentBg: 'bg-rose-50 dark:bg-rose-950/40',
    icon: '💍',
    envelopeTitle: 'Forever Promise',
    teaser: 'The final sealed letter...',
    sweetMessage: 'I loved you yesterday, I love you today, and I will love you even deeper through every tomorrow that life gives us. You are my forever choice.',
    subNote: 'Yours completely, always. ❤️',
    emojiReaction: '♾️',
  },
];
