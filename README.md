# Can I go look at a tree?

Can I go look at a tree? was a Mod 3 solo project in the Front End program at the [Turing School of Software and Design](https://turing.io/). The assignment was to build out a multi-page application using [React](https://reactjs.org/), [Router](https://reactrouter.com/), [Cypress](https://www.cypress.io/) and [PropTypes](https://reactjs.org/docs/typechecking-with-proptypes.html) to create a product which helps a niche audience solve a unique problem.

The project spec can be found [here](https://frontend.turing.edu/projects/module-3/niche-audience.html).

The project is deployed [here](https://alexmkio.github.io/can-i/).

## Install

1. Clone down this repository `git clone https://github.com/alexmkio/can-i`
2. CD into your local clone `cd can-i`
3. Install project dependencies `npm install`
4. Run `npm start`
5. Open `http://localhost:3000/` in your preferred browser

## Features

![Gif of the homepage, search functionality, and results page](./src/assets/readme01.gif)
* Gif of the homepage, search functionality, and results page

![Gif showing the ability to add and remove an hour to your calendar from the suitable hours page](./src/assets/readme02.gif)
* Gif showing the ability to add and remove an hour to your calendar from the suitable hours page

![Gif showing the ability to remove an hour from your calendar](./src/assets/readme02.gif)
* Gif showing the ability to remove an hour from your calendar

![Gif demonstrating responsiveness of the app by showing it on a laptop](./src/assets/readme04.gif)
* Gif demonstrating responsiveness of the app by showing it on a laptop

## Contributors

This application was built by [Alex Kio](https://github.com/alexmkio/); a Front End Engineering, Mod 3 student at the [Turing School of Software and Design](https://turing.io/).

## Technologies Used

This application was built using the [React](https://reactjs.org/) javascript framework. [Router](https://reactrouter.com/) was used for multi-page functionality. [Cypress](https://www.cypress.io/) and [PropTypes](https://reactjs.org/docs/typechecking-with-proptypes.html) were used to test user stories and data typing. GitHub and Git were used for version control and collaboration. HTTP Request is being used to Get inside of an async await function.

## Learning Goals
I went into this project excited to solidify my understanding of React hooks, React Router, and to overcome the challenge of working with such a complicated dataset.

## The Evolution of the Project
I started this project how I do most projects: fetch, manipulate, and evaluate the data required to provide the base functionality. The data returned from the final fetch is around 8200 lines long and required extensive cleaning. I worked one small problem at a time to ensure that the data was being compiled in the type and system of measurement best for future manipulation or display. Once I had the data in the desired format I worked to prove that I could evaluate it based on user input values.

I then worked one user flow/component at a time to develop out the DOM without focusing heavily on styling. For the sake of time, and the ability to have my testing suite peer-reviewed by [Ash](https://github.com/AshleyOh-bit), I pivoted to working on Cypress testing and PropTypes. Once this was finished I pivoted back to styling and my list of “nice-to-haves” to polish the project.

## Reflections
I only wish I would have had more time. I thoroughly enjoyed the numerous and varied complications that arose during this journey. I don’t feel finished. I am very proud of my architecture under the hood, and wish I had the time to invest in bringing the DOM up to par. There is still functionality, user flows, and presentation left on my “nice-to-haves” list. Also, I really appreciate the time [Ash](https://github.com/AshleyOh-bit) took to give me quality feedback on [this PR](https://github.com/alexmkio/can-i/pull/22). Thank you!
