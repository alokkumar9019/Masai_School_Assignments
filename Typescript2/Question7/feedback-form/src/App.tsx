

import './App.css'
import FeedbackForm from './components/FeedbackForm'
import FeedbackSummary from './components/FeedbackSummary'
import { FeedbackProvider } from './context/FeedbackContext'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'

function App() {
  

  return (
    <>
     <FeedbackProvider>
          <Router>
            <Routes>
              <Route path='/' element={<FeedbackForm/>}/>
              <Route path='/summary' element={<FeedbackSummary/>}/>
            </Routes>
          </Router>
     </FeedbackProvider>
    </>
  )
}

export default App
