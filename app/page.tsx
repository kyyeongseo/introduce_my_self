'use client';

import { useEffect, useRef } from 'react';

interface Part {
  id: string;
  label: string;
  keyword: string | null;
  isFinal?: boolean;
  slotId: string;
  instId: string;
  cx: number;
  cy: number;
  color: string;
  w: number;
  h: number;
  svg: string;
}

const PARTS: Part[] = [
  {
    id: 'antenna', label: '안테나',
    keyword: '안녕! 나는 박경서야 👋',
    slotId: 'slot-antenna', instId: 'i-antenna',
    cx: 110, cy: 20, color: '#f0c020', w: 54, h: 60,
    svg: `<svg viewBox="0 0 54 60" xmlns="http://www.w3.org/2000/svg">
      <rect x="22" y="20" width="10" height="28" rx="3" fill="#f0c020"/>
      <circle cx="27" cy="13" r="11" fill="#ffe660"/>
      <circle cx="27" cy="13" r="6" fill="#f0c020"/>
      <rect x="20" y="16" width="14" height="6" rx="2" fill="#d4a800"/>
    </svg>`,
  },
  {
    id: 'left-eye', label: '왼쪽 눈',
    keyword: '03년생 🐣',
    slotId: 'slot-left-eye', instId: 'i-left-eye',
    cx: 84, cy: 90, color: '#38b878', w: 56, h: 56,
    svg: `<svg viewBox="0 0 56 56" xmlns="http://www.w3.org/2000/svg">
      <circle cx="28" cy="28" r="26" fill="#38b878"/>
      <circle cx="28" cy="28" r="17" fill="#74e0a8"/>
      <circle cx="28" cy="28" r="9" fill="#b8f4d0"/>
      <circle cx="33" cy="23" r="3.5" fill="white" opacity="0.9"/>
    </svg>`,
  },
  {
    id: 'right-eye', label: '오른쪽 눈',
    keyword: '본가 세종 🏡',
    slotId: 'slot-right-eye', instId: 'i-right-eye',
    cx: 136, cy: 90, color: '#38b878', w: 56, h: 56,
    svg: `<svg viewBox="0 0 56 56" xmlns="http://www.w3.org/2000/svg">
      <circle cx="28" cy="28" r="26" fill="#38b878"/>
      <circle cx="28" cy="28" r="17" fill="#74e0a8"/>
      <circle cx="28" cy="28" r="9" fill="#b8f4d0"/>
      <circle cx="33" cy="23" r="3.5" fill="white" opacity="0.9"/>
    </svg>`,
  },
  {
    id: 'left-arm', label: '왼팔',
    keyword: '벤처전공 💡',
    slotId: 'slot-left-arm', instId: 'i-left-arm',
    cx: 17, cy: 215, color: '#ff6b6b', w: 40, h: 90,
    svg: `<svg viewBox="0 0 40 90" xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="3" width="30" height="84" rx="12" fill="#88bef0"/>
      <rect x="10" y="10" width="20" height="9" rx="3" fill="#b0d8f8"/>
      <circle cx="20" cy="72" r="10" fill="#5898d8"/>
      <rect x="14" y="80" width="12" height="5" rx="2" fill="#b0d8f8"/>
    </svg>`,
  },
  {
    id: 'right-arm', label: '오른팔',
    keyword: '영화, 음악 좋아함 🎬🎵',
    slotId: 'slot-right-arm', instId: 'i-right-arm',
    cx: 203, cy: 215, color: '#ff6b6b', w: 40, h: 90,
    svg: `<svg viewBox="0 0 40 90" xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="3" width="30" height="84" rx="12" fill="#88bef0"/>
      <rect x="10" y="10" width="20" height="9" rx="3" fill="#b0d8f8"/>
      <circle cx="20" cy="72" r="10" fill="#5898d8"/>
      <rect x="14" y="80" width="12" height="5" rx="2" fill="#b0d8f8"/>
    </svg>`,
  },
  {
    id: 'chest', label: '가슴 패널',
    keyword: '여유로운 삶 추구 ☕',
    slotId: 'slot-chest', instId: 'i-chest',
    cx: 110, cy: 224, color: '#b478ff', w: 76, h: 68,
    svg: `<svg viewBox="0 0 76 68" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="3" width="70" height="62" rx="11" fill="#c4a8f8"/>
      <rect x="10" y="11" width="56" height="9" rx="3" fill="#dcceff" opacity="0.85"/>
      <path d="M38 52 C38 52 14 37 14 23 C14 15 21 12 28 15 C33 17 38 24 38 24 C38 24 43 17 48 15 C55 12 62 15 62 23 C62 37 38 52 38 52Z" fill="#ff90c0"/>
    </svg>`,
  },
  {
    id: 'left-leg', label: '왼쪽 다리',
    keyword: '착하게 살기 😇',
    slotId: 'slot-left-leg', instId: 'i-left-leg',
    cx: 74, cy: 338, color: '#ffb648', w: 60, h: 44,
    svg: `<svg viewBox="0 0 60 44" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="3" width="54" height="38" rx="10" fill="#ecc880"/>
      <rect x="10" y="13" width="40" height="8" rx="3" fill="#f8dea0"/>
      <circle cx="18" cy="33" r="5.5" fill="#d8a848"/>
      <circle cx="43" cy="33" r="5.5" fill="#d8a848"/>
    </svg>`,
  },
  {
    id: 'right-leg', label: '오른쪽 다리',
    keyword: '진로 고민 중 🤔',
    slotId: 'slot-right-leg', instId: 'i-right-leg',
    cx: 146, cy: 338, color: '#ffb648', w: 60, h: 44,
    svg: `<svg viewBox="0 0 60 44" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="3" width="54" height="38" rx="10" fill="#ecc880"/>
      <rect x="10" y="13" width="40" height="8" rx="3" fill="#f8dea0"/>
      <circle cx="18" cy="33" r="5.5" fill="#d8a848"/>
      <circle cx="43" cy="33" r="5.5" fill="#d8a848"/>
    </svg>`,
  },
  {
    id: 'power', label: '파워 코어',
    keyword: null,
    isFinal: true,
    slotId: 'slot-power', instId: 'i-power',
    cx: 110, cy: 278, color: '#f8cc20', w: 52, h: 52,
    svg: `<svg viewBox="0 0 52 52" xmlns="http://www.w3.org/2000/svg">
      <circle cx="26" cy="26" r="24" fill="#f8cc20"/>
      <circle cx="26" cy="26" r="16" fill="#fff4a0"/>
      <text x="26" y="33" text-anchor="middle" font-size="18" fill="#b87800">⚡</text>
    </svg>`,
  },
];

