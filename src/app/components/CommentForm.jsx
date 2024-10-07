"use client";

import { useState } from "react";
import CommentFormInput from "./CommentFormInput";

export default function PostComment() {
  const [formData, setFormData] = useState({
    username: "",
    comment: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    setIsSubmitting(true); // Show some indication of submission process

    const commentData = new FormData(event.target);
    const myData = Object.fromEntries(commentData); // Convert formData to a regular object

    try {
      // Use fetch to POST the data to the server or API
      const response = await fetch("/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(myData),
      });

      if (response.ok) {
        console.log("Comment successfully posted:", myData);
        // Reset form state on successful submission
        setFormData({ username: "", comment: "" });
        event.target.reset();
      } else {
        console.error("Failed to post comment.");
      }
    } catch (error) {
      console.error("Error posting comment:", error);
    } finally {
      setIsSubmitting(false); // Stop the loading indicator
    }
  }

  function handleChange(event) {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }

  return (
    <>
      <div>
        <p>{formData.username}</p>
        <p>{formData.comment}</p>
      </div>
      <form
        method="POST"
        onSubmit={handleSubmit}
        // onChange={handleChange}
        className="flex flex-col bg-slate-400 p-16 gap-[13px]"
      >
        <CommentFormInput
          onChange={handleChange}
          name="username"
          placeholder="Enter Username"
          type="text"
          value={formData.username} // Add value to inputs to bind them with formData state
        />
        <CommentFormInput
          onChange={handleChange}
          name="comment"
          placeholder="Enter comment here"
          type="text"
          value={formData.comment} // Bind value to formData state
        />

        <button
          className={`rounded p-4 ${
            formData.username.length < 1 ? "bg-slate-500" : "bg-green-500"
          }`}
          disabled={isSubmitting || formData.username.length < 1}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </>
  );
}
