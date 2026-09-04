import { Image } from 'lucide-react'
import { SearchIcon, SquarePenIcon } from 'lucide-animated'

export const CHAT_MODES = [
  { id: 'chat', label: 'Chat' },
  { id: 'spark', label: 'Spark', badge: 'BETA' },
]

export const NEW_CHAT_PATH = '/chat'

export const CHAT_NAVIGATION = [
  {
    id: 'chat',
    label: 'New chat',
    icon: SquarePenIcon,
    animated: true,
    to: NEW_CHAT_PATH,
  },
  {
    id: 'search-chats',
    label: 'Search chats',
    icon: SearchIcon,
    animated: true,
  },
  { id: 'images', label: 'Images', icon: Image },
]

export const RECENT_CHATS = [
  {
    id: '1',
    title: 'Movie Ticket Booking Assistance',
    messages: [
      {
        role: 'user',
        content: [
          'Find me 2 tickets for a popular film that is showing in cinemas in my city for tomorrow night. I want good seats in the middle of the row towards the back of the cinema.',
        ],
      },
      {
        role: 'assistant',
        content: [
          'Popular films currently playing across Pune theatres like PVR, INOX and Cinepolis include Toxic: A Fairy Tale for Grown-ups, Hanuman Ansh, and Spider-Man: Brand New Day.',
          'To book 2 tickets with middle-of-the-row seats toward the back, let me know which film you want, whether you have a preferred multiplex, and what showtime window works for tomorrow night.',
        ],
      },
    ],
  },
  {
    id: '2',
    title: 'Job Search For Krishna Mungase',
    messages: [
      {
        role: 'user',
        content: [
          'Help me shortlist frontend roles that match my React and Node experience.',
        ],
      },
      {
        role: 'assistant',
        content: [
          'Based on a React, Node and Tailwind background, the strongest matches are product-focused frontend roles at mid-size SaaS companies rather than large enterprise teams.',
          'Share your notice period and preferred location and I can narrow the list further.',
        ],
      },
    ],
  },
  {
    id: '3',
    title: 'Premium Personal Style Report',
    messages: [
      {
        role: 'user',
        content: [
          'Put together a personal style report for smart casual wear.',
        ],
      },
      {
        role: 'assistant',
        content: [
          'A smart casual base works best with three neutral layers: a structured jacket, a plain crew or oxford shirt, and tapered trousers in a mid tone.',
          'Tell me your usual colour preferences and I will turn this into a full seasonal breakdown.',
        ],
      },
    ],
  },
  {
    id: '4',
    title: 'Software Testing Definitions Matching',
    messages: [
      {
        role: 'user',
        content: [
          'Match these testing terms to their definitions: unit, integration, regression, smoke.',
        ],
      },
      {
        role: 'assistant',
        content: [
          'Unit tests cover a single function in isolation. Integration tests cover how modules work together. Regression tests confirm previously fixed behaviour still holds. Smoke tests are a shallow pass over critical paths before deeper testing runs.',
        ],
      },
    ],
  },
  {
    id: '5',
    title: 'Ready for Algorithmic or Development Work',
    messages: [
      {
        role: 'user',
        content: ['Give me a warm-up problem before an interview round.'],
      },
      {
        role: 'assistant',
        content: [
          'Try this: given an array of integers and a target, return the indices of the two numbers that add to the target, in a single pass.',
          'Aim for O(n) time with a hash map of value to index.',
        ],
      },
    ],
  },
  {
    id: '6',
    title: 'Highlighting Photo Headline Video',
    messages: [
      {
        role: 'user',
        content: ['How do I make a headline photo stand out in a short video?'],
      },
      {
        role: 'assistant',
        content: [
          'Hold the photo on screen for at least two seconds, push a slow scale from 100% to 106%, and drop the background audio slightly while the headline is readable.',
        ],
      },
    ],
  },
  {
    id: '7',
    title: 'Parallel AI Travel Agent Visualization',
    messages: [
      {
        role: 'user',
        content: [
          'How should I visualise several travel agents planning a trip at the same time?',
        ],
      },
      {
        role: 'assistant',
        content: [
          'Use one lane per agent on a shared timeline, so overlapping work is obvious at a glance, and mark the points where lanes exchange results.',
        ],
      },
    ],
  },
  {
    id: '8',
    title: 'Computer Science Life Analogies',
    messages: [
      {
        role: 'user',
        content: ['Explain caching with an everyday analogy.'],
      },
      {
        role: 'assistant',
        content: [
          'A cache is the shelf by your front door. Things you reach for constantly live there instead of in a cupboard, and the only real problem is deciding what to move off the shelf when it fills up.',
        ],
      },
    ],
  },
  {
    id: '9',
    title: 'Generating News Intro Video',
    messages: [
      {
        role: 'user',
        content: ['Draft a 10 second news intro structure.'],
      },
      {
        role: 'assistant',
        content: [
          'Two seconds of logo sting, three seconds of headline montage, three seconds of anchor plate, then two seconds settling into the studio shot.',
        ],
      },
    ],
  },
  {
    id: '10',
    title: 'YouTube News Intro and Script Guide',
    messages: [
      {
        role: 'user',
        content: ['Write a script outline for a daily news channel.'],
      },
      {
        role: 'assistant',
        content: [
          'Open with the single strongest story in one sentence, then a short channel ident, then three stories in descending order of impact, and close with what is coming tomorrow.',
        ],
      },
    ],
  },
  {
    id: '11',
    title: 'Routers Operate at Network Layer',
    messages: [
      {
        role: 'user',
        content: ['Why are routers described as layer 3 devices?'],
      },
      {
        role: 'assistant',
        content: [
          'Routers forward packets using IP addresses, and IP lives at layer 3 of the OSI model. Switches forward frames using MAC addresses at layer 2, which is the usual point of confusion.',
        ],
      },
    ],
  },
]
