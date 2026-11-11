import { useState, useEffect, useCallback, useRef } from 'react';

export function useFetch(url) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const abortControllerRef = useRef(null);
  const isMountedRef = useRef(true);
  const [page, setPage] = useState(1);
  const loadMore = useCallback(async () => {
  if (isLoading || isRefreshing) return; // Защита от дублей
  const nextPage = page + 1;
  // Здесь упрощенно: добавляем новую страницу к текущим данным
  // В реальном проекте нужно проверить, есть ли еще данные
  setPage(nextPage);
  // Логика запроса следующей страницы (аналогично fetchData, но с добавлением)
  // ...
}, [page, isLoading, isRefreshing]);
  const fetchData = useCallback(async (isRefresh = false) => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();
    if (isRefresh) {
      setIsRefreshing(true);
    } else {
      setIsLoading(true);
    }
    setError(null);

    try {
      const response = await fetch(url, { signal: abortControllerRef.current.signal });
      
      if (!response.ok) {
        throw new Error(`Ошибка сервера: ${response.status}`);
      }
      const json = await response.json();
      if (!isMountedRef.current) return;
      if (json.Response === 'False') {
        setData([]);
      } else {
        setData(json.Search || []);
      }
    } catch (e) {
      if (e.name === 'AbortError') return;
      if (!isMountedRef.current) return;

      if (e.message === 'Network request failed') {
        setError('Нет подключения к интернету. Проверьте сеть.');
      } else {
        setError(e.message);
      }
      setData([]);
    } finally {
      if (isMountedRef.current) {
        setIsLoading(false);
        setIsRefreshing(false);
      }
    }
  }, [url]);
  useEffect(() => {
    isMountedRef.current = true;
    fetchData(false);
    return () => {
      isMountedRef.current = false;
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [fetchData]);
  const refetch = useCallback(() => fetchData(false), [fetchData]);
  const onRefresh = useCallback(() => fetchData(true), [fetchData]);

  return { data, isLoading, isRefreshing, error, refetch, onRefresh };
  
}