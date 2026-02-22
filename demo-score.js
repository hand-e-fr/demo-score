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
  },
  es: {
    globalTitle: 'Acerca de DEMO-SCORE',
    globalDesc: 'Un indicador visual de madurez para componentes:',
    levels: {
      D: { label: 'Borrador', desc: 'Prueba de concepto. API inestable sujeta a cambios importantes. No para producción.' },
      E: { label: 'En evolución', desc: 'Funcionalidad principal posicionada. Sujeto a ajustes y refactorización.' },
      M: { label: 'Maduro', desc: 'Estable para uso general. Pruebas unitarias OK. API confiable.' },
      O: { label: 'Optimizado', desc: 'Rendimiento verificado y documentación completa. Sigue las mejores prácticas.' },
      S: { label: 'Estable', desc: 'Listo para producción (LTS). Accesibilidad y rendimiento totalmente validados.' }
    }
  },
  de: {
    globalTitle: 'Über DEMO-SCORE',
    globalDesc: 'Ein visueller Reifeindikator für Komponenten:',
    levels: {
      D: { label: 'Entwurf', desc: 'Machbarkeitsstudie. Instabile API, die breaking changes unterliegt. Nicht für die Produktion.' },
      E: { label: 'In Entwicklung', desc: 'Hauptfunktionalität vorhanden. Unterliegt Anpassungen und Refactoring.' },
      M: { label: 'Ausgereift', desc: 'Stabil für den allgemeinen Gebrauch. Komponententests OK. Zuverlässige API.' },
      O: { label: 'Optimiert', desc: 'Leistung verifiziert und Dokumentation vollständig. Folgt Best Practices.' },
      S: { label: 'Stabil', desc: 'Produktionsbereit (LTS). Barrierefreiheit und Leistung vollständig validiert.' }
    }
  },
  it: {
    globalTitle: 'Informazioni su DEMO-SCORE',
    globalDesc: 'Un indicatore visivo di maturità per i componenti:',
    levels: {
      D: { label: 'Bozza', desc: 'Proof of concept. API instabile soggetta a modifiche importanti. Non per la produzione.' },
      E: { label: 'In evoluzione', desc: 'Funzionalità principale sul posto. Soggetto a modifiche e refactoring.' },
      M: { label: 'Maturo', desc: 'Stabile per uso generale. Test unitari OK. API affidabile.' },
      O: { label: 'Ottimizzato', desc: 'Prestazioni verificate e documentazione completa. Segue le migliori pratiche.' },
      S: { label: 'Stabile', desc: 'Pronto per la produzione con supporto LTS. Accessibilità e prestazioni convalidate.' }
    }
  },
  pt: {
    globalTitle: 'Sobre o DEMO-SCORE',
    globalDesc: 'Um indicador visual de maturidade para componentes:',
    levels: {
      D: { label: 'Rascunho', desc: 'Prova de conceito. API instável sujeita a mudanças drásticas. Não usar em produção.' },
      E: { label: 'Em evolução', desc: 'Funcionalidade principal implementada. Sujeito a ajustes e refatoração.' },
      M: { label: 'Maduro', desc: 'Estável para uso geral. Testes unitários OK. API confiável.' },
      O: { label: 'Otimizado', desc: 'Desempenho verificado e documentação completa. Segue as melhores práticas.' },
      S: { label: 'Estável', desc: 'Pronto para produção (LTS). Acessibilidade e desempenho totalmente validados.' }
    }
  },
  ru: {
    globalTitle: 'О DEMO-SCORE',
    globalDesc: 'Визуальный индикатор зрелости компонентов:',
    levels: {
      D: { label: 'Черновик', desc: 'Проверка концепции. Нестабильный API, возможны критические изменения.' },
      E: { label: 'В разработке', desc: 'Основной функционал реализован. Возможны доработки и рефакторинг.' },
      M: { label: 'Зрелый', desc: 'Стабилен для общего использования. Модульные тесты пройдены. Надежный API.' },
      O: { label: 'Оптимизированный', desc: 'Производительность проверена, документация полная. Соответствует лучшим практикам.' },
      S: { label: 'Стабильный', desc: 'Готов к производству (LTS). Доступность и производительность полностью подтверждены.' }
    }
  },
  ar: {
    globalTitle: 'حول DEMO-SCORE',
    globalDesc: 'مؤشر النضج المرئي للمكونات:',
    levels: {
      D: { label: 'مسودة', desc: 'إثبات المفهوم. واجهة برمجة تطبيقات غير مستقرة عرضة لتغييرات جذرية. ليس للإنتاج.' },
      E: { label: 'قيد التطوير', desc: 'الوظائف الأساسية جاهزة. يخضع للتعديلات وإعادة الهيكلة.' },
      M: { label: 'ناضج', desc: 'مستقر للاستخدام العام. تم اجتياز اختبارات الوحدة. واجهة موثوقة.' },
      O: { label: 'مُحسّن', desc: 'تم التحقق من الأداء واكتمال التوثيق. يتبع أفضل الممارسات.' },
      S: { label: 'مستقر', desc: 'جاهز للإنتاج (LTS). تم التحقق من إمكانية الوصول والأداء بالكامل.' }
    }
  },
  zh: {
    globalTitle: '关于 DEMO-SCORE',
    globalDesc: '组件的视觉成熟度指示器：',
    levels: {
      D: { label: '草稿', desc: '概念验证。不稳定的 API，可能会发生破坏性更改。不可用于生产环境。' },
      E: { label: '演进中', desc: '主要功能已就绪。可能会进行调整和重构。' },
      M: { label: '成熟', desc: '稳定，适合通用。单元测试通过（>70%）。API 可靠。' },
      O: { label: '已优化', desc: '性能已验证，文档完整。遵循行业最佳实践。' },
      S: { label: '稳定', desc: '生产就绪 (LTS) 并在可访问性和性能上得到了充分验证。' }
    }
  },
  ja: {
    globalTitle: 'DEMO-SCORE について',
    globalDesc: 'コンポーネントの視覚的な成熟度インジケーター:',
    levels: {
      D: { label: '草案', desc: '概念実証。破壊的な変更を伴う不安定な API。本番環境向けではありません。' },
      E: { label: '発展中', desc: '主要機能は実装済み。調整やリファクタリングの影響を受けます。' },
      M: { label: '成熟', desc: '一般的な使用において安定。単体テスト完了。信頼できる API。' },
      O: { label: '最適化済み', desc: 'パフォーマンスが検証され、ドキュメントが完全。ベストプラクティスに準拠。' },
      S: { label: '安定', desc: '本番環境で利用可能 (LTS)。アクセシビリティとパフォーマンスが完全に検証されています。' }
    }
  },
  ko: {
    globalTitle: 'DEMO-SCORE 정보',
    globalDesc: '컴포넌트의 시각적 성숙도 지표:',
    levels: {
      D: { label: '초안', desc: '개념 증명. 호환성이 깨지는 변경이 발생할 수 있는 불안정한 API. 프로덕션용이 아님.' },
      E: { label: '진화 중', desc: '주요 기능이 구현됨. 조정 및 리팩토링 대상.' },
      M: { label: '성숙', desc: '일반적인 사용에 안정적. 단위 테스트 성공. 신뢰할 수 있는 API.' },
      O: { label: '최적화됨', desc: '성능 검증 완료 및 문서화 완료. 모범 사례 준수.' },
      S: { label: '안정', desc: '프로덕션 준비 완료(LTS). 접근성 및 성능 완벽 검증.' }
    }
  },
  hi: {
    globalTitle: 'DEMO-SCORE के बारे में',
    globalDesc: 'घटकों के लिए एक दृश्य परिपक्वता संकेतक:',
    levels: {
      D: { label: 'ड्राफ़्ट', desc: 'प्रूफ ऑफ कॉन्सेप्ट। अस्थिर API में बड़े बदलाव हो सकते हैं। उत्पादन के लिए नहीं।' },
      E: { label: 'विकसित हो रहा है', desc: 'मुख्य कार्यक्षमता तैयार है। परिवर्तन और रिफैक्टरिंग के अधीन।' },
      M: { label: 'परिपक्व', desc: 'सामान्य उपयोग के लिए स्थिर। यूनिट परीक्षण ठीक हैं। विश्वसनीय API।' },
      O: { label: 'अनुकूलित', desc: 'प्रदर्शन सत्यापित और दस्तावेज़ीकरण पूर्ण हुआ। सर्वोत्तम प्रथाओं का पालन करता है।' },
      S: { label: 'स्थिर', desc: 'उत्पादन के लिए तैयार (LTS)। पहुँच और प्रदर्शन पूरी तरह से मान्य हैं।' }
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
          width: 7.5em;
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
          
          <text x="75" y="12" class="title-instruction" font-weight="bold">ⓘ</text>

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
