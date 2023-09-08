# Adenochat

[![Deno Lint](https://github.com/rufasterisco/denochat/actions/workflows/dino-lint.yaml/badge.svg)](https://github.com/rufasterisco/denochat/actions/workflows/dino-lint.yaml)
A real time chat built using deno fresh

## 🚀️ Install and run

`./start.sh`

This will pull the mongo image and build the deno one.
You might see errors in the log if the deno image builds before mongo is pulled: it is cyclically trying to connect.
Once it's started you will see a message with the address to paste in your browser

## 📖 Requirements

Create a small single-page Real-time Chat Application where anonymous users can send messages to a shared text board without prior registration.

* Real time chat
* The application should be containerized using Docker
* Use a NoSQL database to store the sent messages.
* Use Denoland’s Fresh framework and any other libraries of your choice.
* The application should be able to handle multiple users sending messages simultaneously.
* Use GitHub Actions to automatically lint the code on push.

## 🍬 Additional features

**📱 QR code for connecting from a mobile device**

* Only MacOS (tested) and Linux (untested)
* Both should be connected to the same WIFI

I wanted to try it from my phone, and thought you might want too.

**🕐 Timestamps**

* Just now
* 2 minutes ago
* 55 minutes ago
* Today at XX:XX
* Yesterday at XX:XX
* Aug 30 at XX:XX

Standard messanger behaviour, would we weird not to find it

**🗽 Icons as users**

* Each new session (other browser or private session) gets a new emoji, stored locally
* Makes each message in the conversation recognizable
* Without it feels like a todo list

**❌ Delete chat button**

Useful for development, did not feel like throwing it away

## 📐 Design decisions

Part of the challenge was to test an unknown framework and setup, and [I found out that Deno Fresh wants as little work as possible to be done in the frontend](https://https://fresh.deno.dev/docs/concepts/architecture).

Their route implementation makes it straighforward to

* POST to /index
* add the message to the db in the handler
* redirect to the GET
* all messages (including the new one) are refetched and shown

It works perfectly when loading from a new browser: all the messages are immediately shown.

Different componantes are used to organize code in the page, including islands for interactivity.

These are used to :

* pick a random emoji as display name, it's stored in localstorage
* pass the emoji together with the message
* scroll to last message when the page is (re)loaded

Finally, I've used websockets to let other users know that a new message is arrived.

I've opted for just refereshing the page, since that's following the overall design decision. I could have decided to pass the message itself using websocket and append it to the list, and that would have cut down the numbr and size of data in transit, but I felt this was against the framework principles. I could still do it, if you want me to.

**Challenges Encountered**

* Lack of mongo libraries
* Lack of wesocket libraried
* Getting the IP across many OS implementations is not straighforward

## Cleanup

Remember to delete the docker images!!
