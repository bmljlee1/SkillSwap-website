"use client";

export default function DeleteButton({ postId }) {
  const handleDelete = async () => {
    const confirmed = confirm("Are you sure you want to delete this post?");
    if (!confirmed) return;

    try {
      // Send a DELETE request to the server-side route
      const response = await fetch(`/api/posts/${postId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // If successful, redirect to the posts list after deletion
        console.log("Post deleted successfully.");
        window.location.href = "/posts"; // Redirect to posts page after deletion
      } else {
        console.error("Failed to delete the post. Status:", response.status);
      }
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
