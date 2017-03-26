const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const path = require("path");
const url = require("url");

const Menu = electron.Menu;

let mainWindow;

const template = [
	{label: "Quit",
	click: function(){
		app.quit();
	}},
	{role: "toggledevtools"},
	{role: "togglefullscreen"}
];
const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);

function createWindow(){
	mainWindow = new BrowserWindow({width: 800, height: 600, autoHideMenuBar:true});
	mainWindow.loadURL(url.format({
		pathname: path.join(__dirname, "RepeatersFor.html"),
		protocol: "file:",
		slashes: true
	}));
	mainWindow.on("closed", function(){
		mainWindow = null;
	});
}
app.on("ready", createWindow);
app.on("window-all-closed", function(){
	app.quit();
});
app.on("activate", function(){
	if(mainWindow === null){
		createWindow();
	}
});
