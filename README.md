# #NYCEDU Invite To Slack Service

## What it does

- A back end service (not a website)
- Gets emails of people who sign up on TypeForm
- Invites those people to join the slack channel
- Following the strategy of the #nomads slack team: https://levels.io/slack-typeform-auto-invite-sign-ups/

## How it works

We will set up a service to hit the `/inviteusers` endpoint every hour or so (this literally means having a computer visit the service URL + `/inviteusers`)

Visiting this route will trigger the following:
- Get form responses from the Typeform API
- Keep track of previously sent invites in a json file (poor man's database)
- If Typeform gives us emails we haven't invited yet, use the Slack API to invite them to join.

## Big Caveat
This uses the _unpublished_ `users.admin.invite` endpoint of the Slack API. This means that it could change without notice and break our service.

Many applications are relying on this for now, so if it does change we will be able to find out about it pretty easily.

## Installing and running locally

- Install node version 4.xx or above
- Node should come with `npm`. Install if it doesn't.
- Add your Typeform and Slack API keys to your local computer's environment. *DO NOT EVER COMMIT THESE KEYS TO GITHUB.*

```
(in Terminal - skip this step if you already have a bash_profile)
touch ~/.bash_profile

(inside bash_profile, type the following, substituting <your_key> with the actual API key)
export SLACK_TOKEN='<your_key>'
export TYPEFORM_TOKEN='<your_key>'

(in Terminal)
source ~/.bash_profile
```
- Clone this repo:
- `cd` into the directory of your repo
- In a text editor, find the `constants.js` file and update the value of `TYPEFORM_EMAIL_FIELD` and `TYPEFORM_FORM_ID` to match your form. `TYPEFORM_FORM_ID` is the last 6 characters of the URL your users see when they go to the form, e.g., `p5DhOL`. The value for `TYPEFORM_EMAIL_FIELD` can be found by going to the Build section of your form workspace, creating a new field and adding the email field as a variable. You'll see something like `{{answer_12345678}}` - that is the value you need, except swap `answer` for `email`. (Then delete the new field when you're done.)
- Install dependencies: `npm install`
- Start the application: `npm start`

## Top TODOs

- Error handling to send back 500 codes
- Get API keys and form values for production Slack team and form
- Configure application for production and deploy
- Set up a cron service to hit the endpoint every 30-60 minutes
- Error handling for connection failures
- Better logging
- Match interests to specific channels to invite people to
- Remove lodash dependency in package.json
- Tests!
- Better null checking in `parseResponseForEmails`
