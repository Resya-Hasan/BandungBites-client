// src/lib/toastOptions.ts
import type { ToasterProps } from 'react-hot-toast'

export const toastOptions: ToasterProps['toastOptions'] = {
  duration: 3500,
  style: {
    background: 'var(--color-cream)',
    color: 'var(--color-espresso)',
    border: '1px solid var(--color-sand)',
    borderRadius: '14px',
    padding: '12px 16px',
    fontFamily: 'var(--font-sans)',
    fontSize: '14px',
    boxShadow: '0 8px 24px rgba(43, 29, 20, 0.12)',
  },
  success: {
    iconTheme: { primary: 'var(--color-toska)', secondary: 'var(--color-cream)' },
    style: { borderLeft: '4px solid var(--color-toska)' },
  },
  error: {
    iconTheme: { primary: '#B3402F', secondary: 'var(--color-cream)' },
    style: { borderLeft: '4px solid #B3402F' },
  },
  loading: {
    iconTheme: { primary: 'var(--color-toska)', secondary: 'var(--color-toska-50)' },
  },
}