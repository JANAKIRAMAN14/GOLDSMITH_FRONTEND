import { apiRequest } from './apiClient';

export async function getTodayGoldPrice() {
  const data = await apiRequest('/api/gold-rate/today');
  return Number(data.price) || 0;
}

export async function setTodayGoldPrice(price) {
  const data = await apiRequest('/api/gold-rate/today', {
    method: 'PUT',
    body: { price: Number(price) }
  });
  return Number(data.price) || 0;
}
