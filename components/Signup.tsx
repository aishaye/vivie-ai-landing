'use client';
import { useEffect, useRef, useState } from 'react';

export default function Signup() {
  const [count, setCount] = useState(247);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passError, setPassError] = useState(false);

  const firstRef = useRef<HTMLInputElement>(null);
  const lastRef  = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const userRef  = useRef<HTMLInputElement>(null);
  const passRef  = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Get live count from Supabase function
    fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/rpc/get_signup_count`, {
      headers: { 'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '' },
    })
      .then(r => r.json())
      .then(n => { if (typeof n === 'number') setCount(n); })
      .catch(() => {});
  }, []);

  const doSignup = async () => {
    const first    = firstRef.current?.value.trim() || '';
    const last     = lastRef.current?.value.trim()  || '';
    const email    = emailRef.current?.value.trim() || '';
    const username = userRef.current?.value.trim()  || '';
    const pass     = passRef.current?.value.trim()  || '';

    setEmailError('');
    setPassError(false);

    if (!first || !email) { setEmailError('required'); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setEmailError('invalid'); return; }
    if (pass.length < 8) { setPassError(true); return; }

    setLoading(true);
    try {
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ first_name: first, last_name: last, email, username }),
      });

      const data = await res.json();

      if (res.ok) {
        const users = JSON.parse(localStorage.getItem('vivie_users') || '[]');
        users.push({ name: `${first} ${last}`.trim(), email, username, joined: new Date().toISOString() });
        localStorage.setItem('vivie_users', JSON.stringify(users));
        setCount(users.length + 247);
        setSuccess(true);
        [firstRef, lastRef, emailRef, userRef, passRef].forEach(r => { if (r.current) r.current.value = ''; });
      } else if (data.error === 'email_taken') {
        setEmailError('taken');
      } else {
        setEmailError('error');
      }
    } catch {
      setEmailError('error');
    } finally {
      setLoading(false);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent) => { if (e.key === 'Enter') doSignup(); };

  const emailPlaceholder =
    emailError === 'taken'   ? 'Email already registered' :
    emailError === 'invalid' ? 'Enter a valid email address' :
    emailError === 'error'   ? 'Something went wrong, try again' :
    'your@email.com';

  return (
    <section className="s05" id="signup">
      <div className="s05-inner rev">
        <p style={{ fontSize: 11, color: 'var(--stone)', letterSpacing: '.06em', marginBottom: 20 }}>
          <strong style={{ color: 'var(--rose-deep)', fontWeight: 600 }}>{count}</strong> people already joined
        </p>
        <span className="s00-num" style={{ display: 'block', textAlign: 'left' }}>05</span>
        <h2 className="sec-title">Let your style<br />travel further.</h2>
        <p className="sec-desc" style={{ marginBottom: 32 }}>
          Create your vivie account. Design, share, and connect with people who dress with intention.
        </p>

        <div className="form-wrap">
          <div className="fg-row">
            <div className="fg">
              <label>First Name</label>
              <input ref={firstRef} type="text" name="given-name" autoComplete="given-name" placeholder="Your name" onKeyDown={onKeyDown} />
            </div>
            <div className="fg">
              <label>Last Name</label>
              <input ref={lastRef} type="text" name="family-name" autoComplete="family-name" placeholder="Last name" onKeyDown={onKeyDown} />
            </div>
          </div>

          <div className={`fg${emailError ? ' f-err' : ''}`}>
            <label style={{ color: emailError ? '#c0392b' : undefined }}>Email</label>
            <input ref={emailRef} type="email" name="email" autoComplete="email" placeholder={emailPlaceholder} onKeyDown={onKeyDown} onChange={() => setEmailError('')} />
          </div>

          <div className="fg">
            <label>Username</label>
            <input ref={userRef} type="text" name="username" autoComplete="username" placeholder="@yourstyle" onKeyDown={onKeyDown} />
          </div>

          <div className={`fg${passError ? ' f-err' : ''}`}>
            <label style={{ color: passError ? '#c0392b' : undefined }}>Password</label>
            <input ref={passRef} type="password" name="new-password" autoComplete="new-password" placeholder="Min. 8 characters" onKeyDown={onKeyDown} onChange={() => setPassError(false)} />
          </div>

          <button className="f-submit" onClick={doSignup} disabled={loading}>
            {loading ? 'joining...' : 'Create my vivie account'}
          </button>
          <p className="f-note">Stored securely. No spam, ever.</p>

          {success && (
            <div className="f-success" style={{ display: 'block' }}>
              <p>Welcome to vivie. ✦</p>
              <small>We&apos;ll be in touch when you&apos;re up.</small>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
