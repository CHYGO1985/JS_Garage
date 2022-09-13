## command to run clinic.js and autocannon
clinic doctor --on-port 'autocannon -w 300 -c 100 -d 20 localhost:3000' -- node global-resource-memleak.js 