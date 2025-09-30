import { useState } from 'react'
import './App.css'
import DonorView from './DonorView'
import NGOView from './NGOView'
import StatusView from './StatusView'

function App() {
  const [currentView, setCurrentView] = useState('donor')

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Disaster Relief Escrow</h1>
          <nav>
            <button 
              className={`px-4 py-2 rounded-md mr-2 ${currentView === 'donor' ? 'bg-blue-800' : 'bg-blue-500'}`}
              onClick={() => setCurrentView('donor')}
            >
              Donor View
            </button>
            <button 
              className={`px-4 py-2 rounded-md mr-2 ${currentView === 'ngo' ? 'bg-blue-800' : 'bg-blue-500'}`}
              onClick={() => setCurrentView('ngo')}
            >
              NGO View
            </button>
            <button 
              className={`px-4 py-2 rounded-md ${currentView === 'status' ? 'bg-blue-800' : 'bg-blue-500'}`}
              onClick={() => setCurrentView('status')}
            >
              Status View
            </button>
          </nav>
        </div>
      </header>
      
      <main className="container mx-auto p-4">
        {currentView === 'donor' && <DonorView />}
        {currentView === 'ngo' && <NGOView />}
        {currentView === 'status' && <StatusView />}
      </main>
    </div>
  )
}

export default App
