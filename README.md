# Creating an Ionic and Web App With an NX Monorepo

## Purpose
The purpose of this article is to utilize NX workspace to create both a native application and a web application using the monorepo pattern.  The application will be an application that will track the grocery list items you create.  In the application, you will create a grocery list.  After creating the grocery list, you will be able to open the application either as a web application or as a native application to see when the items were purchased.  You will also be able to mark the item as used.  Finally, you will receive a notification after 3 days when you have a perishable item that has not been used yet.

## What is a Monorepo
A monorepo is the pattern of having all of your applications and libraries within one repository.  When generating the artifacts for your application, there is a build process that will compile the application and include all of the libraries that are needed in the application.

## The Benefits
The main benefit of this pattern is code reusability.  A team can have one library that is shared between different applications that can be generated in one build.  We will see more about this in when we discuss the architecture of the applications and libraries we are going to create.  

Another benefit of this pattern is allowing a team to go to one place to see the entire codebase.  If all your applications and libraries live in one location, build tooling can be created to visualize applications and the dependencies, as well as shared dependencies between applications and libraries.  NX has a CLI command that does exactly this, which we will see later.

## Getting Started

 - Create an NX workspace by running the command below:
 `npx create-nx-workspace --preset=angular`
- Create a shared library by running the command below:
`nx generate @nrwl/angular:lib` and enter the name of the library when prompted.

