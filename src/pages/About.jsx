import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen  text-gray-800 dark:text-gray-100 px-6 py-16">
      {/* Decorative Header */}
      <div className="relative mb-10">
        <div className="absolute left-0 w-20 h-1 bg-violet-600 rounded-full top-1/2 -translate-y-1/2"></div>
        <h1 className="text-5xl font-extrabold text-violet-700 dark:text-violet-400 ml-24">
          About Us
        </h1>
      </div>

      <div className="max-w-4xl mx-auto space-y-8 text-lg leading-relaxed">

        {/* Intro */}
        <blockquote className="border-l-4 border-violet-500 pl-4 italic text-gray-700 dark:text-gray-300">
          "Time is not just measured in seconds, but in moments that last forever — and so are the watches we deliver."
        </blockquote>

        <p>
          <strong className="text-violet-600 dark:text-violet-400">ChronoTime</strong> is a premium online e-commerce platform dedicated to offering a
          curated collection of luxury brand watches and stylish accessories. Our catalog is a
          celebration of sophistication, timeless design, and high-end craftsmanship — for those who
          appreciate elegance with every tick.
        </p>

        <p>
          Our platform features full e-commerce functionality: secure logins, real-time product management, seamless payments, and fast updates. We use <strong>Supabase</strong> to power our backend and database, ensuring scalability and security. The frontend is crafted using <strong>React.js</strong> to deliver a modern, smooth, and responsive user experience.
        </p>

        <p>
          <strong>ChronoTime</strong> was founded by <strong>Yashwanth</strong> and <strong>Nidhish</strong>, engineering students driven by a shared passion for both cutting-edge technology and timeless luxury. This website is more than a project — it's a reflection of ambition, elegance, and innovation.
        </p>

        <hr className="border-gray-400 dark:border-gray-600" />

        <p className="text-sm text-center text-gray-600 dark:text-gray-400 mt-6">
          © {new Date().getFullYear()} ChronoTime. Crafted with precision and passion.
        </p>
      </div>
    </div>
  );
};

export default About;
