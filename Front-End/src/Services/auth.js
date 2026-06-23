const AUTH_URL = 'http://localhost:3000/api/auth';

export async function login({ email, senha }) {
  const res = await fetch(`${AUTH_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, senha }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.mensagem || 'Erro ao fazer login.');
  return data;
}

export async function register({ email, senha }) {
  const res = await fetch(`${AUTH_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, senha }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.mensagem || 'Erro ao registrar usuário.');
  return data;
}