const ALL_KEYWORDS = [
  '03년생 🐣', '본가 세종 🏡', '여유로운 삶 추구 ☕',
  '벤처전공 💡', '영화, 음악 좋아함 🎬🎵',
  '착하게 살기 😇', '진로 고민 중 🤔',
];

const GUIDE_ORDER = ['antenna','left-eye','right-eye','left-arm','right-arm','chest','left-leg','right-leg','power'];

const GUIDE_TEXT: Record<string, string> = {
  'antenna':   "으... 안테나가 없어서 신호를 못 잡겠어.\n머리 위에 달아줄래? 부탁이야 📡",
  'left-eye':  "이제 신호는 잡혔는데 눈이 없어서 아무것도 못 봐.\n왼쪽 눈 좀 달아줄 수 있어? 👁️",
  'right-eye': "오른쪽 눈도 달아줘!\n한쪽 눈으론 세상이 기울어 보인다고 ㅠ 👁️",
  'left-arm':  "팔이 없어서 하이파이브도 못 해.\n왼팔 달아줄 수 있어? 👏",
  'right-arm': "오른팔도 부탁할게!\n한 팔로 박수치면 좀 어색하잖아 💪",
  'chest':     "가슴 패널이 없으니 심장이 다 보여서 민망해...\n가려줄 수 있도록 패널을 달아줘",
  'left-leg':  "다리 없이 서있는 게 생각보다 훨씬 힘들어...\n왼쪽 다리 좀 달아줘 🦵",
  'right-leg': "오른쪽도 달아줘!\n한쪽만 있으면 뱅글뱅글 돌게 생겼잖아 🦵",
  'power':     "파워 코어만 넣으면 돼!\n마지막이니까 힘내줘... 나도 힘낼게 ⚡",
};

