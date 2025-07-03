import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
}

export default function MatrixBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationIdRef = useRef<number>();
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Particle count reduced by 20% from previous (75→60, 45→36)
    const getParticleCount = () => {
      return window.innerWidth < 768 ? 36 : 60;
    };

    // Particle speed reduced by 15% from previous (1.04→0.884)
    const createParticle = (): Particle => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.884, // 1.04 * 0.85 = 0.884
      vy: (Math.random() - 0.5) * 0.884,
      size: 2.4, // 20% larger than original
    });

    // Initialize particles
    const initParticles = () => {
      particlesRef.current = [];
      const count = getParticleCount();
      for (let i = 0; i < count; i++) {
        particlesRef.current.push(createParticle());
      }
    };

    // Update particle positions and handle bouncing
    const updateParticles = () => {
      for (const particle of particlesRef.current) {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Bounce off edges
        if (particle.x <= 0 || particle.x >= canvas.width) {
          particle.vx = -particle.vx;
          particle.x = Math.max(0, Math.min(canvas.width, particle.x));
        }
        if (particle.y <= 0 || particle.y >= canvas.height) {
          particle.vy = -particle.vy;
          particle.y = Math.max(0, Math.min(canvas.height, particle.y));
        }
      }
    };

    // Calculate distance between two particles
    const getDistance = (p1: Particle, p2: Particle) => {
      const dx = p1.x - p2.x;
      const dy = p1.y - p2.y;
      return Math.sqrt(dx * dx + dy * dy);
    };

    // Draw particles and connections
    const draw = () => {
      // Clear canvas with transparent background
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connections first (behind particles)
      ctx.strokeStyle = "#0066ff";
      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const distance = getDistance(
            particlesRef.current[i],
            particlesRef.current[j],
          );

          if (distance < 240) {
            // Connection distance reduced by 20% from 300px to 240px
            // Calculate opacity based on distance (closer = more opaque)
            const opacity = (1 - distance / 240) * 0.6;

            ctx.globalAlpha = opacity;
            ctx.lineWidth = 1.3;
            ctx.beginPath();
            ctx.moveTo(particlesRef.current[i].x, particlesRef.current[i].y);
            ctx.lineTo(particlesRef.current[j].x, particlesRef.current[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw particles
      ctx.globalAlpha = 1;
      ctx.fillStyle = "#0066ff";
      for (const particle of particlesRef.current) {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    // Animation loop
    const animate = () => {
      updateParticles();
      draw();
      animationIdRef.current = requestAnimationFrame(animate);
    };

    // Resize handler
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      // Reinitialize particles if count changed
      const newCount = getParticleCount();
      if (particlesRef.current.length !== newCount) {
        initParticles();
      }
    };

    // Initialize canvas
    const setupCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
      animate();
    };

    // Window resize event
    window.addEventListener("resize", handleResize);

    // Start the matrix
    setupCanvas();

    // Cleanup function
    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none"
      style={{ zIndex: -999, background: "transparent" }}
    />
  );
}
