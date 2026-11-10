import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { api } from './api.js';

const ContentContext = createContext(null);

export function ContentProvider({ children }) {
  const [state, setState] = useState({ data: null, loading: true, error: '' });

  const reload = useCallback(async () => {
    try {
      const data = await api(`content?t=${Date.now()}`);
      setState({ data, loading: false, error: '' });
    } catch (err) {
      setState((s) => ({ ...s, loading: false, error: err.message }));
    }
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  return <ContentContext.Provider value={{ ...state, reload }}>{children}</ContentContext.Provider>;
}

export function useContent() {
  return useContext(ContentContext);
}

export function useSettings() {
  return useContext(ContentContext).data?.settings || {};
}
