/**
 * DEMO-SCORE - Web Component
 * A visual maturity indicator for components.
 * Maintained by hand-e.
 * 
 * Usage:
 * <script src="demo-score.js"></script>
 * <demo-score level="M" version="v1.0.0" lang="en"></demo-score>
 */

const LEVEL_CONFIG = {
    D: { x: 3, textX: 20, color: 'var(--demo-score-color-d, #e84026)' },
    E: { x: 33, textX: 50, color: 'var(--demo-score-color-e, #f08218)' },
    M: { x: 63, textX: 80, color: 'var(--demo-score-color-m, #f8c819)' },
    O: { x: 93, textX: 110, color: 'var(--demo-score-color-o, #86bc29)' },
    S: { x: 123, textX: 140, color: 'var(--demo-score-color-s, #048141)' }
};

const INACTIVE_CONFIG = { D: 20, E: 50, M: 80, O: 110, S: 140 };

const TRANSLATIONS = {
    en: {
        globalTitle: 'About DEMO-SCORE',
        globalDesc: 'A visual maturity indicator for components:',
        levels: {
            D: { label: 'Draft', desc: 'Proof of concept. Unstable API subject to breaking changes. Not for production.' },
            E: { label: 'Evolving', desc: 'Main functionality in place. Subject to adjustments and refactoring.' },
            M: { label: 'Mature', desc: 'Stable for general use. Core features are unit tested (>70%). API is reliable.' },
            O: { label: 'Optimized', desc: 'Performance verified and documentation complete. Follows industry best practices.' },
            S: { label: 'Stable', desc: 'Production-ready with LTS support. Accessibility and performance fully validated.' }
        }
    },
    fr: {
        globalTitle: 'À propos du DEMO-SCORE',
        globalDesc: 'Un indicateur visuel de maturité pour les composants :',
        levels: {
            D: { label: 'Brouillon', desc: 'Preuve de concept. API instable sujette à des changements majeurs. Ne pas utiliser en production.' },
            E: { label: 'En évolution', desc: 'Fonctionnalité principale en place. Sujet à des ajustements et du refactoring.' },
            M: { label: 'Mature', desc: 'Stable pour un usage courant. Tests unitaires OK (>70%). API fiable.' },
            O: { label: 'Optimisé', desc: 'Performances vérifiées et documentation complète. Suit les meilleures pratiques.' },
            S: { label: 'Stable', desc: 'Prêt pour la production (LTS). Accessibilité et performances totalement validées.' }
        }
    }
};

