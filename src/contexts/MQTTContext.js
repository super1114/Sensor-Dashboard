import React from 'react'

const mqttContext = React.createContext({
  clients: [],
  setClients: () => {}
})

export default mqttContext
