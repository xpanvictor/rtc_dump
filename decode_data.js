function b64ToBlob(b64Data, contentType) {
	contentType = contentType || ''
	
	let byteArrays = [], byteNumbers, slice;
	for (let i = 0; i < b64Data.length; i++){
		slice = b64Data[i];
		byteNUmbers = new Array(slice.length);
		for (let n = 0; n < slice.length; n++) {
			bytesNumber[n] = slice.charCodeAt(n);
		}
		
		let byteArray = new Uint8Array(byteNumbers);
		byteArrays.push(byteArray); 
	}
	
	var blob = new Blob(byteArrays, {type: contentType});
	return blob;
}
