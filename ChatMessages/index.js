'use strict';   // dont touch
this.command = []; // dont touch
this.commandName = []; // dont touch
this.gamemodeId = []; // dont touch
this.gamemode = []; // dont touch
this.addToHelp = []; // dont touch

// [General]
this.name = "ChatMessages"; // Name of plugin REQUIRED
this.author = "LegitSoulja"; // author REQUIRED
this.description = 'Periodic Chat Messages'; // Desciprtion
this.compatVersion = ''; // compatable with (optional)
this.version = '1.0.0'; // version REQUIRED

// INSERT PLUGIN BELOW
this.config = {
	messageInterval: 60, // seconds 60 - 1 minute
}

this.configfile = "config.ini";

// [Functions]
this.init = function (gameServer, config) {
	this.gameServer = gameServer;
	this.config = config;
	
	// clear recent intervals
	if(typeof(gameServer.chatInterval) != "undefined"){
		clearInterval(gameServer.chatInterval);
	}
	
	// public
	gameServer.chatInterval;
	
	// start on fully load
	var to = setTimeout(function(){
		// try
		try{
			
			// load json
			var messages = require(__dirname + "/messages.json");
			
			// count messages
			var count = 0;
			for(var a in messages.messages){
				count++;
			}
			console.log("[ChatMessages] Loaded " + count + " Messages.");
			// start interval
			startMessaging(gameServer, config, messages, count);
		}catch(e){
			
			// error handler
			console.log("[ChatMessages] " + e);
			return;
		}
	}, 5000);
};
var startMessaging = function(gameServer, config, messages, msgcount){
	// set messages length
	var count = parseInt(msgcount);
	
	// start interval
	gameServer.chatInterval = setInterval(function(){
		
		// get random message
		var randomMsg = Math.floor((Math.random() * count) + 0);
		
		// I couldnt figure out how to get the message, instead of an object so im doing it this way instead..
		var con = JSON.stringify(messages.messages[randomMsg]);
		var conr = con.replace("{", "").replace("}", "").replace(/"/g, "");
		var msg = conr.split(':');
		
		// send message
		var sendmsg = [];
		sendmsg[1] = "all";
		sendmsg[2] = msg[1];
		gameServer.consoleService.execCommand("chat", sendmsg);
	}, parseInt(config.messageInterval) * 1000); // seconds
}
module.exports = this; // dont touch
