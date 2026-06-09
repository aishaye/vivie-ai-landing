'use client';
import Image from 'next/image';
import { useState } from 'react';
import QuizModal from './QuizModal';

const AESTHETICS = [
  {
    id: 'office',
    img: '/images/office.jpg',
    tag: 'aesthetic 01',
    name: 'Office Siren',
    desc: 'Tailored blazers, silk blouses, pointed heels. Power dressing that commands the room without trying. Fashion is the armor.',
    pills: ['structured', 'tailored', 'sharp'],
  },
  {
    id: 'kpop',
    img: '/images/kpop.jpg',
    tag: 'aesthetic 02',
    name: 'K-Pop Edit',
    desc: 'Colour-coded fits, fantasy silhouettes, looks built for a stage. K-fashion energy meets global taste — intentional in every layer.',
    pills: ['playful', 'Y2K', 'maximalist'],
  },
  {
    id: 'editorial',
    img: '/images/editorial-col.jpg',
    tag: 'aesthetic 03',
    name: 'Dark Editorial',
    desc: 'Moody, intentional, obsessed with texture and narrative. Fashion is identity, not trend. Oversized layers, unexpected proportions.',
    pills: ['editorial', 'dark luxury', 'layered'],
  },
];

export default function Community() {
  const [quizOpen, setQuizOpen] = useState(false);

  return (
    <section className="s02" id="community">
      <div className="s02-header rev">
        <span className="s00-num">02</span>
        <h2 className="sec-title">vivie community</h2>
        <p className="sec-desc">Your designs, their feed. Real people. Real aesthetics. No brands.</p>
      </div>

      <div className="aes-grid rev">
        {AESTHETICS.map(a => (
          <div className="aes-col" key={a.id}>
            <div className="aes-img-wrap">
              <Image src={a.img} alt={a.name} fill style={{ objectFit: 'cover', objectPosition: 'top' }} />
              <div className="aes-tag">{a.tag}</div>
            </div>
            <div className="aes-body">
              <div className="aes-name">{a.name}</div>
              <p className="aes-desc">{a.desc}</p>
              <div className="aes-pills">
                {a.pills.map(p => <span key={p} className="aes-pill">{p}</span>)}
              </div>
            </div>
            <button className="quiz-trigger" onClick={() => setQuizOpen(true)}>Explore my aesthetic →</button>
          </div>
        ))}
      </div>

      <QuizModal open={quizOpen} onClose={() => setQuizOpen(false)} />
    </section>
  );
}
