import { useCallback, useEffect, useState } from 'react';
import { getLiveRates } from '../services/rateService';

const REFRESH_INTERVAL_MS = 5 * 60 * 1000;

export function useRates() {
  const [rates, setRates] = useState({
    gold24Rate: 0,
    gold22Rate: 0,
    silverRate: 0,
    updatedAt: null
  });
  const [loading, setLoading] = useState(true);

  const loadRates = useCallback(async () => {
    const data = await getLiveRates();
    setRates(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadRates();
    const interval = setInterval(loadRates, REFRESH_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [loadRates]);

  return { rates, loading, refreshRates: loadRates };
}
