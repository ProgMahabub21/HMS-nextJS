import { NextResponse, NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const sCookie = 'session';
  const session = request.cookies.get(sCookie)?.value;

  if (!session) {
    return NextResponse.next();
  }

  // Access the user's data
  const user = session;

  // Return the NextResponse object
  return NextResponse.next();
}
