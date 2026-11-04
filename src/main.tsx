import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router'
import { Provider } from 'react-redux';
import { store } from './store/store.ts';
import { setAccessToken, logout } from './features/auth/authSlice.ts';
import { setAuthHandlers } from './api/axiosInstance.ts';

setAuthHandlers({
  getAccessToken: () => store.getState().auth.accessToken,
  onRefreshSuccess: (token) => {
    store.dispatch(setAccessToken(token));
  },
  onRefreshFailed: () => {
    store.dispatch(logout());
  }
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </StrictMode>,
)
