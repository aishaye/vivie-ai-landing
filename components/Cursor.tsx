'use client';
import { useEffect, useRef } from 'react';

export default function Cursor() {
  const curRef = useRef<HTMLDivElement>(null);
  const curRRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cur = curRef.current;
    const curR = curRRef.current;
    if (!cur || !curR) return;

    let mx = 0, my = 0, rx = 0, ry = 0;
    let rafId: number;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY;
      cur.style.left = mx + 'px';
      cur.style.top = my + 'px';
    };

    const loop = () => {
      rx += (mx - rx) * .1;
      ry += (my - ry) * .1;
      curR.style.left = rx + 'px';
      curR.style.top = ry + 'px';
      rafId = requestAnimationFrame(loop);
    };
    loop();

    document.addEventListener('mousemove', onMove);

    const interactables = document.querySelectorAll('a,button,input,select');
    const enter = () => {
      cur.style.transform = 'translate(-50%,-50%) scale(2.2)';
      curR.style.width = '48px'; curR.style.height = '48px';
      curR.style.borderColor = 'rgba(212,137,154,.8)';
    };
    const leave = () => {
      cur.style.transform = 'translate(-50%,-50%) scale(1)';
      curR.style.width = '30px'; curR.style.height = '30px';
      curR.style.borderColor = 'rgba(212,137,154,.5)';
    };
    interactables.forEach(el => {
      el.addEventListener('mouseenter', enter);
      el.addEventListener('mouseleave', leave);
    });

    return () => {
      document.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafId);
      interactables.forEach(el => {
        el.removeEventListener('mouseenter', enter);
        el.removeEventListener('mouseleave', leave);
      });
    };
  }, []);

  return (
    <>
      <div className="cur" ref={curRef} />
      <div className="cur-r" ref={curRRef} />
    </>
  );
}
