# 🎵 Music Player Tutorial - Ping-Pong Method

**Practice:** `useContext`, `useRef`, `useEffect`  
**Level:** Section 6 - Lecture 144  
**Time:** ~60 minutes

---

## 🧠 Learning Method: Context ↔ Component

We'll **bounce back and forth** between context and component after each small change:

1. 🎯 **Add something to Context** → Test it
2. 🔄 **Use it in Component** → Log it  
3. 🎯 **Add more to Context** → Test it
4. 🔄 **Use it in Component** → Log it

This way you see the **connection** between context and component at each step!

---

## 🎯 What You'll Build

A music player that lets users:
- Select and play tracks
- Control playbook (play/pause)
- Use spacebar for controls

**Key React Concepts:**
- Multiple Context Providers (step by step!)
- `useRef` with HTML5 Audio API
- `useEffect` for event listeners

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

## 📋 Step 2A: Create Empty Music Context

**Goal:** Create the basic context structure first.

### 2A.1 Create new file: `src/context/MusicContext.jsx`

```javascript
import { createContext, useContext } from "react";

// 1. Create the context
const MusicContext = createContext();

// 2. Custom hook for easy access
export const useMusicContext = () => useContext(MusicContext);

// 3. Provider component (empty for now)
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

### 2A.2 Wrap your app with the provider

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
```

✅ **Checkpoint:** You should see the context provider rendering.

---

## 📋 Step 2B: Test Empty Context in Component

**Goal:** Create a basic component to test the context connection.

### 2B.1 Create folder and file: `src/MusicPlayer/MusicPlayer.jsx`

```javascript
import { useMusicContext } from "../context/MusicContext";

const MusicPlayer = () => {
  console.log("🎵 MusicPlayer: Component rendering");
  
  // Test the context connection
  const contextValue = useMusicContext();
  console.log("🎵 Context value received:", contextValue);
  
  return (
    <section className="bg-gray-900 text-white py-20 px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold mb-8">Music Player Test</h2>
        <p>Context connection: {contextValue ? "✅ Connected" : "❌ Not connected"}</p>
      </div>
    </section>
  );
};

export default MusicPlayer;
```

### 2B.2 Add to `App.jsx`:

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
🎵 Context value received: {}
```

✅ **Checkpoint:** You should see "Context connection: ✅ Connected" on the page.

**React Learning:** The empty object `{}` proves the context is working!

---

## 📋 Step 3A: Add isPlaying State to Context

**Goal:** Add the first piece of state and see it in the component.

### 3A.1 Update `MusicContext.jsx`:

```javascript
import { createContext, useContext, useState } from "react"; // Add useState

const MusicContext = createContext();

export const useMusicContext = () => useContext(MusicContext);

const MusicContextProvider = ({ children }) => {
  console.log("🎵 MusicContext: Provider is rendering");
  
  // Add isPlaying state
  const [isPlaying, setIsPlaying] = useState(false);
  console.log("🎵 Context - isPlaying state:", isPlaying);
  
  return (
    <MusicContext.Provider value={{ isPlaying, setIsPlaying }}>
      {children}
    </MusicContext.Provider>
  );
};

export default MusicContextProvider;
```

**Expected Console Output:**
```
🎵 MusicContext: Provider is rendering
🎵 Context - isPlaying state: false
```

---

## 📋 Step 3B: Use isPlaying State in Component

**Goal:** Access and test the isPlaying state from the component.

### 3B.1 Update `MusicPlayer.jsx`:

```javascript
import { useMusicContext } from "../context/MusicContext";

const MusicPlayer = () => {
  console.log("🎵 MusicPlayer: Component rendering");
  
  // Get isPlaying from context
  const { isPlaying, setIsPlaying } = useMusicContext();
  console.log("🎵 Component - isPlaying received:", isPlaying);
  
  return (
    <section className="bg-gray-900 text-white py-20 px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold mb-8">Music Player Test</h2>
        <p>Is Playing: {isPlaying ? "🎵 YES" : "⏸ NO"}</p>
        
        {/* Test button to toggle state */}
        <button
          onClick={() => {
            console.log("🎵 Button clicked! Current state:", isPlaying);
            setIsPlaying(!isPlaying);
            console.log("🎵 Setting state to:", !isPlaying);
          }}
          className="bg-blue-600 px-4 py-2 rounded mt-4"
        >
          Toggle Play State
        </button>
      </div>
    </section>
  );
};

