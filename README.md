# NYCEDU Automation
*Scripts and integrations that make life easier for NYCEDU admins*

## What it does
- Invites people to join NYCEDU Slack after they fill out a form (using the Typeform API and the strategy of the #nomads slack team: https://levels.io/slack-typeform-auto-invite-sign-ups/)
- Follow people on Twitter when they fill out the Typeform sign-up form (if they have completed the form with their Twitter handle)
- Retweets users followed by NYCEDU that use the #NYCEDU hashtag.

## Upcoming integrations
- Add people to MailChimp mailing list when they fill out the Typeform
- Send users a welcome message when they actually do join Slack

## Contributing
- Clone the repo and pull latest
- Create a branch and commit your changes to it
- Push the branch to the remote and open a pull request
- Add another NYCEDU developer as a reviewer of your PR
- Much more below on actually deploying changes

## Where does the application live?
We are deployed on Heroku, and the Heroku scheduler add-on runs each script out of the `bin` folder approximately every 10 minutes.

There is a staging app (`nycedu-automation-staging`) and a production app (`nycedu-automation`), both running on separate Heroku instances.

## Big Caveat
This uses the _unpublished_ `users.admin.invite` endpoint of the Slack API. This means that it could change without notice and break our service.

Many applications are relying on this for now, so if it does change we will be able to find out about it pretty easily.

## Local installation and setup

- Install node version 4.xx or above
- Node should come with `npm`. Install if it doesn't.
- Add your Typeform, Slack, and Twitter API keys to your local computer's environment. *DO NOT EVER COMMIT THESE KEYS TO GITHUB.*

```
(in Terminal - skip this step if you already have a bash_profile)
touch ~/.bash_profile

(inside bash_profile, type the following, substituting <your_key> with the actual API key)
export NODE_ENV='development'
export DATABASE_URL='postgres:///<your_db_name>'
export DEV_SLACK_TOKEN='<your_key>'
export DEV_TYPEFORM_TOKEN='<your_key>'
export DEV_NYCEDU_TWITTER_CONSUMER_KEY='<your_key>'
export DEV_NYCEDU_TWITTER_CONSUMER_SECRET='<your_key>'
export DEV_NYCEDU_TWITTER_ACCESS_TOKEN='<your_key>'
export DEV_NYCEDU_TWITTER_ACCESS_TOKEN_SECRET='<your_key>'

(You may also want to add the PROD keys, but you may not need to.)

(in Terminal)
source ~/.bash_profile
```
- Install postgres if you don't have it already and set the local timezone to ``'UTC'``. This will spare you much bafflement and suffering because your local db will be on the same timezone as Typeform and Heroku.
- First check if your psql timezone is UTC
```
$ psql
(inside your postgres shell)
=# show timezone;
```
- If the answer isn't UTC, you need to change it in your `postgresql.conf` file. In the postgres shell, type `SHOW config_file;` and this will output the location of your `postgresql.conf` file. Mine is at `/usr/local/var/postgres/postgresql.conf`
- Open up `postgresql.conf` in a text editor. Search for all of the places where time zones are set (there are more than one!) and replace them with `UTC`

## Running locally
- Clone this repo: `git clone https://github.com/NYCEDU/nycedu-automation.git`
- `cd` into the directory of your repo
- Install dependencies: `npm install`

## Typeform form field IDs
- Each Typeform we use has a unique ID that we need in order to ask Typeform's API for its results.
- The form fields in Typeform have underlying IDs that we need to know in order to grab values like email, twitter, etc. from the API response.
- In the code, the form ID is the `TYPEFORM_FORM_ID` value in `constants.js`. `TYPEFORM_FORM_ID` is the last 6 characters of the URL your users see when they go to the form, e.g., `p5DhOL`.
- The IDs for fields like email address, twitter handle, are also in `constants.js` with keys like `TYPEFORM_EMAIL_FIELD`.
- The value for `TYPEFORM_EMAIL_FIELD` can be found by going to the Build section of your form workspace, creating a new field and adding the email field as a variable. You'll see something like `{{answer_12345678}}` - that is the value you need, except swap `answer` for `email`. (Then delete the new field when you're done.)
- Notice that there are two sets of constants and Typeform IDs. One is for the "test" form that is used in the stage environment. The other is for the real form used in production.
- You would go through the same sort of process if you wanted to create a new form for local development, or if you wanted to add fields to the form. Add your form or field, use the steps above to find the IDs, and add them to `constants.js`

## Deploying to Heroku
**Setup**
1. Install the Heroku CLI if you haven't already: `brew install heroku` If you first need to install homebrew, [go here to install it.](https://brew.sh/)
2. Login with the NYCEDU Heroku credentials (not included here): `heroku login`
3. Add the staging remote: `git remote add staging https://git.heroku.com/nycedu-automation.git`
4. Add the production remote: `git remote add production https://git.heroku.com/nycedu-automation.git`

**Deploying**
- Because we have two Heroku remotes, you will need to add the flags `--remote <env>` or `--app <app_name>`
- Only deploy code that has passed code review on GitHub and has been merged into master.
- First deploy to staging, then to production once everyone is cool with the changes.

If your changes require setting or changing new environment variables, you can do that with the Heroku CLI.
`heroku config:set SOME_VARIABLE=some_value --remote staging` # set or change the value of a var
`heroku config:unset SOME_VARIABLE` # remove the var from the config

If your changes require updating database schema, it is probably better to do that in code (so it is documented) that can be executed from the command line via `heroku run node bin/myScript` or through some other fancy way. You can also drop into the psql shell on Heroku using `heroku pg:psql`.

Adding tasks to Heroku scheduler is theoretically possible from the CLI, but probably easier on the Heroku website.
1. Put your script into the `bin` folder with a node shebang at the top of the file. Don't use the .js extension.
2. Log into NYCEDU Heroku dashboard, click on the scheduler icon for the app, and then type the name of your script into the dialog box, set the frequency, etc., and save it.

## Top TODOs
- Anything listed on GitHub issues
- Get API keys and form values for production Slack team and form
- Configure application for production and deploy
- Error handling for connection failures etc.
- Better logging
- Tests!
- Linting and style guide
- Set up issue tracking and slack / github integrations for devs
- Refactor Twitter code with promises
