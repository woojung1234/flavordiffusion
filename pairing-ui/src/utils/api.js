export const getPairingResult = async ({ item1, item2 }) => {
    console.log(`[MOCK] 페어링 요청: ${item1} + ${item2}`);
    return Promise.resolve({
      data: {
        item1,
        item2,
        description: `${item1}와 ${item2}는 향과 맛의 조화가 뛰어난 조합입니다.`,
      },
    });
  };
  
  export const analyzePairing = async (item1, item2) => {
    console.log(`[MOCK] 분석 요청: ${item1} + ${item2}`);
    return Promise.resolve({
      data: {
        connection: true,
        reason: `${item1}와 ${item2}는 화학 성분 관점에서 높은 상관 관계를 가집니다.`,
      },
    });
  };
  