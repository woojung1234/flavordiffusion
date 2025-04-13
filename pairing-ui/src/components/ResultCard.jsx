import React from 'react';

const ResultCard = ({ result }) => {
  if (!result) return null;

  return (
    <div style={{ border: '1px solid #ccc', padding: '16px', marginTop: '20px' }}>
      <h3>추천 결과</h3>
      <p><strong>조합:</strong> {result.item1} + {result.item2}</p>
      <p><strong>설명:</strong> {result.description}</p>
      {/* 필요하면 result.graph 등 다른 정보도 추가 */}
    </div>
  );
};

export default ResultCard;
