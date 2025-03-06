# Farcaster Frame Implementation Prompts

## 1. **Base Frame Setup**
```text
Create a Next.js 14 Frame route handler with TypeScript using the existing template.
Features:
- Initialize /api/frame route
- Basic Frame container with meta tags for Farcaster
- Responsive viewport meta configuration
- Empty SVG canvas container (1200x630)
- Title customization using specification's branding
- Type-safe Frame state interface (empty initial state)
```

## 2. **Entry Frame Implementation**
```text
Implement the welcome frame:
- SVG background with gradient using viewport units
- Centered text layout using textMetrics API
- Primary CTA button styled with touch target sizing
- Frame state initialization
- Mobile-optimized font scaling with clamp()
- Frame post route handler for initial state
```

## 3. **Input Frame Composition**
```text
Create text input frame:
- Overlay text field on branded canvas
- Input validation middleware (140 char limit)
- Hybrid button+text input interaction
- State preservation between frames
- Sanitization filter for special characters
- Viewport-aware SVG layout (vmin units)
```

## 4. **Confirmation Frame Logic**
```text
Build confirmation UI:
- Dynamic status message component
- Animated checkmark/cross icons
- State serialization for question data
- Ephemeral storage simulation
- Post handler for final state
- Error boundary component
```

## 5. **Neynar DM Integration**
```text
Implement server-side relay:
- Neynar API client with JWT rotation
- HMAC-signed payload verification
- Metadata scrubbing middleware
- DM delivery via v2/validateMessage
- Error handling with caching headers
- Frame state hydration from session
```

## 6. **State Management Wiring**
```text
Connect frame state flow:
- Type-safe state serialization
- Encrypted session cookies
- Input validation middleware chain
- State versioning system
- Frame-to-frame data passing
- Stateless API adapter pattern
```

## 7. **Mobile Optimization Pass**
```text
Apply mobile-first enhancements:
- Touch target size adjustments
- Virtual keyboard aware layout
- Dynamic viewport unit scaling
- Mobile-safe font stack
- Hover state fallbacks
- Asset loading optimizations
```

## 8. **Security Hardening**
```text
Add protection layers:
- Input sanitization pipeline
- JWT token rotation system
- Request signature validation
- Rate limiting middleware
- Session encryption
- API response filtering
```

## Implementation Strategy Rationale

### Progressive Complexity
1. Visual foundation → 2. Interaction → 3. Data flow → 4. Integration  
Each stage builds on verified functionality while maintaining rollback capability

### Critical Path Focus
Prioritizes DM delivery chain:
Entry → Input → State → API → Confirmation  
Mobile polish and security come after core flow

### Risk Mitigation
- Ephemeral storage avoids persistence complexity
- Neynar-only integration reduces API surface
- Linear frame flow prevents state explosion
- Type-safe interfaces prevent runtime errors

### Mobile Assurance
- Viewport units handle device fragmentation
- Touch-first design prevents interaction fails
- Client-side metrics ensure render consistency
- Progressive enhancement for frame clients

Each prompt produces working, integrated code that can be immediately tested in a Frame client while maintaining forward compatibility with subsequent steps.