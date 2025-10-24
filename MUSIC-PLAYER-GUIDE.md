# 🎵 Music Player Tutorial - Step by Step

**Practice:** `useContext`, `useRef`, `useEffect`  
**Level:** Section 6 - Lecture 144  
**Time:** ~45 minutes

---

## 🎯 What You'll Build

A music player section below your hero that lets users:
- Select and play tracks
- Control playback (play/pause)
- Use spacebar for controls (like Spotify!)

**Key React Concepts:**
- Multiple Context Providers
- `useRef` with HTML5 Audio API
- `useEffect` for event listeners
- State management across components

---

## 📋 Step 1: Add Music Data

**Goal:** Add sample music tracks to your data file.

### 1.1 Open `src/data/data.jsx`

### 1.2 Add at the very bottom (before `export default sublinks;`):

```javascript
// Music tracks for the player
export const musicTracks = [
  {
    id: nanoid(),
    title: "Strapi Theme Song",
    artist: "The Developers",
    duration: "3:45",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  },
  {
    id: nanoid(),
    title: "Code & Coffee",
    artist: "React Beats",
    duration: "4:20",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
  },
  {
    id: nanoid(),
    title: "API Harmony",
    artist: "Backend Symphony",
    duration: "3:15",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
  },
];
```

### 1.3 Test the data

Open your browser console and temporarily add to any component:

```javascript
import { musicTracks } from "../data/data";

// In your component
console.log("🎵 Music Tracks:", musicTracks);
```

**Expected Console Output:**
```
🎵 Music Tracks: Array(3)
  0: {id: "abc123", title: "Strapi Theme Song", artist: "The Developers", ...}
  1: {id: "def456", title: "Code & Coffee", ...}
  2: {id: "ghi789", title: "API Harmony", ...}
```

✅ **Checkpoint:** You should see 3 tracks with unique IDs, titles, and artists.

---

## 📋 Step 2: Create Music Context

**Goal:** Create a separate context to manage music player state.

### 2.1 Create new file: `src/context/MusicContext.jsx`

### 2.2 Start with the basic structure:

```javascript
import { createContext, useContext, useState } from "react";

// 1. Create the context
const MusicContext = createContext();

// 2. Custom hook for easy access
export const useMusicContext = () => useContext(MusicContext);

// 3. Provider component
const MusicContextProvider = ({ children }) => {
  console.log("🎵 MusicContext: Provider is rendering");
  
  return (
    <MusicContext.Provider value={{}}>
      {children}
    </MusicContext.Provider>
  );
};

export default MusicContextProvider;
```

### 2.3 Add state for playing status:

```javascript
const MusicContextProvider = ({ children }) => {
  console.log("🎵 MusicContext: Provider is rendering");
  
  // Track if music is currently playing
  const [isPlaying, setIsPlaying] = useState(false);
  
  console.log("🎵 isPlaying state:", isPlaying);
  
  return (
    <MusicContext.Provider value={{ isPlaying, setIsPlaying }}>
      {children}
    </MusicContext.Provider>
  );
};
```

### 2.4 Add state for current track:

```javascript
const MusicContextProvider = ({ children }) => {
  console.log("🎵 MusicContext: Provider is rendering");
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);
  
  console.log("🎵 isPlaying:", isPlaying);
  console.log("🎵 currentTrack:", currentTrack);
  
  return (
    <MusicContext.Provider 
      value={{ 
        isPlaying, 
        setIsPlaying, 
        currentTrack, 
        setCurrentTrack 
      }}
    >
      {children}
    </MusicContext.Provider>
  );
};
```

### 2.5 Wrap your app with the provider

Open `src/main.jsx` and update:

```javascript
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import AppContext from "./context/AppContext.jsx";
import MusicContextProvider from "./context/MusicContext.jsx"; // Add this

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppContext>
      <MusicContextProvider>
        <App />
      </MusicContextProvider>
    </AppContext>
  </StrictMode>
);
```

**Expected Console Output:**
```
🎵 MusicContext: Provider is rendering
🎵 isPlaying: false
🎵 currentTrack: null
```

