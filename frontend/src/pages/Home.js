import React from 'react';
import { banner } from '../assets';

const Home = () => {
  return (
    <div className="flex flex-col items-center py-6">

      <div className="max-w-3xl bg-gray-100 p-8 rounded-lg shadow-lg">
        <div className="flex justify-between">
          <div className="w-1/2">
            <h2 className="text-2xl font-bold mb-4">Streamline CMS</h2>
            <p>Create, manage, and deliver content to any digital platform with enterprise-grade agility, scalability, and security.</p>
          </div>
          
        </div>
      </div>
      <div className="max-w-3xl mt-8 bg-gray-100 p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">About Streamline CMS</h2>
        <p>
          With Streamline CMS, you get the best of both worlds. Unlike pure headless CMS solutions where you often pay twice as much for half a CMS, Streamline CMS was purpose-built as a Hybrid CMS. This means it combines the true separation of content and presentation that comes with an API-first headless CMS, while also providing the convenience of page templates and user-friendly visual editing tools found in traditional content management systems.
        </p>
        <p>
          Streamline CMS empowers both content creators and developers by offering an intuitive content creation experience coupled with powerful customization options. You can easily create and manage content with ease, while effortlessly delivering it to any channel or platform, anywhere. Streamline CMS enables you to future-proof your tech stack by providing the flexibility and agility required in today's rapidly evolving digital landscape.
        </p>
        <p>
          See how Streamline CMS can help you recession-proof your tech stack by delivering content effectively with its Hybrid CMS capabilities.
          <a href="https://example.com" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">How to Recession Proof Your Tech Stack With a Hybrid CMS</a>
        </p>
      </div>
    </div>
  );
};

export default Home;
