
import React, { useState } from 'react';
import { Sparkles, Globe, Compass, Map, BookOpen, Download } from 'lucide-react';
import Header from './components/layout/Header';
import NorthIndianChart from './components/charts/NorthIndianChart';
import WesternWheel from './components/charts/WesternWheel';
import { calculateChartData, ZODIAC } from './services/astrology';
import html2pdf from 'html2pdf.js';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    time: '',
    system: 'tropical'
  });
  const [chartData, setChartData] = useState(null);
  const [activeTab, setActiveTab] = useState('input'); // input, charts, analysis, education

  const handleCalculate = (e) => {
    e.preventDefault();
    if (!formData.date || !formData.time) return;
    const data = calculateChartData(formData.date, formData.time, formData.system);
    setChartData(data);
    setActiveTab('charts');
  };

  const handleExportPDF = () => {
    const element = document.getElementById('report-content');
    const opt = {
      margin: 1,
      filename: `Mapa_Astral_${formData.name || 'Visitante'}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    html2pdf().set(opt).from(element).save();
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans selection:bg-purple-500 selection:text-white pb-20">
      <Header />

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Navigation */}
        <nav className="flex flex-wrap gap-4 mb-8 border-b border-slate-700 pb-4">
          <button onClick={() => setActiveTab('input')} className={`px-4 py-2 rounded-lg transition ${activeTab === 'input' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:bg-slate-800'}`}>Dados</button>
          <button disabled={!chartData} onClick={() => setActiveTab('charts')} className={`px-4 py-2 rounded-lg transition disabled:opacity-50 ${activeTab === 'charts' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:bg-slate-800'}`}>Mandalas</button>
          <button disabled={!chartData} onClick={() => setActiveTab('analysis')} className={`px-4 py-2 rounded-lg transition disabled:opacity-50 ${activeTab === 'analysis' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:bg-slate-800'}`}>Interpretação</button>
          <button onClick={() => setActiveTab('education')} className={`px-4 py-2 rounded-lg transition ${activeTab === 'education' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:bg-slate-800'}`}>Tropical vs Sideral</button>
        </nav>

        {/* VIEW: INPUT */}
        {activeTab === 'input' && (
          <div className="max-w-2xl mx-auto animate-fade-in">
            <div className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700 shadow-xl">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Compass className="w-6 h-6 text-purple-400" /> Gerar Mapa Astral
              </h2>
              <form onSubmit={handleCalculate} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm text-slate-400">Nome</label>
                    <input type="text" className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 focus:border-purple-500 outline-none transition" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} placeholder="Ex: João Silva" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-slate-400">Sistema</label>
                    <select className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 focus:border-purple-500 outline-none transition" value={formData.system} onChange={e => setFormData({ ...formData, system: e.target.value })}>
                      <option value="tropical">Tropical (Ocidental)</option>
                      <option value="vedic">Sideral (Védico - Lahiri)</option>
                    </select>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm text-slate-400">Data de Nascimento</label>
                    <input type="date" required className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-slate-200" value={formData.date} onChange={e => setFormData({ ...formData, date: e.target.value })} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-slate-400">Horário</label>
                    <input type="time" required className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-slate-200" value={formData.time} onChange={e => setFormData({ ...formData, time: e.target.value })} />
                  </div>
                </div>
                <button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 rounded-xl transition shadow-lg shadow-purple-900/40 flex items-center justify-center gap-2">
                  <Sparkles className="w-5 h-5" /> Calcular Mapa Completo
                </button>
              </form>
            </div>
          </div>
        )}

        {/* VIEW: CHARTS & ANALYSIS (Wrapped for PDF) */}
        {(activeTab === 'charts' || activeTab === 'analysis') && chartData && (
          <div id="report-content" className="space-y-8 animate-fade-in">
            <div className="flex justify-between items-center">
              <div className="text-center md:text-left">
                <h2 className="text-3xl font-bold">{formData.name || 'Visitante'}</h2>
                <p className="text-slate-400">{new Date(formData.date).toLocaleDateString()} às {formData.time} • Sistema {formData.system === 'tropical' ? 'Tropical' : 'Sideral (Lahiri)'}</p>
                {formData.system === 'vedic' && <p className="text-xs text-orange-400">Ayanamsa Lahiri: {chartData.ayanamsa}°</p>}
              </div>
              <button onClick={handleExportPDF} className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition">
                <Download className="w-4 h-4" /> PDF
              </button>
            </div>

            {/* Charts Section */}
            {activeTab === 'charts' && (
              <div className="grid lg:grid-cols-2 gap-12 items-start">
                <div>
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <Map className="w-5 h-5 text-purple-400" /> Mapa Rasi (D-1)
                    </h3>
                  </div>
                  {formData.system === 'vedic' ? (
                    <NorthIndianChart data={chartData} title="Rasi (D-1)" />
                  ) : (
                    <WesternWheel data={chartData} />
                  )}

                  {/* D9 for Vedic */}
                  {formData.system === 'vedic' && (
                    <div className="mt-8">
                      <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
                        <Sparkles className="w-5 h-5 text-orange-400" /> Mapa Navamsa (D-9)
                      </h3>
                      <NorthIndianChart
                        title="Navamsa (D-9)"
                        data={{
                          ...chartData,
                          ascendant: { ...chartData.ascendant, sign: chartData.planets[0].d9Sign }, // Simplified Asc D9
                          planets: chartData.planets.map(p => ({ ...p, sign: p.d9Sign, house: p.d9Sign.id })) // Simplified House logic for D9 display
                        }}
                      />
                    </div>
                  )}
                </div>

                {/* Planetary Table */}
                <div className="bg-slate-800 rounded-xl overflow-hidden border border-slate-700">
                  <div className="p-4 bg-slate-700/50 font-bold border-b border-slate-600 flex justify-between">
                    <span>Posições Planetárias</span>
                    <span className="text-xs font-normal text-slate-400 self-center">Graus • Signo</span>
                  </div>
                  <div className="divide-y divide-slate-700">
                    <div className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-xl font-bold text-green-400">Asc</span>
                        <div>
                          <p className="font-bold">Ascendente</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 justify-end">
                          <span className="text-xl">{chartData.ascendant.sign.image}</span>
                          <span className="font-bold text-purple-300">{chartData.ascendant.sign.name}</span>
                        </div>
                        <p className="text-xs text-slate-500">{(chartData.ascendant.longitude % 30).toFixed(2)}°</p>
                      </div>
                    </div>
                    {chartData.planets.map(planet => (
                      <div key={planet.id} className="p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className={`text-xl font-bold w-6 text-center ${planet.color}`}>{planet.icon}</span>
                          <div>
                            <p className="font-bold">{planet.name}</p>
                            <p className="text-xs text-slate-400">
                              {formData.system === 'vedic' && planet.nakshatra ? `Nak: ${planet.nakshatra.name} (${planet.nakshatra.pada})` : `Casa ${planet.house}`}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1 justify-end">
                            <span className="text-xl">{planet.sign.image}</span>
                            <span className="font-bold text-purple-300">{planet.sign.name}</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-xs text-slate-500">{planet.degree.toFixed(2)}°</span>
                            {formData.system === 'vedic' && (
                              <span className="text-[10px] text-orange-400">D9: {planet.d9Sign.name}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Analysis Section */}
            {activeTab === 'analysis' && (
              <div className="space-y-6">
                {formData.system === 'vedic' && (
                  <div className="bg-orange-900/20 border border-orange-500/30 p-6 rounded-xl">
                    <h3 className="text-xl font-bold text-orange-400 mb-4">Karakas Jaimini</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="p-4 bg-slate-900/50 rounded border border-orange-500/20">
                        <p className="text-xs uppercase text-slate-400">Atmakaraka (Alma)</p>
                        <p className="text-lg font-bold">{chartData.atmakaraka.name}</p>
                      </div>
                      <div className="p-4 bg-slate-900/50 rounded border border-orange-500/20">
                        <p className="text-xs uppercase text-slate-400">Darakaraka (Cônjuge)</p>
                        <p className="text-lg font-bold">{chartData.darakaraka.name}</p>
                      </div>
                    </div>
                  </div>
                )}

                <h3 className="text-2xl font-bold flex items-center gap-2">
                  <BookOpen className="w-6 h-6 text-purple-400" /> Interpretação
                </h3>
                <div className="grid gap-4">
                  {chartData.planets.map(planet => (
                    <div key={planet.id} className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                      <h4 className="font-bold text-lg mb-2 flex items-center gap-2">
                        <span className={planet.color}>{planet.icon}</span> {planet.name} em {planet.sign.name}
                      </h4>
                      <p className="text-slate-300 text-sm">
                        {planet.name} representa {planet.karaka}. Em {planet.sign.name} ({planet.sign.element}),
                        sua energia se manifesta de forma {planet.sign.element === 'Fogo' ? 'intensa e ativa' : planet.sign.element === 'Terra' ? 'prática e estável' : planet.sign.element === 'Ar' ? 'intelectual e comunicativa' : 'emocional e intuitiva'}.
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* VIEW: EDUCATION */}
        {activeTab === 'education' && (
          <div className="max-w-3xl mx-auto space-y-8 animate-fade-in">
            <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Globe className="w-6 h-6 text-blue-400" /> Tropical vs Sideral
              </h2>
              <div className="prose prose-invert">
                <p>
                  A principal diferença entre a astrologia Ocidental (Tropical) e a Védica (Sideral) é o ponto de referência do Zodíaco.
                </p>
                <ul className="list-disc pl-5 space-y-2 mt-4">
                  <li>
                    <strong className="text-purple-400">Sistema Tropical:</strong> Baseado nas estações do ano. O 0° de Áries é fixado no Equinócio de Primavera (Hemisfério Norte). É um zodíaco móvel em relação às estrelas.
                  </li>
                  <li>
                    <strong className="text-orange-400">Sistema Sideral:</strong> Baseado nas constelações reais visíveis no céu. Leva em conta a Precessão dos Equinócios.
                  </li>
                </ul>
                <div className="bg-slate-900 p-4 rounded-lg mt-6 border border-slate-600">
                  <h4 className="font-bold mb-2">O Ayanamsa</h4>
                  <p className="text-sm">
                    A diferença entre os dois zodíacos é chamada de <strong>Ayanamsa</strong>. Atualmente, essa diferença é de aproximadamente <strong>24 graus</strong>.
                    Por isso, se você é de Áries no sistema Tropical, pode ser de Peixes no Sideral.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
