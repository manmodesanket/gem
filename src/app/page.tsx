"use client";

import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";

export default function Home() {
  const { user, loading } = useAuth();

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-white">
      {/* 2D Diamond with Obsidian colors - Enlarged */}
      <div className="relative mb-12">
        <svg width="180" height="180" viewBox="0 0 120 120" className="diamond-svg">
          {/* Diamond shape */}
          <polygon
            points="60,10 90,45 60,110 30,45"
            fill="#7c3aed"
            stroke="#a855f7"
            strokeWidth="2"
            className="diamond-main"
          />
          
          {/* Inner facets for depth */}
          <polygon
            points="60,10 75,35 60,45 45,35"
            fill="#8b5cf6"
            stroke="#a855f7"
            strokeWidth="1"
            opacity="0.8"
          />
          
          <polygon
            points="30,45 45,35 60,45 45,65"
            fill="#6d28d9"
            stroke="#9333ea"
            strokeWidth="1"
            opacity="0.7"
          />
          
          <polygon
            points="60,45 75,35 90,45 75,65"
            fill="#7c3aed"
            stroke="#a855f7"
            strokeWidth="1"
            opacity="0.8"
          />
          
          <polygon
            points="45,65 60,45 75,65 60,110"
            fill="#5b21b6"
            stroke="#8b5cf6"
            strokeWidth="1"
            opacity="0.6"
          />
        </svg>
      </div>

      {/* Title - Updated for white background */}
      <div className="text-center">
        <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-600 via-violet-600 to-purple-600 bg-clip-text text-transparent mb-4">
          GEM AI
        </h1>
        <p className="text-xl text-gray-600 font-light tracking-wide">
          Your Intelligent Conversation Partner
        </p>
        <div className="mt-8 space-y-4">
          {loading ? (
            <div className="px-4 py-2 bg-gray-200 text-gray-500 rounded-full font-semibold">
              Loading...
            </div>
          ) : user ? (
            <Link href="/chat">
              <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-violet-700 text-white rounded-full font-semibold hover:from-purple-500 hover:to-violet-600 shadow-lg hover:shadow-xl">
                Continue
              </button>
            </Link>
          ) : (
            <Link href="/auth">
              <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-violet-700 text-white rounded-full font-semibold hover:from-purple-500 hover:to-violet-600 shadow-lg hover:shadow-xl">
                Get Started
              </button>
            </Link>
          )}
        </div>
      </div>

      <style jsx>{`
        .diamond-svg {
          filter: drop-shadow(0 8px 16px rgba(124, 58, 237, 0.3));
        }

        .diamond-main {
          animation: subtle-glow 3s ease-in-out infinite alternate;
        }

        @keyframes subtle-glow {
          0% {
            filter: brightness(1);
          }
          100% {
            filter: brightness(1.1);
          }
        }

        @media (max-width: 768px) {
          h1 {
            font-size: 3rem;
          }
          
          .diamond-svg {
            width: 120px;
            height: 120px;
          }
        }
      `}</style>
    </div>
  );
}