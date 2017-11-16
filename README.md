# wp-docker-auto-update
VI node.js script for auto-updating WordPress core and packages on Docker projects

## Installation
1. Clone repository into /docker folder e.g. /medview.com.au/devops/docker

2. cd into the repository folder, then run 'npm install', and follow the prompts to add credentials to the generated .env file

3. run 'node index' to start the script

## Adding credentials to .env file (optional)
1. run 'docker ps', then copy the ID *or* Name of the PHP container, e.g. d8a4aaeac3f0 (ID) *or* php--medview-com-au (Name)

2. open the .env file in the parent /docker folder, and take note of the DOMAIN value e.g. DOMAIN=medview.com.au

3. Open the generated .env file (after running 'npm install') and add the following details:
	- PHP_CONTAINER=[ name/ID of the PHP container ]
	- DOMAIN=[ DOMAIN .env value ]

## Troubleshooting
* Message: */bin/bash: wp: command not found*
	* Problem: wp-cli is not installed in the PHP container. 
	* Solution: Log into the PHP container using 'docker exec -t -i [ name/id of the PHP container ] /bin/bash', follow the instructions on http://wp-cli.org/ to install wp-cli, then run the update script again.

* Message: *Error: No such container: undefined*
	* Problem: The ID or name supplied for the PHP container in the .env file is wrong/missing. 
	* Solution: Run 'docker ps', copy the ID *or* Name of the PHP container, then depending on the problem, add 'PHP_CONTAINER=[ name/ID of the PHP container ]' to the .env file, or double-check that the name/ID match the ones supplied by Docker.

* Message: *Error: Cannot find module '[ module name ]*
	* Problem: node.js modules are missing. 
	* Solution: Run 'npm install' to download all necessary modules.