import { NextRequest, NextResponse } from 'next/server';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_KEY!;

export async function POST(req: NextRequest) {
  const { first_name, last_name, email, username } = await req.json();

  // Basic validation
  if (!first_name || !email || !username) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
  }

  const res = await fetch(`${SUPABASE_URL}/rest/v1/signups`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': SUPABASE_KEY,
      'Authorization': `Bearer ${SUPABASE_KEY}`,
      'Prefer': 'return=minimal',
    },
    body: JSON.stringify({ first_name, last_name, email, username }),
  });

  if (res.status === 201 || res.status === 200) {
    return NextResponse.json({ success: true }, { status: 201 });
  }

  if (res.status === 409) {
    return NextResponse.json({ error: 'email_taken' }, { status: 409 });
  }

  const body = await res.json().catch(() => ({}));
  return NextResponse.json({ error: body?.message || 'Signup failed' }, { status: 500 });
}
