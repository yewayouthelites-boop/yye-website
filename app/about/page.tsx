import type { Metadata } from "next";
import Link from "next/link";
import { HiSparkles } from "react-icons/hi2";
import RevealWrapper from "@/components/RevealWrapper";
import TeamSlider, {
  AdinkraheneWatermark,
  DiamondLattice,
  KenteCornerBottomRight,
  KenteCornerTriangles,
  KenteStrip,
} from "@/components/TeamSlider";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about the Yèwà Youth Elites movement — our story, mission, vision, and the executive team driving our programs.",
};

/* ── Note: team data lives in components/TeamSlider.tsx ─────────────── */

const objectives = [
  "Promote and preserve Yèwà culture and heritage",
  "Support youth development through education and mentorship",
  "Encourage innovation, entrepreneurship, and career growth",
  "Provide academic support and guidance for students",
  "Bridge the gap between young people and opportunities",
  "Inspire youths to think beyond limitations",
];

const approach = [
  {
    num: "01",
    title: "Community-driven design",
    desc: "Every program is shaped by listening to the real challenges young people and communities face — not assumptions.",
  },
  {
    num: "02",
    title: "School & leader partnerships",
    desc: "We work directly with schools and local leaders to deliver programs where they matter most — on the ground.",
  },
  {
    num: "03",
    title: "Mentorship & exposure",
    desc: "We connect Yèwà youth with mentors and opportunities that expand their sense of what's possible for their future.",
  },
  {
    num: "04",
    title: "Impact-focused execution",
    desc: "We are deliberate about outcomes — every initiative is designed to create meaningful, measurable change in young lives.",
  },
];

