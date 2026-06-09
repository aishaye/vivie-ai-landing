'use client';
import { useEffect, useRef, useState } from 'react';

const QUESTIONS = [
  {
    q: 'When you get dressed, what\'s the first thing you reach for?',
    opts: ['A blazer or something structured', 'Something with colour or a fun print', 'An oversized piece I can layer', 'Whatever feels soft and delicate'],
  },
  {
    q: 'Pick the vibe you\'re most drawn to right now.',
    opts: ['Quiet power — clean lines, neutral tones', 'Loud and intentional — colour, texture, statement', 'Dark and editorial — unexpected silhouettes', 'Soft and romantic — feminine details, pastels'],
  },
  {
    q: 'Your outfit is a message. What does it say?',
    opts: ['"I am the most prepared person in this room."', '"I dressed for the performance of my life."', '"I wear what I want and it makes sense to me."', '"I look soft but I\'ll surprise you."'],
  },
  {
    q: 'Your wardrobe colour palette would be…',
    opts: ['Camel, ivory, charcoal, navy', 'Bright, colour-blocked, unexpected combos', 'Black, dark brown, deep burgundy', 'Dusty rose, cream, muted pastels'],
  },
  {
    q: 'One piece you\'d never leave the house without.',
    opts: ['A good belt or structured bag', 'A statement accessory — bold earrings or a tie', 'An oversized coat or jacket', 'A delicate necklace or pearl detail'],
  },
];

const AESTHETICS = [
  { name: 'Office Siren', desc: 'Sharp tailoring, silk, power dressing. You get dressed to command — and it works every single time.', tags: ['structured','tailored','sharp','power'] },
  { name: 'K-Pop Edit', desc: 'Colour-coded fits, fantasy silhouettes, global references. You dress for the performance of your life.', tags: ['Y2K','playful','maximalist','stage-ready'] },
  { name: 'Dark Editorial', desc: 'Moody, layered, intentional. You treat fashion as a language and every outfit says something nobody else could.', tags: ['editorial','dark luxury','layered','avant-garde'] },
  { name: 'Coquette Luxe', desc: 'Soft but deliberate. Bows, pearls, pastels — all chosen with precision. You look delicate and you will absolutely surprise you.', tags: ['romantic','soft','feminine','quiet power'] },
];

interface Props { open: boolean; onClose: () => void; }

export default function QuizModal({ open, onClose }: Props) {
  const [step, setStep] = useState(0); // 0-4 = questions, 5 = result
  const [scores, setScores] = useState([0, 0, 0, 0]);
  const [result, setResult] = useState<typeof AESTHETICS[0] | null>(null);

  const reset = () => { setStep(0); setScores([0, 0, 0, 0]); setResult(null); };

  useEffect(() => {
    if (open) { reset(); document.body.style.overflow = 'hidden'; }
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const answer = (choice: number) => {
    const newScores = [...scores];
    newScores[choice]++;
    setScores(newScores);
    setTimeout(() => {
      if (step < QUESTIONS.length - 1) {
        setStep(step + 1);
      } else {
        const topIdx = newScores.indexOf(Math.max(...newScores));
        setResult(AESTHETICS[topIdx]);
        setStep(QUESTIONS.length);
      }
    }, 300);
  };

  const scrollToSignup = () => {
    onClose();
    document.getElementById('signup')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className={`quiz-overlay${open ? ' open' : ''}`} onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="quiz-box">
        <button className="quiz-close" onClick={onClose}>✕</button>

        <div className="quiz-progress">
          {Array.from({ length: QUESTIONS.length }).map((_, i) => (
            <div key={i} className={`qp-dot${i < step ? ' done' : ''}`} />
          ))}
        </div>

        {step < QUESTIONS.length && (
          <div className="quiz-step active">
            <div className="quiz-q">{QUESTIONS[step].q}</div>
            <div className="quiz-options">
              {QUESTIONS[step].opts.map((opt, i) => (
                <button key={i} className="qopt" onClick={() => answer(i)}>{opt}</button>
              ))}
            </div>
          </div>
        )}

        {step === QUESTIONS.length && result && (
          <div className="quiz-step active">
            <div className="quiz-result">
              <p style={{ fontSize: 10, letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--stone)' }}>Your vivie aesthetic</p>
              <div className="result-aes">{result.name}</div>
              <p className="result-desc">{result.desc}</p>
              <div className="result-tags">
                {result.tags.map(t => <span key={t} className="result-tag">{t}</span>)}
              </div>
              <button className="quiz-cta" onClick={scrollToSignup}>Create my vivie account →</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
