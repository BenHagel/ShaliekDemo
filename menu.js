var Menu = {};

Menu.divs = [
	'homescreen', 'walletscreen', 'techscreen',
	'whitepaperscreen', 'teamscreen'
];

Menu.phrases = [
	'Yooo, welcome to my place',
	'Yea ive been workin on some stuff',
	'Reach out to me here, man',
	'You cant get fid of the Pee Pee Poo Poo man'
];
//Notificatoins
Menu.notifQueue = [];

Menu.hideAllDivs = function(){
	for(var tt = 0;tt < Menu.divs.length;tt++)
		document.getElementById(Menu.divs[tt]).classList.add('hidden');
};

//On startup
Menu.onLoad = function(){

	setTimeout(Menu.tickPhrases, 500);
};
Menu.tickPhrases = function(){
	

	setTimeout(Menu.tickPhrases, 40);
};


Menu.notifTicker = function(){
	if(Menu.notifQueue.length > 0){//Make sure there is atleast one notif in the queue
		//If active
		if(Menu.notifQueue[0].active){
			Menu.notifQueue[0].time--;
			if(Menu.notifQueue[0].time < 0){//notif has no died (remove)
				Menu.notifQueue.shift();
				//Remove notif tag
				document.getElementById('notifArea').remove();
			}
		}
		else{
			//Make next message active
			Menu.notifQueue[0].active = true;
			var bodyTag = document.getElementsByTagName('BODY')[0];
			var notifTagElement = document.createElement('div');
			notifTagElement.setAttribute('id', 'notifArea');
			notifTagElement.classList.add("deposit-contents");
			notifTagElement.innerHTML = Menu.notifQueue[0].body;
			bodyTag.appendChild(notifTagElement);
		}
	}
	setTimeout(Menu.notifTicker, 1000);
};

Menu.addNotif = function(htmlMessage, lifeSpanInSeconds){
	//htmlMessage = {'body': 'Stop mining for Skypool...', 'time': 4} //4 seconds
	Menu.notifQueue.push({
		'body': htmlMessage,
		'time': lifeSpanInSeconds,
		'active': false
	});
};

Menu.goToAboutScreen = function(){
	ServerAPI.loadAboutPage();
	Menu.hideAllDivs();
	document.getElementById('aboutscreen').classList.remove('hidden');
};