✅ **Checkpoint:** You should see the context provider rendering with initial state.

**React Learning:** Notice how you can nest multiple providers! `AppContext` wraps `MusicContextProvider` wraps `App`.

---

## 📋 Step 3: Add useRef for Audio Element

**Goal:** Add a ref to control the HTML5 audio element.

### 3.1 Import useRef:

```javascript
import { createContext, useContext, useState, useRef } from "react";
```

### 3.2 Create the audio ref in your provider:

```javascript
const MusicContextProvider = ({ children }) => {
  console.log("🎵 MusicContext: Provider is rendering");
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);
  
  // Create ref for audio element
  const audioRef = useRef(null);
  
  console.log("🎵 isPlaying:", isPlaying);
  console.log("🎵 currentTrack:", currentTrack);
  console.log("🎵 audioRef.current:", audioRef.current); // Will be null initially
  
  return (
    <MusicContext.Provider 
      value={{ 
        isPlaying, 
        setIsPlaying, 
        currentTrack, 
        setCurrentTrack,
        audioRef  // Add this
      }}
    >
      {children}
    </MusicContext.Provider>
  );
};
```

**Expected Console Output:**
```
🎵 MusicContext: Provider is rendering
🎵 isPlaying: false
🎵 currentTrack: null
🎵 audioRef.current: null  ← null because audio element doesn't exist yet
```

