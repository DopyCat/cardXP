export type SocialLink = {
  label: string;
  iconSrc: string;
  href: string;
  alt: string;
};

export const socialLinks: SocialLink[] = [
  {
    label: 'GitHub',
    iconSrc: '/img/card/icon-github.png',
    href: 'https://github.com/DopyCat',
    alt: 'GitHub',
  },
  {
    label: 'Instagram',
    iconSrc: '/img/card/icon-instagram.png',
    href: 'https://www.instagram.com/dopy.cat/',
    alt: 'Instagram',
  },
  {
    label: 'Discord',
    iconSrc: '/img/card/icon-discord.png',
    href: 'https://discord.gg/nVXC6GKd3n',
    alt: 'Discord',
  },
  {
    label: 'Tiktok',
    iconSrc: '/img/card/icon-tiktok.png',
    href: 'https://www.tiktok.com/@dopy.cat',
    alt: 'Tiktok',
  },
];
