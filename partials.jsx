/* Shared partials: brand mark, header, mobile drawer, footer, dashboard mock, headshot slot */

/* CookieYes banner — injected from one place so every page (current and future) gets it */
if (!document.getElementById('cookieyes')) {
  const s = document.createElement('script');
  s.id = 'cookieyes';
  s.type = 'text/javascript';
  s.src = 'https://cdn-cookieyes.com/client_data/87a00a8bcb8e575870e61a6a81c5bd2c/script.js';
  document.head.appendChild(s);
}

/* Google Analytics — only loaded after CookieYes signals analytics consent.
   Reads the persisted cookieyes-consent cookie for returning users and
   listens for cookieyes_consent_update for new acceptances. */
(function () {
  const GA_ID = 'G-SXP4SXGCGC';
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
  let loaded = false;

  function loadGA() {
    if (loaded) return;
    loaded = true;
    const s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(s);
    window.gtag('js', new Date());
    window.gtag('config', GA_ID);
  }

  function analyticsAcceptedInCookie() {
    const raw = document.cookie.split('; ').find(c => c.startsWith('cookieyes-consent='));
    if (!raw) return false;
    return /(?:^|,)analytics:yes(?:,|$)/.test(decodeURIComponent(raw.split('=')[1] || ''));
  }

  if (analyticsAcceptedInCookie()) loadGA();

  document.addEventListener('cookieyes_consent_update', function (e) {
    const accepted = (e && e.detail && e.detail.accepted) || [];
    if (Array.isArray(accepted) && accepted.indexOf('analytics') !== -1) loadGA();
  });
})();

window.BrandMark = function BrandMark({ size = 28, light = false }) {
  const c1 = light ? '#fff' : '#00204D';
  const c2 = '#0065E3';
  const c3 = '#6BA5F0';
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="2" y="2" width="13" height="13" rx="2.5" fill={c1}/>
      <rect x="17" y="2" width="13" height="13" rx="2.5" fill={c2}/>
      <rect x="2" y="17" width="13" height="13" rx="2.5" fill={c3}/>
      <rect x="17" y="17" width="13" height="13" rx="2.5" fill={c1} fillOpacity="0.18" stroke={c1} strokeWidth="1.5"/>
    </svg>
  );
};

window.GitHubIcon = function GitHubIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.69 1.24 3.34.95.1-.74.4-1.24.72-1.53-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.16 1.18a10.96 10.96 0 0 1 5.75 0c2.2-1.49 3.16-1.18 3.16-1.18.62 1.59.23 2.76.11 3.05.74.81 1.18 1.84 1.18 3.1 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.13v3.16c0 .31.21.67.8.56C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5z"/>
    </svg>
  );
};

window.SiteHeader = function SiteHeader({ active = 'home' }) {
  const [open, setOpen] = React.useState(false);
  const items = [
    { id: 'home', label: 'Home', href: 'index.html' },
    { id: 'elements', label: 'Elements', href: 'elements.html' },
    { id: 'foundation', label: 'Foundation', href: 'foundation.html' },
    { id: 'participate', label: 'Participate', href: 'participate.html' },
    { id: 'learn', label: 'Learn', href: 'learn.html' },
    { id: 'try', label: 'Try', href: 'try.html' },
  ];
  React.useEffect(() => {
    document.body.classList.toggle('no-scroll', open);
    return () => document.body.classList.remove('no-scroll');
  }, [open]);

  return (
    <React.Fragment>
      <header className="site-header">
        <div className="container site-header__inner">
          <a className="brand" href="index.html">
            <span className="brand__mark"><BrandMark/></span>
            <span>Constructor Fabric</span>
          </a>
          <nav className="nav">
            {items.map(it => (
              <a key={it.id} href={it.href} className={active === it.id ? 'is-active' : ''}>{it.label}</a>
            ))}
          </nav>
          <div className="header__cta">
            <a className="btn btn-primary btn-sm header__cta-btn" href="https://github.com/constructorfabric/">
              <GitHubIcon size={16}/>GitHub
            </a>
            <button className="hamburger" aria-label="Open menu" onClick={() => setOpen(true)}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M3 6h14M3 10h14M3 14h14"/></svg>
            </button>
          </div>
        </div>
      </header>

      <div className={'drawer' + (open ? ' is-open' : '')}>
        <div className="drawer__top">
          <a className="brand" href="index.html" style={{color:'#fff'}}>
            <span className="brand__mark"><BrandMark light/></span>
            <span>Constructor Fabric</span>
          </a>
          <button className="drawer__close" aria-label="Close menu" onClick={() => setOpen(false)}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M5 5l10 10M15 5L5 15"/></svg>
          </button>
        </div>
        <nav className="drawer__nav">
          {items.map(it => (
            <a key={it.id} href={it.href} className={active === it.id ? 'is-active' : ''}>
              {it.label}
              <span className="arrow">→</span>
            </a>
          ))}
        </nav>
        <div className="drawer__cta">
          <a className="btn btn-on-navy-primary btn-lg" href="https://github.com/constructorfabric/">
            <GitHubIcon size={18}/>GitHub
          </a>
        </div>
      </div>
    </React.Fragment>
  );
};

