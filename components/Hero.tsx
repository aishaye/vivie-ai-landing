'use client';
import Image from 'next/image';

export default function Hero() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="s00" id="home">
      <div className="s00-left">
        <span className="star-mark">*</span>
        <span className="s00-num">00</span>
        <h1 className="s00-title">Make your<br />fashion<br />here</h1>
        <p className="s00-sub">Design clothes with words.<br />Share with people who get it.</p>
        <button className="s00-pill" onClick={() => scrollTo('signup')}>
          vivie — the AI design studio for fashion obsessives
        </button>
      </div>
      <div className="s00-right">
        <Image
          className="hero-photo"
          src="/images/hero.jpg"
          alt="Fashion show"
          fill
          style={{ objectFit: 'cover', objectPosition: 'center top' }}
          priority
        />
      </div>
    </section>
  );
}
