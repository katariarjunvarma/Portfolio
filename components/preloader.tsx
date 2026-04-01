"use client";

import { useEffect, useRef, useState } from "react";

export function Preloader({ onComplete }: { onComplete: () => void }) {
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;
  // Always start true on both server and client to avoid hydration mismatch.
  // sessionStorage is only checked inside useEffect (runs client-side only).
  const [show, setShow] = useState(true);

  useEffect(() => {
    // Skip immediately if already seen this session
    if (sessionStorage.getItem("pl_seen") === "1") {
      setShow(false);
      onCompleteRef.current();
      return;
    }

    // Total CSS animation sequence ends at ~3600ms:
    //   2600ms delay + 1000ms overlay wipe = 3600ms
    // Call onComplete slightly after with a small buffer.
    const timer = setTimeout(() => {
      sessionStorage.setItem("pl_seen", "1");
      setShow(false);
      onCompleteRef.current();
    }, 3700);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!show) return null;

  const first  = "ARJUN";
  const second = "VARMA";
  const allChars = [...first, ...second];

  return (
    <div className="preloader-v2">
      <div className="pl-overlay" />

      <div className="pl-content">
        <div className="pl-name">
          <div className="pl-word">
            {first.split("").map((char, i) => (
              <span key={i} className="pl-char-wrap">
                <span
                  className="pl-char"
                  style={{ "--pl-i": i, "--pl-total": allChars.length } as React.CSSProperties}
                >
                  {char}
                </span>
              </span>
            ))}
          </div>
          <div className="pl-word">
            {second.split("").map((char, i) => (
              <span key={i + first.length} className="pl-char-wrap">
                <span
                  className="pl-char"
                  style={
                    {
                      "--pl-i": i + first.length,
                      "--pl-total": allChars.length,
                    } as React.CSSProperties
                  }
                >
                  {char}
                </span>
              </span>
            ))}
          </div>
        </div>
        <p className="pl-role">AI &amp; Machine Learning Engineer</p>
      </div>

    </div>
  );
}
