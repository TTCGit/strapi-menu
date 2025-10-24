# 🎯 Strapi Menu Project - 5 React Challenges

Based on **John Smilga's React Tutorial - Section 6: Context API & useRef (Lecture 144)**

---

## ✅ What You've Completed

- ✅ Fixed `onMouseLeave` bug (set `pageId` to `null`)
- ✅ Basic Context API setup with `AppContext`
- ✅ State management: `active`, `pageId`
- ✅ Submenu shows/hides based on hover
- ✅ Sidebar toggles with hamburger menu
- ✅ Navigation buttons trigger submenu

---

## 📚 React Concepts at Your Level (Lecture 144)

- `useContext` - Sharing state across components
- `useRef` - DOM references and persistent values
- `useEffect` - Side effects and cleanup
- `useState` - Managing component state
- `.map()`, `.find()` - Array methods
- Event handlers - `onClick`, `onMouseEnter`, `onMouseLeave`
- Conditional rendering - `&&`, ternary operators

---

## 🎨 Stripe-Style Submenu Design (Your Goal)

```
┌─────────────────────────────────────────────────────────────────┐
│  STRAPI            [Products] [Solutions] [Resources] [Company]  │
│                                                                   │
│              ┌──────────────────────────────────────┐            │
│              │ PRODUCTS                             │            │
│              │ ┌─────────────────┬────────────────┐│            │
│              │ │  Links Section  │ Featured Widget││            │
│              │ │                 │                ││            │
│              │ │ 📄 Management   │  🚀 NEW!       ││            │
│              │ │ ☁️  Assets      │                ││            │
│              │ │ 👥 Auth         │  Content API   ││            │
│              │ │ ⚙️  Webhooks    │  v2.0          ││            │
│              │ │ 💾 Database     │                ││            │
│              │ │ 📊 Analytics    │  Faster, more  ││            │
│              │ │                 │  powerful      ││            │
│              │ │                 │                ││            │
│              │ │                 │  [Learn More→] ││            │
│              │ └─────────────────┴────────────────┘│            │
│              │                                      │            │
│              │ [Explore all products →]            │            │
│              └──────────────────────────────────────┘            │
└─────────────────────────────────────────────────────────────────┘

KEY LAYOUT:
- Left side: Grid of links (2 columns if 4+ items)
- Right side: Featured widget card with icon, title, description, CTA
- Bottom: Full-width CTA button
```

---

## 🚀 Your 5 React Challenges

### **Challenge 1: Sidebar Navigation with Context API** ⭐
**Focus:** Array `.map()`, Context API, Event handlers

**Goal:** Populate your sidebar with dynamic navigation using `sidebarLinks` data.

**React Tasks:**
1. Import `sidebarLinks` from `data.jsx` into `Sidebar.jsx`
2. Import `useGlobalContext` to access `handleActive`
3. Use `.map()` to render each link:
```jsx
{sidebarLinks.map((link) => {
  const { id, page, url } = link;
  return (
    <a 
      key={id} 
      href={url}
      onClick={handleActive}
    >
      {page}
    </a>
  );
})}
```
4. Make "sign in" link look different (check if `page === "sign in"`)
5. Clicking any link should close the sidebar

**React Learning:**
- Why do we need `key` prop when mapping?
- How does `handleActive` from context close the sidebar?
- Where is the `active` state stored?

---

### **Challenge 2: Featured Widget with Object Lookup** ⭐⭐
**Focus:** `.find()`, Dynamic object access, Conditional rendering

**Goal:** Add a featured widget card to your submenu (right side) that changes based on hovered menu.

**React Tasks:**
1. Import `submenuWidgets` from `data.jsx` into `Submenu.jsx`
2. Find the current page using `.find()`:
```jsx
const currentPage = sublinks.find((item) => item.pageId === pageId);
const currentWidget = submenuWidgets[currentPage?.page];
```
3. Create a new section in your submenu for the widget (right side)
4. Conditionally render the widget:
```jsx
{currentWidget?.featured && (
  <div>
    <span>{currentWidget.featured.icon}</span>
    <h4>{currentWidget.featured.title}</h4>
    <p>{currentWidget.featured.description}</p>
    <a href={currentWidget.featured.url}>Learn More →</a>
  </div>
)}
```
5. Add the CTA button at the bottom:
```jsx
{currentWidget?.cta && (
  <a href={currentWidget.cta.url}>
    {currentWidget.cta.title} →
  </a>
)}
```

**React Learning:**
- What does `?.` (optional chaining) do?
- Why use `object[variable]` instead of `object.variable`?
- Why use `.find()` instead of `.filter()` or `.map()`?

---

### **Challenge 3: useRef - Click Outside to Close** ⭐⭐⭐
**Focus:** `useRef`, `useEffect`, Event listeners, Cleanup

**Goal:** Close the submenu when clicking anywhere outside the header (important UX!).

**React Tasks:**
1. In `Header.jsx`, create a ref:
```jsx
import { useRef, useEffect } from 'react';
import { useGlobalContext } from '../context/AppContext';

const Header = () => {
  const headerRef = useRef(null);
  const { setPageId } = useGlobalContext();
```

2. Attach ref to the header container:
```jsx
<div ref={headerRef} className="...">
```

3. Add `useEffect` to detect outside clicks:
```jsx
useEffect(() => {
  const handler = (e) => {
    if (headerRef.current && !headerRef.current.contains(e.target)) {
      setPageId(null);
    }
  };
  
  document.addEventListener('mousedown', handler);
  
  return () => {
    document.removeEventListener('mousedown', handler);
  };
}, [setPageId]);
```

