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

// Zigaretten-Investment-Vergleich Page - Überarbeitet im Fixkosten-Stil
const ZigarettenInvestmentPage = () => {
  const [activeField, setActiveField] = useState(null);
  const [raucherProfil, setRaucherProfil] = useState({
    zigarettenProTag: 20,
    preisProSchachtel: 8,
    jahreGeraucht: 10,
    startJahr: 2014
  });

  // Historische Renditen (realistische Durchschnittswerte)
  const investmentRenditen = {
    aktienMSCI: {
      name: 'MSCI World ETF',
      jahresrendite: 0.085,
      historisch: {
        2014: 0.195, 2015: 0.102, 2016: 0.075, 2017: 0.078,
        2018: -0.042, 2019: 0.276, 2020: 0.061, 2021: 0.218,
        2022: -0.128, 2023: 0.197, 2024: 0.152
      }
    },
    immobilien: {
      name: 'Deutsche Immobilien',
      jahresrendite: 0.065,
      historisch: {
        2014: 0.045, 2015: 0.052, 2016: 0.068, 2017: 0.071,
        2018: 0.084, 2019: 0.092, 2020: 0.078, 2021: 0.143,
        2022: 0.035, 2023: -0.045, 2024: 0.022
      }
    },
    bitcoin: {
      name: 'Bitcoin',
      jahresrendite: 0.73,
      historisch: {
        2014: -0.58, 2015: 0.35, 2016: 1.25, 2017: 13.0,
        2018: -0.73, 2019: 0.87, 2020: 3.03, 2021: 0.59,
        2022: -0.64, 2023: 1.56, 2024: 0.45
      }
    },
    tagesgeld: {
      name: 'Tagesgeld/Sparbuch',
      jahresrendite: 0.015,
      historisch: {
        2014: 0.009, 2015: 0.006, 2016: 0.002, 2017: 0.001,
        2018: 0.001, 2019: 0.001, 2020: 0.001, 2021: 0.001,
        2022: 0.005, 2023: 0.032, 2024: 0.035
      }
    },
    sp500: {
      name: 'S&P 500',
      jahresrendite: 0.102,
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

  const updateRaucherProfil = (field, value) => {
    setRaucherProfil(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    setActiveField(null);
  };

  const handleCancel = () => {
    setActiveField(null);
  };

  const investmentKategorien = [
    { 
      id: 'tagesgeld', 
      name: 'Sicheres Sparen', 
      icon: '🏦', 
      color: '#065f46',
      beschreibung: 'Tagesgeld, Sparbuch (niedrige Rendite)',
      wert: berechneInvestmentWert('tagesgeld')
    },
    { 
      id: 'aktienMSCI', 
      name: 'MSCI World ETF', 
      icon: '📈', 
      color: '#047857',
      beschreibung: 'Breit diversifizierte Aktien weltweit',
      wert: berechneInvestmentWert('aktienMSCI')
    },
    { 
      id: 'sp500', 
      name: 'S&P 500', 
      icon: '🇺🇸', 
      color: '#059669',
      beschreibung: 'US-amerikanische Top-Unternehmen',
      wert: berechneInvestmentWert('sp500')
    },
    { 
      id: 'immobilien', 
      name: 'Immobilien', 
      icon: '🏠', 
      color: '#10b981',
      beschreibung: 'Deutsche Immobilien-Investments',
      wert: berechneInvestmentWert('immobilien')
    },
    { 
      id: 'bitcoin', 
      name: 'Bitcoin', 
      icon: '₿', 
      color: '#34d399',
      beschreibung: 'Hochspekulative Kryptowährung',
      wert: berechneInvestmentWert('bitcoin')
    }
  ];

  const gespartesSumme = berechneGespartesSumme();

  return (
    <div className="h-screen bg-gradient-to-br from-emerald-50 to-slate-100 font-sans">
      <HeaderBars />
      
      <div className="h-screen flex flex-col pt-44">
        {/* Investment-Dashboard - nach unten verschoben */}
        <div className="flex-shrink-0 bg-white/80 backdrop-blur-lg mx-8 mt-4 rounded-xl p-4 shadow-lg border border-emerald-100">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-emerald-800">Investment-Vergleich</h2>
              <p className="text-emerald-600">
                Gesparte Summe: <span className="font-bold">{gespartesSumme.gesamt}€</span> | 
                Zeitraum: <span className="font-bold">{raucherProfil.jahreGeraucht} Jahre</span>
              </p>
            </div>
            <div className="flex gap-4">
              <div className="text-center">
                <div className="text-2xl">💰</div>
                <div className="text-xs text-gray-600">Täglich</div>
                <div className="font-bold text-emerald-700">{gespartesSumme.täglich}€</div>
              </div>
              <div className="text-center">
                <div className="text-2xl">📅</div>
                <div className="text-xs text-gray-600">Monatlich</div>
                <div className="font-bold text-emerald-700">{gespartesSumme.monatlich}€</div>
              </div>
              <div className="text-center">
                <div className="text-2xl">🗓️</div>
                <div className="text-xs text-gray-600">Jährlich</div>
                <div className="font-bold text-emerald-700">{gespartesSumme.jährlich}€</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="h-full flex flex-col">
            
            <div className="flex-shrink-0 flex justify-center items-center py-8">
              <div className="flex space-x-12">
                {investmentKategorien.map((kategorie) => (
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
                        }
                      }}
                    >
                      <span className="text-3xl mb-2">{kategorie.icon}</span>
                      <span className="text-base font-bold text-center px-4 leading-tight">
                        {kategorie.name}
                      </span>
                      <span className="text-xl font-bold mt-2">
                        {kategorie.wert.toLocaleString('de-DE', { 
                          style: 'currency', 
                          currency: 'EUR',
                          maximumFractionDigits: 0 
                        })}
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

            <div className="flex-1 flex items-start justify-center pt-6">
              {activeField && (
                <div 
                  className="bg-white/90 backdrop-blur-lg rounded-2xl border-2 border-emerald-200/50 p-8 w-full max-w-4xl shadow-2xl max-h-[500px] overflow-y-auto"
                  onClick={(e) => e.stopPropagation()}
                >
                  {(() => {
                    const aktiveKategorie = investmentKategorien.find(k => k.id === activeField);
                    return (
                      <div className="space-y-6">
                        <div className="text-center border-b border-emerald-200 pb-4">
                          <h3 className="text-2xl font-bold text-emerald-800 flex items-center justify-center gap-3">
                            <span className="text-3xl">{aktiveKategorie.icon}</span>
                            {aktiveKategorie.name}
                          </h3>
                          <p className="text-emerald-600 mt-1">{aktiveKategorie.beschreibung}</p>
                        </div>
                        
                        {/* Raucherprofil Eingabe */}
                        <div className="space-y-4">
                          <h4 className="font-semibold text-emerald-800 text-center">Ihre Rauchgewohnheiten</h4>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm text-emerald-700 mb-2">Zigaretten pro Tag</label>
                              <input
                                type="number"
                                value={raucherProfil.zigarettenProTag}
                                onChange={(e) => updateRaucherProfil('zigarettenProTag', parseInt(e.target.value) || 0)}
                                className="w-full p-3 border-2 border-emerald-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                                min="1"
                                max="60"
                              />
                            </div>
                            <div>
                              <label className="block text-sm text-emerald-700 mb-2">Preis pro Schachtel (€)</label>
                              <input
                                type="number"
                                value={raucherProfil.preisProSchachtel}
                                onChange={(e) => updateRaucherProfil('preisProSchachtel', parseFloat(e.target.value) || 0)}
                                className="w-full p-3 border-2 border-emerald-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                                min="1"
                                max="20"
                                step="0.5"
                              />
                            </div>
                            <div>
                              <label className="block text-sm text-emerald-700 mb-2">Jahre geraucht</label>
                              <input
                                type="number"
                                value={raucherProfil.jahreGeraucht}
                                onChange={(e) => updateRaucherProfil('jahreGeraucht', parseInt(e.target.value) || 0)}
                                className="w-full p-3 border-2 border-emerald-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                                min="1"
                                max="50"
                              />
                            </div>
                            <div>
                              <label className="block text-sm text-emerald-700 mb-2">Start-Jahr</label>
                              <select
                                value={raucherProfil.startJahr}
                                onChange={(e) => updateRaucherProfil('startJahr', parseInt(e.target.value))}
                                className="w-full p-3 border-2 border-emerald-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                              >
                                {[...Array(11)].map((_, i) => (
                                  <option key={i} value={2014 + i}>{2014 + i}</option>
                                ))}
                              </select>
                            </div>
                          </div>
                        </div>
                        
                        {/* Investment-Resultat */}
                        <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-200">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-semibold text-emerald-800">Investment-Wert heute:</span>
                            <span className="text-xl font-bold text-emerald-700">
                              {aktiveKategorie.wert.toLocaleString('de-DE', { 
                                style: 'currency', 
                                currency: 'EUR',
                                maximumFractionDigits: 0 
                              })}
                            </span>
                          </div>
                          <div className="text-sm text-emerald-600">
                            Gewinn: {(aktiveKategorie.wert - parseFloat(gespartesSumme.gesamt)).toLocaleString('de-DE', { 
                              style: 'currency', 
                              currency: 'EUR',
                              maximumFractionDigits: 0 
                            })}
                          </div>
                          <div className="text-sm text-emerald-600">
                            Rendite: {investmentRenditen[activeField].jahresrendite ? 
                              (investmentRenditen[activeField].jahresrendite * 100).toFixed(1) : 0}% p.a. (Durchschnitt)
                          </div>
                        </div>
                        
                        <div className="flex space-x-4 justify-center pt-4 border-t border-emerald-200">
                          <button 
                            onClick={handleSave}
                            className="px-8 py-3 text-base font-semibold text-white bg-emerald-600 rounded-xl transition-all shadow-lg hover:shadow-xl hover:bg-emerald-700 hover:scale-105"
                          >
                            💾 Verstanden
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
        cumulativePercentage += slice.value;

        const startX = centerX + radius * Math.cos(startAngle);
        const startY = centerY + radius * Math.sin(startAngle);
        const endX = centerX + radius * Math.cos(endAngle);
        const endY = centerY + radius * Math.sin(endAngle);

        const largeArcFlag = slice.value > 50 ? 1 : 0;

        const pathData = [
          `M ${centerX} ${centerY}`,
          `L ${startX} ${startY}`,
          `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY}`,
          'Z'
        ].join(' ');

        return (
          <g key={index}>
            <path
              d={pathData}
              fill={slice.color}
              stroke="white"
              strokeWidth="2"
              className="cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => slice.page && setCurrentPage(slice.page)}
            />
            {headerHovered && slice.value > 5 && (
              <text
                x={centerX + (radius * 0.7) * Math.cos((startAngle + endAngle) / 2)}
                y={centerY + (radius * 0.7) * Math.sin((startAngle + endAngle) / 2)}
                textAnchor="middle"
                fill="white"
                fontSize="12"
                fontWeight="bold"
                className="pointer-events-none"
              >
                {Math.round(slice.value)}%
              </text>
            )}
          </g>
        );
      })}

      {/* Zentrierte Anzeige */}
      <circle cx={centerX} cy={centerY} r={headerHovered ? 40 : 30} fill="white" stroke="#e5e7eb" strokeWidth="2" />
      <text
        x={centerX}
        y={centerY - 5}
        textAnchor="middle"
        fill="#065f46"
        fontSize={headerHovered ? 16 : 14}
        fontWeight="bold"
      >
        {calculateBudget().toLocaleString('de-DE')}€
      </text>
      <text
        x={centerX}
        y={centerY + 15}
        textAnchor="middle"
        fill="#6b7280"
        fontSize={headerHovered ? 12 : 10}
      >
        Budget
      </text>

      {/* Legende unter dem Kreis - Position angepasst */}
      <g transform={`translate(0, ${headerHovered ? 140 : 120})`}>
        {slices.map((slice, index) => (
          <g key={index} transform={`translate(0, ${index * 30})`}>
            <rect x="40" y="5" width="16" height="16" fill={slice.color} rx="4" />
            <text x="64" y="18" fill="#374151" fontSize="14" fontWeight="500">
              {slice.emoji} {slice.name}
            </text>
            <text x="200" y="18" fill="#374151" fontSize="14" fontWeight="600" textAnchor="end">
              {Math.round(slice.value)}%
            </text>
          </g>
        ))}
      </g>
    </svg>
  );
};

  // Header-Komponente
  const HeaderBars = () => {
    const [showImport, setShowImport] = useState(false);
    const [importFile, setImportFile] = useState(null);

    return (
      <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-emerald-700 to-emerald-600 text-white shadow-lg">
        <div className="flex justify-between items-center px-6 py-3">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-bold">Finanzberatung</h1>
            <div className="flex space-x-2">
              {['overview', 'fixkosten', 'lifestyle', 'sicherheit', 'wuensche', 'kurzfristig', 'mittelfristig', 'langfristig', 'basisabsicherung', 'zigaretten', 'budget'].map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-1 rounded-lg text-sm transition-all ${
                    currentPage === page
                      ? 'bg-white/20 font-semibold'
                      : 'hover:bg-white/10'
                  }`}
                >
                  {page === 'overview' ? 'Übersicht' :
                   page === 'fixkosten' ? 'Fixkosten' :
                   page === 'lifestyle' ? 'Lifestyle' :
                   page === 'sicherheit' ? 'Sicherheit' :
                   page === 'wuensche' ? 'Wünsche' :
                   page === 'kurzfristig' ? 'Kurzfristig' :
                   page === 'mittelfristig' ? 'Mittelfristig' :
                   page === 'langfristig' ? 'Langfristig' :
                   page === 'basisabsicherung' ? 'Basis-Absicherung' :
                   page === 'zigaretten' ? 'Zigaretten' :
                   'Budget'}
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Import/Export Buttons */}
            <div className="relative">
              <button
                onClick={() => setShowImport(!showImport)}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors flex items-center space-x-2"
              >
                <span>📁</span>
                <span>Daten</span>
              </button>
              
              {showImport && (
                <div className="absolute right-0 top-full mt-2 bg-white rounded-lg shadow-xl p-4 w-64 border border-gray-200">
                  <h3 className="font-semibold text-gray-800 mb-3">Daten verwalten</h3>
                  
                  <div 
                    className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors ${
                      dragActive ? 'border-emerald-400 bg-emerald-50' : 'border-gray-300 hover:border-gray-400'
                    }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    onClick={() => document.getElementById('import-file').click()}
                  >
                    <div className="text-2xl mb-2">📤</div>
                    <p className="text-sm text-gray-600">Datei hier ablegen oder klicken</p>
                    <input
                      id="import-file"
                      type="file"
                      accept=".json"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files[0]) {
                          importData(e.target.files[0]);
                          setShowImport(false);
                        }
                      }}
                    />
                  </div>
                  
                  <button
                    onClick={exportData}
                    className="w-full mt-3 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors flex items-center justify-center space-x-2"
                  >
                    <span>📥</span>
                    <span>Daten exportieren</span>
                  </button>
                </div>
              )}
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="text-right">
                <div className="text-sm opacity-80">Monatliches Budget</div>
                <div className="font-bold text-lg">{calculateBudget().toLocaleString('de-DE')} €</div>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <span className="text-2xl">👤</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Navigation Buttons
  const NavigationButtons = () => {
    const nextPage = getNextPage();
    const prevPage = getPrevPage();

    return (
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-4 z-40">
        {prevPage && (
          <button
            onClick={() => setCurrentPage(prevPage)}
            className="px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-x-1 flex items-center space-x-2"
          >
            <span>←</span>
            <span>Zurück</span>
          </button>
        )}
        {nextPage && (
          <button
            onClick={() => setCurrentPage(nextPage)}
            className="px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:translate-x-1 flex items-center space-x-2"
          >
            <span>Weiter</span>
            <span>→</span>
          </button>
        )}
      </div>
    );
  };

  // Overview Page
  const OverviewPage = () => {
    return (
      <div className="h-screen bg-gradient-to-br from-emerald-50 to-slate-100 font-sans">
        <HeaderBars />
        
        <div className="h-screen flex flex-col pt-44">
          <div className="flex-1 p-8 overflow-y-auto">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Linke Spalte: Budget Übersicht */}
                <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-emerald-100">
                  <h2 className="text-2xl font-bold text-emerald-800 mb-6">Budget Übersicht</h2>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 bg-emerald-50 rounded-xl border border-emerald-200">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                          <span className="text-emerald-600">💰</span>
                        </div>
                        <div>
                          <div className="font-semibold text-emerald-800">Gesamtbudget</div>
                          <div className="text-sm text-emerald-600">Monatlich verfügbar</div>
                        </div>
                      </div>
                      <div className="text-xl font-bold text-emerald-700">
                        {calculateBudget().toLocaleString('de-DE')} €
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-red-50 rounded-xl border border-red-200">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="text-red-600">🏠</span>
                          <span className="font-semibold text-red-800">Fixkosten</span>
                        </div>
                        <div className="text-xl font-bold text-red-700">
                          {finanzData.fixkostenTotal.toLocaleString('de-DE')} €
                        </div>
                        <div className="text-sm text-red-600">
                          {Math.round(percentages.fixkosten)}% vom Budget
                        </div>
                      </div>

                      <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="text-blue-600">🎭</span>
                          <span className="font-semibold text-blue-800">Lifestyle</span>
                        </div>
                        <div className="text-xl font-bold text-blue-700">
                          {finanzData.lifestyleTotal.toLocaleString('de-DE')} €
                        </div>
                        <div className="text-sm text-blue-600">
                          {Math.round(percentages.lifestyle)}% vom Budget
                        </div>
                      </div>

                      <div className="p-4 bg-purple-50 rounded-xl border border-purple-200">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="text-purple-600">🛡️</span>
                          <span className="font-semibold text-purple-800">Sicherheit</span>
                        </div>
                        <div className="text-xl font-bold text-purple-700">
                          {finanzData.sicherheit.toLocaleString('de-DE')} €
                        </div>
                        <div className="text-sm text-purple-600">
                          {Math.round(percentages.sicherheit)}% vom Budget
                        </div>
                      </div>

                      <div className={`p-4 rounded-xl border ${
                        percentages.ueberschuss >= 0 
                          ? 'bg-green-50 border-green-200' 
                          : 'bg-orange-50 border-orange-200'
                      }`}>
                        <div className="flex items-center space-x-2 mb-2">
                          <span className={percentages.ueberschuss >= 0 ? 'text-green-600' : 'text-orange-600'}>
                            {percentages.ueberschuss >= 0 ? '💰' : '⚠️'}
                          </span>
                          <span className={`font-semibold ${
                            percentages.ueberschuss >= 0 ? 'text-green-800' : 'text-orange-800'
                          }`}>
                            Überschuss
                          </span>
                        </div>
                        <div className={`text-xl font-bold ${
                          percentages.ueberschuss >= 0 ? 'text-green-700' : 'text-orange-700'
                        }`}>
                          {((calculateBudget() - finanzData.fixkostenTotal - finanzData.lifestyleTotal - finanzData.sicherheit)).toLocaleString('de-DE')} €
                        </div>
                        <div className={`text-sm ${
                          percentages.ueberschuss >= 0 ? 'text-green-600' : 'text-orange-600'
                        }`}>
                          {Math.round(percentages.ueberschuss)}% vom Budget
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Rechte Spalte: Kuchendiagramm */}
                <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-emerald-100 flex items-center justify-center">
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-emerald-800 mb-4">Budgetverteilung</h3>
                    {createMiniPieChart()}
                  </div>
                </div>

                {/* Untere Reihe: Schnellzugriff */}
                <div className="lg:col-span-2 bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-emerald-100">
                  <h3 className="text-xl font-bold text-emerald-800 mb-6">Schnellzugriff</h3>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { id: 'fixkosten', name: 'Fixkosten', icon: '🏠', color: 'bg-red-100 text-red-800 border-red-200' },
                      { id: 'lifestyle', name: 'Lifestyle', icon: '🎭', color: 'bg-blue-100 text-blue-800 border-blue-200' },
                      { id: 'sicherheit', name: 'Sicherheit', icon: '🛡️', color: 'bg-purple-100 text-purple-800 border-purple-200' },
                      { id: 'wuensche', name: 'Wünsche', icon: '⭐', color: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
                      { id: 'kurzfristig', name: 'Kurzfristig', icon: '📱', color: 'bg-indigo-100 text-indigo-800 border-indigo-200' },
                      { id: 'mittelfristig', name: 'Mittelfristig', icon: '🏠', color: 'bg-green-100 text-green-800 border-green-200' },
                      { id: 'langfristig', name: 'Langfristig', icon: '🌅', color: 'bg-teal-100 text-teal-800 border-teal-200' },
                      { id: 'basisabsicherung', name: 'Basis-Absicherung', icon: '🛡️', color: 'bg-orange-100 text-orange-800 border-orange-200' }
                    ].map((item) => (
                      <button
                        key={item.id}
                        onClick={() => setCurrentPage(item.id)}
                        className={`p-4 rounded-xl border-2 transition-all hover:scale-105 hover:shadow-md ${item.color}`}
                      >
                        <div className="text-2xl mb-2">{item.icon}</div>
                        <div className="font-semibold">{item.name}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <Sidebar />
        <NavigationButtons />
      </div>
    );
  };

  // Budget Page
  const BudgetPage = () => {
    const [activeField, setActiveField] = useState(null);
    const [editValues, setEditValues] = useState({
      gehaltNetto: finanzData.gehaltNetto,
      zusatzeinkommen: finanzData.zusatzeinkommen,
      kapitalertraege: finanzData.kapitalertraege,
      mieteinnahmen: finanzData.mieteinnahmen,
      individuell: finanzData.individuell
    });

    const budgetItems = [
      {
        id: 'gehaltNetto',
        name: 'Netto-Gehalt',
        value: finanzData.gehaltNetto,
        icon: '💼',
        color: '#065f46',
        description: 'Monatliches Nettogehalt'
      },
      {
        id: 'zusatzeinkommen',
        name: 'Zusatzeinkommen',
        value: finanzData.zusatzeinkommen,
        icon: '➕',
        color: '#047857',
        description: 'Nebenjobs, Freelancing'
      },
      {
        id: 'kapitalertraege',
        name: 'Kapitalerträge',
        value: finanzData.kapitalertraege,
        icon: '📈',
        color: '#059669',
        description: 'Zinsen, Dividenden'
      },
      {
        id: 'mieteinnahmen',
        name: 'Mieteinnahmen',
        value: finanzData.mieteinnahmen,
        icon: '🏠',
        color: '#10b981',
        description: 'Vermietung, Airbnb'
      },
      {
        id: 'individuell',
        name: 'Individuell',
        value: finanzData.individuell,
        icon: '🎯',
        color: '#34d399',
        description: 'Sonstige Einnahmen'
      }
    ];

    const handleSave = () => {
      setFinanzData(prev => ({
        ...prev,
        ...editValues
      }));
      setActiveField(null);
    };

    const handleCancel = () => {
      setEditValues({
        gehaltNetto: finanzData.gehaltNetto,
        zusatzeinkommen: finanzData.zusatzeinkommen,
        kapitalertraege: finanzData.kapitalertraege,
        mieteinnahmen: finanzData.mieteinnahmen,
        individuell: finanzData.individuell
      });
      setActiveField(null);
    };

    return (
      <div className="h-screen bg-gradient-to-br from-emerald-50 to-slate-100 font-sans">
        <HeaderBars />
        
        <div className="h-screen flex flex-col pt-44">
          <div className="flex-1 p-8 overflow-y-auto">
            <div className="h-full flex flex-col">
              
              <div className="flex-shrink-0 flex justify-center items-center py-8">
                <div className="flex space-x-12">
                  {budgetItems.map((item) => (
                    <div key={item.id} className="flex flex-col items-center">
                      <div 
                        className={`w-44 h-44 rounded-full border-4 flex flex-col items-center justify-center cursor-pointer transition-all hover:scale-105 relative group ${
                          activeField === item.id 
                            ? 'text-white shadow-2xl transform scale-105' 
                            : 'bg-white text-slate-700 hover:border-emerald-400 shadow-lg'
                        }`}
                        style={{
                          backgroundColor: activeField === item.id ? item.color : 'white',
                          borderColor: activeField === item.id ? item.color : '#cbd5e1'
                        }}
                        onClick={() => {
                          if (activeField !== item.id) {
                            setActiveField(item.id);
                          }
                        }}
                      >
                        <span className="text-3xl mb-2">{item.icon}</span>
                        <span className="text-base font-bold text-center px-4 leading-tight">
                          {item.name}
                        </span>
                        <span className="text-xl font-bold mt-2">
                          {item.value.toLocaleString('de-DE')}€
                        </span>
                        
                        {/* Hover-Info */}
                        <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                          {item.description}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex-1 flex items-start justify-center pt-6">
                {activeField && (
                  <div 
                    className="bg-white/90 backdrop-blur-lg rounded-2xl border-2 border-emerald-200/50 p-8 w-full max-w-4xl shadow-2xl max-h-[500px] overflow-y-auto"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {(() => {
                      const aktiveItem = budgetItems.find(item => item.id === activeField);
                      return (
                        <div className="space-y-6">
                          <div className="text-center border-b border-emerald-200 pb-4">
                            <h3 className="text-2xl font-bold text-emerald-800 flex items-center justify-center gap-3">
                              <span className="text-3xl">{aktiveItem.icon}</span>
                              {aktiveItem.name}
                            </h3>
                            <p className="text-emerald-600 mt-1">{aktiveItem.description}</p>
                          </div>
                          
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm text-emerald-700 mb-2">Monatlicher Betrag (€)</label>
                              <input
                                type="number"
                                value={editValues[activeField]}
                                onChange={(e) => setEditValues(prev => ({
                                  ...prev,
                                  [activeField]: parseFloat(e.target.value) || 0
                                }))}
                                className="w-full p-3 border-2 border-emerald-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                                min="0"
                                step="50"
                              />
                            </div>
                            
                            <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-200">
                              <div className="flex justify-between items-center">
                                <span className="font-semibold text-emerald-800">Aktueller Wert:</span>
                                <span className="text-xl font-bold text-emerald-700">
                                  {aktiveItem.value.toLocaleString('de-DE')}€
                                </span>
                              </div>
                              <div className="text-sm text-emerald-600 mt-1">
                                {((aktiveItem.value / calculateBudget()) * 100).toFixed(1)}% des Gesamtbudgets
                              </div>
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
                              ↶ Abbrechen
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

  // Fixkosten Page
  const FixkostenPage = () => {
    const [activeField, setActiveField] = useState(null);
    const [editValues, setEditValues] = useState([]);
    const [newEntry, setNewEntry] = useState({ bezeichnung: '', betrag: '' });

    const fixkostenKategorien = [
      { 
        id: 'wohnen', 
        name: 'Wohnen', 
        icon: '🏠', 
        color: '#065f46',
        items: fixkostenData.wohnen,
        description: 'Miete, Nebenkosten, Strom, Gas'
      },
      { 
        id: 'lebensmittel', 
        name: 'Lebensmittel', 
        icon: '🛒', 
        color: '#047857',
        items: fixkostenData.lebensmittel,
        description: 'Supermarkt, Getränke, Grundnahrungsmittel'
      },
      { 
        id: 'abos', 
        name: 'Abos', 
        icon: '📱', 
        color: '#059669',
        items: fixkostenData.abos,
        description: 'Streaming, Zeitschriften, Mitgliedschaften'
      },
      { 
        id: 'mobilitaet', 
        name: 'Mobilität', 
        icon: '🚗', 
        color: '#10b981',
        items: fixkostenData.mobilitaet,
        description: 'Auto, ÖPNV, Versicherung, Sprit'
      },
      { 
        id: 'sonstiges', 
        name: 'Sonstiges', 
        icon: '📦', 
        color: '#34d399',
        items: fixkostenData.sonstiges,
        description: 'Verschiedene Fixkosten'
      }
    ];

    const handleSave = () => {
      setFixkostenData(prev => ({
        ...prev,
        [activeField]: editValues
      }));
      
      // Update Gesamtsumme
      const total = editValues.reduce((sum, item) => sum + item.betrag, 0);
      setFinanzData(prev => ({
        ...prev,
        fixkostenTotal: total
      }));
      
      setActiveField(null);
      setNewEntry({ bezeichnung: '', betrag: '' });
    };

    const handleCancel = () => {
      const aktiveKategorie = fixkostenKategorien.find(k => k.id === activeField);
      setEditValues([...aktiveKategorie.items]);
      setActiveField(null);
      setNewEntry({ bezeichnung: '', betrag: '' });
    };

    const addNewEntry = () => {
      if (newEntry.bezeichnung && newEntry.betrag) {
        setEditValues(prev => [...prev, {
          bezeichnung: newEntry.bezeichnung,
          betrag: parseFloat(newEntry.betrag) || 0
        }]);
        setNewEntry({ bezeichnung: '', betrag: '' });
      }
    };

    const removeEntry = (index) => {
      setEditValues(prev => prev.filter((_, i) => i !== index));
    };

    const updateEntry = (index, field, value) => {
      setEditValues(prev => prev.map((item, i) => 
        i === index ? { ...item, [field]: field === 'betrag' ? parseFloat(value) || 0 : value } : item
      ));
    };

    return (
      <div className="h-screen bg-gradient-to-br from-emerald-50 to-slate-100 font-sans">
        <HeaderBars />
        
        <div className="h-screen flex flex-col pt-44">
          <div className="flex-1 p-8 overflow-y-auto">
            <div className="h-full flex flex-col">
              
              <div className="flex-shrink-0 flex justify-center items-center py-8">
                <div className="flex space-x-12">
                  {fixkostenKategorien.map((kategorie) => {
                    const gesamtSumme = kategorie.items.reduce((sum, item) => sum + item.betrag, 0);
                    return (
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
                              setEditValues([...kategorie.items]);
                            }
                          }}
                        >
                          <span className="text-3xl mb-2">{kategorie.icon}</span>
                          <span className="text-base font-bold text-center px-4 leading-tight">
                            {kategorie.name}
                          </span>
                          <span className="text-xl font-bold mt-2">
                            {gesamtSumme.toLocaleString('de-DE')}€
                          </span>
                          
                          {/* Hover-Info */}
                          <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                            {kategorie.description}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="flex-1 flex items-start justify-center pt-6">
                {activeField && (
                  <div 
                    className="bg-white/90 backdrop-blur-lg rounded-2xl border-2 border-emerald-200/50 p-8 w-full max-w-4xl shadow-2xl max-h-[500px] overflow-y-auto"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {(() => {
                      const aktiveKategorie = fixkostenKategorien.find(k => k.id === activeField);
                      const gesamtSumme = editValues.reduce((sum, item) => sum + item.betrag, 0);
                      
                      return (
                        <div className="space-y-6">
                          <div className="text-center border-b border-emerald-200 pb-4">
                            <h3 className="text-2xl font-bold text-emerald-800 flex items-center justify-center gap-3">
                              <span className="text-3xl">{aktiveKategorie.icon}</span>
                              {aktiveKategorie.name}
                            </h3>
                            <p className="text-emerald-600 mt-1">{aktiveKategorie.description}</p>
                          </div>
                          
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm text-emerald-700 mb-2">Bezeichnung</label>
                                <input
                                  type="text"
                                  value={newEntry.bezeichnung}
                                  onChange={(e) => setNewEntry(prev => ({ ...prev, bezeichnung: e.target.value }))}
                                  className="w-full p-3 border-2 border-emerald-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                                  placeholder="z.B. Miete"
                                />
                              </div>
                              <div>
                                <label className="block text-sm text-emerald-700 mb-2">Betrag (€)</label>
                                <div className="flex space-x-2">
                                  <input
                                    type="number"
                                    value={newEntry.betrag}
                                    onChange={(e) => setNewEntry(prev => ({ ...prev, betrag: e.target.value }))}
                                    className="flex-1 p-3 border-2 border-emerald-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                                    placeholder="0.00"
                                    min="0"
                                    step="0.01"
                                  />
                                  <button
                                    onClick={addNewEntry}
                                    className="px-4 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
                                  >
                                    +
                                  </button>
                                </div>
                              </div>
                            </div>
                            
                            <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-200">
                              <div className="flex justify-between items-center">
                                <span className="font-semibold text-emerald-800">Gesamtsumme:</span>
                                <span className="text-xl font-bold text-emerald-700">
                                  {gesamtSumme.toLocaleString('de-DE', { minimumFractionDigits: 2 })}€
                                </span>
                              </div>
                            </div>
                            
                            <div className="space-y-3">
                              {editValues.map((item, index) => (
                                <div key={index} className="flex items-center space-x-3 p-3 bg-white border border-emerald-100 rounded-lg">
                                  <input
                                    type="text"
                                    value={item.bezeichnung}
                                    onChange={(e) => updateEntry(index, 'bezeichnung', e.target.value)}
                                    className="flex-1 p-2 border border-emerald-200 rounded focus:ring-2 focus:ring-emerald-500 outline-none"
                                  />
                                  <input
                                    type="number"
                                    value={item.betrag}
                                    onChange={(e) => updateEntry(index, 'betrag', e.target.value)}
                                    className="w-24 p-2 border border-emerald-200 rounded focus:ring-2 focus:ring-emerald-500 outline-none"
                                    min="0"
                                    step="0.01"
                                  />
                                  <button
                                    onClick={() => removeEntry(index)}
                                    className="p-2 text-red-500 hover:text-red-700 transition-colors"
                                  >
                                    ✕
                                  </button>
                                </div>
                              ))}
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
                              ↶ Abbrechen
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

// Kurzfristige Anschaffungen - GRAU-Layout
const KurzfristigeAnschaffungenPage = () => {
  const [activeField, setActiveField] = useState(null);
  const [tempKurz, setTempKurz] = useState({ ...kurzfristigData });

  const calculateKategorieTotal = (kategorie) => {
    return tempKurz[kategorie].reduce((sum, item) => sum + (parseFloat(item.betrag) || 0), 0);
  };

  const handleSave = () => {
    setKurzfristigData(tempKurz);
    setActiveField(null);
  };

  const handleCancel = () => {
    setTempKurz({ ...kurzfristigData });
    setActiveField(null);
  };

  const kurzKategorien = [
    { id: 'technik', name: 'Technik', icon: '💻', color: '#475569', beschreibung: 'Handy, Laptop, kleine Geräte' },
    { id: 'haushalt', name: 'Haushalt', icon: '🏠', color: '#64748b', beschreibung: 'Möbel, Ausstattung' },
    { id: 'freizeit', name: 'Freizeit', icon: '🎮', color: '#94a3b8', beschreibung: 'Spiele, Unterhaltung' }
  ];

  return (
    <div className="h-screen bg-gradient-to-br from-slate-50 to-slate-200 font-sans">
      <HeaderBars />

      <div className="h-screen flex flex-col pt-44">
        <div className="flex-1 p-8">
          <div className="h-full flex justify-center items-center">
            <div className="flex space-x-12">
              {kurzKategorien.map((kategorie) => (
                <div key={kategorie.id} className="flex flex-col items-center">
                  <div
                    className={`w-44 h-44 rounded-full border-4 flex flex-col items-center justify-center cursor-pointer hover:scale-105 ${
                      activeField === kategorie.id
                        ? 'text-white shadow-2xl transform scale-105'
                        : 'bg-white text-slate-700 shadow-lg'
                    }`}
                    style={{
                      backgroundColor: activeField === kategorie.id ? kategorie.color : 'white',
                      borderColor: activeField === kategorie.id ? kategorie.color : '#cbd5e1'
                    }}
                    onClick={() => {
                      if (activeField !== kategorie.id) {
                        setActiveField(kategorie.id);
                        setTempKurz({ ...kurzfristigData });
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
              className="bg-white rounded-2xl border-2 border-slate-300 p-8 w-full max-w-3xl shadow-2xl mx-8"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-2xl font-bold text-slate-700 mb-4">
                {kurzKategorien.find(k => k.id === activeField)?.name}
              </h3>
              <div className="space-y-4">
                {tempKurz[activeField].map((eintrag, index) => (
                  <div key={index} className="flex gap-3 items-center p-3 bg-slate-100 rounded-lg">
                    <input
                      type="text"
                      value={eintrag.bezeichnung}
                      onChange={(e) => {
                        const newArr = [...tempKurz[activeField]];
                        newArr[index].bezeichnung = e.target.value;
                        setTempKurz(prev => ({ ...prev, [activeField]: newArr }));
                      }}
                      placeholder="Bezeichnung"
                      className="flex-1 p-3 bg-white border-2 border-slate-300 rounded-lg"
                    />
                    <input
                      type="number"
                      value={eintrag.betrag}
                      onChange={(e) => {
                        const newArr = [...tempKurz[activeField]];
                        newArr[index].betrag = parseFloat(e.target.value) || 0;
                        setTempKurz(prev => ({ ...prev, [activeField]: newArr }));
                      }}
                      placeholder="0"
                      className="w-28 p-3 bg-white border-2 border-slate-300 rounded-lg text-right"
                    />
                  </div>
                ))}
              </div>

              <div className="flex space-x-4 justify-center pt-4 border-t border-slate-200 mt-6">
                <button
                  onClick={handleSave}
                  className="px-8 py-3 text-base font-semibold text-white bg-slate-700 rounded-xl shadow-lg hover:bg-slate-800"
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
          </div>
        )}
      </div>

      <Sidebar />
      <NavigationButtons />
    </div>
  );
};

// Mittelfristige Anschaffungen - Grauton Mittel (Slate 500)
const MittelfristigeAnschaffungenPage = () => {
  const [activeField, setActiveField] = useState(null);
  const [tempMittel, setTempMittel] = useState({ ...mittelfristigData });

  const calculateKategorieTotal = (kategorie) => {
    return tempMittel[kategorie].reduce((sum, item) => sum + (parseFloat(item.betrag) || 0), 0);
  };

  const handleSave = () => {
    setMittelfristigData(tempMittel);
    setActiveField(null);
  };

  const handleCancel = () => {
    setTempMittel({ ...mittelfristigData });
    setActiveField(null);
  };

  const mittelKategorien = [
    { id: 'fahrzeug', name: 'Fahrzeug', icon: '🚗', color: '#64748b', beschreibung: 'Auto, Motorrad, Fahrrad' },
    { id: 'weiterbildung', name: 'Weiterbildung', icon: '📘', color: '#6b7280', beschreibung: 'Schulungen, Studium' },
    { id: 'groessereAnschaffung', name: 'Große Anschaffungen', icon: '🛋️', color: '#71717a', beschreibung: 'Möbel, Elektronik, Ausstattung' }
  ];

  return (
    <div className="h-screen bg-gradient-to-br from-slate-50 to-slate-300 font-sans">
      <HeaderBars />

      <div className="h-screen flex flex-col pt-44">
        <div className="flex-1 p-8">
          <div className="h-full flex justify-center items-center">
            <div className="flex space-x-12">
              {mittelKategorien.map((kategorie) => (
                <div key={kategorie.id} className="flex flex-col items-center">
                  <div
                    className={`w-44 h-44 rounded-full border-4 flex flex-col items-center justify-center cursor-pointer hover:scale-105 ${
                      activeField === kategorie.id
                        ? 'text-white shadow-2xl transform scale-105'
                        : 'bg-white text-slate-700 shadow-lg'
                    }`}
                    style={{
                      backgroundColor: activeField === kategorie.id ? kategorie.color : 'white',
                      borderColor: activeField === kategorie.id ? kategorie.color : '#cbd5e1'
                    }}
                    onClick={() => {
                      if (activeField !== kategorie.id) {
                        setActiveField(kategorie.id);
                        setTempMittel({ ...mittelfristigData });
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
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={() => setActiveField(null)}>
            <div
              className="bg-white rounded-2xl border-2 border-slate-400 p-8 w-full max-w-3xl shadow-2xl mx-8"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-2xl font-bold text-slate-600 mb-4">
                {mittelKategorien.find(k => k.id === activeField)?.name}
              </h3>
              <div className="space-y-4">
                {tempMittel[activeField].map((eintrag, index) => (
                  <div key={index} className="flex gap-3 items-center p-3 bg-slate-100 rounded-lg">
                    <input
                      type="text"
                      value={eintrag.bezeichnung}
                      onChange={(e) => {
                        const newArr = [...tempMittel[activeField]];
                        newArr[index].bezeichnung = e.target.value;
                        setTempMittel(prev => ({ ...prev, [activeField]: newArr }));
                      }}
                      placeholder="Bezeichnung"
                      className="flex-1 p-3 bg-white border-2 border-slate-400 rounded-lg"
                    />
                    <input
                      type="number"
                      value={eintrag.betrag}
                      onChange={(e) => {
                        const newArr = [...tempMittel[activeField]];
                        newArr[index].betrag = parseFloat(e.target.value) || 0;
                        setTempMittel(prev => ({ ...prev, [activeField]: newArr }));
                      }}
                      placeholder="0"
                      className="w-28 p-3 bg-white border-2 border-slate-400 rounded-lg text-right"
                    />
                  </div>
                ))}
              </div>

              <div className="flex space-x-4 justify-center pt-4 border-t border-slate-300 mt-6">
                <button
                  onClick={handleSave}
                  className="px-8 py-3 text-base font-semibold text-white bg-slate-600 rounded-xl shadow-lg hover:bg-slate-700"
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
          </div>
        )}
      </div>

      <Sidebar />
      <NavigationButtons />
    </div>
  );
};

// Langfristige Anschaffungen - Grauton Hell (Slate 400)
const LangfristigeAnschaffungenPage = () => {
  const [activeField, setActiveField] = useState(null);
  const [tempLang, setTempLang] = useState({ ...langfristigData });

  const calculateKategorieTotal = (kategorie) => {
    return tempLang[kategorie].reduce((sum, item) => sum + (parseFloat(item.betrag) || 0), 0);
  };

  const handleSave = () => {
    setLangfristigData(tempLang);
    setActiveField(null);
  };

  const handleCancel = () => {
    setTempLang({ ...langfristigData });
    setActiveField(null);
  };

  const langKategorien = [
    { id: 'immobilie', name: 'Immobilie', icon: '🏡', color: '#9ca3af', beschreibung: 'Haus, Wohnung' },
    { id: 'unternehmung', name: 'Unternehmung', icon: '🏢', color: '#a1a1aa', beschreibung: 'Firmengründung, Geschäft' },
    { id: 'großprojekt', name: 'Großprojekt', icon: '🚀', color: '#d1d5db', beschreibung: 'Langfristige Visionen' }
  ];

  return (
    <div className="h-screen bg-gradient-to-br from-slate-100 to-slate-300 font-sans">
      <HeaderBars />

      <div className="h-screen flex flex-col pt-44">
        <div className="flex-1 p-8">
          <div className="h-full flex justify-center items-center">
            <div className="flex space-x-12">
              {langKategorien.map((kategorie) => (
                <div key={kategorie.id} className="flex flex-col items-center">
                  <div
                    className={`w-44 h-44 rounded-full border-4 flex flex-col items-center justify-center cursor-pointer hover:scale-105 ${
                      activeField === kategorie.id
                        ? 'text-white shadow-2xl transform scale-105'
                        : 'bg-white text-slate-700 shadow-lg'
                    }`}
                    style={{
                      backgroundColor: activeField === kategorie.id ? kategorie.color : 'white',
                      borderColor: activeField === kategorie.id ? kategorie.color : '#cbd5e1'
                    }}
                    onClick={() => {
                      if (activeField !== kategorie.id) {
                        setActiveField(kategorie.id);
                        setTempLang({ ...langfristigData });
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
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={() => setActiveField(null)}>
            <div
              className="bg-white rounded-2xl border-2 border-slate-300 p-8 w-full max-w-3xl shadow-2xl mx-8"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-2xl font-bold text-slate-700 mb-4">
                {langKategorien.find(k => k.id === activeField)?.name}
              </h3>
              <div className="space-y-4">
                {tempLang[activeField].map((eintrag, index) => (
                  <div key={index} className="flex gap-3 items-center p-3 bg-slate-100 rounded-lg">
                    <input
                      type="text"
                      value={eintrag.bezeichnung}
                      onChange={(e) => {
                        const newArr = [...tempLang[activeField]];
                        newArr[index].bezeichnung = e.target.value;
                        setTempLang(prev => ({ ...prev, [activeField]: newArr }));
                      }}
                      placeholder="Bezeichnung"
                      className="flex-1 p-3 bg-white border-2 border-slate-300 rounded-lg"
                    />
                    <input
                      type="number"
                      value={eintrag.betrag}
                      onChange={(e) => {
                        const newArr = [...tempLang[activeField]];
                        newArr[index].betrag = parseFloat(e.target.value) || 0;
                        setTempLang(prev => ({ ...prev, [activeField]: newArr }));
                      }}
                      placeholder="0"
                      className="w-28 p-3 bg-white border-2 border-slate-300 rounded-lg text-right"
                    />
                  </div>
                ))}
              </div>

              <div className="flex space-x-4 justify-center pt-4 border-t border-slate-200 mt-6">
                <button
                  onClick={handleSave}
                  className="px-8 py-3 text-base font-semibold text-white bg-slate-500 rounded-xl shadow-lg hover:bg-slate-600"
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
      return <ZigarettenPage />;   {/* Achtung: angepasst */}
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



