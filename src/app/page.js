import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative z-10">
      <h1 className="text-4xl font-bold text-black mb-4">
        Achieve Your Best Self
      </h1>
      <p className="text-lg text-black mb-8 text-center max-w-2xl">
        Welcome to our community of self-improvers! Here, you can share the
        skills you’ve mastered and explain why they’re important to you. Browse
        through others’ achievements and get inspired to grow and develop new
        talents. Let's elevate ourselves, one skill at a time!
      </p>

      <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition">
        Share Your Skill
      </button>
    </div>
  );
}
