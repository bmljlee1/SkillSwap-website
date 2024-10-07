import { connect } from "../utilities/connect";
import Link from "next/link";
import pg from "pg";

export default async function Posts({ searchParams }) {
  console.log(searchParams);

  const db = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
  });

  // const db = await connect();
  // console.log(await db);

  const data = await db.query("SELECT * FROM posts");
  const posts = await data.rows;

  const sorted = posts.sort((a, b) => {
    if (searchParams.sortBy === "asc") {
      return a.title.localeCompare(b.title);
    } else if (searchParams.sortBy === "desc") {
      return b.title.localeCompare(a.title);
    }
    return 0;
  });

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">All Posts</h2>
        <div className="space-x-4">
          <Link href="/posts?sortBy=asc">
            <button className="p-3 bg-slate-400 rounded-xl text-blue-500 hover:text-white hover:bg-blue-600 hover:scale-105 transition transform duration-200">
              Sort by Ascending
            </button>
          </Link>
          <Link href="/posts?sortBy=desc">
            <button className="p-3 bg-slate-400 rounded-xl text-blue-500 hover:text-white hover:bg-blue-600 hover:scale-105 transition transform duration-200">
              Sort by Descending
            </button>
          </Link>
          <Link href="/posts">
            <button className="p-3 bg-slate-400 rounded-xl text-blue-500 hover:text-white hover:bg-blue-600 hover:scale-105 transition transform duration-200">
              Sort by Date
            </button>
          </Link>
        </div>
      </div>

      <div className="space-y-4">
        {sorted.map((post) => (
          <div
            key={post.id}
            className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
          >
            <Link href={`posts/${post.id}`}>
              <h3 className="text-lg font-semibold text-gray-900 hover:text-gray-600 transition">
                {post.title}
              </h3>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
