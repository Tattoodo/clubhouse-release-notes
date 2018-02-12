Clubhouse release notes generator

With thisa tiny react app you can generate the release notes from git in a format refeerring to all the cirrect clubhouse tickets, ready to paste into the github PR for releases.

Start the server with

```
env REACT_APP_CLUBHOUSE_API_TOKEN={YOUR CLUBHOUSE API TOKEN HERE} npm start
```

(you can find your clubhouse token in 'your settings' logged into clubhouse)

Then you should be able to go to the server. Since this app can be used offline, starting the server on a port you are not using, hit it once, and then you can run the app offline (without your server running)
