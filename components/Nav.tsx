'use client';
import Image from 'next/image';

export default function Nav() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav>
      <div className="nav-logo">
        <Image src="/images/logo.png" alt="vivie.ai" height={38} width={120} style={{ height: 38, width: 'auto' }} />
      </div>
      <ul className="nav-links">
        <li><a href="#studio">Studio</a></li>
        <li><a href="#community">Community</a></li>
        <li><a href="#library">Library</a></li>
        <li><a href="#signup">Join</a></li>
      </ul>
      <button className="nav-cta" onClick={() => scrollTo('signup')}>Create Account</button>
    </nav>
  );
}
