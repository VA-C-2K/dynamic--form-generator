import Link from "next/link";

const links = [{ href: "/forms/new", label: "New Form" }];

const Sidebar = () => (
  <nav className="bg-black">
    {links.map(({ href, label }) => (
      <Link key={href} href={href} className="text-white p-4 hover:bg-slate-400 w-full flex transition-all">
        {label}
      </Link>
    ))}
  </nav>
)

export { Sidebar };
