import pg from "pg";

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function DELETE(req, { params }) {
  const postId = params.postId;

  if (!postId) {
    return new Response("No post ID provided", { status: 400 });
  }

  try {
    console.log(`Attempting to delete post with ID: ${postId}`);

    const result = await pool.query("DELETE FROM posts WHERE id = $1", [
      postId,
    ]);

    console.log("Delete result:", result);
    console.log(`Rows affected: ${result.rowCount}`);

    if (result.rowCount === 0) {
      console.log(`No post found with ID: ${postId}`);
      return new Response(`No post found with ID ${postId}`, { status: 404 });
    }

    console.log(`Post with ID ${postId} successfully deleted.`);

    return new Response(`Post with ID ${postId} deleted successfully`, {
      status: 200,
    });
  } catch (error) {
    console.error("Error occurred during deletion:", error);
    return new Response("Error deleting post", { status: 500 });
  }
}

// please NOTE FRANKIE, my deletes were not working! i was pressed for time and i had to resort to chat gpt to help me debug and an API route seemed to be the answer. please can you let me know if this is the right thing to do?? If not, please can you help me to correct this??
