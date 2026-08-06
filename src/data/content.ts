import { GALLERY_SLOTS } from './gallery'

export const ABOUT = {
  label: 'The man',
  title: 'Rooted in dignity, guided by love',
  lead:
    'This page is a living portrait of Ọmọ-Ọba Boa Olugbewesa — a place to honour who he is, what he has built, and the quiet strength he carries into every room.',
  preview:
    'Replace this paragraph with his biography — childhood, family, values, and the moments that shaped him. Speak to the warmth guests already know, and the legacy they celebrate today.',
  paragraphs: [
    'Replace this paragraph with his biography — childhood, family, values, and the moments that shaped him. Speak to the warmth guests already know, and the legacy they celebrate today.',
    'You can also weave in affiliations, milestones, and the roles he holds with pride — father, mentor, community pillar, and more.',
    'Add stories that guests will recognise: how he leads, how he loves, the traditions he keeps, and the quiet rituals that make him who he is.',
    'This longer page is ready for the full telling — keep writing until his portrait feels complete.',
  ],
  facts: [
    { label: 'Celebrating', value: 'A life of purpose' },
    { label: 'Known for', value: 'Wisdom & warmth' },
    { label: 'Beloved as', value: 'Father & guide' },
  ],
}

export const JOURNEY = {
  label: 'The journey',
  title: 'Chapters of a remarkable life',
  lead:
    'A living timeline you can fill with dates, places, and stories as photos and memories arrive.',
  milestones: [
    {
      year: 'Beginnings',
      title: 'Roots & early years',
      text: 'Add a short note about where his story started — hometown, family, and the values planted early.',
    },
    {
      year: 'Becoming',
      title: 'Path & purpose',
      text: 'Share how he found his calling — education, craft, leadership, or the work that defined his path.',
    },
    {
      year: 'Family',
      title: 'Love that multiplies',
      text: 'Celebrate the family he built and the way he shows up as father, husband, and pillar of the home.',
    },
    {
      year: 'Today',
      title: 'A legacy in bloom',
      text: 'Honour who he is now — the wisdom he offers, the rooms he lights up, and why this birthday matters.',
    },
  ],
}

export const GALLERY = {
  label: 'The gallery',
  title: 'Moments in honour',
  lead:
    'Frames from a life of presence, family, leadership, and celebration.',
  slots: GALLERY_SLOTS,
}

export const TRIBUTES = {
  label: 'Tributes',
  title: 'Words waiting for voices',
  lead:
    'Guests can leave birthday wishes here later — for now, these spaces are ready to hold them.',
  items: [
    {
      from: 'Family',
      note: 'A message of love will live here — words from those who know him best.',
    },
    {
      from: 'Friends',
      note: 'Stories, laughter, and gratitude from the people who walk beside him.',
    },
    {
      from: 'Community',
      note: 'A space for tributes from colleagues, neighbours, and everyone celebrating today.',
    },
    {
      from: 'Well-wishers',
      note: 'Add more birthday notes here as they come in from the celebration.',
    },
  ],
}

export const NAV_LINKS = [
  { to: '/about', label: 'About', hash: '#about' },
  { to: '/journey', label: 'Journey', hash: '#journey' },
  { to: '/gallery', label: 'Gallery', hash: '#gallery' },
  { to: '/tributes', label: 'Tributes', hash: '#tributes' },
] as const
