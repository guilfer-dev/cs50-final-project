# Recommenddit
## Harvard's CS50x Final Project (community open course)
<br/>

Video Demo: https://www.youtube.com/watch?v=Jzc2T4ac6F8
<br/>
Project repository: https://github.com/guilfer-dev/cs50-final-project
<br/>
Live demo: https://guilfer-dev.github.io/cs50-final-project/
<br/>

---
## Motivation:
<br/>
When I first read about the final project I had some ideas related to fake-news, social media, ethics and content consuption.
The end result seen here is somewhat similar from what I would like to have as an alternative for the apps we already use today.
<br/>
All of them have their good and bad sides, but if as an collective poeple could vote for the most informative and well desinged content, organized by topics, maybe part of our analysis paralysis, unstoppable consumption of content curated by algorithms and fakenews, could be prevented.

<br/>

---

## Description:

<br/>

In this platform people can share youtube videos that they found interesing on especific topics, then vote and bookmark other people recommendations.
Anyone can see and filter what have been posted in the page, but only logged people can vote, bookmark or create a new recommendations.

<br/>

---

## Development details

<br/>

**All files have comments for more detailed explanation of the writen code.**

For this project I have used as tools NodeJS, ReactJS and MongoDB, all of each have very similar sintaxes and can make the developlment easier.

### **Some libraries used are:**
### Back-end
 - Express
 - Mongoose
### Front-end
 - React Router
 - React Bootstrap
### Both
 - Axios

Other libraries can be found in files named "package.json" on each folder from the root of this repository.

For both, the back and front and of the application, environment variables are used to prevent the exposition of sensitive data, such as passwords and hash phrases.


### **Design Pattern**
The design pattern chosen was MVC (Model, View and Controller), as taught during the course, because I have some familiarity using it. The main vantage I have seeen using this pattern is to locate files, that are grouped based on its porpouse.

## **Back-end development**
<br/>

### File app.js
This file is the entrance of the back-end aplication.
<br/>
It declares the routes the front-end application will relly later on to get and post data that will be displayed.
<br/>
On it we also have the start up of our connection with the database using Mongoose library and the start up of the server using ExpressJS, much similar in context to CS50's and Flask libraries in the course.

<br/>

### Controllers Folder
In this folder there is four files that are responsible for the logic upon client-side request.
- AuthController.js: Generates and provides access tokens and user data.
- CategoryController.js: Used to create new categories of topics for the app.
- RecommendationController.js: Generates, list and update the recommendation data provided by the user, validating and registering votes, bookmarks and colaborations.
- UserController.js: This controller provides the user data when they are connected, this the front-end is able to show and filter user activity, such as votes, bookmarks and their contributions.

<br/>

### Middlewares Folder
The only file in this folder is resposible for validating the token provided by the front-end application. It seats between any request that needs the user to be logged in to be used.

<br/>

### Models Folder
This folder have three files, each one describing how the documents (the equivalent of tables in SQL databases) should be generated when its use is made necessary.

<br/>

### Helpers Folder
There is only one helper in this folder, responsible for parsing the URL provided by the user. It slice the string in a way that only the "video code" from given URL is left. If the URL is invalid, it returns "false" and the back-end invalidate the user request.

<br/>

## **Front-end development**

The content from "public" folder and index.js are what is known as "boilerplate code", wich means the content of those files are not part of what have been developed, but its essencial for the code to run properly.
Almost every folder has files that separates the logic from the sytyling, "index.jsx" and "styles.css" respectively, thus, for now on I am refering as the folder as one entity for what should be displayed in fact.
<br/>
Assets folder stores two images used for the project. Both of them were obtained on the site canva.com.

<br/>

### File Router.js
This file is the entrance of the front-end aplication.
<br/>
It is responsible for loading most of the content from the back-end. It is also resposible for filtering what content should be displayed.
There are two components that should be displayed in all routes/pages and there are three routes that display other set of content.

<br/>

### Pages Folder
In this folder there are three others named folders. They are responsible for changing the content to be displayed for each route on the front-end aplication:
- Bookmarks: Shows every recommendation card that has been bookmarked by the user. 
- Contributions: Shows every recommendation created by the user.
- Main: Shows every recommendation and enables the user to create, filter, vote and bookmark recomendations made by theirselves or any other user of the platform.

<br/>

### Components Folder
In this folder there are five others named folders. Each of them are responsible for showing parts of the aplications that will be used repeated number of times.
- CardBreadCrumb: Resposible for showing on each card, what category and subcategory it belongs to.
- NavBar: The topmost element of the page. It is the same on every page regardeless of the route. For this aplication it has one of the most important roles, because the login "Profile" component and the Category filter derives from it.
- Profile: Responsible for showing the avatar of the user on the NavBar, it also show an offscreen section that let the user logs in if they are not logged yet, as well as it shows the logged user option to logg out, see their contributions or bookmarks.
- RecommendModal: Shows a form centered and focused on the page. Its responsible for creating new recommendations in the app.
- RecommendationCard: Responsible for showing recommendations that were once sent to the back-end by the RecommendModal component.

<br/>

### Service Folder
This folder have one file called "api.js", this file is responsible for simplifying the communication with the back-end and intercepts the requests to add the token to the header of each request.

<br/>

## Final Thoughts
It has been an incredible experience to make this project. All of my the decision making skills, design and creativity have been put on test, as well as all the knowledge aquired during the course.
<br/>
I can sure say that now I have another point of view on how the computer works and CS50 paved the way for me to be a better programmer.
<br/>
I am very thankful for this journey!
