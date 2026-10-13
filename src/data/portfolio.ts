/**
 * @module portfolio-data
 * @author  Nithin K R — https://github.com/NITHINKR06
 * @license Attribution required — see LICENSE in project root
 *
 * Personal portfolio data for Nithin K R.
 * This file contains personal content specific to Nithin K R.
 * Use of this file's structure is permitted for learning;
 * redistribution with original content is not permitted.
 */

import type { Education, Certifications } from './types';

export const portfolioData = {
  personal: {
    name: 'مهراب بوژمهرانی | Mehrab Boozhmehrani',
    title: 'Python Developer | Chess Player | Web Developer',
    email: 'mehrabboozhmehrani30@gmail.com',
    github: 'https://github.com/MehrabBoozhmehrani',
    linkedin: 'https://instagram.com/mehrab_boozhmehrani',
    instagram: 'https://instagram.com/mehrab_boozhmehrani',
    phone: '09931929016',
    lichess: 'https://lichess.org/',
    chesscom: 'https://www.chess.com/',
    fide: 'https://ratings.fide.com/',
    location: 'Neyshabur, Iran | نیشابور، ایران',
    bio: 'Mehrab Boozhmehrani is a Python programmer, chess player, and web developer from Neyshabur, Iran. Chess achievements: 3rd place Boys U8 Provincial (1397); 2nd place Boys U8 Blitz (1398); 1st place Boys U12 (1398); 2nd place Boys U10 (1398); 5th place Boys U10 Provincial (1399); 3rd, 1st and 2nd places in Boys U12 events, including blitz (1401); and 3rd place in the Provincial Team Championship with Neyshabur (1402). He developed the official Neyshabur Chess Association website. Chess profiles: Lichess and Chess.com. FIDE ratings directory: https://ratings.fide.com/ (specific player profile link not provided).',
  },

  skills: [
    {
      category: 'Frontend',
      items: [
        {
          name: 'HTML5',
          logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
          link: 'https://developer.mozilla.org/en-US/docs/Web/HTML',
          color: '#E34F26',
        },
        {
          name: 'CSS3',
          logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
          link: 'https://developer.mozilla.org/en-US/docs/Web/CSS',
          color: '#1572B6',
        },
        {
          name: 'JavaScript',
          logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
          link: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
          color: '#F7DF1E',
        },
        {
          name: 'TypeScript',
          logo: '/logos/typescript-original.svg',
          link: 'https://www.typescriptlang.org/',
          color: '#3178C6',
        },
        {
          name: 'React',
          logo: '/logos/react-original.svg',
          link: 'https://react.dev/',
          color: '#61DAFB',
        },
        {
          name: 'Tailwind CSS',
          logo: '/logos/tailwindcss-original.svg',
          link: 'https://tailwindcss.com/',
          color: '#38BDF8',
        },
        {
          name: 'Framer Motion',
          logo: 'https://cdn.simpleicons.org/framer',
          link: 'https://www.framer.com/motion/',
          color: '#FF008C',
        },
      ],
    },
    {
      category: 'Backend',
      items: [
        {
          name: 'Node.js',
          logo: '/logos/nodejs-original.svg',
          link: 'https://nodejs.org/',
          color: '#5FA04E',
        },
        {
          name: 'Express.js',
          logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg',
          link: 'https://expressjs.com/',
          color: '#FFFFFF',
        },
        {
          name: 'Python',
          logo: '/logos/python-original.svg',
          link: 'https://www.python.org/',
          color: '#3776AB',
        },
        {
          name: 'FastAPI',
          logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg',
          link: 'https://fastapi.tiangolo.com/',
          color: '#009688',
        },
        {
          name: 'PostgreSQL',
          logo: '/logos/postgresql-original.svg',
          link: 'https://www.postgresql.org/',
          color: '#336791',
        },
        {
          name: 'MongoDB',
          logo: '/logos/mongodb-original.svg',
          link: 'https://www.mongodb.com/',
          color: '#47A248',
        },
        {
          name: 'Firebase',
          logo: '/logos/firebase-original.svg',
          link: 'https://firebase.google.com/',
          color: '#FFCA28',
        },
      ],
    },
    {
      category: 'DevOps',
      items: [
        {
          name: 'Docker',
          logo: '/logos/docker-original.svg',
          link: 'https://www.docker.com/',
          color: '#2496ED',
        },
        {
          name: 'AWS',
          logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg',
          link: 'https://aws.amazon.com/',
          color: '#FF9900',
        },
        {
          name: 'Vercel',
          logo: '/logos/vercel-original.svg',
          link: 'https://vercel.com/',
          color: '#FFFFFF',
        },
        {
          name: 'GitHub Actions',
          logo: '/logos/githubactions-original.svg',
          link: 'https://github.com/features/actions',
          color: '#2088FF',
        },
      ],
    },
    {
      category: 'Tools',
      items: [
        {
          name: 'Git',
          logo: '/logos/git-original.svg',
          link: 'https://git-scm.com/',
          color: '#F05032',
        },
        {
          name: 'GitHub',
          logo: '/logos/github-original.svg',
          link: 'https://github.com/',
          color: '#FFFFFF',
        },
        {
          name: 'VSCode',
          logo: '/logos/vscode-original.svg',
          link: 'https://code.visualstudio.com/',
          color: '#007ACC',
        },
        {
          name: 'Figma',
          logo: '/logos/figma-original.svg',
          link: 'https://figma.com/',
          color: '#F24E1E',
        },
        {
          name: 'Postman',
          logo: '/logos/postman.svg',
          link: 'https://www.postman.com/',
          color: '#FF6C37',
        },
      ],
    },
    {
      category: 'Security',
      items: [
        {
          name: 'Kali Linux',
          logo: 'https://cdn.simpleicons.org/kalilinux',
          link: 'https://www.kali.org/',
          color: '#557C94',
        },
        {
          name: 'TryHackMe',
          logo: 'https://cdn.simpleicons.org/tryhackme',
          link: 'https://tryhackme.com/',
          color: '#212C42',
        },
        {
          name: 'Wireshark',
          logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/networkx/networkx-original.svg',
          link: 'https://www.wireshark.org/',
          color: '#1679A7',
        },
      ],
    },
    {
      category: 'Chess Achievements',
      items: [
        { name: 'Provincial age-group chess titles', logo: '/logos/github-original.svg', link: 'https://neyshabur-chess.vercel.app/', color: '#087f5b' },
        { name: 'Team third place — Provincial Championship (1402)', logo: '/logos/github-original.svg', link: 'https://neyshabur-chess.vercel.app/', color: '#b58b62' },
      ],
    },
  ] as Skill[],

  projects: [
    {
      id: 'neyshabur-chess',
      title: 'Official Neyshabur Chess Association Website',
      description: 'Designed and developed a website to publish chess news, introduce tournaments and events, and showcase chess activities in Neyshabur County.',
      details: `## Official Neyshabur Chess Association Website
A web platform for news, tournaments, events, and chess activities in Neyshabur.

## Chess achievements | سوابق و افتخارات شطرنج
- Third place, Boys Under 8 Provincial Championship — 1397
- Second place, Boys Under 8 Blitz — 1398
- First place, Boys Under 12 — 1398
- Second place, Boys Under 10 — 1398
- Fifth place, Boys Under 10 Provincial Championship — 1399
- Third place, Boys Under 12 — 1401
- First place, Boys Under 12 — 1401
- First place, Boys Under 12 Blitz — 1401
- Second place, Boys Under 12 — 1401
- Third place, Provincial Team Championship with Neyshabur team — 1402

## افتخارات شطرنج
- مقام سوم زیر ۸ سال پسران استان — ۱۳۹۷
- مقام دوم زیر ۸ سال پسران، برق‌آسا — ۱۳۹۸
- مقام اول زیر ۱۲ سال پسران — ۱۳۹۸
- مقام دوم زیر ۱۰ سال پسران — ۱۳۹۸
- مقام پنجم زیر ۱۰ سال پسران استان — ۱۳۹۹
- مقام سوم زیر ۱۲ سال پسران — ۱۴۰۱
- مقام اول زیر ۱۲ سال پسران — ۱۴۰۱
- مقام اول زیر ۱۲ سال پسران، برق‌آسا — ۱۴۰۱
- مقام دوم زیر ۱۲ سال پسران — ۱۴۰۱
- مقام سوم مسابقات تیمی استان با تیم نیشابور — ۱۴۰۲`,
      technologies: ['Web Development', 'Python'],
      githubUrl: 'https://github.com/MehrabBoozhmehrani',
      liveUrl: 'https://neyshabur-chess.vercel.app/',
      status: 'completed',
      priority: 'high',
    },
  ] as Project[],

  education: [
    { institution: 'Neyshabur, Iran', degree: 'Chess and Programming', period: 'Ongoing', description: 'Focused on Python programming, web development, and competitive chess.' },
  ] as Education[],

  experience: [
    { company: 'Neyshabur Chess Association Website', position: 'Web Developer', period: 'Project', location: 'Neyshabur, Iran', description: ['Designed and developed a website for chess news, tournaments, and local activities.'], technologies: ['Web Development', 'Python'] },
  ] as Experience[],

  certifications: [] as Certifications[],
};
