# Driver-App-Mongoose-Node
Creating a simplified version of the Driver-side backend for an Uber/Lyft like application
(test no longer works with master branch, for testing use Branch_1)

Back-end has been implemented

Implemented : 

Driver can look for potential riders nearby. 

Once a driver picks up a rider, he starts the trip.
Once a trip is ongoing other pickups are prohibited.

Driver ends the trip and the fare is calculated automatically.

Other implementations : 
Create a Driver 
(POST Request is getting handled, no form yet, request has to be sent explicitly (I used Postman))
Remove a Driver 
(DELETE Request getting handled, request has to be sent explicitly with the id. No UI yet)
Edit a Driver (go offline/online) 
(same, no UI yet, explicit request must be sent)

Future Implementations : 

UI improvements 
Chat Feature between rider and driver
Interface for customer is halfway done.
