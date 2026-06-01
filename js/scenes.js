/* ============================================================
   scenes.js — cinematic cycling background
   Three custom-rendered scenes crossfade on a single canvas:
     0 · Datacenters & AI       (server light-columns + neural mesh)
     1 · High-Technology         (circuit traces + signal pulses)
     2 · Sustainability          (rising green energy field)
   Lightweight (<1 file, no assets) — ships clean to GitHub Pages.
   Real footage can replace this later via a <video> swap.
   ============================================================ */
(function () {
  const canvas = document.getElementById("scene");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let W = 0, H = 0, DPR = Math.min(window.devicePixelRatio || 1, 2);
  const ACCENT = [52, 224, 161];

  function resize() {
    W = canvas.clientWidth; H = canvas.clientHeight;
    canvas.width = W * DPR; canvas.height = H * DPR;
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    scenes.forEach(s => s.layout && s.layout(W, H));
  }

  const rnd = (a, b) => a + Math.random() * (b - a);
  const acc = (a) => `rgba(${ACCENT[0]},${ACCENT[1]},${ACCENT[2]},${a})`;

  /* ---------------- Scene 0 — Datacenters & AI ---------------- */
  const datacenter = {
    cols: [], nodes: [], links: [],
    layout(w, h) {
      this.cols = [];
      const n = Math.max(14, Math.floor(w / 70));
      for (let i = 0; i < n; i++) {
        this.cols.push({
          x: (i + 0.5) * (w / n),
          phase: Math.random() * Math.PI * 2,
          speed: rnd(0.4, 1.1),
          pkts: Array.from({ length: 3 }, () => ({ y: Math.random(), v: rnd(0.06, 0.18) }))
        });
      }
      this.nodes = Array.from({ length: 26 }, () => ({
        x: Math.random() * w, y: rnd(0.1, 0.85) * h, r: rnd(1.2, 2.8), p: Math.random() * Math.PI * 2
      }));
    },
    update(dt) {
      for (const c of this.cols) for (const p of c.pkts) { p.y += p.v * dt; if (p.y > 1.1) { p.y = -0.1; p.v = rnd(0.06, 0.18); } }
      for (const n of this.nodes) n.p += dt * 1.5;
    },
    draw(a) {
      ctx.save(); ctx.globalAlpha = a;
      // base wash
      const g = ctx.createLinearGradient(0, 0, 0, H);
      g.addColorStop(0, "#04100b"); g.addColorStop(1, "#02060500");
      ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
      // vertical rack light-columns
      for (const c of this.cols) {
        const flick = 0.5 + 0.5 * Math.sin(c.phase + performance.now() * 0.001 * c.speed);
        ctx.strokeStyle = acc(0.05 + 0.05 * flick); ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(c.x, 0); ctx.lineTo(c.x, H); ctx.stroke();
        for (const p of c.pkts) {
          const y = p.y * H;
          const grd = ctx.createLinearGradient(c.x, y - 40, c.x, y + 8);
          grd.addColorStop(0, acc(0)); grd.addColorStop(1, acc(0.55));
          ctx.strokeStyle = grd; ctx.lineWidth = 1.6;
          ctx.beginPath(); ctx.moveTo(c.x, y - 40); ctx.lineTo(c.x, y); ctx.stroke();
          ctx.fillStyle = acc(0.9); ctx.beginPath(); ctx.arc(c.x, y, 1.6, 0, 7); ctx.fill();
        }
      }
      // neural mesh
      for (let i = 0; i < this.nodes.length; i++) {
        for (let j = i + 1; j < this.nodes.length; j++) {
          const A = this.nodes[i], B = this.nodes[j];
          const d = Math.hypot(A.x - B.x, A.y - B.y);
          if (d < 150) { ctx.strokeStyle = acc(0.06 * (1 - d / 150)); ctx.lineWidth = 0.7; ctx.beginPath(); ctx.moveTo(A.x, A.y); ctx.lineTo(B.x, B.y); ctx.stroke(); }
        }
      }
      for (const n of this.nodes) {
        const pulse = 0.5 + 0.5 * Math.sin(n.p);
        ctx.fillStyle = acc(0.3 + 0.4 * pulse); ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, 7); ctx.fill();
      }
      ctx.restore();
    }
  };

  /* ---------------- Scene 1 — High-Technology ---------------- */
  const circuit = {
    traces: [], pulses: [],
    layout(w, h) {
      this.traces = []; this.pulses = [];
      const count = Math.floor((w * h) / 26000);
      for (let i = 0; i < count; i++) {
        const pts = [], steps = Math.floor(rnd(3, 6));
        let x = Math.random() * w, y = Math.random() * h;
        pts.push({ x, y });
        for (let s = 0; s < steps; s++) {
          if (Math.random() > 0.5) x += rnd(-1, 1) > 0 ? rnd(40, 120) : -rnd(40, 120);
          else y += rnd(-1, 1) > 0 ? rnd(40, 120) : -rnd(40, 120);
          pts.push({ x, y });
        }
        this.traces.push(pts);
      }
      for (let i = 0; i < 30; i++) this.pulses.push({ t: Math.floor(Math.random() * this.traces.length), seg: 0, prog: Math.random(), v: rnd(0.25, 0.7) });
    },
    update(dt) {
      for (const p of this.pulses) {
        p.prog += p.v * dt;
        if (p.prog >= 1) { p.prog = 0; p.seg++; const tr = this.traces[p.t]; if (!tr || p.seg >= tr.length - 1) { p.t = Math.floor(Math.random() * this.traces.length); p.seg = 0; } }
      }
    },
    draw(a) {
      ctx.save(); ctx.globalAlpha = a;
      ctx.fillStyle = "#03100c"; ctx.fillRect(0, 0, W, H);
      ctx.lineWidth = 1; ctx.strokeStyle = acc(0.1);
      for (const tr of this.traces) {
        ctx.beginPath(); ctx.moveTo(tr[0].x, tr[0].y);
        for (let i = 1; i < tr.length; i++) ctx.lineTo(tr[i].x, tr[i].y);
        ctx.stroke();
        for (const pt of tr) { ctx.fillStyle = acc(0.16); ctx.fillRect(pt.x - 1.5, pt.y - 1.5, 3, 3); }
      }
      for (const p of this.pulses) {
        const tr = this.traces[p.t]; if (!tr || p.seg >= tr.length - 1) continue;
        const A = tr[p.seg], B = tr[p.seg + 1];
        const x = A.x + (B.x - A.x) * p.prog, y = A.y + (B.y - A.y) * p.prog;
        ctx.fillStyle = acc(0.9); ctx.shadowColor = acc(0.8); ctx.shadowBlur = 10;
        ctx.beginPath(); ctx.arc(x, y, 2, 0, 7); ctx.fill(); ctx.shadowBlur = 0;
      }
      ctx.restore();
    }
  };

  /* ---------------- Scene 2 — Sustainability ---------------- */
  const sustain = {
    parts: [], wind: 0,
    layout(w, h) {
      this.parts = Array.from({ length: Math.floor((w * h) / 9000) }, () => this.spawn(w, h, true));
    },
    spawn(w, h, init) {
      return { x: Math.random() * w, y: init ? Math.random() * h : h + 10, r: rnd(1, 3.4), v: rnd(8, 32), sway: rnd(0.4, 1.4), ph: Math.random() * 7, a: rnd(0.2, 0.7) };
    },
    update(dt) {
      this.wind += dt * 0.4;
      for (const p of this.parts) { p.y -= p.v * dt; p.ph += dt * p.sway; if (p.y < -10) Object.assign(p, this.spawn(W, H, false)); }
    },
    draw(a) {
      ctx.save(); ctx.globalAlpha = a;
      const g = ctx.createLinearGradient(0, H, 0, 0);
      g.addColorStop(0, "#06160f"); g.addColorStop(0.6, "#04120c"); g.addColorStop(1, "#020806");
      ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
      // soft flowing energy bands
      for (let i = 0; i < 3; i++) {
        const yb = H * (0.3 + i * 0.22);
        ctx.beginPath();
        for (let x = 0; x <= W; x += 20) {
          const y = yb + Math.sin(x * 0.004 + this.wind + i) * 40;
          x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.strokeStyle = acc(0.05); ctx.lineWidth = 1.4; ctx.stroke();
      }
      for (const p of this.parts) {
        const dx = Math.sin(p.ph) * 14;
        ctx.fillStyle = acc(p.a); ctx.beginPath(); ctx.arc(p.x + dx, p.y, p.r, 0, 7); ctx.fill();
      }
      ctx.restore();
    }
  };

  const scenes = [datacenter, circuit, sustain];
  const LABELS = ["Datacenters & AI", "High-Technology Innovation", "Sustainability"];

  // ---- timing / crossfade ----
  let cur = 0, next = -1, fade = 0;
  const HOLD = 7.2, FADE = 1.5;
  let timer = 0, last = performance.now();

  const labelEl = document.getElementById("themeLabel");
  const dotsWrap = document.getElementById("themeDots");
  if (dotsWrap) LABELS.forEach((_, i) => { const d = document.createElement("i"); if (i === 0) d.className = "on"; dotsWrap.appendChild(d); });

  function setLabel(i) {
    if (labelEl) { labelEl.innerHTML = `<span>${LABELS[i]}</span>`; }
    if (dotsWrap) [...dotsWrap.children].forEach((d, k) => d.classList.toggle("on", k === i));
    document.documentElement.setAttribute("data-theme-idx", i);
  }

  function frame(now) {
    const dt = Math.min(0.05, (now - last) / 1000); last = now;
    timer += dt;
    if (next === -1 && timer >= HOLD) { next = (cur + 1) % scenes.length; fade = 0; setLabel(next); }
    if (next !== -1) {
      fade += dt / FADE;
      if (fade >= 1) { cur = next; next = -1; timer = 0; }
    }
    ctx.clearRect(0, 0, W, H);
    if (next === -1) { scenes[cur].update(dt); scenes[cur].draw(1); }
    else {
      scenes[cur].update(dt); scenes[next].update(dt);
      scenes[cur].draw(1 - fade); scenes[next].draw(fade);
    }
    requestAnimationFrame(frame);
  }

  window.addEventListener("resize", resize);
  resize(); setLabel(0);
  if (reduce) { // static frame, no rAF churn — still cycles labels slowly
    scenes[0].update(0); scenes[0].draw(1);
    let i = 0; setInterval(() => { i = (i + 1) % scenes.length; ctx.clearRect(0,0,W,H); scenes[i].update(0.2); scenes[i].draw(1); setLabel(i); }, 5000);
  } else {
    requestAnimationFrame(frame);
  }
})();
