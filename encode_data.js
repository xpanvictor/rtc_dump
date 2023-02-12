function arrayBufferToBase64(buffer){
	var binary = '';
	var bytes = new Uint8Array(buffer);
	const bytesLen = bytes.byteLength
	for (let i = 0; i < bytesLen; i++){
		binary += String.fromCharCode(bytes[i]);
	}
	return btoa(binary);
}
