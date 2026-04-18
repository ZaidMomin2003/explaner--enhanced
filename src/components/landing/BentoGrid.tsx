"use client";

import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Matter from "matter-js";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/base-ui/card";

const BentoGrid = () => {
  return (
    <div
      className="w-full flex items-center justify-center px-4 py-2 md:px-6 md:py-4"
      style={{ fontFamily: '"Plus Jakarta Sans", "Inter", sans-serif' }}
    >
      {/* Bento Grid Container — scaled down to fit viewport */}
      <div
        className="w-full mx-auto relative origin-top"
        style={{ maxWidth: 1200, transform: "scale(0.82)", marginBottom: "-10%" }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 [grid-auto-rows:minmax(140px,auto)] xl:[grid-template-rows:160px_230px_220px_160px] gap-4 sm:gap-5 lg:gap-6 xl:gap-7 relative">
          {/* Card 1 */}
          <Card
            className="rounded-2xl border border-white/5 p-6 sm:p-8 flex flex-col justify-between min-h-[280px] sm:min-h-[330px] xl:min-h-0 xl:[grid-column:1/2] xl:[grid-row:1/3]"
            style={{
              background: `radial-gradient(120% 120% at 0% 100%, rgba(194, 153, 136, 0.2) 0%, rgba(207,122,88,0) 100%),#2B2524`,
              gridColumn: "span 1",
            }}
          >
            <CardHeader className="flex flex-col gap-4 px-0">
              <Icon />
              <CardTitle className="text-3xl sm:text-4xl font-semibold bg-clip-text bg-gradient-to-r from-white to-[#A07260] text-transparent leading-tight">
                Perfect Prompts, Instantly
              </CardTitle>
            </CardHeader>
            <CardFooter className="px-0 items-start flex-col bg-transparent border-none">
              <CardTitle className="text-lg font-bold text-[#E6E3FF]">
                10 days free trial
              </CardTitle>
              <CardDescription className="text-md font-thin text-[#CF7A58]/80">
                then – $5/month
              </CardDescription>
            </CardFooter>
          </Card>

          {/* Card 2 */}
          <Card className="hidden xl:block sm:col-span-2 xl:[grid-column:2/4] xl:[grid-row:1/3] bg-transparent border-0 ring-0 shadow-none p-0 gap-0 relative">
            <div className="w-full max-w-[590px] mx-auto aspect-[556/396] relative">
              <CardHeader className="absolute inset-0 flex flex-col gap-3 sm:gap-4 items-center mt-8 sm:mt-12 px-4">
                <div className="flex items-center justify-center gap-1">
                  <Icon2 className="size-6 sm:size-8" />
                  <CardDescription className="text-lg sm:text-xl font-bold text-white">
                    IdeaFlow
                  </CardDescription>
                </div>
                <CardTitle className="text-white text-[38px] sm:text-[60px] max-w-[16rem] sm:max-w-80 text-center font-medium leading-none">
                  Master AI Prompting.
                </CardTitle>
              </CardHeader>
              <MainCurvedCard />
            </div>
          </Card>

          {/* Fireball image */}
          <div className="hidden xl:block pointer-events-none absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-[48%]">
            <img
              src="https://assets.watermelon.sh/fireball.png"
              alt="Decorative"
              className="w-[320px] max-w-full"
            />
          </div>

          {/* Card 3 */}
          <Card
            className="rounded-2xl border border-white/10 bg-[#252525] flex items-center justify-center min-h-[150px] xl:[grid-column:4/5] xl:[grid-row:1/2]"
            style={{
              background: `radial-gradient(120% 120% at 0% 100%, rgba(194, 153, 136, 0.2) 0%, rgba(207,122,88,0) 100%),#2B2524`,
            }}
          >
            <CardContent className="px-0">
              <CardThreeToggle />
            </CardContent>
          </Card>

          {/* Card 4 */}
          <Card
            className="rounded-2xl border border-white/10 flex flex-col items-center justify-center gap-2 sm:gap-3 min-h-[180px] xl:[grid-column:4/5] xl:[grid-row:2/3]"
            style={{
              background: `radial-gradient(120% 120% at 0% 100%, rgba(194, 153, 136, 0.2) 0%, rgba(207,122,88,0) 100%),#2B2524`,
            }}
          >
            <CardTitle className="text-[52px] sm:text-[70px] font-bold tracking-tight leading-none text-transparent bg-clip-text bg-gradient-to-r from-[#F5F1FF] to-[#EB642E]">
              17M+
            </CardTitle>
            <CardDescription className="text-sm sm:text-lg font-thin text-[#CF7A58] px-4 sm:px-6 py-2 border-x border-[#CF7A58] bg-gradient-to-r from-[#CF7A58]/10 to-[#CF7A58]/30">
              prompts crafted
            </CardDescription>
          </Card>

          {/* Card 5 */}
          <Card
            className="rounded-2xl border border-white/10 p-6 sm:p-8 flex flex-col items-center justify-center gap-2 min-h-[220px] xl:[grid-column:1/2] xl:[grid-row:3/4]"
            style={{
              background: `radial-gradient(120% 120% at 0% 100%, rgba(194, 153, 136, 0.2) 0%, rgba(207,122,88,0) 100%),#2B2524`,
            }}
          >
            <CardHeader className="flex flex-col items-center justify-center px-0">
              <CardTitle className="text-[52px] sm:text-[70px] font-bold tracking-tight leading-none text-transparent bg-clip-text bg-gradient-to-r from-[#FFB266] via-[#E9766F] to-[#C04350]">
                21K
              </CardTitle>
              <CardDescription className="text-md font-thin text-[#CF7A58]/80 text-center">
                satisfied users
              </CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-center px-0">
              <div className="size-12 sm:size-16 bg-[#EB642E]/80 rounded-full border-[3px] border-[#352B28] relative overflow-hidden z-10">
                <img
                  src="https://assets.watermelon.sh/profile-1.png"
                  alt="Profile-1"
                  className="w-full h-full"
                />
              </div>
              <div className="size-12 sm:size-16 bg-white rounded-full border-[3px] border-[#352B28] -ml-3 sm:-ml-4 flex items-center justify-center relative z-20">
                <Star className="mt-2 sm:mt-3" />
              </div>
              <div className="size-12 sm:size-16 bg-[#E58C5D] rounded-full border-[3px] border-[#352B28] -ml-3 sm:-ml-4 relative z-30 overflow-hidden">
                <img
                  src="https://assets.watermelon.sh/profile-2.png"
                  alt="Profile-2"
                  className="w-full h-full"
                />
              </div>
            </CardContent>
          </Card>

          {/* Card 6 */}
          <Card className="hidden xl:block relative sm:col-span-1 xl:[grid-column:2/3] xl:[grid-row:3/5] bg-transparent border-0 ring-0 shadow-none p-0 gap-0">
            <div className="relative w-full max-w-[264px] h-[360px] sm:h-[410px] mx-auto overflow-hidden">
              <div className="relative w-full h-full">
                {/* Hidden SVG definitions */}
                <svg width="0" height="0" className="absolute">
                  <defs>
                    <clipPath id="cardClip" clipPathUnits="userSpaceOnUse">
                      <path d="M118.572 22.9996C116.289 10.2858 105.878 0 92.9611 0H24C10.7452 0 0 10.7452 0 24V388C0 401.255 10.7452 412 24 412H240C253.255 412 264 401.255 264 388V178.229C264 165.819 254.471 155.646 242.376 152.869C179.242 138.374 130.103 87.2133 118.572 22.9996Z" />
                    </clipPath>
                  </defs>
                </svg>
                {/* Clipped container */}
                <div
                  className="relative w-full h-full"
                  style={{ clipPath: "url(#cardClip)" }}
                >
                  <CurvedCard />
                  {/* Decorative lines */}
                  <Branch className="absolute top-0 left-0" />
                </div>
              </div>
              <Barrel
                className="absolute top-48 sm:top-[220px]"
                iconClassName="bg-gradient-to-b from-[#E6A185]/70 to-[#EB642E]"
                icon={<Wire className="size-6" />}
              />
              <CardFooter className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-end w-full h-full items-start px-6 sm:px-8 bg-transparent border-none">
                <CardTitle className="text-white font-semibold text-lg">
                  Branching paths
                </CardTitle>
                <CardDescription className="text-[#CF7A58]/80 text-sm leading-snug font-thin mt-1">
                  Discover ideas through multiple prompt routes.
                </CardDescription>
              </CardFooter>
            </div>
          </Card>

          {/* Card 7 */}
          <Card className="hidden xl:flex justify-center xl:justify-end sm:col-span-1 xl:[grid-column:3/4] xl:[grid-row:3/5] bg-transparent border-0 ring-0 shadow-none p-0 gap-0">
            <div className="relative w-full max-w-[264px] h-[360px] sm:h-[410px]">
              <div className="relative w-full h-full -scale-x-100">
                {/* Hidden SVG definitions */}
                <svg width="0" height="0" className="absolute">
                  <defs>
                    <clipPath id="cardClip2" clipPathUnits="userSpaceOnUse">
                      <path d="M118.572 22.9996C116.289 10.2858 105.878 0 92.9611 0H24C10.7452 0 0 10.7452 0 24V388C0 401.255 10.7452 412 24 412H240C253.255 412 264 401.255 264 388V178.229C264 165.819 254.471 155.646 242.376 152.869C179.242 138.374 130.103 87.2133 118.572 22.9996Z" />
                    </clipPath>
                  </defs>
                </svg>
                {/* Clipped container */}
                <div
                  className="relative w-full h-full"
                  style={{ clipPath: "url(#cardClip2)" }}
                >
                  <CurvedCard />
                  {/* Decorative lines */}
                  <Branch className="absolute top-0 left-0" />
                </div>
              </div>
              <Barrel
                className="absolute top-48 sm:top-[220px]"
                iconClassName="bg-white"
                icon={<MagicCapture className="size-8" />}
              />
              <CardFooter className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-end w-full h-full items-start px-6 sm:px-8 bg-transparent border-none">
                <CardTitle className="text-white font-semibold text-lg">
                  Precision booster
                </CardTitle>
                <CardDescription className="text-[#CF7A58]/80 text-sm leading-snug font-thin mt-1">
                  Sharpen every prompt with keyword boosts.
                </CardDescription>
              </CardFooter>
            </div>
          </Card>

          {/* Card 8 */}
          <Card
            className="rounded-2xl border border-white/10 p-6 sm:p-8 flex flex-col justify-between overflow-hidden min-h-[260px] sm:min-h-[320px] xl:h-full sm:col-span-2 xl:[grid-column:4/5] xl:[grid-row:3/5]"
            style={{
              background: `radial-gradient(120% 120% at 0% 100%, rgba(194, 153, 136, 0.2) 0%, rgba(207,122,88,0) 100%),#2B2524`,
            }}
          >
            <CardHeader className="w-full flex flex-col px-0">
              <CardTitle className="text-xl font-semibold text-white">
                Prompt templates
              </CardTitle>
              <CardDescription className="text-md font-thin text-[#CF7A58]/80 leading-[20px] mt-1">
                Start faster with ready-to-use templates.
              </CardDescription>
            </CardHeader>
            <CardContent className="px-0 pt-0 flex-1 min-h-0">
              <GravityStack />
            </CardContent>
          </Card>

          {/* Card 9 */}
          <Card
            className="rounded-2xl border border-white/10 flex items-center justify-center relative min-h-[120px] sm:col-span-2 xl:[grid-column:1/2] xl:[grid-row:4/5]"
            style={{
              background: `radial-gradient(120% 120% at 0% 100%, rgba(194, 153, 136, 0.2) 0%, rgba(207,122,88,0) 100%),#2B2524`,
            }}
          >
            <CardContent className="px-0">
              <CardNineCTA />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export { BentoGrid };
export default BentoGrid;

const TinyStarIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2.75L14.73 8.28L20.84 9.16L16.42 13.47L17.46 19.56L12 16.69L6.54 19.56L7.58 13.47L3.16 9.16L9.27 8.28L12 2.75Z" />
    </svg>
  );
};

const CardThreeToggle = () => {
  const [enabled, setEnabled] = React.useState(false);
  return (
    <button
      type="button"
      aria-pressed={enabled}
      onClick={() => setEnabled((value) => !value)}
      className="w-36 h-18 border border-[#CB8265]/45 rounded-full relative overflow-hidden"
    >
      <motion.div
        className="absolute inset-0"
        transition={{ duration: 0.24, ease: [0.2, 0.7, 0.2, 1] }}
      />
      <motion.div
        className="size-16 rounded-full absolute top-1 left-1 flex items-center justify-center"
        animate={{
          x: enabled ? 72 : 0,
          boxShadow: enabled
            ? "0 0 0 1px rgba(235,100,46,0.2), inset 0 0 14px rgba(235,100,46,0.16)"
            : "0 0 0 0 rgba(0,0,0,0)",
          background: enabled
            ? "radial-gradient(circle at 40% 35%, #FFFFFF 0%, rgba(255,255,255,0.95) 60%, rgba(235,235,235,0.9) 100%)"
            : "radial-gradient(circle at 40% 35%, #E6A185 0%, rgba(235,100,46,0.85) 70%, rgba(235,100,46,0.7) 100%)",
        }}
        transition={{ type: "spring", stiffness: 420, damping: 30, mass: 0.8 }}
      >
        <motion.div
          key={enabled ? "star" : "magic"}
          initial={{ opacity: 0, scale: 0.7, rotate: -45 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="flex items-center justify-center"
        >
          {enabled ? (
            <TinyStarIcon className="size-8 text-[#EB642E]" />
          ) : (
            <MagicStar />
          )}
        </motion.div>
      </motion.div>
    </button>
  );
};

type StarParticle = {
  id: number;
  angle: number;
  distance: number;
  rotate: number;
  size: number;
  delay: number;
  duration: number;
};

const makeStarParticles = (count: number): StarParticle[] => {
  return Array.from({ length: count }, (_, index) => ({
    id: index,
    angle: Math.random() * Math.PI * 2,
    distance: 60 + Math.random() * 54,
    rotate: -180 + Math.random() * 360,
    size: 20 + Math.random() * 10,
    delay: Math.random() * 0.08,
    duration: 0.7 + Math.random() * 0.45,
  }));
};

const CardNineCTA = ({ compact = false }: { compact?: boolean }) => {
  const [bursts, setBursts] = React.useState<
    Array<{ id: number; particles: StarParticle[] }>
  >([]);
  const burstIdRef = React.useRef(0);
  const lastTriggerAtRef = React.useRef(0);

  const triggerConfetti = () => {
    const now = Date.now();
    if (now - lastTriggerAtRef.current < 220) {
      return;
    }
    lastTriggerAtRef.current = now;
    const id = burstIdRef.current + 1;
    burstIdRef.current = id;
    setBursts([
      {
        id,
        particles: makeStarParticles(compact ? 12 : 16),
      },
    ]);
    window.setTimeout(() => {
      setBursts((previous) => previous.filter((burst) => burst.id !== id));
    }, 1600);
  };

  return (
    <div className="relative isolate">
      <button
        type="button"
        onPointerDown={triggerConfetti}
        className={`relative z-20 w-fit flex items-center justify-center rounded-full gap-2 bg-[radial-gradient(circle,#EB642E,#82462E)] shadow-[0px_1px_1px_rgba(255,255,255,0.07),inset_0px_1px_3px_rgba(1,5,30,0.5)] ${
          compact ? "px-6 py-3" : "px-10 py-3"
        }`}
      >
        <PictureIcon />
        <span
          className={`text-white ${
            compact ? "font-thin text-lg" : "font-light text-xl"
          }`}
        >
          Create
        </span>
      </button>
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#EB642E]/25 z-10 shadow-[0px_1px_1px_rgba(255,255,255,0.07),inset_0px_1px_3px_rgba(1,5,30,0.5)] ${
          compact ? "w-40 h-14" : "w-[200px] h-18"
        }`}
      />
      <div className="pointer-events-none absolute inset-0 z-30">
        {bursts.map((burst) =>
          burst.particles.map((particle) => {
            const x = Math.cos(particle.angle) * particle.distance;
            const y = Math.sin(particle.angle) * particle.distance;
            return (
              <motion.div
                key={`${burst.id}-${particle.id}`}
                className="absolute left-1/2 top-1/2"
                initial={{ x: 0, y: 0, opacity: 0, scale: 0.35, rotate: 0 }}
                animate={{
                  x,
                  y,
                  opacity: [0, 1, 0],
                  scale: [0.35, 1, 0.45],
                  rotate: particle.rotate,
                }}
                transition={{
                  duration: particle.duration,
                  delay: particle.delay,
                  ease: [0.2, 0.8, 0.2, 1],
                }}
              >
                <Star
                  className="text-white drop-shadow-[0_0_8px_rgba(235,100,46,0.8)]"
                  style={{ width: particle.size, height: particle.size }}
                />
              </motion.div>
            );
          }),
        )}
      </div>
    </div>
  );
};

// GravityStack – matter-js physics, each item falls and stacks on the one below
const GravityStack = () => {
  const stackRef = useRef<HTMLDivElement>(null);
  const itemRef0 = useRef<HTMLDivElement>(null);
  const itemRef1 = useRef<HTMLDivElement>(null);
  const itemRef2 = useRef<HTMLDivElement>(null);
  const itemRef3 = useRef<HTMLDivElement>(null);
  const itemRef4 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = stackRef.current;
    if (!container) return;

    let animId = 0;
    const { Engine, Runner, Bodies, Body, Composite, World } = Matter;

    const W = container.clientWidth;
    const H = container.clientHeight;

    const randomInRange = (min: number, max: number) =>
      min + Math.random() * (max - min);

    const eventCleanup: Array<() => void> = [];

    const engine = Engine.create({ gravity: { x: 0, y: 1.35 } });
    const runner = Runner.create();

    // Static boundaries
    const ground = Bodies.rectangle(W / 2, H + 28, W * 2, 56, {
      isStatic: true,
      friction: 0.95,
    });
    const wallL = Bodies.rectangle(-25, H / 2, 50, H * 3, { isStatic: true });
    const wallR = Bodies.rectangle(W + 25, H / 2, 50, H * 3, {
      isStatic: true,
    });
    Composite.add(engine.world, [ground, wallL, wallR]);

    type Synced = {
      body: ReturnType<typeof Bodies.rectangle>;
      el: HTMLDivElement;
      w: number;
      h: number;
    };
    const synced: Synced[] = [];

    let activeInteraction: {
      body: ReturnType<typeof Bodies.rectangle>;
      pointerId: number;
    } | null = null;

    const getLocalPoint = (event: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      };
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (
        !activeInteraction ||
        activeInteraction.pointerId !== event.pointerId
      ) {
        return;
      }
      const { body } = activeInteraction;
      const point = getLocalPoint(event);
      const deltaX = point.x - body.position.x;
      const deltaY = point.y - body.position.y;
      const clamp = (value: number, limit: number) =>
        Math.max(-limit, Math.min(limit, value));
      Body.applyForce(body, body.position, {
        x: clamp(deltaX * 0.000012, 0.0009),
        y: clamp(deltaY * 0.00001, 0.0007),
      });
      Body.setAngularVelocity(
        body,
        body.angularVelocity + clamp(deltaX * 0.00015, 0.025),
      );
    };

    const releaseInteraction = (event: PointerEvent) => {
      if (
        !activeInteraction ||
        activeInteraction.pointerId !== event.pointerId
      ) {
        return;
      }
      activeInteraction = null;
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", releaseInteraction);
    window.addEventListener("pointercancel", releaseInteraction);
    eventCleanup.push(() =>
      window.removeEventListener("pointermove", handlePointerMove),
    );
    eventCleanup.push(() =>
      window.removeEventListener("pointerup", releaseInteraction),
    );
    eventCleanup.push(() =>
      window.removeEventListener("pointercancel", releaseInteraction),
    );

    const itemRefs = [itemRef0, itemRef1, itemRef2, itemRef3, itemRef4];
    itemRefs.forEach((ref, i) => {
      const el = ref.current;
      if (!el) return;
      const w = el.offsetWidth;
      const h = el.offsetHeight;
      const minX = w / 2 + 12;
      const maxX = W - w / 2 - 12;
      const startX = randomInRange(minX, Math.max(minX, maxX));
      const startY = -(50 + i * 62);
      const startAngle = randomInRange(-0.26, 0.26);

      const body = Bodies.rectangle(startX, startY, w, h, {
        restitution: 0.08,
        friction: 0.88,
        frictionStatic: 1,
        frictionAir: 0.018,
        chamfer: { radius: Math.min(18, h / 2) },
      });
      Body.setPosition(body, { x: startX, y: startY });
      Body.setAngle(body, startAngle);
      Body.setAngularVelocity(body, randomInRange(-0.018, 0.018));

      el.style.position = "absolute";
      el.style.left = `${startX - w / 2}px`;
      el.style.top = `${startY - h / 2}px`;
      el.style.transform = `rotate(${startAngle}rad)`;
      el.style.transformOrigin = "center";
      el.style.cursor = "grab";

      Composite.add(engine.world, body);
      synced.push({ body, el, w, h });

      const handlePointerDown = (event: PointerEvent) => {
        activeInteraction = { body, pointerId: event.pointerId };
        el.style.cursor = "grabbing";
        Body.applyForce(body, body.position, {
          x: randomInRange(-0.0004, 0.0004),
          y: -0.00035,
        });
      };

      const handlePointerRelease = (event: PointerEvent) => {
        if (activeInteraction?.pointerId === event.pointerId) {
          el.style.cursor = "grab";
        }
      };

      el.addEventListener("pointerdown", handlePointerDown);
      el.addEventListener("pointerup", handlePointerRelease);
      el.addEventListener("pointercancel", handlePointerRelease);
      eventCleanup.push(() =>
        el.removeEventListener("pointerdown", handlePointerDown),
      );
      eventCleanup.push(() =>
        el.removeEventListener("pointerup", handlePointerRelease),
      );
      eventCleanup.push(() =>
        el.removeEventListener("pointercancel", handlePointerRelease),
      );
    });

    Runner.run(runner, engine);

    const sync = () => {
      synced.forEach(({ body, el, w, h }) => {
        el.style.left = `${body.position.x - w / 2}px`;
        el.style.top = `${body.position.y - h / 2}px`;
        el.style.transform = `rotate(${body.angle}rad)`;
      });
      animId = requestAnimationFrame(sync);
    };
    sync();

    return () => {
      Runner.stop(runner);
      cancelAnimationFrame(animId);
      eventCleanup.forEach((dispose) => dispose());
      World.clear(engine.world, false);
      Engine.clear(engine);
    };
  }, []);

  return (
    <div
      ref={stackRef}
      className="w-full h-44 sm:h-52 lg:h-56 xl:h-full pt-4 relative overflow-hidden select-none"
    >
      <div
        ref={itemRef0}
        className="w-fit whitespace-nowrap px-8 py-3 rounded-full border-2 border-[#EB642E] bg-[#CF7A58]/20 text-white font-semibold text-md shadow-lg"
      >
        10 days trial
      </div>
      <div
        ref={itemRef1}
        className="border border-white/5 bg-[#CF7A58]/20 px-8 py-3 w-fit rounded-full flex items-center justify-center gap-2 shadow-lg"
      >
        <span className="size-2 rounded-full bg-[#EB642E]" />
        <p className="text-white font-medium text-md">Rewrite</p>
      </div>
      <div
        ref={itemRef2}
        className="size-12 rounded-full border border-white/20 bg-gradient-to-b from-[#E6A185] to-[#EB642E]/80 flex items-center justify-center shadow-lg"
      >
        <Gift />
      </div>
      <div
        ref={itemRef3}
        className="border rotate-0 border-white/5 bg-[#CF7A58]/20 px-6 py-3 w-fit rounded-full flex items-center justify-center gap-2 shadow-lg"
      >
        <span className="size-2 rounded-full bg-[#EB642E]" />
        <p className="text-white font-medium text-md">JPG</p>
        <span className="size-2 rounded-full bg-[#FFB266]" />
        <p className="text-white font-medium text-md">PNG</p>
        <span className="size-2 rounded-full bg-[#CDAC9F]" />
        <p className="text-white font-medium text-md">PDF</p>
      </div>
      <div
        ref={itemRef4}
        className="size-12 rounded-full border border-white/20 bg-gradient-to-b from-[#E6A185] to-[#EB642E]/80 flex items-center justify-center shadow-lg"
      >
        <Camera />
      </div>
    </div>
  );
};

const Icon = () => {
  return (
    <svg
      width="52"
      height="52"
      viewBox="0 0 52 52"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_iii_4_6126)">
        <mask
          id="mask0_4_6126"
          style={{ maskType: "luminance" }}
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="52"
          height="52"
        >
          <path
            d="M39 0H13C5.8203 0 0 5.8203 0 13V39C0 46.1797 5.8203 52 13 52H39C46.1797 52 52 46.1797 52 39V13C52 5.8203 46.1797 0 39 0Z"
            fill="white"
          />
        </mask>
        <g mask="url(#mask0_4_6126)">
          <path
            d="M39 0H13C5.8203 0 0 5.8203 0 13V39C0 46.1797 5.8203 52 13 52H39C46.1797 52 52 46.1797 52 39V13C52 5.8203 46.1797 0 39 0Z"
            fill="#EB642E"
          />
          <path d="M52 0H0V52H52V0Z" fill="url(#paint0_linear_4_6126)" />
          <g filter="url(#filter1_d_4_6126)">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M31.9616 22.1593C31.5222 26.7226 27.6769 30.2906 22.9983 30.2906C22.0192 30.2906 21.0767 30.1343 20.1942 29.8454C20.6336 25.2821 24.4789 21.7141 29.1575 21.7141C30.1366 21.7141 31.0791 21.8704 31.9616 22.1593ZM31.5701 18.5174C30.7896 18.3639 29.983 18.2835 29.1575 18.2835C23.2176 18.2835 18.2503 22.4481 17.0162 28.0168C15.1615 26.3673 13.9931 23.9627 13.9931 21.2854C13.9931 16.3119 18.0248 12.2801 22.9983 12.2801C27.006 12.2801 30.4022 14.8982 31.5701 18.5174ZM35.3621 19.9395C34.691 13.7044 29.4116 8.84961 22.9983 8.84961C16.1302 8.84961 10.5625 14.4172 10.5625 21.2854C10.5625 25.8939 13.0693 29.9169 16.7937 32.0652C17.4647 38.3003 22.7442 43.155 29.1575 43.155C36.0256 43.155 41.5933 37.5874 41.5933 30.7193C41.5933 26.1108 39.0865 22.0878 35.3621 19.9395ZM35.1395 23.9879C33.9055 29.5566 28.9382 33.7212 22.9983 33.7212C22.1728 33.7212 21.3661 33.6407 20.5857 33.4873C21.7535 37.1065 25.1498 39.7246 29.1575 39.7246C34.131 39.7246 38.1627 35.6927 38.1627 30.7193C38.1627 28.0419 36.9943 25.6374 35.1395 23.9879Z"
              fill="url(#paint1_linear_4_6126)"
            />
          </g>
        </g>
        <path
          d="M39.0026 1.0835H13.0026C6.42121 1.0835 1.08594 6.41877 1.08594 13.0002V39.0002C1.08594 45.5816 6.42121 50.9168 13.0026 50.9168H39.0026C45.584 50.9168 50.9193 45.5816 50.9193 39.0002V13.0002C50.9193 6.41877 45.584 1.0835 39.0026 1.0835Z"
          stroke="url(#paint2_linear_4_6126)"
          strokeWidth="2"
        />
      </g>
      <defs>
        <filter
          id="filter0_iii_4_6126"
          x="0"
          y="-3"
          width="52"
          height="58"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset dy="-3" />
          <feGaussianBlur stdDeviation="1.5" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
          <feBlend mode="normal" in2="shape" result="effect1_innerShadow_4_6126" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset dy="3" />
          <feGaussianBlur stdDeviation="1.5" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.1 0" />
          <feBlend mode="normal" in2="effect1_innerShadow_4_6126" result="effect2_innerShadow_4_6126" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" />
          <feBlend mode="normal" in2="effect2_innerShadow_4_6126" result="effect3_innerShadow_4_6126" />
        </filter>
        <filter
          id="filter1_d_4_6126"
          x="5.8125"
          y="6.47461"
          width="40.5312"
          height="43.8057"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset dy="2.375" />
          <feGaussianBlur stdDeviation="2.375" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.141176 0 0 0 0 0.141176 0 0 0 0 0.141176 0 0 0 0.1 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_4_6126" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_4_6126" result="shape" />
        </filter>
        <linearGradient id="paint0_linear_4_6126" x1="26" y1="5.81145e-07" x2="28.1667" y2="52" gradientUnits="userSpaceOnUse">
          <stop stopColor="white" stopOpacity="0" />
          <stop offset="1" stopColor="white" stopOpacity="0.12" />
        </linearGradient>
        <linearGradient id="paint1_linear_4_6126" x1="26.0779" y1="8.84961" x2="26.0779" y2="43.1551" gradientUnits="userSpaceOnUse">
          <stop stopColor="white" stopOpacity="0.8" />
          <stop offset="1" stopColor="white" stopOpacity="0.5" />
        </linearGradient>
        <linearGradient id="paint2_linear_4_6126" x1="26.0026" y1="0.000162733" x2="26.0026" y2="52.0002" gradientUnits="userSpaceOnUse">
          <stop stopColor="white" stopOpacity="0.12" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
};

const Icon2 = ({ className }: { className?: string }) => {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 26 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <mask
        id="mask0_4_6114"
        style={{ maskType: "luminance" }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="26"
        height="26"
      >
        <path
          d="M19.5 0H6.5C2.91015 0 0 2.91015 0 6.5V19.5C0 23.0899 2.91015 26 6.5 26H19.5C23.0899 26 26 23.0899 26 19.5V6.5C26 2.91015 23.0899 0 19.5 0Z"
          fill="white"
        />
      </mask>
      <g mask="url(#mask0_4_6114)">
        <path
          d="M19.5 0H6.5C2.91015 0 0 2.91015 0 6.5V19.5C0 23.0899 2.91015 26 6.5 26H19.5C23.0899 26 26 23.0899 26 19.5V6.5C26 2.91015 23.0899 0 19.5 0Z"
          fill="white"
        />
        <path d="M26 0H0V26H26V0Z" fill="url(#paint0_linear_4_6114)" />
        <g filter="url(#filter0_d_4_6114)">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M15.9808 11.0806C15.7611 13.3623 13.8384 15.1463 11.4992 15.1463C11.0096 15.1463 10.5383 15.0682 10.0971 14.9237C10.3168 12.642 12.2394 10.858 14.5787 10.858C15.0683 10.858 15.5396 10.9362 15.9808 11.0806ZM15.785 9.2597C15.3948 9.18294 14.9915 9.14275 14.5787 9.14275C11.6088 9.14275 9.12513 11.225 8.50812 14.0094C7.58073 13.1846 6.99655 11.9823 6.99655 10.6437C6.99655 8.15692 9.01241 6.14105 11.4992 6.14105C13.503 6.14105 15.2011 7.4501 15.785 9.2597ZM17.681 9.97074C17.3455 6.85318 14.7058 4.42578 11.4992 4.42578C8.06509 4.42578 5.28125 7.2096 5.28125 10.6437C5.28125 12.9479 6.53467 14.9594 8.39686 16.0336C8.73237 19.1511 11.3721 21.5785 14.5787 21.5785C18.0128 21.5785 20.7966 18.7947 20.7966 15.3607C20.7966 13.0564 19.5432 11.0449 17.681 9.97074ZM17.5698 11.995C16.9528 14.7793 14.4691 16.8616 11.4992 16.8616C11.0864 16.8616 10.6831 16.8213 10.2929 16.7446C10.8768 18.5542 12.5749 19.8633 14.5787 19.8633C17.0655 19.8633 19.0813 17.8473 19.0813 15.3607C19.0813 14.0219 18.4972 12.8197 17.5698 11.995Z"
            fill="url(#paint1_linear_4_6114)"
          />
        </g>
      </g>
      <defs>
        <filter id="filter0_d_4_6114" x="0.53125" y="2.05078" width="25.0156" height="26.6528" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset dy="2.375" />
          <feGaussianBlur stdDeviation="2.375" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.141176 0 0 0 0 0.141176 0 0 0 0 0.141176 0 0 0 0.1 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_4_6114" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_4_6114" result="shape" />
        </filter>
        <linearGradient id="paint0_linear_4_6114" x1="13" y1="2.90573e-07" x2="14.0833" y2="26" gradientUnits="userSpaceOnUse">
          <stop stopColor="white" stopOpacity="0" />
          <stop offset="1" stopColor="white" stopOpacity="0.12" />
        </linearGradient>
        <linearGradient id="paint1_linear_4_6114" x1="13.0389" y1="4.42578" x2="13.0389" y2="21.5785" gradientUnits="userSpaceOnUse">
          <stop stopColor="#EB642E" />
          <stop offset="1" stopColor="#85381A" />
        </linearGradient>
      </defs>
    </svg>
  );
};

const PictureIcon = ({ className }: { className?: string }) => {
  return (
    <svg width="26" height="27" viewBox="0 0 26 27" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path fillRule="evenodd" clipRule="evenodd" d="M19.6067 1C19.9652 1 20.2736 1.25375 20.3427 1.60556C20.6944 3.39777 22.1022 4.81552 23.8277 5.16238C24.1779 5.23279 24.4299 5.54044 24.4299 5.89767C24.4299 6.25491 24.1779 6.56256 23.8277 6.63296C22.1016 6.97995 20.6939 8.39578 20.3423 10.1874C20.2732 10.5392 19.9648 10.7929 19.6063 10.7929C19.2478 10.7929 18.9394 10.5392 18.8703 10.1874C18.5187 8.3957 17.1113 6.97993 15.3853 6.63296C15.0351 6.56256 14.7832 6.25491 14.7832 5.89767C14.7832 5.54044 15.0351 5.23279 15.3853 5.16238C17.1109 4.8155 18.519 3.39768 18.8707 1.60556C18.9398 1.25375 19.2482 1 19.6067 1ZM13.0332 5.89767C13.0332 5.69692 13.057 5.51209 13.1023 5.32373C10.4016 5.32373 7.70078 5.32373 5 5.32373C2.79086 5.32373 1 7.11459 1 9.32373V20.3237C1 22.5329 2.79006 24.3237 4.9992 24.3237C8.18474 24.3237 12.6311 24.3237 15.8663 24.3237C18.0754 24.3237 19.8624 22.5329 19.8624 20.3237V12.5299C19.778 12.5385 19.6926 12.5429 19.6063 12.5429C18.4112 12.5429 17.3833 11.6971 17.1531 10.5244C16.9347 9.41173 16.0564 8.55288 15.0404 8.34864C13.873 8.11395 13.0332 7.08845 13.0332 5.89767ZM15.7832 17.0774L18 19.5876V20.3237C18 21.4283 17.1046 22.3237 16 22.3237H5C3.89543 22.3237 3 21.4283 3 20.3237V16.5461L5.36067 13.408C5.36609 13.4008 5.37169 13.3937 5.37748 13.3868C5.49542 13.2465 5.62647 13.119 5.77021 13.0045C5.77505 13.0006 5.77996 12.9969 5.78495 12.9932C6.71258 12.3091 8.02601 12.5012 8.7266 13.4015L8.72809 13.4034L11.9216 17.5486L12.6231 16.8657L12.6308 16.8582C12.6781 16.812 12.7574 16.7347 12.8575 16.6675C13.7823 15.9945 15.0841 16.1861 15.7832 17.0774Z" fill="white" fillOpacity="0.9" />
    </svg>
  );
};

const MagicStar = () => {
  return (
    <svg width="27" height="28" viewBox="0 0 27 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M19.4813 1.55987C19.5233 1.39948 19.6173 1.25754 19.7486 1.15624C19.8799 1.05494 20.041 1 20.2068 1C20.3726 1 20.5337 1.05494 20.665 1.15624C20.7963 1.25754 20.8903 1.39948 20.9323 1.55987C21.2623 2.82187 21.6253 3.59687 22.1673 4.16987C22.7133 4.74687 23.5113 5.19687 24.8723 5.65387C25.0213 5.70388 25.1508 5.79942 25.2425 5.92699C25.3342 6.05457 25.3836 6.20773 25.3836 6.36487C25.3836 6.52201 25.3342 6.67517 25.2425 6.80275C25.1508 6.93032 25.0213 7.02586 24.8723 7.07587C23.5123 7.53287 22.7123 7.98287 22.1673 8.55987C21.6253 9.13387 21.2633 9.90787 20.9323 11.1699C20.8899 11.3298 20.7959 11.4713 20.6647 11.5722C20.5336 11.6731 20.3728 11.7278 20.2073 11.7278C20.0418 11.7278 19.881 11.6731 19.7499 11.5722C19.6187 11.4713 19.5247 11.3298 19.4823 11.1699C19.1513 9.90787 18.7883 9.13387 18.2463 8.55987C17.7013 7.98287 16.9023 7.53287 15.5413 7.07587C15.3923 7.02586 15.2628 6.93032 15.1711 6.80275C15.0794 6.67517 15.03 6.52201 15.03 6.36487C15.03 6.20773 15.0794 6.05457 15.1711 5.92699C15.2628 5.79942 15.3923 5.70388 15.5413 5.65387C16.9023 5.19687 17.7013 4.74687 18.2463 4.17087C18.7883 3.59687 19.1513 2.82087 19.4813 1.56087V1.55987ZM8.8733 6.73887C8.91533 6.57848 9.00933 6.43654 9.14059 6.33524C9.27186 6.23394 9.43299 6.179 9.5988 6.179C9.7646 6.179 9.92574 6.23394 10.057 6.33524C10.1883 6.43654 10.2823 6.57848 10.3243 6.73887C10.9193 9.02187 11.5943 10.5129 12.6543 11.6389C13.7163 12.7679 15.2383 13.6059 17.6853 14.4309C17.8343 14.4809 17.9638 14.5764 18.0555 14.704C18.1472 14.8316 18.1966 14.9847 18.1966 15.1419C18.1966 15.299 18.1472 15.4522 18.0555 15.5797C17.9638 15.7073 17.8343 15.8029 17.6853 15.8529C15.2383 16.6769 13.7163 17.5159 12.6543 18.6449C11.5943 19.7709 10.9193 21.2619 10.3243 23.5449C10.2823 23.7053 10.1883 23.8472 10.057 23.9485C9.92574 24.0498 9.7646 24.1047 9.5988 24.1047C9.43299 24.1047 9.27186 24.0498 9.14059 23.9485C9.00933 23.8472 8.91533 23.7053 8.8733 23.5449C8.2773 21.2619 7.6033 19.7709 6.5433 18.6449C5.4803 17.5159 3.9593 16.6769 1.5113 15.8529C1.36233 15.8029 1.23284 15.7073 1.1411 15.5797C1.04935 15.4522 1 15.299 1 15.1419C1 14.9847 1.04935 14.8316 1.1411 14.704C1.23284 14.5764 1.36233 14.4809 1.5113 14.4309C3.9593 13.6059 5.4813 12.7679 6.5433 11.6389C7.6033 10.5129 8.2773 9.02187 8.8733 6.73887ZM21.7233 17.8859C21.5581 17.8858 21.3975 17.9402 21.2664 18.0407C21.1353 18.1413 21.041 18.2823 20.9983 18.4419C20.7583 19.3419 20.5013 19.8629 20.1353 20.2419C19.7653 20.6259 19.2093 20.9399 18.2123 21.2679C18.0622 21.3172 17.9316 21.4126 17.839 21.5406C17.7464 21.6685 17.6965 21.8224 17.6965 21.9804C17.6965 22.1383 17.7464 22.2922 17.839 22.4202C17.9316 22.5481 18.0622 22.6435 18.2123 22.6929C19.2093 23.0199 19.7653 23.3339 20.1353 23.7179C20.5013 24.0979 20.7583 24.6179 20.9983 25.5179C21.0407 25.6778 21.1347 25.8193 21.2659 25.9202C21.397 26.0211 21.5578 26.0758 21.7233 26.0758C21.8888 26.0758 22.0496 26.0211 22.1807 25.9202C22.3119 25.8193 22.4059 25.6778 22.4483 25.5179C22.6883 24.6179 22.9443 24.0979 23.3103 23.7179C23.6803 23.3339 24.2363 23.0199 25.2333 22.6929C25.3833 22.6435 25.514 22.5481 25.6066 22.4202C25.6992 22.2922 25.7491 22.1383 25.7491 21.9804C25.7491 21.8224 25.6992 21.6685 25.6066 21.5406C25.514 21.4126 25.3833 21.3172 25.2333 21.2679C24.2363 20.9399 23.6803 20.6259 23.3103 20.2419C22.9443 19.8629 22.6883 19.3419 22.4473 18.4419C22.4046 18.2824 22.3105 18.1416 22.1796 18.041C22.0487 17.9405 21.8883 17.886 21.7233 17.8859Z" fill="white" />
    </svg>
  );
};

const Star = ({ className, style }: { className?: string; style?: React.CSSProperties }) => {
  return (
    <svg width="50" height="43" viewBox="0 0 50 43" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
      <g filter="url(#filter0_dd_4_6147)">
        <path d="M24.9844 2.16406C27.0416 7.72355 31.4249 12.1069 36.9844 14.1641C31.4249 16.2213 27.0416 20.6046 24.9844 26.1641C22.9272 20.6046 18.5439 16.2213 12.9844 14.1641C18.5439 12.1069 22.9272 7.72355 24.9844 2.16406Z" fill="white" fillOpacity="0.05" />
        <path d="M24.9844 2.16406C27.0416 7.72355 31.4249 12.1069 36.9844 14.1641C31.4249 16.2213 27.0416 20.6046 24.9844 26.1641C22.9272 20.6046 18.5439 16.2213 12.9844 14.1641C18.5439 12.1069 22.9272 7.72355 24.9844 2.16406Z" fill="#FD8240" />
      </g>
      <defs>
        <filter id="filter0_dd_4_6147" x="0" y="9.53674e-07" width="49.9688" height="49.9688" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feMorphology radius="2.16406" operator="erode" in="SourceAlpha" result="effect1_dropShadow_4_6147" />
          <feOffset dy="4.32812" />
          <feGaussianBlur stdDeviation="3.24609" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_4_6147" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feMorphology radius="3.24609" operator="erode" in="SourceAlpha" result="effect2_dropShadow_4_6147" />
          <feOffset dy="10.8203" />
          <feGaussianBlur stdDeviation="8.11523" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
          <feBlend mode="normal" in2="effect1_dropShadow_4_6147" result="effect2_dropShadow_4_6147" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_4_6147" result="shape" />
        </filter>
      </defs>
    </svg>
  );
};

const Gift = ({ className }: { className?: string }) => {
  return (
    <svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <g clipPath="url(#clip0_4_6250)">
        <path d="M18.6188 7.28546C18.1882 7.03682 17.6764 6.96945 17.196 7.09815C16.7157 7.22686 16.3062 7.5411 16.0575 7.97176C15.8089 8.40242 15.7415 8.91421 15.8702 9.39455C15.9989 9.87488 16.3132 10.2844 16.7438 10.5331L18.3676 11.4706L16.1176 15.3677L9.29766 11.4302C8.867 11.1815 8.55275 10.772 8.42405 10.2917C8.29534 9.81133 8.36272 9.29953 8.61136 8.86888L8.98636 8.21936C9.50436 7.32216 10.6513 7.01556 11.5477 7.53306L14.3129 9.12956C14.2529 8.26098 14.531 7.40285 15.0889 6.73447C15.6469 6.06609 16.4415 5.63917 17.3068 5.54293C18.1721 5.44669 19.0411 5.68856 19.7323 6.21802C20.4234 6.74747 20.8832 7.52354 21.0156 8.38406C21.8271 8.06845 22.7291 8.07862 23.5331 8.41245C24.3372 8.74628 24.9812 9.37794 25.3305 10.1754C25.6798 10.9729 25.7074 11.8746 25.4076 12.6919C25.1077 13.5093 24.5036 14.1792 23.7214 14.5616L27.1361 16.5331C28.0325 17.0506 28.3399 18.198 27.8224 19.0944L27.4474 19.7439C26.9294 20.6411 25.7825 20.9477 24.8861 20.4302L17.4166 16.1177L19.6666 12.2206L21.2904 13.1581C21.6116 13.3435 21.9805 13.4295 22.3506 13.4052C22.7206 13.381 23.0752 13.2476 23.3694 13.0218C23.6636 12.796 23.8842 12.4881 24.0034 12.137C24.1226 11.7858 24.135 11.4072 24.0391 11.049C23.9431 10.6908 23.743 10.3691 23.4642 10.1246C23.1854 9.88005 22.8403 9.72371 22.4727 9.6753C22.105 9.6269 21.7312 9.68861 21.3987 9.85263C21.0661 10.0166 20.7896 10.2756 20.6041 10.5968L19.6666 12.2206L18.3676 11.4706L19.3051 9.84676C19.8231 8.94956 19.5151 7.80296 18.6188 7.28546ZM15.3676 16.6667L8.2229 12.5417L4.8479 18.3874C4.54953 18.9042 4.46868 19.5183 4.62312 20.0947C4.77757 20.6711 5.15467 21.1626 5.67146 21.4609L10.8676 24.4609L15.3676 16.6667ZM16.6666 17.4167L12.1666 25.2109L18.0123 28.5859C18.5291 28.8843 19.1433 28.9652 19.7197 28.8107C20.2961 28.6563 20.7875 28.2792 21.0859 27.7624L24.4609 21.9167L16.6666 17.4167Z" fill="white" fillOpacity="0.9" />
      </g>
      <defs>
        <clipPath id="clip0_4_6250">
          <rect width="24" height="24" fill="white" transform="translate(12) rotate(30)" />
        </clipPath>
      </defs>
    </svg>
  );
};

const Camera = ({ className }: { className?: string }) => {
  return (
    <svg width="33" height="34" viewBox="0 0 33 34" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <g clipPath="url(#clip0_4_6242)">
        <path d="M14.6409 13.7462C13.8936 14.1777 13.3483 14.8883 13.125 15.7219C12.9017 16.5554 13.0186 17.4434 13.45 18.1907C13.8815 18.938 14.5921 19.4833 15.4256 19.7067C16.2592 19.93 17.1472 19.8131 17.8945 19.3816C18.6418 18.9502 19.1871 18.2395 19.4105 17.406C19.6338 16.5725 19.5169 15.6844 19.0854 14.9371C18.654 14.1898 17.9433 13.6445 17.1098 13.4212C16.2763 13.1979 15.3882 13.3148 14.6409 13.7462Z" fill="white" fillOpacity="0.9" />
        <path fillRule="evenodd" clipRule="evenodd" d="M13.7279 6.85385C12.148 7.65624 10.6124 8.54285 9.12757 9.50985C8.73269 9.76943 8.40666 10.1212 8.1761 10.5337C7.94553 10.9462 7.81773 11.4081 7.8035 11.8805L7.74913 13.4303C7.73954 13.6577 7.6803 13.8803 7.57556 14.0824C7.47082 14.2845 7.32313 14.4612 7.14284 14.6002C6.83692 14.8403 6.53386 15.0834 6.23504 15.3298C5.11439 16.2528 4.87797 17.8373 5.58597 19.0636L9.79897 26.3607C10.1968 27.0498 10.852 27.5526 11.6206 27.7585C12.3891 27.9644 13.208 27.8566 13.897 27.4588L26.8874 19.9588C27.5765 19.561 28.0793 18.9057 28.2852 18.1372C28.4911 17.3687 28.3833 16.5498 27.9855 15.8607L23.7725 8.56361C23.0645 7.33732 21.5741 6.74982 20.2144 7.25884C19.8516 7.39442 19.4895 7.53532 19.1283 7.68155C18.6921 7.85603 18.2113 7.83336 17.812 7.62168L16.4425 6.89162C15.6052 6.44547 14.5913 6.41538 13.7279 6.85385ZM11.1961 15.2053C10.8357 16.5502 11.0244 17.9833 11.7206 19.1891C12.4168 20.3949 13.5635 21.2748 14.9084 21.6352C16.2534 21.9956 17.6864 21.8069 18.8922 21.1107C20.0981 20.4145 20.978 19.2678 21.3383 17.9229C21.6987 16.578 21.5101 15.1449 20.8139 13.9391C20.1177 12.7333 18.971 11.8534 17.626 11.493C16.2811 11.1326 14.8481 11.3213 13.6422 12.0175C12.4364 12.7137 11.5565 13.8604 11.1961 15.2053ZM21.4544 11.5485C21.9327 11.2724 22.0966 10.6608 21.8204 10.1825C21.5443 9.70421 20.9327 9.54034 20.4544 9.81648C19.9761 10.0926 19.8122 10.7042 20.0884 11.1825C20.3645 11.6608 20.9761 11.8247 21.4544 11.5485Z" fill="white" fillOpacity="0.9" />
      </g>
      <defs>
        <clipPath id="clip0_4_6242">
          <rect width="24" height="24" fill="white" transform="translate(0 12.3882) rotate(-30)" />
        </clipPath>
      </defs>
    </svg>
  );
};

const buildBinaryRibbon = (seed: number, groups: number, bitsPerGroup = 4) => {
  let value = seed >>> 0;
  return Array.from({ length: groups }, () => {
    let chunk = "";
    for (let index = 0; index < bitsPerGroup; index += 1) {
      value = (value * 1664525 + 1013904223) >>> 0;
      chunk += ((value >>> 31) & 1).toString();
    }
    return chunk;
  }).join(" ");
};

const MAIN_BINARY_RIBBON = buildBinaryRibbon(0x51f4, 19);
const CURVED_CARD_BINARY_RIBBON = buildBinaryRibbon(0xc18d, 15);

const mutateBinaryText = (value: string) => {
  return value
    .split("")
    .map((character) => {
      if (character !== "0" && character !== "1") {
        return character;
      }
      if (Math.random() < 0.28) {
        return character === "0" ? "1" : "0";
      }
      return character;
    })
    .join("");
};

const BinaryRibbon = ({
  pathId,
  pathD,
  fadeId,
  gradientStart,
  gradientEnd,
  activeColor,
  text,
  fontSize,
  fontWeight,
  letterSpacing,
  startOffset = "50%",
  dy = 0,
}: {
  pathId: string;
  pathD: string;
  fadeId: string;
  gradientStart: number;
  gradientEnd: number;
  activeColor: string;
  text: string;
  fontSize: number;
  fontWeight: string | number;
  letterSpacing: number;
  startOffset?: string;
  dy?: number | string;
}) => {
  const [animatedText, setAnimatedText] = React.useState(text);

  React.useEffect(() => {
    setAnimatedText(text);
    const intervalId = window.setInterval(() => {
      setAnimatedText((current) => mutateBinaryText(current));
    }, 150);
    return () => window.clearInterval(intervalId);
  }, [text]);

  return (
    <>
      <defs>
        <path id={pathId} d={pathD} />
        <linearGradient
          id={fadeId}
          x1={gradientStart}
          y1="0"
          x2={gradientEnd}
          y2="0"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor={activeColor} stopOpacity="0" />
          <stop offset="0.12" stopColor={activeColor} stopOpacity="0.78" />
          <stop offset="0.88" stopColor={activeColor} stopOpacity="0.78" />
          <stop offset="1" stopColor={activeColor} stopOpacity="0" />
        </linearGradient>
      </defs>
      <text
        fill={`url(#${fadeId})`}
        fontSize={fontSize}
        fontWeight={fontWeight}
        letterSpacing={letterSpacing}
        dy={dy}
        textAnchor="middle"
        style={{
          fontFamily:
            '"Geist Mono", "IBM Plex Mono", "SFMono-Regular", monospace',
        }}
      >
        <textPath href={`#${pathId}`} startOffset={startOffset}>
          {animatedText}
        </textPath>
      </text>
    </>
  );
};

const CurvedCard = ({ className }: { className?: string }) => {
  const idBase = React.useId().replace(/:/g, "");
  const notchArcId = `${idBase}-curved-notch-arc`;
  const notchFadeId = `${idBase}-curved-notch-fade`;

  return (
    <svg
      viewBox="0 0 264 412"
      className={`w-full h-full relative overflow-hidden ${className || ""}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient
          id="cardGradient2"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="matrix(-276 419.017 -418 -276.671 276 -7.017)"
        >
          <stop stopColor="#CF7A58" />
          <stop offset="1" stopColor="#CF7A58" stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* Base Shape */}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M118.572 22.9996C116.289 10.2858 105.878 0 92.9611 0H24C10.7452 0 0 10.7452 0 24V388C0 401.255 10.7452 412 24 412H240C253.255 412 264 401.255 264 388V178.229C264 165.819 254.471 155.646 242.376 152.869C179.242 138.374 130.103 87.2133 118.572 22.9996Z"
        fill="#2B2524"
      />
      {/* Gradient Overlay */}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M118.572 22.9996C116.289 10.2858 105.878 0 92.9611 0H24C10.7452 0 0 10.7452 0 24V388C0 401.255 10.7452 412 24 412H240C253.255 412 264 401.255 264 388V178.229C264 165.819 254.471 155.646 242.376 152.869C179.242 138.374 130.103 87.2133 118.572 22.9996Z"
        fill="url(#cardGradient2)"
        fillOpacity="0.3"
      />
      <BinaryRibbon
        pathId={notchArcId}
        pathD="M118.572 22.9996C130.103 87.2133 179.242 138.374 242.376 152.869C254.471 155.646 264 165.819 264 178.229"
        fadeId={notchFadeId}
        gradientStart={100}
        gradientEnd={240}
        activeColor="#CF7A58"
        text={CURVED_CARD_BINARY_RIBBON}
        fontSize={14}
        fontWeight="500"
        letterSpacing={2}
        startOffset="55%"
        dy={18}
      />
    </svg>
  );
};

const MainCurvedCard = ({ className }: { className?: string }) => {
  const idBase = React.useId().replace(/:/g, "");
  const topArcId = `${idBase}-top-binary-arc`;
  const topFadeId = `${idBase}-top-binary-fade`;

  return (
    <svg
      viewBox="0 0 556 396"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-full h-full ${className || ""}`}
    >
      <defs>
        <radialGradient
          id="cardGradient"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(278 423.9) rotate(-90) scale(295.7 296.5)"
        >
          <stop stopColor="#D3A998" />
          <stop offset="1" stopColor="#EB642E" />
        </radialGradient>
      </defs>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M556 24C556 10.7452 545.255 0 532 0H24C10.7452 0 0 10.7452 0 24V372C0 385.255 10.7452 396 24 396H95.4926C107.507 396 117.483 387.043 120.612 375.443C139.327 306.059 202.701 255 278 255C353.299 255 416.673 306.059 435.388 375.443C438.517 387.043 448.493 396 460.507 396H532C545.255 396 556 385.255 556 372V24Z"
        fill="url(#cardGradient)"
      />
      <BinaryRibbon
        pathId={topArcId}
        pathD="M120.612 375.443A163.1 163.1 0 0 1 435.388 375.443"
        fadeId={topFadeId}
        gradientStart={90}
        gradientEnd={466}
        activeColor="#F7CFB1"
        text={MAIN_BINARY_RIBBON}
        fontSize={14}
        fontWeight="600"
        letterSpacing={3.2}
        dy={-9}
      />
    </svg>
  );
};

const Wire = ({ className }: { className?: string }) => {
  return (
    <svg width="24" height="26" viewBox="0 0 24 26" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M22.5297 7.39974C22.5371 6.80846 22.3804 6.22671 22.0772 5.71906C21.7739 5.2114 21.3359 4.79771 20.8118 4.52387C20.2877 4.25004 19.698 4.12678 19.1081 4.16778C18.5182 4.20878 17.9512 4.41243 17.47 4.75613C16.9888 5.09984 16.6123 5.57014 16.3822 6.11486C16.1521 6.65958 16.0774 7.25741 16.1665 7.84199C16.2555 8.42658 16.5048 8.97505 16.8867 9.42655C17.2685 9.87804 17.768 10.2149 18.3297 10.3997V10.5997C18.3297 11.4653 17.9866 12.2955 17.3755 12.9084C16.7644 13.5214 15.9353 13.8671 15.0697 13.8697H11.8697C11.0926 13.8648 10.3299 14.0797 9.66973 14.4897V7.23974C10.3925 7.00195 11.007 6.51437 11.4028 5.86449C11.7986 5.21461 11.9498 4.44495 11.8294 3.69362C11.709 2.94229 11.3248 2.25845 10.7457 1.7648C10.1667 1.27115 9.43066 1 8.66973 1C7.90881 1 7.17279 1.27115 6.59373 1.7648C6.01467 2.25845 5.63046 2.94229 5.51005 3.69362C5.38964 4.44495 5.5409 5.21461 5.9367 5.86449C6.3325 6.51437 6.94692 7.00195 7.66973 7.23974V18.7597C6.94692 18.9975 6.3325 19.4851 5.9367 20.135C5.5409 20.7849 5.38964 21.5545 5.51005 22.3059C5.63046 23.0572 6.01467 23.741 6.59373 24.2347C7.17279 24.7283 7.90881 24.9995 8.66973 24.9995C9.43066 24.9995 10.1667 24.7283 10.7457 24.2347C11.3248 23.741 11.709 23.0572 11.8294 22.3059C11.9498 21.5545 11.7986 20.7849 11.4028 20.135C11.007 19.4851 10.3925 18.9975 9.66973 18.7597V18.0597C9.67238 17.478 9.90533 16.921 10.3176 16.5106C10.7299 16.1001 11.288 15.8697 11.8697 15.8697H15.0697C16.4657 15.8671 17.8036 15.3107 18.7897 14.3227C19.7759 13.3346 20.3297 11.9957 20.3297 10.5997V10.4397C20.9698 10.2292 21.5271 9.82193 21.9221 9.27606C22.3171 8.73019 22.5298 8.07355 22.5297 7.39974Z" fill="white" />
    </svg>
  );
};

const MagicCapture = ({ className }: { className?: string }) => {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <mask id="path-1-outside-1_682_112" maskUnits="userSpaceOnUse" x="3" y="3" width="26" height="26" fill="black">
        <rect fill="white" x="3" y="3" width="26" height="26" />
        <path fillRule="evenodd" clipRule="evenodd" d="M5.17157 5.17157C5.92172 4.42143 6.93913 4 8 4H10C10.2652 4 10.5196 4.10536 10.7071 4.29289C10.8946 4.48043 11 4.73478 11 5C11 5.26522 10.8946 5.51957 10.7071 5.70711C10.5196 5.89464 10.2652 6 10 6H8C7.46957 6 6.96086 6.21071 6.58579 6.58579C6.21071 6.96086 6 7.46957 6 8V10C6 10.2652 5.89464 10.5196 5.70711 10.7071C5.51957 10.8946 5.26522 11 5 11C4.73478 11 4.48043 10.8946 4.29289 10.7071C4.10536 10.5196 4 10.2652 4 10V8C4 6.93913 4.42143 5.92172 5.17157 5.17157ZM21.2929 4.29289C21.4804 4.10536 21.7348 4 22 4H24C25.0609 4 26.0783 4.42143 26.8284 5.17157C27.5786 5.92172 28 6.93913 28 8V10C28 10.2652 27.8946 10.5196 27.7071 10.7071C27.5196 10.8946 27.2652 11 27 11C26.7348 11 26.4804 10.8946 26.2929 10.7071C26.1054 10.5196 26 10.2652 26 10V8C26 7.46957 25.7893 6.96086 25.4142 6.58579C25.0391 6.21071 24.5304 6 24 6H22C21.7348 6 21.4804 5.89464 21.2929 5.70711C21.1054 5.51957 21 5.26522 21 5C21 4.73478 21.1054 4.48043 21.2929 4.29289ZM5.70711 21.2929C5.89464 21.4804 6 21.7348 6 22V24C6 24.5304 6.21071 25.0391 6.58579 25.4142C6.96086 25.7893 7.46957 26 8 26H10C10.2652 26 10.5196 26.1054 10.7071 26.2929C10.8946 26.4804 11 26.7348 11 27C11 27.2652 10.8946 27.5196 10.7071 27.7071C10.5196 27.8946 10.2652 28 10 28H8C6.93913 28 5.92172 27.5786 5.17157 26.8284C4.42143 26.0783 4 25.0609 4 24V22C4 21.7348 4.10536 21.4804 4.29289 21.2929C4.48043 21.1054 4.73478 21 5 21C5.26522 21 5.51957 21.1054 5.70711 21.2929ZM27.7071 21.2929C27.8946 21.4804 28 21.7348 28 22V24C28 25.0609 27.5786 26.0783 26.8284 26.8284C26.0783 27.5786 25.0609 28 24 28H22C21.7348 28 21.4804 27.8946 21.2929 27.7071C21.1054 27.5196 21 27.2652 21 27C21 26.7348 21.1054 26.4804 21.2929 26.2929C21.4804 26.1054 21.7348 26 22 26H24C24.5304 26 25.0391 25.7893 25.4142 25.4142C25.7893 25.0391 26 24.5304 26 24V22C26 21.7348 26.1054 21.4804 26.2929 21.2929C26.4804 21.1054 26.7348 21 27 21C27.2652 21 27.5196 21.1054 27.7071 21.2929ZM16.0003 8.39648C16.3588 8.39648 16.6672 8.65023 16.7363 9.00204C17.3549 12.154 19.8295 14.6534 22.8804 15.2667C23.2307 15.3371 23.4826 15.6448 23.4826 16.002C23.4826 16.3592 23.2307 16.6669 22.8804 16.7373C19.829 17.3507 17.3541 19.8467 16.7356 22.998C16.6666 23.3498 16.3582 23.6036 15.9997 23.6036C15.6411 23.6036 15.3327 23.3498 15.2637 22.998C14.6452 19.8466 12.1709 17.3507 9.11952 16.7373C8.76929 16.6669 8.51733 16.3592 8.51733 16.002C8.51733 15.6448 8.76929 15.3371 9.11952 15.2667C12.1705 14.6534 14.6458 12.1539 15.2644 9.00204C15.3334 8.65023 15.6418 8.39648 16.0003 8.39648Z" />
      </mask>
      <path fillRule="evenodd" clipRule="evenodd" d="M5.17157 5.17157C5.92172 4.42143 6.93913 4 8 4H10C10.2652 4 10.5196 4.10536 10.7071 4.29289C10.8946 4.48043 11 4.73478 11 5C11 5.26522 10.8946 5.51957 10.7071 5.70711C10.5196 5.89464 10.2652 6 10 6H8C7.46957 6 6.96086 6.21071 6.58579 6.58579C6.21071 6.96086 6 7.46957 6 8V10C6 10.2652 5.89464 10.5196 5.70711 10.7071C5.51957 10.8946 5.26522 11 5 11C4.73478 11 4.48043 10.8946 4.29289 10.7071C4.10536 10.5196 4 10.2652 4 10V8C4 6.93913 4.42143 5.92172 5.17157 5.17157ZM21.2929 4.29289C21.4804 4.10536 21.7348 4 22 4H24C25.0609 4 26.0783 4.42143 26.8284 5.17157C27.5786 5.92172 28 6.93913 28 8V10C28 10.2652 27.8946 10.5196 27.7071 10.7071C27.5196 10.8946 27.2652 11 27 11C26.7348 11 26.4804 10.8946 26.2929 10.7071C26.1054 10.5196 26 10.2652 26 10V8C26 7.46957 25.7893 6.96086 25.4142 6.58579C25.0391 6.21071 24.5304 6 24 6H22C21.7348 6 21.4804 5.89464 21.2929 5.70711C21.1054 5.51957 21 5.26522 21 5C21 4.73478 21.1054 4.48043 21.2929 4.29289ZM5.70711 21.2929C5.89464 21.4804 6 21.7348 6 22V24C6 24.5304 6.21071 25.0391 6.58579 25.4142C6.96086 25.7893 7.46957 26 8 26H10C10.2652 26 10.5196 26.1054 10.7071 26.2929C10.8946 26.4804 11 26.7348 11 27C11 27.2652 10.8946 27.5196 10.7071 27.7071C10.5196 27.8946 10.2652 28 10 28H8C6.93913 28 5.92172 27.5786 5.17157 26.8284C4.42143 26.0783 4 25.0609 4 24V22C4 21.7348 4.10536 21.4804 4.29289 21.2929C4.48043 21.1054 4.73478 21 5 21C5.26522 21 5.51957 21.1054 5.70711 21.2929ZM27.7071 21.2929C27.8946 21.4804 28 21.7348 28 22V24C28 25.0609 27.5786 26.0783 26.8284 26.8284C26.0783 27.5786 25.0609 28 24 28H22C21.7348 28 21.4804 27.8946 21.2929 27.7071C21.1054 27.5196 21 27.2652 21 27C21 26.7348 21.1054 26.4804 21.2929 26.2929C21.4804 26.1054 21.7348 26 22 26H24C24.5304 26 25.0391 25.7893 25.4142 25.4142C25.7893 25.0391 26 24.5304 26 24V22C26 21.7348 26.1054 21.4804 26.2929 21.2929C26.4804 21.1054 26.7348 21 27 21C27.2652 21 27.5196 21.1054 27.7071 21.2929ZM16.0003 8.39648C16.3588 8.39648 16.6672 8.65023 16.7363 9.00204C17.3549 12.154 19.8295 14.6534 22.8804 15.2667C23.2307 15.3371 23.4826 15.6448 23.4826 16.002C23.4826 16.3592 23.2307 16.6669 22.8804 16.7373C19.829 17.3507 17.3541 19.8467 16.7356 22.998C16.6666 23.3498 16.3582 23.6036 15.9997 23.6036C15.6411 23.6036 15.3327 23.3498 15.2637 22.998C14.6452 19.8466 12.1709 17.3507 9.11952 16.7373C8.76929 16.6669 8.51733 16.3592 8.51733 16.002C8.51733 15.6448 8.76929 15.3371 9.11952 15.2667C12.1705 14.6534 14.6458 12.1539 15.2644 9.00204C15.3334 8.65023 15.6418 8.39648 16.0003 8.39648Z" fill="#FD8240" />
    </svg>
  );
};

const Branch = ({ className }: { className?: string }) => {
  const travelPath =
    "M 5 2 C 5 5 35 33 39.38 40 L 39.38 103 C 40 108 55 122 67.38 133";

  return (
    <div className={className} style={{ width: 101, height: 166 }}>
      <svg
        width="101"
        height="166"
        viewBox="0 0 101 166"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g filter="url(#filter0_di_682_126)">
          <path
            d="M2.87891 0.878616C1.70746 2.05006 1.70746 3.94936 2.87891 5.1208L35.2073 37.4492C35.9575 38.1994 36.3789 39.2168 36.3789 40.2777L36.3789 102.565C36.3791 105.482 37.5378 108.281 39.6006 110.343L58.0306 128.773C59.0833 129.825 59.3789 131.39 59.3789 132.879C59.3791 137.297 62.9607 140.879 67.3789 140.879C71.7971 140.879 75.3787 137.297 75.3789 132.879C75.3789 128.46 71.7972 124.879 67.3789 124.879C67.049 124.879 66.7237 124.899 66.4042 124.937C64.6483 125.15 62.7229 124.978 61.4721 123.728L43.8438 106.1C42.9062 105.163 42.3791 103.891 42.3789 102.565L42.3789 44.3786C42.3789 42.1695 44.1698 40.3786 46.3789 40.3786H56.8839C58.6116 40.3786 60.0717 41.5635 61.1582 42.9068C62.6243 44.7194 64.8659 45.8786 67.3789 45.8786C71.7971 45.8786 75.3787 42.2967 75.3789 37.8786C75.3789 33.4603 71.7972 29.8786 67.3789 29.8786C65.1118 29.8786 63.0652 30.8216 61.6096 32.3368C60.5498 33.4401 59.2129 34.3786 57.6831 34.3786H42.2779C41.2171 34.3786 40.1997 33.9572 39.4495 33.207L7.12109 0.878616C5.94965 -0.292832 4.05035 -0.292831 2.87891 0.878616Z"
            fill="#EB642E"
            fillOpacity="0.25"
            shapeRendering="crispEdges"
          />
        </g>
        <g opacity="0.4">
          <mask id="path-2-inside-1_682_126" fill="white">
            <path d="M62.3789 37.9994C62.3789 35.238 64.6175 32.9994 67.3789 32.9994V32.9994C70.1403 32.9994 72.3789 35.238 72.3789 37.9994V37.9994C72.3789 40.7608 70.1403 42.9994 67.3789 42.9994V42.9994C64.6175 42.9994 62.3789 40.7608 62.3789 37.9994V37.9994Z" />
          </mask>
          <path
            d="M62.3789 37.9994C62.3789 35.238 64.6175 32.9994 67.3789 32.9994V32.9994C70.1403 32.9994 72.3789 35.238 72.3789 37.9994V37.9994C72.3789 40.7608 70.1403 42.9994 67.3789 42.9994V42.9994C64.6175 42.9994 62.3789 40.7608 62.3789 37.9994V37.9994Z"
            fill="#D37252"
          />
          <path
            d="M62.3789 37.9994C62.3789 35.238 64.6175 32.9994 67.3789 32.9994V32.9994C70.1403 32.9994 72.3789 35.238 72.3789 37.9994V37.9994C72.3789 40.7608 70.1403 42.9994 67.3789 42.9994V42.9994C64.6175 42.9994 62.3789 40.7608 62.3789 37.9994V37.9994Z"
            fill="url(#paint0_radial_682_126)"
            style={{ mixBlendMode: "overlay" }}
          />
          <path
            d="M62.3789 36.9994C62.3789 34.238 64.6175 31.9994 67.3789 31.9994C70.1403 31.9994 72.3789 34.238 72.3789 36.9994V37.9994C72.3789 35.7903 70.1403 33.9994 67.3789 33.9994C64.6175 33.9994 62.3789 35.7903 62.3789 37.9994V36.9994ZM72.3789 38.9994C72.3789 41.7608 70.1403 43.9994 67.3789 43.9994C64.6175 43.9994 62.3789 41.7608 62.3789 38.9994V37.9994C62.3789 40.2085 64.6175 41.9994 67.3789 41.9994C70.1403 41.9994 72.3789 40.2085 72.3789 37.9994V38.9994ZM72.3789 37.9994M62.3789 42.9994V32.9994V42.9994M62.3789 42.9994M72.3789 32.9994V42.9994V32.9994"
            fill="white"
            fillOpacity="0.15"
            mask="url(#path-2-inside-1_682_126)"
          />
        </g>
        <g opacity="0.3" filter="url(#filter1_f_682_126)">
          <mask id="path-4-inside-2_682_126" fill="white">
            <path d="M55.3789 132.999C55.3789 126.372 60.7515 120.999 67.3789 120.999V120.999C74.0063 120.999 79.3789 126.372 79.3789 132.999V132.999C79.3789 139.627 74.0063 144.999 67.3789 144.999V144.999C60.7515 144.999 55.3789 139.627 55.3789 132.999V132.999Z" />
          </mask>
          <path
            d="M55.3789 132.999C55.3789 126.372 60.7515 120.999 67.3789 120.999V120.999C74.0063 120.999 79.3789 126.372 79.3789 132.999V132.999C79.3789 139.627 74.0063 144.999 67.3789 144.999V144.999C60.7515 144.999 55.3789 139.627 55.3789 132.999V132.999Z"
            fill="#D37252"
          />
          <path
            d="M55.3789 132.999C55.3789 126.372 60.7515 120.999 67.3789 120.999V120.999C74.0063 120.999 79.3789 126.372 79.3789 132.999V132.999C79.3789 139.627 74.0063 144.999 67.3789 144.999V144.999C60.7515 144.999 55.3789 139.627 55.3789 132.999V132.999Z"
            fill="url(#paint1_radial_682_126)"
            style={{ mixBlendMode: "overlay" }}
          />
          <path
            d="M55.3789 131.999C55.3789 125.372 60.7515 119.999 67.3789 119.999C74.0063 119.999 79.3789 125.372 79.3789 131.999V132.999C79.3789 126.924 74.0063 121.999 67.3789 121.999C60.7515 121.999 55.3789 126.924 55.3789 132.999V131.999ZM79.3789 133.999C79.3789 140.627 74.0063 145.999 67.3789 145.999C60.7515 145.999 55.3789 140.627 55.3789 133.999V132.999C55.3789 139.075 60.7515 143.999 67.3789 143.999C74.0063 143.999 79.3789 139.075 79.3789 132.999V133.999ZM79.3789 132.999M55.3789 144.999V120.999V144.999M55.3789 144.999M79.3789 120.999V144.999V120.999"
            fill="white"
            fillOpacity="0.15"
            mask="url(#path-4-inside-2_682_126)"
          />
        </g>
        <mask id="path-6-inside-3_682_126" fill="white">
          <path d="M62.3789 132.999C62.3789 130.238 64.6175 127.999 67.3789 127.999V127.999C70.1403 127.999 72.3789 130.238 72.3789 132.999V132.999C72.3789 135.761 70.1403 137.999 67.3789 137.999V137.999C64.6175 137.999 62.3789 135.761 62.3789 132.999V132.999Z" />
        </mask>
        <path
          d="M62.3789 132.999C62.3789 130.238 64.6175 127.999 67.3789 127.999V127.999C70.1403 127.999 72.3789 130.238 72.3789 132.999V132.999C72.3789 135.761 70.1403 137.999 67.3789 137.999V137.999C64.6175 137.999 62.3789 135.761 62.3789 132.999V132.999Z"
          fill="#D37252"
        />
        <path
          d="M62.3789 132.999C62.3789 130.238 64.6175 127.999 67.3789 127.999V127.999C70.1403 127.999 72.3789 130.238 72.3789 132.999V132.999C72.3789 135.761 70.1403 137.999 67.3789 137.999V137.999C64.6175 137.999 62.3789 135.761 62.3789 132.999V132.999Z"
          fill="url(#paint2_radial_682_126)"
          style={{ mixBlendMode: "overlay" }}
        />
        <path
          d="M62.3789 131.999C62.3789 129.238 64.6175 126.999 67.3789 126.999C70.1403 126.999 72.3789 129.238 72.3789 131.999V132.999C72.3789 130.79 70.1403 128.999 67.3789 128.999C64.6175 128.999 62.3789 130.79 62.3789 132.999V131.999ZM72.3789 133.999C72.3789 136.761 70.1403 138.999 67.3789 138.999C64.6175 138.999 62.3789 136.761 62.3789 133.999V132.999C62.3789 135.209 64.6175 136.999 67.3789 136.999C70.1403 136.999 72.3789 135.209 72.3789 132.999V133.999ZM72.3789 132.999M62.3789 137.999V127.999V137.999M62.3789 137.999M72.3789 127.999V137.999V127.999"
          fill="white"
          fillOpacity="0.15"
          mask="url(#path-6-inside-3_682_126)"
        />
        <defs>
          <filter
            id="filter0_di_682_126"
            x="0"
            y="0.00012207"
            width="75.3789"
            height="142.879"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
            <feOffset dx="-1" dy="1" />
            <feGaussianBlur stdDeviation="0.5" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.08 0" />
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_682_126" />
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_682_126" result="shape" />
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
            <feOffset dx="-1" />
            <feGaussianBlur stdDeviation="1.5" />
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
            <feColorMatrix type="matrix" values="0 0 0 0 0.00547059 0 0 0 0 0.0187459 0 0 0 0 0.116098 0 0 0 0.6 0" />
            <feBlend mode="normal" in2="shape" result="effect2_innerShadow_682_126" />
          </filter>
          <filter
            id="filter1_f_682_126"
            x="34.5789"
            y="100.199"
            width="65.6"
            height="65.6"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
            <feGaussianBlur stdDeviation="10.4" result="effect1_foregroundBlur_682_126" />
          </filter>
          <radialGradient id="paint0_radial_682_126" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(67.3789 39.9994) rotate(90) scale(9.30435 71.0517)">
            <stop stopColor="white" stopOpacity="0" />
            <stop offset="1" stopColor="white" />
          </radialGradient>
          <radialGradient id="paint1_radial_682_126" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(67.3789 137.799) rotate(90) scale(22.3304 170.524)">
            <stop stopColor="white" stopOpacity="0" />
            <stop offset="1" stopColor="white" />
          </radialGradient>
          <radialGradient id="paint2_radial_682_126" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(67.3789 134.999) rotate(90) scale(9.30435 71.0517)">
            <stop stopColor="white" stopOpacity="0" />
            <stop offset="1" stopColor="white" />
          </radialGradient>
        </defs>
      </svg>
      <motion.div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 20,
          height: 5,
          borderRadius: 9999,
          background:
            "linear-gradient(180deg, #EB9256 0%, #FFFFFF 40%, #FFFFFF 100%)",
          opacity: 0,
          offsetPath: `path('${travelPath}')`,
          offsetDistance: "0%",
          offsetRotate: "auto",
          filter:
            "drop-shadow(0 0 3px #FFE033) drop-shadow(0 0 8px #FFB300) drop-shadow(0 0 18px rgba(255,160,0,0.7))",
        }}
        animate={{ offsetDistance: "90%", opacity: [0, 1, 1, 0] }}
        transition={{
          offsetDistance: {
            duration: 2.5,
            ease: "linear",
            repeat: Infinity,
            repeatType: "loop",
          },
          opacity: {
            duration: 2.5,
            times: [0, 0.12, 0.88, 1],
            ease: "linear",
            repeat: Infinity,
            repeatType: "loop",
          },
        }}
      />
    </div>
  );
};

