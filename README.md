[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/fv2McSSv)
# SE3309_Assignment3_2022

This repo will contain the data source for your project and the sql files for each questions.

The SRC folder should have the data files you used as well as any script you used to load the data within the database and any code used to generate the data. If you used excel spreadsheets, include these as well.

The SQL Folder should include all the required SQL files for each of the questions.

The DUMP folder should contain an exported copy of your database.


# NOTES FROM TEAM 10
To run you just need to install libraries required.

To run back end:
ONCE in Server folder:
  Install virtualenv (if you haven't already)
  pip install virtualenv
  Everytime:
    virtualenv venv
  
    On windows
    .\venv\Scripts\activate
    
    On macOS/Linux
      source venv/bin/activate 
    
    then do "python index.py" after you go into the right directory

To run front end:
  Everytime in the client folder:
    http-server -p 5000
