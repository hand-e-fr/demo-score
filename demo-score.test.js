import { describe, it, expect, beforeEach } from 'vitest';
import './demo-score.js';

describe('DemoScore Component', () => {
    beforeEach(() => {
        document.body.innerHTML = '';
    });

    it('renders correctly with default values', () => {
        const el = document.createElement('demo-score');
        document.body.appendChild(el);

        expect(el.shadowRoot).not.toBeNull();

        const versionText = el.shadowRoot.querySelector('text[text-anchor="end"]').textContent;
        expect(versionText).toBe('v1.0.0');

        const activeText = el.shadowRoot.querySelector('text[fill="var(--demo-score-active-text, white)"][font-size="21"]').textContent;
        expect(activeText).toBe('D');
    });

    it('reflects custom attributes', () => {
        const el = document.createElement('demo-score');
        el.setAttribute('level', 'M');
        el.setAttribute('version', 'v2.0.0');
        el.setAttribute('lang', 'fr');
        document.body.appendChild(el);

        const versionText = el.shadowRoot.querySelector('text[text-anchor="end"]').textContent;
        expect(versionText).toBe('v2.0.0');

        const activeText = el.shadowRoot.querySelector('text[fill="var(--demo-score-active-text, white)"][font-size="21"]').textContent;
        expect(activeText).toBe('M');
    });
});