const Barrel = ({
  className,
  icon,
  iconClassName,
}: {
  className?: string;
  icon?: React.ReactNode;
  iconClassName?: string;
}) => {
  return (
    <div className={className}>
      <div className="relative">
        <div
          className={`size-[52px] absolute right-[7px] bottom-[7px] border border-white/20 rounded-full flex items-center justify-center ${iconClassName}`}
        >
          {icon}
        </div>
        <svg width="91" height="66" viewBox="0 0 91 66" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g filter="url(#filter0_di_682_141)">
            <path fillRule="evenodd" clipRule="evenodd" d="M58 64C75.6731 64 90 49.6731 90 32C90 14.3269 75.6731 0 58 0C41.9801 0 28.7096 11.7719 26.3671 27.1372C26.0414 29.2739 24.2976 31 22.1362 31H-35C-36.6569 31 -38 32.3431 -38 34C-38 35.6569 -36.6569 37 -35 37H22.967C24.9368 37 26.5869 38.4443 27.0993 40.3462C30.7706 53.972 43.2142 64 58 64Z" fill="#EB642E" fillOpacity="0.25" shapeRendering="crispEdges" />
          </g>
          <defs>
            <filter id="filter0_di_682_141" x="-39" y="0" width="130" height="66" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
              <feOffset dy="1" />
              <feGaussianBlur stdDeviation="0.5" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.07 0" />
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_682_141" />
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_682_141" result="shape" />
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
              <feOffset dy="1" />
              <feGaussianBlur stdDeviation="1.5" />
              <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
              <feColorMatrix type="matrix" values="0 0 0 0 0.00547059 0 0 0 0 0.0187459 0 0 0 0 0.116098 0 0 0 0.5 0" />
              <feBlend mode="normal" in2="shape" result="effect2_innerShadow_682_141" />
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  );
};
