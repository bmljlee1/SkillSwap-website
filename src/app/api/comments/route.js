import { connect } from "../utilities/connect";

export async function POST(req) {
  try {
    const body = await req.json();
    const { username, comment } = body;

    console.log("Received data:", { username, comment });

    if (!username || !comment) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const db = connect();
    if (!db) {
      console.error("Failed to connect to the database.");
      return new Response(
        JSON.stringify({ error: "Database connection failed" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    try {
      const result = await db.query(
        "INSERT INTO comments (username, comment) VALUES ($1, $2) RETURNING *",
        [username, comment]
      );

      return new Response(JSON.stringify(result.rows[0]), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } catch (dbError) {
      console.error("Database query failed:", dbError);
      return new Response(JSON.stringify({ error: "Database query error" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  } catch (error) {
    console.error("API Error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
