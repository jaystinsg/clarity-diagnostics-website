/**
 * Clarity Diagnostics and Medical Services — Home page
 * React + Tailwind CSS v4 + GSAP (ScrollTrigger) + Lenis
 *
 * Requires:  npm i gsap lenis
 * Assets (in src/assets/): logo.jpg, hero_group.webp
 *
 * Hero: static cut-out of the three staff from the grand-opening poster.
 * Everywhere else: illustrated, animated guides (Steph, Cristina, Reg) drawn in SVG.
 */
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

import logo from './assets/logo.jpg';
import heroGroup from './assets/hero_group.webp';

gsap.registerPlugin(ScrollTrigger);

/* ───────────────────────── Content ───────────────────────── */

const CLINIC = {
  name: 'Clarity Diagnostics and Medical Services',
  phone: '09661439944',
  phoneDisplay: '0966 143 9944',
  email: 'claritylaboratory2026@gmail.com',
  facebook: 'https://www.facebook.com/claritydiagnostic',
  address:
    'Grotto Shop and Ride Bldg., Ground Floor, in front of Grotto Church, Graceville, San Jose del Monte, Bulacan',
  hours: 'Monday – Saturday, 6:00 AM – 4:00 PM',
  mapQuery: 'Grotto Shop and Ride, Graceville, San Jose del Monte, Bulacan',
  // For a pin-exact route, replace the query with coordinates, e.g. destination=14.8139,121.0453 / ll=14.8139,121.0453
  googleDrive: 'https://www.google.com/maps/dir/?api=1&travelmode=driving&destination=' + encodeURIComponent('Grotto Shop and Ride, Graceville, San Jose del Monte, Bulacan'),
  wazeDrive: 'https://waze.com/ul?navigate=yes&q=' + encodeURIComponent('Grotto Shop and Ride, Graceville, San Jose del Monte, Bulacan'),
};

const NAV = [
  { id: '#services', label: 'Services' },
  { id: '#packages', label: 'Packages' },
  { id: '#prices', label: 'Price list' },
  { id: '#home-service', label: 'Home service' },
  { id: '#contact', label: 'Contact' },
];

const SERVICES = [
  { icon: 'steth', color: 'bg-[#1e5bbf]', title: 'Health consultation', text: "Doctor's check-ups to review your symptoms, results and next steps." },
  { icon: 'flask', color: 'bg-[#1b6b56]', title: 'Laboratory testing', text: 'Hematology, blood chemistry, serology, thyroid, hepatitis and more — 80+ tests.' },
  { icon: 'pulse', color: 'bg-[#2bb3c0]', title: 'X-ray, ultrasound & ECG', text: "Imaging and heart tracing done on-site, so you don't need a second trip." },
  { icon: 'clip', color: 'bg-[#16336b]', title: 'Medical APE & pre-employment', text: 'Annual physical exams and job requirements, with packages from ₱500.' },
  { icon: 'home', color: 'bg-[#e5533d]', title: 'Home blood extraction', text: 'Our team comes to you — ideal for seniors, busy parents and the bedridden.' },
];

const TEACHERS = {
  price: 3000,
  items: ['Chest PA (X-ray)', 'FBS (Blood sugar)', 'BUN', 'Uric acid', 'Creatinine', 'SGPT / ALT', 'SGOT / AST', 'Lipid profile', 'CBC platelet', 'Urinalysis', "Doctor's check-up"],
};

const PACKAGES = [
  { name: 'Medical Annual Physical Exam', price: 750, bar: 'bg-[#1e5bbf]', blurb: 'For APE and pre-employment requirements.', items: ['CBC Platelet', 'Urinalysis', 'Fecalysis', 'Chest PA (X-ray)', "Doctor's check-up"] },
  { name: 'Maternity Package', price: 700, bar: 'bg-[#1b6b56]', blurb: 'Essential prenatal screening for moms-to-be.', items: ['CBC Platelet', 'Urinalysis', 'Hepatitis B Screening', 'VDRL / Syphilis'] },
  { name: 'Student Package', price: 500, bar: 'bg-[#d9822b]', blurb: 'Common school and enrollment requirements.', items: ['CBC Platelet', 'Chest PA (X-ray)'] },
  { name: 'OB Package', price: 1000, bar: 'bg-[#b5487f]', blurb: "Routine women's health check.", items: ['Pap smear', 'Urinalysis', "Doctor's check-up"] },
];

const PRICE_CATEGORIES = [
  { id: 'hema', label: 'Hematology', items: [['CBC Platelet', 300], ['ESR', 180], ['Blood Type w/ RH', 250], ['Peripheral Blood Smear', 420], ['Malarial Smear', 230], ['CTBT', 300], ['PTT', 490], ['Prothrombin INR', 490]] },
  { id: 'chem', label: 'Blood Chemistry', items: [['FBS / RBS / PPBS', 250], ['BUA (Uric Acid)', 250], ['Creatinine', 250], ['Uric Acid', 250], ['Lipid Profile', 800], ['Cholesterol', 250], ['Triglyceride', 250], ['ALT / SGPT', 300], ['AST / SGOT', 300], ['HBA1C', 700], ['OGCT (non-fasting)', 300], ['OGTT (fasting)', 975]] },
  { id: 'sero', label: 'Serology', items: [['Dengue NS1 & Duo', 2500], ['HIV Screening Test', 850], ['VDRL/RPR Screening', 350], ['VDRL/RPR Titer', 450], ['TPHA Screening', 485], ['TPHA Titer', 565], ['ANA Screening', 580], ['ANA Titer', 1560], ['ASO Titer', 530], ['RA Latex / RF', 470], ['RA Factor', 730], ['CRP Screening', 300], ['CRP Titer', 500]] },
  { id: 'micro', label: 'Microscopy', items: [['Urinalysis', 150], ['Fecalysis', 150], ['Pregnancy Test (Urine)', 270], ['Pregnancy Test (Serum)', 270], ['Ketone', 180], ['Micral Test', 250], ['Fecal Occult Blood', 230]] },
  { id: 'thyroid', label: 'Thyroid', items: [['T3', 600], ['T4', 600], ['TSH', 600], ['FT3', 600], ['FT4', 600]] },
  { id: 'tumor', label: 'Tumor Markers', items: [['PSA (Prostate)', 1700], ['B-HCG', 960], ['AFP', 1020], ['CA 125 (Ovary)', 2250], ['CA 125 (Pancreas)', 2450]] },
  { id: 'hepa', label: 'Hepatitis', items: [['HBsAg Screening', 350], ['Anti HBs', 385], ['Anti HAV IgM', 625], ['Anti HAV IgG', 625], ['Anti HCV', 785], ['Anti HBc IgM', 500], ['Anti HBc IgG', 500], ['Anti HBe', 485]] },
  { id: 'enz', label: 'Enzymes', items: [['Acid Phosphatase', 375], ['Alkaline Phosphatase', 460]] },
  { id: 'bact', label: 'Bacteriology', items: [['Sperm Analysis', 125], ['Sputum AFB', 200], ['Gram Stain', 200], ['Culture & Sensitivity', 700], ['KOH Mount', 300]] },
  { id: 'elec', label: 'Electrolytes', items: [['Sodium (Na)', 275], ['Potassium (K)', 275], ['Calcium (Total)', 280], ['Chloride', 260], ['Magnesium', 285]] },
];

