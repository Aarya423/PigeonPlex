from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
import mysql.connector

#Contributors to backend - Aarya Patel and Ohm Patel

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)

# connect to the local database 
db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="password123@",
    database="PigeonPlex"
)

cursor = db.cursor()

@app.route('/homePage')
def index():
    return render_template('/homePage.html')

@app.route('/login')
def login():
    return render_template('/login.html')

@app.route('/admin')
def admin():
    return render_template('/admin.html')

@app.route('/account')
def register():
    return render_template('/account.html')

@app.route('/movie')
def movie():
    return render_template('/movie.html')

#get all info from the users table
@app.route('/users', methods=['GET'])
def get_users():
    try:
        # query the database
        query = """SELECT * FROM User;"""
        cursor.execute(query)
        
        # fetch all the results and return them
        result = cursor.fetchall()
        return jsonify(result, 200)

    except Exception as e:
        # return error message
        return jsonify({'error': str(e)}, 500)

#check whether the person is a user or admin based on their password or username
@app.route('/account/<userName>/<passWord>', methods=['GET'])
def verify_add_user(userName, passWord):
    try:
        # retrieve user information from the front end
        # data = request.get_json()
        username = userName
        password = passWord

        # query the database for the user


        # query the database for the admin
        cursor.execute("SELECT * FROM Admin WHERE username = %s AND password = %s", (username, password))
        admin = cursor.fetchone()

        cursor.execute("SELECT * FROM User WHERE username = %s AND password = %s", (username, password))
        user = cursor.fetchone()

        if admin:
            return jsonify({'id': 'admin'})
        if user:
            return jsonify({'id' : user[0]})
        else:
            return jsonify({'error': 'Invalid username or password'}), 401
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/users/getInfo/<id>', methods=['GET'])
def get_user(id):
    try:
        query = """SELECT * FROM User WHERE accountID = %s;"""
        cursor.execute(query, (id,))
        result = cursor.fetchone()
        return jsonify(result, 200)
    except Exception as e:
        # return error message
        return jsonify({'error': str(e)},500)

# update user account by name
@app.route('/users/updateInfo/<accountID>/<password>/<email>/<phoneNumber>/<cardNumber>/<cardExpiry>/<cvv>', methods=['GET'])
def update_user(accountID, password, email, phoneNumber, cardNumber, cardExpiry, cvv):
    try:

        # update user query message
        query = """UPDATE User 
        SET password = %s, contactNumber = %s, email = %s, cardNumber = %s, cardExpiry = %s, cvv = %s
        WHERE accountID = %s;"""
        values = (password, phoneNumber, email, cardNumber, cardExpiry, cvv, accountID)
        cursor.execute(query, values)

        # commit changes
        db.commit()

        # return success message
        return jsonify({"message": "User updated successfully"}, 200)
    except Exception as e:
        # handle errors
        return jsonify({"error": str(e)}, 500)

# post purchase made by user id
@app.route('/users/createUser/<username>/<password>/<fName>/<lName>/<email>/<phoneNumber>/<cardNumber>/<expiryDate>/<cvv>', methods=['GET'])
def add_user(username, password, fName, lName, email, phoneNumber, cardNumber, expiryDate, cvv):
    try:        
        # insert data into the database
        query = """INSERT INTO User (username, password, firstName, lastName, email, contactNumber, cardNumber, cardExpiry, cvv)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)"""
        values = (username, password, fName, lName, email, phoneNumber, cardNumber, expiryDate, cvv)
        cursor.execute(query, values)
        db.commit()
        return jsonify({"message": "User created Successsfully"}, 200)
    except Exception as e:
        # handle errors
        return jsonify({"error": str(e)}, 500)

# delete user account by username
@app.route('/admin/deleteUser/<ID>', methods=['GET'])
def delete_user(ID):
    try:
        query = "DELETE FROM Purchase WHERE accountID = %s;"
        cursor.execute(query, (ID,))

        # delete user query message
        query = "DELETE FROM User WHERE accountID = %s;"
        # execute query
        cursor.execute(query, (ID,))
        # commit changes
        db.commit()
        # return success message
        return jsonify({'message': 'Succesfully deleted user!'}, 200)
    except Exception as e:
        # return error message
        return jsonify({'error': str(e)}, 500)


