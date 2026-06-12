import { useEffect, useRef } from "react";

/** Roobinium Web3: cyan nuclear glow, hex grid, spotlight. */
export default function AmbientBackground() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e) => {
      el.style.setProperty("--spot-x", `${e.clientX}px`);
      el.style.setProperty("--spot-y", `${e.clientY}px`);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div ref={ref} className="ambient-web3" aria-hidden="true">
      <div className="ambient-web3__orb ambient-web3__orb--1" />
      <div className="ambient-web3__orb ambient-web3__orb--2" />
      <div className="ambient-web3__orb ambient-web3__orb--3" />
      <div className="ambient-web3__hex" />
      <div className="ambient-web3__lines" />
      <div className="ambient-web3__spot" />
      <div className="ambient-web3__vignette" />
    </div>
  );
}
