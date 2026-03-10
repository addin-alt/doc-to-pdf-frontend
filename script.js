/* ═══════════════════════════════════════════════════
   DocFlow — style.css
   Font: Outfit (display) + DM Mono (code/labels)
   Theme: Deep navy dark with electric blue accent
═══════════════════════════════════════════════════ */

/* ── Variables ── */
:root {
  --c-bg:        #080e1a;
  --c-surface:   #0d1626;
  --c-surface2:  #111e33;
  --c-border:    rgba(79, 142, 247, 0.12);
  --c-border-h:  rgba(79, 142, 247, 0.35);
  --c-accent:    #4f8ef7;
  --c-accent2:   #7b6cf6;
  --c-teal:      #2dd4bf;
  --c-text:      #dde6f5;
  --c-muted:     #5a7099;
  --c-dim:       #8ea8cc;
  --c-success:   #34d399;
  --c-error:     #f87171;
  --c-warn:      #fbbf24;
  --r:           14px;
  --r-sm:        10px;
  --shadow-card: 0 20px 50px rgba(0,0,0,.55), 0 0 0 1px rgba(79,142,247,.07);
  --shadow-glow: 0 0 60px rgba(79,142,247,.15);
  --font:        'Outfit', sans-serif;
  --mono:        'DM Mono', monospace;
  --ease:        cubic-bezier(.25,.8,.25,1);
}

/* ── Reset ── */
*, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }
html { scroll-behavior:smooth; -webkit-tap-highlight-color:transparent; }
body {
  font-family: var(--font);
  font-size: 16px;
  line-height: 1.65;
  background: var(--c-bg);
  color: var(--c-text);
  min-height: 100vh;
  overflow-x: hidden;
}
a { color: inherit; text-decoration: none; }
button { font-family: var(--font); cursor: pointer; border: none; background: none; }
ul, ol { list-style: none; }
strong { font-weight: 600; }
img { display: block; }

/* ── Background ── */
.noise {
  position: fixed; inset: 0; pointer-events: none; z-index: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
  background-size: 200px;
  opacity: 0.4;
}
.bg-glow {
  position: fixed; border-radius: 50%; filter: blur(100px);
  pointer-events: none; z-index: 0; animation: float 22s ease-in-out infinite;
}
.bg-glow--a {
  width: 640px; height: 640px; top: -180px; right: -200px;
  background: radial-gradient(circle, rgba(79,142,247,.14) 0%, transparent 70%);
}
.bg-glow--b {
  width: 500px; height: 500px; bottom: -120px; left: -150px; animation-delay: -11s;
  background: radial-gradient(circle, rgba(123,108,246,.12) 0%, transparent 70%);
}
@keyframes float {
  0%,100% { transform: translate(0,0) scale(1); }
  40%     { transform: translate(40px,-50px) scale(1.06); }
  70%     { transform: translate(-30px,35px) scale(0.94); }
}

/* ── Custom Tooltip ── */
/* Any element with data-tip gets a styled tooltip on hover */
[data-tip] { position: relative; }
[data-tip]::after {
  content: attr(data-tip);
  position: absolute;
  bottom: calc(100% + 9px);
  left: 50%;
  transform: translateX(-50%) translateY(4px);
  white-space: nowrap;
  background: #1a2640;
  color: var(--c-dim);
  font-family: var(--mono);
  font-size: 11px;
  font-weight: 400;
  padding: 5px 10px;
  border-radius: 6px;
  border: 1px solid var(--c-border-h);
  pointer-events: none;
  opacity: 0;
  transition: opacity .18s var(--ease), transform .18s var(--ease);
  z-index: 999;
  box-shadow: 0 4px 16px rgba(0,0,0,.4);
}
[data-tip]::before {
  content: '';
  position: absolute;
  bottom: calc(100% + 3px);
  left: 50%; transform: translateX(-50%) translateY(4px);
  border: 5px solid transparent;
  border-top-color: #2d3f66;
  pointer-events: none;
  opacity: 0;
  transition: opacity .18s var(--ease), transform .18s var(--ease);
  z-index: 999;
}
[data-tip]:hover::after,
[data-tip]:focus-visible::after { opacity: 1; transform: translateX(-50%) translateY(0); }
[data-tip]:hover::before,
[data-tip]:focus-visible::before { opacity: 1; transform: translateX(-50%) translateY(0); }

