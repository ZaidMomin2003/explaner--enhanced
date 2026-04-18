---
title: SaaS Explainer Video
impact: HIGH
impactDescription: generates professional 40-second SaaS product explainer videos
tags: saas, explainer, product, demo, showcase, video, narration
---

## 8-Scene Explainer Structure (40 seconds at 30fps = 1200 frames)

Every SaaS explainer video follows this proven structure:

```
Scene 1: Brand Intro        (frames 0–150,    0-5s)
Scene 2: Problem Statement   (frames 150–300,  5-10s)
Scene 3: Product Introduction (frames 300–450, 10-15s)
Scene 4: Feature Showcase 1  (frames 450–600, 15-20s)
Scene 5: Feature Showcase 2  (frames 600–750, 20-25s)
Scene 6: Feature Showcase 3  (frames 750–900, 25-30s)
Scene 7: Social Proof / Stats (frames 900–1050, 30-35s)
Scene 8: CTA + Outro         (frames 1050–1200, 35-40s)
```

## Scene Transition Pattern

Use opacity-based section visibility for smooth crossfades:

```tsx
const sectionVisible = (start, end) =>
  interpolate(frame, [start, start + 15, end - 15, end], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

const S1 = sectionVisible(0, 150);
const S2 = sectionVisible(150, 300);
// ... etc
```

## Audio Integration

### Voiceover (TTS audio from URL)
Place voiceover at the root level, spanning the full video:

```tsx
<Html5Audio src={VOICEOVER_URL} volume={0.9} />
```

### Sound Effects
Use SFX from @remotion/sfx for transitions and emphasis:

```tsx
// Whoosh on scene transitions
{frame === 150 && <Html5Audio src={SFX.whoosh} volume={0.3} />}

// UI click on button highlights
<Sequence from={1050}>
  <Html5Audio src={SFX.uiSwitch} volume={0.2} />
</Sequence>
```

### Background Music
Keep music volume low (0.1-0.15) so narration is clear:

```tsx
<Html5Audio src={MUSIC_URL} volume={0.12} loop />
```

## Brand Color Usage

Extract and use brand colors consistently:

```tsx
const BRAND_PRIMARY = "#3B82F6";   // From extracted data
const BRAND_SECONDARY = "#10B981";
const BG_COLOR = "#0B0F1A";
const TEXT_COLOR = "#F8FAFC";
const MUTED_COLOR = "#94A3B8";
```

## Screenshot / Mockup Display

Show product screenshots in device frames:

```tsx
// Browser mockup frame
<div style={{
  borderRadius: 12,
  border: "1px solid rgba(255,255,255,0.1)",
  overflow: "hidden",
  boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
}}>
  {/* Browser chrome bar */}
  <div style={{
    height: 32, backgroundColor: "#1a1a2e",
    display: "flex", alignItems: "center", gap: 6, padding: "0 12px",
  }}>
    <div style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "#ff5f57" }} />
    <div style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "#febc2e" }} />
    <div style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "#28c840" }} />
  </div>
  <Img src={SCREENSHOT_URL} style={{ width: "100%", display: "block" }} />
</div>
```

## Section Pill Component

Use consistent section labels:

```tsx
const Pill = ({ text, color, opacity }) => (
  <div style={{
    opacity, display: "flex", alignItems: "center", gap: 8,
    padding: "6px 18px", borderRadius: 100,
    border: "1px solid " + color + "33",
    backgroundColor: color + "11",
  }}>
    <div style={{
      width: 7, height: 7, borderRadius: "50%",
      backgroundColor: color, boxShadow: "0 0 8px " + color,
    }} />
    <span style={{
      fontFamily, fontSize: 14, fontWeight: 600,
      color, letterSpacing: "0.1em", textTransform: "uppercase",
    }}>{text}</span>
  </div>
);
```

## CTA Scene Pattern

End with a strong call-to-action:

```tsx
// Expanding rings animation
const rings = Array.from({ length: 3 }, (_, i) => {
  const loopFrame = (frame - CTA_START + i * 25) % 80;
  return {
    scale: interpolate(loopFrame, [0, 80], [0.3, 2.5]),
    opacity: interpolate(loopFrame, [0, 20, 80], [0, 0.12, 0]),
  };
});

// Shimmer effect on CTA button
const shimmer = interpolate(frame % 55, [0, 55], [-100, 400]);
```
