# Styling Debug Guide

## What Was Fixed

1. **Tailwind CSS v4 Import** - Updated to use correct `@import "tailwindcss"` syntax
2. **Removed Prose Classes** - Changed from `prose` to standard Tailwind utilities
3. **CSS Custom Properties** - All theme colors use CSS variables for dynamic theming

## Expected UI Appearance

### Default Theme (No domain parameter)
- **Header**: Blue background (#3B82F6)
- **Background**: White (#FFFFFF)
- **Text**: Dark gray (#1F2937)
- **User Messages**: Light blue background (#EFF6FF)
- **Assistant Messages**: Light gray background (#F9FAFB)

### Mahabharata Theme (?domain=mahabharata)
- **Header**: Saffron/Orange background (#FF6B35)
- **Background**: Warm cream (#FFF8E7)
- **Text**: Dark brown (#2C1810)
- **User Messages**: Light orange (#FFE4CC)
- **Assistant Messages**: White
- **Fonts**: Cinzel (headings), Lora (body)

### Bible Theme (?domain=bible)
- **Header**: Heavenly blue (#4A90E2)
- **Background**: Beige (#F5F5DC)
- **Text**: Dark slate gray (#2F4F4F)
- **User Messages**: Light blue (#E6F2FF)
- **Assistant Messages**: White
- **Fonts**: Crimson Text (headings), EB Garamond (body)

### Quran Theme (?domain=quran)
- **Header**: Islamic green (#006B3F)
- **Background**: Mint cream (#F0F8F0)
- **Text**: Dark green (#1B4332)
- **User Messages**: Light green (#E8F5E9)
- **Assistant Messages**: White
- **Fonts**: Amiri (headings), Noto Naskh Arabic (body)

## How to Debug Styling

### 1. Clear Cache & Rebuild
```bash
rm -rf .next
npm run build
npm start
```

### 2. Check Browser Console
Open DevTools (F12) and look for:
- CSS errors
- Failed font loads
- Missing Tailwind classes

### 3. Verify CSS Variables
In DevTools Elements tab, check `<div>` with theme styles:
```css
--color-primary: #FF6B35
--color-background: #FFF8E7
--font-heading: "Cinzel", serif
```

### 4. Check Network Tab
Verify Google Fonts are loading:
- Cinzel
- Lora
- Crimson Text
- EB Garamond
- Amiri
- Noto Naskh Arabic

## Common Issues

### Issue: Styles not applying
**Solution**: Make sure Tailwind is processing the CSS
```bash
npm run dev
# Check terminal for PostCSS/Tailwind output
```

### Issue: Colors not changing with theme
**Solution**: Check ThemeProvider is wrapping the app
```tsx
// src/app/page.tsx should have:
<ThemeProvider domainId={domain}>
  <ChatContainer domain={domain} />
</ThemeProvider>
```

### Issue: Fonts not loading
**Solution**: 
1. Check browser Network tab for font requests
2. Google Fonts might be blocked by firewall
3. Try using local fonts instead

### Issue: Layout is broken
**Solution**:
1. Verify Tailwind classes: `flex`, `flex-col`, `h-screen`
2. Check for conflicting CSS
3. Inspect element in DevTools to see computed styles

## Manual Style Test

Add this to any component to test if Tailwind is working:
```tsx
<div className="bg-red-500 text-white p-4">
  Tailwind Test - Should be red background, white text, padding
</div>
```

## Quick Visual Check

Run dev server and visit:
```bash
npm run dev
# Visit: http://localhost:3000

# Should see:
# ✓ Blue header with "Knowledge Assistant"
# ✓ White background
# ✓ Welcome message centered
# ✓ Input box at bottom
```

Then test themes:
```bash
# Mahabharata - Orange/saffron theme
http://localhost:3000?domain=mahabharata

# Bible - Blue theme
http://localhost:3000?domain=bible

# Quran - Green theme
http://localhost:3000?domain=quran
```