@app.route('/movies/addMovie/<title>/<image>/<description>/<cast>/<director>/<duration>/<genre>/<ratings>/<trailer>', methods=['GET'])
def add_movie(title, image, description, cast, director, duration, genre, ratings, trailer):
    try: 
            
        # insert data into the database
        query = """INSERT INTO Movie (title, image, description, cast, director, duration, genre, ratings, trailer) 
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)"""
        values = (title, image, description, cast, director, duration, genre, ratings, trailer)
        cursor.execute(query, values)
        db.commit()
        return jsonify({"message": "Movie created successfully"}, 200)
    except Exception as e:
        # handle errors
        return jsonify({"error": str(e)}, 500)

# Define a new route that accepts a username as a parameter
@app.route('/login/check_username/<username>', methods=['GET'])
def check_username(username):
    try:
        # SQL query to check if the username exists in the User table
        query_user = "SELECT * FROM User WHERE username = %s"
        # SQL query to check if the username exists in the Admin table
        query_admin = "SELECT * FROM Admin WHERE username = %s"
        
        # Execute the first query
        cursor.execute(query_user, (username,))
        # Fetch the result
        result_user = cursor.fetchone()
        
        # Execute the second query
        cursor.execute(query_admin, (username,))
        # Fetch the result
        result_admin = cursor.fetchone()
        
        # If the username does not exist in both tables, return "username available"
        if result_user is None and result_admin is None:
            return jsonify({"message": "username available"}, 200)
        # If the username exists in either table, return "username not available"
        else:
            return jsonify({"message": "username not available"}, 200)
    # Handle any exceptions that occur during execution
    except Exception as e:
        return jsonify({"error": str(e)}, 500)

#With movieID and date from front end, add a schedule for that with 50 seats in morning, afternoon, evening. 
@app.route('/movies/addSchedule/<movieID>/<date>', methods=['GET'])
def add_schedule(movieID, date):
    try:    
        # insert data into the database
        query = """INSERT INTO Schedule (movieID, date, morning, afternoon, evening) 
        VALUES (%s, %s, 50, 50, 50)"""
        values = (movieID, date)
        cursor.execute(query, values)
        db.commit()
        return jsonify({"message": "Schedule created successfully"}, 200)
    except Exception as e:
        # handle errors
        return jsonify({"error": str(e)}, 500)

# get schedule by movie id
@app.route('/movies/schedule/<id>', methods=['GET'])
def get_schedule(id):
    try:
        query = """SELECT * FROM Schedule WHERE movieID = %s;"""
        cursor.execute(query, (id,))
        result = cursor.fetchall()
        return jsonify(result, 200)
    except Exception as e:
        # return error message
        return jsonify({'error': str(e)},500)

# with movieid and date, delete schedule
@app.route('/movies/deleteSchedule/<id>/<date>', methods=['DELETE'])
def delete_schedule(id, date):
    try:
        # delete schedule query message
        query = "DELETE FROM Schedule WHERE movieID = %s AND date = %s;"
        # execute query
        cursor.execute(query, (id, date,))
        # commit changes
        db.commit()
        # return success message
        return jsonify({'message': 'Succesfilly deleted schedule for movie!'}, 200)
    except Exception as e:
        # return error message
        return jsonify({'error': str(e)}, 500)

# remove seat after ticket purchased
@app.route('/schedule/removeSeat/<id>/<amount>/<date>/<time>', methods=['GET'])
def remove_seat(id, amount, date, time):
    try:
        # update seat query message
        if (time == 'morning'):
            query = """UPDATE Schedule
                SET morning = morning - %s/10
                WHERE movieID = %s AND date like %s;"""
        elif (time == 'afternoon'):
            query = """UPDATE Schedule
                SET afternoon = afternoon - %s/10
                WHERE movieID = %s AND date like %s;"""
        elif (time == 'evening'):
            query = """UPDATE Schedule
                SET evening = evening - %s/10
                WHERE movieID = %s AND date like %s;"""

        cursor.execute(query, (amount, id, date+'%',))
        # commit changes
        db.commit()
        # return success message
        return jsonify({"message": "Seat removed successfully"}, 200)
    except Exception as e:
        # handle errors
        return jsonify({"error": str(e)}, 500)

