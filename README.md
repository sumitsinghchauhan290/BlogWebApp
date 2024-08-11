# BlogWebApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.14.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

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

## Clone the Repository:##
Clone the BlogWebAPP repository from https://github.com/sumitsinghchauhan290/BlogWebApp

## API URL ##
Please set your web API hosting URL in the Config.json file before running the application.

## Application Structure

The BlogWebAPP application is created using the Model View Controller (MVC) architecture pattern. This pattern separates concerns into three main components: Model, View, and Controller. 

- **Components:**
  - All components are organized inside the `components` folder. Each component is responsible for handling the presentation logic and user interaction.

- **Services:**
  - Services are placed inside the `services` folder. They handle the business logic, such as fetching data from the JSON file or managing operations like pagination, deletion, etc.

- **Models:**
  - The `models` folder contains classes that represent the data structure of the application, such as the `Blog` model.

This architecture ensures a clean separation of concerns, making the application easier to maintain and extend. By organizing the code into different folders based on their type, the application structure remains intuitive and scalable.

