import { NextRequest, NextResponse } from 'next/server'
import { PROJECT_TITLE } from '~/lib/constants'
import { type FrameState } from '~/lib/frame-types'
import { randomBytes } from 'crypto'
import { Client } from '@sodium-plus/sodium-plus'
import { sealData } from 'iron-session'

const ENCRYPTION_KEY = process.env.FRAME_ENCRYPTION_KEY || randomBytes(32).toString('hex')

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  // Generate initial frame state
  const initialState: FrameState = {
    version: '1.0',
    createdAt: Date.now(),
    updatedAt: Date.now(),
    sessionId: randomBytes(16).toString('hex'),
    fid: req.headers.get('x-farcaster-fid') || '',
    address: req.headers.get('x-farcaster-address') || ''
  }

  // Encrypt and seal the session data
  const sodium = await Client.ready()
  const sealed = await sealData(initialState, {
    password: ENCRYPTION_KEY,
    ttl: 300 // 5 minute session
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
  response.cookies.set('frame-state', sealed, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 300,
    sameSite: 'strict',
    path: '/'
  })

  return response
}
