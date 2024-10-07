import pg from "pg";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import PostForm from "../components/PostForm";

export default function AddNewPostPage() {
  async function handleSubmit(formData) {
    "use server";

    const { title, username, age, skill, details } = formData;

    const db = new pg.Pool({
      connectionString: process.env.DATABASE_URL,
    });

    await db.query(
      `INSERT INTO posts (title, username, age, skill, details) VALUES ($1, $2, $3, $4, $5)`,
      [title, username, age, skill, details]
    );

    revalidatePath("/posts");

    redirect("/posts");
  }

  return (
    <div>
      <PostForm handleSubmit={handleSubmit} />
    </div>
  );
}
