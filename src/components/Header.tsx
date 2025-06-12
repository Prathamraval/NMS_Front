// import React from 'react';
// import { MenuIcon, X, Download, RefreshCw } from 'lucide-react';
// import TimeRangeSelector from './TimeRangeSelector';
// import { TimeRange } from '../types';

// interface HeaderProps {
//   sidebarOpen: boolean;
//   setSidebarOpen: (open: boolean) => void;
//   timeRange: TimeRange;
//   setTimeRange: (range: TimeRange) => void;
// }

// const Header: React.FC<HeaderProps> = ({ 
//   sidebarOpen, 
//   setSidebarOpen,
//   timeRange,
//   setTimeRange
// }) => {
//   return (
//     <header className="bg-gray-800 border-b border-gray-700 shadow-lg">
//       <div className="flex items-center justify-between px-4 py-3">
//         <div className="flex items-center">
//           <button
//             onClick={() => setSidebarOpen(!sidebarOpen)}
//             className="mr-3 p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
//           >
//             {sidebarOpen ? <X size={20} /> : <MenuIcon size={20} />}
//           </button>
//           <div className="flex items-center gap-2">
//             <h1 className="text-xl font-bold text-white">Network Monitoring</h1>
//             <div className="flex items-center gap-1 px-2 py-1 bg-emerald-900/30 text-emerald-400 rounded-full text-xs border border-emerald-500/30">
//               <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
//               <span>Live</span>
//             </div>
//           </div>
//         </div>
        
//         <div className="flex items-center gap-4">
//           <TimeRangeSelector 
//             selected={timeRange} 
//             onChange={setTimeRange} 
//           />
          
//           <button className="flex items-center gap-1 px-3 py-1.5 bg-gray-700 hover:bg-gray-600 rounded-md text-white text-sm transition-colors">
//             <RefreshCw size={16} />
//             <span>Refresh</span>
//           </button>
          
//           <button className="flex items-center gap-1 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 rounded-md text-white text-sm transition-colors">
//             <Download size={16} />
//             <span>Export</span>
//           </button>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;


import React from 'react';
import { MenuIcon, X, Download, RefreshCw } from 'lucide-react';
import TimeRangeSelector from './TimeRangeSelector';
import { TimeRange } from '../types';

interface HeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  timeRange: TimeRange;
  setTimeRange: (range: TimeRange) => void;
  isBackendConnected: boolean;
}

const Header: React.FC<HeaderProps> = ({ 
  sidebarOpen, 
  setSidebarOpen,
  timeRange,
  setTimeRange,
  isBackendConnected
}) => {
  return (
    <header className="bg-gray-800 border-b border-gray-700 shadow-lg">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="mr-3 p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
          >
            {sidebarOpen ? <X size={20} /> : <MenuIcon size={20} />}
          </button>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-white">Network Monitoring</h1>
            <div className="flex items-center gap-1 px-2 py-1 bg-emerald-900/30 text-emerald-400 rounded-full text-xs border border-emerald-500/30">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              <span>Live</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <TimeRangeSelector 
            selected={timeRange} 
            onChange={setTimeRange} 
          />
          
          <button 
            disabled={!isBackendConnected}
            className="flex items-center gap-1 px-3 py-1.5 bg-gray-700 hover:bg-gray-600 rounded-md text-white text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <RefreshCw size={16} />
            <span>Refresh</span>
          </button>
          
          <button className="flex items-center gap-1 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 rounded-md text-white text-sm transition-colors">
            <Download size={16} />
            <span>Export</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;