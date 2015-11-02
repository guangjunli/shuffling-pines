#### Name

Guangjun Li

#### Project description

The application does basic management of guests at the Shuffling Pines Dissolution Center.

Guest registration information includes,

* name
* transition date
* transportation (pick up or drop off)
* pick up location for pick up transportation
* status

Guest information can be updated as well, including the status field. Status transition is restricted due to the nature of the resort.

Guest can be deleted, but guest information is not deleted from persistent storage. The guest is simply marked as 'deleted' and not showing up in the guest list.

As per the requirement, two guests, "First Guest" and "Second Guest" are added to the registry by default when there is no guests in the registry.

#### Build the application

Go to the base folder,

`npm install`

`bower install`

`gulp build`

#### Run the tests
`gulp test`

#### Start server and run the application

Go to the base folder,
`gulp`

Open the Web UI in browser at:
`http://localhost:8081/`


#### Code

Guest data is encapsulated in `guest.js`.

Persistent storage of guest registry is encapsulated in `storage.js`.

`app.js` contains Angular service code for storageService, which uses the `Storage` mentioned above, and adds two guests by default when storageService is initialized.

`app.js` also contains two controllers, `FormController` and `TabController`. `FormController` handles adding new guest, `TabController` handles displaying guest list, updating and deleting guest. The two controllers correspond to the two tabs on the UI. The guest list tab also lists the guests that have been deleted.
