// Overview Page mit Logo-Hintergrund
const OverviewPage = () => (
  <div className={`h-screen w-full bg-gradient-to-br from-slate-50 to-slate-100 overflow-hidden font-sans relative ${pageTransition ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}>
    
    {/* Logo als Hintergrundbild - hinterste Ebene */}
    <div className="absolute inset-0 pointer-events-none z-0">
      <img 
        src="http://unitedhandscapital.de/wp-content/uploads/2025/07/Firefly_Ein-inspirierendes-modernes-Bild-das-ganzheitliche-Beratung-symbolisiert-Eine-Mann-827201-scaled.png"
        alt="United Hands Capital Logo"
        className="w-full h-full object-cover opacity-15"
      />
    </div>

    <div className="bg-white/70 backdrop-blur-lg border-b border-slate-200/50 relative z-10 mb-0">
      <div className="flex items-center justify-between px-8 py-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">United Hands Capital</h1>
          <p className="text-slate-600 font-medium">Finanzberatungstool</p>
        </div>

        {/* GESAMTBUDGET */}
        <div>
          <p className="text-sm text-slate-500 uppercase tracking-wider font-medium">Gesamtbudget</p>
          <p className="text-3xl font-bold" style={{color: '#004225'}}>{calculateBudget().toLocaleString()} €</p>
        </div>

        {/* HIER DEN BUTTON EINFÜGEN */}
        <button
          onClick={() => setCurrentPage('zigaretten')}
          className="px-4 py-2 bg-white0 text-black text-sm rounded-lg transition-all duration-300 flex items-left gap-2 opacity-0 hover:opacity-100"
        >
          ⏮️
        </button>
      </div>
    </div>
    
    {/* Hauptcontainer für die drei Elemente in einer Reihe - ZENTRIERT */}
    <div className="flex h-[calc(100vh-250px)] items-center justify-center relative z-10 mt-4">
      <div className="flex justify-center items-center px-8 gap-8">
        {/* Basis Absicherung */}
        <div 
          className="flex justify-center animate-fadeIn"
          onClick={() => setCurrentPage('basisabsicherung')}
        >
          <div className="bg-white/70 backdrop-blur-lg rounded-2xl border border-slate-200/50 p-6 hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-105 w-full flex items-center justify-center">
            <svg width="160" height="160" className="overflow-visible">
              {/* Regentropfen Animation - stoppt am Schirm */}
              {[...Array(8)].map((_, i) => (
                <g key={`rain-${i}`}>
                  <line
                    x1={25 + i * 15}
                    y1={10}
                    x2={23 + i * 15}
                    y2={30}
                    stroke="#3b82f6"
                    strokeWidth="2"
                    strokeLinecap="round"
                    opacity="0.6"
                    style={{
                      animation: `rain-fall-short 2s linear infinite`,
                      animationDelay: `${i * 0.3}s`
                    }}
                  />
                </g>
              ))}
              
              {/* Regenschirm über dem Text */}
              <g style={{
                animation: 'umbrella-gentle-sway 4s ease-in-out infinite',
                transformOrigin: '80px 35px'
              }}>
                {/* Schirm-Stoff */}
                <path
                  d="M 45 35 Q 80 20 115 35 Q 95 30 80 30 Q 65 30 45 35"
                  fill="#dc2626"
                  stroke="#b91c1c"
                  strokeWidth="2"
                />
                <path
                  d="M 55 32 Q 80 23 105 32"
                  fill="none"
                  stroke="#991b1b"
                  strokeWidth="1"
                />
                {/* Griff */}
                <line
                  x1="80"
                  y1="30"
                  x2="80"
                  y2="50"
                  stroke="#374151"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M 80 50 Q 85 53 80 55"
                  fill="none"
                  stroke="#374151"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </g>
              
              {/* Text-Elemente */}
              <g>
                <text x="80" y="90" textAnchor="middle" className="text-lg font-bold fill-slate-800">
                  Basis
                </text>
                <text x="80" y="110" textAnchor="middle" className="text-lg font-bold fill-slate-800">
                  Absicherung
                </text>
              </g>
            </svg>
          </div>
        </div>

        {/* Kuchen-Diagramm - DOPPELT SO GROSS */}
        <div className="flex justify-center mx-8">
          <div className="relative animate-fadeIn" style={{ animationDelay: '0.2s' }}>
            <div className="flex justify-center">
              <svg width="320" height="320" viewBox="0 0 450 450">
                {createPieChart()}
                
                <circle
                  cx="225"
                  cy="225"
                  r="60"
                  fill="white"
                  stroke="#004225"
                  strokeWidth="3"
                  className="cursor-pointer transition-all hover:r-67"
                  onClick={() => setCurrentPage('budget')}
                />
                <text x="225" y="203" textAnchor="middle" className="text-sm font-medium fill-slate-600 pointer-events-none">
                  Budget
                </text>
                <text x="225" y="240" textAnchor="middle" className="text-xl font-bold pointer-events-none" style={{fill: '#004225'}}>
                  {calculateBudget().toLocaleString()}€
                </text>
              </svg>
            </div>
          </div>
        </div>

        {/* Budget-Verteilung Legende */}
        <div className="flex justify-center">
          <div className="bg-white/70 backdrop-blur-lg rounded-2xl border border-slate-200/50 p-6 animate-fadeIn hover:shadow-xl transition-shadow duration-300 w-full" style={{ animationDelay: '0.3s' }}>
            <h3 className="text-lg font-bold mb-4 text-slate-900 text-center">Budget-Verteilung</h3>
            <div className="space-y-3">
              {[
                { name: 'Fixkosten', value: percentages.fixkosten, color: '#004225' },
                { name: 'Lifestyle', value: percentages.lifestyle, color: '#1f5f3f' },
                { name: 'Sicherheit', value: percentages.sicherheit, color: '#4d7c5f' },
                { name: 'Überschuss/Defizit', value: percentages.ueberschuss, color: percentages.ueberschuss < 0 ? '#ef4444' : '#10b981' }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between gap-4 hover:bg-slate-50 p-2 rounded transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-sm" style={{backgroundColor: item.color}}></div>
                    <span className="text-sm font-medium text-slate-700">{item.name}</span>
                  </div>
                  <span className="text-sm font-bold text-slate-900">{item.value.toFixed(1)}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="absolute bottom-0 left-0 right-0 h-1/3 z-10">
      <div className="flex h-full gap-4 p-4">
        {[
          { 
            id: 'wuensche', 
            name: 'Wünsche & Ziele', 
            color: '#004225',
            description: ['Persönliche Träume', '& Lebensziele', 'verwirklichen']
          },
          { 
            id: 'kurzfristig', 
            name: 'Kurzfristiges Kapital', 
            color: '#1f5f3f',
            description: ['Flexibles Geld', 'für spontane', 'Anschaffungen']
          },
          { 
            id: 'mittelfristig', 
            name: 'Mittelfristiges Kapital', 
            color: '#4d7c5f',
            description: ['Geplante Ausgaben', 'der nächsten', '1-2 Jahre']
          },
          { 
            id: 'langfristig', 
            name: 'Langfristiges Kapital', 
            color: '#6b8e6b',
            description: ['Großes Vermögen', 'für die Zukunft', 'aufbauen']
          }
        ].map((item, index) => (
          <div key={item.id} className="flex-1 flex flex-col justify-end animate-slideUp" style={{ animationDelay: `${index * 0.1}s` }}>
            <div 
              className="h-3/4 rounded-t-xl flex flex-col items-center justify-center pb-6 relative overflow-hidden cursor-pointer transition-all hover:brightness-110 hover:scale-105 px-4"
              style={{backgroundColor: item.color}}
              onClick={() => setCurrentPage(item.id)}
            >
              <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg px-3 py-2 text-center">
                <div className="text-white font-semibold mb-2">
                  {item.name.split(' ').map((word, i) => (
                    <div key={i} className="text-sm">{word}</div>
                  ))}
                </div>
                <div className="text-white/90 text-xs leading-relaxed">
                  {item.description.map((line, i) => (
                    <div key={i} className="mb-1 last:mb-0">{line}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  
    <NavigationButtons />
    
    <style jsx>{`
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(-10px); }
        to { opacity: 1; transform: translateY(0); }
      }
      
      @keyframes slideUp {
        from { transform: translateY(100px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
      }

      @keyframes rain-fall-short {
        0% { 
          transform: translateY(-20px); 
          opacity: 0; 
        }
        20% { 
          opacity: 0.6; 
        }
        80% { 
          transform: translateY(15px); 
          opacity: 0.6; 
        }
        100% { 
          transform: translateY(20px); 
          opacity: 0; 
        }
      }

      @keyframes umbrella-gentle-sway {
        0%, 100% { transform: rotate(-2deg); }
        50% { transform: rotate(2deg); }
      }
      
      .animate-fadeIn {
        animation: fadeIn 0.5s ease-out forwards;
        opacity: 0;
      }
      
      .animate-slideUp {
        animation: slideUp 0.6s ease-out forwards;
        opacity: 0;
      }
    `}</style>
  </div>
);
