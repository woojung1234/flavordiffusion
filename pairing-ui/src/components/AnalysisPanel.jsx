import React from 'react';

const AnalysisPanel = ({ result }) => {
  if (!result) return null;

  return (
    <div style={{
      marginTop: '20px',
      padding: '16px',
      border: '2px solid #f39c12',
      backgroundColor: '#fff8e1',
      borderRadius: '8px'
    }}>
      <h3>페어링 분석 결과</h3>
      <p><strong>연결 있음:</strong> {result.connection ? '✔️ 있음' : '❌ 없음'}</p>
      <p><strong>설명:</strong> {result.reason}</p>
    </div>
  );
};

export default AnalysisPanel;
