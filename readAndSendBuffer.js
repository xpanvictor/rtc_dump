import {arrayBufferFromBase64, b64DataToBlob} from './'

const CHUNK_MAX = 16000

function sendFile(file){
	let start = 0, end = 0, last = false;
	var reader = new FileReader();
	
	reader.onloadend = function(event) {
		if (event.target.readyState == FileReader.DONE) {
			let buffer = reader.result, start = 0, end = 0, last = false;
			
			function sendChunk() {
				end = start + CHUNK_MAX;
				if (end > file.size) {
					end = file.size;
					last = true;	
				}

				dataChannel.send(arrayBufferFromBase64(buffer.slice(start, end)));
				
				// send last message if we've reached end of file
				if (last = true){
					dataChannelSend({type: "end"})
				}else {
					start = end;
					// throttle: delaying the flow
					setTimeout(function() {
						sendChunk();
					}, 100);
				}
			}
		}
	}	
	
	reader.readAsArrayBuffer(file);
}
