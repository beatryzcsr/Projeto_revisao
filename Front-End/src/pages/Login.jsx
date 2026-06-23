import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, register } from '../services/auth.js';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setStatus('');

    try {
      if (isRegister) {
        await register({ email, senha });
        setStatus('✅ Usuário registrado com sucesso. Faça login agora.');
        setIsRegister(false);
      } else {
        const data = await login({ email, senha });
        localStorage.setItem('authToken', data.token);
        setStatus('✅ Login realizado com sucesso! Redirecionando...');
        setTimeout(() => navigate('/home'), 500);
      }
    } catch (erro) {
      setStatus('❌ ' + erro.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-page">
      <div className="container">
        <div className="auth-card">
          <h1>{isRegister ? 'Registrar usuário' : 'Login'}</h1>

          {status && (
            <div className={status.startsWith('✅') ? 'msg msg-sucesso' : 'msg msg-erro'}>
              {status}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              name="senha"
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />

            <button type="submit" disabled={loading}>
              {loading ? 'Enviando...' : isRegister ? 'Registrar' : 'Entrar'}
            </button>
          </form>

          <div className="auth-switch">
            <p>
              {isRegister
                ? 'Já tem conta?'
                : 'Ainda não tem conta?'}
            </p>
            <button type="button" onClick={() => setIsRegister(!isRegister)}>
              {isRegister ? 'Fazer login' : 'Criar conta'}
            </button>
          </div>

          <p className="auth-note">
            Use seu e-mail e senha do banco para testar. Se precisar, crie um novo usuário.
          </p>
        </div>
      </div>
    </div>
  );
}
