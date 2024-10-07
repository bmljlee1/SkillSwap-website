"use client";

import { useState } from "react";
import PostFormInput from "./PostFormInput";

export default function PostForm({ handleSubmit }) {
  const [formData, setFormData] = useState({
    title: "",
    username: "",
    age: "",
    skill: "",
    details: "",
  });

  const [isDisabled, setIsDisabled] = useState(true);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    const isFormComplete = Object.values({ ...formData, [name]: value }).every(
      (field) => field.length > 0 || field > 0
    );
    setIsDisabled(!isFormComplete);
  }

  async function handleFormSubmit(event) {
    event.preventDefault();

    await handleSubmit(formData);

    setFormData({ title: "", username: "", age: "", skill: "", details: "" });
    event.target.reset();
  }

  return (
    <>
      <div>
        <p>{formData.title}</p>
        <p>{formData.username}</p>
        <p>{formData.age}</p>
        <p>{formData.skill}</p>
        <p>{formData.details}</p>
      </div>

      <form
        onSubmit={handleFormSubmit}
        className="flex flex-col bg-slate-400 p-16 gap-[13px]"
      >
        <PostFormInput
          onChange={handleChange}
          name="title"
          placeholder="Title of Post"
          type="text"
          value={formData.title}
        />
        <PostFormInput
          onChange={handleChange}
          name="username"
          placeholder="Enter Username"
          type="text"
          value={formData.username}
        />
        <PostFormInput
          onChange={handleChange}
          name="skill"
          placeholder="Enter skill"
          type="text"
          value={formData.skill}
        />
        <PostFormInput
          onChange={handleChange}
          name="age"
          placeholder="Enter age"
          type="number"
          value={formData.age}
        />
        <PostFormInput
          onChange={handleChange}
          name="details"
          placeholder="Describe your skill"
          type="text"
          value={formData.details}
        />

        <button
          type="submit"
          className={`rounded p-4 ${
            isDisabled ? "bg-slate-300" : "bg-green-500"
          }`}
          disabled={isDisabled}
        >
          Submit
        </button>
      </form>
    </>
  );
}
