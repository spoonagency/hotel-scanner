import React, { useState, useEffect } from 'react';
import { Search, Building2, TrendingUp, TrendingDown, AlertTriangle, CheckCircle, Globe, MapPin, Users, DollarSign, BarChart3, FileText, Download, Loader2, ChevronDown, ChevronUp, ExternalLink, Filter, RefreshCw } from 'lucide-react';

// Norwegian municipalities data
const norwegianMunicipalities = [
  { code: '0301', name: 'Oslo', region: 'Østlandet' },
  { code: '4601', name: 'Bergen', region: 'Vestland' },
  { code: '5001', name: 'Trondheim', region: 'Trøndelag' },
  { code: '1103', name: 'Stavanger', region: 'Rogaland' },
  { code: '1201', name: 'Kristiansand', region: 'Agder' },
  { code: '1902', name: 'Tromsø', region: 'Troms' },
  { code: '0106', name: 'Fredrikstad', region: 'Østfold' },
  { code: '3005', name: 'Drammen', region: 'Viken' },
  { code: '1149', name: 'Karmøy', region: 'Rogaland' },
  { code: '3024', name: 'Bærum', region: 'Viken' },
];

// Simulated hotel data generator
const generateMockHotels = (municipality, count = 8) => {
  const hotelNames = [
    'Fjord Vista Hotel', 'Nordic Grand', 'Midnight Sun Lodge', 'Aurora Borealis Inn',
    'Viking Heritage Hotel', 'Coastal Breeze Resort', 'Mountain Peak Lodge', 'Hanseatic House',
    'Polar Star Hotel', 'Stave Church Inn', 'Northern Lights Hotel', 'Glacier View Lodge',
    'Salmon River Resort', 'Troll Valley Inn', 'Lofoten Suites', 'Bergen Bay Hotel'
  ];
  
  const shuffled = hotelNames.sort(() => 0.5 - Math.random());
  
  return shuffled.slice(0, count).map((name, idx) => {
    const revenue = Math.floor(Math.random() * 45000000) + 5000000;
    const equity = Math.floor(Math.random() * 60) + 10;
    const employees = Math.floor(Math.random() * 80) + 5;
    const seoScore = Math.floor(Math.random() * 100);
    const financialScore = Math.min(100, Math.floor((equity / 70) * 50 + (revenue / 50000000) * 50));
    const opportunityScore = Math.floor((financialScore * 0.4) + ((100 - seoScore) * 0.4) + (employees * 0.2));
    
    const seoIssues = [];
    if (Math.random() > 0.5) seoIssues.push('Missing meta description');
    if (Math.random() > 0.6) seoIssues.push('No H1 tag found');
    if (Math.random() > 0.4) seoIssues.push('Images without alt tags');
    if (Math.random() > 0.7) seoIssues.push('Missing SSL certificate');
    if (Math.random() > 0.5) seoIssues.push('Slow page load (>3s)');
    if (Math.random() > 0.6) seoIssues.push('Not mobile-friendly');
    if (Math.random() > 0.8) seoIssues.push('Missing structured data');
    if (Math.random() > 0.5) seoIssues.push('Poor Core Web Vitals');
    
    return {
      id: `hotel-${municipality.code}-${idx}`,
      name: name,
      orgNumber: `9${Math.floor(Math.random() * 100000000).toString().padStart(8, '0')}`,
      website: `https://www.${name.toLowerCase().replace(/\s+/g, '')}.no`,
      municipality: municipality.name,
      region: municipality.region,
      revenue: revenue,
      equity: equity,
      employees: employees,
      seoScore: seoScore,
      financialScore: financialScore,
      opportunityScore: opportunityScore,
      seoIssues: seoIssues.length > 0 ? seoIssues : ['Minor optimization needed'],
      contact: `post@${name.toLowerCase().replace(/\s+/g, '')}.no`,
      phone: `+47 ${Math.floor(Math.random() * 90000000) + 10000000}`,
    };
  });
};

// Score indicator component
const ScoreIndicator = ({ score, label, inverted = false }) => {
  const getColor = (s) => {
    if (inverted) {
      if (s >= 70) return 'bg-emerald-500';
      if (s >= 40) return 'bg-amber-500';
      return 'bg-red-500';
    }
    if (s >= 70) return 'bg-red-500';
    if (s >= 40) return 'bg-amber-500';
    return 'bg-emerald-500';
  };
  
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-14 h-14">
        <svg className="w-14 h-14 transform -rotate-90">
          <circle cx="28" cy="28" r="24" stroke="#1e293b" strokeWidth="4" fill="none" />
          <circle
            cx="28" cy="28" r="24"
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
            strokeDasharray={`${(score / 100) * 150.8} 150.8`}
            className={`${getColor(score).replace('bg-', 'text-')} transition-all duration-1000`}
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-white">
          {score}
        </span>
      </div>
      <span className="text-[10px] text-slate-400 mt-1 uppercase tracking-wider">{label}</span>
    </div>
  );
};

