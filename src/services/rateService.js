import { fetchLiveRatesMock } from '../api/ratesApi';

export async function getLiveRates() {
  const data = await fetchLiveRatesMock();
  return {
    ...data,
    gold22Rate: Number((data.gold24Rate * 0.916).toFixed(2))
  };
}
