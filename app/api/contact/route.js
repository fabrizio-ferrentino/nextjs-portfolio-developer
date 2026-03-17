import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// Mock API endpoints for portfolio contact form
export async function GET(request) {
  const { pathname } = new URL(request.url);

  if (pathname.includes('/api/health')) {
    return NextResponse.json({
      status: 'ok',
      message: 'Portfolio API is running',
      timestamp: new Date().toISOString()
    });
  }

  return NextResponse.json({ message: 'Portfolio API' });
}

export async function POST(request) {
  const { pathname } = new URL(request.url);

  if (pathname.includes('/api/contact')) {
    try {
      const body = await request.json();
      const { name, email, subject, message } = body;

      // Basic validation
      if (!name || !email || !subject || !message) {
        return NextResponse.json(
          { error: 'All fields are required' },
          { status: 400 }
        );
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return NextResponse.json(
          { error: 'Invalid email format' },
          { status: 400 }
        );
      }

      // Invia email con Resend
      await resend.emails.send({
        from: 'delivered@resend.dev',
        to: 'hello@alexrivera.dev',
        subject: `Subject`,
        html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong><br/>${message}</p>
      `,
      });

      return NextResponse.json({success: true});
    } catch (error) {
      console.error('Contact form error:', error);
      return NextResponse.json(
        { error: 'Failed to process message' },
        { status: 500 }
      );
    }
  }

  return NextResponse.json(
    { error: 'Endpoint not found' },
    { status: 404 }
  );
}