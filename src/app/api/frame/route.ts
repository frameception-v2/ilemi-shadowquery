import { NextRequest, NextResponse } from 'next/server'
import { PROJECT_ID, PROJECT_TITLE } from '~/lib/constants'
import { type FrameState } from '~/lib/frame-types'
import { sealData } from '@hapi/iron'

const ENCRYPTION_KEY = process.env.FRAME_ENCRYPTION_KEY || process.env.SESSION_SECRET || ''

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  // Generate initial frame state
  const initialState: FrameState = {
    version: '1.0',
    createdAt: Date.now(),
    updatedAt: Date.now(),
    sessionId: crypto.randomUUID(),
    fid: req.headers.get('x-farcaster-fid') || '',
    address: req.headers.get('x-farcaster-address') || '',
    data: {
      currentStep: 'entry',
      previousSteps: []
    }
  }

  // Encrypt and seal the session data
  const sealed = await sealData(initialState, ENCRYPTION_KEY, {
    ttl: 15 * 60 * 1000, // 15 minutes in milliseconds
    encryptionOptions: {
      algorithm: 'aes-256-cbc',
      keySalt: 'frame-session',
      ivBits: 128,
      minPasswordlength: 32
    }
  })

  // Generate response with session cookie
  const postUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/frame`;
  const imageUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/opengraph-image`;
  const response = new NextResponse(
    `
    <!DOCTYPE html>
    <html>
      <head>
        <meta property="fc:frame" content="vNext"/>
        <meta property="fc:frame:image" content="${imageUrl}"/>
        <meta property="og:image" content="${imageUrl}"/>
        <meta property="fc:frame:post_url" content="${postUrl}"/>
        <meta property="fc:frame:button:1" content="Continue"/>
      </head>
    </html>
    `.trim(),
    {
      headers: {
        "Content-Type": "text/html",
      },
    }
  )

  // Set encrypted cookie
  response.cookies.set(`${PROJECT_ID}_session`, sealed, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 15 * 60, // 15 minutes
    sameSite: 'strict',
    path: '/',
    priority: 'high'
  })

  return response
}
