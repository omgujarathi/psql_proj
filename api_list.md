# psql playground

# /question/:questionId
- get
  - Fetch questions details for questionId
  - response
  ``` json
  {
    {"id":2,"userid":2,"description":"query1","q_ans":"SELECT *","database_link":"aaa","is_verified":1,"username":"abc","firstname":"omg","lastname":"ggg"}
  }```
  ​
# /question
- post
  - add question to db
  - request
  ``` json
  {
    "userId":4,"description":" select all rows","q_ans":" select *"
  }
  ```
  - response
  ``` json
  {
    "status" : 201
  }
  ```

# /verified-questions?limit=10
- get
  - get all verified questions
  - response
  ``` json
  {
    [{"id":2,"description":"query1"},{"id":3,"description":"query2"},{"id":4,"description":"this is question no 3"},{"id":5,"description":"this is question no 4"},{"id":8,"description":"this is question no 7"},{"id":6,"description":"this is question no 5 new"}]
  }
  ```
​
# /my-questions?userId=5
​
- get
  - get all user question with user id
  - response
  ``` json
  {
    [{"id":5,"userid":4,"description":"this is question no 4","q_ans":"SELECT * from noovosoft where id=uid","database_link":"www.google.com","is_verified":1,"admin_comment":""},
    {"id":10,"userid":4,"description":"this is question no 6","q_ans":"SELECT * from all users6","database_link":"www.google.com","is_verified":0,"admin_comment":""},
    {"id":13,"userid":4,"description":"this is question no 9","q_ans":"SELECT * from all users9","database_link":"www.google.com","is_verified":0,"admin_comment":""},
    {"id":11,"userid":4,"description":"this is question no 70","q_ans":"SELECT * from all users77","database_link":"www.google.com","is_verified":0,"admin_comment":""},
    {"id":9,"userid":4,"description":"this is question no 555","q_ans":"SELECT * from table where all=id","database_link":"www.google.com","is_verified":0,"admin_comment":""},
    {"id":14,"userid":4,"description":" aaaaa","q_ans":" aa","database_link":"google","is_verified":0,"admin_comment":null},
    {"id":15,"userid":4,"description":" insert into page ","q_ans":" insert into table","database_link":"google","is_verified":0,"admin_comment":null},
    {"id":16,"userid":4,"description":"insert into page ","q_ans":"insert into table","database_link":"google","is_verified":0,"admin_comment":null},
    {"id":12,"userid":4,"description":"this is question no 80","q_ans":"SELECT * from all users888","database_link":"www.google.com","is_verified":0,"admin_comment":""},
    {"id":17,"userid":4,"description":" new question 000","q_ans":" select","database_link":"google","is_verified":0,"admin_comment":null},
    {"id":18,"userid":4,"description":" select all rows","q_ans":" select *","database_link":"google","is_verified":0,"admin_comment":null}]
  }
  ```
​
# booking
# 1e223/pune/booking_options
- get
  - get all booking option and theater info for city pune and movie id=1e223
  - response
  ``` json
  {
   [{"theator_name": "city pride1", "location" : "baner", "timings" : ["11.00am","01.00pm","05.00pm","06.00pm","08.00pm","11.00pm"]},
   {"theator_name": "city pride2", "location" : "baner2", "timings" : ["11.00am","01.00pm","05.00pm","06.00pm","08.00pm","11.00pm"]},
   {"theator_name": "city pride3", "location" : "baner3", "timings" : ["11.00am","01.00pm","05.00pm","06.00pm","08.00pm","11.00pm"]},
   {"theator_name": "city pride4", "location" : "baner4", "timings" : ["11.00am","01.00pm","05.00pm","06.00pm","08.00pm","11.00pm"]},
   {"theator_name": "city pride5", "location" : "baner5", "timings" : ["11.00am","01.00pm","05.00pm","06.00pm","08.00pm","11.00pm"]},
   ]
  }```
- post 
  - book a movie. add userinfo and booking details.  
  - request
  ``` json
  {
    "movie_id":10011,"person name" : "abc","seatNo": "22d","user_id":111,"theater_id":1131
  }
  - response
  ``` json
  {
    "status":201
  }```
​
# /bookings/11111
​
- get
  - get booking details for booking id = 11111.
  - response
  ``` json
  {
    "movie_id":11111,"person name" : "abc","seatNo": "22d","user_id":111,"theater_id":1131
  }```
- delete
  - delete booking for booking id = 11111.
  - request
  ``` json
  {
    "bookingId":10011
  }
  - response
  ``` json
  {
    "status": "not found"
  }