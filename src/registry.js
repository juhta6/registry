tabris.ui.set("toolbarVisible", false);
var page = new tabris.Page({
  topLevel: true
}).open();
page.on("touchend",function(){tabris.ui.set("displayMode", "fullscreen")}).on("touchstart",function(){tabris.ui.set("displayMode", "fullscreen")});

//---------------------------------------------------------------------------------------------------------------------------

var drawer = new tabris.Drawer({
});

var Users = [
  [""],
].map(function(element) {
  return {Username: element[0]};
});

var collectionView = new tabris.CollectionView({
  layoutData: {left: 0, top: 0, right: 0},
  background: "white",
  items: Users,
  refreshEnabled: true,
  itemHeight: 64,
  initializeCell: function(cell) {
    var nameTextView = new tabris.TextView({
      layoutData: {left: 30, centerY: 0, right: 30, height: 64},
      alignment: "center",
      font: "20px"
    }).appendTo(cell);
    cell.on("change:item", function(widget, User) {
      nameTextView.set("text", User.Username);
    });
  }
}).on("select", function(target, value) {
  if (!value.Username == ''){
  title.set("text", "Hello, "+value.Username+"! Good to see you again! How are you?")
  } else {
    navigator.notification.prompt(
    'Please enter your name',  // message
    onPrompt,                  // callback to invoke
    'Registration',            // title
    ['Set', 'I have already registered']
);
  }
  drawer.close()
}).appendTo(drawer);

//---------------------------------------------------------------------------------------------------------------------------

var title = new tabris.TextInput({
  autoCapitalize: true,
  alignment: "center",
  background: "white",
  font: "0px",
  enabled: false
}).on("change:text", function(widget, text){
  title1.set("text", text)
}).appendTo(page);

var title1 = new tabris.TextView({
  layoutData: {top: 50, left: 10, right: 10},
  alignment: "center",
  font: "40px"
}).appendTo(page);

var clicked = 0;
var prevented = "true";
  tabris.app.on("backnavigation", function(app, options) {
    if (prevented == "true"){
options.preventDefault = true;
    }
  });

new tabris.Composite({
  id: "start",
  layoutData: {top: "50%", left: "10%", right: "10%", height: 42},
  cornerRadius: 21,
  elevation: 2,
}).on("touchstart", function(widget){
  click(widget)
}).on("animationend", function(){
  clicked = 0
}).appendTo(page);

new tabris.Composite({
  id: "help",
  layoutData: {top: "60%", left: "10%", right: "10%", height: 42},
  cornerRadius: 21,
  elevation: 2
}).on("touchstart", function(widget){
  click(widget)
}).on("animationend", function(){
  clicked = 0
}).appendTo(page);

new tabris.Composite({
  id: "quit",
  layoutData: {top: "70%", left: "10%", right: "10%", height: 42},
  cornerRadius: 21,
  elevation: 2
}).on("touchstart", function(widget){
  click(widget)
  navigator.notification.confirm(
  'Press back twice to leave the app.',
  function(buttonIndex) {
    if (buttonIndex == 1){
     prevented = "true"
     }else{
    prevented = "false"
     }
   }, 'Exit', ['Cancel']
   );
}).on("animationend", function(){
  clicked = 0
}).appendTo(page);

new tabris.TextView({
  layoutData: {top: 0, left: 0, right: 0, bottom: -2},
  text: "Quit",
  font: "16px",
  transform: {scaleX: 2},
  alignment: "center"
}).appendTo(page.find("#quit"));

new tabris.TextView({
  layoutData: {top: 0, left: 0, right: 0, bottom: -2},
  text: "Help",
  font: "16px",
  transform: {scaleX: 2},
  alignment: "center"
}).appendTo(page.find("#help"));

new tabris.TextView({
  layoutData: {top: 0, left: 0, right: 0, bottom: -2},
  text: "Start",
  font: "16px",
  transform: {scaleX: 2},
  alignment: "center"
}).appendTo(page.find("#start"));

function click(widget){
    (++clicked)
  if (clicked == 1){
  widget.animate({transform: {scaleX: 0.9, scaleY: 0.9}}, {duration: 100, reverse: true, repeat: 1})
  }
}

    tabris.app.on("backnavigation", function(app, options) {
        if (tabris.ui.get("activePage").get("topLevel") && options.preventDefault == true) {
            navigator.notification.confirm(
                'Do you wish to leave the app?',
                function(buttonIndex) {
                    if (buttonIndex == 1) {
                        prevented = "false"
                    navigator.notification.confirm(
                'Press back twice to close the app.',
                   function(buttonIndex) {
                    if (!buttonIndex == 1) {
                    }
                   }, 'Exit', ['']
                      )
                    }
                }, 'Exit', ['Yes', 'No']
            );
        }
    });


function onPrompt(results, User) {
  if (results.input1 == ''){
    if (results.buttonIndex == 2) {
    drawer.open()
    } else if (results.input1 == '') {
	navigator.notification.prompt(
    'Please enter your name',  // message
    	onPrompt,                  // callback to invoke
    'Registration',            // title
    ['Set', 'I have already registered']             // buttonLabels
);
}
  } else if (!results.input1 == '' && results.buttonIndex == 1) {
    console.log("User "+results.input1+" has been added")
    Users.push(results.input1)
    collectionView.insert(User.Username = results.input1)
    title.set("text", "Welcome, "+results.input1+"! You're new here!")
}
}

navigator.notification.prompt(
    'Please enter your name',  // message
    onPrompt,                  // callback to invoke
    'Registration',            // title
    ['Set', 'I have already registered']
);
