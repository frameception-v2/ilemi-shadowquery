"use client";

import { useEffect, useCallback, useState } from "react";
import sdk, {
  AddFrame,
  SignIn as SignInCore,
} from "@farcaster/frame-sdk";
import type { FrameContext, SessionDataV1, FrameState } from "~/lib/frame-types";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "~/components/ui/card";

import { config } from "~/components/providers/WagmiProvider";
import { truncateAddress } from "~/lib/truncateAddress";
import { base, optimism } from "wagmi/chains";
import { useSession } from "next-auth/react";
import { createStore } from "mipd";
import { Label } from "~/components/ui/label";
import { PROJECT_TITLE } from "~/lib/constants";

function ExampleCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Welcome to the Frame Template</CardTitle>
        <CardDescription>
          This is an example card that you can customize or remove
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Label>Place content in a Card here.</Label>
      </CardContent>
    </Card>
  );
}

export default function Frame() {
  const [isSDKLoaded, setIsSDKLoaded] = useState(false);
  const [context, setContext] = useState<FrameContext>();
  // TODO: Implement state persistence
  const [frameState, setFrameState] = useState<FrameState>({
    version: '1.0',
    createdAt: Date.now(),
    updatedAt: Date.now(),
  });

  const [added, setAdded] = useState(false);
  const [textMetrics, setTextMetrics] = useState<{width: number; height: number}>();

  const [addFrameResult, setAddFrameResult] = useState("");

  const addFrame = useCallback(async () => {
    try {
      await sdk.actions.addFrame();
    } catch (error) {
      if (error instanceof AddFrame.RejectedByUser) {
        setAddFrameResult(`Not added: ${error.message}`);
      }

      if (error instanceof AddFrame.InvalidDomainManifest) {
        setAddFrameResult(`Not added: ${error.message}`);
      }

      setAddFrameResult(`Error: ${error}`);
    }
  }, []);

  useEffect(() => {
    const load = async () => {
      const context = await sdk.context;
      if (!context) {
        return;
      }

      setContext(context);
      setAdded(context.client.added);

      // If frame isn't already added, prompt user to add it
      if (!context.client.added) {
        addFrame();
      }

      sdk.on("frameAdded", ({ notificationDetails }) => {
        setAdded(true);
      });

      sdk.on("frameAddRejected", ({ reason }) => {
        console.log("frameAddRejected", reason);
      });

      sdk.on("frameRemoved", () => {
        console.log("frameRemoved");
        setAdded(false);
      });

      sdk.on("notificationsEnabled", ({ notificationDetails }) => {
        console.log("notificationsEnabled", notificationDetails);
      });
      sdk.on("notificationsDisabled", () => {
        console.log("notificationsDisabled");
      });

      sdk.on("primaryButtonClicked", () => {
        console.log("primaryButtonClicked");
      });

      console.log("Calling ready");
      sdk.actions.ready({});

      // Set up a MIPD Store, and request Providers.
      const store = createStore();

      // Subscribe to the MIPD Store.
      store.subscribe((providerDetails) => {
        console.log("PROVIDER DETAILS", providerDetails);
        // => [EIP6963ProviderDetail, EIP6963ProviderDetail, ...]
      });
    };
    if (sdk && !isSDKLoaded) {
      console.log("Calling load");
      setIsSDKLoaded(true);
      load();
      return () => {
        sdk.removeAllListeners();
      };
    }
  }, [isSDKLoaded, addFrame]);

  if (!isSDKLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div
      style={{
        paddingTop: context?.client.safeAreaInsets?.top ?? 0,
        paddingBottom: context?.client.safeAreaInsets?.bottom ?? 0,
        paddingLeft: context?.client.safeAreaInsets?.left ?? 0,
        paddingRight: context?.client.safeAreaInsets?.right ?? 0,
      }}
    >
      <div className="w-full h-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 1200 630"
          preserveAspectRatio="xMidYMid meet"
          width="100%"
          height="100%"
          style={{ backgroundColor: '#ffffff' }}
        >
          {/* Base canvas - will be used for all frame content */}
          {/* Responsive background gradient */}
          <linearGradient id="backgroundGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#4f46e5' }} />
            <stop offset="100%" style={{ stopColor: '#ec4899' }} />
          </linearGradient>
          <rect width="100%" height="100%" fill="url(#backgroundGradient)" />
          <g id="canvas-content">
            {/* Brand gradient for text */}
            <linearGradient id="brandGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{ stopColor: '#c026d3' }} />
              <stop offset="100%" style={{ stopColor: '#ef4444' }} />
            </linearGradient>
            
            {/* Dynamic text centering using textMetrics */}
            <text
              ref={(node) => {
                if (node) {
                  const bbox = node.getBBox();
                  setTextMetrics({
                    width: bbox.width,
                    height: bbox.height
                  });
                }
              }}
              x={textMetrics ? `${600 - textMetrics.width/2}` : "50%"}
              y={textMetrics ? `${315 + textMetrics.height/2}` : "50%"}
              textAnchor="start"
              fill="url(#brandGradient)"
              style={{
                fontFamily: 'Nunito, sans-serif',
                fontSize: 'clamp(32px, 5vw, 64px)',
                fontWeight: 600,
                letterSpacing: '-0.03em',
                visibility: textMetrics ? 'visible' : 'hidden'
              }}
            >
              {PROJECT_TITLE}
            </text>
          </g>
        </svg>
      </div>
    </div>
  );
}
