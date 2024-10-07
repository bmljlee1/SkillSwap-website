import pg from "pg";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import PostComment from "@/app/components/CommentForm";
import DeleteButton from "@/app/components/DeleteButton";

// Set up PostgreSQL connection
const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

export default async function PostPage({ params }) {
  async function handleDelete() {
    "use server";

    const result = await db.query("DELETE FROM posts WHERE id = $1", [
      params.id,
    ]);

    revalidatePath(`/posts`);

    redirect(`/posts`);
  }

  async function handleSubmit(formData) {
    "use server";

    const { username, comment } = formData;
    console.log(formData);

    await db.query(
      "INSERT INTO comments (comment, post_id, username) VALUES ($1, $2, $3)",
      [comment, params.id, username]
    );

    revalidatePath(`/posts/${params.id}`);

    redirect(`/posts/${params.id}`);
  }

  // Handle comment submission

  // Fetch the post and its associated comments
  const post = await db.query(
    `SELECT posts.id AS post_id, posts.title, posts.details, posts.username AS post_author, 
            comments.username AS comment_author, comments.comment, comments.created_at 
     FROM posts 
     LEFT JOIN comments ON posts.id = comments.post_id 
     WHERE posts.id = $1`,
    [params.id]
  );

  if (post.rows.length === 0) {
    return <p className="text-center text-gray-500">No post found.</p>;
  }

  const postDetails = {
    id: post.rows[0].post_id,
    title: post.rows[0].title,
    details: post.rows[0].details,
    author: post.rows[0].post_author,
  };

  const comments = post.rows
    .filter((row) => row.comment)
    .map((row) => ({
      author: row.comment_author,
      comment: row.comment,
      created_at: row.created_at,
    }));

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-4xl font-bold text-gray-800 mb-4">
        {postDetails.title}
      </h2>
      <p className="text-gray-600 mb-2">
        <span className="font-semibold">By:</span> {postDetails.author}
      </p>
      <p className="text-gray-700 mb-6">{postDetails.details}</p>

      <h3 className="text-2xl font-semibold text-gray-800 mb-4">Comments</h3>
      {comments.length > 0 ? (
        <div className="space-y-4">
          {comments.map((comment, index) => (
            <div
              key={index}
              className="p-4 bg-gray-100 rounded-lg shadow-sm transition hover:bg-gray-200"
            >
              <strong className="text-gray-800">{comment.author}:</strong>
              <p className="text-gray-700">{comment.comment}</p>
              <p className="text-gray-500 text-sm">
                Posted on {new Date(comment.created_at).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No comments yet.</p>
      )}

      {/* Post Comment Form */}
      <div className="mt-6">
        <PostComment postId={params.id} serverAction={handleSubmit} />
      </div>

      {/* Delete Button */}
      <div className="mt-4">
        <DeleteButton postId={params.id} serverAction={handleDelete} />
      </div>
    </div>
  );
}