const TEAM = [
  { name: 'Steph', role: 'Medtech', who: 'ana', mood: 'happy', pose: 'pipette', text: 'Handles your samples carefully and keeps your results accurate.' },
  { name: 'Cristina', role: 'Medtech', who: 'bea', mood: 'happy', pose: 'crossed', text: 'Welcomes you, answers questions and books your home service.' },
  { name: 'Reg', role: 'Medtech', who: 'carla', mood: 'calm', pose: 'clipboard', text: 'Guides you through check-ups, X-ray, ultrasound and ECG.' },
];

const HEADLINE = 'Clear answers for your health, right here in Bulacan.';

const peso = (n) => '₱' + n.toLocaleString('en-PH');

/* ───────────────────────── Style tokens ───────────────────────── */

// Spring-like easing (slight overshoot) on the individual scale/translate properties.
const SPRING =
  'transition-[scale,translate,box-shadow,background-color,border-color] duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] will-change-transform';
const BTN = `${SPRING} inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full px-7 text-base font-extrabold hover:scale-[1.04] hover:-translate-y-0.5 active:scale-[0.96] focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-[#2bb3c0]`;
const CARD = `${SPRING} hover:-translate-y-2 hover:scale-[1.015] hover:shadow-[0_28px_50px_-18px_rgba(22,51,107,0.35)]`;
const H2 = 'font-[Montserrat,sans-serif] text-[32px] font-extrabold leading-[1.12] text-[#16336b] sm:text-[42px]';
const EYEBROW = 'text-[13px] font-extrabold tracking-[0.18em] text-[#1b6b56]';

/* ───────────────────────── Small pieces ───────────────────────── */

const ICON_PATHS = {
  steth: (<><path d="M6 3v6a4 4 0 0 0 8 0V3" /><path d="M10 13v2a5 5 0 0 0 10 0v-2" /><circle cx="20" cy="11" r="2" /></>),
  flask: (<><path d="M9 3h6" /><path d="M10 3v6L5 18a2 2 0 0 0 1.8 3h10.4a2 2 0 0 0 1.8-3L14 9V3" /><path d="M7.5 14h9" /></>),
  pulse: <path d="M3 12h4l2-5 4 10 2-5h6" />,
  clip: (<><rect x="5" y="4" width="14" height="17" rx="2" /><path d="M9 4V3h6v1" /><path d="m9 12 2 2 4-4" /></>),
  home: (<><path d="M3 11 12 4l9 7" /><path d="M5 10v10h14V10" /><path d="M12 12v5M9.5 14.5h5" /></>),
  clock: (<><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>),
  pin: (<><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z" /><circle cx="12" cy="9.5" r="2.5" /></>),
  phone: <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />,
  chat: <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z" />,
  check: <path d="M20 6 9 17l-5-5" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  nav: <path d="M3 11 21 3l-8 18-2-8-8-2z" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
};

function Icon({ name, size = 20, stroke = 'currentColor', width = 2, className = '' }) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={width} strokeLinecap="round" strokeLinejoin="round" className={className}>
      {ICON_PATHS[name]}
    </svg>
  );
}

/* ───────────────────────── Illustrated guides (animated) ───────────────────────── */

const AV_CHARS = {
  ana: {
    c: { skin: '#e9b994', skinDark: '#c98d68', hair: '#3a2418', scrub: '#1f3566', scrubDark: '#16274d' },
    back: 'M58 92 C58 50 80 38 100 38 C120 38 142 50 142 92 L148 180 C130 190 70 190 52 180 Z',
    front: 'M62 92 C60 56 80 44 100 46 C120 44 140 56 138 92 C134 72 122 60 100 58 C78 60 66 72 62 92 Z M62 80 C57 102 59 132 64 156 L71 156 C66 128 66 102 70 84 Z M138 80 C143 102 141 132 136 156 L129 156 C134 128 134 102 130 84 Z',
    label: 'Steph, medtech',
  },
  bea: {
    c: { skin: '#e3ae86', skinDark: '#c4875f', hair: '#1d1412', scrub: '#2bb3c0', scrubDark: '#1f8f9a' },
    back: 'M54 96 C50 50 78 34 100 34 C124 34 152 50 146 98 C154 118 150 140 158 160 C142 172 124 166 118 150 L82 150 C76 168 58 172 42 160 C50 140 46 118 54 96 Z',
    front: 'M60 100 C52 56 80 40 104 42 C134 44 150 68 140 102 C134 80 120 64 96 66 C80 68 68 82 60 100 Z',
    label: 'Cristina, medtech',
  },
  carla: {
    c: { skin: '#edbf9c', skinDark: '#cd9470', hair: '#2a1a12', scrub: '#1c3160', scrubDark: '#142448' },
    back: 'M62 90 C62 52 82 42 100 42 C120 42 138 52 138 90 Z M126 52 C152 50 166 82 156 118 C150 100 142 86 130 78 Z',
    front: 'M62 88 C62 56 82 46 100 47 C118 46 138 56 138 88 C132 70 118 62 100 62 C82 62 68 70 62 88 Z',
    label: 'Reg, medtech',
  },
};

const AV_MOUTHS = {
  smile: { mouth: 'M86 113 Q100 129 114 113 Q100 118 86 113 Z', teeth: 'M88 114 Q100 119 112 114 L110 117.5 Q100 121 90 117.5 Z', braces: 'M89 116 Q100 120 111 116', show: 1 },
  open: { mouth: 'M84 111 Q100 138 116 111 Q100 116 84 111 Z', teeth: 'M86 112 Q100 117 114 112 L112 117 Q100 121 88 117 Z', braces: 'M88 115 Q100 119 112 115', show: 1 },
  calm: { mouth: 'M88 115 Q100 125 112 115 Q100 119 88 115 Z', teeth: '', braces: '', show: 0 },
  oh: { mouth: 'M95 119 a5 4 0 1 0 10 0 a5 4 0 1 0 -10 0 Z', teeth: '', braces: '', show: 0 },
};
const BROW_SOFT = 'M78 80 Q86 76 93 80 M107 80 Q114 76 122 80';
const BROW_UP = 'M78 77 Q86 71 93 77 M107 77 Q114 71 122 77';
const BROW_THINK = 'M78 77 Q86 71 93 77 M107 82 Q114 80 122 82';

const AV_MOODS = {
  happy: { ...AV_MOUTHS.smile, lo: 1, ro: 1, la: 0, ra: 0, brow: BROW_SOFT, spark: 0, think: 0 },
  wink: { ...AV_MOUTHS.smile, lo: 1, ro: 0, la: 0, ra: 1, brow: BROW_SOFT, spark: 0, think: 0 },
  cheer: { ...AV_MOUTHS.open, lo: 0, ro: 0, la: 1, ra: 1, brow: BROW_UP, spark: 1, think: 0 },
  think: { ...AV_MOUTHS.oh, lo: 1, ro: 1, la: 0, ra: 0, brow: BROW_THINK, spark: 0, think: 1 },
  calm: { ...AV_MOUTHS.calm, lo: 0, ro: 0, la: 1, ra: 1, brow: BROW_SOFT, spark: 0, think: 0 },
};

/** One SVG character: who = ana | bea | carla, mood = happy | wink | cheer | think | calm,
 *  pose = none | wave | thumbs | clipboard | pipette | crossed. Idle motion is pure CSS (see <style>). */
