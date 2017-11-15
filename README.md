# wp-docker-auto-update
VI node.js script for auto-updating WordPress core and packages on Docker projects

1. Clone repository into /docker folder e.g. /medview.com.au/devops/docker

2. run 'npm install'

3. run 'docker ps', then copy the ID *or* Name of the PHP container, e.g. d8a4aaeac3f0 (ID) *or* php--medview-com-au (Name)

3. Open existing .env file and add the following variable:
	- PHP_CONTAINER=[ name/ID of the PHP container ]

4. run 'node index'

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