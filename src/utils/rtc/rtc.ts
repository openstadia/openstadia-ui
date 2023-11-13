export function initRtc(videoEl: HTMLVideoElement | null, audioEl: HTMLAudioElement | null) {
  const pc = new RTCPeerConnection({
    iceServers: [
      {
        urls: 'stun:stun.l.google.com:19302'
      }
    ]
  })

  pc.addEventListener('track', (event) => {
    console.log(event)
    if (videoEl && event.track.kind === 'video') {
      console.log(videoEl)
      videoEl.srcObject = event.streams[0]
    }

    if (audioEl && event.track.kind === 'audio') {
      audioEl.srcObject = event.streams[0]
      audioEl.autoplay = true
      audioEl.controls = true
    }
  })

  pc.addEventListener('iceconnectionstatechange', console.log)

  pc.addTransceiver('video', { direction: 'recvonly' })
  pc.addTransceiver('audio', { direction: 'recvonly' })

  const sendChannel = pc.createDataChannel('sendDataChannel')
  sendChannel.onopen = () => console.log('sendChannel.onopen')
  sendChannel.onmessage = () => console.log('sendChannel.onmessage')
  sendChannel.onclose = () => console.log('sendChannel.onclose')

  const getLocalDescription = async () => {
    const offer = await pc.createOffer()
    await pc.setLocalDescription(offer)

    await new Promise<void>((resolve) => {
      if (pc.iceGatheringState === 'complete') {
        resolve()
      } else {
        const checkState = () => {
          if (pc.iceGatheringState === 'complete') {
            pc.removeEventListener('icegatheringstatechange', checkState)
            resolve()
          }
        }

        pc.addEventListener('icegatheringstatechange', checkState)
      }
    })

    return pc.localDescription
  }

  const setRemoteDescription = async (answer: any) => {
    await pc.setRemoteDescription(new RTCSessionDescription(answer))
  }

  return {
    sendChannel,
    getLocalDescription,
    setRemoteDescription
  }
}