class DemoScore extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    static get observedAttributes() {
        return ['level', 'version', 'lang'];
    }

    connectedCallback() {
        // Add accessibility attributes to the host element
        if (!this.hasAttribute('role')) this.setAttribute('role', 'status');
        if (!this.hasAttribute('tabindex')) this.setAttribute('tabindex', '0');

        this.render();

        // Handle keyboard focus to show/hide tooltips
        this.addEventListener('focus', () => {
            const wrapper = this.shadowRoot.querySelector('.score-wrapper');
            if (wrapper) wrapper.classList.add('keyboard-focus');
        });
        this.addEventListener('blur', () => {
            const wrapper = this.shadowRoot.querySelector('.score-wrapper');
            if (wrapper) wrapper.classList.remove('keyboard-focus');
        });
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            this.render();
        }
    }

    get level() { return this.getAttribute('level') || 'D'; }
    get version() { return this.getAttribute('version') || 'v1.0.0'; }
    get lang() { return this.getAttribute('lang') || 'en'; }

    render() {
        const level = this.level.toUpperCase();
        const version = this.version;
        const lang = this.lang.toLowerCase();

        const activeLevel = LEVEL_CONFIG[level] ? level : 'D';
        const config = LEVEL_CONFIG[activeLevel];
        const t = TRANSLATIONS[lang] || TRANSLATIONS['en'];

        // Update ARIA label for screen readers
        const ariaLabel = `${t.globalTitle}. ${lang === 'fr' ? 'Niveau' : 'Level'}: ${t.levels[activeLevel].label}. Version: ${version}`;
        this.setAttribute('aria-label', ariaLabel);

        const letters = ['D', 'E', 'M', 'O', 'S'].map(l => {
            if (l === activeLevel) return '';
            return `<text x="${INACTIVE_CONFIG[l]}" y="36" text-anchor="middle" fill="var(--demo-score-text-inactive, rgba(255,255,255,0.5))" font-weight="bold" font-size="14">${l}</text>`;
        }).join('');

        this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: inline-block;
          font-family: ui-sans-serif, system-ui, sans-serif;
          outline: none; /* Handled by custom focus ring */
        }
        :host(:focus-visible) .score-wrapper {
          outline: 2px solid var(--demo-score-color-m, #f8c819);
          outline-offset: 2px;
          border-radius: 14px;
        }
        .score-wrapper {
          position: relative;
          display: inline-block;
          /* Use ems based on font-size to allow global scaling */
          font-size: var(--demo-score-scale, 10px); 
          width: 16em;
          height: 5em;
          cursor: help;
          transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .score-wrapper:hover,
        .score-wrapper.keyboard-focus {
          transform: scale(1.03);
          z-index: 50;
        }
        .title-hitbox {
          position: absolute;
          top: 0.4em;
          left: 0.6em;
          width: 6.5em;
          height: 1.2em;
          cursor: pointer;
          z-index: 10;
          border-radius: 4px;
        }
        svg {
          width: 100%;
          height: 100%;
        }
        .custom-tooltip {
          position: absolute;
          top: 100%;
          left: 50%;
          background: var(--demo-score-tooltip-bg, #1e293b);
          color: var(--demo-score-tooltip-text, white);
          padding: 1.2em 1.6em;
          border-radius: 0.8em;
          font-size: 1.3em;
          pointer-events: none;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
          z-index: 100;
          opacity: 0;
          visibility: hidden;
          margin-top: -0.5em;
          transition: opacity 0.2s, margin-top 0.2s, visibility 0.2s;
        }
        .custom-tooltip::after {
          content: '';
          position: absolute;
          bottom: 100%;
          left: 50%;
          transform: translateX(-50%);
          border-width: 0.6em;
          border-style: solid;
          border-color: transparent transparent var(--demo-score-tooltip-bg, #1e293b) transparent;
        }
        .level-tooltip {
          width: 26em;
          transform: translateX(-50%) translateY(1.2em);
        }
        .global-tooltip {
          width: 22em;
          transform: translateX(-25%) translateY(1.2em);
        }
        .global-tooltip::after {
          left: 25%;
        }
        
        /* Show tooltips on hover OR keyboard focus */
        .score-wrapper:hover .level-tooltip,
        .score-wrapper.keyboard-focus .level-tooltip {
          opacity: 1;
          visibility: visible;
          margin-top: 0;
        }
        
        .title-hitbox:hover ~ .global-tooltip,
        .global-tooltip:hover {
          opacity: 1;
          visibility: visible;
          margin-top: 0;
        }

        /* Hide level when title is hovered */
        .title-hitbox:hover ~ .level-tooltip {
          opacity: 0 !important;
          visibility: hidden !important;
        }
        
        .active-pill {
          transition: all 0.3s ease;
        }
        .score-wrapper:hover .active-pill,
        .score-wrapper.keyboard-focus .active-pill {
          filter: drop-shadow(0 4px 6px rgba(0,0,0,0.25));
        }
        
        .font-bold { font-weight: bold; }
        .text-white { color: var(--demo-score-tooltip-text, white); }
        .text-slate-300 { color: var(--demo-score-tooltip-subtext, #cbd5e1); }
        .border-b { border-bottom: 1px solid var(--demo-score-tooltip-border, #334155); }
        .mb-2 { margin-bottom: 0.5em; }
        .mb-1 { margin-bottom: 0.25em; }
        .pb-2 { padding-bottom: 0.5em; }
        .text-xs { font-size: 0.75em; line-height: 1.2; }
        .space-y-1-5 > * + * { margin-top: 0.375em; }
        .uppercase { text-transform: uppercase; }
        ul { list-style: none; padding: 0; margin: 0; }
        
        /* Interactive title tip */
        .title-instruction {
          font-size: 7px;
          fill: var(--demo-score-text, #475569);
          opacity: 0.5;
        }
        .title-hitbox:hover ~ svg .title-instruction {
          opacity: 1;
          fill: var(--demo-score-color-o, #86bc29);
        }
      </style>
      <div class="score-wrapper">
        <div class="title-hitbox" title="Click or hover to learn more about Demo-Score"></div>
        <svg viewBox="0 0 160 50" xmlns="http://www.w3.org/2000/svg">
          <rect x="1" y="1" width="158" height="48" rx="14" fill="var(--demo-score-bg, white)" stroke="var(--demo-score-border, #e2e8f0)" stroke-width="2"/>
          <text x="8" y="13" font-size="9" font-weight="900" fill="var(--demo-score-text, #475569)" letter-spacing="0.5">DEMO-SCORE</text>
          
          <text x="56" y="11" class="title-instruction" font-weight="bold">ⓘ</text>

          <text x="150" y="13" text-anchor="end" font-size="7" font-weight="bold" fill="var(--demo-score-version-text, #94a3b8)" font-family="monospace">${version}</text>
          <defs>
            <clipPath id="barClip">
              <rect x="5" y="18" width="150" height="26" rx="13" />
            </clipPath>
            <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="2" stdDeviation="2" flood-opacity="0.2"/>
            </filter>
          </defs>
          <g clip-path="url(#barClip)">
            <rect x="5" y="18" width="30" height="26" fill="var(--demo-score-color-d, #e84026)" />
            <rect x="35" y="18" width="30" height="26" fill="var(--demo-score-color-e, #f08218)" />
            <rect x="65" y="18" width="30" height="26" fill="var(--demo-score-color-m, #f8c819)" />
            <rect x="95" y="18" width="30" height="26" fill="var(--demo-score-color-o, #86bc29)" />
            <rect x="125" y="18" width="30" height="26" fill="var(--demo-score-color-s, #048141)" />
          </g>
          ${letters}
          <rect class="active-pill" x="${config.x}" y="14" width="34" height="34" rx="17" fill="${config.color}" filter="url(#shadow)" />
          <text x="${config.textX}" y="38" text-anchor="middle" fill="var(--demo-score-active-text, white)" font-weight="900" font-size="21">${activeLevel}</text>
        </svg>

        <div class="custom-tooltip level-tooltip" role="tooltip">
          <div class="font-bold mb-1 uppercase" style="color: ${config.color}">
            ${t.levels[activeLevel].label} (${lang === 'fr' ? 'Niveau' : 'Level'} ${activeLevel})
          </div>
          <div class="text-slate-300 text-xs">
            ${t.levels[activeLevel].desc}
          </div>
        </div>

        <div class="custom-tooltip global-tooltip" role="tooltip">
          <div class="font-bold text-white mb-2 pb-2 border-b">
            ${t.globalTitle}
          </div>
          <div class="text-slate-300 mb-2 text-xs">
            ${t.globalDesc}
          </div>
          <ul class="space-y-1-5 text-xs text-slate-300">
            <li><strong style="color: var(--demo-score-color-d, #e84026)">D</strong> : ${t.levels['D'].label}</li>
            <li><strong style="color: var(--demo-score-color-e, #f08218)">E</strong> : ${t.levels['E'].label}</li>
            <li><strong style="color: var(--demo-score-color-m, #f8c819)">M</strong> : ${t.levels['M'].label}</li>
            <li><strong style="color: var(--demo-score-color-o, #86bc29)">O</strong> : ${t.levels['O'].label}</li>
            <li><strong style="color: var(--demo-score-color-s, #048141)">S</strong> : ${t.levels['S'].label}</li>
          </ul>
        </div>
      </div>
    `;
    }
}

if (!customElements.get('demo-score')) {
    customElements.define('demo-score', DemoScore);
}
