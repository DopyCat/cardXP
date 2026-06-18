import type { SocialLink } from './data';

type ProfileSidebarProps = {
  links: SocialLink[];
  onOpenLink: (href: string) => void;
};

export function ProfileSidebar({ links, onOpenLink }: ProfileSidebarProps) {
  return (
    <div className="lado-esquerdo">
      <img src="/img/card/pfp.jpg" className="profile-img" alt="Profile" />
      <div className="sunken-panel panel-left">
        <p className="sidebar-note">
          <strong>scroll to read -&gt;</strong>
          <br />
          welcome to my crd!
          <br />
          [ <span className="pink">she/her</span> ]
          • <strong> INTJ</strong>
          <br />
        </p>
      </div>

      {links.map((link) => (
        <button
          key={link.label}
          className="default btn-icon"
          onClick={() => onOpenLink(link.href)}
        >
          <img src={link.iconSrc} alt={link.alt} className="platform-icon" />
          {link.label}
        </button>
      ))}
    </div>
  );
}
