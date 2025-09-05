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

// Zigaretten-Investment-Vergleich Page
const ZigarettenInvestmentPage = () => {
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
    <div className={`h-screen bg-gradient-to-br from-slate-50 to-slate-100 font-sans ${pageTransition ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}>
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
  
 // 1. SIDEBAR ohne Wackel-Effekt
const Sidebar = () => {
  const sidebarItems = [
    { id: 'fixkosten', name: 'Fixkosten', icon: '🏠', color: '#004225' },
    { id: 'lifestyle', name: 'Lifestyle', icon: '🎭', color: '#1f5f3f' },
    { id: 'sicherheit', name: 'Sicherheit', icon: '🛡️', color: '#4d7c5f' }
  ];

  return (
    <>
      {/* ERHÖHTER Z-INDEX + ABSOLUTE POSITIONIERUNG */}
      <div 
        className="fixed right-8 z-[100]" 
        style={{ 
          top: '40%', 
          transform: 'translateY(-50%)',
          pointerEvents: 'auto' 
        }}
      >
        {/* Kontinuierlich bewegender Farbverlauf */}
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
          0% {
            background: linear-gradient(
              45deg,
              #004225 0%,
              #1f5f3f 20%,
              #4d7c5f 40%,
              #6b8e6b 60%,
              #004225 80%,
              #1f5f3f 100%
            );
            background-size: 200% 200%;
            background-position: 0% 0%;
          }
          25% {
            background: linear-gradient(
              45deg,
              #004225 0%,
              #1f5f3f 20%,
              #4d7c5f 40%,
              #6b8e6b 60%,
              #004225 80%,
              #1f5f3f 100%
            );
            background-size: 200% 200%;
            background-position: 100% 0%;
          }
          50% {
            background: linear-gradient(
              45deg,
              #004225 0%,
              #1f5f3f 20%,
              #4d7c5f 40%,
              #6b8e6b 60%,
              #004225 80%,
              #1f5f3f 100%
            );
            background-size: 200% 200%;
            background-position: 100% 100%;
          }
          75% {
            background: linear-gradient(
              45deg,
              #004225 0%,
              #1f5f3f 20%,
              #4d7c5f 40%,
              #6b8e6b 60%,
              #004225 80%,
              #1f5f3f 100%
            );
            background-size: 200% 200%;
            background-position: 0% 100%;
          }
          100% {
            background: linear-gradient(
              45deg,
              #004225 0%,
              #1f5f3f 20%,
              #4d7c5f 40%,
              #6b8e6b 60%,
              #004225 80%,
              #1f5f3f 100%
            );
            background-size: 200% 200%;
            background-position: 0% 0%;
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

  // Mini-Kuchendiagramm für Header mit Emojis und differenzierten Farben
const createMiniPieChart = () => {
  const radius = headerHovered ? 95 : 65;
  const centerX = 120;
  const centerY = 120;
  
  let cumulativePercentage = 0;
  // UNTERSCHIEDLICHE Farben für das Mini-Diagramm (dunkler als Header-Balken)
  const slices = [
    { 
      name: 'Fixkosten', 
      value: percentages.fixkosten, 
      color: '#002818', // Noch dunkler als #004225
      page: 'fixkosten',
      emoji: '🏠'
    },
    { 
      name: 'Lifestyle', 
      value: percentages.lifestyle, 
      color: '#0f3a28', // Dunkler als #1f5f3f
      page: 'lifestyle',
      emoji: '🎭'
    },
    { 
      name: 'Sicherheit', 
      value: percentages.sicherheit, 
      color: '#2d5040', // Dunkler als #4d7c5f
      page: 'sicherheit',
      emoji: '🛡️'
    },
    { 
      name: 'Überschuss', 
      value: percentages.ueberschuss, 
      color: percentages.ueberschuss < 0 ? '#dc2626' : '#059669', // Grün/Rot je nach Wert
      page: null,
      emoji: percentages.ueberschuss < 0 ? '⚠️' : '💰'
    }
  ];

  return (
    <svg 
      width="240" 
      height="240" 
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
              className="cursor-pointer transition-all duration-300 hover:opacity-80"
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
            
            {/* Prozent-Text */}
            {headerHovered && slice.value > 5 && (
              <text
                x={emojiX}
                y={emojiY + (slice.value > 8 ? 18 : 0)} // Unter Emoji wenn beide sichtbar
                textAnchor="middle"
                className="text-[10px] font-bold fill-white pointer-events-none animate-fadeIn"
                dy="3"
              >
                {slice.value.toFixed(0)}%
              </text>
            )}
          </g>
        );
      })}
      
      {/* Zentraler Kreis mit verbessertem Grün */}
      <circle
        cx={centerX}
        cy={centerY}
        r={headerHovered ? 32 : 28}
        fill="white"
        stroke="#004225" // Konsistent mit Hauptfarbe
        strokeWidth="2"
        className="cursor-pointer transition-all duration-300"
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
        style={{fill: '#004225'}} // Grün statt Blau
      >
        {calculateBudget()}€
      </text>
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
            className="px-6 py-3 bg-white/90 backdrop-blur-lg border-2 border-slate-300 rounded-xl font-semibold text-slate-700 hover:bg-slate-50 hover:scale-105 transition-all duration-200 shadow-lg"
          >
            ← Zurück
          </button>
        )}
        {nextPage && (
          <button
            onClick={() => setCurrentPage(nextPage)}
            className="px-6 py-3 text-white rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
            style={{backgroundColor: '#004225'}}
          >
            Weiter →
          </button>
        )}
      </div>
    );
  };

// Header mit Balken und Import/Export
const HeaderBars = () => (
  <div className="fixed top-0 left-0 right-0 h-47 bg-white/70 backdrop-blur-lg border-b border-slate-200/50 z-50">
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

         {/* Home Button hinzufügen */}
        <button
          onClick={() => setCurrentPage('overview')}
          className="mt-2 px-3 py-1 bg-slate-700 text-white text-xs rounded-lg hover:bg-slate-800 transition-all inline-flex items-center gap-1"
        >
          🏠 Zur Übersicht
        </button>

        {/* Import/Export Buttons daneben */}
        <div className="inline-flex gap-2 ml-2">
          <button
            onClick={exportData}
            className="px-3 py-1 bg-green-600 text-white text-xs rounded-lg hover:bg-green-700 transition-all"
          >
            📥 Export
          </button>
          
          <label className="px-3 py-1 bg-blue-600 text-white text-xs rounded-lg hover:bg-blue-700 transition-all cursor-pointer">
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
          dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-gray-50'
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
      
      {/* Bestehende Navigation Balken */}
      <div className="flex-1 flex items-end justify-center space-x-8 h-full pb-6">
        {/* Hier bleibt der Rest Ihrer Navigation wie gehabt */}
        <div className="flex flex-col items-center">
          <div 
            className="w-20 h-20 rounded-t-lg flex items-end justify-center pb-2 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg"
            style={{backgroundColor: '#0B2E70'}}
            onClick={() => setCurrentPage('wuensche')}
          >
            <span className="text-xs text-white font-medium">Wünsche</span>
          </div>
        </div>
        
        {/* Rest der Balken... */}
        <div className="flex flex-col items-center">
          <div 
            className="bg-slate-500 w-20 h-20 rounded-t-lg flex items-end justify-center pb-2 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg"
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
            className="bg-slate-400 w-20 h-20 rounded-t-lg flex items-end justify-center pb-2 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg"
            onClick={() => setCurrentPage('mittelfristig')}
          >
            <span className="text-xs text-white font-medium">Mittel</span>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <div 
            className="bg-slate-600 w-20 h-20 rounded-t-lg flex items-end justify-center pb-2 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg"
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
        onClick={() => setCurrentPage('zigaretten')}
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

// Basis-Absicherung Page - Professioneller Look 2025
const BasisAbsicherungPage = () => {
  const [selectedVersicherung, setSelectedVersicherung] = useState(null);
  const [tempBasisData, setTempBasisData] = useState({...basisAbsicherungData});
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [animateCards, setAnimateCards] = useState(false);
  
  useEffect(() => {
    setAnimateCards(true);
  }, []);
  
  const versicherungsTypen = [
    { 
      id: 'krankenversicherung',
      name: 'Krankenversicherung',
      pflicht: true,
      beschreibung: 'Gesetzlich vorgeschrieben für alle',
      details: 'Beitragsbemessungsgrenze 2025: 66.150€/Jahr',
      minBetrag: 200,
      maxBetrag: 900,
      farbe: '#dc2626'
    },
    { 
      id: 'haftpflicht',
      name: 'Privathaftpflicht',
      pflicht: false,
      wichtigkeit: 'KRITISCH',
      beschreibung: 'Schützt vor existenzbedrohenden Forderungen',
      empfohleneDecking: 50000000,
      details: 'Mindestens 10 Mio. €, besser 50-100 Mio. € Deckung',
      farbe: '#dc2626'
    },
    { 
      id: 'berufsunfaehigkeit',
      name: 'Berufsunfähigkeit (BU)',
      pflicht: false,
      wichtigkeit: 'SEHR HOCH',
      beschreibung: 'Sichert Ihre Arbeitskraft ab',
      empfohlen: '70-80% des Nettoeinkommens',
      details: 'Jeder 4. wird berufsunfähig. Staatliche EM-Rente nur ø 1.059€',
      farbe: '#ea580c'
    },
    { 
      id: 'rechtsschutz',
      name: 'Rechtsschutz',
      pflicht: false,
      wichtigkeit: 'MITTEL',
      beschreibung: 'Hilfe bei rechtlichen Streitigkeiten',
      details: 'Privat-, Berufs- und Verkehrsrechtsschutz empfohlen',
      farbe: '#f59e0b'
    },
    { 
      id: 'hausrat',
      name: 'Hausratversicherung',
      pflicht: false,
      wichtigkeit: 'MITTEL',
      beschreibung: 'Schutz für Ihr Eigentum',
      details: 'Empfohlen ab Hausrat > 10.000€',
      farbe: '#10b981'
    },
    { 
      id: 'kfzVersicherung',
      name: 'KFZ-Versicherung',
      pflicht: true,
      beschreibung: 'Pflicht bei Fahrzeugbesitz',
      details: 'Haftpflicht min. 100 Mio. € empfohlen',
      farbe: '#6366f1'
    },
    {
      id: 'auslandskranken',
      name: 'Auslandskrankenversicherung',
      pflicht: false,
      wichtigkeit: 'NIEDRIG',
      beschreibung: 'Wichtig für Reisen',
      details: 'Sehr günstig (ca. 10-25€/Jahr)',
      farbe: '#10b981'
    }
  ];
  
  const calculateAbsicherungsgrad = () => {
    let score = 0;
    let maxScore = 0;
    
    const gewichtung = {
      krankenversicherung: 30,
      haftpflicht: 25,
      berufsunfaehigkeit: 25,
      kfzVersicherung: 15,
      rechtsschutz: 10,
      hausrat: 8,
      auslandskranken: 5
    };
    
    Object.entries(gewichtung).forEach(([key, weight]) => {
      const versicherung = versicherungsTypen.find(v => v.id === key);
      if (versicherung) {
        maxScore += weight;
        if (tempBasisData[key]?.status === 'vorhanden') {
          score += weight;
        } else if (tempBasisData[key]?.status === 'teilweise') {
          score += weight * 0.5;
        }
      }
    });
    
    return (score / maxScore) * 100;
  };
  
  const absicherungsgrad = calculateAbsicherungsgrad();
  
  const calculateGesamtkosten = () => {
    return Object.values(tempBasisData).reduce((sum, item) => 
      sum + (parseFloat(item.monatlich) || 0), 0
    );
  };
  
  const calculateEmpfohleneKosten = () => {
    return Object.values(tempBasisData).reduce((sum, item) => 
      sum + (parseFloat(item.empfohlen) || 0), 0
    );
  };
  
  const getRisikoLevel = () => {
    if (absicherungsgrad >= 85) return { 
      text: 'Exzellent abgesichert', 
      color: '#14532d',
      bgColor: 'bg-green-50',
      beschreibung: 'Sie sind optimal geschützt'
    };
    if (absicherungsgrad >= 70) return { 
      text: 'Gut abgesichert', 
      color: '#166534',
      bgColor: 'bg-green-50',
      beschreibung: 'Solide Grundabsicherung vorhanden'
    };
    if (absicherungsgrad >= 50) return { 
      text: 'Lücken vorhanden', 
      color: '#ea580c',
      bgColor: 'bg-orange-50',
      beschreibung: 'Wichtige Versicherungen fehlen'
    };
    return { 
      text: 'Kritisch unterversichert', 
      color: '#dc2626',
      bgColor: 'bg-red-50',
      beschreibung: 'Dringender Handlungsbedarf!'
    };
  };
  
  const risikoLevel = getRisikoLevel();
  
  const getHandlungsempfehlungen = () => {
    const empfehlungen = [];
    
    if (tempBasisData.haftpflicht.status === 'fehlt') {
      empfehlungen.push({
        prioritaet: 'KRITISCH',
        titel: 'Privathaftpflicht abschließen',
        beschreibung: 'Absolut essentiell! Schützt vor existenzbedrohenden Kosten',
        kosten: tempBasisData.haftpflicht.empfohlen
      });
    }
    
    if (tempBasisData.berufsunfaehigkeit.status === 'fehlt') {
      empfehlungen.push({
        prioritaet: 'HOCH',
        titel: 'Berufsunfähigkeit absichern',
        beschreibung: 'Jeder 4. wird berufsunfähig - sichern Sie Ihr Einkommen',
        kosten: tempBasisData.berufsunfaehigkeit.empfohlen
      });
    }
    
    if (tempBasisData.haftpflicht.deckung < 10000000) {
      empfehlungen.push({
        prioritaet: 'MITTEL',
        titel: 'Haftpflicht-Deckung erhöhen',
        beschreibung: 'Auf mind. 50 Mio. € erhöhen (kostet kaum mehr)',
        kosten: 2
      });
    }
    
    return empfehlungen;
  };
  
  return (
    <div className="h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 font-sans">
      {/* Premium Header mit Glassmorphism */}
      <div className="fixed top-0 left-0 right-0 h-32 bg-white/80 backdrop-blur-xl border-b border-slate-200/50 z-50 shadow-lg">
        <div className="h-full flex items-center px-8 relative">
          <div className="absolute left-8 top-1/2 transform -translate-y-1/2">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              United Hands Capital
            </h1>
            <p className="text-sm text-slate-600">Basis-Absicherung 2025 • Ihr professioneller Schutz</p>
            
            {/* Home Button */}
            <button
              onClick={() => setCurrentPage('overview')}
              className="mt-2 px-3 py-1 bg-slate-700 text-white text-xs rounded-lg hover:bg-slate-800 transition-all"
            >
              🏠 Zur Übersicht
            </button>
          </div>
          
          {/* Risiko-Dashboard */}
          <div className="absolute right-8 top-1/2 transform -translate-y-1/2">
            <div className="flex items-center gap-8">
              <div className="text-center">
                <p className="text-xs text-slate-500 uppercase tracking-wider">Monatliche Kosten</p>
                <p className="text-2xl font-bold text-slate-900">{calculateGesamtkosten()}€</p>
              </div>
              
              <div className="text-center">
                <p className="text-xs text-slate-500 uppercase tracking-wider">Absicherungsgrad</p>
                <div className="flex items-center gap-3 mt-1">
                  <div className="w-32 h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full transition-all duration-1000 ease-out rounded-full"
                      style={{
                        width: `${absicherungsgrad}%`,
                        background: `linear-gradient(90deg, ${risikoLevel.color} 0%, ${risikoLevel.color}dd 100%)`
                      }}
                    />
                  </div>
                  <span className="text-xl font-bold" style={{color: risikoLevel.color}}>
                    {absicherungsgrad.toFixed(0)}%
                  </span>
                </div>
              </div>
              
              <div className={`px-4 py-2 rounded-lg ${risikoLevel.bgColor}`}>
                <p className="text-xs uppercase tracking-wider" style={{color: risikoLevel.color}}>Status</p>
                <p className="font-bold" style={{color: risikoLevel.color}}>{risikoLevel.text}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="h-screen flex flex-col pt-32">
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            {/* KPI Cards */}
            <div className="grid grid-cols-4 gap-4 mb-8">
              <div className="bg-white/90 backdrop-blur-lg rounded-xl p-5 shadow-lg border border-emerald-100 hover:shadow-xl transition-all">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-600 font-medium">Gesamtkosten</span>
                  <span className="text-2xl">💰</span>
                </div>
                <p className="text-3xl font-bold text-emerald-800">
                  {calculateGesamtkosten()}€/M
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  {((calculateGesamtkosten() / calculateBudget()) * 100).toFixed(1)}% vom Budget
                </p>
              </div>
              
              <div className="bg-white/90 backdrop-blur-lg rounded-xl p-5 shadow-lg border border-orange-100 hover:shadow-xl transition-all">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-600 font-medium">Fehlende Absicherung</span>
                  <span className="text-2xl">⚠️</span>
                </div>
                <p className="text-3xl font-bold text-orange-600">
                  {Object.values(tempBasisData).filter(v => v.status === 'fehlt').length}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Versicherungen fehlen
                </p>
              </div>
              
              <div className="bg-white/90 backdrop-blur-lg rounded-xl p-5 shadow-lg border border-blue-100 hover:shadow-xl transition-all">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-600 font-medium">Empfohlene Kosten</span>
                  <span className="text-2xl">📈</span>
                </div>
                <p className="text-3xl font-bold text-blue-700">
                  +{calculateEmpfohleneKosten()}€/M
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Für vollständigen Schutz
                </p>
              </div>
              
              <div className="bg-white/90 backdrop-blur-lg rounded-xl p-5 shadow-lg border border-purple-100 hover:shadow-xl transition-all">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-600 font-medium">Priorität</span>
                  <span className="text-2xl">⚡</span>
                </div>
                <p className="text-lg font-bold text-purple-700">
                  {tempBasisData.berufsunfaehigkeit.status === 'fehlt' 
                    ? 'BU abschließen' 
                    : tempBasisData.haftpflicht.status === 'fehlt'
                    ? 'Haftpflicht!'
                    : 'Optimieren'}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Nächster Schritt
                </p>
              </div>
            </div>
            
            {/* Versicherungs-Grid */}
            <div className="grid grid-cols-3 gap-5">
              {versicherungsTypen.map((versicherung) => {
                const data = tempBasisData[versicherung.id];
                const statusColor = 
                  data?.status === 'vorhanden' ? '#059669' : 
                  data?.status === 'teilweise' ? '#f59e0b' : '#dc2626';
                
                return (
                  <div 
                    key={versicherung.id}
                    className="bg-white/90 backdrop-blur-lg rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all cursor-pointer border-2 hover:border-blue-300 border-transparent"
                    onClick={() => {
                      setSelectedVersicherung(versicherung);
                      setShowDetailModal(true);
                    }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-bold text-lg text-slate-800 mb-1">
                          {versicherung.name}
                        </h3>
                        {versicherung.pflicht && (
                          <span className="inline-block px-2 py-1 bg-red-50 text-red-700 text-xs rounded font-semibold">
                            PFLICHT
                          </span>
                        )}
                        {versicherung.wichtigkeit && (
                          <span className={`inline-block px-2 py-1 text-xs rounded font-semibold ml-1 ${
                            versicherung.wichtigkeit === 'KRITISCH' ? 'bg-red-50 text-red-700' :
                            versicherung.wichtigkeit === 'SEHR HOCH' ? 'bg-orange-50 text-orange-700' :
                            versicherung.wichtigkeit === 'HOCH' ? 'bg-yellow-50 text-yellow-700' :
                            'bg-gray-50 text-gray-700'
                          }`}>
                            {versicherung.wichtigkeit}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-4">
                      {versicherung.beschreibung}
                    </p>
                    
                    {versicherung.details && (
                      <p className="text-xs text-gray-500 mb-3 italic">
                        {versicherung.details}
                      </p>
                    )}
                    
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: statusColor }}
                        />
                        <span className="text-sm font-medium" style={{ color: statusColor }}>
                          {data?.status === 'vorhanden' ? 'Aktiv' : 
                           data?.status === 'teilweise' ? 'Teilweise' : 'Fehlt'}
                        </span>
                      </div>
                      
                      <span className="text-lg font-bold text-slate-700">
                        {data?.monatlich || 0}€/M
                      </span>
                    </div>
                    
                    {data?.status === 'fehlt' && data?.empfohlen && (
                      <div className="mt-3 pt-3 border-t border-gray-200">
                        <p className="text-xs text-orange-600 font-medium">
                          Empfohlener Beitrag: {data.empfohlen}€/Monat
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            
            {/* Handlungsempfehlungen */}
            {getHandlungsempfehlungen().length > 0 && (
              <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
                <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <span className="text-2xl">🎯</span>
                  Ihre priorisierten Handlungsempfehlungen
                </h3>
                <div className="space-y-3">
                  {getHandlungsempfehlungen().map((empfehlung, index) => (
                    <div 
                      key={index}
                      className={`flex items-start gap-4 p-4 rounded-lg ${
                        empfehlung.prioritaet === 'KRITISCH' ? 'bg-red-50 border border-red-200' :
                        empfehlung.prioritaet === 'HOCH' ? 'bg-orange-50 border border-orange-200' :
                        'bg-white border border-gray-200'
                      }`}
                    >
                      <div className={`w-2 h-2 rounded-full mt-2 ${
                        empfehlung.prioritaet === 'KRITISCH' ? 'bg-red-500' :
                        empfehlung.prioritaet === 'HOCH' ? 'bg-orange-500' :
                        'bg-blue-500'
                      }`} />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-semibold text-slate-900">{empfehlung.titel}</p>
                          {empfehlung.prioritaet === 'KRITISCH' && (
                            <span className="px-2 py-0.5 bg-red-600 text-white text-xs rounded-full">
                              DRINGEND
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{empfehlung.beschreibung}</p>
                        {empfehlung.kosten && (
                          <p className="text-xs text-gray-500 mt-2">
                            Zusätzliche Kosten: ca. {empfehlung.kosten}€/Monat
                          </p>
                        )}
                      </div>
                      <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors">
                        Jetzt handeln
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Experten-Tipp 2025 */}
            <div className="mt-6 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-6 border border-emerald-200">
              <div className="flex items-start gap-4">
                <span className="text-2xl">💡</span>
                <div>
                  <h4 className="font-bold text-emerald-900 mb-2">Experten-Tipp 2025</h4>
                  <p className="text-sm text-emerald-800">
                    Der Höchstrechnungszins steigt 2025 erstmals seit 30 Jahren von 0,25% auf 1%. 
                    Das macht BU-Versicherungen günstiger - idealer Zeitpunkt zum Abschluss! 
                    Die durchschnittlichen GKV-Zusatzbeiträge steigen auf 2,5%. 
                    Prüfen Sie jetzt Ihre Absicherung und nutzen Sie die günstigen Konditionen.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Detail Modal */}
      <Modal isOpen={showDetailModal} onClose={() => setShowDetailModal(false)}>
        {selectedVersicherung && (
          <div className="bg-white rounded-2xl p-8 max-w-2xl w-full shadow-2xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 rounded-lg" style={{ backgroundColor: selectedVersicherung.farbe + '20' }}>
                <div className="w-8 h-8" style={{ backgroundColor: selectedVersicherung.farbe }} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900">{selectedVersicherung.name}</h2>
                {selectedVersicherung.pflicht && (
                  <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">PFLICHTVERSICHERUNG</span>
                )}
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-700">{selectedVersicherung.beschreibung}</p>
                {selectedVersicherung.details && (
                  <p className="text-sm text-gray-600 mt-2">{selectedVersicherung.details}</p>
                )}
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600">Aktueller Status</p>
                  <p className="text-lg font-bold" style={{ 
                    color: tempBasisData[selectedVersicherung.id].status === 'vorhanden' ? '#059669' : '#dc2626' 
                  }}>
                    {tempBasisData[selectedVersicherung.id].status === 'vorhanden' ? 'Aktiv' : 
                     tempBasisData[selectedVersicherung.id].status === 'teilweise' ? 'Teilweise' : 'Fehlt'}
                  </p>
                </div>
                
                <div className="bg-green-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600">Monatliche Kosten</p>
                  <p className="text-lg font-bold text-gray-900">
                    {tempBasisData[selectedVersicherung.id].monatlich || tempBasisData[selectedVersicherung.id].empfohlen || 0}€
                  </p>
                </div>
              </div>
              
              {tempBasisData[selectedVersicherung.id].status === 'fehlt' && (
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <div className="flex items-center gap-2">
                    <span className="text-orange-600">⚠️</span>
                    <p className="text-orange-800 font-medium">Empfohlene Maßnahme</p>
                  </div>
                  <p className="text-sm text-orange-700 mt-1">
                    Schließen Sie diese Versicherung ab. Empfohlener Beitrag: {tempBasisData[selectedVersicherung.id].empfohlen}€/Monat
                  </p>
                </div>
              )}
              
              <button 
                onClick={() => setShowDetailModal(false)}
                className="w-full bg-slate-900 text-white py-3 rounded-lg hover:bg-slate-800 transition-colors"
              >
                Schließen
              </button>
            </div>
          </div>
        )}
      </Modal>
      
      <NavigationButtons />
    </div>
  );
};
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
                          backgroundColor: activeField === feld.id ? '#004225' : 'white',
                          borderColor: activeField === feld.id ? '#004225' : '#cbd5e1'
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
                                  style={{color: '#004225'}}
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
                                style={{backgroundColor: '#004225'}}
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
        <Sidebar /> 
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
                          backgroundColor: activeField === kategorie.id ? '#004225' : 'white',
                          borderColor: activeField === kategorie.id ? '#004225' : '#cbd5e1'
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
        <Sidebar /> 
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
        <Sidebar />
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
                              <span style={{color: '#004225'}}>
                                {calculateKategorieTotal(activeField).toLocaleString()}€
                              </span>
                            </div>
                          </div>
                          
                          <div className="flex space-x-4 justify-center">
                            <button 
                              onClick={handleSave}
                              className="px-8 py-3 text-base font-semibold text-white rounded-xl transition-colors shadow-md hover:shadow-lg"
                              style={{backgroundColor: '#004225'}}
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
                            backgroundColor: activeField === kategorie.id ? '#004225' : 'white',
                            borderColor: activeField === kategorie.id ? '#004225' : '#cbd5e1'
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
                              stroke="#004225"
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
                              <span style={{color: '#004225'}}>
                                {calculateKategorieErreicht(activeField).toLocaleString()}€ / {calculateKategorieTotal(activeField).toLocaleString()}€
                              </span>
                            </div>
                          </div>
                          
                          <div className="flex space-x-4 justify-center">
                            <button 
                              onClick={handleSave}
                              className="px-8 py-3 text-base font-semibold text-white rounded-xl transition-colors shadow-md hover:shadow-lg"
                              style={{backgroundColor: '#004225'}}
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
