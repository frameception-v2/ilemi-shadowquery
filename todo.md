- [x] Initialize /api/frame route with Next.js 14 template including Farcaster meta tags and viewport config (Base)  
*User outcome: Basic frame endpoint responds with valid HTML structure*

- [x] Create responsive SVG canvas container (1200x630) with proper XML namespaces (Base)  
*User outcome: Empty canvas renders correctly in frame clients*

- [x] Implement dynamic title component with brand-approved typography in SVG (Base)  
*User outcome: Branded headline appears centered in frame previews*

- [x] Define FrameState interface with versioned session data types (Base)  
*User outcome: Type-safe state available for all frame handlers*

- [x] Build gradient background layer using linearGradient SVG element with viewport units (Entry)  
*User outcome: Entry frame shows responsive color transition background*

- [ ] Implement text centering logic using textMetrics API for SVG (Entry)  
*User outcome: Welcome message stays vertically/horizontally centered*

- [ ] Create primary CTA button with 44x44px minimum touch target (Entry)  
*User outcome: Mobile users can reliably tap initial action button*

- [ ] Set up frame post handler with initial state generation (Entry)  
*User outcome: First interaction creates encrypted session cookie*

- [ ] Configure CSS clamp() for dynamic font scaling across devices (Entry)  
*User outcome: Text remains legible on small screens*

- [ ] Add text input overlay positioned with viewport-aware coordinates (Input)  
*User outcome: Virtual keyboard doesn't obscure input field*

- [ ] Create validation chain for text length and content type (Input)  
*User outcome: Invalid inputs show user-friendly errors*

- [ ] Implement combined text submission via button click (Input)  
*User outcome: Users can either type+send or click to proceed*

- [ ] Wire frame state persistence through post handler middleware (Input)  
*User outcome: Input data survives frame transitions*

- [ ] Add regex filter removing non-printable Unicode characters (Input)  
*User outcome: Clean text data enters processing pipeline*

- [ ] Build status message component with animated icon transitions (Confirmation)  
*User outcome: Users get clear success/failure feedback*

- [ ] Implement ephemeral storage simulation using signed cookies (Confirmation)  
*User outcome: Session data survives brief network interruptions*

- [ ] Set up Neynar client with auto-refreshing JWT credentials (Neynar)  
*User outcome: API stays authenticated during long sessions*

- [ ] Create HMAC validation middleware for webhook requests (Neynar)  
*User outcome: Only valid Farcaster messages get processed*

- [ ] Implement state hydration from encrypted cookies before API calls (Neynar)  
*User outcome: DMs contain complete user-provided data*

- [ ] Add rate limiter with IP+fid dual tracking (Security)  
*User outcome: System prevents API abuse attempts*