function Avatar({ who = 'bea', mood = 'happy', pose = 'none', className = '', title }) {
  const ch = AV_CHARS[who] ?? AV_CHARS.bea;
  const m = AV_MOODS[mood] ?? AV_MOODS.happy;
  const c = ch.c;
  const braces = who === 'bea' && m.show;
  return (
    <svg viewBox="0 0 200 240" role="img" aria-label={title ?? `${ch.label} (${mood})`} className={`block h-auto w-full overflow-visible ${className}`}>
      <g className="av-bob">
        <path d={ch.back} fill={c.hair} />
        <rect x="88" y="126" width="24" height="30" rx="8" fill={c.skin} />
        <path d="M88 140 Q100 152 112 140 L112 148 Q100 156 88 148 Z" fill={c.skinDark} opacity=".35" />
        <path d="M30 240 C30 192 52 170 84 160 L100 182 L116 160 C148 170 170 192 170 240 Z" fill={c.scrub} />
        <path d="M89 157 L100 179 L111 157 Z" fill={c.skin} />
        <path d="M84 160 L100 184 L116 160" fill="none" stroke={c.scrubDark} strokeWidth="4" strokeLinejoin="round" />
        <text x="124" y="206" fontSize="9" fontWeight="700" fill="#ffffff" opacity=".9" fontFamily="Montserrat, sans-serif">Clarity</text>
        <path d="M82 164 C70 190 76 210 92 214 Q100 217 108 214 C124 210 130 190 118 164" fill="none" stroke="#56606d" strokeWidth="3" strokeLinecap="round" />
        <circle cx="100" cy="221" r="6.5" fill="#c9cfd8" stroke="#56606d" strokeWidth="2.5" />
        <ellipse cx="62" cy="96" rx="6" ry="9" fill={c.skinDark} />
        <ellipse cx="138" cy="96" rx="6" ry="9" fill={c.skinDark} />
        <ellipse cx="100" cy="92" rx="38" ry="44" fill={c.skin} />
        <path d={ch.front} fill={c.hair} />
        <path d={m.brow} fill="none" stroke={c.hair} strokeWidth="3" strokeLinecap="round" className="av-ease" />
        {m.lo ? (
          <g className="av-blink">
            <ellipse cx="86" cy="96" rx="4.6" ry="5.8" fill="#2b1d16" />
            <circle cx="87.6" cy="94" r="1.6" fill="#ffffff" />
            <path d="M81 92 L78 89" stroke="#2b1d16" strokeWidth="1.8" strokeLinecap="round" />
          </g>
        ) : (
          <path d="M80 97 Q86 90 92 97" fill="none" stroke="#2b1d16" strokeWidth="3" strokeLinecap="round" />
        )}
        {m.ro ? (
          <g className="av-blink">
            <ellipse cx="114" cy="96" rx="4.6" ry="5.8" fill="#2b1d16" />
            <circle cx="115.6" cy="94" r="1.6" fill="#ffffff" />
            <path d="M119 92 L122 89" stroke="#2b1d16" strokeWidth="1.8" strokeLinecap="round" />
          </g>
        ) : (
          <path d="M108 97 Q114 90 120 97" fill="none" stroke="#2b1d16" strokeWidth="3" strokeLinecap="round" />
        )}
        <circle cx="77" cy="109" r="6" fill="#f08f8f" opacity=".4" />
        <circle cx="123" cy="109" r="6" fill="#f08f8f" opacity=".4" />
        <path d="M100 99 Q97 106 101 108" fill="none" stroke={c.skinDark} strokeWidth="2" strokeLinecap="round" />
        <path d={m.mouth} fill="#8a2f3a" />
        {m.show ? <path d={m.teeth} fill="#ffffff" /> : null}
        {braces ? <path d={m.braces} fill="none" stroke="#8d99a8" strokeWidth="1.5" strokeLinecap="round" /> : null}

        {pose === 'crossed' && (
          <g>
            <path d="M160 224 C130 204 90 200 54 206 L50 220 C88 214 126 220 156 238 Z" fill={c.scrubDark} />
            <path d="M40 224 C70 204 110 200 146 206 L150 220 C112 214 74 220 44 238 Z" fill={c.scrub} />
            <ellipse cx="149" cy="212" rx="9" ry="8" fill={c.skin} />
            <ellipse cx="51" cy="212" rx="9" ry="8" fill={c.skin} />
          </g>
        )}
        {pose === 'pipette' && (
          <g>
            <path d="M51 156 L52 168" stroke="#9fb8d9" strokeWidth="5" strokeLinecap="round" />
            <path d="M52 168 L60 212" stroke="#2e5aa8" strokeWidth="8" strokeLinecap="round" />
            <path d="M60 212 L63 230" stroke="#dfe8f4" strokeWidth="3" strokeLinecap="round" />
            <path d="M36 240 L50 200 L66 200 L58 240 Z" fill={c.scrubDark} />
            <circle cx="56" cy="194" r="10" fill={c.skin} />
            <ellipse cx="51" cy="160" rx="5" ry="4" fill={c.skin} />
          </g>
        )}
        {pose === 'clipboard' && (
          <g>
            <path d="M40 240 L56 206 L76 210 L66 240 Z" fill={c.scrubDark} />
            <rect x="30" y="184" width="44" height="54" rx="5" fill="#23477f" />
            <rect x="35" y="193" width="34" height="40" rx="2" fill="#ffffff" />
            <rect x="44" y="180" width="16" height="8" rx="2" fill="#c9cfd8" />
            <path d="M40 202 H64 M40 210 H64 M40 218 H56" stroke="#9fb8d9" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M41 226 l4 4 l8 -8" fill="none" stroke="#1b6b56" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <ellipse cx="71" cy="212" rx="8" ry="10" fill={c.skin} />
          </g>
        )}
        {pose === 'thumbs' && (
          <g>
            <path d="M146 240 L136 214 L160 210 L172 240 Z" fill={c.scrubDark} />
            <g className="av-pop">
              <rect x="139" y="180" width="9" height="24" rx="4.5" fill={c.skin} />
              <rect x="134" y="198" width="24" height="20" rx="7" fill={c.skin} />
              <path d="M140 204 H154 M140 210 H154" stroke={c.skinDark} strokeWidth="1.4" strokeLinecap="round" opacity=".6" />
            </g>
          </g>
        )}
        {pose === 'wave' && (
          <g className="av-wave">
            <path d="M146 178 C158 166 166 146 166 128 L180 128 C182 150 176 172 162 194 Z" fill={c.scrub} />
            <ellipse cx="173" cy="114" rx="11" ry="13" fill={c.skin} />
            <ellipse cx="161" cy="121" rx="4" ry="7" fill={c.skin} transform="rotate(-25 161 121)" />
            <path d="M168 104 V112 M174 102 V111 M180 105 V112" stroke={c.skinDark} strokeWidth="1.3" strokeLinecap="round" opacity=".55" />
          </g>
        )}
      </g>

      {m.spark ? (
        <g fill="#ffc83d">
          <path className="av-twinkle" d="M36 52 l2.5 6 l6 2.5 l-6 2.5 l-2.5 6 l-2.5 -6 l-6 -2.5 l6 -2.5 Z" />
          <path className="av-twinkle" style={{ animationDelay: '.6s' }} d="M164 40 l2 5 l5 2 l-5 2 l-2 5 l-2 -5 l-5 -2 l5 -2 Z" />
          <path className="av-twinkle" style={{ animationDelay: '1.1s' }} d="M176 86 l1.6 4 l4 1.6 l-4 1.6 l-1.6 4 l-1.6 -4 l-4 -1.6 l4 -1.6 Z" />
        </g>
      ) : null}
      {m.think ? (
        <g fill="#b7cbe8">
          <circle className="av-twinkle" cx="146" cy="52" r="3" />
          <circle className="av-twinkle" style={{ animationDelay: '.4s' }} cx="157" cy="39" r="4.5" />
          <circle className="av-twinkle" style={{ animationDelay: '.8s' }} cx="172" cy="22" r="7" />
        </g>
      ) : null}
    </svg>
  );
}