# add seat after ticket refunded
@app.route('/schedule/addSeat/<id>/<amount>/<date>/<time>', methods=['PUT'])
def add_seat(id, amount, date, time):
    try:
        # update seat query message
        query = """UPDATE Schedule
                SET %s = %s + %s/10
                WHERE movieID = %s AND date = %s;"""
        
        cursor.execute(query, (time, time, amount, id, date,))
        # commit changes
        db.commit()
        # return success message
        return jsonify({"message": "Seat added successfully"}, 200)
    except Exception as e:
        # handle errors
        return jsonify({"error": str(e)}, 500)

# with movie ID, get all amount of tickets sold
@app.route('/movies/ticketsSold/<movieID>', methods=['GET'])
def get_tickets_sold(movieID):
    try:
        query = """SELECT movie.title, SUM(Purchase.amount) AS total_sales FROM purchase INNER JOIN movie ON purchase.movieID = movie.movieID
        WHERE movie.movieID = %s
        GROUP BY movie.title;"""
        cursor.execute(query, (movieID, ))
        result = cursor.fetchone()
        return jsonify(result, 200)
    except Exception as e:
        # return error message
        return jsonify({'error': str(e)},500)

# with movie ID, get all users who bought tickets
@app.route('/movies/users/<movieID>', methods=['GET'])
def get_ticket_users(movieID):
    try:
        query = """SELECT DISTINCT User.username FROM User INNER JOIN Purchase ON User.accountID = Purchase.accountID
        INNER JOIN Movie ON Purchase.movieID = Movie.movieID
        WHERE Movie.MovieID = %s;"""
        cursor.execute(query, (movieID,))
        result = cursor.fetchall()
        return jsonify(result, 200)
    except Exception as e:
        # return error message
        return jsonify({'error': str(e)},500)

# get random list of 25 movies
# used in home page
@app.route('/movies', methods=['GET'])
def get_movies():
    try:
        # query the database
        query = """SELECT * FROM Movie WHERE movieID BETWEEN 1 AND 1000 ORDER BY RAND() LIMIT 25;"""
        cursor.execute(query)
        
        # fetch all the results and return them
        result = cursor.fetchall()
        return jsonify(result, 200)

    except Exception as e:
        # return error message
        return jsonify({'error': str(e)}, 500)

# delete all users who havent bought tickets in the last year
@app.route('/admin/deleteInactiveUsers', methods=['GET'])
def delete_inactive_users():
    try:
        # delete inactive users query message
        query = """DELETE FROM User 
                    WHERE accountID NOT IN (SELECT DISTINCT accountID FROM Purchase WHERE (CASE WHEN LOCATE(',', date) > 0 AND date NOT LIKE '%undefined%' 
                    THEN STR_TO_DATE(NULLIF(SUBSTRING_INDEX(SUBSTRING_INDEX(date, ',', 1), ' ', -1), ''), '%Y-%m-%d') WHEN date NOT LIKE '%undefined%' THEN STR_TO_DATE(NULLIF(SUBSTRING_INDEX(date, ' ', 1), ''), '%Y-%m-%d')
                    END IS NOT NULL AND CASE WHEN LOCATE(',', date) > 0 AND date NOT LIKE '%undefined%' THEN STR_TO_DATE(NULLIF(SUBSTRING_INDEX(SUBSTRING_INDEX(date, ',', 1), ' ', -1), ''), '%Y-%m-%d')
                    WHEN date NOT LIKE '%undefined%' THEN STR_TO_DATE(NULLIF(SUBSTRING_INDEX(date, ' ', 1), ''), '%Y-%m-%d') END >= CURDATE() - INTERVAL 1 YEAR AND date NOT LIKE '%REFUND%')
                    );"""
        # execute query
        cursor.execute(query)
        # commit changes
        db.commit()
        # return success message
        return jsonify({'message': 'Succesfilly deleted inactive users!'}, 200)
    except Exception as e:
        # return error message
        return jsonify({'error': str(e)}, 500)