export default MusicPlayer;
```

**Expected Console Output:**
```
🎵 MusicPlayer: Component rendering
🎵 Component - isPlaying received: false
```

**When you click the button:**
```
🎵 Button clicked! Current state: false
🎵 Setting state to: true
🎵 MusicContext: Provider is rendering  ← Context re-renders!
🎵 Context - isPlaying state: true      ← State updated!
🎵 MusicPlayer: Component rendering     ← Component re-renders!
🎵 Component - isPlaying received: true ← New state received!
```

✅ **Checkpoint:** Click the button and watch the state change from "⏸ NO" to "🎵 YES"!

**React Learning:** See how changing state in context causes both the provider AND component to re-render!

---

## 📋 Step 4A: Add currentTrack State to Context

**Goal:** Add another piece of state to track the selected song.

### 4A.1 Update `MusicContext.jsx`:

```javascript
const MusicContextProvider = ({ children }) => {
  console.log("🎵 MusicContext: Provider is rendering");
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null); // Add this
  
  console.log("🎵 Context - isPlaying:", isPlaying);
  console.log("🎵 Context - currentTrack:", currentTrack);
  
  return (
    <MusicContext.Provider 
      value={{ 
        isPlaying, 
        setIsPlaying, 
        currentTrack, 
        setCurrentTrack  // Add this
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
🎵 Context - isPlaying: false
🎵 Context - currentTrack: null
```

---

## 📋 Step 4B: Use currentTrack in Component

**Goal:** Test the currentTrack state with a fake song.

### 4B.1 Update `MusicPlayer.jsx`:

```javascript
import { useMusicContext } from "../context/MusicContext";

const MusicPlayer = () => {
  console.log("🎵 MusicPlayer: Component rendering");
  
  // Get both states from context
  const { isPlaying, setIsPlaying, currentTrack, setCurrentTrack } = useMusicContext();
  
  console.log("🎵 Component - isPlaying:", isPlaying);
  console.log("🎵 Component - currentTrack:", currentTrack);
  
  // Fake song for testing
  const testSong = {
    id: "test123",
    title: "Test Song",
    artist: "Test Artist"
  };
  
  return (
    <section className="bg-gray-900 text-white py-20 px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold mb-8">Music Player Test</h2>
        
        <p>Is Playing: {isPlaying ? "🎵 YES" : "⏸ NO"}</p>
        <p>Current Track: {currentTrack ? currentTrack.title : "None selected"}</p>
        
        <div className="space-x-4 mt-4">
          <button
            onClick={() => {
              console.log("🎵 Play button clicked");
              setIsPlaying(!isPlaying);
            }}
            className="bg-blue-600 px-4 py-2 rounded"
          >
            Toggle Play
          </button>
          
          <button
            onClick={() => {
              console.log("🎵 Select song button clicked");
              console.log("🎵 Setting currentTrack to:", testSong);
              setCurrentTrack(testSong);
            }}
            className="bg-green-600 px-4 py-2 rounded"
          >
            Select Test Song
          </button>
          
          <button
            onClick={() => {
              console.log("🎵 Clear song button clicked");
              setCurrentTrack(null);
            }}
            className="bg-red-600 px-4 py-2 rounded"
          >
            Clear Song
          </button>
        </div>
      </div>
    </section>
  );
};

export default MusicPlayer;
```

**When you click "Select Test Song":**
```
🎵 Select song button clicked
🎵 Setting currentTrack to: {id: "test123", title: "Test Song", artist: "Test Artist"}
🎵 MusicContext: Provider is rendering
🎵 Context - currentTrack: {id: "test123", title: "Test Song", ...}
🎵 MusicPlayer: Component rendering
🎵 Component - currentTrack: {id: "test123", title: "Test Song", ...}
```

✅ **Checkpoint:** Click buttons to see "Current Track: Test Song" appear and disappear!

**React Learning:** Both states are independent but managed in the same context!

---

## 📋 Step 5A: Add useRef to Context

**Goal:** Add a ref for the audio element (but don't use it yet).

### 5A.1 Update `MusicContext.jsx`:

```javascript
import { createContext, useContext, useState, useRef } from "react"; // Add useRef

const MusicContextProvider = ({ children }) => {
  console.log("🎵 MusicContext: Provider is rendering");
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);
  
  // Add ref for audio element
  const audioRef = useRef(null);
  
  console.log("🎵 Context - isPlaying:", isPlaying);
  console.log("🎵 Context - currentTrack:", currentTrack);
  console.log("🎵 Context - audioRef.current:", audioRef.current);
  
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
🎵 Context - audioRef.current: null  ← null because no audio element yet
```

---

## 📋 Step 5B: Test audioRef in Component

**Goal:** Access the ref and see what happens when we attach it to an element.

### 5B.1 Update `MusicPlayer.jsx`:

```javascript
import { useMusicContext } from "../context/MusicContext";

const MusicPlayer = () => {
  console.log("🎵 MusicPlayer: Component rendering");
  
  // Get audioRef from context
  const { isPlaying, setIsPlaying, currentTrack, setCurrentTrack, audioRef } = useMusicContext();
  
  console.log("🎵 Component - audioRef.current:", audioRef.current);
  
  const testSong = {
    id: "test123",
    title: "Test Song",
    artist: "Test Artist",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
  };
  
  return (
    <section className="bg-gray-900 text-white py-20 px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold mb-8">Music Player Test</h2>
        
        <p>Is Playing: {isPlaying ? "🎵 YES" : "⏸ NO"}</p>
        <p>Current Track: {currentTrack ? currentTrack.title : "None selected"}</p>
        <p>Audio Ref: {audioRef.current ? "✅ Connected to audio element" : "❌ No audio element"}</p>
        
        {/* Add a test audio element */}
        {currentTrack && (
          <>
            <audio
              ref={audioRef}
              src={currentTrack.url}
              onLoadedData={() => {
                console.log("🎵 Audio loaded! audioRef.current is now:", audioRef.current);
              }}
            />
            <p className="text-green-400 mt-2">Audio element created for: {currentTrack.title}</p>
          </>
        )}
        
        <div className="space-x-4 mt-4">
          <button
            onClick={() => setCurrentTrack(testSong)}
            className="bg-green-600 px-4 py-2 rounded"
          >
            Select Test Song (Creates Audio)
          </button>
          
          <button
            onClick={() => {
              console.log("🎵 Testing audioRef.current:", audioRef.current);
              if (audioRef.current) {
                console.log("🎵 Audio element exists! Can call .play() and .pause()");
                console.log("🎵 Audio src:", audioRef.current.src);
              } else {
                console.log("🎵 No audio element attached yet");
              }
            }}
            className="bg-purple-600 px-4 py-2 rounded"
          >
            Test Audio Ref
          </button>
        </div>
      </div>
    </section>
  );
};
```

**When you click "Select Test Song":**
```
🎵 Audio loaded! audioRef.current is now: <audio src="https://..."></audio>
🎵 MusicPlayer: Component rendering
🎵 Component - audioRef.current: <audio src="https://..."></audio>
```

**When you click "Test Audio Ref":**
```
🎵 Testing audioRef.current: <audio src="https://..."></audio>
🎵 Audio element exists! Can call .play() and .pause()
🎵 Audio src: https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3
```

✅ **Checkpoint:** Select a song, then test the ref. You should see the audio element is connected!

**React Learning:** `useRef` lets you directly access DOM elements. `audioRef.current` is the actual `<audio>` element!

---

## 📋 Step 6A: Add togglePlay Function to Context

**Goal:** Create a function that uses the audioRef to control playback.

### 6A.1 Update `MusicContext.jsx`:

```javascript
const MusicContextProvider = ({ children }) => {
  console.log("🎵 MusicContext: Provider is rendering");
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);
  const audioRef = useRef(null);
  
  // Add togglePlay function
  const togglePlay = () => {
    console.log("🎵 Context - togglePlay called");
    console.log("🎵 Context - audioRef.current:", audioRef.current);
    console.log("🎵 Context - current isPlaying:", isPlaying);
    
    if (audioRef.current) {
      if (isPlaying) {
        console.log("🎵 Context - Pausing audio");
        audioRef.current.pause();
      } else {
        console.log("🎵 Context - Playing audio");
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
      console.log("🎵 Context - Setting isPlaying to:", !isPlaying);
    } else {
      console.warn("⚠️ Context - No audio element to control");
    }
  };
  
  console.log("🎵 Context - isPlaying:", isPlaying);
  console.log("🎵 Context - currentTrack:", currentTrack);
  
  return (
    <MusicContext.Provider 
      value={{ 
        isPlaying, 
        setIsPlaying, 
        currentTrack, 
        setCurrentTrack,
        audioRef,
        togglePlay  // Add this
      }}
    >
      {children}
    </MusicContext.Provider>
  );
};
```

---

## 📋 Step 6B: Test togglePlay in Component

**Goal:** Use the togglePlay function and see it control the audio.

### 6B.1 Update `MusicPlayer.jsx`:

```javascript
const MusicPlayer = () => {
  console.log("🎵 MusicPlayer: Component rendering");
  
  // Get togglePlay from context
  const { isPlaying, currentTrack, setCurrentTrack, audioRef, togglePlay } = useMusicContext();
  
  console.log("🎵 Component - isPlaying:", isPlaying);
  console.log("🎵 Component - currentTrack:", currentTrack);
  
  const testSong = {
    id: "test123",
    title: "Test Song",
    artist: "Test Artist",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
  };
  
  return (
    <section className="bg-gray-900 text-white py-20 px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold mb-8">Music Player Test</h2>
        
        <p>Is Playing: {isPlaying ? "🎵 YES" : "⏸ NO"}</p>
        <p>Current Track: {currentTrack ? currentTrack.title : "None selected"}</p>
        
        {currentTrack && (
          <audio
            ref={audioRef}
            src={currentTrack.url}
            onLoadedData={() => {
              console.log("🎵 Component - Audio loaded and ready");
            }}
          />
        )}
        
        <div className="space-x-4 mt-4">
          <button
            onClick={() => {
              console.log("🎵 Component - Select song button clicked");
              setCurrentTrack(testSong);
            }}
            className="bg-green-600 px-4 py-2 rounded"
          >
            Select Test Song
          </button>
          
          <button
            onClick={() => {
              console.log("🎵 Component - Play/Pause button clicked");
              togglePlay();
            }}
            className="bg-blue-600 px-4 py-2 rounded"
            disabled={!currentTrack}
          >
            {isPlaying ? "⏸ Pause" : "▶ Play"}
          </button>
        </div>
        
        {!currentTrack && (
          <p className="text-yellow-400 mt-4">Select a song first!</p>
        )}
      </div>
    </section>
  );
};
```

**When you click "Select Test Song" then "▶ Play":**
```
🎵 Component - Play/Pause button clicked
🎵 Context - togglePlay called
🎵 Context - audioRef.current: <audio src="..."></audio>
🎵 Context - current isPlaying: false
🎵 Context - Playing audio
🎵 Context - Setting isPlaying to: true
🎵 MusicContext: Provider is rendering
🎵 Context - isPlaying: true
🎵 MusicPlayer: Component rendering
🎵 Component - isPlaying: true
```

✅ **Checkpoint:** You should hear music playing! The button should change to "⏸ Pause"!

**React Learning:** The context function uses the ref to control the actual audio element, then updates state to reflect the change!

---

## 📋 Step 7A: Add Real Music Data

**Goal:** Replace the test song with real music data.

### 7A.1 Add to `src/data/data.jsx` (at the bottom, before `export default sublinks;`):

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

---

## 📋 Step 7B: Display Real Track List in Component

**Goal:** Map through the real tracks and display them.

### 7B.1 Update `MusicPlayer.jsx`:

```javascript
import { useMusicContext } from "../context/MusicContext";
import { musicTracks } from "../data/data"; // Add this

const MusicPlayer = () => {
  console.log("🎵 MusicPlayer: Component rendering");
  
  const { isPlaying, currentTrack, setCurrentTrack, audioRef, togglePlay } = useMusicContext();
  
  console.log("🎵 Component - musicTracks:", musicTracks);
  console.log("🎵 Component - currentTrack:", currentTrack);
  
  return (
    <section className="bg-gray-900 text-white py-20 px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold mb-8">Featured Tracks</h2>
        
        {/* Track List */}
        <div className="grid gap-4 mb-8">
          {musicTracks.map((track) => {
            console.log("🎵 Component - Rendering track:", track.title);
            
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
                    console.log("🎵 Component - Track button clicked for:", track.title);
                    setCurrentTrack(track);
                  }}
                  className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg transition"
                >
                  ▶ Select
                </button>
              </div>
            );
          })}
        </div>
        
        {/* Audio Element */}
        {currentTrack && (
          <audio
            ref={audioRef}
            src={currentTrack.url}
            onLoadedData={() => {
              console.log("🎵 Component - Audio loaded for:", currentTrack.title);
            }}
          />
        )}
        
        {/* Now Playing */}
        {currentTrack && (
          <div className="bg-gray-800 p-6 rounded-lg">
            <p className="text-sm text-gray-400 mb-2">Now Playing</p>
            <h3 className="text-2xl font-bold mb-1">{currentTrack.title}</h3>
            <p className="text-gray-400 mb-4">{currentTrack.artist}</p>
            
            <button
              onClick={() => {
                console.log("🎵 Component - Play/Pause clicked for:", currentTrack.title);
                togglePlay();
              }}
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

**Expected Console Output:**
```
🎵 Component - musicTracks: Array(3)
🎵 Component - Rendering track: Strapi Theme Song
🎵 Component - Rendering track: Code & Coffee
🎵 Component - Rendering track: API Harmony
```

**When you click "▶ Select" on a track:**
```
🎵 Component - Track button clicked for: Code & Coffee
🎵 Component - Audio loaded for: Code & Coffee
```

✅ **Checkpoint:** You should see 3 tracks listed. Clicking "Select" should show the "Now Playing" section!

---

## 📋 Step 8A: Add changeTrack Function to Context

**Goal:** Create a function that properly changes tracks and resets play state.

### 8A.1 Update `MusicContext.jsx`:

```javascript
const MusicContextProvider = ({ children }) => {
  console.log("🎵 MusicContext: Provider is rendering");
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);
  const audioRef = useRef(null);
  
  const togglePlay = () => {
    console.log("🎵 Context - togglePlay called");
    console.log("🎵 Context - audioRef.current:", audioRef.current);
    
    if (audioRef.current) {
      if (isPlaying) {
        console.log("🎵 Context - Pausing audio");
        audioRef.current.pause();
      } else {
        console.log("🎵 Context - Playing audio");
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };
  
  // Add changeTrack function
  const changeTrack = (track) => {
    console.log("🎵 Context - changeTrack called with:", track.title);
    console.log("🎵 Context - Previous track:", currentTrack?.title || "none");
    
    setCurrentTrack(track);
    setIsPlaying(false); // Always stop when changing tracks
    
    console.log("🎵 Context - Track changed to:", track.title);
    console.log("🎵 Context - isPlaying reset to: false");
  };
  
  console.log("🎵 Context - isPlaying:", isPlaying);
  console.log("🎵 Context - currentTrack:", currentTrack?.title || "none");
  
  return (
    <MusicContext.Provider 
      value={{ 
        isPlaying,
        currentTrack,
        audioRef,
        togglePlay,
        changeTrack,  // Add this
        setIsPlaying  // Keep this for audio events
      }}
    >
      {children}
    </MusicContext.Provider>
  );
};
```

---

## 📋 Step 8B: Use changeTrack in Component

**Goal:** Replace setCurrentTrack with the new changeTrack function.

### 8B.1 Update `MusicPlayer.jsx`:

```javascript
const MusicPlayer = () => {
  console.log("🎵 MusicPlayer: Component rendering");
  
  // Use changeTrack instead of setCurrentTrack
  const { isPlaying, currentTrack, audioRef, togglePlay, changeTrack, setIsPlaying } = useMusicContext();
  
  console.log("🎵 Component - isPlaying:", isPlaying);
  console.log("🎵 Component - currentTrack:", currentTrack?.title || "none");
  
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
                  console.log("🎵 Component - Track button clicked for:", track.title);
                  
                  // Use changeTrack instead of setCurrentTrack
                  if (currentTrack?.id !== track.id) {
                    console.log("🎵 Component - Changing to new track");
                    changeTrack(track);
                  } else {
                    console.log("🎵 Component - Same track, toggling play");
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
            onLoadedData={() => {
              console.log("🎵 Component - Audio loaded for:", currentTrack.title);
            }}
            onEnded={() => {
              console.log("🎵 Component - Track ended, stopping playback");
              setIsPlaying(false);
            }}
          />
        )}
        
        {/* Now Playing */}
        {currentTrack && (
          <div className="bg-gray-800 p-6 rounded-lg">
            <p className="text-sm text-gray-400 mb-2">Now Playing</p>
            <h3 className="text-2xl font-bold mb-1">{currentTrack.title}</h3>
            <p className="text-gray-400 mb-4">{currentTrack.artist}</p>
            
            <button
              onClick={() => {
                console.log("🎵 Component - Now Playing button clicked");
                togglePlay();
              }}
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
```

**When you click a different track:**
```
🎵 Component - Track button clicked for: API Harmony
🎵 Component - Changing to new track
🎵 Context - changeTrack called with: API Harmony
🎵 Context - Previous track: Code & Coffee
🎵 Context - Track changed to: API Harmony
🎵 Context - isPlaying reset to: false
```

**When you click the same track:**
```
🎵 Component - Track button clicked for: API Harmony
🎵 Component - Same track, toggling play
🎵 Context - togglePlay called
🎵 Context - Playing audio
```

✅ **Checkpoint:** Track buttons should be smart - "▶ Play" for new tracks, "⏸ Pause" for the current playing track!

---

## 📋 Step 9A: Add Keyboard Controls to Context

**Goal:** Add useEffect to the context for spacebar controls.

### 9A.1 Update `MusicContext.jsx`:

```javascript
import { createContext, useContext, useState, useRef, useEffect } from "react"; // Add useEffect

const MusicContextProvider = ({ children }) => {
  console.log("🎵 MusicContext: Provider is rendering");
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);
  const audioRef = useRef(null);
  
  const togglePlay = () => {
    console.log("🎵 Context - togglePlay called");
    if (audioRef.current) {
      if (isPlaying) {
        console.log("🎵 Context - Pausing audio");
        audioRef.current.pause();
      } else {
        console.log("🎵 Context - Playing audio");
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };
  
  const changeTrack = (track) => {
    console.log("🎵 Context - changeTrack called with:", track.title);
    setCurrentTrack(track);
    setIsPlaying(false);
  };
  
  // Add keyboard controls
  useEffect(() => {
    console.log("🎵 Context - Setting up keyboard listener");
    
    const handleKeyPress = (e) => {
      console.log("⌨️ Context - Key pressed:", e.code);
      
      if (e.code === "Space" && currentTrack) {
        console.log("⌨️ Context - Spacebar pressed with active track");
        e.preventDefault(); // Prevent page scroll
        togglePlay();
      }
    };
    
    document.addEventListener("keydown", handleKeyPress);
    console.log("🎵 Context - Keyboard listener added");
    
    return () => {
      console.log("🎵 Context - Cleaning up keyboard listener");
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [currentTrack, isPlaying]); // Dependencies!
  
  console.log("🎵 Context - isPlaying:", isPlaying);
  console.log("🎵 Context - currentTrack:", currentTrack?.title || "none");
  
  return (
    <MusicContext.Provider 
      value={{ 
        isPlaying,
        currentTrack,
        audioRef,
        togglePlay,
        changeTrack,
        setIsPlaying
      }}
    >
      {children}
    </MusicContext.Provider>
  );
};
```

**Expected Console Output:**
```
🎵 Context - Setting up keyboard listener
🎵 Context - Keyboard listener added
```

---

## 📋 Step 9B: Test Keyboard Controls in Component

**Goal:** Test that spacebar works from anywhere on the page.

### 9B.1 Add instructions to `MusicPlayer.jsx`:

```javascript
return (
  <section className="bg-gray-900 text-white py-20 px-8">
    <div className="max-w-7xl mx-auto">
      <h2 className="text-4xl font-bold mb-8">Featured Tracks</h2>
      
      {/* Add keyboard instructions */}
      <div className="bg-blue-900 p-4 rounded-lg mb-6">
        <p className="text-blue-200">
          ⌨️ <strong>Keyboard Controls:</strong> Press <kbd className="bg-blue-700 px-2 py-1 rounded">Spacebar</kbd> to play/pause
          {currentTrack ? ` (${currentTrack.title})` : " (select a track first)"}
        </p>
      </div>
      
      {/* Rest of your component... */}
```

**When you press spacebar (with a track selected):**
```
⌨️ Context - Key pressed: Space
⌨️ Context - Spacebar pressed with active track
🎵 Context - togglePlay called
🎵 Context - Playing audio
```

**When you press other keys:**
```
⌨️ Context - Key pressed: KeyA
(nothing happens - correct!)
```

✅ **Checkpoint:** Select a track, then press spacebar anywhere on the page to play/pause!

**React Learning:** The useEffect in context runs once and listens globally. The cleanup prevents memory leaks!

---

## 📋 Step 10: Clean Up and Final Test

**Goal:** Remove all console logs and test the final music player.

### 10.1 Final `MusicContext.jsx` (no logs):

```javascript
import { createContext, useContext, useState, useRef, useEffect } from "react";

const MusicContext = createContext();

export const useMusicContext = () => useContext(MusicContext);

const MusicContextProvider = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);
  const audioRef = useRef(null);
  
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
  
  const changeTrack = (track) => {
    setCurrentTrack(track);
    setIsPlaying(false);
  };
  
  // Keyboard controls
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
  }, [currentTrack, isPlaying]);
  
  return (
    <MusicContext.Provider 
      value={{ 
        isPlaying,
        currentTrack,
        audioRef,
        togglePlay,
        changeTrack,
        setIsPlaying
      }}
    >
      {children}
    </MusicContext.Provider>
  );
};

export default MusicContextProvider;
```

### 10.2 Final `MusicPlayer.jsx` (no logs):

```javascript
import { useMusicContext } from "../context/MusicContext";
import { musicTracks } from "../data/data";

const MusicPlayer = () => {
  const { isPlaying, currentTrack, audioRef, togglePlay, changeTrack, setIsPlaying } = 
    useMusicContext();
  
  return (
    <section className="bg-gray-900 text-white py-20 px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold mb-8">Featured Tracks</h2>
        
        {/* Keyboard Instructions */}
        <div className="bg-blue-900 p-4 rounded-lg mb-6">
          <p className="text-blue-200">
            ⌨️ <strong>Keyboard Controls:</strong> Press <kbd className="bg-blue-700 px-2 py-1 rounded">Spacebar</kbd> to play/pause
            {currentTrack ? ` (${currentTrack.title})` : " (select a track first)"}
          </p>
        </div>
        
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

✅ **Final Test Checklist:**
- [ ] Click a track to select it ✅
- [ ] Click "▶ Play" to start music ✅
- [ ] Click "⏸ Pause" to stop music ✅
- [ ] Press spacebar to play/pause ✅
- [ ] Click different tracks to switch ✅
- [ ] Let a track finish (should auto-stop) ✅

**Congratulations! 🎉** Your music player is complete!

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

