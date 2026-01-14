import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// Simple in-memory waitlist for now (will be replaced with database when it's set up)
let memoryWaitlist: Array<{ email: string; userId: string | null; createdAt: string }> = [];

export async function POST(request: NextRequest) {
  try {
    const { email, userId } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Check for duplicates in memory
    const existingEntry = memoryWaitlist.find(entry => entry.email === normalizedEmail);
    if (existingEntry) {
      return NextResponse.json({ message: 'Already on waitlist' }, { status: 200 });
    }

    // Add to memory waitlist
    const newEntry = {
      email: normalizedEmail,
      userId: userId || null,
      createdAt: new Date().toISOString(),
    };

    memoryWaitlist.push(newEntry);

    // Log for development (will be replaced with proper database logging)
    if (process.env.NODE_ENV === 'development') {
      console.log('Added to waitlist:', newEntry.email);
      console.log('Current waitlist size:', memoryWaitlist.length);
    }

    return NextResponse.json({ message: 'Added to waitlist', data: newEntry }, { status: 201 });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Helper endpoint to see current waitlist (for development)
export async function GET() {
  return NextResponse.json({
    count: memoryWaitlist.length,
    entries: memoryWaitlist.map(({ email, createdAt }) => ({ email, createdAt }))
  });
}