✅ **Checkpoint:** `audioRef.current` is `null` for now (we'll attach it to the `<audio>` element later).

**React Learning:** `useRef` creates a mutable object that persists across renders. It's perfect for storing references to DOM elements!

---

## 📋 Step 4: Add Control Functions

**Goal:** Create functions to control playback.

### 4.1 Add the `changeTrack` function:

```javascript
const MusicContextProvider = ({ children }) => {
  console.log("🎵 MusicContext: Provider is rendering");
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);
  const audioRef = useRef(null);
  
  // Function to change the current track
  const changeTrack = (track) => {
    console.log("🎵 changeTrack called with:", track);
    setCurrentTrack(track);
    setIsPlaying(false); // Stop playing when changing tracks
    console.log("🎵 Track changed to:", track.title);
  };
  
  console.log("🎵 isPlaying:", isPlaying);
  console.log("🎵 currentTrack:", currentTrack);
  
  return (
    <MusicContext.Provider 
      value={{ 
        isPlaying, 
        setIsPlaying, 
        currentTrack, 
        setCurrentTrack,
        audioRef,
        changeTrack  // Add this
      }}
    >
      {children}
    </MusicContext.Provider>
  );
};
```

### 4.2 Add the `togglePlay` function:

```javascript
const MusicContextProvider = ({ children }) => {
  console.log("🎵 MusicContext: Provider is rendering");
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);
  const audioRef = useRef(null);
  
  const changeTrack = (track) => {
    console.log("🎵 changeTrack called with:", track);
    setCurrentTrack(track);
    setIsPlaying(false);
    console.log("🎵 Track changed to:", track.title);
  };
  
  // Function to play/pause the audio
  const togglePlay = () => {
    console.log("🎵 togglePlay called");
    console.log("🎵 audioRef.current:", audioRef.current);
    
    if (audioRef.current) {
      if (isPlaying) {
        console.log("🎵 Pausing audio");
        audioRef.current.pause();
      } else {
        console.log("🎵 Playing audio");
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    } else {
      console.warn("⚠️ audioRef.current is null - audio element not attached yet");
    }
  };
  
  console.log("🎵 isPlaying:", isPlaying);
  console.log("🎵 currentTrack:", currentTrack);
  
  return (
    <MusicContext.Provider 
      value={{ 
        isPlaying,
        currentTrack,
        audioRef,
        changeTrack,
        togglePlay  // Add this
      }}
    >
      {children}
    </MusicContext.Provider>
  );
};
```

✅ **Checkpoint:** Your context now has all the functions needed to control music playback!

**React Learning:** Notice how `togglePlay` uses `audioRef.current` to directly control the audio element using the Web Audio API methods (`.play()`, `.pause()`).

---

## 📋 Step 5: Create Music Player Component (Basic Structure)

**Goal:** Create the component that will display tracks.

### 5.1 Create folder and file: `src/MusicPlayer/MusicPlayer.jsx`

### 5.2 Start with basic structure:

```javascript
import { useMusicContext } from "../context/MusicContext";
import { musicTracks } from "../data/data";

const MusicPlayer = () => {
  console.log("🎵 MusicPlayer: Component rendering");
  
  // Get values from context
  const { isPlaying, currentTrack, audioRef, togglePlay, changeTrack } = 
    useMusicContext();
  
  console.log("🎵 MusicPlayer - isPlaying:", isPlaying);
  console.log("🎵 MusicPlayer - currentTrack:", currentTrack);
  console.log("🎵 MusicPlayer - musicTracks:", musicTracks);
  
  return (
    <section className="bg-gray-900 text-white py-20 px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold mb-8">Featured Tracks</h2>
        <p>Music player coming soon...</p>
      </div>
    </section>
  );
};

export default MusicPlayer;
```

### 5.3 Add to `App.jsx`:

```javascript
import Header from "./components/Header/Header";
import Hero from "./Hero/Hero";
import Sidebar from "./Sidebar/Sidebar";
import MusicPlayer from "./MusicPlayer/MusicPlayer";  // Add this

function App() {
  return (
    <div>
      <Header />
      <Sidebar />
      <Hero />
      <MusicPlayer />  {/* Add this */}
    </div>
  );
}

export default App;
```

**Expected Console Output:**
```
🎵 MusicPlayer: Component rendering
🎵 MusicPlayer - isPlaying: false
🎵 MusicPlayer - currentTrack: null
🎵 MusicPlayer - musicTracks: Array(3)
```

✅ **Checkpoint:** You should see a dark section below your hero with "Featured Tracks" heading.

---

## 📋 Step 6: Display Track List

**Goal:** Map through tracks and display them.

### 6.1 Add the track list:

```javascript
const MusicPlayer = () => {
  console.log("🎵 MusicPlayer: Component rendering");
  
  const { isPlaying, currentTrack, audioRef, togglePlay, changeTrack } = 
    useMusicContext();
  
  console.log("🎵 MusicPlayer - isPlaying:", isPlaying);
  console.log("🎵 MusicPlayer - currentTrack:", currentTrack);
  
  return (
    <section className="bg-gray-900 text-white py-20 px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold mb-8">Featured Tracks</h2>
        
        {/* Track List */}
        <div className="grid gap-4 mb-8">
          {musicTracks.map((track) => {
            console.log("🎵 Rendering track:", track.title);
            
            return (
              <div 
                key={track.id}
                className="bg-gray-800 p-4 rounded-lg flex justify-between items-center hover:bg-gray-700 transition"
              >
                <div>
                  <h3 className="font-semibold">{track.title}</h3>
                  <p className="text-gray-400 text-sm">{track.artist} • {track.duration}</p>
                </div>
                <button
                  onClick={() => {
                    console.log("🎵 Play button clicked for:", track.title);
                    changeTrack(track);
                  }}
                  className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg transition"
                >
                  ▶ Play
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
```

**Expected Console Output:**
```
🎵 MusicPlayer: Component rendering
🎵 Rendering track: Strapi Theme Song
🎵 Rendering track: Code & Coffee
🎵 Rendering track: API Harmony
```

**When you click a Play button:**
```
🎵 Play button clicked for: Code & Coffee
🎵 changeTrack called with: {id: "...", title: "Code & Coffee", ...}
🎵 Track changed to: Code & Coffee
```

✅ **Checkpoint:** You should see 3 tracks listed. Clicking "Play" should log to console.

---

## 📋 Step 7: Add Audio Element with useRef

**Goal:** Create the actual audio element and attach the ref to it.

### 7.1 Add the audio element (after the track list):

```javascript
return (
  <section className="bg-gray-900 text-white py-20 px-8">
    <div className="max-w-7xl mx-auto">
      <h2 className="text-4xl font-bold mb-8">Featured Tracks</h2>
      
      {/* Track List */}
      <div className="grid gap-4 mb-8">
        {musicTracks.map((track) => (
          <div 
            key={track.id}
            className="bg-gray-800 p-4 rounded-lg flex justify-between items-center hover:bg-gray-700 transition"
          >
            <div>
              <h3 className="font-semibold">{track.title}</h3>
              <p className="text-gray-400 text-sm">{track.artist} • {track.duration}</p>
            </div>
            <button
              onClick={() => {
                console.log("🎵 Play button clicked for:", track.title);
                changeTrack(track);
              }}
              className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg transition"
            >
              ▶ Play
            </button>
          </div>
        ))}
      </div>
      
      {/* Audio Element - Hidden but functional */}
      {currentTrack && (
        <>
          <audio
            ref={audioRef}
            src={currentTrack.url}
            onLoadedData={() => {
              console.log("🎵 Audio loaded:", currentTrack.title);
              console.log("🎵 audioRef.current:", audioRef.current);
            }}
            onEnded={() => {
              console.log("🎵 Track ended");
              setIsPlaying(false);
            }}
          />
          <p className="text-sm text-gray-500 mb-4">
            Audio element attached for: {currentTrack.title}
          </p>
        </>
      )}
    </div>
  </section>
);
```

### 7.2 Import setIsPlaying if needed:

Since we're using `setIsPlaying` in the `onEnded` callback, we need access to it. Update your context destructuring:

```javascript
const { isPlaying, currentTrack, audioRef, togglePlay, changeTrack, setIsPlaying } = 
  useMusicContext();
```

**When you click a Play button now:**
```
🎵 Play button clicked for: Code & Coffee
🎵 changeTrack called with: {id: "...", title: "Code & Coffee", ...}
🎵 Track changed to: Code & Coffee
🎵 Audio loaded: Code & Coffee
🎵 audioRef.current: <audio src="..."></audio>
```

✅ **Checkpoint:** Clicking "Play" should show "Audio element attached for: [track name]" and log that audio is loaded.

**React Learning:** The `ref={audioRef}` attaches the audio element to `audioRef.current`. Now `audioRef.current` points to the actual DOM element!

---

## 📋 Step 8: Add Now Playing Display with Play/Pause

**Goal:** Show the current track and add a working play/pause button.

### 8.1 Add the "Now Playing" section (after the audio element):

```javascript
{/* Now Playing Section */}
{currentTrack && (
  <div className="bg-gray-800 p-6 rounded-lg">
    <p className="text-sm text-gray-400 mb-2">Now Playing</p>
    <h3 className="text-2xl font-bold mb-1">{currentTrack.title}</h3>
    <p className="text-gray-400 mb-4">{currentTrack.artist}</p>
    
    <button
      onClick={() => {
        console.log("🎵 Play/Pause button clicked");
        console.log("🎵 Current isPlaying state:", isPlaying);
        togglePlay();
      }}
      className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-lg text-lg font-semibold transition"
    >
      {isPlaying ? "⏸ Pause" : "▶ Play"}
    </button>
  </div>
)}
```

**When you click the Play button in "Now Playing":**
```
🎵 Play/Pause button clicked
🎵 Current isPlaying state: false
🎵 togglePlay called
🎵 audioRef.current: <audio>
🎵 Playing audio
```

**Then if you click Pause:**
```
🎵 Play/Pause button clicked
🎵 Current isPlaying state: true
🎵 togglePlay called
🎵 Pausing audio
```

✅ **Checkpoint:** You should be able to play and pause music! The button text should change between "▶ Play" and "⏸ Pause".

---

## 📋 Step 9: Update Track List Buttons

**Goal:** Make the track list buttons show play/pause for the current track.

### 9.1 Update the button logic in your track list:

```javascript
<button
  onClick={() => {
    console.log("🎵 Track button clicked for:", track.title);
    
    // If clicking on a different track, change it
    if (currentTrack?.id !== track.id) {
      console.log("🎵 Changing to new track");
      changeTrack(track);
    } else {
      // If clicking the same track, toggle play/pause
      console.log("🎵 Toggling play/pause for current track");
      togglePlay();
    }
  }}
  className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg transition"
>
  {currentTrack?.id === track.id && isPlaying ? "⏸ Pause" : "▶ Play"}
</button>
```

**When you click on the currently playing track:**
```
🎵 Track button clicked for: Code & Coffee
🎵 Toggling play/pause for current track
🎵 togglePlay called
🎵 Pausing audio
```

**When you click on a different track:**
```
🎵 Track button clicked for: API Harmony
🎵 Changing to new track
🎵 changeTrack called with: {title: "API Harmony", ...}
🎵 Track changed to: API Harmony
```

✅ **Checkpoint:** Track buttons should show "⏸ Pause" for the currently playing track, and "▶ Play" for others.

---

## 📋 Step 10: Add Keyboard Controls (Spacebar)

**Goal:** Use spacebar to play/pause (like Spotify!).

### 10.1 Import useEffect:

```javascript
import { useMusicContext } from "../context/MusicContext";
import { musicTracks } from "../data/data";
import { useEffect } from "react";  // Add this
```

### 10.2 Add useEffect for keyboard listener:

```javascript
const MusicPlayer = () => {
  const { isPlaying, currentTrack, audioRef, togglePlay, changeTrack, setIsPlaying } = 
    useMusicContext();
  
  console.log("🎵 MusicPlayer: Component rendering");
  
  // Keyboard controls
  useEffect(() => {
    console.log("🎵 useEffect: Setting up keyboard listener");
    
    const handleKeyPress = (e) => {
      console.log("⌨️ Key pressed:", e.code);
      
      if (e.code === "Space" && currentTrack) {
        console.log("⌨️ Spacebar pressed with active track");
        e.preventDefault(); // Prevent page scroll
        togglePlay();
      }
    };
    
    document.addEventListener("keydown", handleKeyPress);
    console.log("🎵 Keyboard listener added");
    
    // Cleanup function
    return () => {
      console.log("🎵 Cleaning up keyboard listener");
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [currentTrack, togglePlay]); // Re-run when these change
  
  return (
    // ... rest of your component
  );
};
```

**Expected Console Output on mount:**
```
🎵 useEffect: Setting up keyboard listener
🎵 Keyboard listener added
```

**When you press spacebar (with a track selected):**
```
⌨️ Key pressed: Space
⌨️ Spacebar pressed with active track
🎵 togglePlay called
🎵 Playing audio
```

**When you press other keys:**
```
⌨️ Key pressed: KeyA
(nothing happens - correct!)
```

✅ **Checkpoint:** Press spacebar to play/pause music! Try pressing it multiple times.

**React Learning:** The cleanup function runs when the component unmounts OR when dependencies change. This prevents memory leaks from old event listeners!

---

## 📋 Step 11: Remove All Console Logs (Final Polish)

**Goal:** Clean up your code by removing debug logs.

### 11.1 Final `MusicContext.jsx` (no logs):

```javascript
import { createContext, useContext, useState, useRef } from "react";

const MusicContext = createContext();

export const useMusicContext = () => useContext(MusicContext);

const MusicContextProvider = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);
  const audioRef = useRef(null);
  
  const changeTrack = (track) => {
    setCurrentTrack(track);
    setIsPlaying(false);
  };
  
  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };
  
  return (
    <MusicContext.Provider 
      value={{ 
        isPlaying,
        currentTrack,
        audioRef,
        changeTrack,
        togglePlay,
        setIsPlaying
      }}
    >
      {children}
    </MusicContext.Provider>
  );
};

export default MusicContextProvider;
```

### 11.2 Final `MusicPlayer.jsx` (no logs):

```javascript
import { useEffect } from "react";
import { useMusicContext } from "../context/MusicContext";
import { musicTracks } from "../data/data";

const MusicPlayer = () => {
  const { isPlaying, currentTrack, audioRef, togglePlay, changeTrack, setIsPlaying } = 
    useMusicContext();
  
  // Keyboard controls - Spacebar to play/pause
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.code === "Space" && currentTrack) {
        e.preventDefault();
        togglePlay();
      }
    };
    
    document.addEventListener("keydown", handleKeyPress);
    
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [currentTrack, togglePlay]);
  
  return (
    <section className="bg-gray-900 text-white py-20 px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold mb-8">Featured Tracks</h2>
        
        {/* Track List */}
        <div className="grid gap-4 mb-8">
          {musicTracks.map((track) => (
            <div 
              key={track.id}
              className="bg-gray-800 p-4 rounded-lg flex justify-between items-center hover:bg-gray-700 transition"
            >
              <div>
                <h3 className="font-semibold">{track.title}</h3>
                <p className="text-gray-400 text-sm">{track.artist} • {track.duration}</p>
              </div>
              <button
                onClick={() => {
                  if (currentTrack?.id !== track.id) {
                    changeTrack(track);
                  } else {
                    togglePlay();
                  }
                }}
                className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg transition"
              >
                {currentTrack?.id === track.id && isPlaying ? "⏸ Pause" : "▶ Play"}
              </button>
            </div>
          ))}
        </div>
        
        {/* Audio Element */}
        {currentTrack && (
          <audio
            ref={audioRef}
            src={currentTrack.url}
            onEnded={() => setIsPlaying(false)}
          />
        )}
        
        {/* Now Playing */}
        {currentTrack && (
          <div className="bg-gray-800 p-6 rounded-lg">
            <p className="text-sm text-gray-400 mb-2">Now Playing</p>
            <h3 className="text-2xl font-bold mb-1">{currentTrack.title}</h3>
            <p className="text-gray-400 mb-4">{currentTrack.artist}</p>
            
            <button
              onClick={togglePlay}
              className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-lg text-lg font-semibold transition"
            >
              {isPlaying ? "⏸ Pause" : "▶ Play"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default MusicPlayer;
```

✅ **Final Checkpoint:** Your music player is complete! Test everything:
- Click a track to select it
- Click Play/Pause in "Now Playing" section
- Click the same track again to pause
- Press spacebar to play/pause
- Let a track finish (it should stop automatically)

---

## 🎓 What You've Learned

### **Context API (Multiple Contexts)**
- ✅ Created a second context (`MusicContext`) separate from `AppContext`
- ✅ Nested multiple context providers
- ✅ Used custom hook pattern (`useMusicContext`)
- ✅ Shared state across components without prop drilling

### **useRef Hook**
- ✅ Created a ref with `useRef(null)`
- ✅ Attached ref to DOM element with `ref={audioRef}`
- ✅ Accessed DOM element with `audioRef.current`
- ✅ Called Web Audio API methods (`.play()`, `.pause()`)
- ✅ Understood that refs don't cause re-renders

### **useEffect Hook**
- ✅ Added event listeners with `addEventListener`
- ✅ Cleaned up with return function (prevents memory leaks)
- ✅ Used dependency array correctly
- ✅ Prevented default browser behavior (`e.preventDefault()`)

### **React Patterns**
- ✅ Conditional rendering (`currentTrack && <audio>`)
- ✅ Array mapping with `.map()`
- ✅ Dynamic button text based on state
- ✅ Event handlers with parameters
- ✅ Optional chaining (`currentTrack?.id`)

---

## 🚀 Challenge Extensions (Try These!)

1. **Add "Next" and "Previous" buttons** - Navigate through the track list
2. **Show progress bar** - Use another useRef to track `currentTime`
3. **Volume control** - Add a slider that controls `audioRef.current.volume`
4. **Shuffle mode** - Randomize track order
5. **Local storage** - Remember the last played track using `useEffect`

---

## 🎯 Key Takeaways

**When to use useRef:**
- DOM element references (audio, video, input)
- Values that persist across renders but don't need to trigger re-renders
- Storing timeout/interval IDs

**When to use Context:**
- State needed by many components
- Avoiding prop drilling
- Separate concerns (music state separate from menu state)

**When to use useEffect:**
- Adding event listeners to `document` or `window`
- Subscribing to external APIs
- Cleanup operations (very important!)

---

**Congratulations! 🎉** You've built a fully functional music player using Context API, useRef, and useEffect!

This covers all the core concepts from John Smilga's Section 6 (Lecture 144). 💪

