# Creating an Ionic and Web App With an NX Monorepo

## Purpose

The purpose of this article is to utilize NX workspace to create both a native application and a web application using the monorepo pattern. The application will be an application that will track the grocery list items you create. In the application, you will create a grocery list. After creating the grocery list, you will be able to open the application either as a web application or as a native application to see when the items were purchased. You will also be able to mark the item as used. Finally, you will receive a notification when you open the app if you have a perishable item that has not been yet been used and was purchased more than 3 days ago.

## What is a Monorepo

A monorepo is the pattern of having all of your applications and libraries within one repository. When generating the artifacts for your application, there is a build process that will compile the application and include all of the libraries that are needed in the application.

## The Benefits

The main benefit of this pattern is code reusability. A team can have one library that is shared between different applications that can be generated in one build. We will see more about this in when we discuss the architecture of the applications and libraries we are going to create.

Another benefit of this pattern is allowing a team to go to one place to see the entire codebase. If all your applications and libraries live in one location, build tooling can be created to visualize applications and the dependencies, as well as shared dependencies between applications and libraries. NX has a CLI command that does exactly this, which we will see later.

## Monolith vs Monorepo vs Microfrontend

There is some confusion on the differences between monoliths, monorepos, and microfrontends.

**Monolith:**

A monolith is an application that runs both the frontend and the backend in one application. This is the traditional 3 tier architecture, where an application has a presentational layer, a business logic (or data transformation) layer, and a data access layer. Some technologies that were used to build monoliths were ASP.NET Web Forms, PHP, and Ruby on Rails.

**Monorepo**

A monorepo is the pattern of all the applications and libraries being hosted in one repository. There is usually some tooling around how the build process occurs and how to resolve dependencies inside of the repository. This is different than a monolith in that each application does not necessarily need to ship both backend and frontend code together, where in a monolith it does.

**_Note: This is the pattern we will discuss in this article._**

**Microfrontend**

Microfrontend architecture is one where an application is a self contained piece of code that can be deployed as a unit inside of another application. One pattern to accomplish this is to have an app shell that has a placeholder to display different applications to be fetched on some kind of user interaction. With this pattern, the app shell can serve a self contained Angular application with one route, and a self contained React application with another route.

## Getting Started

- Create an NX workspace by running the command below:

`npx create-nx-workspace --preset=empty`

You will be prompted to enter your org name, application name, and if you want to use NX cloud. This will create the scaffolding for our monorepo. Let's look at some of the files and folders created.

**apps directory**
This is where all of the different applications will be located. By default, there will be 2 applications in the directory: a template application with the name specified when the monorepo was created and it's accompanying e2e application.

**libs directory**
This is where our shared libraries will exist. These can be shared between all of our apps in the monorepo. We can create a shared library by running the command below:

`nx generate @nrwl/angular:lib` and enter the name of the library when prompted. We can also include either the `--publishable` or `--buildable` flag when generated the library. [Here](https://nx.dev/l/r/structure/buildable-and-publishable-libraries) is good documentation from the NX team to describe the 2 flags but the gist is the `--publishable` flag allows us to use the library outside of the monorepo by publishing it to npm. The `--buildable` flag allows NX's build engine to make some optimizations during the build. This is all done by creating custom builder's within the monorepo.

**_One thing to note is that if a library is generated without including the flag, it cannot be retroactively added._**

**nx.json**
This is the NX workspace configuration file. It includes generators for the CLI, references to project linting configurations, and application / library dependencies.

**workspace.json**
This file will contain the different projects in your workspace.

## Let's Get Crackin'

First, we want to create our Ionic app. There is an NPM package helps us with this exact thing. NX has a plugin ecosystem that provides packages that allow NX to be extended. One of those packages is `@nxtend/ionic-angular`. We can create an Ionic app by installing the package and running several commands. As a source of documentation, I found these steps at [this link](https://ionicframework.com/blog/ionic-angular-monorepos-with-nx/).

    npm install --save-dev @nxtend/ionic-angular
    nx generate @nxtend/ionic-angular:init
    nx generate @nxtend/ionic-angular:app grocery-ionic

Then we can make sure the Ionic app runs, first in the browser with the command `nx serve grocery-ionic --open`.

Next, we create the directories that will hold the native projects by running `nx run grocery-ionic:add:ios` and `nx run grocery-ionic:add:android`.

Finally, we can create an npm script that builds the Angular app, syncs it with the mobile project and opens it in the native device's IDE.

    "grocery-ionic-ios": "nx build grocery-ionic && nx run grocery-ionic:sync:ios && nx run grocery-ionic:open:ios",
    "grocery-ionic-android": "nx build grocery-ionic && nx run grocery-ionic:sync:android && nx build grocery-ionic:open:android"

Next let's go ahead and create our web version of the app. There is an NX command to accomplish this:

    nx generate @nrwl/angular:app grocery

This creates the Angular web version of the app we are creating. If you open the workspace.json file, you will now see 4 apps: the grocery-ionic app and the grocery app along with their corresponding e2e apps. When we run `nx serve grocery --open`, we will see the NX Angular template in the browser.

## Now For the Implementation

**TLDR;**
We will be separating the business logic from the presentational logic in our apps. The business logic will be in a buildable library within our monorepo. In this library, we will be using strategy pattern to create interfaces to expose our methods that are implemented by the concrete classes we will inject into our Angular (UI) components. The concrete classes extend an abstract class to utilize code reuse between the 2 concrete classes.

First, let's create our buildable library by running the following command:

    nx generate @nrwl/angular:lib grocery-shared-business-logic --buildable

This creates the grocery-shared-business-logic lib in the libs directory of the monorepo. It also updates the workspace.json file with the new project.

Now, let's think about how we want to build our UI. Our web app will contain a single route (our home route). There will be a header, main content area, and a side panel that can be toggled based on user interaction . The header will have an add button that toggles the side panel. The main content will have a list of items where each item will be in an expandable section that can be toggled to show the item details.
