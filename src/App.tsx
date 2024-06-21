import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Layout from "@containers/Layout"
import HomePage from "@pages/Home"
import DevicePages from "@pages/Device"
import NotFound from "@containers/NotFound"
import StateProvider from "@store"
import ToastProvider from "@components/Toast"

export const App = () => {
  return (
    <StateProvider>
      <ToastProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" Component={HomePage} />
              <Route path="/devices/*" Component={DevicePages} />
              <Route path="*" Component={NotFound} />
            </Routes>
          </Layout>
        </Router>
      </ToastProvider>
    </StateProvider>
  )
}

export default App