/**
 * A guide placed in a section: slides in on scroll (data-peek), drifts with parallax
 * (.section-actor), and switches to a second emotion while hovered or focused.
 */
function Guide({ who, mood = 'happy', hoverMood = 'cheer', pose = 'none', peek, className = '', title }) {
  const [active, setActive] = useState(false);
  return (
    <div className={`section-actor ${className}`}>
      <div className="actor-enter h-full w-full" data-peek={peek}>
        <div
          className={`${SPRING} h-full w-full origin-bottom hover:scale-[1.04]`}
          onPointerEnter={() => setActive(true)}
          onPointerLeave={() => setActive(false)}
        >
          <Avatar who={who} mood={active ? hoverMood : mood} pose={pose} title={title} />
        </div>
      </div>
    </div>
  );
}

function TeamAvatar({ t }) {
  return (
    <div className="relative">
      <div className="transition-opacity duration-300 group-hover:opacity-0">
        <Avatar who={t.who} mood={t.mood} pose={t.pose} title={`${t.name}, ${t.role}`} />
      </div>
      <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden="true">
        <Avatar who={t.who} mood="cheer" pose={t.pose === 'crossed' ? 'wave' : t.pose} />
      </div>
    </div>
  );
}

function Bubble({ children, className = '', tail = 'bottom' }) {
  const tailPos = tail === 'bottom' ? 'left-1/2 -bottom-2 -ml-2' : tail === 'right' ? '-right-2 top-1/2 -mt-2' : '-left-2 top-1/2 -mt-2';
  return (
    <div data-pop className={`relative rounded-[18px] bg-white px-4 py-3 text-[15px] font-bold leading-snug text-[#16336b] shadow-[0_12px_30px_-8px_rgba(22,51,107,0.3)] ${className}`}>
      {children}
      <span className={`absolute h-4 w-4 rotate-45 bg-white ${tailPos}`} />
    </div>
  );
}

/* ───────────────────────── Page ───────────────────────── */

