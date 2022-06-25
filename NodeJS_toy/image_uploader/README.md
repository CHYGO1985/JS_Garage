# The project
The project implement uploading image to server side and update:
* image shown on the page
* image name in the db
* add image to server side disk

# Instruction regarding how to run the app
## Launch Mysql
* Mac: run sudo /usr/local/mysql/support-files/mysql.server start (my case)
* Launch MySQLWorkbench and connect to localhost:3306
Should be able to see a theme userprofile with [id, nanme, profile_image, job_title, description]
* run 
```base
npm run dev
```
wait until see the following on terminal
```terminal
jingjiejiang@Jingjies-MacBook-Air image_uploader % npm run dev

> image-uploader@0.0.0 dev
> nodemon ./bin/www

[nodemon] 2.0.16
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,json
[nodemon] starting `node ./bin/www`
Connected!
```
* Then the site is running: check localhost:3000
Upload a image, then the click "submit":
    * The image will be uploaded to ./upload
    * The profile photo on the page will be updated
    * The _profile_image_ in db is updated.



