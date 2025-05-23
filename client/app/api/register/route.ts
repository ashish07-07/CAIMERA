import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const res = await fetch('https://caimera-4.onrender.com/user/userregistration', {
      method: 'POST',
      headers: request.headers,
      body: JSON.stringify(await request.json())
    });

    const data = await res.json();
    
    return NextResponse.json(data, {
      status: res.status
    });
    
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}