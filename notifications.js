var intervalHandle;
function createComponents() {
    let componentsHTML='<div>\
        <button id="changeNotification" onclick="changeNotification()">Enable notifications</button>\
        <input id="serverName" type="text" placeholder="server e.g. [eu-free-2]" size="30">\
        <input id="boxName" type="text" placeholder="Machine (case sensitive)" size="30">\
        </div>';
    $("div.panel-footer").append(componentsHTML);
}

function checkShoutbox() {
  let validAlerts=$( "p" ).children( "span.text-danger" ).filter( function(){
      return $(this).prop("innerText") == "reset" && $(this).prop("seen")==undefined &&
        // Filter server name
        $(this).siblings(".text-success").filter( function(){
            return $(this).prop("innerText") == $("#serverName").prop("value");
            }).length > 0 &&
        // Filter box name
        $(this).siblings(".c-white").filter( function(){
            return $(this).prop("innerText") == $("#boxName").prop("value");
            }).length > 0;
    });
  if(validAlerts.length>0){
      let text = 'Some mad lad is trying to reset "your" box.';
      let notification = new Notification('Box reset alarm', { body: text});
  }
  validAlerts.each(function(){$(this).prop("seen", "True");});
  
}

function enableAlerts(){
    intervalHandle=setInterval(checkShoutbox, 5000);
    $("#changeNotification").html("Disable notifications");
}
function disableAlerts(){
    clearInterval(intervalHandle);
    $("#changeNotification").html("Enable notifications");
}
function changeNotification() {
    if($("#changeNotification").prop("innerHTML")=="Enable notifications"){
        if(Notification.permission === 'denied' || Notification.permission === 'default'){
            askNotificationPermission();
            return;
        }
        enableAlerts();
    }
    else{
        disableAlerts();
    }
}

function askNotificationPermission() {
  // function to actually ask the permissions
  function handlePermission(permission) {
      // Callback called after user interacted with the permission dialog
    if(Notification.permission === 'denied' || Notification.permission === 'default') {
      $("#changeNotification").html("Enable notifications");
    } else {
      enableAlerts();
    }
  }

  // Let's check if the browser supports notifications
  if (!('Notification' in window)) {
    console.log("This browser does not support notifications.");
  } else {
    if(checkNotificationPromiseSupport()) {
      Notification.requestPermission()
      .then((permission) => {
        handlePermission(permission);
      })
    } else {
      Notification.requestPermission(function(permission) {
        handlePermission(permission);
      });
    }
  }
}

// Check if promises are supported
function checkNotificationPromiseSupport() {
    try {
      Notification.requestPermission().then();
    } catch(e) {
      return false;
    }

    return true;
  }

createComponents();