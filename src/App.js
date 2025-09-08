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
      langfristigData
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

//Basis-Absicherung Daten - Optimiert 2025
const [basisAbsicherungData, setBasisAbsicherungData] = useState({
  krankenversicherung: { 
    status: 'vorhanden', 
    monatlich: 450, 
    typ: 'gesetzlich',
    deckungssumme: 'Unbegrenzt',
    zusatzbeitrag: 2.5
  },
  haftpflicht: { 
    status: 'vorhanden', 
    monatlich: 8,
    deckung: 50000000,
    empfohlen: 8
  },
  berufsunfaehigkeit: { 
    status: 'fehlt', 
    monatlich: 0, 
    empfohlen: 120,
    absicherung: '70% des Nettoeinkommens'
  },
  rechtsschutz: { 
    status: 'teilweise', 
    monatlich: 25, 
    bereiche: ['privat'],
    empfohleneBereiche: ['privat', 'beruf', 'verkehr']
  },
  hausrat: { 
    status: 'fehlt', 
    monatlich: 0, 
    empfohlen: 15,
    versicherungssumme: '650€/qm empfohlen'
  },
  kfzVersicherung: { 
    status: 'vorhanden', 
    monatlich: 85, 
    typ: 'teilkasko',
    schadenfreiheitsklasse: 'SF 5'
  },
  auslandskranken: {
    status: 'fehlt',
    monatlich: 0,
    empfohlen: 2,
    typ: 'Reisekrankenversicherung'
  }
});

// Page transition effect
useEffect(() => {
  setPageTransition(true);
  const timer = setTimeout(() => setPageTransition(false), 300);
  return () => clearTimeout(timer);
}, [currentPage]);

