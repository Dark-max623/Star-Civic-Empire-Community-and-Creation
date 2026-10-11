import { footerLinks, socialLinks } from '../../data/footerLinks';
import { NewsletterForm } from '../ui/NewsletterForm';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black border-t border-white/5 pt-16 pb-8">
      <div className="section-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
        {/* Column 1: Company Info */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <span className="text-gold-primary font-extrabold text-xl tracking-tight">
              STAR CIVIC EMPIRE
            </span>
            <span className="text-text-primary text-xs font-light tracking-widest">
              GROUP
            </span>
          </div>
          <p className="text-text-subtle text-sm leading-relaxed max-w-xs">
            Redefining moments, creating memories. A luxury conglomerate spanning events,
            banquets, fashions, and philanthropy.
          </p>
          <p className="text-text-muted text-xs mt-2">
            © {currentYear} Star Civic Empire. All rights reserved.
          </p>
        </div>

        {/* Column 2: Useful Links */}
        {footerLinks.map((group) => (
          <div key={group.title} className="flex flex-col gap-4">
            <h4 className="text-text-primary font-semibold uppercase tracking-widest text-sm">
              {group.title}
            </h4>
            <ul className="flex flex-col gap-2">
              {group.links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-text-subtle text-sm hover:text-gold-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Column 3: Social Media */}
        <div className="flex flex-col gap-4">
          <h4 className="text-text-primary font-semibold uppercase tracking-widest text-sm">
            Follow Us
          </h4>
          <ul className="flex flex-col gap-2">
            {socialLinks.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  className="text-text-subtle text-sm hover:text-gold-primary transition-colors flex items-center gap-2"
                >
                  <span className="text-gold-primary">{social.icon}</span>
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4: Newsletter */}
        <div className="flex flex-col gap-4">
          <h4 className="text-text-primary font-semibold uppercase tracking-widest text-sm">
            Stay Updated
          </h4>
          <NewsletterForm />
        </div>
      </div>
    </footer>
  );
};