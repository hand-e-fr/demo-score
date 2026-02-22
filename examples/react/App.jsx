import React from 'react';
// import '@hand-e/demo-score';

export default function App() {
    return (
        <div style={{ padding: '20px', fontFamily: 'system-ui, sans-serif' }}>
            <h1>React Application with DEMO-SCORE</h1>
            <p>Using the custom element in React is seamless.</p>

            <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
                <demo-score level="D" version="v0.1.0" lang="en"></demo-score>
                <demo-score level="O" version="v2.0.0" lang="fr"></demo-score>
            </div>
        </div>
    );
}
