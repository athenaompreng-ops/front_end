import { useRef, useEffect, useState } from "react";
import { Renderer, Program, Triangle, Mesh } from "ogl";

const DEFAULT_COLOR = "#ffffff";
const parseColor = (color: string) => {
  const c = color.trim().toLowerCase();
  if (c.startsWith("#")) {
    const hex = c.substring(1);
    if (hex.length === 3) {
      return [
        parseInt(hex[0] + hex[0], 16) / 255,
        parseInt(hex[1] + hex[1], 16) / 255,
        parseInt(hex[2] + hex[2], 16) / 255,
      ];
    }
    if (hex.length >= 6) {
      return [
        parseInt(hex.substring(0, 2), 16) / 255,
        parseInt(hex.substring(2, 4), 16) / 255,
        parseInt(hex.substring(4, 6), 16) / 255,
      ];
    }
  }
  if (c.startsWith("rgb")) {
    const values = c.match(/[\d.]+/g);
    if (values && values.length >= 3) {
      return [
        parseFloat(values[0]) / 255,
        parseFloat(values[1]) / 255,
        parseFloat(values[2]) / 255,
      ];
    }
  }
  return [1, 1, 1];
};

const getAnchorAndDir = (origin: string, w: number, h: number) => {
  const outside = 0.2;
  switch (origin) {
    case "top-left":
      return { anchor: [0, -outside * h], dir: [0, 1] };
    case "top-right":
      return { anchor: [w, -outside * h], dir: [0, 1] };
    case "left":
      return { anchor: [-outside * w, 0.5 * h], dir: [1, 0] };
    case "right":
      return { anchor: [(1 + outside) * w, 0.5 * h], dir: [-1, 0] };
    case "bottom-left":
      return { anchor: [0, (1 + outside) * h], dir: [0, -1] };
    case "bottom-center":
      return { anchor: [0.5 * w, (1 + outside) * h], dir: [0, -1] };
    case "bottom-right":
      return { anchor: [w, (1 + outside) * h], dir: [0, -1] };
    case "top-center":
    default:
      return { anchor: [0.5 * w, -outside * h], dir: [0, 1] };
  }
};

