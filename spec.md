```markdown
# Anonymous Question Forwarder Frame Specification

## 1. OVERVIEW
### Core Functionality
- Anonymous question collection interface within Farcaster feed
- Secure message forwarding via DM from application-owned account
- User identity protection through server-side relay
- Transactionless interaction model

### UX Flow
1. **Entry Frame**: Display welcome message + "Ask Question" CTA
2. **Input Frame**: Text field overlay on branded canvas
3. **Confirmation Frame**: Visual feedback with success/failure status
4. **Metadata Scrubbing**: Remove client-side identifiers before relay

## 2. TECHNICAL REQUIREMENTS
- **Responsive Canvas**: SVG-based layout with viewport units
- **Neynar API Integration**: Server-side DM delivery via `v2/validateMessage`
- **State Management**: Frame state serialization for question persistence
- **Identity Protection**: JWT token rotation for API requests
- **Caching Strategy**: 5-minute TTL for failed delivery retries

## 3. FRAMES v2 IMPLEMENTATION
### Interactive Elements
- Dynamic SVG composition using textMetrics API
- Custom input validation (length/special character checks)
- Progressive disclosure animations

### Input Handling
- Hybrid text/button interaction model
- Client-side input sanitization
- Session-bound state encryption

### Data Management
- Ephemeral storage using Frame state serialization
- HMAC-signed payload verification
- Stateless API design pattern

## 4. MOBILE CONSIDERATIONS
### Responsive Techniques
- Viewport-relative units (vmin/vmax)
- Dynamic font scaling (clamp())
- Conditional asset loading (srcset)
- Touch-first layout hierarchy

### Interaction Patterns
- 48dp minimum touch targets
- Mobile-optimized virtual keyboard triggers
- Hover state fallbacks
- Scroll-aware element positioning

## 5. CONSTRAINTS COMPLIANCE
### Architecture Limits
- Zero-persistence model (no DB/store)
- Pure API relay (no blockchain ops)
- Neynar-only external dependency
- Single-tenant design

### Complexity Controls
- Linear interaction path (3-frame max)
- No auth requirements
- No transaction flows
- No cross-chain dependencies

### Prototype Priorities
- 90% solution focused on core DM relay
- Basic error handling (no retry logic)
- Minimal input validation
- Single-channel delivery (no fallbacks)
```

This specification focuses on achieving core functionality while respecting Farcaster's technical constraints and mobile-first reality. The design leverages Frame v2's enhanced capabilities for direct user input handling while maintaining necessary anonymity through server-side relay patterns.