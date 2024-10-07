import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-bold text-xl">SkillShare</div>
        <div className="space-x-4">
          <Link href="/" className="text-gray-300 hover:text-white transition">
            Home
          </Link>
          <Link
            href="/posts"
            className="text-gray-300 hover:text-white transition"
          >
            Skills
          </Link>
          <Link
            href="/add-new-post-page"
            className="text-gray-300 hover:text-white transition"
          >
            Share your skill!
          </Link>
        </div>
      </div>
    </nav>
  );
}
