'use client';
import Image from 'next/image';

export default function CTASection() {
  return (
    <section className="s04">
      <Image src="/images/ctabg.jpg" alt="" fill className="s04-bg-img" style={{ objectFit: 'cover', objectPosition: 'center top', opacity: .18, filter: 'grayscale(.3)' }} />
      <div className="s04-inner rev">
        <h2 className="s04-title">Your aesthetic<br />has a home now.</h2>
        <p className="s04-sub">Join vivie — design, share, belong.</p>
        <button className="s04-btn" onClick={() => document.getElementById('signup')?.scrollIntoView({ behavior: 'smooth' })}>
          Create my vivie →
        </button>
      </div>
    </section>
  );
}