export default function LightRays({
  raysOrigin = "top-center",
  raysColor = DEFAULT_COLOR,
  raysSpeed = 1,
  lightSpread = 1,
  rayLength = 2,
  pulsating = false,
  fadeDistance = 1,
  saturation = 1,
  followMouse = true,
  mouseInfluence = 0.1,
  noiseAmount = 0,
  distortion = 0,
  style = {},
  className = "",
}: any) {
  const containerRef = useRef<HTMLDivElement>(null);
  const uniformsRef = useRef<any>(null);
  const rendererRef = useRef<any>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const smoothMouseRef = useRef({ x: 0.5, y: 0.5 });
  const animationIdRef = useRef<number | null>(null);
  const meshRef = useRef<any>(null);
  const cleanupFunctionRef = useRef<(() => void) | null>(null);
  const isVisibleRef = useRef(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    observerRef.current = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        isVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.1 }
    );
    observerRef.current.observe(containerRef.current);
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    const initializeWebGL = async () => {
      if (!containerRef.current) return;
      await new Promise((resolve) => setTimeout(resolve, 10));
      if (!containerRef.current) return;
      const renderer = new Renderer({
        dpr: 1, // FORCE DPR to 1 to fix extreme GPU lag
        alpha: true,
      });
      rendererRef.current = renderer;
      const gl = renderer.gl;
      gl.canvas.style.width = "100%";
      gl.canvas.style.height = "100%";
      gl.canvas.style.display = "block";
      while (containerRef.current.firstChild) {
        containerRef.current.removeChild(containerRef.current.firstChild);
      }
      containerRef.current.appendChild(gl.canvas);
      const vert = `
        attribute vec2 position;
        varying vec2 vUv;
        void main() {
          vUv = position * 0.5 + 0.5;
          gl_Position = vec4(position, 0.0, 1.0);
        }`;
      const frag = `precision highp float;
        uniform float iTime;
        uniform vec2  iResolution;
        uniform vec2  rayPos;
        uniform vec2  rayDir;
        uniform vec3  raysColor;
        uniform float raysSpeed;
        uniform float lightSpread;
        uniform float rayLength;
        uniform float pulsating;
        uniform float fadeDistance;
        uniform float saturation;
        uniform vec2  mousePos;
        uniform float mouseInfluence;
        uniform float noiseAmount;
        uniform float distortion;

        varying vec2 vUv;

        float noise(vec2 st) {
          return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
        }

        float rayStrength(vec2 raySource, vec2 rayRefDirection, vec2 coord,
                          float seedA, float seedB, float speed) {
          vec2 sourceToCoord = coord - raySource;
          vec2 dirNorm = normalize(sourceToCoord);
          float cosAngle = dot(dirNorm, rayRefDirection);

          float distortedAngle = cosAngle + distortion * sin(iTime * 2.0 + length(sourceToCoord) * 0.01) * 0.2;

          float spreadFactor = pow(max(distortedAngle, 0.0), 1.0 / max(lightSpread, 0.001));

          float distance = length(sourceToCoord);
          float maxDistance = iResolution.x * rayLength;
          float lengthFalloff = clamp((maxDistance - distance) / maxDistance, 0.0, 1.0);

          float fadeFalloff = clamp((iResolution.x * fadeDistance - distance) / (iResolution.x * fadeDistance), 0.5, 1.0);
          float pulse = pulsating > 0.5 ? (0.8 + 0.2 * sin(iTime * speed * 3.0)) : 1.0;

          float baseStrength = clamp(
            (0.45 + 0.15 * sin(distortedAngle * seedA + iTime * speed)) +
            (0.3 + 0.2 * cos(-distortedAngle * seedB + iTime * speed)),
            0.0, 1.0
          );

          return baseStrength * lengthFalloff * fadeFalloff * spreadFactor * pulse;
        }

        void mainImage(out vec4 fragColor, in vec2 fragCoord) {
          vec2 coord = vec2(fragCoord.x, iResolution.y - fragCoord.y);

          vec2 finalRayDir = rayDir;
          if (mouseInfluence > 0.0) {
            vec2 mouseScreenPos = mousePos * iResolution.xy;
            vec2 mouseDirection = normalize(mouseScreenPos - rayPos);
            finalRayDir = normalize(mix(rayDir, mouseDirection, mouseInfluence));
          }

          vec4 rays1 = vec4(1.0) *
                       rayStrength(rayPos, finalRayDir, coord, 36.2214, 21.11349,
                                   1.5 * raysSpeed);
          vec4 rays2 = vec4(1.0) *
                       rayStrength(rayPos, finalRayDir, coord, 22.3991, 18.0234,
                                   1.1 * raysSpeed);

          fragColor = rays1 * 0.7 + rays2 * 0.55;

          if (noiseAmount > 0.0) {
            float n = noise(coord * 0.01 + iTime * 0.1);
            fragColor.rgb *= (1.0 - noiseAmount + noiseAmount * n);
          }

          if (saturation != 1.0) {
            float gray = dot(fragColor.rgb, vec3(0.299, 0.587, 0.114));
            fragColor.rgb = mix(vec3(gray), fragColor.rgb, saturation);
          }

          fragColor.rgb *= raysColor;
        }

        void main() {
          vec4 color;
          mainImage(color, gl_FragCoord.xy);
          gl_FragColor  = color;
        }`;
      const uniforms = {
        iTime: { value: 1 },
        iResolution: { value: [1, 1] },
        rayPos: { value: [0, 0] },
        rayDir: { value: [0, 1] },
        raysColor: { value: parseColor(raysColor) },
        raysSpeed: { value: raysSpeed },
        lightSpread: { value: lightSpread },
        rayLength: { value: rayLength },
        pulsating: { value: pulsating ? 1 : 0 },
        fadeDistance: { value: fadeDistance },
        saturation: { value: saturation },
        mousePos: { value: [0.5, 0.5] },
        mouseInfluence: { value: mouseInfluence },
        noiseAmount: { value: noiseAmount },
        distortion: { value: distortion },
      };
      uniformsRef.current = uniforms;
      const geometry = new Triangle(gl);
      const program = new Program(gl, { vertex: vert, fragment: frag, uniforms });
      const mesh = new Mesh(gl, { geometry, program });
      meshRef.current = mesh;
      const handleResize = () => {
        if (!containerRef.current || !renderer) return;
        renderer.dpr = 1; // FORCE DPR 1
        const { clientWidth: wCSS, clientHeight: hCSS } = containerRef.current;
        if (wCSS === 0 || hCSS === 0) return;
        renderer.setSize(wCSS, hCSS);
        const dpr = renderer.dpr;
        const w = wCSS * dpr;
        const h = hCSS * dpr;
        uniforms.iResolution.value = [w, h];
        const { anchor, dir } = getAnchorAndDir(raysOrigin, w, h);
        uniforms.rayPos.value = anchor;
        uniforms.rayDir.value = dir;
      };
      resizeObserverRef.current = new ResizeObserver(handleResize);
      resizeObserverRef.current.observe(containerRef.current);
      handleResize();
      const loop = (t: number) => {
        if (!rendererRef.current || !uniformsRef.current || !meshRef.current) return;
        
        // PAUSE if not visible
        if (!isVisibleRef.current) {
          animationIdRef.current = requestAnimationFrame(loop);
          return;
        }

        uniforms.iTime.value = t * 0.001;
        if (followMouse && mouseInfluence > 0) {
          const smoothing = 0.92;
          smoothMouseRef.current.x =
            smoothMouseRef.current.x * smoothing + mouseRef.current.x * (1 - smoothing);
          smoothMouseRef.current.y =
            smoothMouseRef.current.y * smoothing + mouseRef.current.y * (1 - smoothing);
          uniforms.mousePos.value = [smoothMouseRef.current.x, smoothMouseRef.current.y];
        }
        try {
          renderer.render({ scene: mesh });
          animationIdRef.current = requestAnimationFrame(loop);
        } catch (error) {
          return;
        }
      };
      animationIdRef.current = requestAnimationFrame(loop);
      cleanupFunctionRef.current = () => {
        if (animationIdRef.current) {
          cancelAnimationFrame(animationIdRef.current);
          animationIdRef.current = null;
        }
        if (resizeObserverRef.current) {
          resizeObserverRef.current.disconnect();
        }
        if (renderer) {
          try {
            const canvas = renderer.gl.canvas;
            const loseContextExt = renderer.gl.getExtension("WEBGL_lose_context");
            if (loseContextExt) loseContextExt.loseContext();
            if (canvas && canvas.parentNode) canvas.parentNode.removeChild(canvas);
          } catch (error) {}
        }
        rendererRef.current = null;
        uniformsRef.current = null;
        meshRef.current = null;
      };
    };
    initializeWebGL();
    return () => {
      if (cleanupFunctionRef.current) {
        cleanupFunctionRef.current();
        cleanupFunctionRef.current = null;
      }
    };
  }, [raysOrigin]); // Removed isVisible from dependency array to prevent context destruction

  useEffect(() => {
    if (!uniformsRef.current || !containerRef.current || !rendererRef.current || !meshRef.current)
      return;
    const u = uniformsRef.current;
    u.raysColor.value = parseColor(raysColor);
    u.raysSpeed.value = raysSpeed;
    u.lightSpread.value = lightSpread;
    u.rayLength.value = rayLength;
    u.pulsating.value = pulsating ? 1 : 0;
    u.fadeDistance.value = fadeDistance;
    u.saturation.value = saturation;
    u.mouseInfluence.value = mouseInfluence;
    u.noiseAmount.value = noiseAmount;
    u.distortion.value = distortion;
    const { clientWidth: wCSS, clientHeight: hCSS } = containerRef.current;
    const dpr = rendererRef.current.dpr;
    const { anchor, dir } = getAnchorAndDir(raysOrigin, wCSS * dpr, hCSS * dpr);
    u.rayPos.value = anchor;
    u.rayDir.value = dir;
  }, [
    raysColor,
    raysSpeed,
    lightSpread,
    raysOrigin,
    rayLength,
    pulsating,
    fadeDistance,
    saturation,
    mouseInfluence,
    noiseAmount,
    distortion,
  ]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current || !rendererRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      mouseRef.current = { x, y };
    };
    if (followMouse) {
      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }
  }, [followMouse]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        width: "100%",
        height: "100%",
        position: "absolute",
        top: 0,
        left: 0,
        overflow: "hidden",
        backgroundColor: "transparent",
        pointerEvents: "none",
        ...style,
      }}
    />
  );
}
