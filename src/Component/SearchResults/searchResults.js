import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const API_KEYS = [
  process.env.REACT_APP_YOUTUBE_KEY_1,
  process.env.REACT_APP_YOUTUBE_KEY_2,
  process.env.REACT_APP_YOUTUBE_KEY_3,
  process.env.REACT_APP_YOUTUBE_KEY_4,
  process.env.REACT_APP_YOUTUBE_KEY_5,
  process.env.REACT_APP_YOUTUBE_KEY_6,
];

let currentKeyIndex = 0;

const SearchResults = () => {
  const location = useLocation();
  const [query, setQuery] = useState("");
  const [youtubeResults, setYoutubeResults] = useState([]);
  const [postResults, setPostResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [selectedVideoIndex, setSelectedVideoIndex] = useState(null);
  const [autoplay, setAutoplay] = useState(true);
  const [showControls, setShowControls] = useState(false);
  const autoplayRef = useRef(autoplay);
  const hideTimerRef = useRef(null);

  // ✅ Keep autoplay ref in sync
  useEffect(() => {
    autoplayRef.current = autoplay;
  }, [autoplay]);

  // ✅ Listen for video end → autoplay next
  useEffect(() => {
    if (!selectedVideo) return;
    const handleMessage = (event) => {
      if (event.origin !== "https://www.youtube.com") return;
      try {
        const data = JSON.parse(event.data);
        if (data.event === "onStateChange" && data.info === 0) {
          if (!autoplayRef.current) return;
          const n = selectedVideoIndex + 1;
          if (n < youtubeResults.length) {
            setSelectedVideo(youtubeResults[n].id.videoId);
            setSelectedVideoIndex(n);
          }
        }
      } catch (e) {}
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [selectedVideo, selectedVideoIndex, youtubeResults]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get("q");
    if (q) {
      setQuery(q);
      fetchAll(q);
    }
  }, [location.search]);

  const fetchAll = async (q) => {
    setLoading(true);
    await Promise.all([fetchYoutube(q), fetchPosts(q)]);
    setLoading(false);
  };

  const fetchYoutube = async (q) => {
    for (let i = 0; i < API_KEYS.length; i++) {
      const keyIndex = (currentKeyIndex + i) % API_KEYS.length;
      try {
        const res = await axios.get("https://www.googleapis.com/youtube/v3/search", {
          params: {
            part: "snippet",
            q,
            type: "video",
            maxResults: 50,
            key: API_KEYS[keyIndex],
          },
        });
        currentKeyIndex = keyIndex;
        setYoutubeResults(res.data.items);
        return;
      } catch (err) {
        if (err.response?.status === 403) continue;
        break;
      }
    }
  };

  const fetchPosts = async (q) => {
    try {
      const res = await axios.get(`/api/posts?search=${encodeURIComponent(q)}`);
      setPostResults(res.data);
    } catch (err) {
      setPostResults([]);
    }
  };

  // ✅ Show controls on mouse move, hide after 2.5s
  const handleMouseMove = () => {
    setShowControls(true);
    clearTimeout(hideTimerRef.current);
    hideTimerRef.current = setTimeout(() => {
      setShowControls(false);
    }, 2500);
  };

  const goNext = () => {
    const n = selectedVideoIndex + 1;
    if (n < youtubeResults.length) {
      setSelectedVideo(youtubeResults[n].id.videoId);
      setSelectedVideoIndex(n);
    }
  };

  const goPrev = () => {
    const p = selectedVideoIndex - 1;
    if (p >= 0) {
      setSelectedVideo(youtubeResults[p].id.videoId);
      setSelectedVideoIndex(p);
    }
  };

  return (
    <div style={{ background: "#0f0f0f", minHeight: "100vh", paddingTop: "70px", color: "white" }}>

      {loading && (
        <p style={{ color: "#aaa", textAlign: "center", paddingTop: "40px" }}>Searching...</p>
      )}

      {!loading && (
        <div style={{ padding: "20px" }}>

          {/* ── HOME POSTS SECTION ── */}
          {postResults.length > 0 && (
            <>
              <h2 style={{ fontSize: "16px", color: "#aaa", marginBottom: "12px" }}>📱 Posts</h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "16px", marginBottom: "40px" }}>
                {postResults.map((post, i) => (
                  <div key={i} style={{ background: "#272727", borderRadius: "12px", overflow: "hidden" }}>
                    {post.image && (
                      <img src={post.image} alt={post.title}
                        style={{ width: "100%", aspectRatio: "16/9", objectFit: "cover" }} />
                    )}
                    <div style={{ padding: "12px" }}>
                      <div style={{ fontWeight: "600", fontSize: "14px", color: "white" }}>{post.title}</div>
                      <div style={{ color: "#aaa", fontSize: "12px", marginTop: "4px" }}>{post.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* ── YOUTUBE SECTION ── */}
          {youtubeResults.length > 0 && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "16px" }}>
              {youtubeResults.map((item, index) => (
                <div key={item.id.videoId}
                  onClick={() => { setSelectedVideo(item.id.videoId); setSelectedVideoIndex(index); }}
                  style={{ cursor: "pointer" }}>
                  <div style={{ borderRadius: "12px", overflow: "hidden" }}>
                    <img src={item.snippet.thumbnails.medium.url} alt={item.snippet.title}
                      style={{ width: "100%", aspectRatio: "16/9", objectFit: "cover" }} />
                  </div>
                  <div style={{ display: "flex", gap: "10px", padding: "10px 4px" }}>
                    <img src={`https://ui-avatars.com/api/?name=${item.snippet.channelTitle}&background=random&size=36`}
                      alt="ch" style={{ width: "36px", height: "36px", borderRadius: "50%" }} />
                    <div>
                      <div style={{ color: "white", fontWeight: "600", fontSize: "13px",
                        display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                        {item.snippet.title}
                      </div>
                      <div style={{ color: "#aaa", fontSize: "12px" }}>{item.snippet.channelTitle}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ── NO RESULTS ── */}
          {youtubeResults.length === 0 && postResults.length === 0 && (
            <p style={{ color: "#555", textAlign: "center", marginTop: "60px" }}>
              🔍 No results found for "{query}"
            </p>
          )}
        </div>
      )}

      {/* ── VIDEO PLAYER MODAL ── */}
      {selectedVideo && (
        <div
          onMouseMove={handleMouseMove}
          style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
            background: "rgba(0,0,0,0.95)", zIndex: 1000, overflowY: "auto" }}>

          <div style={{ maxWidth: "900px", margin: "0 auto", padding: "70px 20px 40px" }}>

            {/* ✅ Close button */}
            <button onClick={() => { setSelectedVideo(null); setSelectedVideoIndex(null); }}
              style={{ position: "fixed", top: "80px", right: "20px", background: "#272727",
                border: "none", color: "white", fontSize: "20px", cursor: "pointer",
                borderRadius: "50%", width: "40px", height: "40px", zIndex: 1001 }}>✕</button>

            {/* ── VIDEO IFRAME ── */}
            <div style={{ position: "relative" }}>
              <iframe
                width="100%" height="500"
                src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1&enablejsapi=1&origin=${window.location.origin}`}
                allow="autoplay; fullscreen"
                allowFullScreen
                style={{ borderRadius: "12px", border: "none", display: "block" }}
                title="YouTube Player"
              />

              {/* ✅ Floating controls — disappear after 2.5s of no mouse movement */}
              <div style={{
                position: "absolute",
                bottom: "20px",
                left: "50%",
                transform: "translateX(-50%)",
                background: "rgba(0,0,0,0.75)",
                borderRadius: "30px",
                padding: "10px 24px",
                display: "flex",
                alignItems: "center",
                gap: "20px",
                backdropFilter: "blur(8px)",
                opacity: showControls ? 1 : 0,
                transition: "opacity 0.4s ease",
                pointerEvents: showControls ? "all" : "none",
                zIndex: 10,
              }}>

                {/* Prev button */}
                <button
                  onClick={goPrev}
                  disabled={selectedVideoIndex === 0}
                  style={{
                    background: "none", border: "none",
                    color: selectedVideoIndex === 0 ? "#555" : "white",
                    fontSize: "22px", cursor: selectedVideoIndex === 0 ? "not-allowed" : "pointer",
                  }}>⏮</button>

                {/* Autoplay toggle */}
                <div
                  onClick={() => setAutoplay(!autoplay)}
                  title={autoplay ? "Autoplay ON" : "Autoplay OFF"}
                  style={{
                    width: "42px", height: "24px",
                    background: autoplay ? "#ff0000" : "#555",
                    borderRadius: "12px", cursor: "pointer",
                    position: "relative", transition: "background 0.3s",
                  }}>
                  <div style={{
                    width: "18px", height: "18px", background: "white",
                    borderRadius: "50%", position: "absolute", top: "3px",
                    left: autoplay ? "21px" : "3px", transition: "left 0.3s",
                  }} />
                </div>

                {/* Next button */}
                <button
                  onClick={goNext}
                  disabled={selectedVideoIndex === youtubeResults.length - 1}
                  style={{
                    background: "none", border: "none",
                    color: selectedVideoIndex === youtubeResults.length - 1 ? "#555" : "white",
                    fontSize: "22px",
                    cursor: selectedVideoIndex === youtubeResults.length - 1 ? "not-allowed" : "pointer",
                  }}>⏭</button>

              </div>
            </div>

            {/* ── VIDEO INFO ── */}
            {youtubeResults[selectedVideoIndex] && (
              <div style={{ marginTop: "16px" }}>
                <div style={{ color: "white", fontWeight: "bold", fontSize: "18px", lineHeight: "1.4" }}>
                  {youtubeResults[selectedVideoIndex].snippet.title}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginTop: "12px" }}>
                  <img
                    src={`https://ui-avatars.com/api/?name=${youtubeResults[selectedVideoIndex].snippet.channelTitle}&background=random&size=40`}
                    alt="ch" style={{ width: "40px", height: "40px", borderRadius: "50%" }} />
                  <div style={{ color: "white", fontWeight: "600" }}>
                    {youtubeResults[selectedVideoIndex].snippet.channelTitle}
                  </div>
                </div>
                <div style={{ background: "#272727", borderRadius: "12px", padding: "14px", marginTop: "16px", color: "#ccc", fontSize: "14px", lineHeight: "1.6" }}>
                  <strong style={{ color: "white" }}>Description</strong>
                  <p style={{ marginTop: "8px" }}>
                    {youtubeResults[selectedVideoIndex].snippet.description || "No description available."}
                  </p>
                </div>
              </div>
            )}

          </div>
        </div>
      )}
    </div>
  );
};

export default SearchResults;