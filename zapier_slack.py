email = input_data['email']
print "Inviting {}...".format(email)
url = 'https://slack.com/api/users.admin.invite'
body = {
    'token': '<your token here>',
    'email': email,
    'resend': True
}
res = requests.post(url, data = body)
res.raise_for_status() # optional but good practice in case the call fails!
output = {'text': res.text, 'json': res.json()}
