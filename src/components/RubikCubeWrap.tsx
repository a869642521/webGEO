import type { CSSProperties } from 'react';

const CUBES: { sx: number; sy: number; sz: number; x: number; y: number; z: number; color: string }[] = [
  { sx: -1, sy: -1, sz: 1, x: -1, y: -1, z: 1, color: '#ef4444' },
  { sx: 1, sy: -1, sz: 1, x: 1, y: -1, z: 1, color: '#f97316' },
  { sx: -1, sy: 1, sz: 1, x: -1, y: 1, z: 1, color: '#eab308' },
  { sx: 1, sy: 1, sz: 1, x: 1, y: 1, z: 1, color: '#22c55e' },
  { sx: -1, sy: -1, sz: -1, x: -1, y: -1, z: -1, color: '#06b6d4' },
  { sx: 1, sy: -1, sz: -1, x: 1, y: -1, z: -1, color: '#3b82f6' },
  { sx: -1, sy: 1, sz: -1, x: -1, y: 1, z: -1, color: '#a855f7' },
  { sx: 1, sy: 1, sz: -1, x: 1, y: 1, z: -1, color: '#cbd5e1' },
];

type Props = { className?: string };

export function RubikCubeWrap({ className = '' }: Props) {
  return (
    <div className={`hero__cube-wrap ${className}`.trim()} aria-hidden="true">
      <div className="rubik-scene">
        <div className="rubik">
          {CUBES.map((c) => (
            <div
              key={`${c.x},${c.y},${c.z}`}
              className="mcube-wrap"
              style={{ '--sx': c.sx, '--sy': c.sy, '--sz': c.sz } as CSSProperties}
            >
                <div className="mcube" data-x={c.x} data-y={c.y} data-z={c.z}>
                  <div className="mf mf--f" style={{ background: c.color }} />
                  <div className="mf mf--b" style={{ background: c.color }} />
                  <div className="mf mf--l" style={{ background: c.color }} />
                  <div className="mf mf--r" style={{ background: c.color }} />
                  <div className="mf mf--t" style={{ background: c.color }} />
                  <div className="mf mf--bo" style={{ background: c.color }} />
                </div>
            </div>
          ))}
        </div>
      </div>
      <div className="rubik-shadow" />
    </div>
  );
}
