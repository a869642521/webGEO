import { useEffect, useState } from 'react';

const LS_H = 'debug-brand-h';
/** 自定义取色：直接作为 --primary 等（与色块 HSL 二选一） */
const LS_CUSTOM = 'debug-primary-custom';
/** 全局：--font-global → body / 标题等用 --font-display 的区块 */
const LS_FONT_GLOBAL = 'debug-font-global';
/** 局部：--font-debug-target → 按钮、LOGO、页脚字标 */
const LS_FONT = 'debug-font';

/** 与 globals.css :root 默认 --brand-h（#174FC0 对应约 220°）一致 */
const DEFAULT_H = 220;

/** 主色色相色块（与 --primary 的 hsl(..., 79%, 42%) 一致） */
const HUE_SWATCHES = [180, 195, 210, 220, 230, 240, 250, 260, 270] as const;

/** 与 globals.css 中主色公式一致，用于取色器与色块预览 */
const BRAND_S = 79;
const BRAND_L = 42;

/** HSL → #rrggbb（h ∈ [0,360)，s/l 为 0–100） */
function hslToHex(h: number, s: number, l: number): string {
  const hue = ((h % 360) + 360) % 360;
  const sf = s / 100;
  const lf = l / 100;
  const c = (1 - Math.abs(2 * lf - 1)) * sf;
  const x = c * (1 - Math.abs(((hue / 60) % 2) - 1));
  const m = lf - c / 2;
  let rp = 0;
  let gp = 0;
  let bp = 0;
  if (hue < 60) {
    rp = c;
    gp = x;
  } else if (hue < 120) {
    rp = x;
    gp = c;
  } else if (hue < 180) {
    gp = c;
    bp = x;
  } else if (hue < 240) {
    gp = x;
    bp = c;
  } else if (hue < 300) {
    rp = x;
    bp = c;
  } else {
    rp = c;
    bp = x;
  }
  const r = Math.round((rp + m) * 255);
  const g = Math.round((gp + m) * 255);
  const b = Math.round((bp + m) * 255);
  return `#${[r, g, b].map((v) => v.toString(16).padStart(2, '0')).join('')}`;
}

const PRIMARY_VARS = ['--primary', '--primary-container', '--primary-dim', '--surface-tint', '--inverse-primary'] as const;

function applyExactPrimary(hex: string) {
  for (const k of PRIMARY_VARS) {
    document.documentElement.style.setProperty(k, hex);
  }
}

function clearExactPrimary() {
  for (const k of PRIMARY_VARS) {
    document.documentElement.style.removeProperty(k);
  }
}

const FONT_OPTIONS = [
  {
    id: 'inter',
    label: 'Inter',
    stack: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
  },
  /* public/fonts — 与 src/fonts.css @font-face 对应 */
  {
    id: 'aldrich',
    label: 'Aldrich',
    stack: "'Aldrich', ui-sans-serif, sans-serif",
  },
  {
    id: 'chakra-petch',
    label: 'Chakra Petch',
    stack: "'Chakra Petch', ui-sans-serif, sans-serif",
  },
  {
    id: 'gemunu-libre',
    label: 'Gemunu Libre',
    stack: "'Gemunu Libre', ui-sans-serif, sans-serif",
  },
  {
    id: 'ibm-plex-sans',
    label: 'IBM Plex Sans',
    stack: "'IBM Plex Sans', ui-sans-serif, sans-serif",
  },
  {
    id: 'michroma',
    label: 'Michroma',
    stack: "'Michroma', ui-sans-serif, sans-serif",
  },
  {
    id: 'montserrat',
    label: 'Montserrat',
    stack: "'Montserrat', ui-sans-serif, sans-serif",
  },
  {
    id: 'rajdhani',
    label: 'Rajdhani',
    stack: "'Rajdhani', ui-sans-serif, sans-serif",
  },
  {
    id: 'dm',
    label: 'DM Sans',
    stack: "'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif",
  },
  {
    id: 'system',
    label: '系统 UI',
    stack: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
  },
  {
    id: 'serif',
    label: 'Georgia 衬线',
    stack: "Georgia, 'Times New Roman', serif",
  },
  {
    id: 'mono',
    label: '等宽',
    stack: "ui-monospace, 'SF Mono', 'Cascadia Code', monospace",
  },
] as const;

function readInitialHue(): number {
  if (typeof window === 'undefined') return DEFAULT_H;
  const raw = localStorage.getItem(LS_H);
  if (raw == null) return DEFAULT_H;
  const n = Number(raw);
  if (!Number.isFinite(n)) return DEFAULT_H;
  return Math.min(360, Math.max(0, Math.round(n)));
}

