import "./App.css";

function App() {
  return (
    <main className="profile">
      <header className="site-header">
        <span className="brand-mark">M</span>
        <span className="brand-name">Murilo Machado</span>
        <span className="header-status">Portfólio pessoal</span>
      </header>

      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow">DESENVOLVIMENTO DE SISTEMAS</p>
          <h1 id="hero-title">Olá, meu nome é Murilo.</h1>
          <p className="hero-description">
            Estou me profissionalizando em programação e construindo meu
            caminho na tecnologia, um projeto de cada vez.
          </p>
        </div>
        <div className="portrait-frame">
          <img
            src="https://i.pinimg.com/736x/f7/12/c0/f712c0cdc6149eeaf01651655df2053f.jpg"
            alt="Imagem de apresentação de Murilo"
          />
        </div>
      </section>

      <section className="content-grid" aria-label="Informações sobre Murilo">
        <article className="info-panel about-panel">
          <h2>Sobre mim</h2>
          <p>
            Quero aprender cada vez mais sobre tecnologia e programação,
            explorando ideias e transformando interesses em experiências.
          </p>
        </article>

        <article className="info-panel interests-panel">
          <h2>Meus interesses</h2>
          <ul className="interests">
            <li>Video games <span>01</span></li>
            <li>Esportes <span>02</span></li>
            <li>Programação <span>03</span></li>
          </ul>
        </article>

        <article className="info-panel contact-panel">
          <h2>Contatos</h2>
          <div className="contact-links">
            <a href="mailto:murilo_machado150@gmail.com">
              <span>Email</span>
              murilo_machado150@gmail.com
            </a>
            <a
              href="https://www.instagram.com/maxadinh0_/"
              target="_blank"
              rel="noreferrer"
            >
              <span>Instagram</span>
              @maxadinh0_
            </a>
          </div>
        </article>
      </section>

      <section className="projects-section" aria-label="Projetos">
        <div className="projects-heading">
          <div>
            <p className="section-label">PROJETOS</p>
          </div>
          <p>Uma seleção dos meus trabalhos e experiências.</p>
        </div>
        <div className="projects-grid">
          <article className="project-card">
            <span className="project-number">01</span>
            <h3>Avaliação FINAL</h3>
            <p>Aplicação Organiza+ para cadastrar e acompanhar tarefas.</p>
            <a
              className="project-link"
              href="/Avaliação%20FINAL/indexOff.html"
              target="_blank"
              rel="noreferrer"
            >
              Abrir projeto ↗
            </a>
          </article>
          <article className="project-card">
            <span className="project-number">02</span>
            <h3>Feira digital</h3>
            <p>Projeto digital desenvolvido para apresentar uma feira.</p>
            <a
              className="project-link"
              href="/Feira%20digital/indexOff.html"
              target="_blank"
              rel="noreferrer"
            >
              Abrir projeto ↗
            </a>
          </article>
          <article className="project-card">
            <span className="project-number">03</span>
            <h3>Rpg</h3>
            <p>Experiência interativa desenvolvida com HTML, CSS e JavaScript.</p>
            <a
              className="project-link"
              href="/Rpg/indexOff.html"
              target="_blank"
              rel="noreferrer"
            >
              Abrir projeto ↗
            </a>
          </article>
        </div>
      </section>
    </main>
  );
}

export default App;
