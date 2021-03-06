# We Can Ride 

The purpose of this application is to help coordinate volunteers by creating a scheduling management framework.  Below you will find instructions for getting the app set up, and included in the documentation.pdf file are instructions for using and navigating the app as both an admin and a volunteer.

### Prerequisites

Before you get started, make sure you have the following software installed on your computer:

- [Node.js](https://nodejs.org/en/)
- [PostrgeSQL](https://www.postgresql.org/)
- [Nodemon](https://nodemon.io/)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

* Click the green Clone or Download button and unzip the file, and open it in the IDE of your choice, we built this app in Visual Studio Code. https://code.visualstudio.com/
* Create a new database in postgreSQL called `we-can-ride` and create the given tables using the database.sql file.  This allows you to store and retrieve data.
* Run `npm install` in the terminal to add the necessary dependencies.
* Create a `.env` file at the root of the project and paste this line into the file:
    ```
    SERVER_SESSION_SECRET=superDuperSecret
    ```
    While you're in your new `.env` file, take the time to replace `superDuperSecret` with some long random string like `25POUbVtx6RKVNWszd9ERB9Bb6` to keep your application secure. Here's a site that can help you: [https://passwordsgenerator.net/](https://passwordsgenerator.net/). If you don't do this step, create a secret with less than eight characters, or leave it as `superDuperSecret`, you will get a warning.
* Start postgres if not running already by using `brew services start postgresql`
* Run `npm run server`
* Run `npm run client`
* Navigate to `localhost:3000`
* Use the provided username/password for initial login, after which we recommend changing your password.

## Heroku Deployment
    
1. Sign up for an account on [Heroku.com](https://www.heroku.com/)
2. Install Heroku CLI by typing `brew install heroku` in Terminal
  - [Additional installation notes and troubleshooting](https://devcenter.heroku.com/articles/heroku-cli#download-and-install)
3. Authenticate by typing `heroku login` in Terminal

Run the following commands from within your project folder.
1. In terminal, navigate to your project folder and type `heroku create`
2. Login in if prompted
3. Type `git remote -v` to ensure it added successfully
4. In terminal, type `git push heroku master`
5. Our website is now live! However... we also have a database

### Postgresql on Heroku

1. In terminal, type `heroku addons:create heroku-postgresql:hobby-dev` to set up Postgresql on your Heroku project
2. Next, type `heroku pg:push we_can_ride DATABASE_URL` to copy your database contents up to Heroku. `DATABASE_URL` is a heroku config variable created by the Add On. Do not replace it with something else, just type: `DATABASE_URL`. For example, if you were deploying the `koala_holla` database, you should type `heroku pg:push koala_holla DATABASE_URL`
3. Update or create a module for your pg-pool configuration to the following code that will convert the heroku `DATABASE_URL` into a pool config object. The only line you should have to change is `database: process.env.DATABASE_NAME || 'your_database'`. Change `your_database` to the actual name of your database. (e.g. `database: process.env.DATABASE_NAME || 'we_can_ride'`

### Miscellaneous

- `heroku logs` - Display error logs
- `heroku config` - Show basic app info
- `heroku restart` - Sometimes it helps to turn things off an on again
- `heroku open` - Opens the website for you project in the browser

## Resources

More detailed instructions can be found here: 

- Deployment Videos [https://drive.google.com/drive/u/1/folders/0B9sCDSmGi72ZN2hpR1Etbl9qb2c](https://drive.google.com/drive/u/1/folders/0B9sCDSmGi72ZN2hpR1Etbl9qb2c)
- [https://devcenter.heroku.com/articles/git](https://devcenter.heroku.com/articles/git)
- [https://devcenter.heroku.com/articles/heroku-postgresql](https://devcenter.heroku.com/articles/heroku-postgresql)

## Authors

* **Billy Blaze** - (https://github.com/w4bb4j4ck)
* **Erick Jensen** - (https://github.com/ErickDJensen)
* **Frieda Jacobson** - (https://github.com/kajakali)
* **Max Faust** - (https://github.com/MaxFaust)
* **Zach Battaglia** - (https://github.com/zbattaglia)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Thanks to our wonderful instructors at Prime Digital Academy, as well as our amazing cohortmates for their support and encouragement!
* Thanks to Material UI, Node.js, Moment, and all the other giants upon whose shoulders we stand.


