import React, { useState } from 'react';
import { getPairingResult } from '../utils/api';

const InputForm = ({ onResult }) => {
  const [item1, setItem1] = useState('');
  const [item2, setItem2] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await getPairingResult({ item1, item2 });
      onResult(response.data);
    } catch (error) {
      console.error('페어링 요청 실패:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px' }}>
      <input
        type="text"
        placeholder="첫 번째 아이템 (예: 와인)"
        value={item1}
        onChange={(e) => setItem1(e.target.value)}
      />
      <input
        type="text"
        placeholder="두 번째 아이템 (예: 치즈)"
        value={item2}
        onChange={(e) => setItem2(e.target.value)}
      />
      <button type="submit">페어링 보기</button>
    </form>
  );
};

export default InputForm;
