import { useEffect } from 'react';
import { useSettings } from './content.jsx';

export const formatDate = (iso) =>
  iso ? new Date(iso).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }) : '';

export const formatDateTime = (iso) =>
  iso ? new Date(iso).toLocaleString(undefined, { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : '';

export const paragraphs = (text) =>
  String(text || '')
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

export function usePageTitle(title) {
  const { siteName = 'Machinery Mall' } = useSettings();
  useEffect(() => {
    document.title = title ? `${title} | ${siteName}` : siteName;
  }, [title, siteName]);
}