export default function Home() {
  const resetFnRef = useRef<() => void>(() => {});

  useEffect(() => {
    const installed = new Set<string>();
    let activePart: { part: Part; el: HTMLElement } | null = null;
    let dragOffX = 0, dragOffY = 0;

    const partsArea   = document.getElementById('parts-area')!;
    const progressEl  = document.getElementById('progress')!;
    const ghostEl     = document.getElementById('drag-ghost')!;

    // ── Progress dots ──────────────────────────────────────────────────────
    PARTS.forEach(p => {
      const d = document.createElement('div');
      d.className = 'pdot';
      d.id = 'dot-' + p.id;
      progressEl.appendChild(d);
    });

    // ── Scatter parts ──────────────────────────────────────────────────────
    function scatterParts() {
      const W = partsArea.offsetWidth || 700;
      const H = 220;
      const GAP = 18;
      const placed: { x: number; y: number; w: number; h: number }[] = [];

      PARTS.forEach(part => {
        const el = document.createElement('div');
        el.className = 'part';
        el.id = 'part-' + part.id;
        el.title = part.label;
        const pw = part.w, ph = part.h + 20;
        el.style.width  = pw + 'px';
        el.style.height = ph + 'px';
        el.innerHTML = part.svg + `<div class="plabel">${part.label}</div>`;

        let x = 0, y = 0, tries = 0;
        do {
          x = 10 + Math.random() * Math.max(0, W - pw - 20);
          y = 6  + Math.random() * Math.max(0, H - ph - 12);
          tries++;
        } while (
          tries < 400 &&
          placed.some(p =>
            x < p.x + p.w + GAP && x + pw + GAP > p.x &&
            y < p.y + p.h + GAP && y + ph + GAP > p.y
          )
        );

        placed.push({ x, y, w: pw, h: ph });
        el.style.left = x + 'px';
        el.style.top  = y + 'px';
        partsArea.appendChild(el);
      });
    }

    scatterParts();
    setTimeout(() => showBubble(GUIDE_TEXT['antenna'], true), 900);

    // ── Helpers ────────────────────────────────────────────────────────────
    function getNextGuide(): string | null {
      for (const id of GUIDE_ORDER) {
        if (!installed.has(id)) return GUIDE_TEXT[id];
      }
      return null;
    }

    let bubbleTimer: ReturnType<typeof setTimeout> | null = null;
    function showBubble(text: string, persistent = false) {
      const b  = document.getElementById('bubble')!;
      const bt = document.getElementById('bubble-text')!;
      if (bubbleTimer) clearTimeout(bubbleTimer);
      b.classList.remove('show');
      requestAnimationFrame(() => {
        bt.innerHTML = text.replace(/\n/g, '<br>');
        b.classList.add('show');
        if (!persistent) {
          bubbleTimer = setTimeout(() => b.classList.remove('show'), 2600);
        }
      });
    }

    function showSnapRing(x: number, y: number, color: string) {
      const ring = document.createElement('div');
      ring.className = 'snap-ring';
      ring.style.cssText = `left:${x-22}px;top:${y-22}px;width:44px;height:44px;border:3px solid ${color};box-shadow:0 0 14px ${color};`;
      document.body.appendChild(ring);
      setTimeout(() => ring.remove(), 600);
    }

    function spawnSparks(x: number, y: number, color: string) {
      for (let i = 0; i < 10; i++) {
        const s = document.createElement('div');
        s.className = 'spark-dot';
        const ang = Math.random() * Math.PI * 2;
        const dist = 30 + Math.random() * 38;
        s.style.cssText = `left:${x}px;top:${y}px;background:${color};--dx:${Math.cos(ang)*dist}px;--dy:${Math.sin(ang)*dist}px;`;
        document.body.appendChild(s);
        setTimeout(() => s.remove(), 800);
      }
    }

    function showFinalReveal() {
      const grid = document.getElementById('kw-grid')!;
      grid.innerHTML = '';
      ALL_KEYWORDS.forEach((kw, i) => {
        const chip = document.createElement('div');
        chip.className = 'kw-chip';
        chip.textContent = kw;
        chip.style.animationDelay = (i * 0.1) + 's';
        grid.appendChild(chip);
      });
      document.getElementById('final-reveal')!.classList.add('open');
    }

    function installPart(part: Part, el: HTMLElement, slotSX: number, slotSY: number) {
      installed.add(part.id);
      el.classList.add('gone');
      document.getElementById(part.instId)!.style.display = 'block';
      document.getElementById(part.slotId)!.style.display = 'none';
      document.getElementById('dot-' + part.id)!.classList.add('on');

      spawnSparks(slotSX, slotSY, part.color);
      showSnapRing(slotSX, slotSY, part.color);

      if (part.isFinal) {
        showBubble("드디어 완성! 어때, 엄청 흥미진진했지?\n그렇다고 해줘.", false);
        setTimeout(showFinalReveal, 2800);
      } else {
        showBubble(part.keyword!, false);
        setTimeout(() => {
          const guide = getNextGuide();
          if (guide) showBubble(guide, true);
        }, 2800);
      }
    }

    // ── Reset ──────────────────────────────────────────────────────────────
    function resetAll() {
      showBubble("오... 또 하려고?\n(굳이.?)", false);
      setTimeout(() => {
        document.getElementById('final-reveal')!.classList.remove('open');
        installed.clear();
        PARTS.forEach(p => {
          document.getElementById(p.instId)!.style.display = 'none';
          document.getElementById(p.slotId)!.style.display = '';
          document.getElementById('dot-' + p.id)!.classList.remove('on');
        });
        partsArea.innerHTML = '';
        scatterParts();
        setTimeout(() => showBubble(GUIDE_TEXT['antenna'], true), 400);
      }, 1800);
    }

    resetFnRef.current = resetAll;

    // ── Drag mouse ─────────────────────────────────────────────────────────
    function startDrag(e: MouseEvent) {
      const partEl = (e.target as HTMLElement).closest('.part') as HTMLElement | null;
      if (!partEl || partEl.classList.contains('gone')) return;
      e.preventDefault();

      const part = PARTS.find(p => 'part-' + p.id === partEl.id);
      if (!part || installed.has(part.id)) return;

      const rect = partEl.getBoundingClientRect();
      dragOffX = e.clientX - rect.left;
      dragOffY = e.clientY - rect.top;
      activePart = { part, el: partEl };
      partEl.classList.add('dragging-origin');

      ghostEl.innerHTML = part.svg;
      ghostEl.style.display = 'block';
      ghostEl.style.width  = part.w + 'px';
      ghostEl.style.height = part.h + 'px';
      ghostEl.style.left   = (e.clientX - dragOffX) + 'px';
      ghostEl.style.top    = (e.clientY - dragOffY) + 'px';
    }

    function moveDrag(e: MouseEvent) {
      if (!activePart) return;
      ghostEl.style.left = (e.clientX - dragOffX) + 'px';
      ghostEl.style.top  = (e.clientY - dragOffY) + 'px';
    }

    function endDrag(e: MouseEvent) {
      if (!activePart) return;
      const { part, el } = activePart;
      ghostEl.style.display = 'none';
      el.classList.remove('dragging-origin');

      const svgEl   = document.getElementById('robot-svg')!;
      const svgRect = svgEl.getBoundingClientRect();
      const slotSX  = svgRect.left + part.cx * (svgRect.width  / 220);
      const slotSY  = svgRect.top  + part.cy * (svgRect.height / 360);
      const dropCX  = e.clientX - dragOffX + part.w / 2;
      const dropCY  = e.clientY - dragOffY + part.h / 2;

      if (Math.hypot(dropCX - slotSX, dropCY - slotSY) < 60 && !installed.has(part.id)) {
        installPart(part, el, slotSX, slotSY);
      }
      activePart = null;
    }

    // ── Drag touch ─────────────────────────────────────────────────────────
    function onTouchStart(e: TouchEvent) {
      const t = e.touches[0];
      startDrag({ target: t.target, clientX: t.clientX, clientY: t.clientY, preventDefault: () => e.preventDefault() } as unknown as MouseEvent);
    }
    function onTouchMove(e: TouchEvent) {
      if (!activePart) return;
      e.preventDefault();
      const t = e.touches[0];
      moveDrag({ clientX: t.clientX, clientY: t.clientY } as MouseEvent);
    }
    function onTouchEnd(e: TouchEvent) {
      if (!activePart) return;
      const t = e.changedTouches[0];
      endDrag({ clientX: t.clientX, clientY: t.clientY } as MouseEvent);
    }

    document.addEventListener('mousedown', startDrag);
    document.addEventListener('mousemove', moveDrag);
    document.addEventListener('mouseup',   endDrag);
    document.addEventListener('touchstart', onTouchStart as EventListener, { passive: false });
    document.addEventListener('touchmove',  onTouchMove  as EventListener, { passive: false });
    document.addEventListener('touchend',   onTouchEnd   as EventListener);

    return () => {
      document.removeEventListener('mousedown', startDrag);
      document.removeEventListener('mousemove', moveDrag);
      document.removeEventListener('mouseup',   endDrag);
      document.removeEventListener('touchstart', onTouchStart as EventListener);
      document.removeEventListener('touchmove',  onTouchMove  as EventListener);
      document.removeEventListener('touchend',   onTouchEnd   as EventListener);
      partsArea.innerHTML  = '';
      progressEl.innerHTML = '';
    };
  }, []);

  return (
    <>
      <button id="reset-btn" onClick={() => resetFnRef.current()}>↺ 처음부터</button>

      <div className="header">
        <h1>🔧 고장난 로봇을 수리해주세요!</h1>
        <p>부품을 로봇의 올바른 위치로 드래그하면 자기소개를 해드려요</p>
        <div className="progress" id="progress"></div>
      </div>

      <div id="scene">
        <div id="robot-wrap">
          <svg id="robot-svg" viewBox="0 0 220 360" xmlns="http://www.w3.org/2000/svg" overflow="visible">
            <defs>
              <radialGradient id="gBody" cx="50%" cy="30%" r="70%">
                <stop offset="0%" stopColor="#cce8fc"/>
                <stop offset="100%" stopColor="#80b8e8"/>
              </radialGradient>
              <radialGradient id="gHead" cx="50%" cy="25%" r="70%">
                <stop offset="0%" stopColor="#dcf0ff"/>
                <stop offset="100%" stopColor="#94c8f4"/>
              </radialGradient>
            </defs>

            {/* Permanent frame */}
            <rect x="90" y="152" width="40" height="18" rx="7" fill="#a4c8e8" stroke="#7aadd4" strokeWidth="1.2"/>
            <rect x="26" y="166" width="168" height="142" rx="26" fill="url(#gBody)" stroke="#7aadd4" strokeWidth="1.5"/>
            <rect x="38" y="178" width="144" height="5" rx="2.5" fill="rgba(255,255,255,0.35)"/>
            <circle cx="42"  cy="184" r="5"   fill="white" opacity="0.55"/><circle cx="42"  cy="184" r="2.5" fill="#7aadd4"/>
            <circle cx="178" cy="184" r="5"   fill="white" opacity="0.55"/><circle cx="178" cy="184" r="2.5" fill="#7aadd4"/>
            <circle cx="42"  cy="294" r="5"   fill="white" opacity="0.55"/><circle cx="42"  cy="294" r="2.5" fill="#7aadd4"/>
            <circle cx="178" cy="294" r="5"   fill="white" opacity="0.55"/><circle cx="178" cy="294" r="2.5" fill="#7aadd4"/>

            <rect x="36" y="30" width="148" height="124" rx="34" fill="url(#gHead)" stroke="#7aadd4" strokeWidth="1.5"/>
            <circle cx="36"  cy="88" r="10" fill="#a4c8e8" stroke="#7aadd4" strokeWidth="1.2"/>
            <circle cx="184" cy="88" r="10" fill="#a4c8e8" stroke="#7aadd4" strokeWidth="1.2"/>
            <circle cx="54"  cy="48" r="5"   fill="white" opacity="0.65"/><circle cx="54"  cy="48" r="2.5" fill="#7aadd4"/>
            <circle cx="166" cy="48" r="5"   fill="white" opacity="0.65"/><circle cx="166" cy="48" r="2.5" fill="#7aadd4"/>

            <ellipse cx="60"  cy="112" rx="16" ry="10" fill="rgba(255,130,110,0.22)"/>
            <ellipse cx="160" cy="112" rx="16" ry="10" fill="rgba(255,130,110,0.22)"/>

            <rect x="80" y="126" width="60" height="16" rx="8" fill="#7aadd4"/>
            <line x1="91"  y1="130" x2="91"  y2="138" stroke="#cce8fc" strokeWidth="2.2" strokeLinecap="round"/>
            <line x1="101" y1="130" x2="101" y2="138" stroke="#cce8fc" strokeWidth="2.2" strokeLinecap="round"/>
            <line x1="110" y1="130" x2="110" y2="138" stroke="#cce8fc" strokeWidth="2.2" strokeLinecap="round"/>
            <line x1="119" y1="130" x2="119" y2="138" stroke="#cce8fc" strokeWidth="2.2" strokeLinecap="round"/>
            <line x1="129" y1="130" x2="129" y2="138" stroke="#cce8fc" strokeWidth="2.2" strokeLinecap="round"/>

            <rect x="47"  y="302" width="54" height="22" rx="10" fill="#a4c8e8" stroke="#7aadd4" strokeWidth="1.2"/>
            <rect x="119" y="302" width="54" height="22" rx="10" fill="#a4c8e8" stroke="#7aadd4" strokeWidth="1.2"/>

            {/* Slot indicators */}
            <g id="slot-antenna">
              <rect x="101" y="9" width="18" height="32" rx="4" fill="rgba(255,210,50,0.14)" stroke="rgba(210,150,0,0.65)" strokeWidth="1.6" strokeDasharray="4 3" className="slot-shape"/>
              <circle cx="110" cy="6" r="6" fill="rgba(255,210,50,0.14)" stroke="rgba(210,150,0,0.65)" strokeWidth="1.6" strokeDasharray="3 2" className="slot-shape"/>
              <g className="wire-spark">
                <line x1="106" y1="3" x2="114" y2="10" stroke="#d49000" strokeWidth="1.8" strokeLinecap="round"/>
                <line x1="104" y1="8" x2="116" y2="6"  stroke="#d49000" strokeWidth="1.2" strokeLinecap="round"/>
              </g>
            </g>
            <g id="slot-left-eye">
              <circle cx="84" cy="90" r="23" fill="rgba(60,190,120,0.1)" stroke="rgba(30,150,90,0.6)" strokeWidth="1.6" strokeDasharray="4 3" className="slot-shape"/>
              <circle cx="84" cy="90" r="10" fill="rgba(255,255,255,0.55)" stroke="rgba(30,150,90,0.3)" strokeWidth="1"/>
              <g className="wire-spark d1"><line x1="78" y1="82" x2="88" y2="90" stroke="#20a060" strokeWidth="1.8" strokeLinecap="round"/></g>
            </g>
            <g id="slot-right-eye">
              <circle cx="136" cy="90" r="23" fill="rgba(60,190,120,0.1)" stroke="rgba(30,150,90,0.6)" strokeWidth="1.6" strokeDasharray="4 3" className="slot-shape"/>
              <circle cx="136" cy="90" r="10" fill="rgba(255,255,255,0.55)" stroke="rgba(30,150,90,0.3)" strokeWidth="1"/>
              <g className="wire-spark d2"><line x1="130" y1="84" x2="142" y2="92" stroke="#20a060" strokeWidth="1.8" strokeLinecap="round"/></g>
            </g>
            <g id="slot-left-arm">
              <rect x="3" y="167" width="28" height="96" rx="11" fill="rgba(255,100,100,0.09)" stroke="rgba(210,60,60,0.55)" strokeWidth="1.6" strokeDasharray="4 3" className="slot-shape"/>
              <g className="wire-spark d3"><line x1="7" y1="173" x2="17" y2="181" stroke="#d84040" strokeWidth="1.8" strokeLinecap="round"/></g>
            </g>
            <g id="slot-right-arm">
              <rect x="189" y="167" width="28" height="96" rx="11" fill="rgba(255,100,100,0.09)" stroke="rgba(210,60,60,0.55)" strokeWidth="1.6" strokeDasharray="4 3" className="slot-shape"/>
              <g className="wire-spark d4"><line x1="195" y1="173" x2="205" y2="181" stroke="#d84040" strokeWidth="1.8" strokeLinecap="round"/></g>
            </g>
            <g id="slot-chest">
              <rect x="70" y="188" width="80" height="72" rx="11" fill="rgba(160,100,255,0.09)" stroke="rgba(130,70,220,0.55)" strokeWidth="1.6" strokeDasharray="4 3" className="slot-shape"/>
              <g className="wire-spark d5">
                <line x1="102" y1="220" x2="112" y2="230" stroke="#8840d8" strokeWidth="1.8" strokeLinecap="round"/>
                <line x1="110" y1="220" x2="102" y2="230" stroke="#8840d8" strokeWidth="1.2" strokeLinecap="round"/>
              </g>
            </g>
            <g id="slot-left-leg">
              <rect x="49" y="321" width="50" height="34" rx="9" fill="rgba(255,175,60,0.11)" stroke="rgba(210,135,20,0.6)" strokeWidth="1.6" strokeDasharray="4 3" className="slot-shape"/>
              <g className="wire-spark d2"><line x1="68" y1="332" x2="78" y2="342" stroke="#d08010" strokeWidth="1.8" strokeLinecap="round"/></g>
            </g>
            <g id="slot-right-leg">
              <rect x="121" y="321" width="50" height="34" rx="9" fill="rgba(255,175,60,0.11)" stroke="rgba(210,135,20,0.6)" strokeWidth="1.6" strokeDasharray="4 3" className="slot-shape"/>
              <g className="wire-spark d4"><line x1="140" y1="332" x2="150" y2="342" stroke="#d08010" strokeWidth="1.8" strokeLinecap="round"/></g>
            </g>
            <g id="slot-power">
              <circle cx="110" cy="278" r="18" fill="rgba(255,210,50,0.12)" stroke="rgba(210,150,0,0.7)" strokeWidth="1.6" strokeDasharray="3 3" className="slot-shape"/>
              <text x="110" y="284" textAnchor="middle" fontSize="15" fill="rgba(190,130,0,0.55)">⚡</text>
            </g>

            {/* Installed overlays */}
            <g id="i-antenna" style={{display:'none'}}>
              <rect x="104" y="11" width="12" height="28" rx="4" fill="#f0c020"/>
              <circle cx="110" cy="7" r="8" fill="#ffe660"/>
              <circle cx="110" cy="7" r="4" fill="#f0c020"/>
              <circle cx="112" cy="5" r="1.8" fill="white" opacity="0.7"/>
            </g>
            <g id="i-left-eye" style={{display:'none'}}>
              <circle cx="84" cy="90" r="22" fill="#38b878"/>
              <circle cx="84" cy="90" r="14" fill="#74e0a8"/>
              <circle cx="84" cy="90" r="7"  fill="#b8f4d0"/>
              <circle cx="88" cy="86" r="3.5" fill="white" opacity="0.9"/>
              <circle cx="80" cy="93" r="2"   fill="white" opacity="0.45"/>
            </g>
            <g id="i-right-eye" style={{display:'none'}}>
              <circle cx="136" cy="90" r="22" fill="#38b878"/>
              <circle cx="136" cy="90" r="14" fill="#74e0a8"/>
              <circle cx="136" cy="90" r="7"  fill="#b8f4d0"/>
              <circle cx="140" cy="86" r="3.5" fill="white" opacity="0.9"/>
              <circle cx="132" cy="93" r="2"   fill="white" opacity="0.45"/>
            </g>
            <g id="i-left-arm" style={{display:'none'}}>
              <rect x="4" y="168" width="26" height="94" rx="13" fill="#88bef0"/>
              <rect x="8" y="176" width="18" height="8"  rx="3"  fill="#b0d8f8"/>
              <circle cx="17" cy="248" r="9" fill="#5898d8"/>
              <rect x="11" y="255" width="12" height="5" rx="2.5" fill="#b0d8f8"/>
            </g>
            <g id="i-right-arm" style={{display:'none'}}>
              <rect x="190" y="168" width="26" height="94" rx="13" fill="#88bef0"/>
              <rect x="194" y="176" width="18" height="8"  rx="3"  fill="#b0d8f8"/>
              <circle cx="203" cy="248" r="9" fill="#5898d8"/>
              <rect x="197" y="255" width="12" height="5" rx="2.5" fill="#b0d8f8"/>
            </g>
            <g id="i-chest" style={{display:'none'}}>
              <rect x="71" y="189" width="78" height="70" rx="12" fill="#c4a8f8"/>
              <rect x="79" y="197" width="62" height="8"  rx="3"  fill="#dcceff" opacity="0.85"/>
              <path d="M110 233 C110 233 89 219 89 207 C89 200 95 197 101 200 C105 202 110 208 110 208 C110 208 115 202 119 200 C125 197 131 200 131 207 C131 219 110 233 110 233Z" fill="#ff90c0"/>
              <rect x="79" y="247" width="62" height="6" rx="3" fill="#dcceff" opacity="0.5"/>
            </g>
            <g id="i-left-leg" style={{display:'none'}}>
              <rect x="50" y="322" width="48" height="32" rx="10" fill="#ecc880"/>
              <rect x="56" y="330" width="36" height="8"  rx="3"  fill="#f8dea0"/>
              <circle cx="62" cy="346" r="4.5" fill="#d8a848"/>
              <circle cx="86" cy="346" r="4.5" fill="#d8a848"/>
            </g>
            <g id="i-right-leg" style={{display:'none'}}>
              <rect x="122" y="322" width="48" height="32" rx="10" fill="#ecc880"/>
              <rect x="128" y="330" width="36" height="8"  rx="3"  fill="#f8dea0"/>
              <circle cx="134" cy="346" r="4.5" fill="#d8a848"/>
              <circle cx="158" cy="346" r="4.5" fill="#d8a848"/>
            </g>
            <g id="i-power" style={{display:'none'}}>
              <circle cx="110" cy="278" r="18" fill="#f8cc20"/>
              <circle cx="110" cy="278" r="12" fill="#fff4a0"/>
              <text x="110" y="284" textAnchor="middle" fontSize="14" fill="#b87800">⚡</text>
            </g>
          </svg>

          <div id="bubble"><span id="bubble-text"></span></div>
        </div>

        <div id="workbench">
          <div className="bench-label">🔩 수리 작업대 — 부품을 로봇에게 드래그하세요</div>
          <div id="parts-area"></div>
        </div>
      </div>

      <div id="drag-ghost" style={{display:'none', position:'fixed', pointerEvents:'none', zIndex:9999}}></div>

      <div id="final-reveal">
        <div className="profile-card">
          <span className="robo-icon">🤖</span>
          <h2>박경서</h2>
          <div className="online-tag">✦ SYSTEM FULLY ONLINE ✦</div>
          <div className="kw-grid" id="kw-grid"></div>
          <button
            className="close-btn"
            onClick={() => document.getElementById('final-reveal')!.classList.remove('open')}
          >
            닫기 ✕
          </button>
        </div>
      </div>
    </>
  );
}
