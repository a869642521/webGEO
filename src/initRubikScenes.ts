/** 双场景（Hero + FEATURES）魔方：共用 runExclusive；FEATURES 内不绑悬停 */
export function initRubikScenes(): void {
  const scenes = document.querySelectorAll('.hero__cube-wrap .rubik-scene');
  if (!scenes.length) return;

  const OFFSET = 23;
  const SCRAMBLE_SEGMENTS_MS = [
    { windowMs: 1000, moves: 2 },
    { windowMs: 1000, moves: 2 },
    { windowMs: 1000, moves: 4 },
  ];
  const UNDO_SEGMENTS_MS = [
    { windowMs: 1000, moves: 4 },
    { windowMs: 1000, moves: 2 },
    { windowMs: 1000, moves: 2 },
  ];
  const PAUSE_BETWEEN_BURST_MS = 500;
  const PAUSE_BEFORE_RESTART_MS = 320;
  const HALF_PI = Math.PI / 2;

  function slotTiming(windowMs: number, moves: number) {
    const slot = windowMs / moves;
    const turnMs = Math.max(168, Math.min(520, Math.floor(slot * 0.82)));
    const pauseBefore = Math.max(16, Math.floor(slot - turnMs));
    return { pauseBefore, turnMs };
  }

  const INITIAL_POS: [number, number, number][] = [
    [-1, -1, 1],
    [1, -1, 1],
    [-1, 1, 1],
    [1, 1, 1],
    [-1, -1, -1],
    [1, -1, -1],
    [-1, 1, -1],
    [1, 1, -1],
  ];

  type Face = 'U' | 'D' | 'F' | 'B' | 'R' | 'L';

  function initialStates() {
    return INITIAL_POS.map((p) => ({ pos: p.slice() as [number, number, number], quat: [1, 0, 0, 0] as [number, number, number, number] }));
  }

  function qNorm(q: number[]) {
    const L = Math.hypot(q[0], q[1], q[2], q[3]) || 1;
    return [q[0] / L, q[1] / L, q[2] / L, q[3] / L];
  }
  function qMul(a: number[], b: number[]) {
    return qNorm([
      a[0] * b[0] - a[1] * b[1] - a[2] * b[2] - a[3] * b[3],
      a[0] * b[1] + a[1] * b[0] + a[2] * b[3] - a[3] * b[2],
      a[0] * b[2] - a[1] * b[3] + a[2] * b[0] + a[3] * b[1],
      a[0] * b[3] + a[1] * b[2] - a[2] * b[1] + a[3] * b[0],
    ]);
  }
  function qFromAxis(ax: number[], rad: number) {
    const L = Math.hypot(ax[0], ax[1], ax[2]) || 1;
    const s = Math.sin(rad / 2);
    return qNorm([Math.cos(rad / 2), (ax[0] / L) * s, (ax[1] / L) * s, (ax[2] / L) * s]);
  }
  function qSlerp(a: number[], b: number[], t: number) {
    let dot = a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
    let bq = b.slice();
    if (dot < 0) {
      dot = -dot;
      bq = [-b[0], -b[1], -b[2], -b[3]];
    }
    if (dot > 0.9995)
      return qNorm([a[0] + t * (bq[0] - a[0]), a[1] + t * (bq[1] - a[1]), a[2] + t * (bq[2] - a[2]), a[3] + t * (bq[3] - a[3])]);
    const th0 = Math.acos(dot);
    const th = th0 * t;
    const sinTh = Math.sin(th);
    const sinTh0 = Math.sin(th0);
    const s0 = Math.cos(th) - (dot * sinTh) / sinTh0;
    const s1 = sinTh / sinTh0;
    return qNorm([s0 * a[0] + s1 * bq[0], s0 * a[1] + s1 * bq[1], s0 * a[2] + s1 * bq[2], s0 * a[3] + s1 * bq[3]]);
  }

  function rotVec(ax: number[], rad: number, v: number[]) {
    const L = Math.hypot(ax[0], ax[1], ax[2]) || 1;
    const kx = ax[0] / L;
    const ky = ax[1] / L;
    const kz = ax[2] / L;
    const c = Math.cos(rad);
    const s = Math.sin(rad);
    const dot = kx * v[0] + ky * v[1] + kz * v[2];
    const oc = 1 - c;
    return [
      v[0] * c + (ky * v[2] - kz * v[1]) * s + kx * dot * oc,
      v[1] * c + (kz * v[0] - kx * v[2]) * s + ky * dot * oc,
      v[2] * c + (kx * v[1] - ky * v[0]) * s + kz * dot * oc,
    ];
  }

  const FACE_AXIS: Record<Face, [number, number, number]> = {
    U: [0, 1, 0],
    D: [0, 1, 0],
    F: [0, 0, 1],
    B: [0, 0, 1],
    R: [1, 0, 0],
    L: [1, 0, 0],
  };
  const FACE_DIR: Record<Face, 1 | -1> = { U: 1, D: -1, F: 1, B: -1, R: 1, L: -1 };

  function turnAngle(face: Face, prime: boolean) {
    return FACE_DIR[face] * (prime ? -1 : 1) * HALF_PI;
  }

  function inLayer(face: Face, pos: number[]) {
    if (face === 'U') return pos[1] === 1;
    if (face === 'D') return pos[1] === -1;
    if (face === 'R') return pos[0] === 1;
    if (face === 'L') return pos[0] === -1;
    if (face === 'F') return pos[2] === 1;
    return pos[2] === -1;
  }

  function snapPos(v: number[]) {
    return [Math.round(v[0]), Math.round(v[1]), Math.round(v[2])];
  }

  function mat4css(q: number[], pos: number[]) {
    const w = q[0];
    const x = q[1];
    const y = q[2];
    const z = q[3];
    const x2 = x + x;
    const y2 = y + y;
    const z2 = z + z;
    const xx = x * x2;
    const xy = x * y2;
    const xz = x * z2;
    const yy = y * y2;
    const yz = y * z2;
    const zz = z * z2;
    const wx = w * x2;
    const wy = w * y2;
    const wz = w * z2;
    const m = [
      1 - (yy + zz),
      xy + wz,
      xz - wy,
      0,
      xy - wz,
      1 - (xx + zz),
      yz + wx,
      0,
      xz + wy,
      yz - wx,
      1 - (xx + yy),
      0,
      pos[0] * OFFSET,
      pos[1] * OFFSET,
      pos[2] * OFFSET,
      1,
    ];
    return `matrix3d(${m.map((n) => (Math.abs(n) < 1e-6 ? 0 : +n.toFixed(8))).join(',')})`;
  }

  function easeInOut(t: number) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  }

  let exclusiveTail = Promise.resolve();
  function runExclusive(fn: () => Promise<void>) {
    const p = exclusiveTail.then(() => fn());
    exclusiveTail = p.then(
      () => {},
      () => {},
    );
    return p;
  }

  function sleep(ms: number) {
    return new Promise<void>((resolve) => {
      setTimeout(resolve, ms);
    });
  }

  const FACES: Face[] = ['U', 'D', 'F', 'B', 'R', 'L'];
  function randTurn() {
    return { face: FACES[Math.floor(Math.random() * 6)], prime: Math.random() < 0.5 };
  }

  const HOVER_TURN_MS = 440;
  const HOVER_AFTER_TURN_MS = 120;
  const HOVER_SCATTER_LEAVE_MS = 420;

  function initRubikScene(scene: Element, sceneIndex: number) {
    const states = initialStates();

    function applyAll() {
      const cubes = scene.querySelectorAll('.mcube');
      for (let i = 0; i < cubes.length; i++) {
        const st = states[i];
        if (!st) continue;
        (cubes[i] as HTMLElement).style.transition = 'none';
        (cubes[i] as HTMLElement).style.transform = mat4css(st.quat, st.pos);
      }
    }

    function animateTurn(statesIn: ReturnType<typeof initialStates>, face: Face, prime: boolean, durationMs: number) {
      const axis = FACE_AXIS[face];
      const angle = turnAngle(face, prime);
      const qR = qFromAxis(axis, angle);
      const layer: number[] = [];
      const sp: number[][] = [];
      const sq: number[][] = [];
      for (let i = 0; i < 8; i++) {
        if (!inLayer(face, statesIn[i].pos)) continue;
        layer.push(i);
        sp.push(statesIn[i].pos.slice());
        sq.push(statesIn[i].quat.slice());
      }
      const ep = sp.map((p) => snapPos(rotVec(axis, angle, p)));
      const eq = sq.map((q) => qMul(qR, q));
      const t0 = performance.now();
      return new Promise<void>((resolve) => {
        function tick(now: number) {
          const raw = Math.min(1, (now - t0) / durationMs);
          const u = easeInOut(raw);
          for (let li = 0; li < layer.length; li++) {
            const idx = layer[li];
            const pf = raw >= 1 ? ep[li] : rotVec(axis, angle * u, sp[li]);
            statesIn[idx].pos = raw >= 1 ? (ep[li].slice() as [number, number, number]) : ([pf[0], pf[1], pf[2]] as [number, number, number]);
            statesIn[idx].quat = raw >= 1 ? (eq[li].slice() as [number, number, number, number]) : (qSlerp(sq[li], eq[li], u) as [number, number, number, number]);
          }
          applyAll();
          if (raw < 1) requestAnimationFrame(tick);
          else resolve();
        }
        requestAnimationFrame(tick);
      });
    }

    applyAll();

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const inFeatures = !!scene.closest('#features');
    let pointerInsideScene = false;
    let hoverPreviewTurn: { face: Face; prime: boolean } | null = null;

    function onPointerEnter() {
      pointerInsideScene = true;
      runExclusive(() =>
        (async () => {
          const turn = randTurn();
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
        })(),
      );
    }

    function onPointerLeave() {
      pointerInsideScene = false;
      runExclusive(() =>
        (async () => {
          scene.classList.remove('rubik-scene--scatter');
          await sleep(HOVER_SCATTER_LEAVE_MS);
          const t = hoverPreviewTurn;
          hoverPreviewTurn = null;
          if (t) await animateTurn(states, t.face, !t.prime, HOVER_TURN_MS);
        })(),
      );
    }

    if (!inFeatures) {
      scene.addEventListener('pointerenter', onPointerEnter);
      scene.addEventListener('pointerleave', onPointerLeave);
    }

    async function runCycles() {
      await sleep(sceneIndex * 140);
      for (;;) {
        const history: { face: Face; prime: boolean }[] = [];
        for (let si = 0; si < SCRAMBLE_SEGMENTS_MS.length; si++) {
          const st = slotTiming(SCRAMBLE_SEGMENTS_MS[si].windowMs, SCRAMBLE_SEGMENTS_MS[si].moves);
          for (let ti = 0; ti < SCRAMBLE_SEGMENTS_MS[si].moves; ti++) {
            await sleep(st.pauseBefore);
            const t = randTurn();
            history.push(t);
            const tf = t.face;
            const tp = t.prime;
            const tm = st.turnMs;
            await runExclusive(() => animateTurn(states, tf, tp, tm));
          }
          if (si < SCRAMBLE_SEGMENTS_MS.length - 1) await sleep(PAUSE_BETWEEN_BURST_MS);
        }
        await sleep(PAUSE_BETWEEN_BURST_MS);
        let hi = history.length - 1;
        for (let si = 0; si < UNDO_SEGMENTS_MS.length; si++) {
          const st = slotTiming(UNDO_SEGMENTS_MS[si].windowMs, UNDO_SEGMENTS_MS[si].moves);
          for (let ti = 0; ti < UNDO_SEGMENTS_MS[si].moves; ti++) {
            await sleep(st.pauseBefore);
            const inv = history[hi];
            hi -= 1;
            const ivf = inv.face;
            const ivp = !inv.prime;
            const utm = st.turnMs;
            await runExclusive(() => animateTurn(states, ivf, ivp, utm));
          }
          if (si < UNDO_SEGMENTS_MS.length - 1) await sleep(PAUSE_BETWEEN_BURST_MS);
        }
        const clean = initialStates();
        for (let j = 0; j < 8; j++) states[j] = clean[j];
        applyAll();
        await sleep(PAUSE_BEFORE_RESTART_MS);
      }
    }

    void runCycles();
  }

  scenes.forEach((scene, ri) => initRubikScene(scene, ri));
}
