import mqtt from 'mqtt'

const websocketUrl = process.env.REACT_APP_MQTT_BROKER_URL
const apiEndpoint = ''

const getClient = errorHandler => {
  const client = mqtt.connect(websocketUrl, {
    username: process.env.REACT_APP_MQTT_USERNAME,
    password: process.env.REACT_APP_MQTT_PASSWORD,
  })
  client.stream.on('error', err => {
    if (errorHandler) {
      errorHandler(`Connection to ${websocketUrl} failed`)
    }
    client.end()
  })
  return client
}

const subscribe = (client, topic, errorHandler) => {
  const callBack = (err, granted) => {
    if (err && errorHandler) {
      errorHandler('Subscription request failed')
    }
  }
  return client.subscribe(apiEndpoint + topic, callBack)
}

const publish = (client, topic, payload, errorHandler) => {
  const callBack = (err, granted) => {
    if (err && errorHandler) {
      errorHandler('Publish request failed')
    }
  }
  return client.publish(apiEndpoint + topic, payload, callBack)
}

const onMessage = (client, messageHandler) => {
  client.on('message', (topic, message, packet) => {
    try {
      const parsed = JSON.parse(message.toString())
      messageHandler(parsed)
    } catch (error) {
      messageHandler({})
    }
  })
}

const unsubscribe = (client, topic) => {
  client.unsubscribe(apiEndpoint + topic)
}

const closeConnection = client => {
  client.end()
}

const mqttService = {
  getClient,
  publish,
  subscribe,
  onMessage,
  unsubscribe,
  closeConnection,
}

export default mqttService