// Modal-Komponente (fügen Sie diese vor den Page-Komponenten ein)
const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  
  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      {/* Verschwommener Hintergrund */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      
      {/* Modal Content */}
      <div 
        className="relative z-10 animate-modalFadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

// ZigarettenPage - MIT Statistik-Banner (nach unten verschoben)
const ZigarettenPage = () => {
  const [activeField, setActiveField] = useState(null);
  const [tempZigaretten, setTempZigaretten] = useState({ ...zigarettenData });

  const calculateKategorieTotal = (kategorie) => {
    return tempZigaretten[kategorie].reduce((sum, item) => sum + (parseFloat(item.betrag) || 0), 0);
  };

  const handleSave = () => {
    setZigarettenData(tempZigaretten);
    setActiveField(null);
  };

  const handleCancel = () => {
    setTempZigaretten({ ...zigarettenData });
    setActiveField(null);
  };

  const zigKategorien = [
    { id: 'konsum', name: 'Konsum', icon: '🚬', color: '#dc2626', beschreibung: 'Täglicher Zigarettenkonsum' }
  ];

  return (
    <div className="h-screen bg-gradient-to-br from-red-50 to-slate-100 font-sans">
      <HeaderBars />

      {/* Statistik-Banner (leicht nach unten verschoben) */}
      <div className="mt-20 mb-6 px-8">
        <div className="bg-red-100 border border-red-300 rounded-xl p-6 shadow-md">
          <h3 className="text-lg font-bold text-red-800">Statistik: Zigarettenkosten</h3>
          <p className="text-red-700 mt-1">
            Übersicht deiner monatlichen Ausgaben für Zigaretten.
          </p>
        </div>
      </div>

      <div className="h-screen flex flex-col pt-10">
        <div className="flex-1 p-8">
          <div className="h-full flex justify-center items-center">
            <div className="flex space-x-12">
              {zigKategorien.map((kategorie) => (
                <div key={kategorie.id} className="flex flex-col items-center">
                  <div
                    className={`w-44 h-44 rounded-full border-4 flex flex-col items-center justify-center cursor-pointer hover:scale-105 shadow-lg ${
                      activeField === kategorie.id
                        ? 'bg-red-600 text-white shadow-2xl transform scale-105'
                        : 'bg-white text-slate-700 border-slate-300 hover:border-red-400'
                    }`}
                    onClick={() => {
                      if (activeField !== kategorie.id) {
                        setActiveField(kategorie.id);
                        setTempZigaretten({ ...zigarettenData });
                      }
                    }}
                  >
                    <span className="text-3xl mb-2">{kategorie.icon}</span>
                    <span className="text-base font-bold">{kategorie.name}</span>
                    <span className="text-xl font-bold mt-2">
                      {calculateKategorieTotal(kategorie.id).toLocaleString()}€
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal */}
        {activeField && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            onClick={() => setActiveField(null)}
          >
            <div
              className="bg-white rounded-2xl border-2 border-red-200 p-8 w-full max-w-3xl shadow-2xl mx-8"
              onClick={(e) => e.stopPropagation()}
            >
              {(() => {
                const aktiveKategorie = zigKategorien.find(k => k.id === activeField);
                return (
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-red-700 flex items-center justify-center gap-3">
                      {aktiveKategorie.icon} {aktiveKategorie.name}
                    </h3>
                    <div className="space-y-4">
                      {tempZigaretten[activeField].map((eintrag, index) => (
                        <div key={index} className="flex gap-3 items-center p-3 bg-red-50 rounded-lg">
                          <input
                            type="text"
                            value={eintrag.bezeichnung}
                            onChange={(e) => {
                              const newArr = [...tempZigaretten[activeField]];
                              newArr[index].bezeichnung = e.target.value;
                              setTempZigaretten(prev => ({ ...prev, [activeField]: newArr }));
                            }}
                            placeholder="Bezeichnung"
                            className="flex-1 p-3 bg-white border-2 border-red-300 rounded-lg"
                          />
                          <input
                            type="number"
                            value={eintrag.betrag}
                            onChange={(e) => {
                              const newArr = [...tempZigaretten[activeField]];
                              newArr[index].betrag = parseFloat(e.target.value) || 0;
                              setTempZigaretten(prev => ({ ...prev, [activeField]: newArr }));
                            }}
                            placeholder="0"
                            className="w-28 p-3 bg-white border-2 border-red-300 rounded-lg text-right"
                          />
                          {tempZigaretten[activeField].length > 1 && (
                            <button
                              onClick={() => {
                                const newArr = [...tempZigaretten[activeField]];
                                newArr.splice(index, 1);
                                setTempZigaretten(prev => ({ ...prev, [activeField]: newArr }));
                              }}
                              className="p-2 text-red-500 hover:bg-red-100 rounded-lg"
                            >
                              ✕
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                    <div className="flex space-x-4 justify-center pt-4 border-t border-red-200">
                      <button
                        onClick={handleSave}
                        className="px-8 py-3 text-base font-semibold text-white bg-red-600 rounded-xl shadow-lg hover:bg-red-700"
                      >
                        💾 Speichern
                      </button>
                      <button
                        onClick={handleCancel}
                        className="px-8 py-3 text-base font-semibold bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300"
                      >
                        ↶ Zurück
                      </button>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        )}
      </div>

      <Sidebar />
      <NavigationButtons />
    </div>
  );
};

  
// Sidebar mit korrigiertem Grünschema und verbesserter Stabilität
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
        {/* Kontinuierlich bewegender Grün-Farbverlauf */}
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

// Mini-Kuchendiagramm für Header - KORRIGIERT mit Grünschema
const createMiniPieChart = () => {
  const radius = headerHovered ? 75 : 55;
  const centerX = 120;
  const centerY = 200;
  
  let cumulativePercentage = 0;
  // Korrigierte Farben im Grünschema (dunkler für bessere Sichtbarkeit)
  const slices = [
    { 
      name: 'Fixkosten', 
      value: percentages.fixkosten, 
      color: '#065f46', // Dunkelgrün für Fixkosten
      page: 'fixkosten',
      emoji: '🏠'
    },
    { 
      name: 'Lifestyle', 
      value: percentages.lifestyle, 
      color: '#047857', // Mittleres Grün für Lifestyle
      page: 'lifestyle',
      emoji: '🎭'
    },
    { 
      name: 'Sicherheit', 
      value: percentages.sicherheit, 
      color: '#059669', // Helles Grün für Sicherheit
      page: 'sicherheit',
      emoji: '🛡️'
    },
    { 
      name: 'Überschuss', 
      value: percentages.ueberschuss, 
      color: percentages.ueberschuss < 0 ? '#dc2626' : '#10b981', // Rot für Defizit, Grün für Überschuss
      page: null,
      emoji: percentages.ueberschuss < 0 ? '⚠️' : '💰'
    }
  ];

  return (
  <svg 
  width="240" 
  height="280"  // Von 240 auf 280 erhöht
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
        
        // Emoji-Position berechnen
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
            
            {/* Emoji nur bei hover und wenn Segment groß genug */}
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
            
            {/* Prozent-Text mit besserer Lesbarkeit */}
            {headerHovered && slice.value > 5 && (
              <text
                x={emojiX}
                y={emojiY + (slice.value > 8 ? 18 : 0)} // Unter Emoji wenn beide sichtbar
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
      
      {/* Zentraler Kreis mit verbessertem Grünschema */}
      <circle
        cx={centerX}
        cy={centerY}
        r={headerHovered ? 32 : 28}
        fill="white"
        stroke="#065f46" // Konsistentes Dunkelgrün
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
        style={{fill: '#065f46'}} // Konsistentes Dunkelgrün
      >
        {calculateBudget()}€
      </text>
      
      {/* Hover-Tooltip für bessere UX */}
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
  // Navigation Buttons mit einheitlichem Grünschema
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

// Header mit korrigierter Höhe und einheitlichem Grünschema
const HeaderBars = () => (
  <div className="fixed top-0 left-0 right-0 h-44 bg-white/70 backdrop-blur-lg border-b border-slate-200/50 z-50">
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
          {currentPage === 'basisabsicherung' && 'Basis-Absicherung'}
          {currentPage === 'zigarettenpage' && 'Investment-Vergleich'}
        </p>

         {/* Home Button mit Grünschema */}
        <button
          onClick={() => setCurrentPage('overview')}
          className="mt-2 px-3 py-1 bg-emerald-700 text-white text-xs rounded-lg hover:bg-emerald-800 transition-all inline-flex items-center gap-1"
        >
          🏠 Zur Übersicht
        </button>

        {/* Import/Export Buttons mit Grünschema */}
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
      
      {/* Drag & Drop Zone */}
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
      
      {/* Navigation Balken mit korrigierten Farben */}
      <div className="flex-1 flex items-end justify-center space-x-8 h-full pb-4">
        <div className="flex flex-col items-center">
          <div 
            className="w-20 h-24 rounded-t-lg flex items-end justify-center pb-2 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg"
            style={{backgroundColor: '#065f46'}} // Dunkelgrün für Wünsche
            onClick={() => setCurrentPage('wuensche')}
          >
            <span className="text-xs text-white font-medium">Wünsche</span>
          </div>
        </div>
        
        <div className="flex flex-col items-center">
          <div 
            className="w-20 h-24 rounded-t-lg flex items-end justify-center pb-2 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg"
            style={{backgroundColor: '#047857'}} // Mittelgrün für Kurz
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
            style={{backgroundColor: '#059669'}} // Helleres Grün für Mittel
            onClick={() => setCurrentPage('mittelfristig')}
          >
            <span className="text-xs text-white font-medium">Mittel</span>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <div 
            className="w-20 h-24 rounded-t-lg flex items-end justify-center pb-2 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg"
            style={{backgroundColor: '#10b981'}} // Sehr helles Grün für Lang
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

<div className="bg-white/70 backdrop-blur-lg border-b border-slate-200/50 relative z-10">
  <div className="grid grid-cols-3 items-center px-8 py-4">
    {/* Linker Bereich */}
    <div>
      <h1 className="text-2xl font-bold text-slate-800">United Hands Capital</h1>
      <p className="text-slate-600 font-medium">Finanzberatungstool</p>
    </div>

    {/* Mittlerer Bereich - ZENTRIERT */}
    <div className="text-center">
      <p className="text-sm text-slate-500 uppercase tracking-wider font-medium">Gesamtbudget</p>
      <p className="text-3xl font-bold" style={{color: '#004225'}}>{calculateBudget().toLocaleString()} €</p>
    </div>

    {/* Rechter Bereich */}
    <div className="flex justify-end">
      <button
        onClick={() => setCurrentPage('zigarettenpage')}
        className="px-4 py-2 bg-white0 text-black text-sm rounded-lg transition-all duration-300 flex items-left gap-2 opacity-0 hover:opacity-100"
      >
        ⏮️
      </button>
    </div>
  </div>
</div>
    
    {/* Hauptcontainer für die vier Kernelemente - KUCHEN-DIAGRAMM PERFEKT ZENTRIERT */}
    <div className="flex-1 flex items-center justify-center relative z-10" style={{ height: 'calc(100vh - 120px - 33.333vh)' }}>
      <div className="flex w-full max-w-6xl justify-center items-center px-8 gap-8">
        {/* Basis Absicherung - LINKS */}
        <div 
          className="flex justify-center animate-fadeIn"
          onClick={() => setCurrentPage('basisabsicherung')}
        >
          <div className="bg-white/70 backdrop-blur-lg rounded-2xl border border-slate-200/50 p-6 hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-105 w-60 flex items-center justify-center">
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

 {/* Kuchen-Diagramm - ZENTRAL - VERGRÖßERT */}
<div className="flex justify-center">
  <div className="relative animate-fadeIn" style={{ animationDelay: '0.2s' }}>
    <svg width="450" height="450" viewBox="0 0 450 450">
      {/* Kuchendiagramm */}
      {createPieChart()}
      
      {/* Innerer Kreis - MITTIG AUSGERICHTET */}
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

        {/* Budget-Verteilung Legende - RECHTS */}
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

      {/* Sidebar - AM RECHTEN RAND */}
      <div className="absolute right-8 top-1/2 transform -translate-y-1/2">
        <Sidebar />
      </div>
    </div>

    {/* 4 Säulen am unteren Ende - UNVERÄNDERT */}
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

// BasisAbsicherungPage - OHNE Statistik-Banner, Fixkosten-Style
const BasisAbsicherungPage = () => {
  const [activeField, setActiveField] = useState(null);
  const [tempBasis, setTempBasis] = useState({ ...basisData });

  const calculateKategorieTotal = (kategorie) => {
    return tempBasis[kategorie].reduce((sum, item) => sum + (parseFloat(item.betrag) || 0), 0);
  };

  const handleSave = () => {
    setBasisData(tempBasis);
    setActiveField(null);
  };

  const handleCancel = () => {
    setTempBasis({ ...basisData });
    setActiveField(null);
  };

  const basisKategorien = [
    { id: 'krankenversicherung', name: 'Krankenversicherung', icon: '🏥', color: '#047857', beschreibung: 'Gesetzlich/Privat' },
    { id: 'pflegeversicherung', name: 'Pflegeversicherung', icon: '❤️', color: '#059669', beschreibung: 'Pflegepflicht' },
    { id: 'arbeitslosenversicherung', name: 'Arbeitslosenversicherung', icon: '💼', color: '#10b981', beschreibung: 'Sicherung im Jobverlust' },
    { id: 'rentenversicherung', name: 'Rentenversicherung', icon: '👴', color: '#34d399', beschreibung: 'Pflichtbeiträge' }
  ];

  return (
    <div className="h-screen bg-gradient-to-br from-emerald-50 to-slate-100 font-sans">
      <HeaderBars />

      <div className="h-screen flex flex-col pt-44">
        <div className="flex-1 p-8">
          <div className="h-full flex justify-center items-center">
            <div className="flex space-x-12">
              {basisKategorien.map((kategorie) => (
                <div key={kategorie.id} className="flex flex-col items-center">
                  <div
                    className={`w-44 h-44 rounded-full border-4 flex flex-col items-center justify-center cursor-pointer transition-all hover:scale-105 relative group ${
                      activeField === kategorie.id
                        ? 'text-white shadow-2xl transform scale-105'
                        : 'bg-white text-slate-700 hover:border-emerald-400 shadow-lg'
                    }`}
                    style={{
                      backgroundColor: activeField === kategorie.id ? kategorie.color : 'white',
                      borderColor: activeField === kategorie.id ? kategorie.color : '#cbd5e1'
                    }}
                    onClick={() => {
                      if (activeField !== kategorie.id) {
                        setActiveField(kategorie.id);
                        setTempBasis({ ...basisData });
                      }
                    }}
                  >
                    <span className="text-3xl mb-2">{kategorie.icon}</span>
                    <span className="text-base font-bold text-center">{kategorie.name}</span>
                    <span className="text-xl font-bold mt-2">
                      {calculateKategorieTotal(kategorie.id).toLocaleString()}€
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {activeField && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            onClick={() => setActiveField(null)}
          >
            <div
              className="bg-white/95 backdrop-blur-lg rounded-2xl border-2 border-emerald-200/50 p-8 w-full max-w-4xl shadow-2xl mx-8"
              onClick={(e) => e.stopPropagation()}
            >
              {(() => {
                const aktiveKategorie = basisKategorien.find(k => k.id === activeField);
                return (
                  <div className="space-y-6">
                    <div className="text-center border-b border-emerald-200 pb-4">
                      <h3 className="text-2xl font-bold text-emerald-800 flex items-center justify-center gap-3">
                        <span className="text-3xl">{aktiveKategorie.icon}</span>
                        {aktiveKategorie.name}
                      </h3>
                      <p className="text-emerald-600 mt-1">{aktiveKategorie.beschreibung}</p>
                    </div>

                    <div className="space-y-4">
                      {tempBasis[activeField].map((eintrag, index) => (
                        <div key={index} className="flex gap-3 items-center p-3 bg-emerald-50 rounded-lg">
                          <input
                            type="text"
                            value={eintrag.bezeichnung}
                            onChange={(e) => {
                              const newArr = [...tempBasis[activeField]];
                              newArr[index].bezeichnung = e.target.value;
                              setTempBasis(prev => ({ ...prev, [activeField]: newArr }));
                            }}
                            placeholder="Bezeichnung"
                            className="flex-1 p-3 bg-white border-2 border-emerald-300 rounded-lg"
                          />
                          <input
                            type="number"
                            value={eintrag.betrag}
                            onChange={(e) => {
                              const newArr = [...tempBasis[activeField]];
                              newArr[index].betrag = parseFloat(e.target.value) || 0;
                              setTempBasis(prev => ({ ...prev, [activeField]: newArr }));
                            }}
                            placeholder="0"
                            className="w-28 p-3 bg-white border-2 border-emerald-300 rounded-lg text-right"
                          />
                        </div>
                      ))}
                    </div>

                    <div className="flex space-x-4 justify-center pt-4 border-t border-emerald-200">
                      <button
                        onClick={handleSave}
                        className="px-8 py-3 text-base font-semibold text-white bg-emerald-600 rounded-xl shadow-lg"
                      >
                        💾 Speichern
                      </button>
                      <button
                        onClick={handleCancel}
                        className="px-8 py-3 text-base font-semibold bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-xl"
                      >
                        ↶ Zurück
                      </button>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        )}
      </div>

      <Sidebar />
      <NavigationButtons />
    </div>
  );
};

// BudgetPage - OHNE Statistik-Banner, Fixkosten-Style
const BudgetPage = () => {
  const [activeField, setActiveField] = useState(null);
  const [tempBudget, setTempBudget] = useState({ ...budgetData });

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
    setTempBudget({ ...budgetData });
    setActiveField(null);
  };

  const budgetKategorien = [
    { id: 'einnahmen', name: 'Einnahmen', icon: '💶', color: '#047857', beschreibung: 'Gehalt, Nebeneinkünfte' },
    { id: 'ausgaben', name: 'Ausgaben', icon: '💸', color: '#059669', beschreibung: 'Monatliche Fixkosten & variable Kosten' },
    { id: 'investitionen', name: 'Investitionen', icon: '📈', color: '#10b981', beschreibung: 'Aktien, ETFs, Projekte' },
    { id: 'ruecklagen', name: 'Rücklagen', icon: '🏦', color: '#34d399', beschreibung: 'Polster für besondere Fälle' }
  ];

  return (
    <div className="h-screen bg-gradient-to-br from-emerald-50 to-slate-100 font-sans">
      <HeaderBars />

      <div className="h-screen flex flex-col pt-44">
        <div className="flex-1 p-8">
          <div className="h-full flex justify-center items-center">
            <div className="flex space-x-12">
              {budgetKategorien.map((kategorie) => (
                <div key={kategorie.id} className="flex flex-col items-center">
                  <div
                    className={`w-44 h-44 rounded-full border-4 flex flex-col items-center justify-center cursor-pointer transition-all hover:scale-105 relative group ${
                      activeField === kategorie.id
                        ? 'text-white shadow-2xl transform scale-105'
                        : 'bg-white text-slate-700 hover:border-emerald-400 shadow-lg'
                    }`}
                    style={{
                      backgroundColor: activeField === kategorie.id ? kategorie.color : 'white',
                      borderColor: activeField === kategorie.id ? kategorie.color : '#cbd5e1'
                    }}
                    onClick={() => {
                      if (activeField !== kategorie.id) {
                        setActiveField(kategorie.id);
                        setTempBudget({ ...budgetData });
                      }
                    }}
                  >
                    <span className="text-3xl mb-2">{kategorie.icon}</span>
                    <span className="text-base font-bold text-center px-4">{kategorie.name}</span>
                    <span className="text-xl font-bold mt-2">
                      {calculateKategorieTotal(kategorie.id).toLocaleString()}€
                    </span>

                    <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white text-xs px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                      {kategorie.beschreibung}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {activeField && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            onClick={() => setActiveField(null)}
          >
            <div
              className="bg-white/95 backdrop-blur-lg rounded-2xl border-2 border-emerald-200/50 p-8 w-full max-w-4xl shadow-2xl mx-8"
              onClick={(e) => e.stopPropagation()}
            >
              {(() => {
                const aktiveKategorie = budgetKategorien.find(k => k.id === activeField);
                return (
                  <div className="space-y-6">
                    <div className="text-center border-b border-emerald-200 pb-4">
                      <h3 className="text-2xl font-bold text-emerald-800 flex items-center justify-center gap-3">
                        <span className="text-3xl">{aktiveKategorie.icon}</span>
                        {aktiveKategorie.name}
                      </h3>
                      <p className="text-emerald-600 mt-1">{aktiveKategorie.beschreibung}</p>
                    </div>

                    <div className="space-y-4">
                      {tempBudget[activeField].map((eintrag, index) => (
                        <div key={index} className="flex gap-3 items-center p-3 bg-emerald-50 rounded-lg hover:bg-emerald-100">
                          <input
                            type="text"
                            value={eintrag.bezeichnung}
                            onChange={(e) => updateEintrag(activeField, index, 'bezeichnung', e.target.value)}
                            placeholder="Bezeichnung"
                            className="flex-1 p-3 bg-white border-2 border-emerald-300 rounded-lg"
                          />
                          <input
                            type="number"
                            value={eintrag.betrag}
                            onChange={(e) => updateEintrag(activeField, index, 'betrag', e.target.value)}
                            placeholder="0"
                            className="w-28 p-3 bg-white border-2 border-emerald-300 rounded-lg text-right"
                          />
                          {tempBudget[activeField].length > 1 && (
                            <button
                              onClick={() => removeEintrag(activeField, index)}
                              className="p-2 text-red-500 hover:bg-red-100 rounded-lg"
                            >
                              ✕
                            </button>
                          )}
                        </div>
                      ))}

                      <button
                        onClick={() => addEintrag(activeField)}
                        className="w-full p-4 border-2 border-dashed border-emerald-300 rounded-lg hover:border-emerald-500"
                      >
                        ➕ Neuen Eintrag hinzufügen
                      </button>
                    </div>

                    <div className="flex space-x-4 justify-center pt-4 border-t border-emerald-200">
                      <button
                        onClick={handleSave}
                        className="px-8 py-3 text-base font-semibold text-white bg-emerald-600 rounded-xl shadow-lg"
                      >
                        💾 Speichern
                      </button>
                      <button
                        onClick={handleCancel}
                        className="px-8 py-3 text-base font-semibold bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-xl"
                      >
                        ↶ Zurück
                      </button>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        )}
      </div>

      <Sidebar />
      <NavigationButtons />
    </div>
  );
};


// FixkostenPage - OHNE Statistik-Banner und mit Modal-Overlay
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
    { id: 'wohnen', name: 'Wohnen', icon: '🏠', color: '#065f46', beschreibung: 'Miete, Nebenkosten, Strom' },
    { id: 'lebensmittel', name: 'Lebensmittel', icon: '🛒', color: '#047857', beschreibung: 'Wocheneinkauf, Getränke' },
    { id: 'abos', name: 'Abos & Services', icon: '📱', color: '#059669', beschreibung: 'Netflix, Spotify, Handy' },
    { id: 'mobilitaet', name: 'Mobilität', icon: '🚗', color: '#10b981', beschreibung: 'ÖPNV, Sprit, Versicherung' },
    { id: 'sonstiges', name: 'Sonstige Fixkosten', icon: '📋', color: '#34d399', beschreibung: 'Weitere feste Ausgaben' }
  ];

  return (
    <div className="h-screen bg-gradient-to-br from-emerald-50 to-slate-100 font-sans">
      <HeaderBars />
      
      <div className="h-screen flex flex-col pt-44">
        <div className="flex-1 p-8">
          <div className="h-full flex justify-center items-center">
            <div className="flex space-x-12">
              {fixkostenKategorien.map((kategorie) => (
                <div key={kategorie.id} className="flex flex-col items-center">
                  <div 
                    className={`w-44 h-44 rounded-full border-4 flex flex-col items-center justify-center cursor-pointer transition-all hover:scale-105 relative group ${
                      activeField === kategorie.id 
                        ? 'text-white shadow-2xl transform scale-105' 
                        : 'bg-white text-slate-700 hover:border-emerald-400 shadow-lg'
                    }`}
                    style={{
                      backgroundColor: activeField === kategorie.id ? kategorie.color : 'white',
                      borderColor: activeField === kategorie.id ? kategorie.color : '#cbd5e1'
                    }}
                    onClick={() => {
                      if (activeField !== kategorie.id) {
                        setActiveField(kategorie.id);
                        setTempFixkosten({...fixkostenData});
                      }
                    }}
                  >
                    <span className="text-3xl mb-2">{kategorie.icon}</span>
                    <span className="text-base font-bold text-center px-4 leading-tight">
                      {kategorie.name}
                    </span>
                    <span className="text-xl font-bold mt-2">
                      {calculateKategorieTotal(kategorie.id).toLocaleString()}€
                    </span>
                    
                    {/* Hover-Info */}
                    <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                      {kategorie.beschreibung}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal Overlay - erscheint ÜBER den Kreisen */}
      {activeField && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={() => setActiveField(null)}
        >
          <div 
            className="bg-white/95 backdrop-blur-lg rounded-2xl border-2 border-emerald-200/50 p-8 w-full max-w-4xl shadow-2xl mx-8"
            onClick={(e) => e.stopPropagation()}
          >
            {(() => {
              const aktiveKategorie = fixkostenKategorien.find(k => k.id === activeField);
              return (
                <div className="space-y-6">
                  <div className="text-center border-b border-emerald-200 pb-4">
                    <h3 className="text-2xl font-bold text-emerald-800 flex items-center justify-center gap-3">
                      <span className="text-3xl">{aktiveKategorie.icon}</span>
                      {aktiveKategorie.name}
                    </h3>
                    <p className="text-emerald-600 mt-1">{aktiveKategorie.beschreibung}</p>
                  </div>
                  
                  <div className="space-y-4">
                    {tempFixkosten[activeField].map((eintrag, index) => (
                      <div key={index} className="flex gap-3 items-center p-3 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors">
                        <div className="flex-1">
                          <input 
                            type="text"
                            value={eintrag.bezeichnung}
                            onChange={(e) => updateEintrag(activeField, index, 'bezeichnung', e.target.value)}
                            placeholder="z.B. Warmmiete, Strom, Internet..."
                            className="w-full p-3 bg-white border-2 border-emerald-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none text-gray-800 placeholder:text-gray-500"
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          <input 
                            type="number"
                            value={eintrag.betrag}
                            onChange={(e) => updateEintrag(activeField, index, 'betrag', e.target.value)}
                            placeholder="0"
                            className="w-28 p-3 bg-white border-2 border-emerald-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none text-right font-semibold"
                          />
                          <span className="text-lg font-semibold text-emerald-700">€</span>
                        </div>
                        {tempFixkosten[activeField].length > 1 && (
                          <button
                            onClick={() => removeEintrag(activeField, index)}
                            className="p-2 text-red-500 hover:bg-red-100 rounded-lg transition-colors flex items-center justify-center w-10 h-10"
                            title="Eintrag löschen"
                          >
                            ✕
                          </button>
                        )}
                      </div>
                    ))}
                    
                    <button
                      onClick={() => addEintrag(activeField)}
                      className="w-full p-4 border-2 border-dashed border-emerald-300 rounded-lg hover:border-emerald-500 hover:bg-emerald-50 transition-all flex items-center justify-center gap-3 group"
                    >
                      <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center group-hover:bg-emerald-600 transition-colors">
                        +
                      </div>
                      <span className="font-semibold text-emerald-700 group-hover:text-emerald-800">Neuen Eintrag hinzufügen</span>
                    </button>
                  </div>
                  
                  {/* Kategorie-Statistiken */}
                  <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-200">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-emerald-800">Kategorie-Summe:</span>
                      <span className="text-xl font-bold text-emerald-700">
                        {calculateKategorieTotal(activeField).toLocaleString()}€
                      </span>
                    </div>
                    <div className="text-sm text-emerald-600">
                      Anteil an Gesamtfixkosten: {finanzData.fixkostenTotal > 0 ? 
                        ((calculateKategorieTotal(activeField) / finanzData.fixkostenTotal) * 100).toFixed(1) : 0}%
                    </div>
                    <div className="w-full bg-emerald-200 rounded-full h-2 mt-2">
                      <div 
                        className="bg-emerald-600 h-2 rounded-full transition-all duration-500"
                        style={{
                          width: `${finanzData.fixkostenTotal > 0 ? 
                            (calculateKategorieTotal(activeField) / finanzData.fixkostenTotal) * 100 : 0}%`
                        }}
                      />
                    </div>
                  </div>
                  
                  <div className="flex space-x-4 justify-center pt-4 border-t border-emerald-200">
                    <button 
                      onClick={handleSave}
                      className="px-8 py-3 text-base font-semibold text-white bg-emerald-600 rounded-xl transition-all shadow-lg hover:shadow-xl hover:bg-emerald-700 hover:scale-105"
                    >
                      💾 Speichern
                    </button>
                    <button 
                      onClick={handleCancel}
                      className="px-8 py-3 text-base font-semibold bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-xl transition-all shadow-md"
                    >
                      ↶ Zurück
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

// LifestylePage - OHNE Statistik-Banner, Fixkosten-Style
const LifestylePage = () => {
  const [activeField, setActiveField] = useState(null);
  const [tempLifestyle, setTempLifestyle] = useState({ ...lifestyleData });

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
    setTempLifestyle({ ...lifestyleData });
    setActiveField(null);
  };

  const lifestyleKategorien = [
    { id: 'freizeit', name: 'Freizeit', icon: '🎬', color: '#047857', beschreibung: 'Kino, Ausflüge, Events' },
    { id: 'restaurant', name: 'Restaurants', icon: '🍽️', color: '#059669', beschreibung: 'Essen gehen, Lieferdienste' },
    { id: 'shopping', name: 'Shopping', icon: '🛍️', color: '#10b981', beschreibung: 'Kleidung, Schuhe, Accessoires' },
    { id: 'wellness', name: 'Wellness & Fitness', icon: '💆‍♂️', color: '#34d399', beschreibung: 'Fitnessstudio, Massagen' },
    { id: 'hobbies', name: 'Hobbies', icon: '⚽', color: '#6ee7b7', beschreibung: 'Sport, Freizeitaktivitäten' }
  ];

  return (
    <div className="h-screen bg-gradient-to-br from-emerald-50 to-slate-100 font-sans">
      <HeaderBars />

      <div className="h-screen flex flex-col pt-44">
        <div className="flex-1 p-8">
          <div className="h-full flex justify-center items-center">
            <div className="flex space-x-12">
              {lifestyleKategorien.map((kategorie) => (
                <div key={kategorie.id} className="flex flex-col items-center">
                  <div
                    className={`w-44 h-44 rounded-full border-4 flex flex-col items-center justify-center cursor-pointer transition-all hover:scale-105 relative group ${
                      activeField === kategorie.id
                        ? 'text-white shadow-2xl transform scale-105'
                        : 'bg-white text-slate-700 hover:border-emerald-400 shadow-lg'
                    }`}
                    style={{
                      backgroundColor: activeField === kategorie.id ? kategorie.color : 'white',
                      borderColor: activeField === kategorie.id ? kategorie.color : '#cbd5e1'
                    }}
                    onClick={() => {
                      if (activeField !== kategorie.id) {
                        setActiveField(kategorie.id);
                        setTempLifestyle({ ...lifestyleData });
                      }
                    }}
                  >
                    <span className="text-3xl mb-2">{kategorie.icon}</span>
                    <span className="text-base font-bold text-center px-4 leading-tight">
                      {kategorie.name}
                    </span>
                    <span className="text-xl font-bold mt-2">
                      {calculateKategorieTotal(kategorie.id).toLocaleString()}€
                    </span>

                    {/* Hover-Info */}
                    <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                      {kategorie.beschreibung}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Overlay */}
        {activeField && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            onClick={() => setActiveField(null)}
          >
            <div
              className="bg-white/95 backdrop-blur-lg rounded-2xl border-2 border-emerald-200/50 p-8 w-full max-w-4xl shadow-2xl mx-8"
              onClick={(e) => e.stopPropagation()}
            >
              {(() => {
                const aktiveKategorie = lifestyleKategorien.find(k => k.id === activeField);
                return (
                  <div className="space-y-6">
                    <div className="text-center border-b border-emerald-200 pb-4">
                      <h3 className="text-2xl font-bold text-emerald-800 flex items-center justify-center gap-3">
                        <span className="text-3xl">{aktiveKategorie.icon}</span>
                        {aktiveKategorie.name}
                      </h3>
                      <p className="text-emerald-600 mt-1">{aktiveKategorie.beschreibung}</p>
                    </div>

                    <div className="space-y-4">
                      {tempLifestyle[activeField].map((eintrag, index) => (
                        <div key={index} className="flex gap-3 items-center p-3 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors">
                          <div className="flex-1">
                            <input
                              type="text"
                              value={eintrag.bezeichnung}
                              onChange={(e) => updateEintrag(activeField, index, 'bezeichnung', e.target.value)}
                              placeholder="z.B. Kino, Essen, Shopping..."
                              className="w-full p-3 bg-white border-2 border-emerald-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none text-gray-800 placeholder:text-gray-500"
                            />
                          </div>
                          <div className="flex items-center gap-2">
                            <input
                              type="number"
                              value={eintrag.betrag}
                              onChange={(e) => updateEintrag(activeField, index, 'betrag', e.target.value)}
                              placeholder="0"
                              className="w-28 p-3 bg-white border-2 border-emerald-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none text-right font-semibold"
                            />
                            <span className="text-lg font-semibold text-emerald-700">€</span>
                          </div>
                          {tempLifestyle[activeField].length > 1 && (
                            <button
                              onClick={() => removeEintrag(activeField, index)}
                              className="p-2 text-red-500 hover:bg-red-100 rounded-lg transition-colors flex items-center justify-center w-10 h-10"
                              title="Eintrag löschen"
                            >
                              ✕
                            </button>
                          )}
                        </div>
                      ))}

                      <button
                        onClick={() => addEintrag(activeField)}
                        className="w-full p-4 border-2 border-dashed border-emerald-300 rounded-lg hover:border-emerald-500 hover:bg-emerald-50 transition-all flex items-center justify-center gap-3 group"
                      >
                        <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center group-hover:bg-emerald-600 transition-colors">
                          +
                        </div>
                        <span className="font-semibold text-emerald-700 group-hover:text-emerald-800">Neuen Eintrag hinzufügen</span>
                      </button>
                    </div>

                    {/* Kategorie-Statistiken */}
                    <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-200">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold text-emerald-800">Kategorie-Summe:</span>
                        <span className="text-xl font-bold text-emerald-700">
                          {calculateKategorieTotal(activeField).toLocaleString()}€
                        </span>
                      </div>
                      <div className="text-sm text-emerald-600">
                        Anteil am Gesamtbudget: {finanzData.lifestyleTotal > 0 ?
                          ((calculateKategorieTotal(activeField) / finanzData.lifestyleTotal) * 100).toFixed(1) : 0}%
                      </div>
                      <div className="w-full bg-emerald-200 rounded-full h-2 mt-2">
                        <div
                          className="bg-emerald-600 h-2 rounded-full transition-all duration-500"
                          style={{
                            width: `${finanzData.lifestyleTotal > 0 ?
                              (calculateKategorieTotal(activeField) / finanzData.lifestyleTotal) * 100 : 0}%`
                          }}
                        />
                      </div>
                    </div>

                    <div className="flex space-x-4 justify-center pt-4 border-t border-emerald-200">
                      <button
                        onClick={handleSave}
                        className="px-8 py-3 text-base font-semibold text-white bg-emerald-600 rounded-xl transition-all shadow-lg hover:shadow-xl hover:bg-emerald-700 hover:scale-105"
                      >
                        💾 Speichern
                      </button>
                      <button
                        onClick={handleCancel}
                        className="px-8 py-3 text-base font-semibold bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-xl transition-all shadow-md"
                      >
                        ↶ Zurück
                      </button>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        )}
      </div>

      <Sidebar />
      <NavigationButtons />
    </div>
  );
};


// SicherheitPage - OHNE Statistik-Banner, Fixkosten-Style
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
    { id: 'notgroschen', name: 'Notgroschen', icon: '💰', color: '#047857', beschreibung: 'Rücklagen für Notfälle' },
    { id: 'versicherungen', name: 'Versicherungen', icon: '🛡️', color: '#059669', beschreibung: 'Haftpflicht, Hausrat etc.' },
    { id: 'altersvorsorge', name: 'Altersvorsorge', icon: '👴', color: '#10b981', beschreibung: 'Private Renten, ETF-Sparpläne' },
    { id: 'gesundheit', name: 'Gesundheit', icon: '⚕️', color: '#34d399', beschreibung: 'Zusatzversicherung, Vorsorge' },
    { id: 'sparen', name: 'Sparen', icon: '🏦', color: '#6ee7b7', beschreibung: 'Sparkonto, Tagesgeld' }
  ];

  return (
    <div className="h-screen bg-gradient-to-br from-emerald-50 to-slate-100 font-sans">
      <HeaderBars />

      <div className="h-screen flex flex-col pt-44">
        <div className="flex-1 p-8">
          <div className="h-full flex justify-center items-center">
            <div className="flex space-x-12">
              {sicherheitKategorien.map((kategorie) => (
                <div key={kategorie.id} className="flex flex-col items-center">
                  <div
                    className={`w-44 h-44 rounded-full border-4 flex flex-col items-center justify-center cursor-pointer transition-all hover:scale-105 relative group ${
                      activeField === kategorie.id
                        ? 'text-white shadow-2xl transform scale-105'
                        : 'bg-white text-slate-700 hover:border-emerald-400 shadow-lg'
                    }`}
                    style={{
                      backgroundColor: activeField === kategorie.id ? kategorie.color : 'white',
                      borderColor: activeField === kategorie.id ? kategorie.color : '#cbd5e1'
                    }}
                    onClick={() => {
                      if (activeField !== kategorie.id) {
                        setActiveField(kategorie.id);
                        setTempSicherheit({ ...sicherheitData });
                      }
                    }}
                  >
                    <span className="text-3xl mb-2">{kategorie.icon}</span>
                    <span className="text-base font-bold text-center px-4 leading-tight">
                      {kategorie.name}
                    </span>
                    <span className="text-xl font-bold mt-2">
                      {calculateKategorieTotal(kategorie.id).toLocaleString()}€
                    </span>

                    {/* Hover-Info */}
                    <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                      {kategorie.beschreibung}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Overlay */}
        {activeField && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            onClick={() => setActiveField(null)}
          >
            <div
              className="bg-white/95 backdrop-blur-lg rounded-2xl border-2 border-emerald-200/50 p-8 w-full max-w-4xl shadow-2xl mx-8"
              onClick={(e) => e.stopPropagation()}
            >
              {(() => {
                const aktiveKategorie = sicherheitKategorien.find(k => k.id === activeField);
                return (
                  <div className="space-y-6">
                    <div className="text-center border-b border-emerald-200 pb-4">
                      <h3 className="text-2xl font-bold text-emerald-800 flex items-center justify-center gap-3">
                        <span className="text-3xl">{aktiveKategorie.icon}</span>
                        {aktiveKategorie.name}
                      </h3>
                      <p className="text-emerald-600 mt-1">{aktiveKategorie.beschreibung}</p>
                    </div>

                    {/* Einträge */}
                    <div className="space-y-4">
                      {tempSicherheit[activeField].map((eintrag, index) => (
                        <div key={index} className="flex gap-3 items-center p-3 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors">
                          <div className="flex-1">
                            <input
                              type="text"
                              value={eintrag.bezeichnung}
                              onChange={(e) => updateEintrag(activeField, index, 'bezeichnung', e.target.value)}
                              placeholder="z.B. Versicherung, Rücklage..."
                              className="w-full p-3 bg-white border-2 border-emerald-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                            />
                          </div>
                          <div className="flex items-center gap-2">
                            <input
                              type="number"
                              value={eintrag.betrag}
                              onChange={(e) => updateEintrag(activeField, index, 'betrag', e.target.value)}
                              className="w-28 p-3 bg-white border-2 border-emerald-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-right font-semibold"
                            />
                            <span className="text-lg font-semibold text-emerald-700">€</span>
                          </div>
                          {tempSicherheit[activeField].length > 1 && (
                            <button
                              onClick={() => removeEintrag(activeField, index)}
                              className="p-2 text-red-500 hover:bg-red-100 rounded-lg"
                            >
                              ✕
                            </button>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Aktionen */}
                    <div className="flex space-x-4 justify-center pt-4 border-t border-emerald-200">
                      <button
                        onClick={handleSave}
                        className="px-8 py-3 text-base font-semibold text-white bg-emerald-600 rounded-xl shadow-lg hover:bg-emerald-700 hover:scale-105"
                      >
                        💾 Speichern
                      </button>
                      <button
                        onClick={handleCancel}
                        className="px-8 py-3 text-base font-semibold bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-xl"
                      >
                        ↶ Zurück
                      </button>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        )}
      </div>

      <Sidebar />
      <NavigationButtons />
    </div>
  );
};


// WünschePage - OHNE Statistik-Banner, Fixkosten-Style
const WuenschePage = () => {
  const [activeField, setActiveField] = useState(null);
  const [tempWuensche, setTempWuensche] = useState({ ...wuenscheData });

  const calculateKategorieTotal = (kategorie) => {
    return tempWuensche[kategorie].reduce((sum, item) => sum + (parseFloat(item.erreicht) || 0), 0);
  };

  const handleSave = () => {
    setWuenscheData(tempWuensche);
    setActiveField(null);
  };

  const handleCancel = () => {
    setTempWuensche({ ...wuenscheData });
    setActiveField(null);
  };

  const wuenscheKategorien = [
    { id: 'traumurlaub', name: 'Traumurlaub', icon: '🏝️', color: '#047857', beschreibung: 'Reisen & Abenteuer' },
    { id: 'luxus', name: 'Luxus', icon: '💎', color: '#059669', beschreibung: 'Exklusive Anschaffungen' },
    { id: 'erlebnisse', name: 'Erlebnisse', icon: '🎉', color: '#10b981', beschreibung: 'Besondere Erfahrungen' },
    { id: 'weiterbildung', name: 'Weiterbildung', icon: '📚', color: '#34d399', beschreibung: 'Studium & Kurse' },
    { id: 'geschenke', name: 'Geschenke', icon: '🎁', color: '#6ee7b7', beschreibung: 'Für Freunde & Familie' }
  ];

  return (
    <div className="h-screen bg-gradient-to-br from-emerald-50 to-slate-100 font-sans">
      <HeaderBars />

      <div className="h-screen flex flex-col pt-44">
        <div className="flex-1 p-8">
          <div className="h-full flex justify-center items-center">
            <div className="flex space-x-12">
              {wuenscheKategorien.map((kategorie) => (
                <div key={kategorie.id} className="flex flex-col items-center">
                  <div
                    className={`w-44 h-44 rounded-full border-4 flex flex-col items-center justify-center cursor-pointer transition-all hover:scale-105 relative group ${
                      activeField === kategorie.id
                        ? 'text-white shadow-2xl transform scale-105'
                        : 'bg-white text-slate-700 hover:border-emerald-400 shadow-lg'
                    }`}
                    style={{
                      backgroundColor: activeField === kategorie.id ? kategorie.color : 'white',
                      borderColor: activeField === kategorie.id ? kategorie.color : '#cbd5e1'
                    }}
                    onClick={() => {
                      if (activeField !== kategorie.id) {
                        setActiveField(kategorie.id);
                        setTempWuensche({ ...wuenscheData });
                      }
                    }}
                  >
                    <span className="text-3xl mb-2">{kategorie.icon}</span>
                    <span className="text-base font-bold text-center">{kategorie.name}</span>
                    <span className="text-xl font-bold mt-2">
                      {calculateKategorieTotal(kategorie.id).toLocaleString()}€
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Overlay */}
        {activeField && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            onClick={() => setActiveField(null)}
          >
            <div
              className="bg-white/95 backdrop-blur-lg rounded-2xl border-2 border-emerald-200/50 p-8 w-full max-w-4xl shadow-2xl mx-8"
              onClick={(e) => e.stopPropagation()}
            >
              {(() => {
                const aktiveKategorie = wuenscheKategorien.find(k => k.id === activeField);
                return (
                  <div className="space-y-6">
                    <div className="text-center border-b border-emerald-200 pb-4">
                      <h3 className="text-2xl font-bold text-emerald-800 flex items-center justify-center gap-3">
                        <span className="text-3xl">{aktiveKategorie.icon}</span>
                        {aktiveKategorie.name}
                      </h3>
                      <p className="text-emerald-600 mt-1">{aktiveKategorie.beschreibung}</p>
                    </div>

                    <div className="space-y-4">
                      {tempWuensche[activeField].map((eintrag, index) => (
                        <div key={index} className="p-3 bg-emerald-50 rounded-lg">
                          <div className="flex justify-between">
                            <span className="font-semibold">{eintrag.bezeichnung}</span>
                            <span className="text-sm text-emerald-600">
                              Ziel: {eintrag.betrag}€ | Erreicht: {eintrag.erreicht}€
                            </span>
                          </div>
                          <div className="w-full bg-emerald-200 rounded-full h-2 mt-2">
                            <div
                              className="bg-emerald-600 h-2 rounded-full"
                              style={{ width: `${(eintrag.erreicht / eintrag.betrag) * 100}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex space-x-4 justify-center pt-4 border-t border-emerald-200">
                      <button
                        onClick={handleSave}
                        className="px-8 py-3 text-base font-semibold text-white bg-emerald-600 rounded-xl shadow-lg"
                      >
                        💾 Speichern
                      </button>
                      <button
                        onClick={handleCancel}
                        className="px-8 py-3 text-base font-semibold bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-xl"
                      >
                        ↶ Zurück
                      </button>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        )}
      </div>

      <Sidebar />
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
      case 'fixkosten':
        return <FixkostenPage />;
      case 'zigaretten':
        return <ZigarettenInvestmentPage />;
      case 'basisabsicherung':
        return <BasisAbsicherungPage />;
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
