# ALOHA

This is an attendance tracking website which uses face recognition for entry and exit of employees in an office. 
This website let employees register themselves with their details along with two photographs. 
After getting approved from the admin, they can use face-recognition for entry and exit in the office. 
The employees can also login to view their profile and attendance statistics for the last 6 days.✨

## Setting up this project

### BACKEND
Backend - Django REST framework
- Make sure `python3.8` and `pip` are installed. Install `pipenv` by running `pip install pipenv`.
- Make sure Pillow is installed. Run command `pip install pillow`.
- Install python dependencies using the command `pipenv install` in the backend folder.
- To activate this project's virtualenv, run `pipenv shell`.
- Move to backendapi folder `cd backendapi`.
- Run `python manage.py makemigrations` to identify the changes you have made to the database model.
- Run `python manage.py migrate` to apply migrations.
- Start the development server using `python manage.py runserver`.

### FRONTEND
Frontend - React
- Move to frontendapp folder `cd frontendapp`.
- Install the dependencies using `npm install`.
- Run the server using `npm start`.
