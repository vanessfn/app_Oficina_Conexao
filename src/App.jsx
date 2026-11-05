import { useState } from 'react'
import { isSupabaseConfigured, supabase } from './lib/supabase'

const links = [
  { id: 'inicio', label: 'Visão geral', icon: '▦' },
  { id: 'cadastro', label: 'Pessoas', icon: '♙' },
  { id: 'agenda', label: 'Agenda', icon: '▣', soon: true },
  { id: 'relatorios', label: 'Relatórios', icon: '⌁', soon: true },
]

function App() {
  const [page, setPage] = useState('inicio')
  const [name, setName] = useState('')
  const [message, setMessage] = useState(null)
  const [saving, setSaving] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const peoplePage = page === 'cadastro'

  function navigate(nextPage) {
    setPage(nextPage)
    setMenuOpen(false)
    setMessage(null)
  }

  async function handleSubmit(event) {
    event.preventDefault()
    const cleanName = name.trim()

    if (!cleanName) {
      setMessage({ type: 'error', text: 'Digite um nome antes de continuar.' })
      return
    }

    if (!isSupabaseConfigured) {
      setMessage({
        type: 'warning',
        text: 'O formulário está pronto! Configure as chaves do Supabase no arquivo .env.local para ativar os salvamentos.',
      })
      return
    }

    setSaving(true)
    setMessage(null)
    const { error } = await supabase.from('pessoas').insert({ nome: cleanName })

    if (error) {
      setMessage({ type: 'error', text: 'Não foi possível salvar. Confira a conexão e a tabela pessoas no Supabase.' })
    } else {
      setName('')
      setMessage({ type: 'success', text: `${cleanName} foi cadastrado(a) com sucesso!` })
    }
    setSaving(false)
  }

  function selectLink(link) {
    if (link.soon) {
      setMessage({ type: 'info', text: 'Esta área estará disponível em uma próxima etapa.' })
      return
    }
    navigate(link.id)
  }

  return (
    <div className="app-shell">
      <aside className={`sidebar ${menuOpen ? 'sidebar-open' : ''}`}>
        <a className="brand" href="#inicio" onClick={() => navigate('inicio')}>
          <span className="brand-mark">o<span>c</span></span>
          <span className="brand-copy"><strong>oficina conexão</strong><small>GESTÃO SIMPLES, CONEXÃO REAL</small></span>
        </a>

        <p className="nav-caption">MENU PRINCIPAL</p>
        <nav className="side-nav" aria-label="Navegação principal">
          {links.map((link) => (
            <button className={`nav-link ${page === link.id ? 'selected' : ''}`} key={link.id} onClick={() => selectLink(link)} type="button">
              <span className="nav-icon">{link.icon}</span>
              <span>{link.label}</span>
              {link.soon && <small>EM BREVE</small>}
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="tip-card">
            <span className="tip-icon">✳</span>
            <strong>Um espaço para organizar e conectar.</strong>
            <p>Pequenos passos deixam a rotina mais leve.</p>
          </div>
          <div className="profile-row">
            <span className="avatar">OC</span>
            <span><strong>Oficina Conexão</strong><small>Espaço de trabalho</small></span>
            <span className="profile-more">···</span>
          </div>
        </div>
      </aside>

      {menuOpen && <button className="backdrop" aria-label="Fechar menu" onClick={() => setMenuOpen(false)} />}

      <div className="main-column">
        <header className="topbar">
          <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Abrir menu">☰</button>
          <div className="breadcrumb"><span>Oficina Conexão</span><b>/</b><strong>{peoplePage ? 'Pessoas' : 'Visão geral'}</strong></div>
          <div className="top-actions">
            <span className="online"><i /> Ambiente de trabalho</span>
            <button className="notification" aria-label="Notificações" onClick={() => setMessage({ type: 'info', text: 'Você está em dia! Não há notificações por enquanto.' })}>♧</button>
            <span className="top-avatar">OC</span>
          </div>
        </header>

        <main className="content">
          <section className="welcome">
            <div>
              <p className="eyebrow"><span /> SEU ESPAÇO, DO SEU JEITO</p>
              <h1>{peoplePage ? 'Pessoas' : 'Tudo começa com uma conexão.'}</h1>
              <p className="welcome-text">{peoplePage ? 'Cadastre e organize as pessoas que fazem parte da Oficina Conexão.' : 'Um cantinho simples para organizar informações e manter tudo por perto.'}</p>
            </div>
            <span className="page-chip"><i /> PAINEL PRINCIPAL</span>
          </section>

          {!peoplePage && (
            <section className="hero">
              <div className="hero-copy">
                <p className="hero-kicker">BEM-VINDA(O) À OFICINA</p>
                <h2>Boas ideias florescem<br />quando a gente se conecta.</h2>
                <p>Este é o ponto de partida para cuidar da sua rotina com mais clareza e tranquilidade.</p>
                <button className="hero-button" onClick={() => navigate('cadastro')} type="button">Começar agora <span>→</span></button>
              </div>
              <div className="hero-art" aria-hidden="true">
                <div className="sun" /><div className="orbit orbit-a" /><div className="orbit orbit-b" />
                <div className="stem" /><div className="leaf leaf-a" /><div className="leaf leaf-b" />
                <div className="pot" /><span className="star star-a">✳</span><span className="star star-b">✦</span>
              </div>
            </section>
          )}

          <section className="section-title" id="cadastro">
            <div><p>{peoplePage ? 'CADASTRO' : 'PRIMEIRO PASSO'}</p><h2>{peoplePage ? 'Adicionar uma pessoa' : 'Vamos começar por aqui?'}</h2></div>
            <span>01 <small>/ 03</small></span>
          </section>

          <section className="form-card">
            <div className="form-heading">
              <span className="form-icon">♙</span>
              <div><h3>Novo cadastro</h3><p>Preencha o nome para adicionar uma pessoa à sua lista.</p></div>
            </div>
            <form onSubmit={handleSubmit}>
              <label htmlFor="person-name">Nome completo</label>
              <div className="input-box">
                <input id="person-name" name="nome" type="text" placeholder="Ex.: Maria da Silva" value={name} onChange={(event) => setName(event.target.value)} maxLength={120} autoComplete="name" />
                {name.trim() && <span className="input-valid">✓</span>}
              </div>
              <div className="form-actions">
                <span>Até 120 caracteres</span>
                <button className="save-button" type="submit" disabled={saving}>{saving ? 'Salvando...' : 'Salvar cadastro'} <span>→</span></button>
              </div>
            </form>
            {message && <div className={`feedback feedback-${message.type}`} role="status">{message.text}</div>}
            {!isSupabaseConfigured && <p className="setup-note"><span>i</span> Conexão com o banco: configure o arquivo <code>.env.local</code> para ativar os salvamentos.</p>}
          </section>

          <div className="bottom-note"><span>✳</span><p><strong>Feito para facilitar.</strong> Esta é a primeira versão do seu espaço. Novas funções podem ser adicionadas aos poucos.</p></div>
        </main>

        <footer className="footer">
          <span>© 2026 Oficina Conexão</span>
          <nav aria-label="Links do rodapé">
            <a href="#inicio" onClick={() => navigate('inicio')}>Início</a>
            <a href="#cadastro" onClick={() => navigate('cadastro')}>Cadastro</a>
            <a href="#contato" onClick={() => setMessage({ type: 'info', text: 'O canal de contato será configurado em uma próxima etapa.' })}>Contato ↗</a>
          </nav>
          <span>Com cuidado, em cada detalhe <b>♡</b></span>
        </footer>
      </div>
    </div>
  )
}

export default App