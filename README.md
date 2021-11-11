#Chuck Norris App
Angular App + Angular Material that allows drawing random Chuck Norris jokes. It also allows selection of category of joke and impersonation of Chuck Norris in mentioned jokes.

Link for the app
https://Ciszak-Krzysztof.github.io/ChuckNorrisApp-Angular

Prerequisites for the task
Write the application in Typescript (Angular 2+ or React + TS)
Make the application available on the internet (via CloudFront, GitHub Pages, or similar services)
Use a version control system during the project development (GitHub/Bitbucket preferably)
Include RWD
Use any libraries that suit your needs
You can find the API documentation here: icndb.com API
Don't use pre-made templates (but you can use the starter project template created via Angular CLI or create-react-app)
Designs and resources can be collected from Frontend Recruitment Task project on Zeplin
Tasks
Once the user accesses the website, a random Chuck Norris joke should be displayed.
Below the joke, there should be a "Draw a Chuck Norris joke" button that would allow drawing another random Chuck Norris joke.
A dropdown list of the available categories (e.g. "explicit", "nerdy") should be displayed next to the button. Once a category is chosen and the user clicks the "Draw a Chuck Norris joke" button, a random joke from the chosen category should be drawn.
Below the button, there should be an "Impersonate Chuck Norris" input field. Every time its value changes, the text on the "Draw a Chuck Norris joke" button should dynamically change to "Draw a <input_value> joke". Once the user clicks the button, the new Chuck Norris joke should be drawn, but all instances of "Chuck Norris" in the joke should be replaced with the value put in by the user. For example, if the user types "Michael Jordan" in the input field and clicks the "Draw a Michael Jordan joke", a random Michel Jordan joke should be displayed.
Extra points: Create a "Save jokes" button on the bottom of the page. Next to the button, there should be an input field with number type. Once the input value is provided and the user clicks the "Save jokes" button, a number of jokes provided by the user in the input should be downloaded in the .txt file.

# ChuckNorrisAppAngular

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.9.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
