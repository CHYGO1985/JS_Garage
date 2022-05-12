# Project Introduction
The project is to provide a quick notes system where registered user can post and see notes. Main functions:
* user registered: username and password
* user login
* post notes: title and contents
* REST API for get notes of a give user
* REST API of get a user profile via ID
* REST API for get notes of a certain page (pagination) of a give user

---

# Tech Stack
1) storage: redis
2) server framework: Express
3) front end: EJS
4) logging: winston and morgan 

---

# Further work:

## Infrastructure
1) add unit tests and integration tests
unit tests: mocha + chai / assume
integration test? TBD
2) add CI/CD


6) data persistence
### Log
1) add log DB persistence and visualisation
2) log rotate
 
   * Save log in a rotate manner (avoid saving all logs in one file)
   * Auto generate log file for every 1 day and save it with auto generate file name like: YYYY_MM_DD_(error/combined).log

## Site function
1) Add search function
   
   * Search notes via keywords (search username or notes contents)

2) Post Notes
   
   * Add post photos (Need to save photos)
   * Add post external links (can directly click on it)
3) Login 

   * add logging via twitter / facebook / gmail
4) Register

   * Add more user infor question

      * password double check
      * email address
      * password safe question 
5) Add Two Factors Auth??