'use strict';

const dotenv = require('dotenv/config'),
    colors = require('colors'),
    container_id = process.env.PHP_CONTAINER,
    site_id = process.env.DOMAIN,
    execs = require('child_process').execSync;

console.log('Running update script'.yellow);

//Check for core updates
console.log('Step 1: Checking for core updates...'.yellow);
execs('docker exec -t -i ' + container_id + ' /bin/bash -c "cd ../vhosts/' + site_id + '/public && wp core update --allow-root"', { stdio:'inherit' });

//Check for plugin updates
console.log('Step 2: Checking for plugin updates...'.yellow);
execs('docker exec -t -i ' + container_id + ' /bin/bash -c "cd ../vhosts/' + site_id + '/public && wp plugin update --all --allow-root"', { stdio:'inherit' });

console.log('Updates have been completed.'.yellow);