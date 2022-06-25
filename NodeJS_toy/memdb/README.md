# The project
The project is to demo using _mocha_ for unit test. 

The proj store data via memory db, then test the dao method in unit tests.

# Run the app
run "npm run test"

should see the following:
```properties
> memdb@1.0.0 test
> mocha



  memdb
    .saveSync(doc)
      ✔ should have the document
    .first(obj)
      ✔ should return the first matching doc
      ✔ should return null when no doc matches
    asyncronous .saved(doc)
      ✔ should save the document (1017ms)


  4 passing (1s)
```