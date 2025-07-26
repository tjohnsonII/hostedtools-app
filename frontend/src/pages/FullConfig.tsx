import React, { useState } from 'react';
import '../css/navigationbar.css';
import '../css/FullConfig.css';

const FullConfig: React.FC = () => {
  // Simulated code aggregation for demo; replace with real data source as needed
  const [selectedType, setSelectedType] = useState<'yealink' | 'polycom'>('yealink');
  const yealinkCode = '# Yealink config example...';
  const polycomCode = '# Polycom config example...';

  // In a real app, code would be passed via props, context, or backend
  const aggregatedCode = selectedType === 'yealink' ? yealinkCode : polycomCode;

  return (
    <div className="full-config">
      <h2>Full Config Aggregator</h2>
      <div className="config-type-selector">
        <label>
          <input
            type="radio"
            name="configType"
            value="yealink"
            checked={selectedType === 'yealink'}
            onChange={() => setSelectedType('yealink')}
          />
          Yealink
        </label>
        <label>
          <input
            type="radio"
            name="configType"
            value="polycom"
            checked={selectedType === 'polycom'}
            onChange={() => setSelectedType('polycom')}
          />
          Polycom
        </label>
      </div>
      <textarea
        className="full-config-textarea"
        value={aggregatedCode}
        readOnly
        rows={12}
        title="Aggregated configuration code"
        placeholder="Aggregated configuration will appear here."
      />
    </div>
  );
};

export default FullConfig;