window.SiteFooter = function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer__grid">
          <div>
            <a className="brand" href="index.html" style={{color:'#fff'}}>
              <span className="brand__mark"><BrandMark light/></span>
              <span>Constructor Fabric</span>
            </a>
            <p className="site-footer__about">
              Open-source AI fabric for Software as a Service
            </p>
            <a href="https://github.com/constructorfabric/" target="_blank" rel="noopener" style={{color:'#6BA5F0', textDecoration:'none', display:'block'}}>GitHub →</a>
            <a href="https://discord.gg/QWHtHGgEdq" target="_blank" rel="noopener noreferrer" style={{color:'#6BA5F0', textDecoration:'none', display:'block', marginTop:8}}>Discord →</a>
          </div>
          <div>
            <h4>Elements</h4>
            <ul>
              <li><a href="elements.html#studio">Constructor Studio</a></li>
              <li><a href="elements.html#insight">Constructor Insight</a></li>
              <li><a href="elements.html#gears">Constructor Gears</a></li>
            </ul>
          </div>
          <div>
            <h4>Resources</h4>
            <ul>
              <li><a href="foundation.html">Foundation</a></li>
              <li><a href="participate.html">Participate</a></li>
              <li><a href="learn.html">Learn</a></li>
              <li><a href="try.html">Try</a></li>
              <li><a href="https://github.com/constructorfabric" target="_blank" rel="noopener">GitHub</a></li>
            </ul>
          </div>
        </div>
        <div className="site-footer__bottom">
          <span>© 2026 Constructor Fabric Foundation</span>
          <a href="privacy-policy.html" style={{color:'rgba(255,255,255,.62)'}}>Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
};