/* ── Header ── */
.header {
  position: sticky; top: 0; z-index: 100;
  backdrop-filter: blur(14px);
  border-bottom: 1px solid var(--c-border);
  background: rgba(8,14,26,.7);
}
.header-inner {
  max-width: 720px; margin: 0 auto; padding: 0 24px;
  height: 60px; display: flex; align-items: center; justify-content: space-between;
}
.logo {
  display: flex; align-items: center; gap: 8px;
  font-size: 19px; font-weight: 700; letter-spacing: -.4px; color: var(--c-text);
  transition: opacity .2s;
}
.logo:hover { opacity: .8; }
.logo-icon { font-size: 18px; }
.btn-ghost {
  display: inline-flex; align-items: center; gap: 7px;
  padding: 7px 16px; border-radius: 99px;
  border: 1px solid var(--c-border);
  background: rgba(255,255,255,.03);
  font-size: 13px; font-weight: 500; color: var(--c-dim);
  transition: all .22s var(--ease);
}
.btn-ghost:hover {
  border-color: var(--c-border-h); color: var(--c-text);
  background: rgba(79,142,247,.07);
}

/* ── Main ── */
.main {
  position: relative; z-index: 1;
  max-width: 720px; margin: 0 auto; padding: 0 24px 80px;
}

/* ── Hero ── */
.hero {
  text-align: center;
  padding: 64px 0 44px;
  animation: fadeUp .7s var(--ease) both;
}
.pill {
  display: inline-block;
  font-family: var(--mono); font-size: 11px; letter-spacing: .1em;
  text-transform: uppercase; color: var(--c-accent);
  background: rgba(79,142,247,.09);
  border: 1px solid rgba(79,142,247,.22);
  padding: 5px 16px; border-radius: 99px; margin-bottom: 28px;
}
.hero-h1 {
  font-size: clamp(48px, 9vw, 80px);
  font-weight: 800;
  letter-spacing: -3px;
  line-height: 1.0;
  margin-bottom: 22px;
  color: var(--c-text);
}
.hero-h1 em {
  font-style: normal;
  background: linear-gradient(130deg, var(--c-accent) 0%, var(--c-accent2) 50%, var(--c-teal) 100%);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
}
.hero-p {
  font-size: 17px; font-weight: 300; color: var(--c-muted);
  max-width: 420px; margin: 0 auto; line-height: 1.7;
}

/* ── Converter ── */
.converter {
  animation: fadeUp .7s var(--ease) .12s both;
  background: var(--c-surface);
  border: 1px solid var(--c-border);
  border-radius: var(--r);
  padding: 28px;
  box-shadow: var(--shadow-card);
}

/* Drop zone */
.dropzone {
  border: 2px dashed var(--c-border);
  border-radius: var(--r-sm);
  padding: 44px 20px;
  text-align: center;
  cursor: pointer;
  transition: border-color .25s, background .25s, box-shadow .25s;
  background: rgba(79,142,247,.02);
  outline: none;
}
.dropzone:hover, .dropzone:focus-visible, .dropzone.drag-over {
  border-color: var(--c-accent);
  background: rgba(79,142,247,.05);
  box-shadow: 0 0 0 4px rgba(79,142,247,.08);
}

/* Empty state */
.dz-icon { display: flex; justify-content: center; margin-bottom: 16px; }
.dz-label {
  font-size: 15px; font-weight: 500; color: var(--c-text); margin-bottom: 6px;
}
.dz-label strong { color: var(--c-accent); }
.dz-or {
  display: block; font-size: 12px; color: var(--c-muted);
  font-family: var(--mono); margin: 8px 0 14px;
}
.btn-browse {
  display: inline-flex; align-items: center;
  padding: 9px 22px; border-radius: 99px;
  border: 1px solid rgba(79,142,247,.3);
  background: rgba(79,142,247,.1);
  color: var(--c-accent); font-size: 14px; font-weight: 600;
  transition: all .22s var(--ease); margin-bottom: 14px;
}
.btn-browse:hover {
  background: rgba(79,142,247,.2);
  border-color: var(--c-accent);
  transform: translateY(-1px);
  box-shadow: 0 4px 16px rgba(79,142,247,.2);
}
.dz-hint {
  font-family: var(--mono); font-size: 11.5px; color: var(--c-muted); letter-spacing: .02em;
}

