export type SocialLink = {
  label: string;
  iconSrc: string;
  href: string;
  alt: string;
};

export const socialLinks: SocialLink[] = [
  {
    label: 'GitHub',
    iconSrc: '/img/icon-github.png',
    href: 'https://github.com/DopyCat',
    alt: 'GitHub',
  },
  {
    label: 'Instagram',
    iconSrc: '/img/icon-instagram.png',
    href: 'https://www.instagram.com/dopy.cat/',
    alt: 'Instagram',
  },
  {
    label: 'Discord',
    iconSrc: '/img/icon-discord.png',
    href: 'https://discord.gg/nVXC6GKd3n',
    alt: 'Discord',
  },
  {
    label: 'Tiktok',
    iconSrc: '/img/icon-tiktok.png',
    href: 'https://www.tiktok.com/@dopy.cat',
    alt: 'Tiktok',
  },
];
