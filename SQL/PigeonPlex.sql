-- --------------------------------------------------------QUESTION 2----------------------------------------------------------

-- Create a new database
CREATE DATABASE PigeonPlex;

-- Use the created database
USE PigeonPlex;

-- Create User table
CREATE TABLE User (
    accountID INT AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(50) NOT NULL,
    firstName VARCHAR(50),
    lastName VARCHAR(50),
    email VARCHAR(100),
    contactNumber VARCHAR(15),
    cardNumber VARCHAR(20),
    cardExpiry VARCHAR(20),
    cvv VARCHAR(5),
    PRIMARY KEY (accountID)
);

-- Create Admin table
CREATE TABLE Admin (
    accountID INT AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(50) NOT NULL,
    email VARCHAR(50),
    firstName VARCHAR(50),
    lastName VARCHAR(50),
    PRIMARY KEY (accountID)
);

-- Create Movie table
CREATE TABLE Movie (
    movieID INT AUTO_INCREMENT,
    title VARCHAR(100),
    image VARCHAR(255),
    description TEXT,
    cast TEXT,
    director VARCHAR(100),
    duration VARCHAR(20),
    genre VARCHAR(50),
    ratings INT,
    trailer VARCHAR(255),
    PRIMARY KEY (movieID)
);

-- Create Purchase table
CREATE TABLE Purchase (
    purchaseID INT AUTO_INCREMENT,
    accountID INT,
    movieID INT,
    date VARCHAR(50),
    movieTime VARCHAR(30),
    amount DECIMAL(20, 2),
    PRIMARY KEY (purchaseID),
    FOREIGN KEY (accountID) REFERENCES User(accountID),
    FOREIGN KEY (movieID) REFERENCES Movie(movieID)
);

-- Create Schedule table
CREATE TABLE Schedule (
    movieID INT,
    date VARCHAR(50),
    morning INT,
    afternoon INT,
    evening INT,
    PRIMARY KEY (movieID, date),
    FOREIGN KEY (movieID) REFERENCES Movie(movieID)
);


-- --------------------------------------------------------QUESTION 3----------------------------------------------------------

-- Simple INSERT Command:
-- Inserting a user into the User table
INSERT INTO User (username, password, firstName, lastName, email, contactNumber, cardNumber, cardExpiry, cvv)
VALUES ('john_doe', 'password123', 'John', 'Doe', 'john@example.com', '+1234567890', '1234567890123456', '2023-12-31', 123);

-- View the Result:
SELECT * FROM User;

-- Insert using a subquery
-- Inserting an admin into the Admin table with a subquery
INSERT INTO Admin (username, password, firstName, lastName)
SELECT username, password, firstName, lastName
FROM User
WHERE accountID = 1;  -- Here, use the appropriate condition to select the desired admin user

-- View the Result:
SELECT * FROM Admin;

-- Insert using a subquery
-- Inserting an admin into the Admin table with a subquery
INSERT INTO Admin (username, password, firstName, lastName)
SELECT username, password, firstName, lastName
FROM User
WHERE accountID = 1;  -- Here, use the appropriate condition to select the desired admin user

-- View the Result:
SELECT * FROM Admin;

-- --------------------------------------------------------QUESTION 4----------------------------------------------------------

-- Related Data in the SRC Python FIle: UpdateDatabase.py

-- --------------------------------------------------------QUESTION 5----------------------------------------------------------

-- QUERY 1
-- Obtain all seats availabe for a particular movie on a particular date
SELECT morning, afternoon, evening, (morning + afternoon + evening) AS total_available_seats
FROM Schedule
WHERE movieID = 1 AND date LIKE '2023-11-27%' -- Replace ? with the movieID and date (date format: "YYYY-MM-DD%")
ORDER BY total_available_seats DESC;

-- QUERY 2
-- Obtain all purchases made by a particular user 
SELECT title, image, description, cast, director, duration, genre, ratings, trailer, date, movieTime, amount
FROM Movie
INNER JOIN Purchase
ON Movie.movieID = Purchase.movieID
WHERE accountID = (SELECT accountID FROM User WHERE username = 'chamar93');  -- Replace ? with the "username"

-- QUERY 3
-- Obtain refund data for a particular purchase (Question mark is dynamic value inserted by user in front end)
SELECT accountID, date, movieTime, amount FROM purchase
WHERE purchaseID = 1; -- Replace ? with the purchaseID

-- QUERY 4
-- Obtain the total sales for a movies whose title contains a particular keyword
SELECT movie.title, SUM(Purchase.amount) AS total_sales
FROM purchase
INNER JOIN movie ON purchase.movieID = movie.movieID
WHERE movie.title LIKE '%endgame%' -- Replace ? with the movie title keyword
GROUP BY movie.title;

-- QUERY 5
-- Obtain the list of users who have purchased tickets for a particular movies whose title contains a particular keyword
SELECT DISTINCT User.username 
FROM User
INNER JOIN Purchase ON User.accountID = Purchase.accountID
INNER JOIN Movie ON Purchase.movieID = Movie.movieID
WHERE Movie.title LIKE '%endgame%'; -- Replace ? with the partial movie title

-- QUERY 6
-- Obtain the list of movies where the rating are ordered in descending order
SELECT * FROM Movie
ORDER BY ratings DESC;

-- QUERY 7
-- Obtain 20 random movies
SELECT * FROM Movie
ORDER BY RAND()
LIMIT 20;


-- -------------------------------------------------------QUESTION 6---------------------------------------------------------

-- MODIFICATION 1
-- Delete users who have not made any purchases in the last year
DELETE FROM User
WHERE accountID NOT IN (
    SELECT DISTINCT accountID
    FROM Purchase
    WHERE date >= CURDATE() - INTERVAL 1 YEAR
);

-- MODIFICATION 2
-- Insert a new movie into the movie table with ratings set to the maximum ratings of all movies
INSERT INTO Movie (title, image, description, cast, director, duration, genre, ratings, trailer)
VALUES ('Team 10', 'team10.png', 'Team 10s progress through assignment 3', 'Sridhar, Ohm, Jeffano, Aaryakumar', 'TA', '180', 'Drama', (SELECT MAX(ratings) FROM (SELECT * FROM Movie) AS temp), 'www.youtube.com/Team10'); -- Replace ? with the appropriate values

-- MODIFICATION 3
-- Update the ratings for all movies of a particular genre
UPDATE Movie
SET ratings = ratings + 1
WHERE genre = 'Drama';```