// Tab switching
const tabBtns = document.querySelectorAll('.tab-btn');
const panels  = document.querySelectorAll('.slogan__panel');

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.dataset.tab;
    tabBtns.forEach(b => b.classList.remove('tab-btn--active'));
    panels.forEach(p  => p.classList.remove('active'));
    btn.classList.add('tab-btn--active');
    document.querySelector(`[data-panel="${target}"]`)?.classList.add('active');
  });
});

// Feature cards — accordion (one open at a time; click active to close all)
document.querySelectorAll('.feature-card').forEach((card) => {
  const btn = card.querySelector('.feature-card__toggle');
  const panel = card.querySelector('.feature-card__panel');
  if (!btn || !panel) return;
  btn.addEventListener('click', () => {
    const wasActive = card.classList.contains('feature-card--active');
    document.querySelectorAll('.feature-card').forEach((c) => {
      c.classList.remove('feature-card--active');
      const b = c.querySelector('.feature-card__toggle');
      const p = c.querySelector('.feature-card__panel');
      b?.setAttribute('aria-expanded', 'false');
      p?.classList.remove('feature-card__panel--open');
      p?.setAttribute('aria-hidden', 'true');
    });
    if (!wasActive) {
      card.classList.add('feature-card--active');
      btn.setAttribute('aria-expanded', 'true');
      panel.classList.add('feature-card__panel--open');
      panel.setAttribute('aria-hidden', 'false');
    }
  });
});

// Scroll reveal
const revealEls = document.querySelectorAll(
  '.feature-card, .hiw__step, .use-card, .tweet-card, .stat-card, .logo-pill'
);
revealEls.forEach((el, i) => {
  el.classList.add('reveal');
  el.style.transitionDelay = `${(i % 6) * 55}ms`;
});
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -32px 0px' });
revealEls.forEach(el => observer.observe(el));

// Navbar scroll class
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// Mobile hamburger
const hamburger = document.getElementById('hamburger');
hamburger?.addEventListener('click', () => {
  const links   = document.querySelector('.navbar__links');
  const actions = document.querySelector('.navbar__actions');
  const isOpen  = links.style.display === 'flex';
  if (isOpen) {
    links.style.display = '';
    actions.style.display = '';
  } else {
    links.style.cssText   = 'display:flex;flex-direction:column;position:absolute;top:64px;left:0;right:0;background:rgba(255,255,255,.98);backdrop-filter:blur(20px);padding:16px 24px;border-bottom:1px solid rgba(0,0,0,.06);gap:0;z-index:99;';
    actions.style.cssText = 'display:flex;flex-direction:column;position:absolute;left:0;right:0;background:rgba(255,255,255,.98);backdrop-filter:blur(20px);padding:0 24px 16px;z-index:99;gap:8px;';
    actions.style.top = (64 + links.offsetHeight) + 'px';
  }
});

// Stats count-up animation
function animateNumber(el, target, duration = 1800) {
  const start  = performance.now();
  const update = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased    = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target).toLocaleString() + (el.dataset.suffix || '');
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = el.dataset.final;
  };
  requestAnimationFrame(update);
}

const statNums    = document.querySelectorAll('.stat-card__num');
const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el  = entry.target;
      el.dataset.final = el.textContent;
      const raw = el.textContent.replace(/[^0-9]/g, '');
      if (raw) animateNumber(el, parseInt(raw, 10));
      statObserver.unobserve(el);
    }
  });
}, { threshold: 0.3 });
statNums.forEach(el => statObserver.observe(el));