/* Constructor Insight dashboard — blue palette only */
window.InsightDashboard = function InsightDashboard({ compact = false }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '160px 1fr', height: compact ? 440 : 540, fontFamily: 'var(--font-sans)' }}>
      <aside style={{ background: '#001838', color: '#B7C3DB', padding: '16px 12px', display: 'flex', flexDirection: 'column', gap: 4, borderRight: '1px solid rgba(255,255,255,.06)' }}>
        <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom: 14, color:'#fff', fontWeight: 600, fontSize: 12.5 }}>
          <BrandMark size={16} light/>Constructor Insight
        </div>
        {[
          ['Overview', true],
          ['Delivery flow', false],
          ['Requirements', false],
          ['Builds', false],
          ['Operations', false],
          ['Teams', false],
          ['Quality', false],
        ].map(([lbl, active], i) => (
          <div key={i} style={{
            display:'flex', alignItems:'center', gap:10,
            padding:'8px 10px',
            borderRadius: 6,
            fontSize: 12,
            color: active ? '#fff' : '#8FA8D0',
            background: active ? 'rgba(0,101,227,.18)' : 'transparent',
            borderLeft: active ? '2px solid #6BA5F0' : '2px solid transparent',
          }}>
            <span style={{
              width:6, height:6, borderRadius:999,
              background: active ? '#6BA5F0' : '#3A4D70'
            }}/>
            {lbl}
          </div>
        ))}
        <div style={{flex:1}}/>
        <div style={{ padding: '10px 8px', fontSize: 11, color: '#6F84A6', borderTop: '1px solid rgba(255,255,255,.06)', marginTop:8 }}>
          <div style={{display:'flex', alignItems:'center', gap:8}}>
            <div style={{ width:24, height:24, borderRadius:999, background: 'linear-gradient(135deg,#6BA5F0,#0065E3)' }}/>
            <div>
              <div style={{color:'#fff', fontSize:12}}>Workspace</div>
              <div>Production</div>
            </div>
          </div>
        </div>
      </aside>

      <div style={{ background: '#F2F6FC', display: 'flex', flexDirection: 'column' }}>
        <div style={{ height: 42, background: '#fff', borderBottom: '1px solid #DCE3EE', display:'flex', alignItems:'center', padding:'0 16px', gap:12, fontSize: 12, color: 'var(--text-muted)' }}>
          <span style={{color:'var(--navy)', fontWeight: 600, fontSize: 13}}>Delivery health</span>
          <span style={{color:'#A4B0C2'}}>›</span>
          <span>Last 30 days</span>
          <div style={{flex:1}}/>
          <div style={{display:'flex', gap:6}}>
            {['1d','7d','30d','90d'].map((p,i)=>(
              <span key={p} style={{
                padding:'3px 9px', borderRadius:6, fontSize:11,
                background: i===2 ? '#00204D' : 'transparent',
                color: i===2 ? '#fff' : 'var(--text-muted)',
                border: i===2 ? 'none' : '1px solid #DCE3EE'
              }}>{p}</span>
            ))}
          </div>
          <span style={{
            padding:'4px 10px', borderRadius:6, background:'#0065E3', color:'#fff',
            fontWeight:500, fontSize:11
          }}>+ New view</span>
        </div>

        <div style={{ padding: 14, display:'grid', gridTemplateColumns:'2fr 1fr', gap:12, flex:1, overflow:'hidden' }}>
          <div style={{display:'flex', flexDirection:'column', gap:12}}>
            <div style={{display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:8}}>
              {[
                ['Lead time','3.4d', '−18%'],
                ['Deploy freq','12.6/d','+22%'],
                ['Change fail','3.1%','−0.4pt'],
                ['MTTR','27m','+4m'],
              ].map(([l,v,d], i)=>(
                <div key={i} style={{ background:'#fff', borderRadius:8, padding:'10px 12px', border:'1px solid #DCE3EE' }}>
                  <div style={{fontSize:9.5, color:'#6B7A95', textTransform:'uppercase', letterSpacing:'.1em'}}>{l}</div>
                  <div style={{fontSize:20, fontWeight:600, color:'var(--navy)', marginTop:4, letterSpacing:'-0.02em'}}>{v}</div>
                  <div style={{fontSize:10.5, color:'#0065E3', marginTop:2}}>{d}</div>
                </div>
              ))}
            </div>

            <div style={{ background:'#fff', border:'1px solid #DCE3EE', borderRadius:8, padding:12, flex:1, minHeight:0 }}>
              <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:8}}>
                <div>
                  <div style={{ fontSize:12.5, fontWeight:600, color:'var(--navy)'}}>Delivery flow</div>
                  <div style={{fontSize:10.5, color:'#6B7A95'}}>Plan → Build → Run, last 30 days</div>
                </div>
                <div style={{display:'flex', gap:10, fontSize:10.5, color:'var(--text-muted)'}}>
                  <span style={{display:'inline-flex', alignItems:'center', gap:5}}><span style={{width:8, height:8, borderRadius:999, background:'#6BA5F0'}}/>Plan</span>
                  <span style={{display:'inline-flex', alignItems:'center', gap:5}}><span style={{width:8, height:8, borderRadius:999, background:'#0065E3'}}/>Build</span>
                  <span style={{display:'inline-flex', alignItems:'center', gap:5}}><span style={{width:8, height:8, borderRadius:999, background:'#00204D'}}/>Run</span>
                </div>
              </div>
              <svg viewBox="0 0 600 200" style={{width:'100%', height:'calc(100% - 30px)'}} preserveAspectRatio="none">
                <defs>
                  <linearGradient id="dg1" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#6BA5F0" stopOpacity=".35"/><stop offset="1" stopColor="#6BA5F0" stopOpacity="0"/></linearGradient>
                  <linearGradient id="dg2" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#0065E3" stopOpacity=".3"/><stop offset="1" stopColor="#0065E3" stopOpacity="0"/></linearGradient>
                </defs>
                {[40,80,120,160].map(y=>(<line key={y} x1="0" x2="600" y1={y} y2={y} stroke="#EAF0F8" strokeDasharray="3 4"/>))}
                <path d="M0 130 C 60 110, 100 140, 150 120 S 240 90, 300 100 S 400 70, 460 80 S 560 50, 600 60 L 600 200 L 0 200 Z" fill="url(#dg1)"/>
                <path d="M0 130 C 60 110, 100 140, 150 120 S 240 90, 300 100 S 400 70, 460 80 S 560 50, 600 60" stroke="#6BA5F0" strokeWidth="2" fill="none"/>
                <path d="M0 160 C 60 150, 100 165, 150 145 S 240 130, 300 135 S 400 105, 460 110 S 560 90, 600 95 L 600 200 L 0 200 Z" fill="url(#dg2)"/>
                <path d="M0 160 C 60 150, 100 165, 150 145 S 240 130, 300 135 S 400 105, 460 110 S 560 90, 600 95" stroke="#0065E3" strokeWidth="2" fill="none"/>
                <path d="M0 175 C 80 168, 140 172, 200 165 S 320 158, 380 160 S 480 150, 600 145" stroke="#00204D" strokeWidth="1.5" fill="none" strokeDasharray="2 3"/>
              </svg>
            </div>
          </div>

          <div style={{display:'flex', flexDirection:'column', gap:12, minHeight:0}}>
            <div style={{ background:'#fff', border:'1px solid #DCE3EE', borderRadius:8, padding:12 }}>
              <div style={{ fontSize:12.5, fontWeight:600, color:'var(--navy)', marginBottom:10}}>Active streams</div>
              {[
                ['BSS / billing', 84],
                ['Edge runtime',  62],
                ['Identity svc',  91],
                ['Tenant migration', 34],
                ['Insight reporting', 76],
              ].map(([n,p], i)=>(
                <div key={i} style={{ marginBottom: i===4 ? 0 : 9 }}>
                  <div style={{display:'flex', justifyContent:'space-between', fontSize:10.5, color:'var(--text-2)', marginBottom:3}}>
                    <span>{n}</span><span style={{color:'#6B7A95'}}>{p}%</span>
                  </div>
                  <div style={{height:5, background:'#EAF0F8', borderRadius:999, overflow:'hidden'}}>
                    <div style={{width:`${p}%`, height:'100%', background:'linear-gradient(90deg,#6BA5F0,#0065E3)', borderRadius:999}}/>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ background:'#fff', border:'1px solid #DCE3EE', borderRadius:8, padding:12, flex:1, minHeight:0, overflow:'hidden' }}>
              <div style={{ fontSize:12.5, fontWeight:600, color:'var(--navy)', marginBottom:8}}>Recent runs</div>
              {[
                ['main · #4218', 'pass', '2m'],
                ['feat/quota · #4217','pass','9m'],
                ['hotfix/auth · #4216','warn','22m'],
                ['main · #4215','pass','1h'],
                ['rel/2026.5 · #4214','pass','3h'],
              ].map(([n,s,t],i)=>(
                <div key={i} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'6px 0', borderTop: i===0 ? 'none' : '1px solid #EAF0F8', fontSize:11}}>
                  <div style={{display:'flex', alignItems:'center', gap:8}}>
                    <span style={{
                      width:7, height:7, borderRadius:999,
                      background: s==='pass'?'#0065E3': s==='warn'?'#6BA5F0':'#001838'
                    }}/>
                    <span style={{ fontFamily:'var(--font-mono)', color:'var(--text-2)'}}>{n}</span>
                  </div>
                  <span style={{ color:'#6B7A95'}}>{t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* SDLC cycle diagram — blue palette */
window.SDLCDiagram = function SDLCDiagram() {
  const stages = [
    { l: 'Plan', a: -90 }, { l: 'Design', a: -30 },
    { l: 'Build', a: 30 }, { l: 'Test', a: 90 },
    { l: 'Release', a: 150 }, { l: 'Operate', a: 210 },
  ];
  const r = 150, cx = 220, cy = 220;
  return (
    <svg viewBox="0 0 440 440" width="100%" style={{ display: 'block' }}>
      <defs>
        <linearGradient id="cycle-g" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#6BA5F0"/>
          <stop offset="100%" stopColor="#0065E3"/>
        </linearGradient>
        <radialGradient id="core-g" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#fff"/>
          <stop offset="1" stopColor="#E6EFFA"/>
        </radialGradient>
      </defs>
      <circle cx={cx} cy={cy} r={r+24} fill="none" stroke="#EAF0F8" strokeDasharray="2 4"/>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="url(#cycle-g)" strokeWidth="2"/>
      {[0,60,120,180,240,300].map(a=>{
        const rad = (a-90)*Math.PI/180;
        const x = cx + Math.cos(rad)*r;
        const y = cy + Math.sin(rad)*r;
        return <circle key={a} cx={x} cy={y} r="3" fill="#0065E3"/>;
      })}
      <circle cx={cx} cy={cy} r="62" fill="url(#core-g)" stroke="#DCE3EE"/>
      <text x={cx} y={cy-6} textAnchor="middle" fontFamily="Geist" fontSize="14" fontWeight="600" fill="#00204D">Constructor</text>
      <text x={cx} y={cy+12} textAnchor="middle" fontFamily="Geist" fontSize="14" fontWeight="600" fill="#00204D">Fabric</text>
      {stages.map((s,i)=>{
        const rad = s.a*Math.PI/180;
        const x = cx + Math.cos(rad)*r;
        const y = cy + Math.sin(rad)*r;
        return (
          <g key={i}>
            <circle cx={x} cy={y} r="22" fill="#fff" stroke="#00204D" strokeWidth="1.5"/>
            <text x={x} y={y+4} textAnchor="middle" fontFamily="Geist" fontSize="11" fontWeight="600" fill="#00204D">{s.l}</text>
          </g>
        );
      })}
      <text x={cx} y={26} textAnchor="middle" fontFamily="Geist Mono" fontSize="10" letterSpacing="2" fill="#6B7A95">REQUIREMENTS</text>
      <text x={cx} y={420} textAnchor="middle" fontFamily="Geist Mono" fontSize="10" letterSpacing="2" fill="#6B7A95">PRODUCTION</text>
    </svg>
  );
};

/* Team headshot card with circular IMG slot wired to a real src path */
window.TeamCard = function TeamCard({ name, role, bio, src, github, imgStyle }) {
  const initials = name.split(' ').map(s => s[0]).slice(0,2).join('').toUpperCase();
  const [errored, setErrored] = React.useState(false);
  return (
    <div className="team-card">
      <div className="team-card__photo">
        {!errored ? (
          <img src={src} alt={name} style={imgStyle} onError={() => setErrored(true)}/>
        ) : (
          <div className="placeholder">{initials}</div>
        )}
      </div>
      <div className="team-card__name">{name}</div>
      <div className="team-card__role">{role}</div>
      {bio ? <p className="team-card__bio">{bio}</p> : null}
      {github ? (
        <a className="team-card__github" href={github} target="_blank" rel="noopener">
          <GitHubIcon size={14}/><span>GitHub</span>
        </a>
      ) : null}
    </div>
  );
};

/* Shared CTA — appears at the bottom of every page */
window.ConstructorFabricCycle = function ConstructorFabricCycle() {
  return (
    <svg viewBox="0 0 600 600" width="100%" role="img"
      aria-labelledby="cf-cycle-title cf-cycle-desc"
      style={{ fontFamily: 'var(--font-sans)', display: 'block' }}>
      <title id="cf-cycle-title">Constructor Fabric — connected SDLC cycle</title>
      <desc id="cf-cycle-desc">Seven-node ring for the software development lifecycle with every pair of nodes connected by primary-blue threads, representing the woven fabric across requirements, UX, design, code, test, deployment, and production.</desc>

      {/* Outer ring */}
      <circle cx="300" cy="300" r="226" fill="none" stroke="#DCE3EE" strokeWidth="1.5"/>

      {/* Cross threads — fabric texture */}
      <g stroke="#6BA5F0" strokeOpacity="0.22" strokeWidth="1.5" strokeLinecap="round">
        <line x1="300" y1="90"  x2="505" y2="347"/>
        <line x1="300" y1="90"  x2="391" y2="489"/>
        <line x1="300" y1="90"  x2="209" y2="489"/>
        <line x1="300" y1="90"  x2="95"  y2="347"/>
        <line x1="464" y1="169" x2="391" y2="489"/>
        <line x1="464" y1="169" x2="209" y2="489"/>
        <line x1="464" y1="169" x2="95"  y2="347"/>
        <line x1="464" y1="169" x2="136" y2="169"/>
        <line x1="505" y1="347" x2="209" y2="489"/>
        <line x1="505" y1="347" x2="95"  y2="347"/>
        <line x1="505" y1="347" x2="136" y2="169"/>
        <line x1="391" y1="489" x2="95"  y2="347"/>
        <line x1="391" y1="489" x2="136" y2="169"/>
        <line x1="209" y1="489" x2="136" y2="169"/>
      </g>

      {/* Adjacent ring threads */}
      <g stroke="#0065E3" strokeOpacity="0.65" strokeWidth="2" strokeLinecap="round">
        <line x1="300" y1="90"  x2="464" y2="169"/>
        <line x1="300" y1="90"  x2="136" y2="169"/>
        <line x1="464" y1="169" x2="505" y2="347"/>
        <line x1="505" y1="347" x2="391" y2="489"/>
        <line x1="391" y1="489" x2="209" y2="489"/>
        <line x1="209" y1="489" x2="95"  y2="347"/>
        <line x1="95"  y1="347" x2="136" y2="169"/>
      </g>

      {/* Nodes */}
      <g>
        <circle cx="300" cy="90"  r="48" fill="#00204D" stroke="#0065E3" strokeWidth="1.5" strokeOpacity="0.5"/>
        <text x="300" y="94"  textAnchor="middle" fill="#fff" fontSize="12" fontWeight="700">Requirements</text>

        <circle cx="464" cy="169" r="48" fill="#00204D" stroke="#0065E3" strokeWidth="1.5" strokeOpacity="0.5"/>
        <text x="464" y="174" textAnchor="middle" fill="#fff" fontSize="13" fontWeight="700">UX</text>

        <circle cx="505" cy="347" r="48" fill="#00204D" stroke="#0065E3" strokeWidth="1.5" strokeOpacity="0.5"/>
        <text x="505" y="352" textAnchor="middle" fill="#fff" fontSize="13" fontWeight="700">Design</text>

        <circle cx="391" cy="489" r="48" fill="#00204D" stroke="#0065E3" strokeWidth="1.5" strokeOpacity="0.5"/>
        <text x="391" y="494" textAnchor="middle" fill="#fff" fontSize="13" fontWeight="700">Code</text>

        <circle cx="209" cy="489" r="48" fill="#00204D" stroke="#0065E3" strokeWidth="1.5" strokeOpacity="0.5"/>
        <text x="209" y="494" textAnchor="middle" fill="#fff" fontSize="13" fontWeight="700">Test</text>

        <circle cx="95"  cy="347" r="48" fill="#00204D" stroke="#0065E3" strokeWidth="1.5" strokeOpacity="0.5"/>
        <text x="95"  y="352" textAnchor="middle" fill="#fff" fontSize="13" fontWeight="700">Deploy</text>

        <circle cx="136" cy="169" r="48" fill="#00204D" stroke="#0065E3" strokeWidth="1.5" strokeOpacity="0.5"/>
        <text x="136" y="174" textAnchor="middle" fill="#fff" fontSize="13" fontWeight="700">Prod</text>
      </g>

      {/* Center pill */}
      <rect x="200" y="270" width="200" height="44" rx="22" fill="#fff" stroke="#0065E3" strokeWidth="1.5"/>
      <text x="300" y="297" textAnchor="middle" fill="#00204D" fontSize="13" fontWeight="700" letterSpacing="1.5">CONSTRUCTOR FABRIC</text>
      <text x="300" y="335" textAnchor="middle" fill="#243143" fillOpacity="0.6" fontSize="11" fontWeight="400">SDLC Cycle</text>
    </svg>
  );
};

window.CtaStart = function CtaStart() {
  return (
    <section id="get-started" className="section--navy" style={{padding:'80px 0'}}>
      <div className="container">
        <div className="cta-start">
          <div>
            <h2 style={{color:'#fff'}}>Start now</h2>
            <p style={{color:'rgba(255,255,255,.78)', fontSize:'var(--fs-lead)', lineHeight:1.55, marginTop:14}}>Use · Contribute · Become a Member</p>
          </div>
          <div className="cta-start__actions">
            <a className="btn btn-on-navy-primary btn-lg" href="https://github.com/constructorfabric/"><GitHubIcon size={16}/>GitHub</a>
            <a className="btn btn-on-navy-secondary btn-lg" href="mailto:contact@constructorfabric.org">Contact us</a>
          </div>
        </div>
      </div>
    </section>
  );
};
