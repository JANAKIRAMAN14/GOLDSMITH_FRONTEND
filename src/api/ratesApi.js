const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export async function fetchLiveRatesMock() {
  await delay(400);

  const baseGold24 = 7200;
  const baseSilver = 92;
  const swing = (Math.random() * 40 - 20).toFixed(2);
  const silverSwing = (Math.random() * 2 - 1).toFixed(2);

  const gold24Rate = Number((baseGold24 + Number(swing)).toFixed(2));
  const silverRate = Number((baseSilver + Number(silverSwing)).toFixed(2));

  return {
    gold24Rate,
    silverRate,
    updatedAt: new Date().toISOString()
  };
}
