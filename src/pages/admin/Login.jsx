import { useState } from 'react';
import { api, setToken } from '../../lib/api.js';

export default function Login({ onLogin }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      const { token } = await api('login', { method: 'POST', body: { password } });
      setToken(token);
      onLogin();
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="admin-center admin-root">
      <form className="admin-card login-card" onSubmit={submit}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <img src="/brand/logo-mark.png" alt="" style={{ height: '44px', width: 'auto' }} />
          <img src="/brand/wordmark.png" alt="Machinery Mall" style={{ height: '20px', width: 'auto' }} />
        </div>
        <h1>Admin login</h1>
        <p className="muted">Manage products, industries, case studies, brands and enquiries.</p>
        <label className="field">
          <span>Password</span>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoFocus required autoComplete="current-password" />
        </label>
        {error && <p className="form__error">{error}</p>}
        <button className="btn btn--primary btn--block" disabled={busy}>{busy ? 'Signing in…' : 'Sign in'}</button>
      </form>
    </div>
  );
}