# get movie by title partial search
# used in home page
@app.route('/movies/searchMovieName/<title>', methods=['GET'])
def get_movie_title(title):
    try:
        query = """SELECT movieID, title, image
                FROM Movie
                WHERE title LIKE %s AND movieID BETWEEN 1 AND 1000
                LIMIT 20;"""
        cursor.execute(query, (f'%{title}%',))
        result = cursor.fetchall()
        return jsonify(result, 200)
    except Exception as e:
        # return error message
        return jsonify({'error': str(e)},500)

# get movie info and schedule by id
@app.route('/movies/info&Schedule/<id>', methods=['GET'])
def get_movie_by_id(id):
    try:
        query = """SELECT DISTINCT Movie.*, Schedule.date, Schedule.morning, 
        Schedule.afternoon, Schedule.evening FROM Movie JOIN Schedule ON 
        Movie.movieID = Schedule.movieID WHERE Movie.movieID = %s"""        
        cursor.execute(query, (id,))
        result = cursor.fetchall()
        return jsonify(result, 200)
    except Exception as e:
        # return error message
        return jsonify({'error': str(e)},500)

# delete movie schedule
@app.route('/movies/deleteID/<id>', methods=['DELETE'])
def delete_movie_schedule(id):
    try:
        # delete movie schedule query message
        query = "DELETE FROM Schedule WHERE movieID = %s;"
        # execute query
        cursor.execute(query, (id,))
        # commit changes
        db.commit()
        # return success message
        return jsonify({'message': 'Succesfilly deleted schedule for movie!'}, 200)
    except Exception as e:
        # return error message
        return jsonify({'error': str(e)}, 500)

# increase duration for horror movie by 2 minutes
@app.route('/movies/increaseDuration', methods=['GET'])
def update_duration():
    try:
        # update duration query message
        query = """UPDATE Movie
                SET duration = CONCAT(CAST(SUBSTRING_INDEX(duration, ' ', 1) AS SIGNED) + 2, ' min')
                WHERE genre = 'Horror';"""
        # execute query
        cursor.execute(query)
        # commit changes
        db.commit()
        # return success message
        return jsonify({'message': 'Succesfilly updated duration for horror movies!'}, 200)
    except Exception as e:
        # return error message
        return jsonify({'error': str(e)}, 500)

# decrease duration for horror movie by 2 minutes
@app.route('/movies/decreaseDuration', methods=['GET'])
def delete_duration():
    try:
        # update duration query message
        query = """UPDATE Movie
                SET duration = CONCAT(CAST(SUBSTRING_INDEX(duration, ' ', 1) AS SIGNED) - 2, ' min')
                WHERE genre = 'Horror';"""
        # execute query
        cursor.execute(query)
        # commit changes
        db.commit()
        # return success message
        return jsonify({'message': 'Succesfilly updated duration for horror movies!'}, 200)
    except Exception as e:
        # return error message
        return jsonify({'error': str(e)}, 500)

# get movie info by date partial search
# used in home page
@app.route('/movies/getByDate/<date>', methods=['get'])
def get_movie_by_date(date):
    try:
        query = """SELECT Movie.movieID, Movie.title, Movie.image
                FROM Movie
                JOIN Schedule ON Movie.movieID = Schedule.movieID
                WHERE Schedule.date LIKE %s AND Movie.movieID BETWEEN 1 AND 1000
                LIMIT 20;"""
        
        # execute query
        cursor.execute(query, (f'{date}%',)) #date = YYYY-MM-DD
        result = cursor.fetchall()
        return jsonify(result)
    except Exception as e:
        # return error message
        return jsonify({'error': str(e)}, 500)