/* File selected */
.dz-file {
  display: flex; align-items: center; gap: 14px;
  padding: 4px 0;
}
.dz-file-ico { font-size: 34px; flex-shrink: 0; }
.dz-file-meta { flex: 1; text-align: left; min-width: 0; }
.dz-filename {
  display: block; font-size: 15px; font-weight: 600;
  color: var(--c-text); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  margin-bottom: 3px;
}
.dz-filesize {
  font-family: var(--mono); font-size: 12px; color: var(--c-muted);
}
.btn-remove {
  flex-shrink: 0; width: 30px; height: 30px; border-radius: 50%;
  background: rgba(248,113,113,.1); border: 1px solid rgba(248,113,113,.2);
  color: var(--c-error); display: flex; align-items: center; justify-content: center;
  transition: all .2s; flex-direction: column;
}
.btn-remove:hover {
  background: rgba(248,113,113,.22); transform: scale(1.1);
}

/* Progress */
.progress-row {
  display: flex; align-items: center; gap: 12px; margin-top: 16px;
}
.progress-track {
  flex: 1; height: 5px; border-radius: 99px;
  background: var(--c-surface2); overflow: hidden;
}
.progress-fill {
  height: 100%; width: 0%; border-radius: 99px;
  background: linear-gradient(90deg, var(--c-accent), var(--c-teal));
  transition: width .4s var(--ease);
  animation: shimmer 2s ease-in-out infinite;
  background-size: 200% 100%;
}
@keyframes shimmer {
  0%   { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
.progress-pct {
  font-family: var(--mono); font-size: 12px; color: var(--c-muted);
  min-width: 36px; text-align: right;
}

/* Status */
.status-msg {
  margin-top: 14px; padding: 11px 16px;
  border-radius: var(--r-sm); font-size: 14px; font-weight: 500; text-align: center;
}
.status-msg.success { background: rgba(52,211,153,.1); border: 1px solid rgba(52,211,153,.25); color: var(--c-success); }
.status-msg.error   { background: rgba(248,113,113,.1); border: 1px solid rgba(248,113,113,.25); color: var(--c-error); }
.status-msg.info    { background: rgba(79,142,247,.1);  border: 1px solid rgba(79,142,247,.25);  color: var(--c-accent); }

/* Convert button */
.btn-convert {
  width: 100%; margin-top: 20px;
  padding: 15px 24px; border-radius: var(--r-sm);
  display: flex; align-items: center; justify-content: center; gap: 10px;
  font-size: 16px; font-weight: 700; letter-spacing: .01em; color: #fff;
  background: linear-gradient(135deg, var(--c-accent) 0%, var(--c-accent2) 100%);
  box-shadow: 0 4px 24px rgba(79,142,247,.3);
  transition: transform .22s var(--ease), box-shadow .22s var(--ease), opacity .22s;
  position: relative; overflow: hidden;
}
.btn-convert::before {
  content: ''; position: absolute; inset: 0;
  background: linear-gradient(135deg, var(--c-accent2) 0%, var(--c-teal) 100%);
  opacity: 0; transition: opacity .3s;
}
.btn-convert:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 8px 32px rgba(79,142,247,.45); }
.btn-convert:hover:not(:disabled)::before { opacity: 1; }
.btn-convert:active:not(:disabled) { transform: translateY(0); }
.btn-convert:disabled { opacity: .38; cursor: not-allowed; }
.btn-convert > * { position: relative; z-index: 1; }
#btnArrow { transition: transform .25s var(--ease); }
.btn-convert:hover:not(:disabled) #btnArrow { transform: translateX(4px); }
.spin { animation: spin .75s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }

/* ── Features ── */
.features {
  display: grid; grid-template-columns: repeat(3,1fr); gap: 14px;
  margin-top: 24px;
  animation: fadeUp .7s var(--ease) .24s both;
}
.feat {
  display: flex; flex-direction: column; align-items: flex-start; gap: 5px;
  padding: 22px 18px;
  background: var(--c-surface); border: 1px solid var(--c-border); border-radius: var(--r-sm);
  transition: border-color .25s, transform .25s var(--ease), box-shadow .25s;
  cursor: default;
}
.feat:hover {
  border-color: var(--c-border-h); transform: translateY(-3px);
  box-shadow: 0 12px 28px rgba(0,0,0,.35);
}
.feat-ico { font-size: 22px; margin-bottom: 2px; }
.feat strong { font-size: 14px; font-weight: 700; color: var(--c-text); }
.feat span   { font-size: 12.5px; color: var(--c-muted); line-height: 1.4; }

/* ── Team ── */
.team-wrap {
  margin-top: 24px;
  animation: fadeUp .7s var(--ease) .32s both;
}
.team-label {
  font-family: var(--mono); font-size: 11px; font-weight: 500; letter-spacing: .1em;
  text-transform: uppercase; color: var(--c-muted); margin-bottom: 12px;
}
.team-grid {
  display: grid; grid-template-columns: 1fr 1fr; gap: 14px;
}

/* Dev card */
.dev-card {
  display: flex; gap: 16px; align-items: flex-start;
  padding: 22px 20px;
  background: var(--c-surface); border: 1px solid var(--c-border); border-radius: var(--r);
  transition: border-color .25s, box-shadow .25s;
}
.dev-card:hover { border-color: var(--c-border-h); box-shadow: 0 8px 28px rgba(0,0,0,.3); }

/* Avatar */
.dev-av { flex-shrink: 0; }
.dev-av img, .dev-av-init {
  width: 52px; height: 52px; border-radius: 50%;
  border: 2px solid var(--c-border);
}
.dev-av-init {
  background: linear-gradient(135deg, var(--c-accent), var(--c-accent2));
  display: none; align-items: center; justify-content: center;
  font-size: 20px; font-weight: 800; color: #fff;
}
.dev-av-init--s {
  background: linear-gradient(135deg, var(--c-teal), var(--c-accent2));
}

/* Dev info */
.dev-body { flex: 1; min-width: 0; }
.dev-name {
  font-size: 16px; font-weight: 700; color: var(--c-text);
  letter-spacing: -.3px; margin-bottom: 3px;
}
.dev-role { font-size: 12px; color: var(--c-muted); margin-bottom: 14px; line-height: 1.4; }
.dev-socials { display: flex; flex-wrap: wrap; gap: 7px; }

/* Social buttons */
.social-btn {
  display: inline-flex; align-items: center; gap: 5px;
  padding: 5px 12px; border-radius: 99px;
  font-size: 12.5px; font-weight: 600;
  border: 1px solid; transition: all .22s var(--ease);
}
.social-btn:hover { transform: translateY(-2px); filter: brightness(1.15); }
.social--gh {
  color: #c9d5e8; border-color: rgba(201,213,232,.18);
  background: rgba(201,213,232,.06);
}
.social--fb {
  color: #74a8fb; border-color: rgba(116,168,251,.2);
  background: rgba(116,168,251,.07);
}

/* ── Footer ── */
.footer {
  position: relative; z-index: 1;
  text-align: center; padding: 28px 24px 40px;
  border-top: 1px solid var(--c-border);
  font-size: 13px; color: var(--c-muted); line-height: 1.8;
}
.footer a { color: var(--c-accent); transition: color .2s; }
.footer a:hover { color: var(--c-teal); }

/* ── Animations ── */
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* ── Responsive ── */
@media (max-width: 600px) {
  .main { padding: 0 16px 60px; }
  .header-inner { padding: 0 16px; }

  .hero { padding: 44px 0 32px; }
  .hero-h1 { letter-spacing: -2px; }
  .hero-p { font-size: 15px; }
  .br-desk { display: none; }

  .converter { padding: 20px 16px; }
  .dropzone { padding: 34px 14px; }

  .features { grid-template-columns: 1fr; gap: 10px; }
  .feat { flex-direction: row; align-items: center; gap: 12px; padding: 16px 14px; }
  .feat-ico { margin-bottom: 0; font-size: 20px; flex-shrink: 0; }

  .team-grid { grid-template-columns: 1fr; gap: 10px; }
  .dev-card { padding: 18px 16px; }

  /* Tooltips: show below on mobile to avoid off-screen */
  [data-tip]::after { bottom: auto; top: calc(100% + 8px); transform: translateX(-50%) translateY(-4px); }
  [data-tip]::before { bottom: auto; top: calc(100% + 2px); transform: translateX(-50%) rotate(180deg) translateY(4px); }
  [data-tip]:hover::after  { transform: translateX(-50%) translateY(0); }
  [data-tip]:hover::before { transform: translateX(-50%) rotate(180deg) translateY(0); }
}

@media (max-width: 360px) {
  .hero-h1 { font-size: 40px; }
}

/* ── Focus ring ── */
:focus-visible {
  outline: 2px solid var(--c-accent);
  outline-offset: 3px;
  border-radius: 4px;
}