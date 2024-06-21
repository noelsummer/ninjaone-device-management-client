import { Route, Routes } from "react-router-dom"

import DeviceListPage from "./List"

export const DevicePages = () => {
  return (
    <Routes>
      <Route path="/" Component={DeviceListPage} />
      <Route path="/:id" Component={DeviceListPage} />
    </Routes>
  )
}

export default DevicePages