# post purchase made by user id
@app.route('/purchases/buyTicket/<id>/<movieID>/<date>/<time>/<amount>', methods=['GET'])
def add_purchase(id, movieID, date, time, amount):
    try:        
        # insert data into the database
        query = """INSERT INTO Purchase (accountID, movieID, date, movieTime, amount)
        VALUES (%s, %s, %s, %s, %s)"""
        values = (id, movieID, date, time, amount)
        cursor.execute(query, values)
        db.commit()
        return jsonify({"message": "Purchase created successfully"}, 200)
    except Exception as e:
        # handle errors
        return jsonify({"error": str(e)}, 500)

# get purchase information for user by id if not refunded
@app.route('/purchases/history/<id>', methods=['GET'])
def get_purchases(id):
    try:
        query = """SELECT purchaseID, date, amount, 
                (SELECT title FROM Movie WHERE Movie.movieID = Purchase.movieID) AS movieName
                FROM Purchase
                WHERE accountID = %s AND date NOT LIKE '%REFUND%';"""
        
        cursor.execute(query, (id,))
        result = cursor.fetchall()
        return jsonify(result, 200)
    except Exception as e:
        # return error message
        return jsonify({'error': str(e)},500)
    
@app.route('/purchases/refund/<purchaseID>', methods=['GET'])
def update_user_refund(purchaseID):
    try:
        # update user query message
        query = """UPDATE Purchase
                SET date = CONCAT(CURDATE(), ', REFUND')
                WHERE purchaseID = %s;"""
        
        cursor.execute(query, (purchaseID,))
        # commit changes
        db.commit()
        # return success message
        return jsonify({"message": "Refund successful"}, 200)
    except Exception as e:
        # handle errors
        return jsonify({"error": str(e)}, 500)

# get all refunds made by user id
@app.route('/refunds/<id>', methods=['GET'])
def get_refunds(id):
    try:
        query = """DROP VIEW IF EXISTS RefundsView;"""
        cursor.execute(query)

        query = """CREATE VIEW RefundsView AS
                SELECT purchaseID, accountID, date, amount, 
                (SELECT title FROM Movie WHERE Movie.movieID = Purchase.movieID) AS movieName
                FROM Purchase
                WHERE date LIKE '%REFUND%';"""
        
        cursor.execute(query)

        query = """SELECT * FROM RefundsView WHERE accountID = %s;"""
        cursor.execute(query, (id,))

        result = cursor.fetchall()
        return jsonify(result, 200)
    except Exception as e:
        # return error message
        return jsonify({'error': str(e)},500)

# add schedule to movie
# @app.route('/movies/schedule', methods=['POST'])
# def add_schedule2():
#     try:
#         # retrieve inforamtion from the front end
#         data = request.get_json()

#         # extract movie details
#         movieID = data.get('movieID')
#         date = data.get('date')
#         time1 = data.get('morning')
#         time2 = data.get('afternoon')
#         time3 = data.get('evening')
            
#         # insert data into the database
#         query = """INSERT INTO Schedule (movieID, date, time1, time2, time3) 
#         VALUES (%s, %s, %s, %s, %s)"""
#         values = (movieID, date, time1, time2, time3)
#         cursor.execute(query, values)
#         db.commit()
#         return jsonify({"message": "Schedule created successfully"}, 200)
#     except Exception as e:
#         # handle errors
#         return jsonify({"error": str(e)}, 500)

# With MovieID, get all dates when movie is playing
# @app.route('/movies/schedule/<id>', methods=['GET'])
# def get_movie_schedule(id):
#     try:
#         query = """SELECT movieID, date FROM Schedule WHERE movieID = %s;"""
#         cursor.execute(query, (id,))
#         result = cursor.fetchall()
#         return jsonify(result, 200)
#     except Exception as e:
#         # return error message
#         return jsonify({'error': str(e)},500)
    
@app.route('/testing/data', methods=['GET'])
def get_data():
    try:
        response = jsonify({"test" : "test"})
        response.headers.add("Access-Control-Allow-Origin", "*")
        print("Received request at /testing/data")
        data = {"message": "Hello, CORS is configured successfully!"}
        return jsonify(data)
    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == '__main__':
    app.run(debug=True)