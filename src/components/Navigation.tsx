'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ThemeToggle from './ThemeToggle';

const Navigation: React.FC = () => {

  return (
    <nav className="navigation">
      <div className="navigation__container">
        {/* Logo/Brand */}
        <Link href="/" className="navigation__brand">
          <div className="navigation__brand-logo">
            <Image
              src="/flower.png"
              alt="Age & Health Calculator Logo"
              width={45}
              height={45}
              className="navigation__brand-flower"
            />
          </div>
          <span className="navigation__brand-text">A&H Calculator</span>
        </Link>

        {/* Theme Toggle */}
        <ThemeToggle />
      </div>
    </nav>
  );
};

export default Navigation;
