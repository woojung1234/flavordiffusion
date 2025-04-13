import React, { useState } from 'react';
import InputForm from '../components/InputForm';
import ResultCard from '../components/ResultCard';
import GraphCanvas from '../components/GraphCanvas';
import AnalysisPanel from '../components/AnalysisPanel';

const dummyGraph = {
  nodes: [
    { id: 'wine', label: '와인' },
    { id: 'cheese', label: '치즈' },
    { id: 'steak', label: '스테이크' },
  ],
  links: [
    { source: 'wine', target: 'cheese' },
    { source: 'wine', target: 'steak' },
  ],
};

const Main = () => {
  const [result, setResult] = useState(null);
  const [graphData, setGraphData] = useState(dummyGraph);
  const [analysisResult, setAnalysisResult] = useState(null); // 🔥 추가

  return (
    <div style={{ padding: '40px' }}>
      <h1>AI 기반 페어링 시스템</h1>
      <InputForm onResult={setResult} />
      <ResultCard result={result} />
      <GraphCanvas data={graphData} setAnalysisResult={setAnalysisResult} /> {/* 🔥 전달 */}
      <AnalysisPanel result={analysisResult} /> {/* 🔥 출력 */}
    </div>
  );
};

export default Main;
