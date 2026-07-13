import { MissionLogProvider } from './context/MissionLogContext'
import Dashboard from './pages/Dashboard/Dashboard'

function App() {
  return (
    <>
      <MissionLogProvider>
        <Dashboard />
      </MissionLogProvider>
    </>
  )
}

export default App
