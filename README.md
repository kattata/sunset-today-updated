# Sunset Today
- Personal project
- A web app, which allows you to check how much time is left until the today's sunset. It adjusts to the timezone of the search, meaning you'll always see the correct countdown
- Stack: React, SCSS, Moment.js
- APIs
  - IP Geolocation Astronomy - fetches sunset time and coordinates of the queried location
  - Timezone DB - fetches the local time of the queried location
  - Unsplash - fetches random images related to the query (used for the background, which changes on refresh)

## [View project](https://sunset-today.netlify.app/)
*In order to run the app correctly, it's necessary to enable 'insecure content' in Google Chrome. This is due to mixed content (one of the APIs)*

![Webp net-resizeimage (2)](https://user-images.githubusercontent.com/55578863/139928311-96c34778-77f1-4a4b-ae95-b2c98e7d85e3.png)

## Code breakdown
1. Save the query (city) in a useState hook
2. Fetch the sunset time as well as geographical coordinates of the location
3. Use the longitude and latitude to fetch the local time of the location
4. When the sunset time is set, start running an interval which updates the countdown
    + Substract the time of the "local now" from the sunset in miliseconds (both the day and the time need to be fetched from the API since it may vary due to the timezone differences - in some cases the sunset is "tomorrow" from our perspective)
    + Convert the difference into hours, minutes and seconds in a correct double-digit format
5. Fetch a an image with a query of 'sunset' from Unsplash API and display it as the background each time the location page is rendered

## To do
- Add more information about the queried location (map, description, etc.) to confirm that the API grabbed the correct place
- Fix the loader - after resubmitting you can see the previous countdown for a second
- Fix refresh - after refreshing the location page, the data disappears
