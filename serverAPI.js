var ServerAPI = {};
//ServerAPI.transactionURL = 'http://affsoft.ca/transaction';
//ServerAPI.baseURL = 'http://affsoft.ca/api';
//test ;)
ServerAPI.xmlRequest = function(type, req, to){
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function(){
		if(this.readyState === 4 && this.status === 200){
			to(JSON.parse(this.response));
		}
	};

	xhr.open(type, ServerAPI.baseURL + req, true);
	xhr.send(null);
};
function sha256(str) {
	// We transform the string into an arraybuffer.
	var buffer = new TextEncoder("utf-8").encode(str);
	return crypto.subtle.digest("SHA-256", buffer).then(function (hash) {
		return hex(hash);
	});
}
function hex(buffer) {
	var hexCodes = [];
	var view = new DataView(buffer);
	for (var i = 0; i < view.byteLength; i += 4) {
		// Using getUint32 reduces the number of iterations needed (we process 4 bytes each time)
		var value = view.getUint32(i)
		// toString(16) will give the hex representation of the number without padding
		var stringValue = value.toString(16)
		// We use concatenation and slice for padding
		var padding = '00000000'
		var paddedValue = (padding + stringValue).slice(-padding.length)
		hexCodes.push(paddedValue);
	}
	// Join all the hex strings into one
	return hexCodes.join("");
}
sha256("foobar").then(function(digest) {
	//console.log(digest);
}); // outputs "c3ab8ff13720e8ad9047dd39466b3c8974e592c2fa383d4a3960714caef0c4f2"


ServerAPI.resizeTransaction = function(){
	window.onresize = function(){window.resize(333, 700)};
};

ServerAPI.getNumberOfActiveWallets = function(){
	var updateNum = function(data){
		document.getElementById('footerInformation').innerText =
			'The GSV coin is a cryptographically safe way to store value, with currently ' + data.num + ' active wallets.';
		data.num;
	};
	var command = '?cmd=num_active_wallets';
	//command += '&cmd=num_active_wallets';
	ServerAPI.xmlRequest('POST', command, updateNum);
};

ServerAPI.newWalletRequest = function(name, key){
	var updateNum = function(data){
		if(data.error){
			Menu.addNotif(data.error, 2);
		}
		else{
			Menu.addNotif(data.message, 2);
		}
	};
	var hash = crypto.subtle.digest(algo, buffer);
	var command = '?cmd=nn';
	command += '&n=' + name;
	command += '&a=' + key;
	ServerAPI.xmlRequest('POST', command, updateNum);
};

ServerAPI.openTransactionWindow = function(){
	var w = window.open(ServerAPI.transactionURL, "", "width=333, height=700");
};

ServerAPI.sendTransaction = function(){
	document.getElementById('footerInformation').innerText
};

ServerAPI.goToWallet = function(){
	ServerAPI.openTransactionWindow();
};

ServerAPI.goToTech = function(){
	ServerAPI.newWalletRequest('tester', '123');
};

ServerAPI.goToTeam = function(){

};
