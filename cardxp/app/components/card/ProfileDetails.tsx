export function ProfileDetails() {
  return (
    <>
      <div className="topo-perfil">
        <img src="/img/pfp.jpg" className="profile-img mobile-only" alt="Profile" />
        <div>
          <div className="table-view__row row-head">
            <strong className="pink">@DopyCat</strong>
          </div>
          <div className="table-view__row row-subtitle">last updated on 15/03/2026</div>
        </div>
      </div>

      <div className="sunken-panel panel-right">
        <div className="table-view__row">
          Hi, my name is <strong className="pink">DopyCat</strong> but you can call me{' '}
          <strong className="pink">D</strong>!
        </div>

        <div className="table-view__row">
          <strong className="titulo">About me</strong>
          Im 21y and currently studying <strong>Software Engineering</strong> at university. I enjoy
          learning about technology, programming, and creating digital projects.
        </div>

        <div className="table-view__row">
          <strong className="titulo">Interests &amp; Hobbies</strong>
          <ul>
            <li>Cats;</li>
            <li>Playing games;</li>
            <li>Playing violin;</li>
            <li>Animes;</li>
            <li>Ogata from Golden Kamuy.</li>
            <br />
          </ul>
          <img src="/img/ogata.jpg" className="fixed-picture" alt="Ogata" />
        </div>

        <div className="table-view__row">
          <strong className="titulo">Creative Projects</strong>
          Rn, Im working on my manga called{' '}
          <a href="https://www.instagram.com/xango.cmc/" target="_blank" rel="noopener noreferrer">
            <strong className="pink">XANGO</strong>
          </a>
          , about a Brazilian boy chosen by Tupa to fight dark spirits and protect the balance
          between worlds.
        </div>

        <div className="table-view__row">
          <strong className="titulo">Languages</strong>
          <ul>
            <li>Portuguese (1o language);</li>
            <li>English.</li>
            <br />
          </ul>
          I dont speak german, but i can if u like~
        </div>
      </div>
    </>
  );
}
