'use client';
import Image from 'next/image';
import { useEffect, useRef } from 'react';

export default function Studio() {
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = chatRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          el.querySelectorAll<HTMLElement>('.bubble').forEach((b, i) => {
            setTimeout(() => b.classList.add('show'), i * 400);
          });
        }
      });
    }, { threshold: .3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="s01 rev" id="studio">
      <div className="s01-grid">
        <div className="rev">
          <span className="s00-num">01</span>
          <h2 className="sec-title">vivie studio</h2>
          <p className="sec-desc">Describe any piece of clothing. vivie builds it.</p>
          <p className="sec-desc" style={{ marginBottom: 32 }}>
            No design skills. No Photoshop.<br />Just your imagination — and a prompt.
          </p>
          <div className="chat-wrap" ref={chatRef}>
            <div className="bubble">
              a structured blazer in dusty rose, oversized shoulders, vintage gold buttons, Y2K energy but quiet luxury finish
            </div>
            <div className="bubble">
              something dark — black trench coat, sheer sleeves, editorial silhouette
            </div>
          </div>
        </div>
        <div className="rev rd2">
          <Image src="/images/studio.jpg" alt="Studio" className="s01-img" width={600} height={700} style={{ width: '100%', height: 'auto' }} />
        </div>
      </div>
    </section>
  );
}
