# PoGoTaskMap

This repo contains the server-side code for PoGoTaskMap.

For the client-side code of this project: [https://github.com/joechesney/PoGoTaskMap-Client](https://github.com/joechesney/PoGoTaskMap-Client)

Please refer to the previous link for a project description, documentation, usage, and client-side code.

# PoGoTaskMap Server

The server for PoGoTaskMap is set up with several endpoints and a MySQL database.

This server is not an exposed API. Rather, it is a custom-built server specifically for this project.

## Endpoints

### /getPokestops (GET)
  **Currently**: This returns an array with all the pokestops in the entire database. Pokestop objects will have todays current tasks already attached to them. This endpoint is called automatically on page load.
  **Future**: This will return only Pokestops that can be displayed in the users current view, and will be called on every zoom/scroll.

### /rewardSearch (GET)
  **Currently**: This returns an array of all the pokestops but only attaches todays task to its corresponding pokestop if its task reward matches the string searched by the user. This endpoint is only called when the user types in a query to the search input, and submits it.
  **Future**: Potentially only show pokestops that have those queried tasks.

### /addNewPokestop (POST)
  **Currently**: Sends a user-submitted object containing the name of a pokestop and the lat/long of that pokestop. it also submits the current date and time. Posted into the MySQL database and sends back status code.
  **Future**: Once all pokestops in the available map have been submitted, I could remove this form and endpoint. Also, if I ever implement authentication, I should require authentication for all pokestop submissions, in order to hold users responsible if there are inappropriate submissions.

### /addTask/:id (POST)
  **Currently**: Receives a user-submitted object with the pokestop id and the task requirements and task reward. Submits directly to the MySQL database and sends back status code.
  **Future**: Same required authentication as pokestop submission.

### /changeRequest (POST)
  **Currently**: Sends an email directly to my gmail account with the users email address, and the message they type into the form. Sends back status code.
  **Future**: Possible authentication requirement for submitting change requests.