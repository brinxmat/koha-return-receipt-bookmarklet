# koha-return-receipt-bookmarklet
A bookmarklet for generating receipts for manually returned items

If you want a receipt for manually returned loans in Koha — and let's face it, who doesn't — you're going to have to make do with a shoddy printout on A4. If you're on a kiosk-based solution like us, this cuts no mustard. Thus, here's a snappy bookmarklet that creates a nicely formatted plain-text representation of for printing on receipt printers.

##What is a bookmarklet?
A bookmarklets are bookmarks that hide executable javascript snippets that do things in your webbrowser. This should sound a bit worrying. We're using them for good here. Honest.

##Building

You've got two choices:

###Simple, manual:
- copy code in ```src/main.js```
- google "simple bookmarklet creator", click a link
- follow instructions

###Build with node
- open a terminal
- install node and npm if you don't have them
- clone the project
- cd into the project
- type ```make```

This produces two files in the build directory: index.html and index.js; the first can be opened in a webbrowser and you can follow the instructions for installation there (you can edit the bookmark name too); the contents of the second file can be copied and pasted into a new bookmark and your desired name for the bookmark can be entered.

##Caveats

- Tested with Chrome as this is our kiosk tool
- Will break at some point and need updating
- Norwegian text as the bookmarklet title