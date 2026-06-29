import Link from "next/link";
const links = [["/", "Generate"], ["/wardrobe", "Wardrobe"], ["/add", "Add"], ["/insights", "Insights"], ["/about", "About"]];
export function AppNav() {
  return (
    <nav className="flex gap-4 border-b p-4 text-sm font-medium">
      {links.map(([href, label]) => <Link key={href} href={href}>{label}</Link>)}
    </nav>
  );
}