**React Learning:**
- Why use `useRef` instead of `useState` for DOM references?
- What does `.contains()` check?
- Why do we need the cleanup function (return statement)?
- What happens if we forget to remove the event listener?

---

### **Challenge 4: useRef with Timeout - Delayed Close** ⭐⭐⭐
**Focus:** `useRef` for persistent values, `setTimeout`, Cleanup

**Goal:** Add a 300ms delay before closing the submenu (prevents accidental closure).

**React Tasks:**
1. In `Header.jsx`, create a ref for the timeout:
```jsx
const timeoutRef = useRef(null);
```

2. Add `onMouseLeave` to the header container:
```jsx
const handleMouseLeave = () => {
  timeoutRef.current = setTimeout(() => {
    setPageId(null);
  }, 300);
};
```

3. Add `onMouseEnter` to cancel the timeout:
```jsx
const handleMouseEnter = () => {
  clearTimeout(timeoutRef.current);
};
```

4. Apply to your header div:
```jsx
<div 
  ref={headerRef}
  onMouseEnter={handleMouseEnter}
  onMouseLeave={handleMouseLeave}
  className="..."
>
```

5. Clean up on unmount:
```jsx
useEffect(() => {
  return () => {
    clearTimeout(timeoutRef.current);
  };
}, []);
```

**React Learning:**
- Why use `useRef` instead of `let timeout = null`?
- What happens to regular variables when component re-renders?
- Why doesn't updating `timeoutRef.current` cause a re-render?
- What's the difference between `useRef` for DOM elements vs values?

---

### **Challenge 5: Overlay Component with Context** ⭐⭐
**Focus:** Component creation, Context API, Conditional rendering

**Goal:** Create a dark overlay that appears when sidebar is open (better UX and focus).

**React Tasks:**
1. Create new file: `src/Overlay/Overlay.jsx`
```jsx
import { useGlobalContext } from "../context/AppContext";

const Overlay = () => {
  const { active, handleActive } = useGlobalContext();
  
  // Don't render if sidebar is closed
  if (!active) return null;
  
  return (
    <div 
      onClick={handleActive}
      className="fixed inset-0 bg-black/50 z-40"
    />
  );
};

export default Overlay;
```

2. Import and add to `App.jsx`:
```jsx
import Overlay from "./Overlay/Overlay";

function App() {
  return (
    <div>
      <Header />
      <Overlay />  {/* Add this */}
      <Sidebar />
      <Hero />
    </div>
  );
}
```

**React Learning:**
- Why use early return (`if (!active) return null`) instead of conditional JSX?
- How does the component know when `active` changes?
- Where should Overlay be in the component tree? Why?
- What's the benefit of a separate component vs inline conditional?

---

## 🎵 BONUS: Music Player Challenge

Want to practice more `useContext` and `useRef`? 

**Check out:** `MUSIC-PLAYER-GUIDE.md` for a detailed step-by-step tutorial with console logs!

This bonus teaches:
- Creating multiple contexts
- Using `useRef` with HTML audio elements
- Keyboard event listeners with `useEffect`

---

## 📚 React Patterns You're Mastering

### **Context API**
- ✅ Creating context with `createContext()`
- ✅ Custom hooks for context access
- ✅ Providing values to component tree
- ✅ Consuming context in multiple components
- ✅ Multiple context providers (nesting)

### **useRef Hook**
- ✅ Referencing DOM elements
- ✅ Storing mutable values (timeouts, intervals)
- ✅ Controlling audio/video elements
- ✅ Persisting values across renders without re-renders
- ✅ Difference: useRef vs useState

### **useEffect Hook**
- ✅ Adding/removing event listeners
- ✅ Cleanup functions (prevent memory leaks)
- ✅ Dependency arrays (what to include)
- ✅ Running code after render

### **Component Patterns**
- ✅ Conditional rendering (early return, `&&`, ternary)
- ✅ Component composition
- ✅ Props vs Context (when to use each)
- ✅ Extracting reusable components

### **Data & Array Methods**
- ✅ `.map()` for rendering lists
- ✅ `.find()` for finding single items
- ✅ Destructuring objects
- ✅ Optional chaining (`?.`)
- ✅ Dynamic property access (`object[key]`)

---

## 💡 Tips for Success

1. **Console.log Everything:** Log context values, refs, state to understand data flow
2. **React DevTools:** Inspect context values, component tree, props
3. **One Challenge at a Time:** Complete before moving to next
4. **Ask Why:** Understand WHY each pattern is used, not just HOW
5. **Break Things:** Intentionally remove code to see what breaks (learn by doing!)
6. **Read Error Messages:** React errors are helpful - read them carefully

---

## 📦 Data Summary

Your `data.jsx` now includes:

1. **`sublinks`** - Menu items with links (products, solutions, resources, company, pricing)
2. **`sidebarLinks`** - Sidebar navigation items
3. **`submenuWidgets`** - Featured widgets for each submenu
4. **`musicTracks`** (bonus) - Sample tracks for music player

All ready to use! 🚀

---

## 🎯 After These Challenges, You'll Understand:

- ✅ How Context API eliminates prop drilling
- ✅ When to use `useRef` vs `useState`
- ✅ How refs provide direct access to DOM elements
- ✅ Why cleanup functions prevent memory leaks
- ✅ How multiple contexts work together
- ✅ Component composition and reusability patterns
- ✅ Event listener lifecycle in React
- ✅ Conditional rendering best practices

**These are the exact patterns John teaches in Section 6!** 🎓

Good luck, and happy coding! 💙
