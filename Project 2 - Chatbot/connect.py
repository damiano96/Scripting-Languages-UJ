import discord
import requests
import json

SERVER_ADDRESS = 'http://localhost:5005/webhooks/rest/webhook'
DISCORD_KEY = 'OTI5MTM1MDg2NDIxNTQ0OTgw.Ydi6ew.D_78sPBgzuPMx7M_YoNN19EvPMY'
client = discord.Client()


@client.event
async def on_ready():
    print('###################################')
    print('# Ready to talk #')
    print('# Name of your bot is {0.user} #'.format(client))
    print('###################################\n')


@client.event
async def on_message(message):
    if message.author != client.user:
        request = send_request(message)
        message_for_user = " \n ".join(request)
        log_messages(message, message_for_user)
        await message.channel.send(message_for_user)


def log_messages(message, message_for_user):
    print(message.author, ':', message.content)
    print(client.user, ':', message_for_user)


def send_request(message):
    author = str(message.author)

    header = {'Content-Type': 'application/json'}
    data = '{"sender": "' + author + '","message": "' + message.content + '","metadata": {}}'

    response = requests.post(SERVER_ADDRESS, headers=header, data=data)
    messages = json.loads(response.content)
    return [message['text'] for message in messages]


client.run(DISCORD_KEY)
