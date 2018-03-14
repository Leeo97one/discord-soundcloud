const {BrowserWindow, app} = require('electron');
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
        autoHideMenuBar: true,
        resizable: true,
        center: true,
        frame: true,
        alwaysOnTop: false,
        title: 'SoundCloud',
        icon: __dirname + '/logo.ico',
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
 
async function checkSoundCloud() {

    if (!rpc || !mainWindow) return;
    
    let infos = await mainWindow.webContents.executeJavaScript(getInfos);
    
    

    if (infos) { // if !infos don't change presence then.
        let {songName, author, avatar, progress} = infos;
        
        if (avatar) smallImageKey = avatar;
        
        rpc.setActivity({
            details: songName,
            state: author
            ? `by ${author}` 
            : author,
            largeImageKey: 'soundcloud',
            smallImageKey,
            instance: false,
        });
    }
}

rpc.on('ready', () => {
    checkSoundCloud();
    setInterval(() => {
        checkSoundCloud();
    }, 15E3);
});

app.on('ready', () => {
    mainWindow = new BrowserWindow(WindowSettings);
    mainWindow.maximize();
    mainWindow.loadURL("http://www.soundcloud.com/");
    login();
});

app.on('window-all-closed', app.quit);
app.on('before-quit', () => {
    mainWindow.removeAllListeners('close');
    mainWindow.close();
});