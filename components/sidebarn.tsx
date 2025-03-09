import Link from "next/link";
interface SidebarNavProps {
  onClose: () => void;
}

export function SidebarNav({ onClose }: SidebarNavProps) {
  const socialLinks = [
    { name: "LinkedIn", href: "#" },
    { name: "Behance", href: "#" },
    { name: "Dribbble", href: "#" },
    { name: "Instagram", href: "#" },
    { name: "YouTube", href: "#" },
    { name: "Twitter", href: "#" },
    { name: "GitHub", href: "#" },
  ];

  const menuLinks = [
    { name: "What we do", href: "#" },
    { name: "Projects", href: "#" },
    { name: "Company", href: "#" },
    { name: "Tutorials", href: "#" },
    { name: "Contacts", href: "#" },
  ];

  return (
    <div className="flex h-full flex-col p-6 " >
      <div className="flex items-center justify-between mb-12">
        <div className="text-xl font-medium">cuberto</div>
      </div>

      <div className="flex flex-1">
        <div className="w-1/2 pr-4">
          <h2 className="text-sm font-medium text-neutral-400 mb-4">
            Social media
          </h2>
          <nav className="flex flex-col space-y-4">
            {socialLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-lg font-medium text-neutral-800 transition-colors hover:bg-black hover:text-white px-2 py-1 rounded"
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="w-1/2 pl-4">
          <h2 className="text-sm font-medium text-neutral-400 mb-4">Menu</h2>
          <nav className="flex flex-col space-y-4">
            {menuLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-3xl font-medium text-neutral-800 transition-colors hover:bg-black hover:text-white px-2 py-1 rounded"
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      <div className="mt-auto pt-6 border-t border-neutral-200">
        <div className="mb-4 text-sm text-neutral-500">Get in touch</div>
        <div className="mb-2">
          <Link
            href="mailto:info@cuberto.com"
            className="text-lg font-medium text-neutral-800 transition-colors hover:bg-black hover:text-white px-2 py-1 rounded"
          >
            info@cuberto.com
          </Link>
        </div>
        <div>
          <Link
            href="#"
            className="text-lg font-medium text-neutral-800 transition-colors hover:bg-black hover:text-white px-2 py-1 rounded"
          >
            Our workflow
          </Link>
        </div>
      </div>
    </div>
  );
}
