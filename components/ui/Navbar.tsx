'use client';

import Link from 'next/link';
import { useState } from 'react';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { href: '/', label: '🏠 Home' },
    { href: '/timeline', label: '📅 Timeline' },
    { href: '/gallery', label: '📸 Gallery' },
    { href: '/letters', label: '💌 Letters' },
    { href: '/game', label: '🎮 Game' },
    { href: '/only-us', label: '🔐 Secret' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-black/30 border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
            💕 Our Love Story
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-4 space-x-reverse">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white/70 hover:text-white hover:bg-white/10 px-3 py-2 rounded-lg transition-all duration-300"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white p-2"
          >
            {isOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-white/10">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block text-white/70 hover:text-white hover:bg-white/10 px-3 py-2 rounded-lg transition-all duration-300"
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}