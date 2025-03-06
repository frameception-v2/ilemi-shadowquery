import { ImageResponse } from "next/og";
import { PROJECT_TITLE } from "~/lib/constants";

export const dynamic = "force-dynamic";

export async function POST() {
  const postUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/frame`;
  const imageUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/opengraph-image`;

  return new Response(
    `
      <!DOCTYPE html>
      <html>
        <head>
          <meta property="fc:frame" content="vNext" />
          <meta property="fc:frame:post_url" content="${postUrl}" />
          <meta property="fc:frame:image" content="${imageUrl}" />
          <meta property="og:image" content="${imageUrl}" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        </head>
        <body></body>
      </html>
    `.trim(),
    {
      headers: {
        "Content-Type": "text/html",
      },
    }
  );
}
