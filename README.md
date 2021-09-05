# Creating an Ionic and Web App With an NX Monorepo

## Purpose
The purpose of this article is to utilize NX workspace to create both a native application and a web application using the monorepo pattern.  The application will be an application that will track the grocery list items you create.  In the application, you will create a grocery list.  After creating the grocery list, you will be able to open the application either as a web application or as a native application to see when the items were purchased.  You will also be able to mark the item as used.  Finally, you will receive a notification after 3 days when you have a perishable item that has not been used yet.

## Getting Started

 - Create an NX workspace by running the command below:
 `npx create-nx-workspace --preset=angular`

