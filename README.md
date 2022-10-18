# Homemade-Hacks

This is a site for users to create and view household tips and tricks using: Python, Flask, React.js, and Material UI

For my individual capstone project, I wanted to create a site where users could share natural, cost-effective household hacks they may have grown up with that is unheard of by others. If we all share those little gems we know, we can work together to make each other's lives a little easier.

This project utilizes webpack to foster communication between a Python backend and a React front end. I specifically chose to push myself to mix the stacks I worked with in my bootcamp, understanding that most companies will not follow the standard tech stacks we are taught. One particular challenge I overcame was adding dynamic fields for supplies and instructions to then be saved as a single field in the MySQL backend when creating a hack.

In the future, I would like to add a rating system so the top rated hacks that users find most helpful will float to the top of category lists. Currently lists are organized in alphabetical order.

## Instructions To Run Homemade Hacks

1. Run `python server.py` to run the server side.
2. Navigate to the client folder inside the flask_app folder and run `npm run wpack` to run the client side.
