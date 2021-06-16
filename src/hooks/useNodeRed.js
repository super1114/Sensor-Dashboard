import { useEffect, useState } from 'react'
import mqttService from 'service/mqtt'

const useNodeRed = (topic) => {
  
  const [payload, setPaylod] = useState({})

  useEffect(() => {
    const client = mqttService.getClient(() => {})
    mqttService.subscribe(client, topic)
    mqttService.onMessage(client, message => setPaylod(message))

    return () => mqttService.closeConnection(client)
  }, [topic])

  return payload
}

export default useNodeRed
