import React, { useState } from 'react';

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

  // Fixkosten Daten mit mehreren Einträgen pro Kategorie
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

  // Kurzfristige Anschaffungen (1-6 Monate)
  const [kurzfristigData, setKurzfristigData] = useState({
    elektronik: [{ bezeichnung: 'Neues Smartphone', betrag: 800, erreicht: 400 }],
    haushalt: [{ bezeichnung: 'Staubsauger', betrag: 300, erreicht: 150 }],
    kleidung: [{ bezeichnung: 'Winterjacke', betrag: 200, erreicht: 100 }],
    reparaturen: [{ bezeichnung: 'Fahrrad-Service', betrag: 150, erreicht: 50 }],
    gesundheit: [{ bezeichnung: 'Neue Brille', betrag: 400, erreicht: 200 }]
  });

  // Mittelfristige Anschaffungen (6-24 Monate)
  const [mittelfristigData, setMittelfristigData] = useState({
    moebel: [{ bezeichnung: 'Neue Couch', betrag: 2000, erreicht: 500 }],
    technik: [{ bezeichnung: 'Gaming PC', betrag: 1500, erreicht: 300 }],
    urlaub: [{ bezeichnung: 'Sommerurlaub 2025', betrag: 3000, erreicht: 1000 }],
    auto: [{ bezeichnung: 'Autoreparatur', betrag: 2500, erreicht: 800 }],
    renovation: [{ bezeichnung: 'Bad renovieren', betrag: 5000, erreicht: 1000 }]
  });

  // Langfristige Anschaffungen (2+ Jahre)
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

  // Seitenreihenfolge für Navigation
  const pageOrder = ['overview', 'budget', 'fixkosten', 'lifestyle', 'sicherheit', 'wuensche', 'kurzfristig', 'mittelfristig', 'langfristig'];
  
  const getNextPage = () => {
    const currentIndex = pageOrder.indexOf(currentPage);
    return currentIndex < pageOrder.length - 1 ? pageOrder[currentIndex + 1] : null;
  };

  const getPrevPage = () => {
    const currentIndex = pageOrder.indexOf(currentPage);
    return currentIndex > 0 ? pageOrder[currentIndex - 1] : null;
  };

  // Budget aus allen Einkommensquellen berechnen
  const calculateBudget = () => {
    return finanzData.gehaltNetto + finanzData.zusatzeinkommen + finanzData.kapitalertraege + 
           finanzData.mieteinnahmen + finanzData.individuell;
  };

  // Prozentuale Verteilung berechnen
  const calculatePercentages = () => {
    const budgetTotal = calculateBudget();
    return {
      fixkosten: ((finanzData.fixkostenTotal / budgetTotal) * 100),
      lifestyle: ((finanzData.lifestyleTotal / budgetTotal) * 100),
      sicherheit: ((finanzData.sicherheit / budgetTotal) * 100),
      ueberschuss: (((budgetTotal - finanzData.fixkostenTotal - finanzData.lifestyleTotal - finanzData.sicherheit) / budgetTotal) * 100)
    };
  };

  const percentages = calculatePercentages();

  // Interaktives Mini-Kuchendiagramm für Header
  const createMiniPieChart = () => {
    const radius = headerHovered ? 110 : 75;
    const centerX = 120;
    const centerY = 120;
    
    let cumulativePercentage = 0;
    const slices = [
      { name: 'Fixkosten', value: percentages.fixkosten, color: '#0B2E70', page: 'fixkosten' },
      { name: 'Lifestyle', value: percentages.lifestyle, color: '#64748b', page: 'lifestyle' },
      { name: 'Sicherheit', value: percentages.sicherheit, color: '#94a3b8', page: 'sicherheit' },
      { name: 'Überschuss', value: percentages.ueberschuss, color: percentages.ueberschuss < 0 ? '#ef4444' : '#10b981', page: null }
    ];

    return (
      <svg 
        width="240" 
        height="240" 
        className="transition-all duration-300"
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
          
          // Tooltip Position berechnen
          const midAngle = (startAngle + endAngle) / 2;
          const labelX = centerX + (radius * 0.7) * Math.cos(midAngle);
          const labelY = centerY + (radius * 0.7) * Math.sin(midAngle);
          
          cumulativePercentage += slice.value;
          
          return (
            <g key={index}>
              <path
                d={pathData}
                fill={slice.color}
                stroke="white"
                strokeWidth="2"
                className="cursor-pointer transition-all hover:opacity-80"
                onClick={() => slice.page && setCurrentPage(slice.page)}
              />
              {headerHovered && (
                <text
                  x={labelX}
                  y={labelY}
                  textAnchor="middle"
                  className="text-[12px] font-bold fill-white pointer-events-none"
                  dy="3"
                >
                  {slice.value.toFixed(0)}%
                </text>
              )}
            </g>
          );
        })}
        
        {/* Budget-Kreis in der Mitte */}
        <circle
          cx={centerX}
          cy={centerY}
          r={headerHovered ? 32 : 28}
          fill="white"
          stroke="#0B2E70"
          strokeWidth="2"
          className="cursor-pointer transition-all"
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
          style={{fill: '#0B2E70'}}
        >
          {calculateBudget()}€
        </text>
      </svg>
    );
  };

  // Navigation Buttons Component
  const NavigationButtons = () => {
    const prevPage = getPrevPage();
    const nextPage = getNextPage();
    
    return (
      <div className="fixed bottom-8 right-8 flex gap-4 z-50">
        {prevPage && (
          <button
            onClick={() => setCurrentPage(prevPage)}
            className="px-6 py-3 bg-white/90 backdrop-blur-lg border-2 border-slate-300 rounded-xl font-semibold text-slate-700 hover:bg-slate-50 transition-all shadow-lg"
          >
            ← Zurück
          </button>
        )}
        {nextPage && (
          <button
            onClick={() => setCurrentPage(nextPage)}
            className="px-6 py-3 text-white rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl"
            style={{backgroundColor: '#0B2E70'}}
          >
            Weiter →
          </button>
        )}
      </div>
    );
  };

  // Header mit 4 Balken für alle Seiten außer Overview
  const HeaderBars = () => (
    <div className="fixed top-0 left-0 right-0 h-1/9 bg-white/70 backdrop-blur-lg border-b border-slate-200/50 z-50">
      <div className="h-full flex items-center px-8 relative">
        <div className="absolute left-8 top-1/2 transform -translate-y-1/2">
          <h1 className="text-xl font-bold text-slate-800">United Hands Capital</h1>
          <p className="text-sm text-slate-600">
            {currentPage === 'budget' && 'Budget-Eingabe'}
            {currentPage === 'fixkosten' && 'Fixkosten-Verwaltung'}
            {currentPage === 'lifestyle' && 'Lifestyle-Ausgaben'}
            {currentPage === 'sicherheit' && 'Sicherheit & Vorsorge'}
            {currentPage === 'wuensche' && 'Wünsche & Ziele'}
            {currentPage === 'kurzfristig' && 'Kurzfristige Anschaffungen'}
            {currentPage === 'mittelfristig' && 'Mittelfristige Anschaffungen'}
            {currentPage === 'langfristig' && 'Langfristige Anschaffungen'}
          </p>
        </div>
        
        <div className="flex-1 flex items-end justify-center space-x-8 h-full pb-6">
          {/* Wünsche/Ziele Balken */}
          <div className="flex flex-col items-center">
            <div 
              className="w-20 h-20 rounded-t-lg flex items-end justify-center pb-2 cursor-pointer hover:scale-105 transition-all"
              style={{backgroundColor: '#0B2E70'}}
              onClick={() => setCurrentPage('wuensche')}
            >
              <span className="text-xs text-white font-medium">Wünsche</span>
            </div>
          </div>

          {/* Kurzfristiges Kapital Balken */}
          <div className="flex flex-col items-center">
            <div 
              className="bg-slate-500 w-20 h-20 rounded-t-lg flex items-end justify-center pb-2 cursor-pointer hover:scale-105 transition-all"
              onClick={() => setCurrentPage('kurzfristig')}
            >
              <span className="text-xs text-white font-medium">Kurz</span>
            </div>
          </div>

          {/* Interaktives Kuchendiagramm in der Mitte */}
          <div className="flex flex-col items-center">
            <div className="relative group">
              {createMiniPieChart()}
              {headerHovered && (
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                  Klicken zum Navigieren
                </div>
              )}
            </div>
          </div>

          {/* Mittelfristiges Kapital Balken */}
          <div className="flex flex-col items-center">
            <div 
              className="bg-slate-400 w-20 h-20 rounded-t-lg flex items-end justify-center pb-2 cursor-pointer hover:scale-105 transition-all"
              onClick={() => setCurrentPage('mittelfristig')}
            >
              <span className="text-xs text-white font-medium">Mittel</span>
            </div>
          </div>

          {/* Langfristiges Kapital Balken */}
          <div className="flex flex-col items-center">
            <div 
              className="bg-slate-600 w-20 h-20 rounded-t-lg flex items-end justify-center pb-2 cursor-pointer hover:scale-105 transition-all"
              onClick={() => setCurrentPage('langfristig')}
            >
              <span className="text-xs text-white font-medium">Lang</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // SVG Kuchendiagramm erstellen
  const createPieChart = () => {
    const radius = 120;
    const centerX = 150;
    const centerY = 150;
    
    let cumulativePercentage = 0;
    const slices = [
      { name: 'Fixkosten', value: percentages.fixkosten, color: '#0B2E70', page: 'fixkosten' },
      { name: 'Lifestyle', value: percentages.lifestyle, color: '#64748b', page: 'lifestyle' },
      { name: 'Sicherheit', value: percentages.sicherheit, color: '#94a3b8', page: 'sicherheit' },
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
          className="transition-all duration-300 cursor-pointer hover:brightness-110"
          onClick={() => slice.page && setCurrentPage(slice.page)}
        />
      );
    });
  };

  // Overview Page (ursprüngliche Startseite)
  const OverviewPage = () => (
    <div className="h-screen w-full bg-gradient-to-br from-slate-50 to-slate-100 overflow-hidden font-sans">
      {/* Header */}
      <div className="bg-white/70 backdrop-blur-lg border-b border-slate-200/50">
        <div className="flex items-center justify-between px-8 py-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">United Hands Capital</h1>
            <p className="text-slate-600 font-medium">Finanzberatungstool</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-slate-500 uppercase tracking-wider font-medium">Gesamtbudget</p>
            <p className="text-3xl font-bold" style={{color: '#0B2E70'}}>{calculateBudget().toLocaleString()} €</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex h-full relative">
        
        {/* Basis Absicherung - Links */}
        <div className="absolute left-12 top-24">
          <div className="bg-white/70 backdrop-blur-lg rounded-2xl border border-slate-200/50 p-6">
            <svg width="180" height="180">
              <circle
                cx="90"
                cy="90"
                r="85"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="3"
              />
              <circle
                cx="90"
                cy="90"
                r="65"
                fill="#f9fafb"
                stroke="#0B2E70"
                strokeWidth="2"
                strokeDasharray="5,5"
              />
              <text x="90" y="80" textAnchor="middle" className="text-lg font-bold fill-slate-800">
                Basis
              </text>
              <text x="90" y="100" textAnchor="middle" className="text-lg font-bold fill-slate-800">
                Absicherung
              </text>
            </svg>
          </div>
        </div>

        {/* Hauptbereich - Kuchendiagramm */}
        <div className="flex-1 flex justify-center items-start pt-12">
          <div className="relative">
            <div className="bg-white/70 backdrop-blur-lg rounded-2xl border border-slate-200/50 p-8">
              <svg width="300" height="300">
                {createPieChart()}
                
                {/* Budget-Kreis in der Mitte - Klickbar */}
                <circle
                  cx="150"
                  cy="150"
                  r="42"
                  fill="white"
                  stroke="#0B2E70"
                  strokeWidth="3"
                  className="cursor-pointer transition-all hover:stroke-4"
                  onClick={() => setCurrentPage('budget')}
                />
                <text x="150" y="135" textAnchor="middle" className="text-sm font-medium fill-slate-600 pointer-events-none">
                  Budget
                </text>
                <text x="150" y="160" textAnchor="middle" className="text-xl font-bold pointer-events-none cursor-pointer" style={{fill: '#0B2E70'}}>
                  {calculateBudget().toLocaleString()}€
                </text>
              </svg>
            </div>
            
            {/* Legende */}
            <div className="absolute top-0 -right-60 bg-white/70 backdrop-blur-lg rounded-2xl border border-slate-200/50 p-6">
              <h3 className="text-lg font-bold mb-4 text-slate-900">Budget-Verteilung</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-sm" style={{backgroundColor: '#0B2E70'}}></div>
                    <span className="text-sm font-medium text-slate-700">Fixkosten</span>
                  </div>
                  <span className="text-sm font-bold text-slate-900">{percentages.fixkosten.toFixed(1)}%</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-slate-500 rounded-sm"></div>
                    <span className="text-sm font-medium text-slate-700">Lifestyle</span>
                  </div>
                  <span className="text-sm font-bold text-slate-900">{percentages.lifestyle.toFixed(1)}%</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-slate-400 rounded-sm"></div>
                    <span className="text-sm font-medium text-slate-700">Sicherheit</span>
                  </div>
                  <span className="text-sm font-bold text-slate-900">{percentages.sicherheit.toFixed(1)}%</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded-sm ${percentages.ueberschuss < 0 ? 'bg-red-500' : 'bg-emerald-500'}`}></div>
                    <span className="text-sm font-medium text-slate-700">Überschuss/Defizit</span>
                  </div>
                  <span className="text-sm font-bold text-slate-900">{percentages.ueberschuss.toFixed(1)}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Untere Säulen */}
      <div className="absolute bottom-0 left-0 right-0 h-1/2">
        <div className="flex h-full gap-6 p-6">
          
          <div className="flex-1 flex flex-col justify-end">
            <div 
              className="h-3/4 rounded-t-xl flex items-end justify-center pb-8 relative overflow-hidden cursor-pointer transition-all hover:brightness-110"
              style={{backgroundColor: '#0B2E70'}}
              onClick={() => setCurrentPage('wuensche')}
            >
              <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg px-4 py-2">
                <div className="text-white font-semibold text-center">
                  <div className="text-lg">Wünsche &</div>
                  <div className="text-lg">Ziele</div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 flex flex-col justify-end">
            <div 
              className="bg-slate-500 h-3/4 rounded-t-xl flex items-end justify-center pb-8 relative overflow-hidden cursor-pointer transition-all hover:brightness-110"
              onClick={() => setCurrentPage('kurzfristig')}
            >
              <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg px-4 py-2">
                <div className="text-white font-semibold text-center">
                  <div className="text-lg">Kurzfristiges</div>
                  <div className="text-lg">Kapital</div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 flex flex-col justify-end">
            <div 
              className="bg-slate-400 h-3/4 rounded-t-xl flex items-end justify-center pb-8 relative overflow-hidden cursor-pointer transition-all hover:brightness-110"
              onClick={() => setCurrentPage('mittelfristig')}
            >
              <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg px-4 py-2">
                <div className="text-white font-semibold text-center">
                  <div className="text-lg">Mittelfristiges</div>
                  <div className="text-lg">Kapital</div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 flex flex-col justify-end">
            <div 
              className="bg-slate-600 h-3/4 rounded-t-xl flex items-end justify-center pb-8 relative overflow-hidden cursor-pointer transition-all hover:brightness-110"
              onClick={() => setCurrentPage('langfristig')}
            >
              <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg px-4 py-2">
                <div className="text-white font-semibold text-center">
                  <div className="text-lg">Langfristiges</div>
                  <div className="text-lg">Kapital</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <NavigationButtons />
    </div>
  );

  // Budget Input Page mit vergrößerten Kreisen und korrigierter Event-Behandlung
  const BudgetPage = () => {
    const [activeField, setActiveField] = useState(null);
    const [tempValues, setTempValues] = useState({...finanzData});

    const handleInputChange = (field, value) => {
      setTempValues(prev => ({
        ...prev,
        [field]: parseFloat(value) || 0
      }));
    };

    const handleSave = () => {
      setFinanzData(tempValues);
      setActiveField(null);
      setGehaltExpanded(false);
    };

    const handleCancel = () => {
      setTempValues({...finanzData});
      setActiveField(null);
      setGehaltExpanded(false);
    };

    const einkommensfelder = [
      { 
        id: 'gehalt', 
        name: 'Gehalt', 
        value: tempValues.gehaltNetto, 
        field: 'gehaltNetto',
        hasExpanded: true
      },
      { 
        id: 'zusatz', 
        name: 'Zusatzeinkommen', 
        value: tempValues.zusatzeinkommen, 
        field: 'zusatzeinkommen'
      },
      { 
        id: 'kapital', 
        name: 'Kapitalerträge', 
        value: tempValues.kapitalertraege, 
        field: 'kapitalertraege'
      },
      { 
        id: 'miete', 
        name: 'Mieteinnahmen', 
        value: tempValues.mieteinnahmen, 
        field: 'mieteinnahmen'
      },
      { 
        id: 'individuell', 
        name: 'Individuell', 
        value: tempValues.individuell, 
        field: 'individuell'
      }
    ];

    return (
      <div className="h-screen bg-gradient-to-br from-slate-50 to-slate-100 font-sans">
        <HeaderBars />
        
        <div className="h-screen flex flex-col">
          <div className="h-1/4"></div>
          
          <div className="flex-1 p-8 overflow-y-auto">
            <div className="h-full flex flex-col">
              
              <div className="flex-shrink-0 flex justify-center items-center py-8">
                <div className="flex space-x-16">
                  {einkommensfelder.map((feld) => (
                    <div key={feld.id} className="flex flex-col items-center">
                      <div 
                        className={`w-48 h-48 rounded-full border-4 flex flex-col items-center justify-center cursor-pointer transition-all hover:scale-105 ${
                          activeField === feld.id 
                            ? 'text-white shadow-xl' 
                            : 'bg-white text-slate-700 hover:border-blue-400 shadow-lg'
                        }`}
                        style={{
                          backgroundColor: activeField === feld.id ? '#0B2E70' : 'white',
                          borderColor: activeField === feld.id ? '#0B2E70' : '#cbd5e1'
                        }}
                        onClick={() => {
                          if (activeField !== feld.id) {
                            setActiveField(feld.id);
                            setTempValues({...finanzData});
                          }
                        }}
                      >
                        <span className="text-lg font-semibold text-center px-4 leading-tight">
                          {feld.name}
                        </span>
                        <span className="text-2xl font-bold mt-2">
                          {feld.value.toLocaleString()}€
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex-1 flex items-start justify-center pt-6">
                {activeField && (
                  <div 
                    className="bg-white/80 backdrop-blur-lg rounded-2xl border border-slate-200/50 p-8 w-full max-w-2xl shadow-xl"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {(() => {
                      const aktivesFeld = einkommensfelder.find(f => f.id === activeField);
                      return (
                        <div className="space-y-6">
                          <h3 className="text-2xl font-bold text-slate-800 text-center">
                            {aktivesFeld.name} eingeben
                          </h3>
                          
                          <div className="flex flex-col items-center space-y-4">
                            <div className="w-full max-w-sm">
                              <label className="block text-base font-semibold text-slate-700 mb-3 text-center">
                                {activeField === 'gehalt' ? 'Netto-Gehalt' : 'Monatlicher Betrag'}
                              </label>
                              <input 
                                type="number" 
                                value={tempValues[aktivesFeld.field]}
                                onChange={(e) => handleInputChange(aktivesFeld.field, e.target.value)}
                                className="w-full p-4 bg-white border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-center text-xl font-semibold"
                                placeholder="0"
                                autoFocus
                              />
                            </div>
                            
                            {activeField === 'gehalt' && (
                              <div className="w-full max-w-sm">
                                <button 
                                  onClick={() => setGehaltExpanded(!gehaltExpanded)}
                                  className="text-base font-semibold transition-colors w-full py-3 px-4 rounded-xl border-2 border-slate-300 hover:bg-slate-50"
                                  style={{color: '#0B2E70'}}
                                >
                                  {gehaltExpanded ? 'Weniger Details' : 'Erweitert'}
                                </button>
                                
                                {gehaltExpanded && (
                                  <div className="mt-4 space-y-3 pt-4 border-t-2 border-slate-200">
                                    <div>
                                      <label className="block text-sm font-semibold text-slate-700 mb-2 text-center">
                                        Brutto-Gehalt
                                      </label>
                                      <input 
                                        type="number" 
                                        value={gehaltDetails.brutto}
                                        onChange={(e) => setGehaltDetails(prev => ({
                                          ...prev, 
                                          brutto: parseFloat(e.target.value) || 0
                                        }))}
                                        className="w-full p-3 bg-white border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-center text-base"
                                        placeholder="0"
                                      />
                                    </div>
                                    <div>
                                      <label className="block text-sm font-semibold text-slate-700 mb-2 text-center">
                                        Zusatzleistungen
                                      </label>
                                      <input 
                                        type="number" 
                                        value={gehaltDetails.zusatzleistungen}
                                        onChange={(e) => setGehaltDetails(prev => ({
                                          ...prev, 
                                          zusatzleistungen: parseFloat(e.target.value) || 0
                                        }))}
                                        className="w-full p-3 bg-white border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-center text-base"
                                        placeholder="0"
                                      />
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}
                            
                            <div className="flex space-x-4 mt-6">
                              <button 
                                onClick={handleSave}
                                className="px-8 py-3 text-base font-semibold text-white rounded-xl transition-colors shadow-md hover:shadow-lg"
                                style={{backgroundColor: '#0B2E70'}}
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
                        </div>
                      );
                    })()}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <NavigationButtons />
      </div>
    );
  };

  // Fixkosten Page mit mehreren Eingabefeldern pro Kategorie
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
      <div className="h-screen bg-gradient-to-br from-slate-50 to-slate-100 font-sans">
        <HeaderBars />
        
        <div className="h-screen flex flex-col">
          <div className="h-1/4"></div>
          
          <div className="flex-1 p-8 overflow-y-auto">
            <div className="h-full flex flex-col">
              
              <div className="text-center mb-6">
                <h2 className="text-3xl font-bold text-slate-800">Fixkosten</h2>
                <p className="text-lg text-slate-600 mt-2">Gesamtsumme: {finanzData.fixkostenTotal.toLocaleString()}€</p>
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
                          backgroundColor: activeField === kategorie.id ? '#0B2E70' : 'white',
                          borderColor: activeField === kategorie.id ? '#0B2E70' : '#cbd5e1'
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

              <div className="flex-1 flex items-start justify-center pt-6">
                {activeField && (
                  <div 
                    className="bg-white/80 backdrop-blur-lg rounded-2xl border border-slate-200/50 p-8 w-full max-w-3xl shadow-xl max-h-[500px] overflow-y-auto"
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
                )}
              </div>
            </div>
          </div>
        </div>
        <NavigationButtons />
      </div>
    );
  };
  // Lifestyle Page
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
      <div className="h-screen bg-gradient-to-br from-slate-50 to-slate-100 font-sans">
        <HeaderBars />
        
        <div className="h-screen flex flex-col">
          <div className="h-1/4"></div>
          
          <div className="flex-1 p-8 overflow-y-auto">
            <div className="h-full flex flex-col">
              
              <div className="text-center mb-6">
                <h2 className="text-3xl font-bold text-slate-800">Lifestyle</h2>
                <p className="text-lg text-slate-600 mt-2">Gesamtsumme: {finanzData.lifestyleTotal.toLocaleString()}€</p>
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

              <div className="flex-1 flex items-start justify-center pt-6">
                {activeField && (
                  <div 
                    className="bg-white/80 backdrop-blur-lg rounded-2xl border border-slate-200/50 p-8 w-full max-w-3xl shadow-xl max-h-[500px] overflow-y-auto"
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
                )}
              </div>
            </div>
          </div>
        </div>
        <NavigationButtons />
      </div>
    );
  };
// Sicherheit Page
  const SicherheitPage = () => {
    const [activeField, setActiveField] = useState(null);
    const [tempSicherheit, setTempSicherheit] = useState({...sicherheitData});

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
      setTempSicherheit({...sicherheitData});
      setActiveField(null);
    };

    const sicherheitKategorien = [
      { id: 'notgroschen', name: 'Notgroschen', icon: '🛡️' },
      { id: 'versicherungen', name: 'Versicherungen', icon: '📄' },
      { id: 'altersvorsorge', name: 'Altersvorsorge', icon: '👴' },
      { id: 'gesundheit', name: 'Gesundheit', icon: '🏥' },
      { id: 'sparen', name: 'Sparen', icon: '💰' }
    ];

    return (
      <div className="h-screen bg-gradient-to-br from-slate-50 to-slate-100 font-sans">
        <HeaderBars />
        
        <div className="h-screen flex flex-col">
          <div className="h-1/4"></div>
          
          <div className="flex-1 p-8 overflow-y-auto">
            <div className="h-full flex flex-col">
              
              <div className="text-center mb-6">
                <h2 className="text-3xl font-bold text-slate-800">Sicherheit & Vorsorge</h2>
                <p className="text-lg text-slate-600 mt-2">Gesamtsumme: {finanzData.sicherheit.toLocaleString()}€</p>
              </div>
              
              <div className="flex-shrink-0 flex justify-center items-center py-8">
                <div className="flex space-x-16">
                  {sicherheitKategorien.map((kategorie) => (
                    <div key={kategorie.id} className="flex flex-col items-center">
                      <div 
                        className={`w-48 h-48 rounded-full border-4 flex flex-col items-center justify-center cursor-pointer transition-all hover:scale-105 ${
                          activeField === kategorie.id 
                            ? 'text-white shadow-xl' 
                            : 'bg-white text-slate-700 hover:border-slate-400 shadow-lg'
                        }`}
                        style={{
                          backgroundColor: activeField === kategorie.id ? '#94a3b8' : 'white',
                          borderColor: activeField === kategorie.id ? '#94a3b8' : '#cbd5e1'
                        }}
                        onClick={() => {
                          if (activeField !== kategorie.id)
        {
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

              <div className="flex-1 flex items-start justify-center pt-6">
                {activeField && (
                  <div 
                    className="bg-white/80 backdrop-blur-lg rounded-2xl border border-slate-200/50 p-8 w-full max-w-3xl shadow-xl max-h-[500px] overflow-y-auto"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {(() => {
                      const aktiveKategorie = fixkostenKategorien.find(k => k.id === activeField);
                      return (
                        <div className="space-y-6">
                          <h3 className="text-2xl font-bold text-slate-800 text-center">
                            {aktiveKategorie.icon} {aktiveKategorie.name} - Ausgaben
                          </h3>
                          
                          <div className="space-y-4">
                            {tempFixkosten[activeField].map((eintrag, index) => (
                              <div key={index} className="flex gap-3 items-center">
                                <input 
                                  type="text"
                                  value={eintrag.bezeichnung}
                                  onChange={(e) => updateEintrag(activeField, index, 'bezeichnung', e.target.value)}
                                  placeholder="Bezeichnung"
                                  className="flex-1 p-3 bg-white border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                />
                                <input 
                                  type="number"
                                  value={eintrag.betrag}
                                  onChange={(e) => updateEintrag(activeField, index, 'betrag', e.target.value)}
                                  placeholder="0"
                                  className="w-32 p-3 bg-white border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-right"
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
                              className="w-full p-3 border-2 border-dashed border-slate-300 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors flex items-center justify-center gap-2"
                            >
                              <span className="text-2xl">+</span>
                              <span className="font-semibold">Neue Ausgabe hinzufügen</span>
                            </button>
                          </div>
                          
                          <div className="border-t-2 border-slate-200 pt-4">
                            <div className="flex justify-between items-center text-lg font-bold">
                              <span>Gesamtsumme:</span>
                              <span style={{color: '#0B2E70'}}>
                                {calculateKategorieTotal(activeField).toLocaleString()}€
                              </span>
                            </div>
                          </div>
                          
                          <div className="flex space-x-4 justify-center">
                            <button 
                              onClick={handleSave}
                              className="px-8 py-3 text-base font-semibold text-white rounded-xl transition-colors shadow-md hover:shadow-lg"
                              style={{backgroundColor: '#0B2E70'}}
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
                )}
              </div>
            </div>
          </div>
        </div>
        <NavigationButtons />
      </div>
    );
  };
  // Wünsche & Ziele Page
  const WuenschePage = () => {
    const [activeField, setActiveField] = useState(null);
    const [tempWuensche, setTempWuensche] = useState({...wuenscheData});

    const calculateProgress = (erreicht, ziel) => {
      return Math.min((erreicht / ziel) * 100, 100);
    };

    const calculateKategorieTotal = (kategorie) => {
      return tempWuensche[kategorie].reduce((sum, item) => sum + (parseFloat(item.betrag) || 0), 0);
    };

    const calculateKategorieErreicht = (kategorie) => {
      return tempWuensche[kategorie].reduce((sum, item) => sum + (parseFloat(item.erreicht) || 0), 0);
    };

    const addEintrag = (kategorie) => {
      setTempWuensche(prev => ({
        ...prev,
        [kategorie]: [...prev[kategorie], { bezeichnung: '', betrag: 0, erreicht: 0 }]
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
          i === index ? { ...item, [field]: parseFloat(value) || 0 } : item
        )
      }));
    };

    const handleSave = () => {
      setWuenscheData(tempWuensche);
      setActiveField(null);
    };

    const handleCancel = () => {
      setTempWuensche({...wuenscheData});
      setActiveField(null);
    };

    const wuenscheKategorien = [
      { id: 'traumurlaub', name: 'Traumurlaub', icon: '✈️' },
      { id: 'luxus', name: 'Luxusgüter', icon: '💎' },
      { id: 'erlebnisse', name: 'Erlebnisse', icon: '🎢' },
      { id: 'weiterbildung', name: 'Weiterbildung', icon: '🎓' },
      { id: 'geschenke', name: 'Geschenke', icon: '🎁' }
    ];

    return (
      <div className="h-screen bg-gradient-to-br from-slate-50 to-slate-100 font-sans">
        <HeaderBars />
        
        <div className="h-screen flex flex-col">
          <div className="h-1/4"></div>
          
          <div className="flex-1 p-8 overflow-y-auto">
            <div className="h-full flex flex-col">
              
              <div className="text-center mb-6">
                <h2 className="text-3xl font-bold text-slate-800">Wünsche & Ziele</h2>
                <p className="text-lg text-slate-600 mt-2">Langfristige Träume verwirklichen</p>
              </div>
              
              <div className="flex-shrink-0 flex justify-center items-center py-8">
                <div className="flex space-x-16">
                  {wuenscheKategorien.map((kategorie) => {
                    const progress = calculateKategorieErreicht(kategorie.id) / calculateKategorieTotal(kategorie.id) * 100;
                    return (
                      <div key={kategorie.id} className="flex flex-col items-center">
                        <div 
                          className={`w-48 h-48 rounded-full border-4 flex flex-col items-center justify-center cursor-pointer transition-all hover:scale-105 relative ${
                            activeField === kategorie.id 
                              ? 'text-white shadow-xl' 
                              : 'bg-white text-slate-700 hover:border-blue-700 shadow-lg'
                          }`}
                          style={{
                            backgroundColor: activeField === kategorie.id ? '#0B2E70' : 'white',
                            borderColor: activeField === kategorie.id ? '#0B2E70' : '#cbd5e1'
                          }}
                          onClick={() => {
                            if (activeField !== kategorie.id) {
                              setActiveField(kategorie.id);
                              setTempWuensche({...wuenscheData});
                            }
                          }}
                        >
                          {/* Fortschrittsring */}
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
                              stroke="#0B2E70"
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

              <div className="flex-1 flex items-start justify-center pt-6">
                {activeField && (
                  <div 
                    className="bg-white/80 backdrop-blur-lg rounded-2xl border border-slate-200/50 p-8 w-full max-w-4xl shadow-xl max-h-[500px] overflow-y-auto"
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
                              <div key={index} className="space-y-2 p-4 bg-slate-50 rounded-lg">
                                <div className="flex gap-3 items-center">
                                  <input 
                                    type="text"
                                    value={eintrag.bezeichnung}
                                    onChange={(e) => setTempWuensche(prev => ({
                                      ...prev,
                                      [activeField]: prev[activeField].map((item, i) => 
                                        i === index ? { ...item, bezeichnung: e.target.value } : item
                                      )
                                    }))}
                                    placeholder="Bezeichnung"
                                    className="flex-1 p-3 bg-white border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
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
                                      className="w-24 p-3 bg-white border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-right"
                                    />
                                    <span className="text-lg font-semibold">€</span>
                                  </div>
                                  {tempWuensche[activeField].length > 1 && (
                                    <button
                                      onClick={() => removeEintrag(activeField, index)}
                                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                    >
                                      ✕
                                    </button>
                                  )}
                                </div>
                                {/* Fortschrittsbalken */}
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                  <div 
                                    className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                                    style={{width: `${calculateProgress(eintrag.erreicht, eintrag.betrag)}%`}}
                                  />
                                </div>
                              </div>
                            ))}
                            
                            <button
                              onClick={() => addEintrag(activeField)}
                              className="w-full p-3 border-2 border-dashed border-slate-300 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors flex items-center justify-center gap-2"
                            >
                              <span className="text-2xl">+</span>
                              <span className="font-semibold">Neues Ziel hinzufügen</span>
                            </button>
                          </div>
                          
                          <div className="border-t-2 border-slate-200 pt-4">
                            <div className="flex justify-between items-center text-lg font-bold">
                              <span>Gesamtfortschritt:</span>
                              <span style={{color: '#0B2E70'}}>
                                {calculateKategorieErreicht(activeField).toLocaleString()}€ / {calculateKategorieTotal(activeField).toLocaleString()}€
                              </span>
                            </div>
                          </div>
                          
                          <div className="flex space-x-4 justify-center">
                            <button 
                              onClick={handleSave}
                              className="px-8 py-3 text-base font-semibold text-white rounded-xl transition-colors shadow-md hover:shadow-lg"
                              style={{backgroundColor: '#0B2E70'}}
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
                )}
              </div>
            </div>
          </div>
        </div>
        <NavigationButtons />
      </div>
    );
  };

  // Generische Sparziel-Page-Komponente für kurz-, mittel- und langfristige Anschaffungen
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
          i === index ? { ...item, [field]: parseFloat(value) || 0 } : item
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

    return (
      <div className="h-screen bg-gradient-to-br from-slate-50 to-slate-100 font-sans">
        <HeaderBars />
        
        <div className="h-screen flex flex-col">
          <div className="h-1/4"></div>
          
          <div className="flex-1 p-8 overflow-y-auto">
            <div className="h-full flex flex-col">
              
              <div className="text-center mb-6">
                <h2 className="text-3xl font-bold text-slate-800">{title}</h2>
                <p className="text-lg text-slate-600 mt-2">{subtitle}</p>
              </div>
              
              <div className="flex-shrink-0 flex justify-center items-center py-8">
                <div className="flex space-x-16">
                  {kategorien.map((kategorie) => {
                    const progress = calculateKategorieErreicht(kategorie.id) / calculateKategorieTotal(kategorie.id) * 100 || 0;
                    return (
                      <div key={kategorie.id} className="flex flex-col items-center">
                        <div 
                          className={`w-48 h-48 rounded-full border-4 flex flex-col items-center justify-center cursor-pointer transition-all hover:scale-105 relative ${
                            activeField === kategorie.id 
                              ? 'text-white shadow-xl' 
                              : 'bg-white text-slate-700 hover:border-blue-400 shadow-lg'
                          }`}
                          style={{
                            backgroundColor: activeField === kategorie.id ? color : 'white',
                            borderColor: activeField === kategorie.id ? color : '#cbd5e1'
                          }}
                          onClick={() => {
                            if (activeField !== kategorie.id) {
                              setActiveField(kategorie.id);
                              setTempData({...data});
                            }
                          }}
                        >
                          {/* Fortschrittsring */}
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

              <div className="flex-1 flex items-start justify-center pt-6">
                {activeField && (
                  <div 
                    className="bg-white/80 backdrop-blur-lg rounded-2xl border border-slate-200/50 p-8 w-full max-w-4xl shadow-xl max-h-[500px] overflow-y-auto"
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
                                    onChange={(e) => setTempData(prev => ({
                                      ...prev,
                                      [activeField]: prev[activeField].map((item, i) => 
                                        i === index ? { ...item, bezeichnung: e.target.value } : item
                                      )
                                    }))}
                                    placeholder="Bezeichnung"
                                    className="flex-1 p-3 bg-white border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
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
                                      className="w-24 p-3 bg-white border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-right"
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
                                {/* Fortschrittsbalken */}
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
                              className="w-full p-3 border-2 border-dashed border-slate-300 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors flex items-center justify-center gap-2"
                            >
                              <span className="text-2xl">+</span>
                              <span className="font-semibold">Neues Ziel hinzufügen</span>
                            </button>
                          </div>
                          
                          <div className="border-t-2 border-slate-200 pt-4">
                            <div className="flex justify-between items-center text-lg font-bold">
                              <span>Gesamtfortschritt:</span>
                              <span style={{color: color}}>
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
                )}
              </div>
            </div>
          </div>
        </div>
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