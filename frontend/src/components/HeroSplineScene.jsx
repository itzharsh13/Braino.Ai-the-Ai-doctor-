import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

/** Spline-style interactive hero 3D — drag to orbit, auto-rotate when idle. */
export default function HeroSplineScene({ darkMode = false }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const w = mount.clientWidth;
    const h = mount.clientHeight || 420;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, w / h, 0.1, 100);
    camera.position.set(0, 0.5, 7);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(w, h);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    const glass = (color) =>
      new THREE.MeshPhysicalMaterial({
        color,
        metalness: 0.2,
        roughness: 0.05,
        transmission: 0.95,
        thickness: 1.5,
        transparent: true,
        opacity: 0.85,
        clearcoat: 1,
        ior: 1.45,
      });

    const brain = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.35, 4),
      glass(darkMode ? 0x818cf8 : 0x6366f1)
    );
    coreGroup.add(brain);

    const orbitRing = new THREE.Mesh(
      new THREE.TorusGeometry(2.1, 0.12, 32, 120),
      glass(darkMode ? 0x38bdf8 : 0xc084fc)
    );
    orbitRing.rotation.x = Math.PI / 2.2;
    coreGroup.add(orbitRing);

    const satellite = new THREE.Mesh(
      new THREE.SphereGeometry(0.35, 32, 32),
      glass(darkMode ? 0xa5b4fc : 0x22d3ee)
    );
    satellite.position.set(2.4, 0.6, 0);
    coreGroup.add(satellite);

    const glow = new THREE.Mesh(
      new THREE.SphereGeometry(2.8, 32, 32),
      new THREE.MeshBasicMaterial({
        color: darkMode ? 0x4f46e5 : 0x818cf8,
        transparent: true,
        opacity: 0.12,
      })
    );
    coreGroup.add(glow);

    scene.add(new THREE.AmbientLight(0xffffff, darkMode ? 0.4 : 0.65));
    const dir = new THREE.DirectionalLight(0xffffff, 1.2);
    dir.position.set(4, 6, 8);
    scene.add(dir);
    const point = new THREE.PointLight(darkMode ? 0x38bdf8 : 0xa855f7, 2, 20);
    point.position.set(-3, 2, 4);
    scene.add(point);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.enablePan = false;
    controls.minDistance = 4.5;
    controls.maxDistance = 11;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1.2;
    controls.target.set(0, 0, 0);

    const resizeObserver = new ResizeObserver(() => {
      const nw = mount.clientWidth;
      const nh = mount.clientHeight || 420;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    });
    resizeObserver.observe(mount);

    let frameId;
    const clock = new THREE.Clock();

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      brain.rotation.y = t * 0.15;
      orbitRing.rotation.z = t * 0.35;
      satellite.position.x = Math.cos(t * 0.9) * 2.4;
      satellite.position.z = Math.sin(t * 0.9) * 2.4;
      satellite.position.y = Math.sin(t * 1.2) * 0.5;
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      controls.dispose();
      renderer.dispose();
      brain.geometry.dispose();
      brain.material.dispose();
      orbitRing.geometry.dispose();
      orbitRing.material.dispose();
      satellite.geometry.dispose();
      satellite.material.dispose();
      glow.geometry.dispose();
      glow.material.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, [darkMode]);

  return (
    <div
      ref={mountRef}
      className="hero-spline-scene w-full h-[min(420px,55vw)] min-h-[320px] rounded-[2rem] overflow-hidden spline-scene-glow"
      role="img"
      aria-label="Interactive 3D Braino AI scene — drag to explore"
    />
  );
}
