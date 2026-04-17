import React, { useState } from 'react';
import { INITIAL_STATE } from './constants/initialState';
import ReportForm from './components/ReportForm';
import ReportTemplate from './components/ReportTemplate';
import { FileText, Edit3, Download, Eye, Menu, X } from 'lucide-react';
import { exportToPDF, exportToWord } from './utils/exportUtils';

function App() {
  const [data, setData] = useState(INITIAL_STATE);
  const [activeTab, setActiveTab] = useState('edit'); // 'edit' or 'preview'
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  React.useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleUpdateData = (newData) => {
    setData(prev => ({ ...prev, ...newData }));
  };

  const scale = windowWidth < 640 ? 0.38 : windowWidth < 1024 ? 0.75 : 1;

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 font-sans selection:bg-indigo-500/30">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-[#0f172a]/80 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 relative">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-600 rounded-lg shadow-lg shadow-indigo-500/20">
              <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div>
              <h1 className="text-base sm:text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                Loan Verification System
              </h1>
              <p className="text-[8px] sm:text-[10px] uppercase tracking-widest text-slate-500 font-semibold">
                Parvez & Narayana CA
              </p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-2 bg-slate-900/50 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveTab('edit')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'edit'
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
            >
              <Edit3 className="w-4 h-4" />
              Editor
            </button>
            <button
              onClick={() => setActiveTab('preview')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'preview'
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
            >
              <Eye className="w-4 h-4" />
              Preview
            </button>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-slate-400 hover:text-white p-2"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navbar Overlay */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 w-full bg-[#0f172a] border-b border-slate-800 p-4 flex flex-col gap-3 shadow-2xl">
            <button
              onClick={() => { setActiveTab('edit'); setIsMobileMenuOpen(false); }}
              className={`flex items-center w-full gap-2 px-4 py-3 rounded-lg text-sm font-medium transition-all ${activeTab === 'edit'
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
                }`}
            >
              <Edit3 className="w-4 h-4" />
              Editor Mode
            </button>
            <button
              onClick={() => { setActiveTab('preview'); setIsMobileMenuOpen(false); }}
              className={`flex items-center w-full gap-2 px-4 py-3 rounded-lg text-sm font-medium transition-all ${activeTab === 'preview'
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
                }`}
            >
              <Eye className="w-4 h-4" />
              Preview & Export
            </button>
          </div>
        )}
      </header>

      <main className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-4 sm:py-8">
        {activeTab === 'edit' ? (
          <ReportForm data={data} updateData={handleUpdateData} onPreview={() => setActiveTab('preview')} />
        ) : (
          <div className="flex flex-col items-center gap-4 sm:gap-8">
            <div className="w-full flex flex-col sm:flex-row justify-end gap-3 sticky top-20 z-40 bg-slate-900/50 p-2 sm:p-0 rounded-xl sm:rounded-none backdrop-blur-sm sm:backdrop-none">
              <button
                onClick={() => exportToPDF('report-template', `Report_${data.applicantName || 'Export'}.pdf`)}
                className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold shadow-xl shadow-indigo-500/20 transition-all text-sm sm:text-base"
              >
                <Download className="w-4 sm:h-5 sm:w-5 h-4" />
                Export PDF
              </button>
              <button
                onClick={() => exportToWord(data)}
                className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold shadow-xl shadow-emerald-500/20 transition-all text-sm sm:text-base"
              >
                <FileText className="w-4 sm:h-5 sm:w-5 h-4" />
                Export Word
              </button>
            </div>

            {/* Responsive Report Wrapper */}
            <div className="w-full bg-slate-800/10 rounded-2xl border border-slate-800/50 overflow-hidden">
              {/* 
                   Dynamic Height Container:
                   We force the container height to match the scaled document height.
                   This prevents the "void" scroll below the last page.
               */}
              <div className="w-full relative py-8 flex justify-center"
                style={{ height: `${9216 * scale + 100}px` }}>

                {/* 
                      Scaling Logic:
                      We use origin-top and center the unscaled 850px box.
                      Scaling then happens symmetrically from the top center.
                  */}
                <div className="origin-top transition-transform duration-500 ease-out"
                  style={{
                    width: '850px',
                    minWidth: '850px',
                    transform: `scale(${scale})`,
                  }}>
                  <ReportTemplate data={data} />
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer Decoration */}
      <footer className="py-12 border-t border-slate-800/50 mt-12 bg-slate-900/20">
        <div className="text-center text-slate-500 text-xs">
          © 2026 Quebrick All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default App;