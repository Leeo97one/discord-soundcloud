const {BrowserWindow, app, Menu} = require('electron');
const {Client} = require('discord-rpc');
const widevine = require('electron-widevinecdm');
const rpc      = new Client({transport: 'ipc'});


widevine.load(app);

let appID = '423329180227338240',
    mainWindow,
    smallImageKey,
    start, end,
    WindowSettings = {
        backgroundColor: '#FFF',
        useContentSize: false,
       // autoHideMenuBar: false,
        resizable: true,
        center: true,
        frame: true,
        alwaysOnTop: false,
        title: 'SoundCloud',
        icon: __dirname + '/build/logo.ico',
        webPreferences: {
            nodeIntegration: false,
            plugins: true,
        },
    },
    login = (tries = 0) => {
        if (tries > 10) return mainWindow.webContents.executeJavaScript(connectionNotice);
        tries += 1;
        rpc.login(appID).catch(e => setTimeout(() => login(tries), 10E3));
    },
    getInfos = `(function() {
        
        if(document.querySelector('.playControl').getAttribute('title') == "Pause current") {
            return {
                songName    : document.querySelector('.playbackSoundBadge__titleLink').getAttribute('title'),
                author   : document.querySelector('.playbackSoundBadge__lightLink').getAttribute('title'),
            }
        }
        else {
            return {
                songName  : 'Currently browsing',
            }
        }

    })()`;

var startTimestamp = undefined;
var tempSong = undefined; 

async function checkSoundCloud() {

    if (!rpc || !mainWindow) return;
    
    let infos = await mainWindow.webContents.executeJavaScript(getInfos);
    
    
    if (infos) { // if !infos don't change presence then.
        let {songName, author} = infos;
        
        if (songName == "Currently browsing") {
            startTimestamp = undefined;
        }
        
        if (tempSong != songName) {
            tempSong = songName;
            startTimestamp = new Date();
        }

       
        
        rpc.setActivity({
            details: songName,
            state: author
            ? `by ${author}` 
            : author,
            startTimestamp: author
            ? startTimestamp 
            : undefined,
            largeImageKey:'soundcloud',
            largeImageText: songName,
            instance: false,
        });
    }
}

rpc.on('ready', () => {
    checkSoundCloud();
    setInterval(() => {
        checkSoundCloud();
    }, 5E3);
});








app.on('ready', () => {
    mainWindow = new BrowserWindow(WindowSettings);
    mainWindow.maximize();
    mainWindow.loadURL("http://www.soundcloud.com/");
    // build menu from template
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    // insert menu
    Menu.setApplicationMenu(mainMenu);
    login();
});

app.on('window-all-closed', app.quit);
app.on('before-quit', () => {
    mainWindow.removeAllListeners('close');
    mainWindow.close();
});

// create menu template
const mainMenuTemplate = [
    {
        label: 'Navigation',
        submenu: [
            {
                label: 'Go Back',
                accelerator: process.platform == 'darwin' ? 'Command+Left' : 'Ctrl+Left',
                click(){
                    pageGoBack();
                }
            },
            {
                label: 'Go Foward',
                accelerator: process.platform == 'darwin' ? 'Command+Right' : 'Ctrl+Right',
                click(){
                    pageGoForward();
                }
            },
            {
                label: 'Refresh',
                accelerator: process.platform == 'darwin' ? 'Command+R' : 'Ctrl+R',
                click(){
                    pageRefresh();
                }
            },
            {
                label: 'Quit',
                accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
                click(){
                    app.quit();
                }
            }
        ]
    }
];

// handle window back
function pageGoBack() {
    contents = mainWindow.webContents;
    contents.goBack();
}

// handle window foward
function pageGoForward() {
    contents = mainWindow.webContents;
    contents.goForward();
}

// handle window foward
function pageRefresh() {
    contents = mainWindow.webContents;
    contents.reload();
}