export default function App() {
  const rootRef = useRef(null);
  const heroWrapRef = useRef(null);
  const heroCardRef = useRef(null);
  const heroStageRef = useRef(null);
  const rowsRef = useRef(null);
  const lenisRef = useRef(null);

  const [cat, setCat] = useState(PRICE_CATEGORIES[0].id);
  const [scrolled, setScrolled] = useState(false);
  const [showHelper, setShowHelper] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const current = PRICE_CATEGORIES.find((c) => c.id === cat) ?? PRICE_CATEGORIES[0];

  /* 1 ── Global smooth scroll: Lenis driven by the GSAP ticker */
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const lenis = new Lenis({
      lerp: 0.14, // snappy follow, still smooth
      smoothWheel: true,
      wheelMultiplier: 1.6,
      touchMultiplier: 1.4,
      autoRaf: false,
    });
    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);
    const raf = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  /* 2 + 3 ── Hero reveal, bento scale, scroll-driven reveals, actor life */
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Header + floating helper state (runs with or without reduced motion)
      ScrollTrigger.create({ start: 40, end: () => ScrollTrigger.maxScroll(window) + 10, onToggle: (s) => setScrolled(s.isActive) });
      ScrollTrigger.create({ trigger: '#services', start: 'top 70%', end: () => ScrollTrigger.maxScroll(window) + 10, onToggle: (s) => setShowHelper(s.isActive) });

      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        /* ── Hero intro ── */
        const intro = gsap.timeline({ defaults: { ease: 'expo.out' } });
        intro
          .from('.hero-eyebrow', { y: 24, opacity: 0, duration: 1 }, 0.1)
          .from('.hero-word', { yPercent: 120, rotate: 5, opacity: 0, duration: 1.3, stagger: 0.075 }, 0.2)
          .from('.hero-sub', { y: 30, opacity: 0, duration: 1.2 }, 0.75)
          .from('.hero-cta > *', { y: 26, opacity: 0, duration: 1.1, stagger: 0.1 }, 0.9)
          .from('.hero-ring', { scale: 0.7, opacity: 0, duration: 2 }, 0.3)
          .from('.hero-chip', { y: 30, scale: 0.85, opacity: 0, duration: 1.2, stagger: 0.12, ease: 'back.out(1.8)' }, 1.3)
          .from('.hero-stage [data-pop]', { scale: 0.6, opacity: 0, y: 12, duration: 0.9, ease: 'back.out(2.2)', transformOrigin: '50% 100%' }, 1.6);

        /* ── Hero → bento card as you scroll ── */
        gsap
          .timeline({
            scrollTrigger: { trigger: heroWrapRef.current, start: 'top top', end: 'bottom bottom', scrub: 0.4 },
          })
          .to(heroCardRef.current, { scale: 0.9, borderRadius: 44, ease: 'none' }, 0)
          .to('.hero-copy', { y: -60, opacity: 0.35, ease: 'none' }, 0)
          .to('.hero-ring', { scale: 1.15, ease: 'none' }, 0);

        gsap.utils.toArray('.hero-chip').forEach((el, i) => {
          gsap.to(el, { y: -8, duration: 2.8 + i * 0.5, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 2 + i * 0.3 });
        });

        /* ── Section headings & blocks glide in ── */
        gsap.utils.toArray('[data-reveal]').forEach((el) => {
          gsap.from(el, {
            y: 70,
            opacity: 0,
            duration: 1.4,
            ease: 'power4.out',
            scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          });
        });

        /* ── Grids cascade ── */
        gsap.utils.toArray('[data-stagger]').forEach((group) => {
          gsap.from(group.children, {
            y: 60,
            opacity: 0,
            duration: 1.2,
            ease: 'power4.out',
            stagger: 0.09,
            scrollTrigger: { trigger: group, start: 'top 86%', once: true },
          });
        });

        /* ── Actors walk on-stage in each section ── */
        gsap.utils.toArray('[data-peek]').forEach((el) => {
          if (el.closest('.hero-stage')) return;
          const dir = el.dataset.peek === 'left' ? -1 : 1;
          gsap.from(el, {
            xPercent: 35 * dir,
            yPercent: 12,
            rotation: 5 * dir,
            opacity: 0,
            duration: 1.7,
            ease: 'expo.out',
            scrollTrigger: { trigger: el, start: 'top 85%', once: true },
          });
        });
        gsap.utils.toArray('[data-pop]').forEach((el) => {
          if (el.closest('.hero-stage')) return;
          gsap.from(el, {
            scale: 0.6,
            opacity: 0,
            y: 14,
            duration: 0.9,
            ease: 'back.out(2.2)',
            scrollTrigger: { trigger: el, start: 'top 85%', once: true },
            delay: 0.45,
          });
        });

        /* ── Gentle depth parallax on section actors ── */
        gsap.utils.toArray('.section-actor').forEach((el) => {
          gsap.to(el, {
            yPercent: -8,
            ease: 'none',
            scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
          });
        });
      });

      /* Pointer parallax + magnetic buttons (fine pointers only) */
      mm.add('(prefers-reduced-motion: no-preference) and (pointer: fine)', () => {
        const magnets = gsap.utils.toArray('[data-magnetic]').map((el) => {
          const qx = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'elastic.out(1, 0.4)' });
          const qy = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'elastic.out(1, 0.4)' });
          const move = (e) => {
            const b = el.getBoundingClientRect();
            qx((e.clientX - (b.left + b.width / 2)) * 0.25);
            qy((e.clientY - (b.top + b.height / 2)) * 0.35);
          };
          const leave = () => { qx(0); qy(0); };
          el.addEventListener('pointermove', move);
          el.addEventListener('pointerleave', leave);
          return { el, move, leave };
        });

        return () => {
          magnets.forEach(({ el, move, leave }) => {
            el.removeEventListener('pointermove', move);
            el.removeEventListener('pointerleave', leave);
          });
        };
      });
    }, rootRef);

    // Re-measure once fonts/images settle
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener('load', refresh);
    document.fonts?.ready.then(refresh);

    return () => {
      window.removeEventListener('load', refresh);
      ctx.revert();
    };
  }, []);

  /* Price list: rows glide in on every tab change */
  useEffect(() => {
    if (!rowsRef.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const tween = gsap.fromTo(
      rowsRef.current.children,
      { y: 16, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.55, ease: 'power3.out', stagger: 0.03 }
    );
    requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => tween.kill();
  }, [cat]);

  const go = (e, id) => {
    e.preventDefault();
    setMenuOpen(false);
    if (lenisRef.current) lenisRef.current.scrollTo(id, { offset: -76, duration: 1.6 });
    else document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(CLINIC.mapQuery)}&output=embed`;

  return (
    <div ref={rootRef} id="top" className="min-h-screen overflow-x-clip bg-[#f4f8fc] font-[Nunito_Sans,system-ui,sans-serif] text-[#1c2b45] antialiased">
      <style>{`
        html.lenis, html.lenis body { height: auto; }
        .lenis.lenis-smooth { scroll-behavior: auto !important; }
        .lenis.lenis-smooth [data-lenis-prevent] { overscroll-behavior: contain; }
        .lenis.lenis-stopped { overflow: hidden; }
        ::selection { background: #2bb3c0; color: #0d2f33; }
        @keyframes av-bob { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-5px) } }
        @keyframes av-blink { 0%,92%,100% { transform: scaleY(1) } 95% { transform: scaleY(.1) } }
        @keyframes av-wave { 0%,100% { transform: rotate(-10deg) } 50% { transform: rotate(16deg) } }
        @keyframes av-twinkle { 0%,100% { opacity: .25; transform: scale(.8) } 50% { opacity: 1; transform: scale(1.15) } }
        @keyframes av-pop { 0%,100% { transform: translateY(0) rotate(0) } 50% { transform: translateY(-4px) rotate(-6deg) } }
        .av-bob { animation: av-bob 4.5s ease-in-out infinite; }
        .av-blink { transform-box: fill-box; transform-origin: center; animation: av-blink 5.5s infinite; }
        .av-wave { transform-box: view-box; transform-origin: 162px 196px; animation: av-wave 1.5s ease-in-out infinite; }
        .av-twinkle { transform-box: fill-box; transform-origin: center; animation: av-twinkle 1.8s ease-in-out infinite; }
        .av-pop { transform-box: fill-box; transform-origin: 50% 100%; animation: av-pop 2.2s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) { .av-bob, .av-blink, .av-wave, .av-twinkle, .av-pop { animation: none; } }
      `}</style>

      {/* ── Header ── */}
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-500 ${
          scrolled || menuOpen ? 'bg-white/85 shadow-[0_8px_30px_-12px_rgba(22,51,107,0.25)] backdrop-blur-xl' : 'bg-transparent'
        }`}
      >
        <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-4 px-5 py-3 sm:px-6">
          <a href="#top" onClick={(e) => go(e, '#top')} className="flex items-center gap-3">
            <img src={logo} alt="Clarity Diagnostic Inc. logo" className="h-12 w-12 rounded-full object-cover shadow-[0_4px_12px_rgba(30,91,191,0.3)]" />
            <span className="flex flex-col leading-none">
              <span className="font-[Montserrat,sans-serif] text-[21px] font-extrabold tracking-wide text-[#1b6b56]">CLARITY</span>
              <span className="mt-1 font-[Montserrat,sans-serif] text-[10px] font-semibold tracking-[0.2em] text-[#4a5568]">DIAGNOSTICS &amp; MEDICAL</span>
            </span>
          </a>

          <nav aria-label="Main" className="hidden items-center gap-8 text-[15px] font-bold lg:flex">
            {NAV.map((n) => (
              <a key={n.id} href={n.id} onClick={(e) => go(e, n.id)} className="group relative text-[#1c2b45] no-underline">
                {n.label}
                <span className="absolute -bottom-1 left-0 h-0.5 w-full origin-left scale-x-0 rounded bg-[#1e5bbf] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a href={CLINIC.facebook} target="_blank" rel="noreferrer" data-magnetic className={`${BTN} min-h-[46px] bg-[#1e5bbf] px-5 text-[15px] text-white hover:bg-[#1a4fa6] max-sm:hidden`}>
              <Icon name="chat" size={18} /> Message us
            </a>
            <button
              type="button"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
              className={`${SPRING} flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#16336b] shadow-[0_4px_14px_rgba(22,51,107,0.15)] active:scale-90 lg:hidden`}
            >
              <Icon name={menuOpen ? 'close' : 'menu'} size={22} />
            </button>
          </div>
        </div>
        {menuOpen && (
          <nav aria-label="Mobile" className="flex flex-col gap-1 border-t border-[#e3ebf5] px-5 pb-5 pt-2 lg:hidden">
            {NAV.map((n) => (
              <a key={n.id} href={n.id} onClick={(e) => go(e, n.id)} className="rounded-xl px-3 py-3 text-lg font-bold text-[#16336b] no-underline hover:bg-[#eef4fc]">
                {n.label}
              </a>
            ))}
            <a href={CLINIC.facebook} target="_blank" rel="noreferrer" className={`${BTN} mt-2 bg-[#1e5bbf] text-white`}>
              <Icon name="chat" size={18} /> Message us on Facebook
            </a>
          </nav>
        )}
      </header>

      <main>
        {/* ── Hero (sticky on desktop so it can morph into a bento card) ── */}
        <section ref={heroWrapRef} className="relative lg:h-[125vh]">
          <div className="lg:sticky lg:top-0 lg:h-screen">
            <div
              ref={heroCardRef}
              className="relative h-full min-h-[100svh] origin-top overflow-hidden will-change-transform lg:min-h-0"
              style={{ background: 'radial-gradient(120% 90% at 75% 70%, #ffffff 0%, #dcebfc 42%, #b8d3f5 100%)' }}
            >
              {/* soft lab glow */}
              <div aria-hidden="true" className="pointer-events-none absolute -left-40 top-24 h-[420px] w-[420px] rounded-full bg-[#2bb3c0]/15 blur-3xl" />

              <div className="relative mx-auto flex h-full max-w-[1200px] flex-col px-5 pt-28 sm:px-6 lg:flex-row lg:items-stretch lg:gap-10 lg:pt-0">
                {/* Copy */}
                <div className="hero-copy relative z-10 flex flex-col justify-center gap-6 lg:w-[46%] lg:pb-10">
                  <span className="hero-eyebrow inline-flex items-center gap-2 self-start rounded-full bg-white px-4 py-2 text-[13px] font-extrabold tracking-wider text-[#b23a1f] shadow-[0_2px_10px_rgba(22,51,107,0.1)]">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#e5533d]/70" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-[#e5533d]" />
                    </span>
                    NOW OPEN TO SERVE YOU
                  </span>

                  <h1 className="font-[Montserrat,sans-serif] text-[40px] font-extrabold leading-[1.06] tracking-[-0.01em] text-[#16336b] sm:text-[54px] lg:text-[60px]" aria-label={HEADLINE}>
                    {HEADLINE.split(' ').map((w, i) => (
                      <span key={i} aria-hidden="true" className="mr-[0.26em] inline-block overflow-hidden pb-[0.08em] align-top">
                        <span className="hero-word inline-block will-change-transform">{w}</span>
                      </span>
                    ))}
                  </h1>

                  <p className="hero-sub max-w-[520px] text-lg leading-relaxed text-[#3d4b63] sm:text-[19px]">
                    Clarity is a diagnostic clinic and laboratory in San Jose del Monte, Bulacan — lab tests, X-ray, ultrasound and ECG, check-ups and pre-employment medicals, plus home blood extraction when you can't come to us.
                  </p>

                  <div className="hero-cta flex flex-wrap gap-3">
                    <a href="#packages" onClick={(e) => go(e, '#packages')} data-magnetic className={`${BTN} bg-[#1e5bbf] text-white shadow-[0_12px_28px_-8px_rgba(30,91,191,0.55)] hover:bg-[#1a4fa6] hover:shadow-[0_18px_36px_-8px_rgba(30,91,191,0.6)]`}>
                      See packages &amp; prices
                    </a>
                    <a href="#home-service" onClick={(e) => go(e, '#home-service')} data-magnetic className={`${BTN} border-2 border-[#c9d8ee] bg-white text-[#16336b] hover:border-[#1e5bbf]`}>
                      Book home service
                    </a>
                  </div>
                </div>

                {/* Stage: static cut-out of the three staff from the poster */}
                <div ref={heroStageRef} className="hero-stage relative mt-6 flex flex-1 items-end justify-center lg:mt-0">
                  <div aria-hidden="true" className="hero-ring absolute bottom-[-18%] max-lg:hidden left-1/2 aspect-square w-[118%] max-w-[760px] -translate-x-1/2 rounded-full border border-white/70 bg-white/35" />
                  <div aria-hidden="true" className="hero-ring absolute bottom-[-6%] left-1/2 aspect-square w-[86%] max-w-[560px] -translate-x-1/2 rounded-full bg-white/50" />

                  <div className="relative aspect-[899/462] w-full max-w-[780px]">
                    <img
                      src={heroGroup}
                      alt="Clarity staff: our medtechs in Clarity scrubs"
                      width="899"
                      height="462"
                      fetchPriority="high"
                      draggable="false"
                      className="absolute inset-0 h-full w-full select-none object-contain object-bottom drop-shadow-[0_24px_30px_rgba(22,51,107,0.22)]"
                    />

                    <div className="absolute -top-[16%] left-[47.5%] z-30 w-[190px] -translate-x-1/2">
                      <Bubble className="text-center">Hi! Welcome to Clarity.</Bubble>
                    </div>

                    <div className="hero-chip absolute left-[-6%] top-[-12%] z-30 hidden items-center gap-2 rounded-2xl bg-white/90 px-4 py-3 text-sm font-bold text-[#16336b] shadow-[0_14px_30px_-10px_rgba(22,51,107,0.35)] backdrop-blur sm:flex">
                      <Icon name="clock" size={18} stroke="#1e5bbf" /> Open 6 AM · Mon–Sat
                    </div>
                    <div className="hero-chip absolute right-[-4%] top-[-4%] z-30 hidden items-center gap-2 rounded-2xl bg-white/90 px-4 py-3 text-sm font-bold text-[#16336b] shadow-[0_14px_30px_-10px_rgba(22,51,107,0.35)] backdrop-blur sm:flex">
                      <Icon name="home" size={18} stroke="#1b6b56" /> Home blood extraction
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Quick info bento ── */}
        <section className="relative z-10 mx-auto max-w-[1200px] px-5 pb-20 pt-10 sm:px-6 lg:-mt-[18vh]">
          <div data-stagger className="grid gap-4 md:grid-cols-3">
            {[
              { icon: 'clock', tint: 'bg-[#e3effc]', stroke: '#1e5bbf', title: 'Clinic hours', body: <>Monday – Saturday<br />6:00 AM – 4:00 PM</> },
              { icon: 'pin', tint: 'bg-[#e3f4f0]', stroke: '#1b6b56', title: 'Find us', body: <>Grotto Shop &amp; Ride Bldg., in front of Grotto Church, Graceville, SJDM</> },
              { icon: 'phone', tint: 'bg-[#fdeee9]', stroke: '#c2412a', title: 'Call or text', body: <><a href={`tel:${CLINIC.phone}`} className="font-extrabold text-[#1e5bbf] no-underline">{CLINIC.phoneDisplay}</a><br />or message our Facebook page</> },
            ].map((c) => (
              <div key={c.title} className={`${CARD} flex items-start gap-4 rounded-[24px] bg-white p-6 shadow-[0_6px_24px_-10px_rgba(22,51,107,0.18)]`}>
                <span className={`flex h-12 w-12 flex-none items-center justify-center rounded-2xl ${c.tint}`}>
                  <Icon name={c.icon} size={24} stroke={c.stroke} />
                </span>
                <div>
                  <div className="font-[Montserrat,sans-serif] text-base font-bold text-[#16336b]">{c.title}</div>
                  <div className="mt-1 text-[15px] leading-relaxed text-[#3d4b63]">{c.body}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Services ── */}
        <section id="services" className="bg-white">
          <div className="mx-auto max-w-[1200px] px-5 py-24 sm:px-6">
            <div className="mb-12 flex flex-wrap items-end justify-between gap-8">
              <div data-reveal className="min-w-0 flex-[1_1_520px]">
                <div className={EYEBROW}>OUR SERVICES</div>
                <h2 className={`${H2} mt-2`}>Your one-stop diagnostic clinic in Bulacan</h2>
              </div>
              <div className="flex min-w-0 flex-[1_1_320px] items-end gap-2 lg:flex-[0_1_420px]">
                <Bubble tail="right" className="mb-10 min-w-0 flex-1">Not sure which test you need? Message us and we'll guide you.</Bubble>
                <Guide who="ana" mood="think" hoverMood="happy" peek="right" className="w-[130px] flex-none" title="Steph thinking" />
              </div>
            </div>

            <div data-stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
              {SERVICES.map((s) => (
                <div key={s.title} className={`${CARD} group flex flex-col gap-4 rounded-[26px] border border-[#e3ebf5] bg-[#f4f8fc] p-6`}>
                  <span className={`${SPRING} flex h-[60px] w-[60px] items-center justify-center rounded-[18px] ${s.color} group-hover:scale-110 group-hover:-rotate-6`}>
                    <Icon name={s.icon} size={30} stroke={s.icon === 'pulse' ? '#0d2f33' : '#ffffff'} width={1.8} />
                  </span>
                  <h3 className="font-[Montserrat,sans-serif] text-[19px] font-bold leading-snug text-[#16336b]">{s.title}</h3>
                  <p className="text-[15px] leading-relaxed text-[#3d4b63]">{s.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Packages ── */}
        <section id="packages">
          <div className="mx-auto max-w-[1200px] px-5 py-24 sm:px-6">
            <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
              <div data-reveal className="min-w-0 flex-[1_1_520px]">
                <div className={EYEBROW}>PROMO PACKAGES</div>
                <h2 className={`${H2} mt-2`}>Bundled tests, friendlier prices</h2>
              </div>
              <p data-reveal className="flex-[0_1_380px] text-base leading-relaxed text-[#3d4b63]">
                Walk in Monday to Saturday, 6 AM – 4 PM. Prices subject to change without prior notice.
              </p>
            </div>

            {/* Featured: Teachers */}
            <div
              data-reveal
              className="relative mb-6 overflow-hidden rounded-[32px] p-8 text-white sm:p-10"
              style={{ background: 'linear-gradient(120deg, #16336b 0%, #1e5bbf 100%)' }}
            >
              <div aria-hidden="true" className="absolute -right-24 -top-24 h-[380px] w-[380px] rounded-full bg-white/10" />
              <div className="relative flex flex-wrap items-end gap-8">
                <div className="flex min-w-0 flex-[1_1_520px] flex-col gap-5 pb-2">
                  <span className="self-start rounded-full bg-[#ffd56a] px-4 py-1.5 text-[13px] font-extrabold tracking-wide text-[#3d2c00]">
                    FEATURED · FOR DEPED &amp; LICENSED TEACHERS
                  </span>
                  <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2">
                    <h3 className="font-[Montserrat,sans-serif] text-[30px] font-extrabold sm:text-[36px]">Teachers Package</h3>
                    <span className="font-[Montserrat,sans-serif] text-[40px] font-extrabold text-[#ffd56a]">{peso(TEACHERS.price)}</span>
                  </div>
                  <ul data-stagger className="grid gap-x-6 gap-y-2.5 text-[15px] sm:grid-cols-2 md:grid-cols-3">
                    {TEACHERS.items.map((it) => (
                      <li key={it} className="flex items-center gap-2">
                        <Icon name="check" size={18} stroke="#7fd4dc" width={2.6} /> {it}
                      </li>
                    ))}
                  </ul>
                  <p className="text-sm text-[#cfe0f7]">Valid DepEd or school ID required.</p>
                </div>
                <Guide who="carla" mood="cheer" hoverMood="wink" pose="clipboard" peek="right" className="-mb-10 hidden w-[230px] flex-none sm:block" title="Reg celebrating" />
              </div>
            </div>

            <div data-stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {PACKAGES.map((p) => (
                <article key={p.name} className={`${CARD} flex flex-col overflow-hidden rounded-[26px] border border-[#e3ebf5] bg-white`}>
                  <div className={`h-2 ${p.bar}`} />
                  <div className="flex flex-1 flex-col gap-4 p-6">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-[Montserrat,sans-serif] text-[18px] font-bold leading-snug text-[#16336b]">{p.name}</h3>
                      <span className="flex-none font-[Montserrat,sans-serif] text-2xl font-extrabold text-[#16336b]">{peso(p.price)}</span>
                    </div>
                    <p className="text-sm text-[#5a6880]">{p.blurb}</p>
                    <ul className="flex flex-col gap-2 border-t border-[#edf2f8] pt-4">
                      {p.items.map((it) => (
                        <li key={it} className="flex items-center gap-2 text-[15px]">
                          <Icon name="check" size={16} stroke="#1b6b56" width={2.6} /> {it}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── Price list ── */}
        <section id="prices" className="bg-white">
          <div className="mx-auto max-w-[1200px] px-5 py-24 sm:px-6">
            <div className="mb-8 flex flex-wrap items-end justify-between gap-6">
              <div data-reveal className="min-w-0 flex-[1_1_520px]">
                <div className={EYEBROW}>LABORATORY PRICE LIST</div>
                <h2 className={`${H2} mt-2`}>Laboratory test prices, no surprises</h2>
              </div>
              <p data-reveal className="flex-[0_1_380px] text-base leading-relaxed text-[#3d4b63]">Pick a category to see each test and its price.</p>
            </div>

            <div data-reveal role="tablist" aria-label="Test categories" className="mb-7 flex flex-wrap gap-2.5">
              {PRICE_CATEGORIES.map((c) => {
                const active = c.id === cat;
                return (
                  <button
                    key={c.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setCat(c.id)}
                    className={`${SPRING} min-h-11 cursor-pointer rounded-full border-2 px-[18px] text-[15px] font-bold hover:scale-[1.05] active:scale-95 ${
                      active ? 'border-[#16336b] bg-[#16336b] text-white shadow-[0_10px_22px_-10px_rgba(22,51,107,0.7)]' : 'border-[#c9d8ee] bg-white text-[#16336b] hover:border-[#1e5bbf]'
                    }`}
                  >
                    {c.label}
                  </button>
                );
              })}
            </div>

            <div className="flex flex-wrap items-start gap-7">
              <div data-reveal role="tabpanel" className="min-w-0 flex-[999_1_600px] rounded-[28px] border border-[#e3ebf5] bg-[#f4f8fc] p-6 sm:p-8">
                <div className="mb-3 flex items-baseline justify-between gap-3">
                  <h3 className="font-[Montserrat,sans-serif] text-2xl font-extrabold text-[#16336b]">{current.label}</h3>
                  <span className="text-sm font-bold text-[#5a6880]">{current.items.length} tests</span>
                </div>
                <div ref={rowsRef} className="grid gap-x-8 md:grid-cols-2">
                  {current.items.map(([name, price]) => (
                    <div key={cat + name} className="flex justify-between gap-4 border-b border-dashed border-[#c9d8ee] py-3.5 text-base">
                      <span>{name}</span>
                      <span className="whitespace-nowrap font-extrabold text-[#1e5bbf]">{peso(price)}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-5 text-sm text-[#5a6880]">
                  Prices are subject to change without prior notice. For inquiries call {CLINIC.phoneDisplay}.
                </p>
              </div>
              <div className="flex flex-[1_1_240px] flex-col items-center gap-3">
                <Bubble className="bg-[#e3f4f0] text-center !text-[#134d3e]">Fasting needed? We'll tell you how to prepare before your visit.</Bubble>
                <Guide who="ana" mood="wink" hoverMood="cheer" pose="pipette" peek="left" className="w-[200px]" title="Steph winking" />
              </div>
            </div>
          </div>
        </section>

        {/* ── Home service ── */}
        <section id="home-service" style={{ background: 'linear-gradient(180deg, #e3f4f0 0%, #f4f8fc 100%)' }}>
          <div className="mx-auto flex max-w-[1200px] flex-wrap items-center gap-12 px-5 py-24 sm:px-6">
            <div className="flex flex-[1_1_320px] justify-center">
              <div className="relative w-[300px]">
                <div aria-hidden="true" className="absolute inset-x-0 bottom-0 mx-auto aspect-square w-[300px] rounded-full bg-[#2bb3c0]/25" />
                <div className="absolute -right-6 top-6 z-10">
                  <Bubble className="!text-[#1b6b56]">We'll come to you!</Bubble>
                </div>
                <Guide who="bea" mood="cheer" hoverMood="happy" pose="wave" peek="left" className="relative mx-auto w-[270px]" title="Cristina waving" />
              </div>
            </div>
            <div className="flex min-w-0 flex-[999_1_560px] flex-col gap-6">
              <div data-reveal>
                <div className={EYEBROW}>HOME SERVICE</div>
                <h2 className={`${H2} mt-2`}>Home blood extraction in Bulacan, in three easy steps</h2>
              </div>
              <ol data-stagger className="grid gap-4 sm:grid-cols-3">
                {[
                  ['Message or call us', 'Tell us the tests you need and your address.'],
                  ['Pick a schedule', 'We confirm a time and any fasting instructions.'],
                  ['We visit & collect', 'Your sample goes to our lab and results follow.'],
                ].map(([t, d], i) => (
                  <li key={t} className={`${CARD} flex flex-col gap-2.5 rounded-[22px] bg-white p-6`}>
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1b6b56] font-[Montserrat,sans-serif] font-extrabold text-white">{i + 1}</span>
                    <div className="font-[Montserrat,sans-serif] text-[17px] font-bold text-[#16336b]">{t}</div>
                    <div className="text-[15px] leading-relaxed text-[#3d4b63]">{d}</div>
                  </li>
                ))}
              </ol>
              <div data-reveal className="flex flex-wrap gap-3">
                <a href={CLINIC.facebook} target="_blank" rel="noreferrer" data-magnetic className={`${BTN} bg-[#1b6b56] text-white hover:bg-[#165a48]`}>
                  Request home service
                </a>
                <a href={`tel:${CLINIC.phone}`} data-magnetic className={`${BTN} border-2 border-[#b9dcd2] bg-white text-[#134d3e] hover:border-[#1b6b56]`}>
                  Call {CLINIC.phoneDisplay}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── Team ── */}
        <section className="bg-white">
          <div className="mx-auto max-w-[1200px] px-5 py-24 sm:px-6">
            <div data-reveal className="mb-12 text-center">
              <div className={EYEBROW}>MEET YOUR CLARITY TEAM</div>
              <h2 className={`${H2} mt-2`}>Friendly faces from check-in to results</h2>
            </div>
            <div data-stagger className="grid gap-6 md:grid-cols-3">
              {TEAM.map((t) => (
                <article key={t.name} className={`${CARD} group overflow-hidden rounded-[28px] bg-[#f4f8fc]`}>
                  <div className="flex justify-center px-6 pt-8">
                    <div className="w-[220px] overflow-hidden rounded-full bg-[#dcebfc] pt-4 transition-colors duration-500 group-hover:bg-[#cfe4fb]">
                      <TeamAvatar t={t} />
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-1.5 p-6 text-center">
                    <div className="font-[Montserrat,sans-serif] text-xl font-extrabold text-[#16336b]">{t.name}</div>
                    <div className="text-sm font-bold text-[#1b6b56]">{t.role}</div>
                    <p className="mt-1 text-[15px] leading-relaxed text-[#3d4b63]">{t.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── Contact ── */}
        <section id="contact">
          <div className="mx-auto flex max-w-[1200px] flex-wrap items-stretch gap-8 px-5 py-24 sm:px-6">
            <div data-reveal className="flex min-w-0 flex-[1_1_420px] flex-col gap-6">
              <div>
                <div className={EYEBROW}>VISIT US</div>
                <h2 className={`${H2} mt-2`}>Visit our clinic in San Jose del Monte, Bulacan</h2>
              </div>
              <dl className="flex flex-col gap-4 text-base leading-relaxed">
                <div><dt className="font-extrabold">Address</dt><dd>{CLINIC.address}</dd></div>
                <div><dt className="font-extrabold">Clinic hours</dt><dd>{CLINIC.hours}</dd></div>
                <div>
                  <dt className="font-extrabold">Contact</dt>
                  <dd>
                    <a href={`tel:${CLINIC.phone}`} className="font-bold text-[#1e5bbf]">{CLINIC.phoneDisplay}</a>
                    {' · '}
                    <a href={`mailto:${CLINIC.email}`} className="text-[#1e5bbf]">{CLINIC.email}</a>
                  </dd>
                </div>
              </dl>
              <div className="flex flex-wrap gap-3">
                <a href={CLINIC.facebook} target="_blank" rel="noreferrer" data-magnetic className={`${BTN} bg-[#1e5bbf] text-white hover:bg-[#1a4fa6]`}>Facebook page</a>
              </div>
              <div className="flex flex-col gap-3 rounded-[24px] border border-[#e3ebf5] bg-white p-5 shadow-[0_6px_24px_-12px_rgba(22,51,107,0.2)]">
                <div className="flex items-center gap-2 font-[Montserrat,sans-serif] text-base font-bold text-[#16336b]">
                  <Icon name="pin" size={20} stroke="#1b6b56" /> Find us here
                </div>
                <p className="text-[15px] text-[#3d4b63]">Tap to start driving directions straight to the clinic.</p>
                <div className="flex flex-wrap gap-3">
                  <a href={CLINIC.googleDrive} target="_blank" rel="noreferrer" data-magnetic className={`${BTN} min-h-[48px] bg-[#16336b] px-6 text-[15px] text-white hover:bg-[#122b5a]`}>
                    <Icon name="nav" size={18} /> Google Maps
                  </a>
                  <a href={CLINIC.wazeDrive} target="_blank" rel="noreferrer" data-magnetic className={`${BTN} min-h-[48px] bg-[#2bb3c0] px-6 text-[15px] text-[#0d2f33] hover:bg-[#25a1ad]`}>
                    <Icon name="nav" size={18} /> Waze
                  </a>
                </div>
              </div>
            </div>
            <div data-reveal className="min-h-[380px] min-w-0 flex-[1_1_420px] overflow-hidden rounded-[32px] border border-[#e3ebf5] bg-[#dce8f6] shadow-[0_20px_50px_-24px_rgba(22,51,107,0.4)]">
              <iframe title="Map to Clarity Diagnostics" src={mapSrc} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="h-full min-h-[380px] w-full border-0" />
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer ── */}
      <footer className="bg-[#16336b] text-[#d5e2f5]">
        <div className="mx-auto flex max-w-[1200px] flex-wrap justify-between gap-8 px-5 pb-7 pt-12 sm:px-6">
          <div className="flex flex-[1_1_320px] items-center gap-4">
            <img src={logo} alt="Clarity Diagnostic Inc. logo" className="h-[72px] w-[72px] rounded-[18px] object-cover" />
            <div>
              <div className="font-[Montserrat,sans-serif] text-lg font-extrabold text-white">{CLINIC.name}</div>
              <div className="mt-1 text-sm">Clarity Diagnostic Inc. · San Jose del Monte, Bulacan</div>
            </div>
          </div>
          <nav aria-label="Footer" className="flex flex-wrap items-center gap-x-7 gap-y-2 text-[15px]">
            {NAV.map((n) => (
              <a key={n.id} href={n.id} onClick={(e) => go(e, n.id)} className="text-[#d5e2f5] no-underline hover:text-white">{n.label}</a>
            ))}
          </nav>
        </div>
        <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-white/15 px-5 pb-28 pt-5 text-[13px] text-[#aac1e3] sm:px-6">
          <span>© {new Date().getFullYear()} Clarity Diagnostic Inc. All rights reserved. Prices subject to change without prior notice.</span>
          <span>
            Powered by <span className="font-extrabold tracking-wide text-white">JSG</span>
          </span>
        </div>
      </footer>

      {/* ── Floating helper ── */}
      <a
        href={CLINIC.facebook}
        target="_blank"
        rel="noreferrer"
        aria-label="Message Clarity on Facebook"
        className={`group fixed bottom-5 right-5 z-40 flex items-center gap-3 no-underline transition-[opacity,translate] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          showHelper ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-6 opacity-0'
        }`}
      >
        <span className={`${SPRING} hidden rounded-2xl bg-white px-4 py-2.5 text-sm font-extrabold text-[#16336b] shadow-[0_10px_28px_-8px_rgba(22,51,107,0.35)] group-hover:-translate-x-1 sm:block`}>
          Questions? Ask Cristina
        </span>
        <span className={`${SPRING} block h-[72px] w-[72px] overflow-hidden rounded-full border-4 border-white bg-[#2bb3c0] shadow-[0_10px_28px_-6px_rgba(22,51,107,0.45)] group-hover:scale-110 group-active:scale-95`}>
          <span className="mx-auto mt-1 block w-[86px] -translate-x-[7px]"><Avatar who="bea" mood="happy" pose="none" title="Cristina" /></span>
        </span>
      </a>
    </div>
  );
}
