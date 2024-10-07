"use client";

export default function DeleteButton({ serverAction }) {
  const handleDelete = async () => {
    const confirmed = confirm("Are you sure you want to delete this post?");
    if (!confirmed) return;

    try {
      serverAction();
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="bg-red-500 text-white p-2 mt-4 rounded"
    >
      Delete Post
    </button>
  );
}
