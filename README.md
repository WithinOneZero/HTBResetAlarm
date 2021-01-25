# HTBResetAlarm
JS which alerts you if someone's issued a reset to a specific machine and server on HackTheBox.

To use it, you go the the shoutbox page and copy to code into the browser console. By default it checks for resets every 5 seconds.

The script will also take care of enabling browser notifications for the shoutbox page in case you've never done that. If you deny the permission for notification by accident, you'll need to click on the icon near the HTTPS lock and remove the rule.

It should work on all recent browsers (not IE, you have bigger things to worry about if you use IE). On smartphone (why would you do that?) support is limited, check [here](https://developer.mozilla.org/en-US/docs/Web/API/Notifications_API/Using_the_Notifications_API#browser_compatibility) for details.
