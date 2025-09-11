import { useState } from 'react';

// Kombinierte Wünsche-Komponente mit Toggle
const WuenscheKombiniert = ({
  HeaderBars,
  Sidebar,
  kurzfristigData,
  setKurzfristigData,
  langfristigData,
  setLangfristigData
}) => {


  const [activeTab, setActiveTab] = useState('kurz'); // 'kurz' oder 'lang'
  const [activeField, setActiveField] = useState(null);
  const [tempData, setTempData] = useState([]);

  // Bestimme aktuelle Daten basierend auf Tab
  const getCurrentData = () => {
    return activeTab === 'kurz' ? kurzfristigData : langfristigData;
  };

  const setCurrentData = (newData) => {
    if (activeTab === 'kurz') {
      setKurzfristigData(newData);
    } else {
      setLangfristigData(newData);
    }
  };

  const calculateProgress = (vorhandenesKapital, betrag) => {
    if (!betrag || betrag === 0) return 0;
    return Math.min((vorhandenesKapital / betrag) * 100, 100);
  };

  const calculateMonthlyRequired = (wunsch) => {
    if (wunsch.sparmodusTyp === 'datum' && wunsch.zieldatum) {
      const heute = new Date();
      const ziel = new Date(wunsch.zieldatum);
      const monate = Math.max(1, (ziel.getFullYear() - heute.getFullYear()) * 12 + (ziel.getMonth() - heute.getMonth()));
      const restbetrag = wunsch.betrag - wunsch.vorhandenesKapital;
      return restbetrag > 0 ? Math.ceil(restbetrag / monate) : 0;
    }
    return wunsch.zielbetrag || 0;
  };

  const addWunsch = () => {
    const neuerWunsch = {
      id: Date.now(),
      bezeichnung: '',
      betrag: 0,
      vorhandenesKapital: 0,
      sparmodusTyp: 'datum',
      zieldatum: '',
      zielbetrag: 0,
      prioritaet: 5,
      icon: '🎯'
    };
    const currentData = getCurrentData();
    const newData = [...currentData, neuerWunsch];
    setCurrentData(newData);
    setTempData(newData);
    setActiveField(neuerWunsch.id);
  };

  const removeWunsch = (id) => {
    const currentData = getCurrentData();
    const newData = currentData.filter(w => w.id !== id);
    setCurrentData(newData);
    setTempData(newData);
    setActiveField(null);
  };

  const updateWunsch = (id, field, value) => {
    setTempData(tempData.map(wunsch => 
      wunsch.id === id 
        ? { ...wunsch, [field]: field === 'betrag' || field === 'vorhandenesKapital' || field === 'zielbetrag' || field === 'prioritaet'
            ? (parseFloat(value) || 0) 
            : value } 
        : wunsch
    ));
  };

  const handleSave = () => {
    setCurrentData(tempData);
    setActiveField(null);
  };

  const handleCancel = () => {
    setTempData([...getCurrentData()]);
    setActiveField(null);
  };

  const iconOptions = ['🎯', '✈️', '🏠', '🚗', '💍', '📱', '💻', '🎮', '📚', '🎸', '🏖️', '⛷️', '🚴', '🎨', '📷'];

  // Sortiere Wünsche nach Priorität
  const sortedData = [...getCurrentData()].sort((a, b) => a.prioritaet - b.prioritaet);

  // Tab-Konfiguration
  const getTabConfig = () => {
    if (activeTab === 'kurz') {
      return {
        title: "Kurzfristige Wünsche",
        subtitle: "Ziele für die nächsten Monate",
        showRetirement: false
      };
    } else {
      return {
        title: "Langfristige Wünsche", 
        subtitle: "Ziele für die nächsten Jahre",
        showRetirement: true
      };
    }
  };

  const config = getTabConfig();

  // Wenn Modal geöffnet wird, lade aktuelle Daten
  const openModal = (wunschId) => {
    setTempData([...getCurrentData()]);
    setActiveField(wunschId);
  };

  return (
    <div className="h-screen bg-gradient-to-br from-emerald-50 to-slate-100 font-sans">
      <HeaderBars />
      
      <div className="h-screen flex flex-col">
        <div className="h-1/4"></div>
        
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="h-full flex flex-col">
            
            {/* Toggle Switch */}
            <div className="flex justify-center mb-6">
              <div className="bg-white rounded-xl p-2 shadow-lg border border-slate-200">
                <div className="flex">
                  <button
                    onClick={() => setActiveTab('kurz')}
                    className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                      activeTab === 'kurz'
                        ? 'bg-emerald-600 text-white shadow-md'
                        : 'text-slate-600 hover:text-slate-800'
                    }`}
                  >
                    Kurzfristige Wünsche
                  </button>
                  <button
                    onClick={() => setActiveTab('lang')}
                    className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                      activeTab === 'lang'
                        ? 'bg-emerald-600 text-white shadow-md'
                        : 'text-slate-600 hover:text-slate-800'
                    }`}
                  >
                    Langfristige Wünsche
                  </button>
                </div>
              </div>
            </div>

            {/* Hauptüberschrift */}
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-slate-800 mb-2">{config.title}</h1>
              <p className="text-lg text-slate-600">{config.subtitle}</p>
            </div>
            
            {/* Kreise Grid */}
            <div className="flex-1 flex items-center justify-center">
              <div className="grid grid-cols-3 gap-12 max-w-4xl">
                {sortedData.map((wunsch) => {
                  const progress = calculateProgress(wunsch.vorhandenesKapital, wunsch.betrag);
                  const monthlyRequired = calculateMonthlyRequired(wunsch);
                  
                  return (
                    <div key={wunsch.id} className="flex flex-col items-center relative">
                      {/* Priorität Nummer */}
                      {wunsch.bezeichnung && (
                        <div className="absolute -top-6 z-20 bg-emerald-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">
                          {wunsch.prioritaet}
                        </div>
                      )}
                      
                      <div 
                        className={`w-48 h-48 rounded-full border-4 flex flex-col items-center justify-center cursor-pointer transition-all hover:scale-105 relative ${
                          activeField === wunsch.id 
                            ? 'text-white shadow-xl' 
                            : 'bg-white text-slate-700 hover:border-emerald-400 shadow-lg'
                        }`}
                        style={{
                          backgroundColor: activeField === wunsch.id ? '#047857' : 'white',
                          borderColor: activeField === wunsch.id ? '#047857' : '#cbd5e1'
                        }}
                        onClick={() => openModal(wunsch.id)}
                      >
                        {/* Progress Ring */}
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
                            stroke="#10b981"
                            strokeWidth="4"
                            strokeDasharray={`${progress * 5.9} 590`}
                            strokeDashoffset="0"
                            transform="rotate(-90 96 96)"
                            className="transition-all duration-500"
                          />
                        </svg>
                        <span className="text-3xl mb-2 z-10">{wunsch.icon}</span>
                        <span className="text-base font-semibold text-center px-4 leading-tight z-10">
                          {wunsch.bezeichnung || 'Neuer Wunsch'}
                        </span>
                        <span className="text-sm font-bold mt-1 z-10">
                          {progress.toFixed(0)}%
                        </span>
                        {monthlyRequired > 0 && (
                          <span className="text-xs mt-1 z-10">
                            {monthlyRequired}€/Monat
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
                
                {/* Hinzufügen Button */}
                <div className="flex flex-col items-center">
                  <div 
                    className="w-48 h-48 rounded-full border-4 border-dashed border-gray-300 bg-gray-50 flex flex-col items-center justify-center cursor-pointer transition-all hover:scale-105 hover:border-gray-400 hover:bg-gray-100"
                    onClick={addWunsch}
                  >
                    <span className="text-5xl text-gray-400">+</span>
                    <span className="text-sm font-semibold text-gray-500 mt-2">Wunsch hinzufügen</span>
                  </div>
                </div>
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
            className="bg-white/90 backdrop-blur-lg rounded-2xl border border-slate-200/50 p-8 w-full max-w-2xl shadow-xl mx-8 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {(() => {
              const aktuellerWunsch = tempData.find(w => w.id === activeField);
              if (!aktuellerWunsch) return null;
              
              return (
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-slate-800 text-center">
                    Wunsch bearbeiten
                  </h3>
                  
                  <div className="space-y-4">
                    {/* Icon Auswahl */}
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700">Icon auswählen</label>
                      <div className="flex flex-wrap gap-2">
                        {iconOptions.map(icon => (
                          <button
                            key={icon}
                            onClick={() => updateWunsch(activeField, 'icon', icon)}
                            className={`w-12 h-12 rounded-lg flex items-center justify-center text-2xl transition-all ${
                              aktuellerWunsch.icon === icon 
                                ? 'bg-emerald-600 text-white' 
                                : 'bg-gray-100 hover:bg-gray-200'
                            }`}
                          >
                            {icon}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Bezeichnung */}
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700">Bezeichnung</label>
                      <input 
                        type="text"
                        value={aktuellerWunsch.bezeichnung}
                        onChange={(e) => updateWunsch(activeField, 'bezeichnung', e.target.value)}
                        placeholder="z.B. Traumurlaub Malediven"
                        className="w-full p-3 bg-white border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-transparent outline-none"
                      />
                    </div>

                    {/* Betrag und Vorhandenes Kapital */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700">Zielbetrag</label>
                        <div className="flex items-center gap-2">
                          <input 
                            type="number"
                            value={aktuellerWunsch.betrag}
                            onChange={(e) => updateWunsch(activeField, 'betrag', e.target.value)}
                            placeholder="0"
                            className="flex-1 p-3 bg-white border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-transparent outline-none text-right"
                          />
                          <span className="text-lg font-semibold">€</span>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700">Vorhandenes Kapital</label>
                        <div className="flex items-center gap-2">
                          <input 
                            type="number"
                            value={aktuellerWunsch.vorhandenesKapital}
                            onChange={(e) => updateWunsch(activeField, 'vorhandenesKapital', e.target.value)}
                            placeholder="0"
                            className="flex-1 p-3 bg-white border-2 border-emerald-300 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-transparent outline-none text-right"
                          />
                          <span className="text-lg font-semibold">€</span>
                        </div>
                      </div>
                    </div>

                    {/* Ziel Dropdown */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-4">
                        <label className="text-sm font-semibold text-slate-700">Ziel:</label>
                        <select
                          value={aktuellerWunsch.sparmodusTyp}
                          onChange={(e) => updateWunsch(activeField, 'sparmodusTyp', e.target.value)}
                          className="flex-1 p-3 bg-white border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-transparent outline-none"
                        >
                          <option value="datum">Datum</option>
                          <option value="betrag">Betrag</option>
                          {config.showRetirement && (
                            <>
                              <option value="freiheit">Finanzielle Freiheit</option>
                              <option value="ruhestand">Ruhestand</option>
                            </>
                          )}
                        </select>
                      </div>
                    </div>

                    {/* Conditional Input */}
                    {aktuellerWunsch.sparmodusTyp === 'datum' ? (
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700">Zieldatum</label>
                        <input 
                          type="date"
                          value={aktuellerWunsch.zieldatum}
                          onChange={(e) => updateWunsch(activeField, 'zieldatum', e.target.value)}
                          className="w-full p-3 bg-white border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-transparent outline-none"
                        />
                        {aktuellerWunsch.zieldatum && (
                          <p className="text-sm text-slate-600">
                            Benötigter Sparbetrag: <span className="font-bold">{calculateMonthlyRequired(aktuellerWunsch)}€/Monat</span>
                          </p>
                        )}
                      </div>
                    ) : aktuellerWunsch.sparmodusTyp === 'betrag' ? (
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700">Monatlicher Sparbetrag</label>
                        <div className="flex items-center gap-2">
                          <input 
                            type="number"
                            value={aktuellerWunsch.zielbetrag}
                            onChange={(e) => updateWunsch(activeField, 'zielbetrag', e.target.value)}
                            placeholder="0"
                            className="flex-1 p-3 bg-white border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-transparent outline-none text-right"
                          />
                          <span className="text-lg font-semibold">€/Monat</span>
                        </div>
                        {aktuellerWunsch.zielbetrag > 0 && (
                          <p className="text-sm text-slate-600">
                            Spardauer: <span className="font-bold">
                              {Math.ceil((aktuellerWunsch.betrag - aktuellerWunsch.vorhandenesKapital) / aktuellerWunsch.zielbetrag)} Monate
                            </span>
                          </p>
                        )}
                      </div>
                    ) : aktuellerWunsch.sparmodusTyp === 'freiheit' ? (
                      <div className="p-4 bg-emerald-50 rounded-lg">
                        <p className="text-sm text-emerald-700">
                          Ziel: Finanzielle Freiheit erreichen - Passives Einkommen aufbauen
                        </p>
                      </div>
                    ) : aktuellerWunsch.sparmodusTyp === 'ruhestand' ? (
                      <div className="p-4 bg-emerald-50 rounded-lg">
                        <p className="text-sm text-emerald-700">
                          Ziel: Ruhestand - Altersvorsorge für den wohlverdienten Lebensabend
                        </p>
                      </div>
                    ) : null}

                    {/* Priorität */}
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700">Priorität (1 = höchste, 10 = niedrigste)</label>
                      <input 
                        type="number"
                        min="1"
                        max="10"
                        value={aktuellerWunsch.prioritaet}
                        onChange={(e) => updateWunsch(activeField, 'prioritaet', Math.min(10, Math.max(1, parseInt(e.target.value) || 1)))}
                        className="w-full p-3 bg-white border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-transparent outline-none"
                      />
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm text-slate-600">
                        <span>Fortschritt</span>
                        <span>{calculateProgress(aktuellerWunsch.vorhandenesKapital, aktuellerWunsch.betrag).toFixed(0)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          className="h-3 rounded-full transition-all duration-500 bg-emerald-500"
                          style={{
                            width: `${calculateProgress(aktuellerWunsch.vorhandenesKapital, aktuellerWunsch.betrag)}%`
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Buttons */}
                  <div className="flex justify-between items-center">
                    <button
                      onClick={() => removeWunsch(activeField)}
                      className="px-6 py-3 text-base font-semibold text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                    >
                      Löschen
                    </button>
                    
                    <div className="flex space-x-4">
                      <button 
                        onClick={handleSave}
                        className="px-8 py-3 text-base font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-colors shadow-md hover:shadow-lg"
                      >
                        Speichern
                      </button>
                      <button 
                        onClick={handleCancel}
                        className="px-8 py-3 text-base font-semibold bg-slate-300 hover:bg-slate-400 text-slate-700 rounded-xl transition-colors shadow-md"
                      >
                        Abbrechen
                      </button>
                    </div>
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

export default WuenscheKombiniert;
