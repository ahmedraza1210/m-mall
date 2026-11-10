import { useState } from 'react';
import { api, setToken } from '../../lib/api.js';
import Logo from '../../components/Logo.jsx';

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
    <div className="admin-center">
      <form className="admin-card login-card" onSubmit={submit}>
        <Logo />
        <h1>Admin login</h1>
        <p className="muted">Manage products, case studies and enquiries.</p>
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
