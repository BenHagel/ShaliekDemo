var Menu = {};

Menu.divs = [
	'homescreen', 'projectsscreen', 'resumescreen',
	'comedyscreen', 'contactscreen'
];

Menu.phrases = [];
Menu.homephrases = [
	'Whoa hey! haha you must be new around here - let me show u around??',
	'Yea ive been workin on some new stufff',
	'Ive been busy recently - so I may not respond right awayy',
	'Cmon click around, man - only good stuff here :))'
];
Menu.contactphrases = ['Contact screen, my mann'];

Menu.phraseIndex = 0;
Menu.currentChar = 0;

Menu.phraseTick = 0;
Menu.hangTime = 70;
//Notificatoins
Menu.notifQueue = [];

Menu.hideAllDivs = function(){
	for(var tt = 0;tt < Menu.divs.length;tt++)
		document.getElementById(Menu.divs[tt]).classList.add('hidden');
};

Menu.tickPhrases = function(){
	Menu.phraseTick++;

	//Std looper
	if(Menu.currentChar < Menu.phrases[Menu.phraseIndex].length-1){
		Menu.currentChar++;
	}
	else{
		Menu.currentChar = Menu.phrases[Menu.phraseIndex].length - 1;
		Menu.hangTime--;
	}

	//Switcher
	if(Menu.hangTime < 1){
		Menu.hangTime = 70;
		Menu.currentChar = 0;
		Menu.phraseIndex = (Menu.phraseIndex + 1) % Menu.phrases.length;
	}

	document.getElementById('speechBubble').innerHTML = '' + Menu.phrases[Menu.phraseIndex].substring(0, Menu.currentChar);

	setTimeout(Menu.tickPhrases, 80);
};
Menu.onLoad = function(){
	console.log('startup...');
	Menu.phrases = Menu.homephrases;
	setTimeout(Menu.tickPhrases, 500);
};




//Different screens
Menu.goToProjectsPage = function(){
	Menu.hideAllDivs();
	document.getElementById('projectsscreen').classList.remove('hidden');
};
Menu.goToResumePage = function(){
	Menu.hideAllDivs();
	document.getElementById('resumescreen').classList.remove('hidden');
};
Menu.goToComedyPage = function(){
	Menu.hideAllDivs();
	document.getElementById('comedyscreen').classList.remove('hidden');
};
Menu.goToContactsPage = function(){
	Menu.hideAllDivs();
	document.getElementById('contactscreen').classList.remove('hidden');
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