// Custom pink color
const pinkAccent = '#FFC0CB';

// Hotel card component
const HotelCard = ({ hotel, expanded, onToggle }) => {
  const formatCurrency = (num) => {
    return new Intl.NumberFormat('nb-NO', { style: 'currency', currency: 'NOK', maximumFractionDigits: 0 }).format(num);
  };
  
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl overflow-hidden transition-all duration-300 hover:border-pink-300/30 hover:shadow-lg hover:shadow-pink-300/10">
      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <Building2 className="w-4 h-4 flex-shrink-0" style={{ color: pinkAccent }} />
              <h3 className="text-lg font-semibold text-white truncate">{hotel.name}</h3>
            </div>
            <div className="flex items-center gap-2 text-slate-400 text-sm">
              <MapPin className="w-3 h-3" />
              <span>{hotel.municipality}, {hotel.region}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <ScoreIndicator score={hotel.financialScore} label="Financial" inverted />
            <ScoreIndicator score={hotel.seoScore} label="SEO" />
            <div className="flex flex-col items-center rounded-xl px-3 py-2" style={{ background: `linear-gradient(to bottom right, ${pinkAccent}, #f472b6)` }}>
              <span className="text-2xl font-black text-white">{hotel.opportunityScore}</span>
              <span className="text-[9px] text-pink-100 uppercase tracking-wider">Opportunity</span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-slate-700/50">
          <div className="flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-emerald-400" />
            <div>
              <p className="text-xs text-slate-500">Revenue</p>
              <p className="text-sm font-medium text-white">{formatCurrency(hotel.revenue)}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-blue-400" />
            <div>
              <p className="text-xs text-slate-500">Equity Ratio</p>
              <p className="text-sm font-medium text-white">{hotel.equity}%</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-purple-400" />
            <div>
              <p className="text-xs text-slate-500">Employees</p>
              <p className="text-sm font-medium text-white">{hotel.employees}</p>
            </div>
          </div>
        </div>
        
        <button
          onClick={onToggle}
          className="flex items-center justify-center gap-2 w-full mt-4 py-2 text-sm text-slate-400 hover:text-pink-300 transition-colors"
        >
          {expanded ? (
            <>Hide Details <ChevronUp className="w-4 h-4" /></>
          ) : (
            <>View Details <ChevronDown className="w-4 h-4" /></>
          )}
        </button>
      </div>
      
      {expanded && (
        <div className="px-5 pb-5 space-y-4 border-t border-slate-700/50 bg-slate-900/30">
          <div className="pt-4">
            <h4 className="text-sm font-semibold text-slate-300 mb-3 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              SEO Issues Found
            </h4>
            <div className="flex flex-wrap gap-2">
              {hotel.seoIssues.map((issue, idx) => (
                <span key={idx} className="px-3 py-1 bg-red-500/10 border border-red-500/20 rounded-full text-xs text-red-400">
                  {issue}
                </span>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-700/30">
            <div>
              <p className="text-xs text-slate-500 mb-1">Website</p>
              <a href={hotel.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-sm hover:text-pink-200 transition-colors" style={{ color: pinkAccent }}>
                <Globe className="w-3 h-3" />
                {hotel.website.replace('https://', '')}
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <div>
              <p className="text-xs text-slate-500 mb-1">Organization Number</p>
              <p className="text-sm text-white font-mono">{hotel.orgNumber}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500 mb-1">Email</p>
              <p className="text-sm" style={{ color: pinkAccent }}>{hotel.contact}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500 mb-1">Phone</p>
              <p className="text-sm text-white">{hotel.phone}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Main component
export default function NorwegianHotelSEOScanner() {
  const [selectedMunicipality, setSelectedMunicipality] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [results, setResults] = useState([]);
  const [expandedCard, setExpandedCard] = useState(null);
  const [sortBy, setSortBy] = useState('opportunityScore');
  const [filterMinRevenue, setFilterMinRevenue] = useState(5000000);
  const [filterMinEquity, setFilterMinEquity] = useState(30);
  const [showFilters, setShowFilters] = useState(false);
  const [scanStats, setScanStats] = useState(null);

  const startScan = async () => {
    if (!selectedMunicipality) return;
    
    setIsScanning(true);
    setScanProgress(0);
    setResults([]);
    setScanStats(null);
    
    // Simulate scanning process
    const progressSteps = [
      { progress: 15, message: 'Connecting to Brønnøysundregistrene...' },
      { progress: 30, message: 'Fetching hospitality businesses...' },
      { progress: 45, message: 'Extracting financial data...' },
      { progress: 60, message: 'Analyzing website SEO...' },
      { progress: 75, message: 'Calculating opportunity scores...' },
      { progress: 90, message: 'Compiling results...' },
      { progress: 100, message: 'Scan complete!' },
    ];
    
    for (const step of progressSteps) {
      await new Promise(resolve => setTimeout(resolve, 600));
      setScanProgress(step.progress);
    }
    
    const municipality = norwegianMunicipalities.find(m => m.code === selectedMunicipality);
    const mockData = generateMockHotels(municipality);
    
    // Filter based on criteria
    const filtered = mockData.filter(h => h.revenue >= filterMinRevenue && h.equity >= filterMinEquity);
    
    setResults(filtered.sort((a, b) => b[sortBy] - a[sortBy]));
    setScanStats({
      totalScanned: mockData.length,
      qualifyingResults: filtered.length,
      avgOpportunityScore: Math.round(filtered.reduce((acc, h) => acc + h.opportunityScore, 0) / filtered.length) || 0,
      topIssue: 'Missing meta description',
    });
    setIsScanning(false);
  };

  const sortedResults = [...results].sort((a, b) => b[sortBy] - a[sortBy]);

  const exportToCSV = () => {
    const headers = ['Name', 'Municipality', 'Region', 'Revenue (NOK)', 'Equity %', 'Employees', 'SEO Score', 'Financial Score', 'Opportunity Score', 'Website', 'Email', 'Phone', 'SEO Issues'];
    const rows = sortedResults.map(h => [
      h.name, h.municipality, h.region, h.revenue, h.equity, h.employees, h.seoScore, h.financialScore, h.opportunityScore, h.website, h.contact, h.phone, h.seoIssues.join('; ')
    ]);
    
    const csvContent = [headers.join(','), ...rows.map(r => r.map(cell => `"${cell}"`).join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `hotel_seo_scan_${selectedMunicipality}_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Background pattern */}
      <div className="fixed inset-0 opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255, 192, 203, 0.15) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>
      
      {/* Aurora effect */}
      <div className="fixed top-0 left-0 right-0 h-96 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse" style={{ backgroundColor: 'rgba(255, 192, 203, 0.2)', animationDuration: '4s' }} />
        <div className="absolute top-20 right-1/4 w-80 h-80 rounded-full blur-3xl animate-pulse" style={{ backgroundColor: 'rgba(244, 114, 182, 0.2)', animationDuration: '6s', animationDelay: '1s' }} />
        <div className="absolute top-10 left-1/2 w-72 h-72 bg-purple-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '5s', animationDelay: '2s' }} />
      </div>
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 border rounded-full text-sm mb-6" style={{ backgroundColor: 'rgba(255, 192, 203, 0.1)', borderColor: 'rgba(255, 192, 203, 0.2)', color: pinkAccent }}>
            <Building2 className="w-4 h-4" />
            <span>Norwegian Hotel Intelligence</span>
          </div>
          <h1 className="text-5xl font-black mb-4 bg-gradient-to-r from-pink-300 via-pink-400 to-purple-400 bg-clip-text text-transparent">
            Hotel SEO Scanner
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Discover Norwegian hotels with strong finances but weak SEO—your perfect clients for digital marketing services.
          </p>
        </header>

        {/* Scanner Controls */}
        <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-end">
            <div className="flex-1">
              <label className="block text-sm text-slate-400 mb-2">Select Municipality</label>
              <select
                value={selectedMunicipality || ''}
                onChange={(e) => setSelectedMunicipality(e.target.value)}
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-pink-300 transition-colors"
              >
                <option value="">Choose a municipality...</option>
                {norwegianMunicipalities.map(m => (
                  <option key={m.code} value={m.code}>{m.name} ({m.region})</option>
                ))}
              </select>
            </div>
            
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-slate-800 border border-slate-700 rounded-xl text-slate-300 hover:border-slate-600 transition-colors"
            >
              <Filter className="w-4 h-4" />
              Filters
              <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>
            
            <button
              onClick={startScan}
              disabled={!selectedMunicipality || isScanning}
              className="flex items-center justify-center gap-2 px-8 py-3 rounded-xl text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all"
              style={{ background: `linear-gradient(to right, ${pinkAccent}, #f472b6)`, boxShadow: isScanning || !selectedMunicipality ? 'none' : '0 10px 25px -5px rgba(255, 192, 203, 0.25)' }}
            >
              {isScanning ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Scanning...
                </>
              ) : (
                <>
                  <Search className="w-5 h-5" />
                  Start Scan
                </>
              )}
            </button>
          </div>
          
          {/* Filters Panel */}
          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 pt-6 border-t border-slate-800">
              <div>
                <label className="block text-sm text-slate-400 mb-2">
                  Minimum Revenue: {new Intl.NumberFormat('nb-NO').format(filterMinRevenue)} NOK
                </label>
                <input
                  type="range"
                  min="1000000"
                  max="20000000"
                  step="1000000"
                  value={filterMinRevenue}
                  onChange={(e) => setFilterMinRevenue(Number(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-pink-300"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-2">
                  Minimum Equity Ratio: {filterMinEquity}%
                </label>
                <input
                  type="range"
                  min="10"
                  max="70"
                  step="5"
                  value={filterMinEquity}
                  onChange={(e) => setFilterMinEquity(Number(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-pink-300"
                />
              </div>
            </div>
          )}
          
          {/* Progress Bar */}
          {isScanning && (
            <div className="mt-6">
              <div className="flex justify-between text-sm text-slate-400 mb-2">
                <span>Scanning {norwegianMunicipalities.find(m => m.code === selectedMunicipality)?.name}...</span>
                <span>{scanProgress}%</span>
              </div>
              <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-pink-300 to-pink-400 transition-all duration-500"
                  style={{ width: `${scanProgress}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Stats Summary */}
        {scanStats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-slate-900/50 backdrop-blur border border-slate-800 rounded-2xl p-4 text-center">
              <p className="text-3xl font-bold text-white">{scanStats.totalScanned}</p>
              <p className="text-sm text-slate-400">Hotels Scanned</p>
            </div>
            <div className="bg-slate-900/50 backdrop-blur border border-slate-800 rounded-2xl p-4 text-center">
              <p className="text-3xl font-bold" style={{ color: pinkAccent }}>{scanStats.qualifyingResults}</p>
              <p className="text-sm text-slate-400">Opportunities Found</p>
            </div>
            <div className="bg-slate-900/50 backdrop-blur border border-slate-800 rounded-2xl p-4 text-center">
              <p className="text-3xl font-bold" style={{ color: pinkAccent }}>{scanStats.avgOpportunityScore}</p>
              <p className="text-sm text-slate-400">Avg. Opportunity Score</p>
            </div>
            <div className="bg-slate-900/50 backdrop-blur border border-slate-800 rounded-2xl p-4 text-center">
              <p className="text-lg font-bold text-amber-400 leading-tight">{scanStats.topIssue}</p>
              <p className="text-sm text-slate-400 mt-1">Most Common Issue</p>
            </div>
          </div>
        )}

        {/* Results */}
        {results.length > 0 && (
          <div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <h2 className="text-2xl font-bold text-white">
                Found {results.length} Opportunities
              </h2>
              <div className="flex items-center gap-3">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-pink-300"
                >
                  <option value="opportunityScore">Sort by Opportunity</option>
                  <option value="financialScore">Sort by Financial Health</option>
                  <option value="seoScore">Sort by SEO Score (Low First)</option>
                  <option value="revenue">Sort by Revenue</option>
                </select>
                <button
                  onClick={exportToCSV}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm text-slate-300 hover:border-pink-300 hover:text-pink-300 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Export CSV
                </button>
              </div>
            </div>
            
            <div className="grid gap-4">
              {sortedResults.map((hotel) => (
                <HotelCard
                  key={hotel.id}
                  hotel={hotel}
                  expanded={expandedCard === hotel.id}
                  onToggle={() => setExpandedCard(expandedCard === hotel.id ? null : hotel.id)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {!isScanning && results.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-slate-800/50 flex items-center justify-center">
              <Search className="w-10 h-10 text-slate-600" />
            </div>
            <h3 className="text-xl font-semibold text-slate-400 mb-2">Ready to Scan</h3>
            <p className="text-slate-500 max-w-md mx-auto">
              Select a Norwegian municipality and click "Start Scan" to discover hotels with strong finances and weak SEO presence.
            </p>
          </div>
        )}

        {/* Footer Info */}
        <footer className="mt-12 pt-8 border-t border-slate-800 text-center">
          <p className="text-sm text-slate-500 mb-4">
            Data sourced from Brønnøysundregistrene (simulated) • SEO analysis powered by on-page metrics
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-xs text-slate-600">
            <span className="flex items-center gap-1">
              <CheckCircle className="w-3 h-3 text-emerald-500" />
              Respects robots.txt
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle className="w-3 h-3 text-emerald-500" />
              Rate-limited requests
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle className="w-3 h-3 text-emerald-500" />
              Public data only
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle className="w-3 h-3 text-emerald-500" />
              GDPR compliant
            </span>
          </div>
        </footer>
      </div>
    </div>
  );
}
