import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Dashboard from './pages/Dashboard'
import CVList from './pages/CVs/CVList'
import CVDetail from './pages/CVs/CVDetail'
import UploadCV from './pages/CVs/UploadCV'
import JobList from './pages/Jobs/JobList'
import JobDetail from './pages/Jobs/JobDetail'
import CreateJob from './pages/Jobs/CreateJob'
import Analysis from './pages/Analysis/Analysis'
import AnalysisDetail from './pages/Analysis/AnalysisDetail'
import AnalysisHistory from './pages/Analysis/AnalysisHistory'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/cvs" element={<CVList />} />
          <Route path="/cvs/:id" element={<CVDetail />} />
          <Route path="/cvs/upload" element={<UploadCV />} />
          <Route path="/jobs" element={<JobList />} />
          <Route path="/jobs/:id" element={<JobDetail />} />
          <Route path="/jobs/create" element={<CreateJob />} />
          <Route path="/analysis" element={<Analysis />} />
          <Route path="/analysis/:id" element={<AnalysisDetail />} />
          <Route path="/analysis/history" element={<AnalysisHistory />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App

