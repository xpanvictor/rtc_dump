
let localVideoElement
let remoteVideoElement

function handleRTC() {
	// first get the media
	navigator.getUserMedia({video: true, audio: true}, 
	function (stream) {
		localVideoElement.src = window.URL.createObjectURL(stream)
		// start rtc connection
		handleRTCConnection(stream)
	},
	function (error) {
		console.log(error)
	})
}


function handleRTCConnection(stream) {
	// make config object
	const config = {"iceServers": []}
	// create rtc connections 
	const localInstance = new RTCPeerConnection(config)
	const remoteInstance = new RTCPeerConnection(config)

	// handle ICE event
	localInstance.onicecandidate = function(event) {
		if (event.candidate) {
			remoteInstance.addIceCandidate(new RTCIceCandidate(event.candidate))	
		}
	}

	remoteInstance.onicecandidate = function(event) {
		if (event.candidate){
			remoteInstance.addIceCandidate(new RTCIceCandidate(event.candidate))
		}
	}
	
	// handle offer-response
	localInstance.createOffer(function (offer) {
		localInstance.setLocalDescription(offer)
		remoteInstance.setRemoteDescription(offer)

		remoteInstance.createAnswer(offer) {
			localInstance.setRemoteDescription(offer)
			remoteInstance.setLocalDescription(offer)
		}
	})
	
	// handle streams
	localInstance.addStream(stream)
	remoteInstance.onaddstream(function(event){
		remoteVideoElement.src = window.URL.createObjectURL(event.stream)
	})
}
