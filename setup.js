'use strict';

var fs = require('fs'),
colors = require('colors'),
execs = require('child_process').execSync,
domain = 'DOMAIN=',
containers = '';

setup();

function setup(){

	//Look for .env file in parent directory
	try {
		var parent_env = fs.readFileSync('../.env', "UTF-8");
		var lines = parent_env.split('\n');
	    for(var line = 0; line < lines.length; line++){
	        if(lines[line].indexOf('DOMAIN=') !== -1){
	            domain = lines[line];
			}
	    }
	    console.log('Domain found in parent .env file: ' + domain + '\n');

	} catch (err) {
		console.log('Error encountered, no DOMAIN var added to .env file. \n');
	}

	//Get name of container that contains "php" in the name
	containers = execs('docker ps --filter "name=php" --format "{{.Names}}"');

	//If no container found, ask user to fill .env file manually
	if(containers == ''){
		console.log('No PHP container found. Please enter project credentials into the .env file.');
		createEnv(domain);
	}
	else{
		console.log('PHP container found: ' + containers);
		console.log('Is this the correct PHP container for this project? ');

		//Use user input to add/reject current Docker container
		process.stdin.on('data', function(data){
			var answer = data.toString().trim();
			if(answer == 'y' || answer == 'yes'){
				console.log(containers.toString().trim() + ' will be added to .env file.');
				createEnv(domain, containers.toString().trim());
			}
			else{
				console.log(containers.toString().trim() + ' has not been added to .env file. Please enter project credentials manually.');
				createEnv(domain);
			}
		});
	}
}

function createEnv(domain, container_name = ''){
	fs.writeFileSync(".env", "#Docker credentials\n" + domain + "\nPHP_CONTAINER=" + container_name,function(err) {
	    if(err) {
	        return console.log(err);
	    }
	    console.log(".env file created.");
    });
    process.exit();
}
