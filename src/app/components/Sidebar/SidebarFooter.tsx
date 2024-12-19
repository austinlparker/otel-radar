import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faBluesky } from "@fortawesome/free-brands-svg-icons";
import ThemeToggle from "../ThemeToggle";

export default function SidebarFooter() {
  return (
    <div className="p-4 lg:p-6 border-t border-slate-200 dark:border-blue-600/20">
      <div className="flex items-center justify-between mb-4">
        <a
          href="https://honeycomb.io"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-slate-500 dark:text-blue-400
                     hover:text-slate-700 dark:hover:text-blue-300
                     transition-colors"
        >
          a honeycomb.io joint
        </a>
        <ThemeToggle />
      </div>

      <div className="flex justify-center gap-6">
        {[
          { icon: faEnvelope, href: "mailto:info@honeycomb.io" },
          { icon: faGithub, href: "https://github.com/honeycombio" },
          { icon: faBluesky, href: "https://bsky.app/profile/honeycomb.io" },
        ].map((link) => (
          <a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 dark:text-blue-400
                       hover:text-slate-600 dark:hover:text-blue-300
                       transition-colors"
          >
            <FontAwesomeIcon icon={link.icon} className="w-5 h-5" />
          </a>
        ))}
      </div>
    </div>
  );
}
