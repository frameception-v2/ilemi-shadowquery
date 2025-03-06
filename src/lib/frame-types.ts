export interface FrameState {
  /** Version identifier for state schema compatibility */
  version: string;
  /** User's connected wallet address */
  userAddress?: string;
  /** Current frame input data */
  inputData?: {
    text: string;
    timestamp: number;
  };
  /** Timestamp of state creation */
  createdAt: number;
  /** Last updated timestamp */
  updatedAt: number;
  /** Application-specific data */
  data?: Record<string, unknown>;
}

// Versioned session data types
export interface SessionDataV1 {
  version: '1.0';
  fid: string;
  inputHistory: string[];
  sessionStartedAt: number;
}

export type FrameContext = {
  client: {
    added: boolean;
    safeAreaInsets?: {
      top: number;
      bottom: number;
      left: number;
      right: number;
    };
  };
  session?: SessionDataV1;
};
