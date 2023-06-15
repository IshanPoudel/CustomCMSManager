import React from 'react';
import { banner, structure } from '../assets';

const Home = () => {
  return (
    <div className="flex flex-col items-center py-6">
      <div className="w-screen">
        <img src={banner} alt="Banner" />
      </div>
      
      <div className="w-screen bg-gray-100 p-8 rounded-lg shadow-lg">
        <div className="flex justify-between">
          <div className="w-1/2">
            <h2 className="text-4xl font-bold mb-4">Streamline CMS</h2>
            <p className="text-lg text-gray-700 mb-6">Create, manage, and deliver content to any digital platform with enterprise-grade agility, scalability, and security.</p>
            <p className="text-lg text-gray-700">Streamline CMS is a cutting-edge content management system that empowers businesses to efficiently create and distribute content across various digital channels. With its powerful features and user-friendly interface, you can easily manage your content, streamline your workflow, and deliver engaging experiences to your audience.</p>
          </div>
        </div>
      </div>
      
      <div className="w-screen mt-8 bg-gray-100 p-8 rounded-lg shadow-lg">
        <div className="flex justify-between">
          <div className="w-1/2 pr-8">
            <h2 className="text-4xl font-bold mb-4">About Streamline CMS</h2>
            <p className="text-lg text-gray-700 mb-6">
              Streamline CMS is the perfect solution for modern businesses looking for a hybrid content management system. It combines the flexibility and freedom of an API-first headless CMS with the convenience and ease of use provided by traditional content management systems. This unique combination allows you to efficiently manage your content while maintaining full control over its presentation across multiple platforms.
            </p>
            <p className="text-lg text-gray-700">
              Our intuitive visual editing tools enable content creators to effortlessly design and publish content without relying on technical expertise. At the same time, developers have the freedom to customize templates and integrate with any technology stack using our powerful API. With Streamline CMS, you can future-proof your tech stack and adapt to the ever-changing digital landscape with ease.
            </p>
            <p className="text-lg text-gray-700">
              Discover how Streamline CMS can revolutionize your content management strategy and drive growth for your business. <a href="https://example.com" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Learn more about our Hybrid CMS capabilities</a>.
            </p>
          </div>
          <div className="w-1/2">
            <img src={structure} alt="Structure" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
