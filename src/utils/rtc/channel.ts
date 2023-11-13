export function initChannel() {
  let sendChannel: RTCDataChannel | null

  return {
    sendData(data) {
      if (sendChannel && sendChannel.readyState === 'open') {
        sendChannel.send(data)
      }
    },
    setChannel(channel: RTCDataChannel | null) {
      sendChannel = channel
    }
  }
}
