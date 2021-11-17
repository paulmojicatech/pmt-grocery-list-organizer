
# Creating an Ionic and Web App With an NX Monorepo

## Purpose

The purpose of this article is to utilize NX workspace to create both a native application and a web application using the monorepo pattern. The application will be an application that will track the grocery list items you create. In the application, you will create a grocery list. After creating the grocery list, you will be able to open the application either as a web application or as a native application to see when the items were purchased. You will also be able to mark the item as used. Finally, you will receive a notification when you open the app if you have a perishable item that has not been yet been used and was purchased more than 3 days ago.  You can see the code we use for this article on my [Github](https://github.com/paulmojicatech/pmt-grocery-list-organizer).

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

***Note: This is the pattern we will discuss in this article.***

**Microfrontend**

Microfrontend architecture is one where an application is a self contained piece of code that can be deployed as a unit inside of another application. One pattern to accomplish this is to have an app shell that has a placeholder to display different applications to be fetched on some kind of user interaction. With this pattern, the app shell can serve a self contained Angular application with one route, and a self contained React application with another route.

## Getting Started

- Create an NX workspace by running the command below:

`npx create-nx-workspace --preset=empty`

You will be prompted to enter your org name, application name, and if you want to use NX cloud.   This will create the scaffolding for our monorepo.  Let's look at some of the files and folders created.

**apps directory**
This is where all of the different applications will be located.  By default, there will be 2 applications in the directory: a template application with the name specified when the monorepo was created and it's accompanying e2e application.

**libs directory**
This is where our shared libraries will exist.  These can be shared between all of our apps in the monorepo.  We can create a shared library by running the command below:

`nx generate @nrwl/angular:lib` and enter the name of the library when prompted.  We can also include either the `--publishable` or `--buildable` flag when generated the library.  [Here](https://nx.dev/l/r/structure/buildable-and-publishable-libraries) is good documentation from the NX team to describe the 2 flags but the gist is the `--publishable` flag allows us to use the library outside of the monorepo by publishing it to npm.  The `--buildable` flag allows NX's build engine to make some optimizations during the build.  This is all done by creating custom builder's within the monorepo.

***One thing to note is that if a library is generated without including the flag, it cannot be retroactively added.***

**nx.json**
This is the NX workspace configuration file.  It includes generators for the CLI, references to project linting configurations, and application / library dependencies.

**workspace.json**
This file will contain the different projects in your workspace.


## Let's Get Crackin'
First, we want to create our Ionic app.  There is an NPM package helps us with this exact thing.  NX has a plugin ecosystem that provides packages that allow NX to be extended.  One of those packages is `@nxtend/ionic-angular`.  We can create an Ionic app by installing the package and running several commands.  As a source of documentation, I found these steps at [this link](https://ionicframework.com/blog/ionic-angular-monorepos-with-nx/).

    npm install --save-dev @nxtend/ionic-angular
    nx generate @nxtend/ionic-angular:init
    nx generate @nxtend/ionic-angular:app grocery-ionic

Then we can make sure the Ionic app runs, first in the browser with the command `nx serve grocery-ionic --open`.

Next, we create the directories that will hold the native projects by running `nx run grocery-ionic:add:ios` and `nx run grocery-ionic:add:android`.

Finally, we can create an npm script that builds the Angular app, syncs it with the mobile project and opens it in the native device's IDE.

    "grocery-ionic-ios": "nx build grocery-ionic && nx run grocery-ionic:sync:ios && nx run grocery-ionic:open:ios",
    "grocery-ionic-android": "nx build grocery-ionic && nx run grocery-ionic:sync:android && nx build grocery-ionic:open:android"

Next let's go ahead and create our web version of the app.  There is an NX command to accomplish this:

    nx generate @nrwl/angular:app grocery

This creates the Angular web version of the app we are creating.  If you open the workspace.json file, you will now see 4 apps: the grocery-ionic app and the grocery app along with their corresponding e2e apps. When we run `nx serve grocery --open`, we will see the NX Angular template in the browser.

## TLDR;
We will be separating the business logic from the presentational logic in our apps.  The business logic will be in a buildable library within our monorepo.  In this library, we will be using strategy pattern to create interfaces to expose our methods that are implemented by the concrete classes we will inject into our Angular (UI) components.  The concrete classes extend an abstract class to utilize code reuse between the 2 concrete classes.

First, let's create our buildable library by running the following command:

    nx generate @nrwl/angular:lib grocery-shared-business-logic --buildable

This creates the grocery-shared-business-logic lib in the libs directory of the monorepo.  It also updates the workspace.json file with the new project.

Now, let's think about how we want to build our UI.  Our web app will contain a single route (our home route).  There will be a header, main content area, and a side panel that can be toggled based on user interaction .  The header will have an add button that toggles the side panel.  The main content will have a list of items where each item will be in an expandable section that can be toggled to show the item details.

**Web Version:**
<iframe src="https://giphy.com/embed/BjlCcdUJGBhauMxeRX" width="480" height="250" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>

For our native app, we will have a header with the page title and buttons to either add or go back based on the page we are on.  Clicking on the add button will go to a screen where we can add items.  The content for the home screen will be a list of items where clicking on an item will go to the item detail screen.

**iOS Version:**
<iframe src="https://giphy.com/embed/niU1WjzXIFRaTxCjdb" width="232" height="480" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>


## Implementation
As stated above, the first step is to remove the business logic from the UI presentational components.  To do this, we need to know what data the two apps need.  We create the view model below in our grocery-shared-business-logic library:

    export  type  AppViewModel = {
      headerData?: HeaderData;
      itemCategories: string[];
      items: GroceryItem[];
    };

Then, we need to think about how we can get our components to can consume this model.  So we create a service that has a method that will return the data.  Because we are good little Angular devs, we return the data as an observable.

But wait... the items will be loaded based on storage (browser local storage for the web and device storage for the native app).  How do we accomplish this?  The answer is to use strategy pattern.

We will create an app-state.interface.ts file that will be our contract.

     export  interface  IAppStateService {
       viewModel$: Observable<AppViewModel>;
       getViewModel: () =>  Observable<AppViewModel>; 
       addItemToList: (itemToAdd: FormGroup) =>  void;
    }

This means that anything that implements this interface needs a property that holds the data as an observable, has a method to get the observable, and has a method to add an item to the list.  This is functionality that both the web and the native app needs.

We then create an abstract class so we can share code between the concrete classes we will inject into our components in the apps.

    export  abstract  class  AppStateService {
	    protected  INITIAL_STATE: AppViewModel = {
		    headerData:  undefined,
		    items: [],
		    itemCategories: [],
	    };
    
	    protected  viewModelSub$ = new BehaviorSubject<AppViewModel>(
	    this.INITIAL_STATE
	    );
	    viewModel$ = this.viewModelSub$.asObservable();
	    constructor(
		    protected  headerDataService: IHeaderDataService,
		    protected  storageSvc: IStorageUtilSvc,
		    protected  _store: Store<AppState>
	    ) {}
	 
	    getViewModel(defaultHeaderData: HeaderData): Observable<AppViewModel> {
	    const  loadGroceryItems$ = this.storageSvc
		    .getStorageItem(StorageType.GROCERY_ITEM)
		    .pipe(
			    tap((items) => {
			    this._store.dispatch(LoadItems({ allItems:  items }));
			    }),
			    take(1),
			    ignoreElements()
		    );
	    
		    const  headerData$ = this.headerDataService
			    .getHeaderData(defaultHeaderData)
			    .pipe(filter((headerData) => !!headerData));
		    
		    let  itemCategories: string[] = Object.values(GroceryItemCategoryType);
		    const  itemCategories$ = of(itemCategories);
		    const  allItems$ = this._store.select(getAllItems);
		    const  initialViewModel$ = combineLatest([
			    headerData$,
			    itemCategories$,
			    allItems$,
		    ]).pipe(
			    map(([headerData, itemCategories, items]) => {
				    return { headerData, itemCategories, items };
			    })
		    );
		    return  merge(initialViewModel$, this.viewModel$, loadGroceryItems$);
	    }
	    
	    addItemToList(addItemForm: FormGroup): void {
		    const  addToCurrentList = !!addItemForm.get('addToCurrentList')?.value;
		    const  item = addItemForm.get('item')?.value;
		    const  itemCategory = addItemForm.get('itemCategory')?.value;
		    const  itemToAdd: GroceryItem = {
		    id:  addToCurrentList ? this.generateItemId() : undefined,
		    name:  item,  
		    category:  itemCategory,
		    datePurchased:  addToCurrentList ? new  Date().toDateString() : undefined
		    };
		    this.storageSvc.addGroceryItem(itemToAdd);
	    }
	    
	    private generateItemId(): string {
		    return  Math.random().toString(16).substr(2, 16);
	    }
    }

The thing to note about this class is that we inject 2 interfaces (IHeaderDataService and IStorageUtilService).  The reason we do this is because while the contract exposed to the state service will be the same, the implementation details will be different based on if we are on the web app vs if we are on the native app.

So when we look at our concrete state service classes, they will have the concrete classes for the IHeaderDataService and the IStorageUtilService.

**Web App State Service**

    export  class  WebAppStateService extends  AppStateService
	    implements  IAppStateService {
	    readonly  INITIAL_STATE: AppViewModel = {
		    headerData: {
			    title:  'Current Grocery Items',
			    buttons: {
				    button: [
					    {
					    
					    text:  'Add to list',
					    
					    name:  'add',
					    
					    }
				    ],
				    position:  HeaderButtonPosition.END,
			    }	    
		    },
		    itemCategories: [],
		    items: [],
	    };
	    
	      
	    
	    protected  viewModelSub$ = new  BehaviorSubject<AppViewModel>(this.INITIAL_STATE);
	    constructor(
		    protected  headerDataService: WebHeaderDataService,
		    protected  webStorageSvc: WebStorageUtilService,
		    protected  store: Store<AppState>
	    ) {
		    super(headerDataService, webStorageSvc, store);
	    }
	    getViewModel(): Observable<AppViewModel> {
		    return  super.getViewModel(this.INITIAL_STATE.headerData!);
	    }
    }

So when we look at this class, we see that we are utilizing the logic we wrote in the abstract class to execute when we call the getViewModel method.  Also, in our constructor, we see the concrete classes for the headerDataService and WebStorageUtilService.

**Ionic**

    export  class  IonicAppStateService extends  AppStateService implements  IAppStateService {
	    readonly  INITIAL_STATE: AppViewModel = {
		    headerData: {
			    title:  'Current Grocery Items',			    
			    buttons: {			    
				    button: [				    
					    {					    
						    name:  'add-circle-outline',					    
					    },
				    ],
				    position:  HeaderButtonPosition.END,
			    },		    
		    },
		    itemCategories: [],		    
		    items: [],		    
	    };	    	      	    
	    constructor(	    
		    protected  headerDataService: IonicHeaderDataService,		    
		    protected  ionicStorageSvc: IonicStorageUtilService,		    
		    protected  store: Store<AppState>,		    
		    private  _router: Router		    
	    ) {	    
		    super(headerDataService, ionicStorageSvc, store);	    
	    }	    
	    getViewModel(): Observable<AppViewModel> {	    
		    return  super.getViewModel(this.INITIAL_STATE.headerData!);	    
	    }	    
	    handleAddListClickEvent(): void {
		    this.headerDataService.setNextHeader();	    
	    }	    	      
	    
	    handleItemDetailClickEvent(item: GroceryItem): void {	    
		    this.headerDataService.setItemDetailHeader(item);	    
	    }
	    	     	    
	    addItemToList(addItemForm: FormGroup): void {	    
		    super.addItemToList(addItemForm);	    
		    this._store.dispatch(SetHeader({headerData:  this.INITIAL_STATE.headerData!}));	    
		    this._router.navigate(['']);	    	      	    
	    }	    
    }

Here we see we are re-using the logic from the abstract class for getViewModel and addItemToList.  Again, we also see the concrete classes injected into this service for IonicHeaderDataService and IonicStorageUtilService.

To round us out, we can look at our components in each of our apps and see the concrete classes injected into those components.

**Web**

    export  class  HomeComponent  implements  OnInit {    
	    viewModel$!: Observable<AppViewModel>;    
	    addItemForm!: FormGroup;              
	    constructor(	    
		    public  webStateServce: WebAppStateService,	    
		    private  _formService: AddItemFormService
	    ) {}	    	      	    
	    ngOnInit(): void {	    
		    this.viewModel$ = this.webStateServce.getViewModel();	    
		    this.addItemForm = this._formService.getAddItemFormGroup();	    
	    }	    
    }

**Ionic**

    export  class  HomePage  implements  OnInit {    
	    viewModel$!: Observable<AppViewModel>;	    	      	    
	    constructor(public  stateSvc: IonicAppStateService){}	    	      	    
	    ngOnInit(): void {	    
		    this.viewModel$ = this.stateSvc.getViewModel();	    
	    }    
    }

## That's All Folks
To summarize, we were able to use the NX library for creating a monorepo where we have 2 applications (one web and one hybrid native with Ionic) and one shared library between the applications.  We were able to re-use code between that apps by moving the business logic to the shared library and using strategy pattern with interfaces and abstract classes to determine the code to be executed.  