function readInitialCustomHex(): string | null {
  if (typeof window === 'undefined') return null;
  const v = localStorage.getItem(LS_CUSTOM);
  if (!v || !/^#[0-9a-f]{6}$/i.test(v)) return null;
  return v.toLowerCase();
}

function readInitialFontId(): string {
  if (typeof window === 'undefined') return 'inter';
  const id = localStorage.getItem(LS_FONT) || 'inter';
  return FONT_OPTIONS.some((o) => o.id === id) ? id : 'inter';
}

function readInitialGlobalFontId(): string {
  if (typeof window === 'undefined') return 'inter';
  const id = localStorage.getItem(LS_FONT_GLOBAL) || 'inter';
  return FONT_OPTIONS.some((o) => o.id === id) ? id : 'inter';
}

export function DebugPanel() {
  const [open, setOpen] = useState(false);
  const [hue, setHue] = useState(readInitialHue);
  const [customHex, setCustomHex] = useState<string | null>(readInitialCustomHex);
  const [globalFontId, setGlobalFontId] = useState(readInitialGlobalFontId);
  const [fontId, setFontId] = useState(readInitialFontId);

  useEffect(() => {
    if (customHex) {
      applyExactPrimary(customHex);
      localStorage.setItem(LS_CUSTOM, customHex);
    } else {
      clearExactPrimary();
      document.documentElement.style.setProperty('--brand-h', String(hue));
      localStorage.setItem(LS_H, String(hue));
      localStorage.removeItem(LS_CUSTOM);
    }
  }, [hue, customHex]);

  useEffect(() => {
    const opt = FONT_OPTIONS.find((o) => o.id === globalFontId);
    const stack = opt?.stack ?? FONT_OPTIONS[0].stack;
    document.documentElement.style.setProperty('--font-global', stack);
    localStorage.setItem(LS_FONT_GLOBAL, globalFontId);
  }, [globalFontId]);

  useEffect(() => {
    const opt = FONT_OPTIONS.find((o) => o.id === fontId);
    const stack = opt?.stack ?? FONT_OPTIONS[0].stack;
    document.documentElement.style.setProperty('--font-debug-target', stack);
    localStorage.setItem(LS_FONT, fontId);
  }, [fontId]);

  const reset = () => {
    localStorage.removeItem(LS_H);
    localStorage.removeItem(LS_CUSTOM);
    localStorage.removeItem(LS_FONT);
    localStorage.removeItem(LS_FONT_GLOBAL);
    document.documentElement.style.removeProperty('--brand-h');
    clearExactPrimary();
    document.documentElement.style.removeProperty('--font-global');
    document.documentElement.style.removeProperty('--font-debug-target');
    setHue(DEFAULT_H);
    setCustomHex(null);
    setGlobalFontId('inter');
    setFontId('inter');
  };

  return (
    <div className="debug-panel">
      {!open ? (
        <button type="button" className="debug-panel__fab" onClick={() => setOpen(true)} aria-label="打开调试面板">
          调试
        </button>
      ) : (
        <div className="debug-panel__sheet" role="dialog" aria-label="页面调试">
          <div className="debug-panel__head">
            <span className="debug-panel__title">页面调试</span>
            <button type="button" className="debug-panel__close" onClick={() => setOpen(false)} aria-label="关闭">
              ×
            </button>
          </div>
          <div className="debug-panel__field">
            <span className="debug-panel__label">主色（点击色块）</span>
            <div className="debug-panel__swatches" role="group" aria-label="主色色相">
              {HUE_SWATCHES.map((h) => (
                <button
                  key={h}
                  type="button"
                  className={`debug-panel__swatch${!customHex && hue === h ? ' debug-panel__swatch--active' : ''}`}
                  style={{ background: `hsl(${h} 79% 42%)` }}
                  onClick={() => {
                    setCustomHex(null);
                    setHue(h);
                  }}
                  title={`${h}°`}
                  aria-label={`主色 ${h} 度`}
                  aria-pressed={!customHex && hue === h}
                />
              ))}
            </div>
            <span className="debug-panel__hint">
              {customHex
                ? `自定义颜色：${customHex}（与色块互斥）`
                : `色块模式：色相 ${hue}°（HSL 79% / 42%）`}
            </span>
            <div className="debug-panel__color-row">
              <span className="debug-panel__label debug-panel__label--inline">自定义取色</span>
              <input
                type="color"
                className="debug-panel__color-input"
                value={customHex ?? hslToHex(hue, BRAND_S, BRAND_L)}
                onChange={(e) => setCustomHex(e.target.value.toLowerCase())}
                aria-label="自定义主色"
                title="所选颜色即页面主色，不做换算"
              />
            </div>
            <span className="debug-panel__hint">
              取色器：选中的颜色会直接作为按钮、页脚等主色；与上方色块二选一（点色块会清除自定义）
            </span>
          </div>
          <label className="debug-panel__field">
            <span className="debug-panel__label">全局字体（正文、标题等）</span>
            <select
              className="debug-panel__select"
              value={globalFontId}
              onChange={(e) => setGlobalFontId(e.target.value)}
            >
              {FONT_OPTIONS.map((o) => (
                <option key={o.id} value={o.id}>
                  {o.label}
                </option>
              ))}
            </select>
            <span className="debug-panel__hint">作用于 --font-global，驱动全站正文字体与多数标题</span>
          </label>
          <label className="debug-panel__field">
            <span className="debug-panel__label">局部字体（按钮 / LOGO / 底部 Browserbase）</span>
            <select className="debug-panel__select" value={fontId} onChange={(e) => setFontId(e.target.value)}>
              {FONT_OPTIONS.map((o) => (
                <option key={o.id} value={o.id}>
                  {o.label}
                </option>
              ))}
            </select>
            <span className="debug-panel__hint">与全局独立；未改时可与全局选同一字体</span>
          </label>
          <button type="button" className="debug-panel__reset" onClick={reset}>
            恢复默认
          </button>
        </div>
      )}
    </div>
  );
}
