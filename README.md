# Creating an Ionic and Web App With an NX Monorepo

## Purpose
The purpose of this article is to utilize NX workspace to create both a native application and a web application using the monorepo pattern.  The application will be an application that will track the grocery list items you create.  In the application, you will create a grocery list.  After creating the grocery list, you will be able to open the application either as a web application or as a native application to see when the items were purchased.  You will also be able to mark the item as used.  Finally, you will receive a notification when you open the app if you have a perishable item that has not been yet been used and was purchased more than 3 days ago.

## What is a Monorepo
A monorepo is the pattern of having all of your applications and libraries within one repository.  When generating the artifacts for your application, there is a build process that will compile the application and include all of the libraries that are needed in the application.

## The Benefits
The main benefit of this pattern is code reusability.  A team can have one library that is shared between different applications that can be generated in one build.  We will see more about this in when we discuss the architecture of the applications and libraries we are going to create.  

Another benefit of this pattern is allowing a team to go to one place to see the entire codebase.  If all your applications and libraries live in one location, build tooling can be created to visualize applications and the dependencies, as well as shared dependencies between applications and libraries.  NX has a CLI command that does exactly this, which we will see later.

## Monolith vs Monorepo vs Microfrontend

There is some confusion on the differences between monoliths, monorepos, and microfrontends.

**Monolith:**
A monolith is an application that runs both the frontend and the backend in one application.  This is the traditional 3 tier architecture, where an application has a presentational layer, a business logic (or data transformation) layer, and a data access layer.  Some technologies that were used to build monoliths were ASP.NET Web Forms, PHP, and Ruby on Rails.

**Monorepo**
A monorepo is the pattern of all the applications and libraries being hosted in one repository.  There is usually some tooling around how the build process occurs and how to resolve dependencies inside of the repository.  This is different than a monolith in that each application does not necessarily need to ship both backend and frontend code together, where in a monolith it does.
***Note: This is the pattern we will discuss in this article.***

**Microfrontend**
Microfrontend architecture is one where an application is a self contained piece of code that can be deployed as a unit inside of another application.  One pattern to accomplish this is to have an app shell that has a placeholder to display different applications to be fetched on some kind of user interaction.  With this pattern, the app shell can serve a self contained Angular application with one route, and a self contained React application with another route.




## Getting Started

 - Create an NX workspace by running the command below:
 `npx create-nx-workspace --preset=angular`
- Create a shared library by running the command below:
`nx generate @nrwl/angular:lib` and enter the name of the library when prompted.

