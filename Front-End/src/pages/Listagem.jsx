import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar.jsx';
import API_URL from '../services/api.js';

const VAZIO = { nome: '', preco: '', estoque: '', categoria: '' };

const CATEGORIAS = [
  'Japonesa',
  'Coreana',
  'Chinesa',
  'Tailandesa',
  'Vietnamita',
  'Outros',
];

export default function ProdutosPage() {

  // cadastro
  const [form, setForm] = useState(VAZIO);
  const [msg, setMsg] = useState('');
  const [enviando, setEnviando] = useState(false);

  // listagem
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');
  const [busca, setBusca] = useState('');

  // edição
  const [editando, setEditando] = useState(null);
  const [formEdicao, setFormEdicao] = useState(VAZIO);
  const [msgEdicao, setMsgEdicao] = useState('');

  // BUSCAR PRODUTOS
 
  async function buscarProdutos() {
    try {
      setLoading(true);
      setErro('');
      const res = await fetch(API_URL);
      const dados = await res.json();
      setProdutos(dados);
    } catch (e) {
      setErro('Erro ao buscar: ' + e.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    async function carregar() {
    await buscarProdutos();  
    }
    carregar();
  }, []);

  // CADASTRO
  
  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  async function cadastrarProduto(e) {
    e.preventDefault();
    setEnviando(true);
    setMsg('');

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error('Erro ao cadastrar');

      setMsg('sucesso');
      setForm(VAZIO);
      buscarProdutos();

    } catch (e) {
      setMsg('erro:' + e.message);
    } finally {
      setEnviando(false);
    }
  }

  // ========================
  // EXCLUIR
  // ========================
  async function excluirProduto(id) {
    if (!confirm('Excluir produto?')) return;
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    buscarProdutos();
  }

  // ========================
  // EDIÇÃO
  // ========================
  function prepararEdicao(p) {
    setEditando(p.id);
    setFormEdicao(p);
    setMsgEdicao('');
  }

  async function salvarEdicao(e) {
    e.preventDefault();
    try {
      await fetch(`${API_URL}/${editando}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formEdicao),
      });

      setMsgEdicao('sucesso');
      setEditando(null);
      buscarProdutos();

    } catch (e) {
      setMsgEdicao('erro:' + e.message);
    }
  }

    const filtrados = produtos.filter(p =>
  (p.nome || '').toLowerCase().includes(busca.toLowerCase()) ||
  (p.categoria || '').toLowerCase().includes(busca.toLowerCase())
  );

  // ========================
  // RENDER
  // ========================
  return (
    <div>
      <Navbar />
      <div className="container">

         <img src="./public/sakura.png" alt="Sakura" className="element1" />

        {msg === 'sucesso' && <div className="msg msg-sucesso">✅ Cadastrado!</div>}
        {msg.startsWith('erro:') && <div className="msg msg-erro">❌ {msg}</div>}
        {msgEdicao.startsWith('erro:') && <div className="msg msg-erro">❌ {msgEdicao}</div>}

        <div className="form-card">
          <form onSubmit={cadastrarProduto}>
             <h1>Cadastrar Produto</h1>
            <input name="nome" value={form.nome} onChange={handleChange} placeholder="Nome" required />
            <input name="preco" type="number" value={form.preco} onChange={handleChange} placeholder="Preço" required />
            <input name="estoque" type="number" value={form.estoque} onChange={handleChange} placeholder="Estoque" required />

            <select name="categoria" value={form.categoria} onChange={handleChange} required>
              <option value="">Categoria</option>
              {CATEGORIAS.map(c => <option key={c}>{c}</option>)}
            </select>

            <button type="submit" disabled={enviando}>
              {enviando ? 'Salvando...' : 'Cadastrar'}
            </button>
          </form>

           <img src="./public/sakura.png" alt="Sakura" className="element3" />
        </div>

        {/* ========================
            LISTAGEM (EMBAIXO)
        ======================== */}
        
       <h2>Produtos</h2>
        <input
          placeholder="Buscar..."
          value={busca}
          onChange={e => setBusca(e.target.value)}
        />

        {loading && <p>Carregando...</p>}
        {erro && <p>{erro}</p>}

        {filtrados.map(p => (
          <div key={p.id} className="produto">
            {editando === p.id ? (
              <form onSubmit={salvarEdicao}>
                <input value={formEdicao.nome} onChange={e => setFormEdicao({ ...formEdicao, nome: e.target.value })}/>

                <input value={formEdicao.preco} onChange={e => setFormEdicao({ ... formEdicao, preco: e.target.value})} />

                <input value={formEdicao.estoque} onChange={e => setFormEdicao({ ... formEdicao, estoque: e.target.value})} />

                
                <button>Salvar</button>
              </form>
            ) : (
              <div>
                <strong>Nome:</strong>  {p.nome} | <strong>Preço:</strong> R${p.preco} | <strong>Estoque:</strong> {p.estoque} | <strong>Categoria:</strong> {p.categoria} 
                <button onClick={() => prepararEdicao(p)}>Editar</button>
                <button onClick={() => excluirProduto(p.id)}>Excluir</button>
              </div>
            )}
          </div>
        ))}

      </div>
    </div>
  );
}