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

## How it works

This depends on deployment details. The current plan is to run each script out of the `bin` folder using Heroku scheduler, assuming that the free tier allows us to run every 10 minutes.

If this doesn't work, we can set this up as a true Node server app with endpoints which another scheduling service hits at intervals. (There is already an `/inviteusers` endpoint for this.)


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
export SLACK_TOKEN='<your_key>'
export TYPEFORM_TOKEN='<your_key>'
export NYCEDU_TWITTER_CONSUMER_KEY='<your_key>'
export NYCEDU_TWITTER_CONSUMER_SECRET='<your_key>'
export NYCEDU_TWITTER_ACCESS_TOKEN='<your_key>'
export NYCEDU_TWITTER_ACCESS_TOKEN_SECRET='<your_key>'
export NODE_ENV='development' # set to 'production' in prod

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
- Start the application: `npm start`
- Run tests: `npm test`

## Typeform form field IDs
- Each Typeform we use has a unique ID that we need in order to ask Typeform's API for its results.
- The form fields in Typeform have underlying IDs that we need to know in order to grab values like email, twitter, etc. from the API response.
- In the code, the form ID is the `TYPEFORM_FORM_ID` value in `constants.js`. `TYPEFORM_FORM_ID` is the last 6 characters of the URL your users see when they go to the form, e.g., `p5DhOL`.
- The IDs for fields like email address, twitter handle, are also in `constants.js` with keys like `TYPEFORM_EMAIL_FIELD`.
- The value for `TYPEFORM_EMAIL_FIELD` can be found by going to the Build section of your form workspace, creating a new field and adding the email field as a variable. You'll see something like `{{answer_12345678}}` - that is the value you need, except swap `answer` for `email`. (Then delete the new field when you're done.)
- Notice that there are two sets of constants and Typeform IDs. One is for the "test" form that is used in the stage environment. The other is for the real form used in production.
- You would go through the same sort of process if you wanted to create a new form for local development, or if you wanted to add fields to the form. Add your form or field, use the steps above to find the IDs, and add them to `constants.js`


## Top TODOs

- Deploy app
- Get API keys and form values for production Slack team and form
- Configure application for production and deploy
- Set up a cron service to hit the endpoint every 30-60 minutes
- Error handling for connection failures etc.
- Better logging
- Tests!
- Linting and style guide
- Set up issue tracking and slack / github integrations for devs
- Better null checking in `parseResponseForEmails`
- Refactor Twitter code with promises
