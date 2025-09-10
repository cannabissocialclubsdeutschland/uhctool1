import React, { useState, useEffect } from 'react';

const FinanzTool = () => {
  const [currentPage, setCurrentPage] = useState('overview');
  const [showBudgetDetails, setShowBudgetDetails] = useState(false);
  const [headerHovered, setHeaderHovered] = useState(false);
  
  // Daten aus Excel-Analyse
  const [finanzData, setFinanzData] = useState({
    budgetTotal: 3500,
    gehaltNetto: 2500,
    zusatzeinkommen: 1000,
    kapitalertraege: 0,
    mieteinnahmen: 0,
    individuell: 0,
    fixkostenTotal: 1830,
    lifestyleTotal: 600,
    sicherheit: 1170,
    ueberschuss: -100
  });

  // NEUE STATE VARIABLEN FÜR BUDGET
  const [budgetData, setBudgetData] = useState({
    einnahmen: [{ bezeichnung: 'Gehalt', betrag: 2500 }],
    ausgaben: [{ bezeichnung: 'Fixkosten', betrag: 1830 }],
    investitionen: [{ bezeichnung: 'Aktien', betrag: 200 }],
    ruecklagen: [{ bezeichnung: 'Notgroschen', betrag: 300 }]
  });

  // NEUE STATE VARIABLEN FÜR BASIS-ABSICHERUNG
  const [basisData, setBasisData] = useState({
    krankenversicherung: [{ bezeichnung: 'Gesetzliche KV', betrag: 450 }],
    pflegeversicherung: [{ bezeichnung: 'Pflegepflicht', betrag: 80 }],
    arbeitslosenversicherung: [{ bezeichnung: 'ALV', betrag: 60 }],
    rentenversicherung: [{ bezeichnung: 'GRV', betrag: 470 }]
  });

  // NEUE STATE VARIABLEN FÜR ZIGARETTEN
  const [zigarettenData, setZigarettenData] = useState({
    konsum: [{ bezeichnung: 'Zigaretten', betrag: 200 }]
  });

  // Fixkosten Daten
  const [fixkostenData, setFixkostenData] = useState({
    wohnen: [{ bezeichnung: 'Miete', betrag: 800 }],
    lebensmittel: [{ bezeichnung: 'Wocheneinkauf', betrag: 400 }],
    abos: [{ bezeichnung: 'Netflix', betrag: 15 }],
    mobilitaet: [{ bezeichnung: 'Monatskarte', betrag: 90 }],
    sonstiges: []
  });

  // Lifestyle Daten
  const [lifestyleData, setLifestyleData] = useState({
    freizeit: [{ bezeichnung: 'Kino', betrag: 30 }],
    restaurant: [{ bezeichnung: 'Essen gehen', betrag: 150 }],
    shopping: [{ bezeichnung: 'Kleidung', betrag: 100 }],
    wellness: [{ bezeichnung: 'Fitness', betrag: 40 }],
    hobbies: [{ bezeichnung: 'Sport', betrag: 50 }]
  });

  // Sicherheit Daten
  const [sicherheitData, setSicherheitData] = useState({
    notgroschen: [{ bezeichnung: 'Rücklage', betrag: 500 }],
    versicherungen: [{ bezeichnung: 'Haftpflicht', betrag: 30 }],
    altersvorsorge: [{ bezeichnung: 'Private Rente', betrag: 200 }],
    gesundheit: [{ bezeichnung: 'Zusatzversicherung', betrag: 50 }],
    sparen: [{ bezeichnung: 'Sparkonto', betrag: 390 }]
  });

  // Wünsche & Ziele Daten
  const [wuenscheData, setWuenscheData] = useState({
    traumurlaub: [{ bezeichnung: 'Weltreise', betrag: 15000, erreicht: 3000 }],
    luxus: [{ bezeichnung: 'Designeruhr', betrag: 5000, erreicht: 500 }],
    erlebnisse: [{ bezeichnung: 'Fallschirmsprung', betrag: 500, erreicht: 200 }],
    weiterbildung: [{ bezeichnung: 'MBA Studium', betrag: 30000, erreicht: 5000 }],
    geschenke: [{ bezeichnung: 'Hochzeitsgeschenk', betrag: 1000, erreicht: 100 }]
  });

  // Kurzfristige Anschaffungen
  const [kurzfristigData, setKurzfristigData] = useState({
    elektronik: [{ bezeichnung: 'Neues Smartphone', betrag: 800, erreicht: 400 }],
    haushalt: [{ bezeichnung: 'Staubsauger', betrag: 300, erreicht: 150 }],
    kleidung: [{ bezeichnung: 'Winterjacke', betrag: 200, erreicht: 100 }],
    reparaturen: [{ bezeichnung: 'Fahrrad-Service', betrag: 150, erreicht: 50 }],
    gesundheit: [{ bezeichnung: 'Neue Brille', betrag: 400, erreicht: 200 }]
  });

  // Mittelfristige Anschaffungen
  const [mittelfristigData, setMittelfristigData] = useState({
    moebel: [{ bezeichnung: 'Neue Couch', betrag: 2000, erreicht: 500 }],
    technik: [{ bezeichnung: 'Gaming PC', betrag: 1500, erreicht: 300 }],
    urlaub: [{ bezeichnung: 'Sommerurlaub 2025', betrag: 3000, erreicht: 1000 }],
    auto: [{ bezeichnung: 'Autoreparatur', betrag: 2500, erreicht: 800 }],
    renovation: [{ bezeichnung: 'Bad renovieren', betrag: 5000, erreicht: 1000 }]
  });

  // Langfristige Anschaffungen
  const [langfristigData, setLangfristigData] = useState({
    immobilie: [{ bezeichnung: 'Eigenheim-Anzahlung', betrag: 50000, erreicht: 10000 }],
    fahrzeug: [{ bezeichnung: 'Neues Auto', betrag: 25000, erreicht: 5000 }],
    bildung: [{ bezeichnung: 'Kinder-Studium', betrag: 40000, erreicht: 8000 }],
    altersvorsorge: [{ bezeichnung: 'Private Zusatzrente', betrag: 100000, erreicht: 15000 }],
    unternehmen: [{ bezeichnung: 'Geschäftsgründung', betrag: 30000, erreicht: 3000 }]
  });

  const [gehaltExpanded, setGehaltExpanded] = useState(false);
  const [gehaltDetails, setGehaltDetails] = useState({
    brutto: 0,
    netto: 2500,
    zusatzleistungen: 0
  });

  // Animation states
  const [pageTransition, setPageTransition] = useState(false);

  // Import/Export Funktionalität
  const exportData = () => {
    const allData = {
      version: "1.0",
      exportDate: new Date().toISOString(),
      finanzData,
      fixkostenData,
      lifestyleData,
      sicherheitData,
      wuenscheData,
      kurzfristigData,
      mittelfristigData,
      langfristigData,
      budgetData,
      basisData,
      zigarettenData
    };
    
    const dataStr = JSON.stringify(allData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileName = `Finanzberatung_${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileName);
    linkElement.click();
  };
  
  const importData = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        
        // Daten wiederherstellen
        if (data.finanzData) setFinanzData(data.finanzData);
        if (data.fixkostenData) setFixkostenData(data.fixkostenData);
        if (data.lifestyleData) setLifestyleData(data.lifestyleData);
        if (data.sicherheitData) setSicherheitData(data.sicherheitData);
        if (data.wuenscheData) setWuenscheData(data.wuenscheData);
        if (data.kurzfristigData) setKurzfristigData(data.kurzfristigData);
        if (data.mittelfristigData) setMittelfristigData(data.mittelfristigData);
        if (data.langfristigData) setLangfristigData(data.langfristigData);
        if (data.budgetData) setBudgetData(data.budgetData);
        if (data.basisData) setBasisData(data.basisData);
        if (data.zigarettenData) setZigarettenData(data.zigarettenData);
        
        alert('Daten erfolgreich importiert!');
      } catch (error) {
        alert('Fehler beim Importieren der Datei!');
      }
    };
    reader.readAsText(file);
  };
  
  // Drag & Drop State
  const [dragActive, setDragActive] = useState(false);
  
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };
  
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      importData(e.dataTransfer.files[0]);
    }
  };

  // Page transition effect
  useEffect(() => {
    setPageTransition(true);
    const timer = setTimeout(() => setPageTransition(false), 300);
    return () => clearTimeout(timer);
  }, [currentPage]);

  // Sidebar Komponente
  const Sidebar = () => {
    const sidebarItems = [
      { id: 'fixkosten', name: 'Fixkosten', icon: '🏠', color: '#065f46' },
      { id: 'lifestyle', name: 'Lifestyle', icon: '🎭', color: '#047857' },
      { id: 'sicherheit', name: 'Sicherheit', icon: '🛡️', color: '#059669' }
    ];

    return (
      <>
        <div 
          className="fixed right-8 z-[100]" 
          style={{ 
            top: '40%', 
            transform: 'translateY(-50%)',
            pointerEvents: 'auto' 
          }}
        >
          <div className="absolute inset-0 rounded-2xl overflow-hidden">
            <div className="w-full h-full animate-flowing-gradient opacity-75"></div>
          </div>
          
          <div className="relative backdrop-blur-xl rounded-2xl border border-white/40 p-4 shadow-2xl">
            <div className="space-y-4">
              {sidebarItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setCurrentPage(item.id)}
                  className={`w-16 h-16 rounded-xl flex flex-col items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg relative overflow-hidden ${
                    currentPage === item.id 
                      ? 'text-white shadow-lg' 
                      : 'bg-white/15 text-white hover:bg-white/25 backdrop-blur-sm'
                  }`}
                  style={{
                    backgroundColor: currentPage === item.id ? item.color : undefined
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-120%] hover:translate-x-[120%] transition-transform duration-1000"></div>
                  
                  <span className="text-lg relative z-10">{item.icon}</span>
                  <span className="text-xs font-medium mt-1 text-center leading-tight relative z-10 text-white">
                    {item.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes flowing-gradient {
            0%, 100% {
              background: linear-gradient(
                45deg,
                #065f46 0%,
                #047857 20%,
                #059669 40%,
                #10b981 60%,
                #34d399 80%,
                #065f46 100%
              );
              background-size: 200% 200%;
              background-position: 0% 0%;
            }
            25% {
              background-position: 100% 0%;
            }
            50% {
              background-position: 100% 100%;
            }
            75% {
              background-position: 0% 100%;
            }
          }

          .animate-flowing-gradient {
            animation: flowing-gradient 8s ease-in-out infinite;
          }
        `}</style>
      </>
    );
  };

  // Seitenreihenfolge für Navigation
  const pageOrder = ['overview', 'basisabsicherung', 'zigaretten', 'budget', 'fixkosten', 'lifestyle', 'sicherheit', 'wuensche', 'kurzfristig', 'mittelfristig', 'langfristig'];
  
  const getNextPage = () => {
    const currentIndex = pageOrder.indexOf(currentPage);
    return currentIndex < pageOrder.length - 1 ? pageOrder[currentIndex + 1] : null;
  };

  const getPrevPage = () => {
    const currentIndex = pageOrder.indexOf(currentPage);
    return currentIndex > 0 ? pageOrder[currentIndex - 1] : null;
  };

  // Budget berechnen
  const calculateBudget = () => {
    return finanzData.gehaltNetto + finanzData.zusatzeinkommen + finanzData.kapitalertraege + 
           finanzData.mieteinnahmen + finanzData.individuell;
  };

  // Prozentuale Verteilung berechnen
  const calculatePercentages = () => {
    const budgetTotal = calculateBudget();
    if (budgetTotal === 0) return { fixkosten: 0, lifestyle: 0, sicherheit: 0, ueberschuss: 0 };
    
    return {
      fixkosten: ((finanzData.fixkostenTotal / budgetTotal) * 100),
      lifestyle: ((finanzData.lifestyleTotal / budgetTotal) * 100),
      sicherheit: ((finanzData.sicherheit / budgetTotal) * 100),
      ueberschuss: (((budgetTotal - finanzData.fixkostenTotal - finanzData.lifestyleTotal - finanzData.sicherheit) / budgetTotal) * 100)
    };
  };

  const percentages = calculatePercentages();

  // Mini-Kuchendiagramm für Header
  const createMiniPieChart = () => {
    const radius = headerHovered ? 75 : 55;
    const centerX = 120;
    const centerY = 200;
    
    let cumulativePercentage = 0;
    const slices = [
      { 
        name: 'Fixkosten', 
        value: percentages.fixkosten, 
        color: '#065f46',
        page: 'fixkosten',
        emoji: '🏠'
      },
      { 
        name: 'Lifestyle', 
        value: percentages.lifestyle, 
        color: '#047857',
        page: 'lifestyle',
        emoji: '🎭'
      },
      { 
        name: 'Sicherheit', 
        value: percentages.sicherheit, 
        color: '#059669',
        page: 'sicherheit',
        emoji: '🛡️'
      },
      { 
        name: 'Überschuss', 
        value: percentages.ueberschuss, 
        color: percentages.ueberschuss < 0 ? '#dc2626' : '#10b981',
        page: null,
        emoji: percentages.ueberschuss < 0 ? '⚠️' : '💰'
      }
    ];

    return (
      <svg 
        width="240" 
        height="280"
        className="transition-all duration-500 ease-out"
        onMouseEnter={() => setHeaderHovered(true)}
        onMouseLeave={() => setHeaderHovered(false)}
      >
        {slices.map((slice, index) => {
          const startAngle = (cumulativePercentage / 100) * 2 * Math.PI - Math.PI / 2;
          const endAngle = ((cumulativePercentage + slice.value) / 100) * 2 * Math.PI - Math.PI / 2;
          
          const x1 = centerX + radius * Math.cos(startAngle);
          const y1 = centerY + radius * Math.sin(startAngle);
          const x2 = centerX + radius * Math.cos(endAngle);
          const y2 = centerY + radius * Math.sin(endAngle);
          
          const largeArcFlag = slice.value > 50 ? 1 : 0;
          
          const pathData = [
            `M ${centerX} ${centerY}`,
            `L ${x1} ${y1}`,
            `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
            'Z'
          ].join(' ');
          
          const midAngle = (startAngle + endAngle) / 2;
          const emojiDistance = headerHovered ? radius * 0.75 : radius * 0.65;
          const emojiX = centerX + emojiDistance * Math.cos(midAngle);
          const emojiY = centerY + emojiDistance * Math.sin(midAngle);
          
          cumulativePercentage += slice.value;
          
          return (
            <g key={index}>
              <path
                d={pathData}
                fill={slice.color}
                stroke="white"
                strokeWidth="2"
                className="cursor-pointer transition-all duration-300 hover:opacity-80 hover:brightness-110"
                onClick={() => slice.page && setCurrentPage(slice.page)}
                style={{
                  filter: headerHovered ? 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))' : ''
                }}
              />
              
              {headerHovered && slice.value > 8 && (
                <text
                  x={emojiX}
                  y={emojiY}
                  textAnchor="middle"
                  className="text-lg pointer-events-none animate-fadeIn"
                  dy="6"
                >
                  {slice.emoji}
                </text>
              )}
              
              {headerHovered && slice.value > 5 && (
                <text
                  x={emojiX}
                  y={emojiY + (slice.value > 8 ? 18 : 0)}
                  textAnchor="middle"
                  className="text-[10px] font-bold fill-white pointer-events-none animate-fadeIn"
                  dy="3"
                  style={{ 
                    textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
                    filter: 'drop-shadow(0 1px 1px rgba(0,0,0,0.5))'
                  }}
                >
                  {slice.value.toFixed(0)}%
                </text>
              )}
            </g>
          );
        })}
        
        <circle
          cx={centerX}
          cy={centerY}
          r={headerHovered ? 32 : 28}
          fill="white"
          stroke="#065f46"
          strokeWidth="2"
          className="cursor-pointer transition-all duration-300 hover:stroke-4"
          onClick={() => setCurrentPage('budget')}
        />
        <text 
          x={centerX} 
          y={centerY - 5} 
          textAnchor="middle" 
          className="text-[12px] font-medium fill-slate-600 pointer-events-none"
        >
          Budget
        </text>
        <text 
          x={centerX} 
          y={centerY + 6} 
          textAnchor="middle" 
          className="text-[10px] font-bold pointer-events-none" 
          style={{fill: '#065f46'}}
        >
          {calculateBudget()}€
        </text>
        
        {headerHovered && (
          <text
            x={centerX}
            y={centerY + 55}
            textAnchor="middle"
            className="text-[8px] fill-slate-500 pointer-events-none animate-fadeIn"
          >
            Klicken zum Navigieren
          </text>
        )}
      </svg>
    );
  };

  // Navigation Buttons
  const NavigationButtons = () => {
    const prevPage = getPrevPage();
    const nextPage = getNextPage();
    
    return (
      <div className="fixed bottom-8 right-8 flex gap-4 z-50">
        {prevPage && (
          <button
            onClick={() => setCurrentPage(prevPage)}
            className="px-6 py-3 bg-white/90 backdrop-blur-lg border-2 border-emerald-300 rounded-xl font-semibold text-emerald-700 hover:bg-emerald-50 hover:scale-105 transition-all duration-200 shadow-lg"
          >
            ← Zurück
          </button>
        )}
        {nextPage && (
          <button
            onClick={() => setCurrentPage(nextPage)}
            className="px-6 py-3 bg-emerald-700 text-white rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 hover:bg-emerald-800"
          >
            Weiter →
          </button>
        )}
      </div>
    );
  };

  // Header
  const HeaderBars = () => (
    <div className="fixed top-0 left-0 right-0 h-44 bg-white/70 backdrop-blur-lg border-b border-slate-200/50 z-50">
      <div className="h-full flex items-center px-8 relative">
        <div className="absolute left-8 top-1/2 transform -translate-y-1/2">
          <h1 className="text-xl font-bold text-slate-800">United Hands Capital</h1>
          <p className="text-sm text-slate-600">
            {currentPage === 'overview' && 'Übersicht'}
            {currentPage === 'budget' && 'Budget-Eingabe'}
            {currentPage === 'fixkosten' && 'Fixkosten-Verwaltung'}
            {currentPage === 'lifestyle' && 'Lifestyle-Ausgaben'}
            {currentPage === 'sicherheit' && 'Sicherheit & Vorsorge'}
            {currentPage === 'wuensche' && 'Wünsche & Ziele'}
            {currentPage === 'kurzfristig' && 'Kurzfristige Anschaffungen'}
            {currentPage === 'mittelfristig' && 'Mittelfristige Anschaffungen'}
            {currentPage === 'langfristig' && 'Langfristige Anschaffungen'}
            {currentPage === 'basisabsicherung' && 'Basis-Absicherung'}
            {currentPage === 'zigaretten' && 'Zigaretten-Ausgaben'}
          </p>

          <button
            onClick={() => setCurrentPage('overview')}
            className="mt-2 px-3 py-1 bg-emerald-700 text-white text-xs rounded-lg hover:bg-emerald-800 transition-all inline-flex items-center gap-1"
          >
            🏠 Zur Übersicht
          </button>

          <div className="inline-flex gap-2 ml-2">
            <button
              onClick={exportData}
              className="px-3 py-1 bg-emerald-600 text-white text-xs rounded-lg hover:bg-emerald-700 transition-all"
            >
              📥 Export
            </button>
            
            <label className="px-3 py-1 bg-emerald-500 text-white text-xs rounded-lg hover:bg-emerald-600 transition-all cursor-pointer">
              📤 Import
              <input
                type="file"
                accept=".json"
                onChange={(e) => e.target.files[0] && importData(e.target.files[0])}
                className="hidden"
              />
            </label>
          </div>
        </div>
        
        <div 
          className={`absolute right-8 top-1/2 transform -translate-y-1/2 w-48 h-20 border-2 border-dashed rounded-lg transition-all ${
            dragActive ? 'border-emerald-500 bg-emerald-50' : 'border-gray-300 bg-gray-50'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center justify-center h-full pointer-events-none">
            <span className="text-2xl mb-1">📁</span>
            <span className="text-xs text-gray-600">
              {dragActive ? 'Datei hier ablegen' : 'Drag & Drop Import'}
            </span>
          </div>
        </div>
        
        <div className="flex-1 flex items-end justify-center space-x-8 h-full pb-4">
          <div className="flex flex-col items-center">
            <div 
              className="w-20 h-24 rounded-t-lg flex items-end justify-center pb-2 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg"
              style={{backgroundColor: '#065f46'}}
              onClick={() => setCurrentPage('wuensche')}
            >
              <span className="text-xs text-white font-medium">Wünsche</span>
            </div>
          </div>
          
          <div className="flex flex-col items-center">
            <div 
              className="w-20 h-24 rounded-t-lg flex items-end justify-center pb-2 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg"
              style={{backgroundColor: '#047857'}}
              onClick={() => setCurrentPage('kurzfristig')}
            >
              <span className="text-xs text-white font-medium">Kurz</span>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <div className="relative group">
              {createMiniPieChart()}
              {headerHovered && (
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  Klicken zum Navigieren
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col items-center">
            <div 
              className="w-20 h-24 rounded-t-lg flex items-end justify-center pb-2 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg"
              style={{backgroundColor: '#059669'}}
              onClick={() => setCurrentPage('mittelfristig')}
            >
              <span className="text-xs text-white font-medium">Mittel</span>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <div 
              className="w-20 h-24 rounded-t-lg flex items-end justify-center pb-2 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg"
              style={{backgroundColor: '#10b981'}}
              onClick={() => setCurrentPage('langfristig')}
            >
              <span className="text-xs text-white font-medium">Lang</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Kuchendiagramm erstellen
  const createPieChart = () => {
    const radius = 180;
    const centerX = 225;
    const centerY = 225;
    
    let cumulativePercentage = 0;
    const slices = [
      { name: 'Fixkosten', value: percentages.fixkosten, color: '#004225', page: 'fixkosten' },
      { name: 'Lifestyle', value: percentages.lifestyle, color: '#1f5f3f', page: 'lifestyle' },
      { name: 'Sicherheit', value: percentages.sicherheit, color: '#4d7c5f', page: 'sicherheit' },
      { name: 'Überschuss/Defizit', value: percentages.ueberschuss, color: percentages.ueberschuss < 0 ? '#ef4444' : '#10b981' }
    ];

    return slices.map((slice, index) => {
      const startAngle = (cumulativePercentage / 100) * 2 * Math.PI;
      const endAngle = ((cumulativePercentage + slice.value) / 100) * 2 * Math.PI;
      
      const x1 = centerX + radius * Math.cos(startAngle);
      const y1 = centerY + radius * Math.sin(startAngle);
      const x2 = centerX + radius * Math.cos(endAngle);
      const y2 = centerY + radius * Math.sin(endAngle);
      
      const largeArcFlag = slice.value > 50 ? 1 : 0;
      
      const pathData = [
        `M ${centerX} ${centerY}`,
        `L ${x1} ${y1}`,
        `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
        'Z'
      ].join(' ');
      
      cumulativePercentage += slice.value;
      
      return (
        <path
          key={index}
          d={pathData}
          fill={slice.color}
          stroke="white"
          strokeWidth="4"
          className="transition-all duration-300 cursor-pointer hover:brightness-110 hover:scale-105"
          style={{ transformOrigin: `${centerX}px ${centerY}px` }}
          onClick={() => slice.page && setCurrentPage(slice.page)}
        />
      );
    });
  };

 // Zigaretten-Investment-Vergleich Page
const ZigarettenPage = () => {
  const [raucherProfil, setRaucherProfil] = useState({
    zigarettenProTag: 20,
    preisProSchachtel: 8,
    jahreGeraucht: 10,
    startJahr: 2014
  });

  const [selectedInvestment, setSelectedInvestment] = useState('mix');
  const [showDetails, setShowDetails] = useState(false);

  // Historische Renditen (realistische Durchschnittswerte)
  const investmentRenditen = {
    aktienMSCI: {
      name: 'MSCI World ETF',
      jahresrendite: 0.085, // 8.5% p.a. Durchschnitt
      historisch: {
        2014: 0.195, 2015: 0.102, 2016: 0.075, 2017: 0.078,
        2018: -0.042, 2019: 0.276, 2020: 0.061, 2021: 0.218,
        2022: -0.128, 2023: 0.197, 2024: 0.152
      }
    },
    immobilien: {
      name: 'Deutsche Immobilien',
      jahresrendite: 0.065, // 6.5% p.a. Durchschnitt
      historisch: {
        2014: 0.045, 2015: 0.052, 2016: 0.068, 2017: 0.071,
        2018: 0.084, 2019: 0.092, 2020: 0.078, 2021: 0.143,
        2022: 0.035, 2023: -0.045, 2024: 0.022
      }
    },
    bitcoin: {
      name: 'Bitcoin',
      jahresrendite: 0.73, // Sehr volatil
      historisch: {
        2014: -0.58, 2015: 0.35, 2016: 1.25, 2017: 13.0,
        2018: -0.73, 2019: 0.87, 2020: 3.03, 2021: 0.59,
        2022: -0.64, 2023: 1.56, 2024: 0.45
      },
      startPreis: 770, // USD in 2014
      aktuellerPreis: 95000 // USD in 2024
    },
    tagesgeld: {
      name: 'Tagesgeld/Sparbuch',
      jahresrendite: 0.015, // 1.5% p.a. Durchschnitt
      historisch: {
        2014: 0.009, 2015: 0.006, 2016: 0.002, 2017: 0.001,
        2018: 0.001, 2019: 0.001, 2020: 0.001, 2021: 0.001,
        2022: 0.005, 2023: 0.032, 2024: 0.035
      }
    },
    sp500: {
      name: 'S&P 500',
      jahresrendite: 0.102, // 10.2% p.a. Durchschnitt
      historisch: {
        2014: 0.115, 2015: -0.007, 2016: 0.096, 2017: 0.194,
        2018: -0.064, 2019: 0.288, 2020: 0.162, 2021: 0.267,
        2022: -0.181, 2023: 0.242, 2024: 0.233
      }
    }
  };

  // Berechnung der gesparten Summe
  const berechneGespartesSumme = () => {
    const zigarettenProTag = raucherProfil.zigarettenProTag;
    const preisProZigarette = raucherProfil.preisProSchachtel / 20;
    const täglicheKosten = zigarettenProTag * preisProZigarette;
    const monatlicheKosten = täglicheKosten * 30;
    const jährlicheKosten = täglicheKosten * 365;
    const gesamtKosten = jährlicheKosten * raucherProfil.jahreGeraucht;

    return {
      täglich: täglicheKosten.toFixed(2),
      monatlich: monatlicheKosten.toFixed(2),
      jährlich: jährlicheKosten.toFixed(2),
      gesamt: gesamtKosten.toFixed(2)
    };
  };

  // Investment-Berechnung mit historischen Daten
  const berechneInvestmentWert = (investmentTyp) => {
    const monatlicheErsparnis = parseFloat(berechneGespartesSumme().monatlich);
    let portfolioWert = 0;
    const startJahr = raucherProfil.startJahr;
    const endJahr = startJahr + raucherProfil.jahreGeraucht;

    for (let jahr = startJahr; jahr < endJahr && jahr <= 2024; jahr++) {
      const jahresErsparnis = monatlicheErsparnis * 12;
      const rendite = investmentRenditen[investmentTyp].historisch[jahr] || 
                     investmentRenditen[investmentTyp].jahresrendite;
      
      portfolioWert = (portfolioWert + jahresErsparnis) * (1 + rendite);
    }

    return portfolioWert;
  };

  // Mix-Portfolio berechnen (60% Aktien, 30% Immobilien, 10% Tagesgeld)
  const berechneMixPortfolio = () => {
    const aktienWert = berechneInvestmentWert('aktienMSCI') * 0.6;
    const immobilienWert = berechneInvestmentWert('immobilien') * 0.3;
    const tagesgeldWert = berechneInvestmentWert('tagesgeld') * 0.1;
    
    return aktienWert + immobilienWert + tagesgeldWert;
  };

  const gespartesSumme = berechneGespartesSumme();
  
  // Verschiedene Investment-Szenarien
  const szenarien = [
    {
      typ: 'tagesgeld',
      name: 'Sparbuch (Sicher)',
      wert: berechneInvestmentWert('tagesgeld'),
      risiko: 'Sehr niedrig',
      color: '#10b981'
    },
    {
      typ: 'mix',
      name: 'Ausgewogenes Portfolio',
      wert: berechneMixPortfolio(),
      risiko: 'Mittel',
      color: '#3b82f6'
    },
    {
      typ: 'aktienMSCI',
      name: 'MSCI World ETF',
      wert: berechneInvestmentWert('aktienMSCI'),
      risiko: 'Mittel-Hoch',
      color: '#8b5cf6'
    },
    {
      typ: 'sp500',
      name: 'S&P 500',
      wert: berechneInvestmentWert('sp500'),
      risiko: 'Mittel-Hoch',
      color: '#ec4899'
    },
    {
      typ: 'immobilien',
      name: 'Immobilien-Investment',
      wert: berechneInvestmentWert('immobilien'),
      risiko: 'Mittel',
      color: '#f59e0b'
    },
    {
      typ: 'bitcoin',
      name: 'Bitcoin (Spekulativ)',
      wert: berechneInvestmentWert('bitcoin'),
      risiko: 'Sehr hoch',
      color: '#ef4444'
    }
  ];

  // Gesundheits-Fakten
  const gesundheitsFakten = [
    { zeit: '20 Minuten', effekt: 'Blutdruck normalisiert sich' },
    { zeit: '8 Stunden', effekt: 'Sauerstoffgehalt im Blut normalisiert sich' },
    { zeit: '1 Jahr', effekt: 'Herzinfarktrisiko halbiert' },
    { zeit: '10 Jahre', effekt: 'Lungenkrebsrisiko halbiert' }
  ];

  return (
    <div className={`h-screen bg-gradient-to-br from-emerald-50 to-slate-100 font-sans ${pageTransition ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}>
      <div className="fixed top-0 left-0 right-0 h-32 bg-white/70 backdrop-blur-lg border-b border-slate-200/50 z-50">
        <div className="h-full flex items-center px-8 relative">
          <div className="absolute left-8 top-1/2 transform -translate-y-1/2">
            <h1 className="text-xl font-bold text-slate-800">Zigaretten-Investment-Vergleich</h1>
            <p className="text-sm text-slate-600">Was wäre wenn... Sie nicht geraucht hätten?</p>
            
            <button
              onClick={() => setCurrentPage('overview')}
              className="mt-2 px-3 py-1 bg-slate-700 text-white text-xs rounded-lg hover:bg-slate-800 transition-all"
            >
              🏠 Zur Übersicht
            </button>
          </div>
        </div>
      </div>

      <div className="h-screen flex flex-col pt-32">
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            
            {/* Eingabe-Bereich */}
            <div className="bg-white/90 backdrop-blur-lg rounded-2xl p-6 mb-6 shadow-xl">
              <h3 className="text-lg font-bold mb-4 text-slate-800">Ihr Raucherprofil</h3>
              <div className="grid grid-cols-4 gap-4">
                <div>
                  <label className="text-sm text-gray-600">Zigaretten pro Tag</label>
                  <input
                    type="number"
                    value={raucherProfil.zigarettenProTag}
                    onChange={(e) => setRaucherProfil({...raucherProfil, zigarettenProTag: parseInt(e.target.value) || 0})}
                    className="w-full p-2 border rounded-lg mt-1"
                    min="1"
                    max="60"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-600">Preis pro Schachtel (€)</label>
                  <input
                    type="number"
                    value={raucherProfil.preisProSchachtel}
                    onChange={(e) => setRaucherProfil({...raucherProfil, preisProSchachtel: parseFloat(e.target.value) || 0})}
                    className="w-full p-2 border rounded-lg mt-1"
                    min="1"
                    max="20"
                    step="0.5"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-600">Jahre geraucht</label>
                  <input
                    type="number"
                    value={raucherProfil.jahreGeraucht}
                    onChange={(e) => setRaucherProfil({...raucherProfil, jahreGeraucht: parseInt(e.target.value) || 0})}
                    className="w-full p-2 border rounded-lg mt-1"
                    min="1"
                    max="50"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-600">Start-Jahr</label>
                  <select
                    value={raucherProfil.startJahr}
                    onChange={(e) => setRaucherProfil({...raucherProfil, startJahr: parseInt(e.target.value)})}
                    className="w-full p-2 border rounded-lg mt-1"
                  >
                    {[...Array(11)].map((_, i) => (
                      <option key={i} value={2014 + i}>{2014 + i}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Ersparnis-Übersicht */}
            <div className="grid grid-cols-4 gap-4 mb-6">
              <div className="bg-red-50 rounded-xl p-4 border-2 border-red-200">
                <p className="text-sm text-red-600">Täglich verschwendet</p>
                <p className="text-2xl font-bold text-red-700">{gespartesSumme.täglich}€</p>
              </div>
              <div className="bg-orange-50 rounded-xl p-4 border-2 border-orange-200">
                <p className="text-sm text-orange-600">Monatlich verschwendet</p>
                <p className="text-2xl font-bold text-orange-700">{gespartesSumme.monatlich}€</p>
              </div>
              <div className="bg-yellow-50 rounded-xl p-4 border-2 border-yellow-200">
                <p className="text-sm text-yellow-700">Jährlich verschwendet</p>
                <p className="text-2xl font-bold text-yellow-800">{gespartesSumme.jährlich}€</p>
              </div>
              <div className="bg-green-50 rounded-xl p-4 border-2 border-green-200">
                <p className="text-sm text-green-600">Gesamt verschwendet</p>
                <p className="text-2xl font-bold text-green-700">{gespartesSumme.gesamt}€</p>
              </div>
            </div>

            {/* Investment-Vergleich */}
            <div className="bg-white/90 backdrop-blur-lg rounded-2xl p-6 shadow-xl mb-6">
              <h3 className="text-lg font-bold mb-4 text-slate-800">
                💰 Was aus {gespartesSumme.gesamt}€ geworden wäre...
              </h3>
              <div className="space-y-3">
                {szenarien.map((szenario) => (
                  <div 
                    key={szenario.typ}
                    className="relative bg-gray-50 rounded-lg p-4 hover:shadow-lg transition-all cursor-pointer"
                    onClick={() => setSelectedInvestment(szenario.typ)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-bold text-slate-800">{szenario.name}</h4>
                        <p className="text-sm text-gray-600">Risiko: {szenario.risiko}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold" style={{color: szenario.color}}>
                          {szenario.wert.toLocaleString('de-DE', { 
                            style: 'currency', 
                            currency: 'EUR',
                            maximumFractionDigits: 0 
                          })}
                        </p>
                        <p className="text-sm text-gray-600">
                          Gewinn: {(szenario.wert - parseFloat(gespartesSumme.gesamt)).toLocaleString('de-DE', { 
                            style: 'currency', 
                            currency: 'EUR',
                            maximumFractionDigits: 0 
                          })}
                        </p>
                      </div>
                    </div>
                    
                    {/* Fortschrittsbalken */}
                    <div className="mt-3 w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                      <div 
                        className="h-full transition-all duration-1000"
                        style={{
                          width: `${Math.min((szenario.wert / Math.max(...szenarien.map(s => s.wert))) * 100, 100)}%`,
                          backgroundColor: szenario.color
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Gesundheits-Benefits */}
            <div className="bg-green-50 rounded-2xl p-6 shadow-xl">
              <h3 className="text-lg font-bold mb-4 text-green-800">
                ❤️ Zusätzliche Gesundheitsvorteile nach dem Rauchstopp
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {gesundheitsFakten.map((fakt, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <span className="text-green-600 text-xl">✓</span>
                    <div>
                      <p className="font-semibold text-green-800">{fakt.zeit}</p>
                      <p className="text-sm text-gray-700">{fakt.effekt}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <NavigationButtons />
    </div>
  );
};


  // Overview Page
  const OverviewPage = () => (
    <div className={`h-screen w-full bg-gradient-to-br from-emerald-50 to-slate-100 overflow-hidden font-sans relative ${pageTransition ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}>
      
      <div className="absolute inset-0 pointer-events-none z-0">
        <img 
          src="http://unitedhandscapital.de/wp-content/uploads/2025/07/Firefly_Ein-inspirierendes-modernes-Bild-das-ganzheitliche-Beratung-symbolisiert-Eine-Bera-781677-scaled.jpg"
          alt="United Hands Capital Logo"
          className="w-full h-full object-cover opacity-10"
        />
      </div>

      <div className="bg-white/70 backdrop-blur-lg border-b border-slate-200/50 relative z-10">
        <div className="grid grid-cols-3 items-center px-8 py-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">United Hands Capital</h1>
            <p className="text-slate-600 font-medium">Finanzberatungstool</p>
          </div>

          <div className="text-center">
            <p className="text-sm text-slate-500 uppercase tracking-wider font-medium">Gesamtbudget</p>
            <p className="text-3xl font-bold" style={{color: '#004225'}}>{calculateBudget().toLocaleString()} €</p>
          </div>

          <div className="flex justify-end">
      <button
        onClick={() => setCurrentPage('zigaretten')}
        className="px-4 py-2 bg-white0 text-black text-sm rounded-lg transition-all duration-300 flex items-left gap-2 opacity-0 hover:opacity-100"
      >
        ⏮️
      </button>

          </div>
        </div>
      </div>
      
      <div className="flex-1 flex items-center justify-center relative z-10" style={{ height: 'calc(100vh - 120px - 33.333vh)' }}>
        <div className="flex w-full max-w-6xl justify-center items-center px-8 gap-8">
          <div 
            className="flex justify-center animate-fadeIn"
            onClick={() => setCurrentPage('basisabsicherung')}
          >
            <div className="bg-white/70 backdrop-blur-lg rounded-2xl border border-slate-200/50 p-6 hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-105 w-60 flex items-center justify-center">
              <svg width="160" height="160" className="overflow-visible">
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
                
                <g style={{
                  animation: 'umbrella-gentle-sway 4s ease-in-out infinite',
                  transformOrigin: '80px 35px'
                }}>
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

          <div className="flex justify-center">
            <div className="relative animate-fadeIn" style={{ animationDelay: '0.2s' }}>
              <svg width="450" height="450" viewBox="0 0 450 450">
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
                <text x="225" y="215" textAnchor="middle" className="text-sm font-medium fill-slate-600 pointer-events-none">
                  Budget
                </text>
                <text x="225" y="238" textAnchor="middle" className="text-xl font-bold pointer-events-none" style={{fill: '#004225'}}>
                  {calculateBudget().toLocaleString()}€
                </text>
              </svg>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="bg-white/70 backdrop-blur-lg rounded-2xl border border-slate-200/50 p-4 animate-fadeIn hover:shadow-xl transition-shadow duration-300 w-60" style={{ animationDelay: '0.3s' }}>
              <h3 className="text-lg font-bold mb-3 text-slate-900 text-center">Budget-Verteilung</h3>
              <div className="space-y-2">
                {[
                  { name: 'Fixkosten', value: percentages.fixkosten, color: '#004225' },
                  { name: 'Lifestyle', value: percentages.lifestyle, color: '#1f5f3f' },
                  { name: 'Sicherheit', value: percentages.sicherheit, color: '#4d7c5f' },
                  { name: 'Überschuss/Defizit', value: percentages.ueberschuss, color: percentages.ueberschuss < 0 ? '#ef4444' : '#10b981' }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between gap-3 hover:bg-slate-50 p-1 rounded transition-colors">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-sm" style={{backgroundColor: item.color}}></div>
                      <span className="text-xs font-medium text-slate-700">{item.name}</span>
                    </div>
                    <span className="text-xs font-bold text-slate-900">{item.value.toFixed(1)}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="absolute right-8 top-1/2 transform -translate-y-1/2">
          <Sidebar />
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

 // BASIS ABSICHERUNG PAGE - Pop-Up Modal Version mit grünem Hintergrund
const BasisAbsicherungPage = () => {
  const [activeField, setActiveField] = useState(null);
  const [tempBasis, setTempBasis] = useState({ ...basisData });

  const calculateKategorieTotal = (kategorie) => {
    return tempBasis[kategorie].reduce((sum, item) => sum + (parseFloat(item.betrag) || 0), 0);
  };

  const addEintrag = (kategorie) => {
    setTempBasis(prev => ({
      ...prev,
      [kategorie]: [...prev[kategorie], { bezeichnung: '', betrag: 0 }]
    }));
  };

  const removeEintrag = (kategorie, index) => {
    setTempBasis(prev => ({
      ...prev,
      [kategorie]: prev[kategorie].filter((_, i) => i !== index)
    }));
  };

  const updateEintrag = (kategorie, index, field, value) => {
    setTempBasis(prev => ({
      ...prev,
      [kategorie]: prev[kategorie].map((item, i) => 
        i === index ? { ...item, [field]: field === 'betrag' ? (parseFloat(value) || 0) : value } : item
      )
    }));
  };

  const handleSave = () => {
    setBasisData(tempBasis);
    setActiveField(null);
  };

  const handleCancel = () => {
    setTempBasis({ ...basisData });
    setActiveField(null);
  };

  // Berechne Gesamtsumme für die Hauptüberschrift
  const calculateGesamtSumme = () => {
    return Object.keys(tempBasis).reduce((total, key) => {
      return total + calculateKategorieTotal(key);
    }, 0);
  };

  const basisKategorien = [
    { id: 'krankenversicherung', name: 'Krankenversicherung', icon: '🏥' },
    { id: 'pflegeversicherung', name: 'Pflegeversicherung', icon: '❤️' },
    { id: 'arbeitslosenversicherung', name: 'Arbeitslosenversicherung', icon: '💼' },
    { id: 'rentenversicherung', name: 'Rentenversicherung', icon: '👴' }
  ];

  return (
    <div className="h-screen bg-gradient-to-br from-emerald-50 to-slate-100 font-sans">
      <HeaderBars />
      
      <div className="h-screen flex flex-col">
        <div className="h-1/4"></div>
        
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="h-full flex flex-col">
            
            {/* Hauptüberschrift - identisches Layout wie Fixkosten */}
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-slate-800 mb-2">🛡️ Basis Absicherung</h1>
              <p className="text-lg text-slate-600 mb-4">Ihre grundlegenden Versicherungen und Absicherungen</p>
              <p className="text-lg text-slate-600">Gesamtsumme: {calculateGesamtSumme().toLocaleString()}€</p>
            </div>
            
            {/* Kreise - identisches Layout wie Fixkosten */}
            <div className="flex-shrink-0 flex justify-center items-center py-8">
              <div className="flex space-x-16">
                {basisKategorien.map((kategorie) => (
                  <div key={kategorie.id} className="flex flex-col items-center">
                    <div 
                      className={`w-48 h-48 rounded-full border-4 flex flex-col items-center justify-center cursor-pointer transition-all hover:scale-105 ${
                        activeField === kategorie.id 
                          ? 'text-white shadow-xl' 
                          : 'bg-white text-slate-700 hover:border-blue-400 shadow-lg'
                      }`}
                      style={{
                        backgroundColor: activeField === kategorie.id ? '#047857' : 'white',
                        borderColor: activeField === kategorie.id ? '#047857' : '#cbd5e1'
                      }}
                      onClick={() => {
                        if (activeField !== kategorie.id) {
                          setActiveField(kategorie.id);
                          setTempBasis({...basisData});
                        }
                      }}
                    >
                      <span className="text-3xl mb-2">{kategorie.icon}</span>
                      <span className="text-lg font-semibold text-center px-4 leading-tight">
                        {kategorie.name}
                      </span>
                      <span className="text-2xl font-bold mt-2">
                        {calculateKategorieTotal(kategorie.id).toLocaleString()}€
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pop-Up Modal - identisches Layout wie Fixkosten */}
      {activeField && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={() => setActiveField(null)}
        >
          <div 
            className="bg-white/90 backdrop-blur-lg rounded-2xl border border-slate-200/50 p-8 w-full max-w-3xl shadow-xl mx-8 max-h-[500px] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {(() => {
              const aktiveKategorie = basisKategorien.find(k => k.id === activeField);
              return (
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-slate-800 text-center">
                    {aktiveKategorie.icon} {aktiveKategorie.name}
                  </h3>
                  
                  <div className="space-y-4">
                    {tempBasis[activeField].map((eintrag, index) => (
                      <div key={index} className="flex gap-3 items-center">
                        <input 
                          type="text"
                          value={eintrag.bezeichnung}
                          onChange={(e) => updateEintrag(activeField, index, 'bezeichnung', e.target.value)}
                          placeholder="Bezeichnung"
                          className="flex-1 p-3 bg-white border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-400 focus:border-transparent outline-none"
                        />
                        <input 
                          type="number"
                          value={eintrag.betrag}
                          onChange={(e) => updateEintrag(activeField, index, 'betrag', e.target.value)}
                          placeholder="0"
                          className="w-32 p-3 bg-white border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-400 focus:border-transparent outline-none text-right"
                        />
                        <span className="text-lg font-semibold">€</span>
                        {tempBasis[activeField].length > 1 && (
                          <button
                            onClick={() => removeEintrag(activeField, index)}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            ✕
                          </button>
                        )}
                      </div>
                    ))}
                    
                    <button
                      onClick={() => addEintrag(activeField)}
                      className="w-full p-3 border-2 border-dashed border-slate-300 rounded-lg hover:border-slate-400 hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
                    >
                      <span className="text-2xl">+</span>
                      <span className="font-semibold">Neuen Eintrag hinzufügen</span>
                    </button>
                  </div>
                  
                  <div className="border-t-2 border-slate-200 pt-4">
                    <div className="flex justify-between items-center text-lg font-bold">
                      <span>Gesamtsumme:</span>
                      <span className="text-slate-700">
                        {calculateKategorieTotal(activeField).toLocaleString()}€
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-4 justify-center">
                    <button 
                      onClick={handleSave}
                      className="px-8 py-3 text-base font-semibold text-white bg-emerald-600 rounded-xl transition-colors shadow-md hover:shadow-lg hover:bg-emerald-700"
                    >
                      Speichern
                    </button>
                    <button 
                      onClick={handleCancel}
                      className="px-8 py-3 text-base font-semibold bg-slate-300 hover:bg-slate-400 text-slate-700 rounded-xl transition-colors shadow-md"
                    >
                      Zurück
                    </button>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}

      <Sidebar /> 
      <NavigationButtons />
    </div>
  );
};

  // BudgetPage
  const BudgetPage = () => {
    const [activeField, setActiveField] = useState(null);
    const [tempBudget, setTempBudget] = useState({...budgetData});

    const calculateKategorieTotal = (kategorie) => {
      return tempBudget[kategorie].reduce((sum, item) => sum + (parseFloat(item.betrag) || 0), 0);
    };

    const addEintrag = (kategorie) => {
      setTempBudget(prev => ({
        ...prev,
        [kategorie]: [...prev[kategorie], { bezeichnung: '', betrag: 0 }]
      }));
    };

    const removeEintrag = (kategorie, index) => {
      setTempBudget(prev => ({
        ...prev,
        [kategorie]: prev[kategorie].filter((_, i) => i !== index)
      }));
    };

    const updateEintrag = (kategorie, index, field, value) => {
      setTempBudget(prev => ({
        ...prev,
        [kategorie]: prev[kategorie].map((item, i) => 
          i === index ? { ...item, [field]: field === 'betrag' ? (parseFloat(value) || 0) : value } : item
        )
      }));
    };

    const handleSave = () => {
      setBudgetData(tempBudget);
      const newTotal = Object.keys(tempBudget).reduce((total, key) => {
        return total + calculateKategorieTotal(key);
      }, 0);
      setFinanzData(prev => ({ ...prev, budget: newTotal }));
      setActiveField(null);
    };

    const handleCancel = () => {
      setTempBudget({...budgetData});
      setActiveField(null);
    };

    const budgetKategorien = [
      { id: 'einnahmen', name: 'Einnahmen', icon: '💶' },
      { id: 'ausgaben', name: 'Ausgaben', icon: '💸' },
      { id: 'investitionen', name: 'Investitionen', icon: '📈' },
      { id: 'ruecklagen', name: 'Rücklagen', icon: '🏦' }
    ];

    return (
      <div className="h-screen bg-gradient-to-br from-emerald-50 to-slate-100 font-sans">
        <HeaderBars />
        
        <div className="h-screen flex flex-col">
          <div className="h-1/4"></div>
          
          <div className="flex-1 p-8 overflow-y-auto">
            <div className="h-full flex flex-col">
              
              <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-slate-800 mb-2">💰 Budget</h1>
                <p className="text-lg text-slate-600 mt-2">Erfassen Sie Ihr monatliches Budget</p>
                <p className="text-lg text-slate-600">Gesamtsumme: {finanzData.budget?.toLocaleString() || 0}€</p>
              </div>
              
              <div className="flex-shrink-0 flex justify-center items-center py-8">
                <div className="flex space-x-16">
                  {budgetKategorien.map((kategorie) => (
                    <div key={kategorie.id} className="flex flex-col items-center">
                      <div 
                        className={`w-48 h-48 rounded-full border-4 flex flex-col items-center justify-center cursor-pointer transition-all hover:scale-105 ${
                          activeField === kategorie.id 
                            ? 'text-white shadow-xl' 
                            : 'bg-white text-slate-700 hover:border-blue-400 shadow-lg'
                        }`}
                        style={{
                          backgroundColor: activeField === kategorie.id ? '#065f46' : 'white',
                          borderColor: activeField === kategorie.id ? '#065f46' : '#cbd5e1'
                        }}
                        onClick={() => {
                          if (activeField !== kategorie.id) {
                            setActiveField(kategorie.id);
                            setTempBudget({...budgetData});
                          }
                        }}
                      >
                        <span className="text-3xl mb-2">{kategorie.icon}</span>
                        <span className="text-lg font-semibold text-center px-4 leading-tight">
                          {kategorie.name}
                        </span>
                        <span className="text-2xl font-bold mt-2">
                          {calculateKategorieTotal(kategorie.id).toLocaleString()}€
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {activeField && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            onClick={() => setActiveField(null)}
          >
            <div 
              className="bg-white/90 backdrop-blur-lg rounded-2xl border border-slate-200/50 p-8 w-full max-w-3xl shadow-xl mx-8 max-h-[500px] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {(() => {
                const aktiveKategorie = budgetKategorien.find(k => k.id === activeField);
                return (
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-slate-800 text-center">
                      {aktiveKategorie.icon} {aktiveKategorie.name}
                    </h3>
                    
                    <div className="space-y-4">
                      {tempBudget[activeField].map((eintrag, index) => (
                        <div key={index} className="flex gap-3 items-center">
                          <input 
                            type="text"
                            value={eintrag.bezeichnung}
                            onChange={(e) => updateEintrag(activeField, index, 'bezeichnung', e.target.value)}
                            placeholder="Bezeichnung"
                            className="flex-1 p-3 bg-white border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-400 focus:border-transparent outline-none"
                          />
                          <input 
                            type="number"
                            value={eintrag.betrag}
                            onChange={(e) => updateEintrag(activeField, index, 'betrag', e.target.value)}
                            placeholder="0"
                            className="w-32 p-3 bg-white border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-400 focus:border-transparent outline-none text-right"
                          />
                          <span className="text-lg font-semibold">€</span>
                          {tempBudget[activeField].length > 1 && (
                            <button
                              onClick={() => removeEintrag(activeField, index)}
                              className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              ✕
                            </button>
                          )}
                        </div>
                      ))}
                      
                      <button
                        onClick={() => addEintrag(activeField)}
                        className="w-full p-3 border-2 border-dashed border-slate-300 rounded-lg hover:border-slate-400 hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
                      >
                        <span className="text-2xl">+</span>
                        <span className="font-semibold">Neuen Eintrag hinzufügen</span>
                      </button>
                    </div>
                    
                    <div className="border-t-2 border-slate-200 pt-4">
                      <div className="flex justify-between items-center text-lg font-bold">
                        <span>Gesamtsumme:</span>
                        <span className="text-slate-700">
                          {calculateKategorieTotal(activeField).toLocaleString()}€
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex space-x-4 justify-center">
                      <button 
                        onClick={handleSave}
                        className="px-8 py-3 text-base font-semibold text-white bg-slate-500 rounded-xl transition-colors shadow-md hover:shadow-lg hover:bg-slate-600"
                      >
                        Speichern
                      </button>
                      <button 
                        onClick={handleCancel}
                        className="px-8 py-3 text-base font-semibold bg-slate-300 hover:bg-slate-400 text-slate-700 rounded-xl transition-colors shadow-md"
                      >
                        Zurück
                      </button>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        )}

        <Sidebar />
        <NavigationButtons />
      </div>
    );
  };

 // FIXKOSTEN PAGE - Pop-Up Modal Version
const FixkostenPage = () => {
  const [activeField, setActiveField] = useState(null);
  const [tempFixkosten, setTempFixkosten] = useState({...fixkostenData});

  const calculateKategorieTotal = (kategorie) => {
    return tempFixkosten[kategorie].reduce((sum, item) => sum + (parseFloat(item.betrag) || 0), 0);
  };

  const addEintrag = (kategorie) => {
    setTempFixkosten(prev => ({
      ...prev,
      [kategorie]: [...prev[kategorie], { bezeichnung: '', betrag: 0 }]
    }));
  };

  const removeEintrag = (kategorie, index) => {
    setTempFixkosten(prev => ({
      ...prev,
      [kategorie]: prev[kategorie].filter((_, i) => i !== index)
    }));
  };

  const updateEintrag = (kategorie, index, field, value) => {
    setTempFixkosten(prev => ({
      ...prev,
      [kategorie]: prev[kategorie].map((item, i) => 
        i === index ? { ...item, [field]: field === 'betrag' ? (parseFloat(value) || 0) : value } : item
      )
    }));
  };

  const handleSave = () => {
    setFixkostenData(tempFixkosten);
    const newTotal = Object.keys(tempFixkosten).reduce((total, key) => {
      return total + calculateKategorieTotal(key);
    }, 0);
    setFinanzData(prev => ({ ...prev, fixkostenTotal: newTotal }));
    setActiveField(null);
  };

  const handleCancel = () => {
    setTempFixkosten({...fixkostenData});
    setActiveField(null);
  };

  const fixkostenKategorien = [
    { id: 'wohnen', name: 'Wohnen', icon: '🏠' },
    { id: 'lebensmittel', name: 'Lebensmittel', icon: '🛒' },
    { id: 'abos', name: 'Abos', icon: '📱' },
    { id: 'mobilitaet', name: 'Mobilität', icon: '🚗' },
    { id: 'sonstiges', name: 'Sonstiges', icon: '📋' }
  ];

  return (
    <div className="h-screen bg-gradient-to-br from-emerald-50 to-slate-100 font-sans">
      <HeaderBars />
      
      <div className="h-screen flex flex-col">
        <div className="h-1/4"></div>
        
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="h-full flex flex-col">
            
            {/* Hauptüberschrift */}
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-slate-800 mb-2">💶 Fixkosten</h1>
              <p className="text-lg text-slate-600 mb-4">Erfassen Sie Ihre regelmäßigen monatlichen Ausgaben</p>
              <p className="text-lg text-slate-600">Gesamtsumme: {finanzData.fixkostenTotal.toLocaleString()}€</p>
            </div>
            
            <div className="flex-shrink-0 flex justify-center items-center py-8">
              <div className="flex space-x-16">
                {fixkostenKategorien.map((kategorie) => (
                  <div key={kategorie.id} className="flex flex-col items-center">
                    <div 
                      className={`w-48 h-48 rounded-full border-4 flex flex-col items-center justify-center cursor-pointer transition-all hover:scale-105 ${
                        activeField === kategorie.id 
                          ? 'text-white shadow-xl' 
                          : 'bg-white text-slate-700 hover:border-blue-400 shadow-lg'
                      }`}
                      style={{
                        backgroundColor: activeField === kategorie.id ? '#004225' : 'white',
                        borderColor: activeField === kategorie.id ? '#004225' : '#cbd5e1'
                      }}
                      onClick={() => {
                        if (activeField !== kategorie.id) {
                          setActiveField(kategorie.id);
                          setTempFixkosten({...fixkostenData});
                        }
                      }}
                    >
                      <span className="text-3xl mb-2">{kategorie.icon}</span>
                      <span className="text-lg font-semibold text-center px-4 leading-tight">
                        {kategorie.name}
                      </span>
                      <span className="text-2xl font-bold mt-2">
                        {calculateKategorieTotal(kategorie.id).toLocaleString()}€
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pop-Up Modal */}
      {activeField && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={() => setActiveField(null)}
        >
          <div 
            className="bg-white/90 backdrop-blur-lg rounded-2xl border border-slate-200/50 p-8 w-full max-w-3xl shadow-xl mx-8 max-h-[500px] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {(() => {
              const aktiveKategorie = fixkostenKategorien.find(k => k.id === activeField);
              return (
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-slate-800 text-center">
                    {aktiveKategorie.icon} {aktiveKategorie.name}
                  </h3>
                  
                  <div className="space-y-4">
                    {tempFixkosten[activeField].map((eintrag, index) => (
                      <div key={index} className="flex gap-3 items-center">
                        <input 
                          type="text"
                          value={eintrag.bezeichnung}
                          onChange={(e) => updateEintrag(activeField, index, 'bezeichnung', e.target.value)}
                          placeholder="Bezeichnung"
                          className="flex-1 p-3 bg-white border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-400 focus:border-transparent outline-none"
                        />
                        <input 
                          type="number"
                          value={eintrag.betrag}
                          onChange={(e) => updateEintrag(activeField, index, 'betrag', e.target.value)}
                          placeholder="0"
                          className="w-32 p-3 bg-white border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-400 focus:border-transparent outline-none text-right"
                        />
                        <span className="text-lg font-semibold">€</span>
                        {tempFixkosten[activeField].length > 1 && (
                          <button
                            onClick={() => removeEintrag(activeField, index)}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            ✕
                          </button>
                        )}
                      </div>
                    ))}
                    
                    <button
                      onClick={() => addEintrag(activeField)}
                      className="w-full p-3 border-2 border-dashed border-slate-300 rounded-lg hover:border-slate-400 hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
                    >
                      <span className="text-2xl">+</span>
                      <span className="font-semibold">Neuen Eintrag hinzufügen</span>
                    </button>
                  </div>
                  
                  <div className="border-t-2 border-slate-200 pt-4">
                    <div className="flex justify-between items-center text-lg font-bold">
                      <span>Gesamtsumme:</span>
                      <span className="text-slate-700">
                        {calculateKategorieTotal(activeField).toLocaleString()}€
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-4 justify-center">
                    <button 
                      onClick={handleSave}
                      className="px-8 py-3 text-base font-semibold text-white bg-slate-500 rounded-xl transition-colors shadow-md hover:shadow-lg hover:bg-slate-600"
                    >
                      Speichern
                    </button>
                    <button 
                      onClick={handleCancel}
                      className="px-8 py-3 text-base font-semibold bg-slate-300 hover:bg-slate-400 text-slate-700 rounded-xl transition-colors shadow-md"
                    >
                      Zurück
                    </button>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}

      <Sidebar /> 
      <NavigationButtons />
    </div>
  );
};


// LIFESTYLE PAGE - Pop-Up Modal Version
const LifestylePage = () => {
  const [activeField, setActiveField] = useState(null);
  const [tempLifestyle, setTempLifestyle] = useState({...lifestyleData});

  const calculateKategorieTotal = (kategorie) => {
    return tempLifestyle[kategorie].reduce((sum, item) => sum + (parseFloat(item.betrag) || 0), 0);
  };

  const addEintrag = (kategorie) => {
    setTempLifestyle(prev => ({
      ...prev,
      [kategorie]: [...prev[kategorie], { bezeichnung: '', betrag: 0 }]
    }));
  };

  const removeEintrag = (kategorie, index) => {
    setTempLifestyle(prev => ({
      ...prev,
      [kategorie]: prev[kategorie].filter((_, i) => i !== index)
    }));
  };

  const updateEintrag = (kategorie, index, field, value) => {
    setTempLifestyle(prev => ({
      ...prev,
      [kategorie]: prev[kategorie].map((item, i) => 
        i === index ? { ...item, [field]: field === 'betrag' ? (parseFloat(value) || 0) : value } : item
      )
    }));
  };

  const handleSave = () => {
    setLifestyleData(tempLifestyle);
    const newTotal = Object.keys(tempLifestyle).reduce((total, key) => {
      return total + calculateKategorieTotal(key);
    }, 0);
    setFinanzData(prev => ({ ...prev, lifestyleTotal: newTotal }));
    setActiveField(null);
  };

  const handleCancel = () => {
    setTempLifestyle({...lifestyleData});
    setActiveField(null);
  };

  const lifestyleKategorien = [
    { id: 'freizeit', name: 'Freizeit', icon: '🎭' },
    { id: 'restaurant', name: 'Restaurant', icon: '🍽️' },
    { id: 'shopping', name: 'Shopping', icon: '🛍️' },
    { id: 'wellness', name: 'Wellness', icon: '💆' },
    { id: 'hobbies', name: 'Hobbies', icon: '🎨' }
  ];

  return (
    <div className="h-screen bg-gradient-to-br from-emerald-50 to-slate-100 font-sans">
      <HeaderBars />
      
      <div className="h-screen flex flex-col">
        <div className="h-1/4"></div>
        
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="h-full flex flex-col">
            
            {/* Hauptüberschrift */}
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-slate-800 mb-2">🎨 Lifestyle</h1>
              <p className="text-lg text-slate-600 mb-4">Erfassen Sie Ihre Lifestyle-Ausgaben</p>
              <p className="text-lg text-slate-600">Gesamtsumme: {finanzData.lifestyleTotal.toLocaleString()}€</p>
            </div>
            
            <div className="flex-shrink-0 flex justify-center items-center py-8">
              <div className="flex space-x-16">
                {lifestyleKategorien.map((kategorie) => (
                  <div key={kategorie.id} className="flex flex-col items-center">
                    <div 
                      className={`w-48 h-48 rounded-full border-4 flex flex-col items-center justify-center cursor-pointer transition-all hover:scale-105 ${
                        activeField === kategorie.id 
                          ? 'text-white shadow-xl' 
                          : 'bg-white text-slate-700 hover:border-slate-500 shadow-lg'
                      }`}
                      style={{
                        backgroundColor: activeField === kategorie.id ? '#64748b' : 'white',
                        borderColor: activeField === kategorie.id ? '#64748b' : '#cbd5e1'
                      }}
                      onClick={() => {
                        if (activeField !== kategorie.id) {
                          setActiveField(kategorie.id);
                          setTempLifestyle({...lifestyleData});
                        }
                      }}
                    >
                      <span className="text-3xl mb-2">{kategorie.icon}</span>
                      <span className="text-lg font-semibold text-center px-4 leading-tight">
                        {kategorie.name}
                      </span>
                      <span className="text-2xl font-bold mt-2">
                        {calculateKategorieTotal(kategorie.id).toLocaleString()}€
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pop-Up Modal */}
      {activeField && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={() => setActiveField(null)}
        >
          <div 
            className="bg-white/90 backdrop-blur-lg rounded-2xl border border-slate-200/50 p-8 w-full max-w-3xl shadow-xl mx-8 max-h-[500px] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {(() => {
              const aktiveKategorie = lifestyleKategorien.find(k => k.id === activeField);
              return (
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-slate-800 text-center">
                    {aktiveKategorie.icon} {aktiveKategorie.name} - Ausgaben
                  </h3>
                  
                  <div className="space-y-4">
                    {tempLifestyle[activeField].map((eintrag, index) => (
                      <div key={index} className="flex gap-3 items-center">
                        <input 
                          type="text"
                          value={eintrag.bezeichnung}
                          onChange={(e) => updateEintrag(activeField, index, 'bezeichnung', e.target.value)}
                          placeholder="Bezeichnung"
                          className="flex-1 p-3 bg-white border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent outline-none"
                        />
                        <input 
                          type="number"
                          value={eintrag.betrag}
                          onChange={(e) => updateEintrag(activeField, index, 'betrag', e.target.value)}
                          placeholder="0"
                          className="w-32 p-3 bg-white border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent outline-none text-right"
                        />
                        <span className="text-lg font-semibold">€</span>
                        {tempLifestyle[activeField].length > 1 && (
                          <button
                            onClick={() => removeEintrag(activeField, index)}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            ✕
                          </button>
                        )}
                      </div>
                    ))}
                    
                    <button
                      onClick={() => addEintrag(activeField)}
                      className="w-full p-3 border-2 border-dashed border-slate-300 rounded-lg hover:border-slate-500 hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
                    >
                      <span className="text-2xl">+</span>
                      <span className="font-semibold">Neue Ausgabe hinzufügen</span>
                    </button>
                  </div>
                  
                  <div className="border-t-2 border-slate-200 pt-4">
                    <div className="flex justify-between items-center text-lg font-bold">
                      <span>Gesamtsumme:</span>
                      <span className="text-slate-700">
                        {calculateKategorieTotal(activeField).toLocaleString()}€
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-4 justify-center">
                    <button 
                      onClick={handleSave}
                      className="px-8 py-3 text-base font-semibold text-white bg-slate-600 rounded-xl transition-colors shadow-md hover:shadow-lg hover:bg-slate-700"
                    >
                      Speichern
                    </button>
                    <button 
                      onClick={handleCancel}
                      className="px-8 py-3 text-base font-semibold bg-slate-300 hover:bg-slate-400 text-slate-700 rounded-xl transition-colors shadow-md"
                    >
                      Zurück
                    </button>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}

      <Sidebar />
      <NavigationButtons />
    </div>
  );
};

// SICHERHEIT PAGE - Pop-Up Modal Version
const SicherheitPage = () => {
  const [activeField, setActiveField] = useState(null);
  const [tempSicherheit, setTempSicherheit] = useState({ ...sicherheitData });

  const calculateKategorieTotal = (kategorie) => {
    return tempSicherheit[kategorie].reduce((sum, item) => sum + (parseFloat(item.betrag) || 0), 0);
  };

  const addEintrag = (kategorie) => {
    setTempSicherheit(prev => ({
      ...prev,
      [kategorie]: [...prev[kategorie], { bezeichnung: '', betrag: 0 }]
    }));
  };

  const removeEintrag = (kategorie, index) => {
    setTempSicherheit(prev => ({
      ...prev,
      [kategorie]: prev[kategorie].filter((_, i) => i !== index)
    }));
  };

  const updateEintrag = (kategorie, index, field, value) => {
    setTempSicherheit(prev => ({
      ...prev,
      [kategorie]: prev[kategorie].map((item, i) =>
        i === index ? { ...item, [field]: field === 'betrag' ? (parseFloat(value) || 0) : value } : item
      )
    }));
  };

  const handleSave = () => {
    setSicherheitData(tempSicherheit);
    const newTotal = Object.keys(tempSicherheit).reduce((total, key) => {
      return total + calculateKategorieTotal(key);
    }, 0);
    setFinanzData(prev => ({ ...prev, sicherheit: newTotal }));
    setActiveField(null);
  };

  const handleCancel = () => {
    setTempSicherheit({ ...sicherheitData });
    setActiveField(null);
  };

  const sicherheitKategorien = [
    { id: 'notgroschen', name: 'Notgroschen', icon: '💰' },
    { id: 'versicherungen', name: 'Versicherungen', icon: '🛡️' },
    { id: 'altersvorsorge', name: 'Altersvorsorge', icon: '👴' },
    { id: 'gesundheit', name: 'Gesundheit', icon: '⚕️' },
    { id: 'sparen', name: 'Sparen', icon: '🏦' }
  ];

  return (
    <div className="h-screen bg-gradient-to-br from-emerald-50 to-slate-100 font-sans">
      <HeaderBars />

      <div className="h-screen flex flex-col">
        <div className="h-1/4"></div>
        
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="h-full flex flex-col">
            
            {/* Hauptüberschrift */}
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-slate-800 mb-2">🛡️ Sicherheit</h1>
              <p className="text-lg text-slate-600 mb-4">Erfassen Sie Ihre Sicherheitsrücklagen</p>
              <p className="text-lg text-slate-600">Gesamtsumme: {finanzData.sicherheit?.toLocaleString() || 0}€</p>
            </div>
            
            <div className="flex-shrink-0 flex justify-center items-center py-8">
              <div className="flex space-x-16">
                {sicherheitKategorien.map((kategorie) => (
                  <div key={kategorie.id} className="flex flex-col items-center">
                    <div 
                      className={`w-48 h-48 rounded-full border-4 flex flex-col items-center justify-center cursor-pointer transition-all hover:scale-105 ${
                        activeField === kategorie.id 
                          ? 'text-white shadow-xl' 
                          : 'bg-white text-slate-700 hover:border-blue-400 shadow-lg'
                      }`}
                      style={{
                        backgroundColor: activeField === kategorie.id ? '#047857' : 'white',
                        borderColor: activeField === kategorie.id ? '#047857' : '#cbd5e1'
                      }}
                      onClick={() => {
                        if (activeField !== kategorie.id) {
                          setActiveField(kategorie.id);
                          setTempSicherheit({...sicherheitData});
                        }
                      }}
                    >
                      <span className="text-3xl mb-2">{kategorie.icon}</span>
                      <span className="text-lg font-semibold text-center px-4 leading-tight">
                        {kategorie.name}
                      </span>
                      <span className="text-2xl font-bold mt-2">
                        {calculateKategorieTotal(kategorie.id).toLocaleString()}€
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pop-Up Modal */}
      {activeField && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={() => setActiveField(null)}
        >
          <div 
            className="bg-white/90 backdrop-blur-lg rounded-2xl border border-slate-200/50 p-8 w-full max-w-3xl shadow-xl mx-8 max-h-[500px] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {(() => {
              const aktiveKategorie = sicherheitKategorien.find(k => k.id === activeField);
              return (
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-slate-800 text-center">
                    {aktiveKategorie.icon} {aktiveKategorie.name}
                  </h3>
                  
                  <div className="space-y-4">
                    {tempSicherheit[activeField].map((eintrag, index) => (
                      <div key={index} className="flex gap-3 items-center">
                        <input 
                          type="text"
                          value={eintrag.bezeichnung}
                          onChange={(e) => updateEintrag(activeField, index, 'bezeichnung', e.target.value)}
                          placeholder="Bezeichnung"
                          className="flex-1 p-3 bg-white border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-400 focus:border-transparent outline-none"
                        />
                        <input 
                          type="number"
                          value={eintrag.betrag}
                          onChange={(e) => updateEintrag(activeField, index, 'betrag', e.target.value)}
                          placeholder="0"
                          className="w-32 p-3 bg-white border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-400 focus:border-transparent outline-none text-right"
                        />
                        <span className="text-lg font-semibold">€</span>
                        {tempSicherheit[activeField].length > 1 && (
                          <button
                            onClick={() => removeEintrag(activeField, index)}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            ✕
                          </button>
                        )}
                      </div>
                    ))}
                    
                    <button
                      onClick={() => addEintrag(activeField)}
                      className="w-full p-3 border-2 border-dashed border-slate-300 rounded-lg hover:border-slate-400 hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
                    >
                      <span className="text-2xl">+</span>
                      <span className="font-semibold">Neuen Eintrag hinzufügen</span>
                    </button>
                  </div>
                  
                  <div className="border-t-2 border-slate-200 pt-4">
                    <div className="flex justify-between items-center text-lg font-bold">
                      <span>Gesamtsumme:</span>
                      <span className="text-slate-700">
                        {calculateKategorieTotal(activeField).toLocaleString()}€
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-4 justify-center">
                    <button 
                      onClick={handleSave}
                      className="px-8 py-3 text-base font-semibold text-white bg-slate-500 rounded-xl transition-colors shadow-md hover:shadow-lg hover:bg-slate-600"
                    >
                      Speichern
                    </button>
                    <button 
                      onClick={handleCancel}
                      className="px-8 py-3 text-base font-semibold bg-slate-300 hover:bg-slate-400 text-slate-700 rounded-xl transition-colors shadow-md"
                    >
                      Zurück
                    </button>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}

      <Sidebar />
      <NavigationButtons />
    </div>
  );
};

// WÜNSCHE PAGE - Pop-Up Modal Version
const WuenschePage = () => {
  const [activeField, setActiveField] = useState(null);
  const [tempWuensche, setTempWuensche] = useState({ ...wuenscheData });

  const calculateKategorieTotal = (kategorie) => {
    return tempWuensche[kategorie].reduce((sum, item) => sum + (parseFloat(item.betrag) || 0), 0);
  };

  const addEintrag = (kategorie) => {
    setTempWuensche(prev => ({
      ...prev,
      [kategorie]: [...prev[kategorie], { bezeichnung: '', betrag: 0 }]
    }));
  };

  const removeEintrag = (kategorie, index) => {
    setTempWuensche(prev => ({
      ...prev,
      [kategorie]: prev[kategorie].filter((_, i) => i !== index)
    }));
  };

  const updateEintrag = (kategorie, index, field, value) => {
    setTempWuensche(prev => ({
      ...prev,
      [kategorie]: prev[kategorie].map((item, i) =>
        i === index ? { ...item, [field]: field === 'betrag' ? (parseFloat(value) || 0) : value } : item
      )
    }));
  };

  const handleSave = () => {
    setWuenscheData(tempWuensche);
    const newTotal = Object.keys(tempWuensche).reduce((total, key) => {
      return total + calculateKategorieTotal(key);
    }, 0);
    setFinanzData(prev => ({ ...prev, wuenscheTotal: newTotal }));
    setActiveField(null);
  };

  const handleCancel = () => {
    setTempWuensche({ ...wuenscheData });
    setActiveField(null);
  };

  const wuenscheKategorien = [
    { id: 'traumurlaub', name: 'Traumurlaub', icon: '🏝️' },
    { id: 'luxus', name: 'Luxus', icon: '💎' },
    { id: 'erlebnisse', name: 'Erlebnisse', icon: '🎉' },
    { id: 'weiterbildung', name: 'Weiterbildung', icon: '📚' },
    { id: 'geschenke', name: 'Geschenke', icon: '🎁' }
  ];

  return (
    <div className="h-screen bg-gradient-to-br from-emerald-50 to-slate-100 font-sans">
      <HeaderBars />

      <div className="h-screen flex flex-col">
        <div className="h-1/4"></div>
        
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="h-full flex flex-col">
            
            {/* Hauptüberschrift */}
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-slate-800 mb-2">🎁 Wünsche</h1>
              <p className="text-lg text-slate-600 mb-4">Erfassen Sie Ihre Wünsche und Ziele</p>
              <p className="text-lg text-slate-600">Gesamtsumme: {finanzData.wuenscheTotal?.toLocaleString() || 0}€</p>
            </div>
            
            <div className="flex-shrink-0 flex justify-center items-center py-8">
              <div className="flex space-x-16">
                {wuenscheKategorien.map((kategorie) => (
                  <div key={kategorie.id} className="flex flex-col items-center">
                    <div 
                      className={`w-48 h-48 rounded-full border-4 flex flex-col items-center justify-center cursor-pointer transition-all hover:scale-105 ${
                        activeField === kategorie.id 
                          ? 'text-white shadow-xl' 
                          : 'bg-white text-slate-700 hover:border-blue-400 shadow-lg'
                      }`}
                      style={{
                        backgroundColor: activeField === kategorie.id ? '#059669' : 'white',
                        borderColor: activeField === kategorie.id ? '#059669' : '#cbd5e1'
                      }}
                      onClick={() => {
                        if (activeField !== kategorie.id) {
                          setActiveField(kategorie.id);
                          setTempWuensche({...wuenscheData});
                        }
                      }}
                    >
                      <span className="text-3xl mb-2">{kategorie.icon}</span>
                      <span className="text-lg font-semibold text-center px-4 leading-tight">
                        {kategorie.name}
                      </span>
                      <span className="text-2xl font-bold mt-2">
                        {calculateKategorieTotal(kategorie.id).toLocaleString()}€
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pop-Up Modal */}
      {activeField && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={() => setActiveField(null)}
        >
          <div 
            className="bg-white/90 backdrop-blur-lg rounded-2xl border border-slate-200/50 p-8 w-full max-w-3xl shadow-xl mx-8 max-h-[500px] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {(() => {
              const aktiveKategorie = wuenscheKategorien.find(k => k.id === activeField);
              return (
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-slate-800 text-center">
                    {aktiveKategorie.icon} {aktiveKategorie.name}
                  </h3>
                  
                  <div className="space-y-4">
                    {tempWuensche[activeField].map((eintrag, index) => (
                      <div key={index} className="flex gap-3 items-center">
                        <input 
                          type="text"
                          value={eintrag.bezeichnung}
                          onChange={(e) => updateEintrag(activeField, index, 'bezeichnung', e.target.value)}
                          placeholder="Bezeichnung"
                          className="flex-1 p-3 bg-white border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-400 focus:border-transparent outline-none"
                        />
                        <input 
                          type="number"
                          value={eintrag.betrag}
                          onChange={(e) => updateEintrag(activeField, index, 'betrag', e.target.value)}
                          placeholder="0"
                          className="w-32 p-3 bg-white border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-400 focus:border-transparent outline-none text-right"
                        />
                        <span className="text-lg font-semibold">€</span>
                        {tempWuensche[activeField].length > 1 && (
                          <button
                            onClick={() => removeEintrag(activeField, index)}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            ✕
                          </button>
                        )}
                      </div>
                    ))}
                    
                    <button
                      onClick={() => addEintrag(activeField)}
                      className="w-full p-3 border-2 border-dashed border-slate-300 rounded-lg hover:border-slate-400 hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
                    >
                      <span className="text-2xl">+</span>
                      <span className="font-semibold">Neuen Eintrag hinzufügen</span>
                    </button>
                  </div>
                  
                  <div className="border-t-2 border-slate-200 pt-4">
                    <div className="flex justify-between items-center text-lg font-bold">
                      <span>Gesamtsumme:</span>
                      <span className="text-slate-700">
                        {calculateKategorieTotal(activeField).toLocaleString()}€
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-4 justify-center">
                    <button 
                      onClick={handleSave}
                      className="px-8 py-3 text-base font-semibold text-white bg-slate-500 rounded-xl transition-colors shadow-md hover:shadow-lg hover:bg-slate-600"
                    >
                      Speichern
                    </button>
                    <button 
                      onClick={handleCancel}
                      className="px-8 py-3 text-base font-semibold bg-slate-300 hover:bg-slate-400 text-slate-700 rounded-xl transition-colors shadow-md"
                    >
                      Zurück
                    </button>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}

      <Sidebar />
      <NavigationButtons />
    </div>
  );
};



 // Generische Sparziel-Page-Komponente für kurz-, mittel- und langfristige Anschaffungen
// Jetzt mit Pop-Up Modal Layout wie bei Fixkosten
const SparzielPage = ({ data, setData, title, subtitle, kategorien, color }) => {
  const [activeField, setActiveField] = useState(null);
  const [tempData, setTempData] = useState({...data});

  const calculateProgress = (erreicht, ziel) => {
    return Math.min((erreicht / ziel) * 100, 100);
  };

  const calculateKategorieTotal = (kategorie) => {
    return tempData[kategorie].reduce((sum, item) => sum + (parseFloat(item.betrag) || 0), 0);
  };

  const calculateKategorieErreicht = (kategorie) => {
    return tempData[kategorie].reduce((sum, item) => sum + (parseFloat(item.erreicht) || 0), 0);
  };

  const addEintrag = (kategorie) => {
    setTempData(prev => ({
      ...prev,
      [kategorie]: [...prev[kategorie], { bezeichnung: '', betrag: 0, erreicht: 0 }]
    }));
  };

  const removeEintrag = (kategorie, index) => {
    setTempData(prev => ({
      ...prev,
      [kategorie]: prev[kategorie].filter((_, i) => i !== index)
    }));
  };

  const updateEintrag = (kategorie, index, field, value) => {
    setTempData(prev => ({
      ...prev,
      [kategorie]: prev[kategorie].map((item, i) => 
        i === index ? { ...item, [field]: field === 'betrag' || field === 'erreicht' ? (parseFloat(value) || 0) : value } : item
      )
    }));
  };

  const handleSave = () => {
    setData(tempData);
    setActiveField(null);
  };

  const handleCancel = () => {
    setTempData({...data});
    setActiveField(null);
  };

  // Berechne Gesamtsummen für die Hauptüberschrift
  const calculateGesamtZiel = () => {
    return Object.keys(tempData).reduce((total, key) => {
      return total + calculateKategorieTotal(key);
    }, 0);
  };

  const calculateGesamtErreicht = () => {
    return Object.keys(tempData).reduce((total, key) => {
      return total + calculateKategorieErreicht(key);
    }, 0);
  };

  return (
    <div className="h-screen bg-gradient-to-br from-emerald-50 to-slate-100 font-sans">
      <HeaderBars />
      
      <div className="h-screen flex flex-col">
        <div className="h-1/4"></div>
        
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="h-full flex flex-col">
            
            {/* Hauptüberschrift - identisches Layout wie Fixkosten */}
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-slate-800 mb-2">{title}</h1>
              <p className="text-lg text-slate-600 mb-4">{subtitle}</p>
              <p className="text-lg text-slate-600">
                Gesamtfortschritt: {calculateGesamtErreicht().toLocaleString()}€ / {calculateGesamtZiel().toLocaleString()}€
              </p>
            </div>
            
            {/* Kreise - identisches Layout wie Fixkosten */}
            <div className="flex-shrink-0 flex justify-center items-center py-8">
              <div className="flex space-x-16">
                {kategorien.map((kategorie) => {
                  const progress = calculateKategorieTotal(kategorie.id) > 0 
                    ? (calculateKategorieErreicht(kategorie.id) / calculateKategorieTotal(kategorie.id) * 100) 
                    : 0;
                  return (
                    <div key={kategorie.id} className="flex flex-col items-center">
                      <div 
                        className={`w-48 h-48 rounded-full border-4 flex flex-col items-center justify-center cursor-pointer transition-all hover:scale-105 relative ${
                          activeField === kategorie.id 
                            ? 'text-white shadow-xl' 
                            : 'bg-white text-slate-700 hover:border-blue-400 shadow-lg'
                        }`}
                        style={{
                          backgroundColor: activeField === kategorie.id ? '#047857' : 'white',
                          borderColor: activeField === kategorie.id ? '#047857' : '#cbd5e1'
                        }}
                        onClick={() => {
                          if (activeField !== kategorie.id) {
                            setActiveField(kategorie.id);
                            setTempData({...data});
                          }
                        }}
                      >
                        {/* Progress Ring für Sparziele */}
                        <svg className="absolute inset-0 w-48 h-48">
                          <circle
                            cx="96"
                            cy="96"
                            r="94"
                            fill="none"
                            stroke="#e5e7eb"
                            strokeWidth="4"
                          />
                          <circle
                            cx="96"
                            cy="96"
                            r="94"
                            fill="none"
                            stroke={color}
                            strokeWidth="4"
                            strokeDasharray={`${progress * 5.9} 590`}
                            strokeDashoffset="0"
                            transform="rotate(-90 96 96)"
                            className="transition-all duration-500"
                          />
                        </svg>
                        <span className="text-3xl mb-2 z-10">{kategorie.icon}</span>
                        <span className="text-lg font-semibold text-center px-4 leading-tight z-10">
                          {kategorie.name}
                        </span>
                        <span className="text-sm font-bold mt-1 z-10">
                          {progress.toFixed(0)}%
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pop-Up Modal - identisches Layout wie Fixkosten */}
      {activeField && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={() => setActiveField(null)}
        >
          <div 
            className="bg-white/90 backdrop-blur-lg rounded-2xl border border-slate-200/50 p-8 w-full max-w-3xl shadow-xl mx-8 max-h-[500px] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {(() => {
              const aktiveKategorie = kategorien.find(k => k.id === activeField);
              return (
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-slate-800 text-center">
                    {aktiveKategorie.icon} {aktiveKategorie.name}
                  </h3>
                  
                  <div className="space-y-4">
                    {tempData[activeField].map((eintrag, index) => (
                      <div key={index} className="space-y-2 p-4 bg-slate-50 rounded-lg">
                        <div className="flex gap-3 items-center">
                          <input 
                            type="text"
                            value={eintrag.bezeichnung}
                            onChange={(e) => updateEintrag(activeField, index, 'bezeichnung', e.target.value)}
                            placeholder="Bezeichnung"
                            className="flex-1 p-3 bg-white border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-400 focus:border-transparent outline-none"
                          />
                          <div className="flex items-center gap-2">
                            <input 
                              type="number"
                              value={eintrag.erreicht}
                              onChange={(e) => updateEintrag(activeField, index, 'erreicht', e.target.value)}
                              placeholder="0"
                              className="w-24 p-3 bg-white border-2 border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none text-right"
                            />
                            <span className="text-sm">/</span>
                            <input 
                              type="number"
                              value={eintrag.betrag}
                              onChange={(e) => updateEintrag(activeField, index, 'betrag', e.target.value)}
                              placeholder="0"
                              className="w-24 p-3 bg-white border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-400 focus:border-transparent outline-none text-right"
                            />
                            <span className="text-lg font-semibold">€</span>
                          </div>
                          {tempData[activeField].length > 1 && (
                            <button
                              onClick={() => removeEintrag(activeField, index)}
                              className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              ✕
                            </button>
                          )}
                        </div>
                        {/* Progress Bar für jeden Eintrag */}
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="h-2 rounded-full transition-all duration-500"
                            style={{
                              width: `${calculateProgress(eintrag.erreicht, eintrag.betrag)}%`,
                              backgroundColor: color
                            }}
                          />
                        </div>
                      </div>
                    ))}
                    
                    <button
                      onClick={() => addEintrag(activeField)}
                      className="w-full p-3 border-2 border-dashed border-slate-300 rounded-lg hover:border-slate-400 hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
                    >
                      <span className="text-2xl">+</span>
                      <span className="font-semibold">Neues Ziel hinzufügen</span>
                    </button>
                  </div>
                  
                  <div className="border-t-2 border-slate-200 pt-4">
                    <div className="flex justify-between items-center text-lg font-bold">
                      <span>Gesamtfortschritt:</span>
                      <span className="text-slate-700">
                        {calculateKategorieErreicht(activeField).toLocaleString()}€ / {calculateKategorieTotal(activeField).toLocaleString()}€
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-4 justify-center">
                    <button 
                      onClick={handleSave}
                      className="px-8 py-3 text-base font-semibold text-white rounded-xl transition-colors shadow-md hover:shadow-lg"
                      style={{backgroundColor: color}}
                    >
                      Speichern
                    </button>
                    <button 
                      onClick={handleCancel}
                      className="px-8 py-3 text-base font-semibold bg-slate-300 hover:bg-slate-400 text-slate-700 rounded-xl transition-colors shadow-md"
                    >
                      Zurück
                    </button>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}

      <Sidebar /> 
      <NavigationButtons />
    </div>
  );
};
  // Render je nach aktueller Seite
  const renderCurrentPage = () => {
    switch(currentPage) {
      case 'overview':
        return <OverviewPage />;
      case 'budget':
        return <BudgetPage />;
      case 'basisabsicherung':
        return <BasisAbsicherungPage />;
      case 'zigaretten':
        return <ZigarettenPage />;
      case 'fixkosten':
        return <FixkostenPage />;
      case 'lifestyle':
        return <LifestylePage />;
      case 'sicherheit':
        return <SicherheitPage />;
      case 'wuensche':
        return <WuenschePage />;
      case 'kurzfristig':
        return (
          <SparzielPage 
            data={kurzfristigData}
            setData={setKurzfristigData}
            title="Kurzfristige Anschaffungen"
            subtitle="Ziele für 1-6 Monate"
            kategorien={[
              { id: 'elektronik', name: 'Elektronik', icon: '📱' },
              { id: 'haushalt', name: 'Haushalt', icon: '🏠' },
              { id: 'kleidung', name: 'Kleidung', icon: '👔' },
              { id: 'reparaturen', name: 'Reparaturen', icon: '🔧' },
              { id: 'gesundheit', name: 'Gesundheit', icon: '⚕️' }
            ]}
            color="#64748b"
          />
        );
      case 'mittelfristig':
        return (
          <SparzielPage 
            data={mittelfristigData}
            setData={setMittelfristigData}
            title="Mittelfristige Anschaffungen"
            subtitle="Ziele für 6-24 Monate"
            kategorien={[
              { id: 'moebel', name: 'Möbel', icon: '🛋️' },
              { id: 'technik', name: 'Technik', icon: '💻' },
              { id: 'urlaub', name: 'Urlaub', icon: '🏖️' },
              { id: 'auto', name: 'Auto', icon: '🚙' },
              { id: 'renovation', name: 'Renovation', icon: '🔨' }
            ]}
            color="#94a3b8"
          />
        );
      case 'langfristig':
        return (
          <SparzielPage 
            data={langfristigData}
            setData={setLangfristigData}
            title="Langfristige Anschaffungen"
            subtitle="Ziele für 2+ Jahre"
            kategorien={[
              { id: 'immobilie', name: 'Immobilie', icon: '🏡' },
              { id: 'fahrzeug', name: 'Fahrzeug', icon: '🚗' },
              { id: 'bildung', name: 'Bildung', icon: '📚' },
              { id: 'altersvorsorge', name: 'Altersvorsorge', icon: '🏦' },
              { id: 'unternehmen', name: 'Unternehmen', icon: '🏢' }
            ]}
            color="#475569"
          />
        );
      default:
        return <OverviewPage />;
    }
  };

  return renderCurrentPage();
};

export default FinanzTool;