/* ── Page ────────────────────────────────────────────────────────────── */
export default function AboutPage() {
  return (
    <>
      {/* ══ PAGE HERO ═════════════════════════════════════════════════ */}
      <div className="yye-pattern relative bg-yye-dark px-[5%] pt-[140px] pb-20 overflow-hidden">
        {/* Decorations */}
        <div
          className="absolute top-[-80px] right-[-80px] w-[500px] h-[500px] bg-yye-green opacity-[0.14] rounded-full pointer-events-none blur-3xl"
          style={{ zIndex: 1 }}
        />
        <div
          className="absolute bottom-[-60px] right-[220px] w-[280px] h-[280px] bg-yye-yellow opacity-[0.10] rounded-full pointer-events-none blur-2xl"
          style={{ zIndex: 1 }}
        />

        <div className="relative z-[2] max-w-[680px]">
          <p className="text-[12px] font-semibold text-white/40 tracking-[0.08em] uppercase mb-4">
            <Link
              href="/"
              className="text-yye-yellow no-underline hover:underline"
            >
              Home
            </Link>{" "}
            / About
          </p>
          <h1
            className="font-extrabold text-white leading-[1.1] tracking-[-0.02em] mb-4"
            style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)" }}
          >
            We are <em className="text-yye-yellow not-italic">more than</em> an
            organization.
          </h1>
          <p className="text-base text-white/65 leading-[1.7] max-w-[540px]">
            Yèwà Youth Elites is a movement — built on culture, driven by
            purpose, and committed to raising a generation of Yèwà youth who are
            ready to lead.
          </p>
        </div>
      </div>

      {/* ══ STORY ═════════════════════════════════════════════════════ */}
      <section id="story" className="bg-yye-light px-[5%] py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          {/* Card stack */}
          <RevealWrapper>
            <div className="relative bg-yye-green rounded-[20px] p-10 text-white overflow-hidden">
              {/* Ghost watermark */}
              <span className="absolute right-[-10px] bottom-[-20px] text-[8rem] font-extrabold opacity-[0.07] leading-none select-none pointer-events-none">
                YYE
              </span>
              <h3 className="text-[1.4rem] font-extrabold mb-3">Who We Are</h3>
              <p className="text-sm leading-[1.7] opacity-85">
                Yèwà Youth Elites (YYE) is a youth-focused, non-profit
                organization dedicated to promoting the cultural heritage of the
                Yèwà people while driving sustainable youth development across
                Yèwà communities.
              </p>
            </div>

            {/* Accent card */}
            <div className="bg-yye-cream rounded-[16px] px-6 py-5 mt-4 flex items-center gap-4">
              <div className="w-12 h-12 min-w-[48px] bg-yye-dark rounded-[12px] flex items-center justify-center text-yye-yellow">
                <HiSparkles size={24} />
              </div>
              <p className="text-[13px] font-bold text-yye-dark leading-[1.4]">
                Founded to empower young people with the mindset, skills, and
                opportunities they need — without losing their cultural
                identity.
              </p>
            </div>
          </RevealWrapper>

          {/* Text */}
          <RevealWrapper delay={80}>
            <span className="section-tag">Our Story</span>
            <h2 className="section-title">
              Culturally grounded. Globally ready.
            </h2>
            <p className="text-base text-yye-gray leading-[1.7] mb-6">
              We believe knowing where you come from gives you the strength to
              go anywhere. YYE adopts a community-driven and impact-focused
              approach by working closely with schools, local leaders, and
              partners to design programs that address real challenges faced by
              young people.
            </p>

            <div className="flex flex-col gap-4">
              {[
                {
                  label: "Education & Mentorship",
                  desc: "School outreach, academic guidance, and mentorship that opens doors for Yèwà students.",
                },
                {
                  label: "Cultural Promotion",
                  desc: "Events and initiatives that celebrate and preserve the rich Yèwà identity and heritage.",
                },
                {
                  label: "Youth Empowerment",
                  desc: "Skills development, career guidance, and personal growth for the next generation.",
                },
                {
                  label: "Community Development",
                  desc: "Programs that foster unity and sustainable growth across Yèwà communities.",
                },
              ].map(({ label, desc }) => (
                <div
                  key={label}
                  className="flex items-start gap-4 px-5 py-4 bg-white rounded-[12px] border border-yye-green/[0.1]"
                >
                  <div className="w-2.5 h-2.5 min-w-[10px] bg-yye-green rounded-full mt-1.5" />
                  <p className="text-sm text-yye-dark leading-[1.6]">
                    <strong className="text-yye-green">{label}</strong> — {desc}
                  </p>
                </div>
              ))}
            </div>
          </RevealWrapper>
        </div>
      </section>

      {/* ══ MISSION / VISION / OBJECTIVES ════════════════════════════ */}
      <section className="yye-pattern bg-yye-dark px-[5%] py-24">
        <div className="text-center mb-2">
          <span className="section-tag">Our Purpose</span>
        </div>
        <RevealWrapper>
          <h2 className="section-title text-center text-white mb-0">
            Driven by mission. Guided by vision.
          </h2>
        </RevealWrapper>

        <RevealWrapper delay={80}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <div className="bg-yye-green rounded-[20px] p-10 border border-white/[0.08]">
              <p className="text-[11px] font-bold tracking-[0.14em] uppercase text-white/70 mb-3">
                Our Mission
              </p>
              <h3 className="text-[1.5rem] font-extrabold text-white leading-[1.2] mb-3">
                Empowering Yèwà youths through education, mentorship, and
                culture.
              </h3>
              <p className="text-sm leading-[1.8] text-white/85">
                We build capacity, preserve cultural values, and create pathways
                for young Yèwà people to thrive — both within their communities
                and in the wider world.
              </p>
            </div>
            <div className="bg-white/[0.04] rounded-[20px] p-10 border border-white/[0.08]">
              <p className="text-[11px] font-bold tracking-[0.14em] uppercase text-white/70 mb-3">
                Our Vision
              </p>
              <h3 className="text-[1.5rem] font-extrabold text-yye-yellow leading-[1.2] mb-3">
                A generation of Yèwà youths who are grounded, equipped, and
                globally competitive.
              </h3>
              <p className="text-sm leading-[1.8] text-white/75">
                We see a future where every Yèwà youth has the identity,
                knowledge, and opportunity to lead a meaningful, impactful life.
              </p>
            </div>
          </div>
        </RevealWrapper>

        {/* Objectives */}
        <RevealWrapper delay={120}>
          <div className="mt-12">
            <p className="text-[1.1rem] font-bold text-white/45 mb-6 tracking-[0.05em]">
              Core Objectives
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {objectives.map((obj) => (
                <div
                  key={obj}
                  className="bg-white/[0.04] border border-white/[0.08] rounded-[12px] px-[1.4rem] py-5 flex items-start gap-3"
                >
                  <div className="w-2 h-2 min-w-[8px] bg-yye-yellow rounded-full mt-[6px]" />
                  <p className="text-[13px] text-white/75 leading-[1.6]">
                    {obj}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </RevealWrapper>
      </section>

      {/* ══ APPROACH ══════════════════════════════════════════════════ */}
      <section id="approach" className="bg-white px-[5%] py-24">
        <RevealWrapper className="text-center mb-12">
          <span className="section-tag">How We Work</span>
          <h2 className="section-title text-center">Our approach to impact.</h2>
          <p className="section-sub mx-auto text-center">
            Through mentorship, exposure, and access to opportunities, YYE
            unlocks the full potential of Yèwà youths.
          </p>
        </RevealWrapper>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {approach.map(({ num, title, desc }, i) => (
            <RevealWrapper key={num} delay={i * 80}>
              <div className="bg-yye-light border border-yye-green/[0.1] rounded-[16px] p-[1.8rem]">
                <div className="text-[2rem] font-extrabold text-yye-green opacity-30 mb-2">
                  {num}
                </div>
                <h3 className="text-base font-extrabold mb-2">{title}</h3>
                <p className="text-[13px] text-yye-gray leading-[1.6]">
                  {desc}
                </p>
              </div>
            </RevealWrapper>
          ))}
        </div>
      </section>

      {/* ══ TEAM ══════════════════════════════════════════════════════ */}
      <section id="team" className="bg-yye-light px-[5%] py-24 relative">
      
        <RevealWrapper className="text-center mb-12">
          <span className="section-tag">Leadership</span>
          <h2 className="section-title text-center">Meet the executive team</h2>
          <p className="section-sub mx-auto text-center">
            The dedicated leaders driving YYE&apos;s mission across every focus
            area.
            <span className="block mt-1 text-[12px] text-yye-gray/60">
              Drag, swipe, or use the arrows to explore
            </span>
          </p>
        </RevealWrapper>

        {/* Slider — constrained width so it reads as a focused panel */}
        <RevealWrapper className="max-w-[760px] mx-auto">
          <TeamSlider />
        </RevealWrapper>
      </section>
    </>
  );
}