// ── 8 mini-cubes：单层 90° 扭动，逆序还原，严格闭环（与 React 版一致）──
(function () {
  var scene = document.querySelector('.rubik-scene');
  if (!scene) return;

  var OFFSET = 23;
  var SCRAMBLE_SEGMENTS_MS = [
    { windowMs: 1000, moves: 2 },
    { windowMs: 1000, moves: 2 },
    { windowMs: 1000, moves: 4 },
  ];
  var UNDO_SEGMENTS_MS = [
    { windowMs: 1000, moves: 4 },
    { windowMs: 1000, moves: 2 },
    { windowMs: 1000, moves: 2 },
  ];
  var PAUSE_BETWEEN_BURST_MS = 500;
  var PAUSE_BEFORE_RESTART_MS = 320;
  var HALF_PI = Math.PI / 2;

  function slotTiming(windowMs, moves) {
    var slot = windowMs / moves;
    var turnMs = Math.max(168, Math.min(520, Math.floor(slot * 0.82)));
    var pauseBefore = Math.max(16, Math.floor(slot - turnMs));
    return { pauseBefore: pauseBefore, turnMs: turnMs };
  }

  // pos 存整数格坐标 -1/1（不存像素），消除浮点漂移
  var INITIAL_POS = [
    [-1,-1, 1], [ 1,-1, 1], [-1, 1, 1], [ 1, 1, 1],
    [-1,-1,-1], [ 1,-1,-1], [-1, 1,-1], [ 1, 1,-1],
  ];

  function initialStates() {
    return INITIAL_POS.map(function(p) {
      return { pos: p.slice(), quat: [1,0,0,0] };
    });
  }

  // ─── 四元数 ───────────────────────────────────────────────────────────────
  function qNorm(q) {
    var L = Math.hypot(q[0],q[1],q[2],q[3]) || 1;
    return [q[0]/L, q[1]/L, q[2]/L, q[3]/L];
  }
  function qMul(a, b) {
    return qNorm([
      a[0]*b[0]-a[1]*b[1]-a[2]*b[2]-a[3]*b[3],
      a[0]*b[1]+a[1]*b[0]+a[2]*b[3]-a[3]*b[2],
      a[0]*b[2]-a[1]*b[3]+a[2]*b[0]+a[3]*b[1],
      a[0]*b[3]+a[1]*b[2]-a[2]*b[1]+a[3]*b[0],
    ]);
  }
  function qFromAxis(ax, rad) {
    var L = Math.hypot(ax[0],ax[1],ax[2]) || 1;
    var s = Math.sin(rad/2);
    return qNorm([Math.cos(rad/2), ax[0]/L*s, ax[1]/L*s, ax[2]/L*s]);
  }
  function qSlerp(a, b, t) {
    var dot = a[0]*b[0]+a[1]*b[1]+a[2]*b[2]+a[3]*b[3];
    var bq = b.slice();
    if (dot < 0) { dot = -dot; bq = [-b[0],-b[1],-b[2],-b[3]]; }
    if (dot > 0.9995) return qNorm([
      a[0]+t*(bq[0]-a[0]), a[1]+t*(bq[1]-a[1]),
      a[2]+t*(bq[2]-a[2]), a[3]+t*(bq[3]-a[3]),
    ]);
    var th0=Math.acos(dot), th=th0*t, sinTh=Math.sin(th), sinTh0=Math.sin(th0);
    var s0=Math.cos(th)-dot*sinTh/sinTh0, s1=sinTh/sinTh0;
    return qNorm([s0*a[0]+s1*bq[0], s0*a[1]+s1*bq[1], s0*a[2]+s1*bq[2], s0*a[3]+s1*bq[3]]);
  }

  // Rodrigues（对整数格坐标做旋转，用于插值）
  function rotVec(ax, rad, v) {
    var L = Math.hypot(ax[0],ax[1],ax[2]) || 1;
    var kx=ax[0]/L, ky=ax[1]/L, kz=ax[2]/L;
    var c=Math.cos(rad), s=Math.sin(rad), dot=kx*v[0]+ky*v[1]+kz*v[2], oc=1-c;
    return [
      v[0]*c+(ky*v[2]-kz*v[1])*s+kx*dot*oc,
      v[1]*c+(kz*v[0]-kx*v[2])*s+ky*dot*oc,
      v[2]*c+(kx*v[1]-ky*v[0])*s+kz*dot*oc,
    ];
  }

  // ─── 面定义 ───────────────────────────────────────────────────────────────
  var FACE_AXIS = { U:[0,1,0], D:[0,1,0], F:[0,0,1], B:[0,0,1], R:[1,0,0], L:[1,0,0] };
  var FACE_DIR  = { U:1, D:-1, F:1, B:-1, R:1, L:-1 };

  function turnAngle(face, prime) {
    return FACE_DIR[face] * (prime ? -1 : 1) * HALF_PI;
  }

  // inLayer 直接用整数格坐标，绝对准确
  function inLayer(face, pos) {
    if (face==='U') return pos[1] ===  1;
    if (face==='D') return pos[1] === -1;
    if (face==='R') return pos[0] ===  1;
    if (face==='L') return pos[0] === -1;
    if (face==='F') return pos[2] ===  1;
                    return pos[2] === -1;
  }

  function snapPos(v) {
    return [Math.round(v[0]), Math.round(v[1]), Math.round(v[2])];
  }

  // ─── CSS matrix3d（平移 = pos * OFFSET）──────────────────────────────────
  function mat4css(q, pos) {
    var w=q[0],x=q[1],y=q[2],z=q[3];
    var x2=x+x,y2=y+y,z2=z+z;
    var xx=x*x2,xy=x*y2,xz=x*z2,yy=y*y2,yz=y*z2,zz=z*z2,wx=w*x2,wy=w*y2,wz=w*z2;
    var m = [
      1-(yy+zz), xy+wz,     xz-wy,     0,
      xy-wz,     1-(xx+zz), yz+wx,     0,
      xz+wy,     yz-wx,     1-(xx+yy), 0,
      pos[0]*OFFSET, pos[1]*OFFSET, pos[2]*OFFSET, 1,
    ];
    return 'matrix3d('+m.map(function(n){return Math.abs(n)<1e-6?0:+n.toFixed(8);}).join(',')+')';
  }

  function applyAll(states) {
    var cubes = scene.querySelectorAll('.mcube');
    for (var i=0; i<cubes.length; i++) {
      var st = states[i]; if (!st) continue;
      cubes[i].style.transition = 'none';
      cubes[i].style.transform = mat4css(st.quat, st.pos);
    }
  }

  function easeInOut(t) { return t<0.5 ? 2*t*t : -1+(4-2*t)*t; }

  // ─── 动画一次转动 ──────────────────────────────────────────────────────────
  var rafId = 0;
  function animateTurn(states, face, prime, durationMs) {
    var axis  = FACE_AXIS[face];
    var angle = turnAngle(face, prime);
    var qR    = qFromAxis(axis, angle);
    var layer=[]; var sp=[]; var sq=[];
    for (var i=0; i<8; i++) {
      if (!inLayer(face, states[i].pos)) continue;
      layer.push(i);
      sp.push(states[i].pos.slice());
      sq.push(states[i].quat.slice());
    }
    var ep = sp.map(function(p){ return snapPos(rotVec(axis, angle, p)); });
    var eq = sq.map(function(q){ return qMul(qR, q); });
    var t0 = performance.now();
    return new Promise(function(resolve) {
      function tick(now) {
        var raw = Math.min(1, (now-t0)/durationMs);
        var u   = easeInOut(raw);
        for (var li=0; li<layer.length; li++) {
          var idx = layer[li];
          var pf  = raw>=1 ? ep[li] : rotVec(axis, angle*u, sp[li]);
          states[idx].pos  = raw>=1 ? ep[li].slice() : [pf[0],pf[1],pf[2]];
          states[idx].quat = raw>=1 ? eq[li].slice() : qSlerp(sq[li], eq[li], u);
        }
        applyAll(states);
        if (raw < 1) { rafId = requestAnimationFrame(tick); }
        else         { resolve(); }
      }
      rafId = requestAnimationFrame(tick);
    });
  }

  // ─── 循环 ─────────────────────────────────────────────────────────────────
  var timers = [];
  function sleep(ms) {
    return new Promise(function(resolve) {
      timers.push(setTimeout(resolve, ms));
    });
  }

  var states = initialStates();
  applyAll(states);

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var FACES = ['U','D','F','B','R','L'];
  function randTurn() {
    return { face: FACES[Math.floor(Math.random()*6)], prime: Math.random()<0.5 };
  }

  var HOVER_TURN_MS = 440;
  var HOVER_AFTER_TURN_MS = 120;
  var HOVER_SCATTER_LEAVE_MS = 420;

  var exclusiveTail = Promise.resolve();
  function runExclusive(fn) {
    var p = exclusiveTail.then(function () {
      return fn();
    });
    exclusiveTail = p.then(
      function () {},
      function () {},
    );
    return p;
  }

  var pointerInsideScene = false;
  var hoverPreviewTurn = null;

  function onPointerEnter() {
    pointerInsideScene = true;
    runExclusive(function () {
      return (async function () {
        var turn = randTurn();
        hoverPreviewTurn = turn;
        await animateTurn(states, turn.face, turn.prime, HOVER_TURN_MS);
        if (!pointerInsideScene) {
          await animateTurn(states, turn.face, !turn.prime, HOVER_TURN_MS);
          hoverPreviewTurn = null;
          return;
        }
        await sleep(HOVER_AFTER_TURN_MS);
        if (!pointerInsideScene) {
          await animateTurn(states, turn.face, !turn.prime, HOVER_TURN_MS);
          hoverPreviewTurn = null;
          return;
        }
        scene.classList.add('rubik-scene--scatter');
      })();
    });
  }

  function onPointerLeave() {
    pointerInsideScene = false;
    runExclusive(function () {
      return (async function () {
        scene.classList.remove('rubik-scene--scatter');
        await sleep(HOVER_SCATTER_LEAVE_MS);
        var t = hoverPreviewTurn;
        hoverPreviewTurn = null;
        if (t) {
          await animateTurn(states, t.face, !t.prime, HOVER_TURN_MS);
        }
      })();
    });
  }

  scene.addEventListener('pointerenter', onPointerEnter);
  scene.addEventListener('pointerleave', onPointerLeave);

  async function runCycles() {
    for (;;) {
      var history = [];
      var si, ti, st;
      for (si = 0; si < SCRAMBLE_SEGMENTS_MS.length; si++) {
        st = slotTiming(SCRAMBLE_SEGMENTS_MS[si].windowMs, SCRAMBLE_SEGMENTS_MS[si].moves);
        for (ti = 0; ti < SCRAMBLE_SEGMENTS_MS[si].moves; ti++) {
          await sleep(st.pauseBefore);
          var t = randTurn();
          history.push(t);
          var tf = t.face;
          var tp = t.prime;
          var tm = st.turnMs;
          await runExclusive(function () {
            return animateTurn(states, tf, tp, tm);
          });
        }
        if (si < SCRAMBLE_SEGMENTS_MS.length - 1) {
          await sleep(PAUSE_BETWEEN_BURST_MS);
        }
      }
      await sleep(PAUSE_BETWEEN_BURST_MS);
      var hi = history.length - 1;
      for (si = 0; si < UNDO_SEGMENTS_MS.length; si++) {
        st = slotTiming(UNDO_SEGMENTS_MS[si].windowMs, UNDO_SEGMENTS_MS[si].moves);
        for (ti = 0; ti < UNDO_SEGMENTS_MS[si].moves; ti++) {
          await sleep(st.pauseBefore);
          var inv = history[hi];
          hi -= 1;
          var ivf = inv.face;
          var ivp = !inv.prime;
          var utm = st.turnMs;
          await runExclusive(function () {
            return animateTurn(states, ivf, ivp, utm);
          });
        }
        if (si < UNDO_SEGMENTS_MS.length - 1) {
          await sleep(PAUSE_BETWEEN_BURST_MS);
        }
      }
      // 对齐精确还原态，消浮点残差
      var clean = initialStates();
      for (var j=0; j<8; j++) states[j] = clean[j];
      applyAll(states);
      await sleep(PAUSE_BEFORE_RESTART_MS);
    }
  }

  runCycles();
}());
