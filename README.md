# Discord Rich-Presence for SoundCloud

**[STAND-ALONE INSTALLER](https://github.com/riverrrrrr/discord-soundcloud/releases)** *(~42mb)*                                     
*Just run the installer and it will add a shortcut to your desktop. It will install to AppData/Local/Programs*              

**NOTE -** 
- This is not an extension, it is a seperate browser for SoundCloud. Check preview below.
- Currently, the app refreshes your status every 10-15 seconds, which means when you switch songs it may not change instantly. This is not a bug, **_this is a feature_**

**KNOWN BUGS**
- Right now the remaining time will not change if you skip around in a song. We are working on this right now.
- Not having your SoundCloud language set to English will cause the application to keep your status stuck on "Currently Browsing"

**SETUP FOR DEVS ON WINDOWS -** Clone and navigate to the directory in CMD and run 
```npm install```
then
```npm start``` _(node.js required)_
 
**MAC INSTRUCTIONS -** Currently, there is no executable that is compatible with Mac. Although if you're tech savvy, you can clone the repository and run it using the instructions provided below for devs, just make sure you run Terminal instead of CMD :) 
 
**PREVIEW**                                            
![alt text](https://i.imgur.com/BQSEBIs.png)                                            
_Feel free to add me if you have any questions @ Son#1118_

This app was made with Electron so it will launch as it's own window seperate from the browser 
![alt text](https://i.imgur.com/YGXUuvo.png) 


**PLANNED FEATURES**
- Song art support - As it stands now, there is no possible way to achieve this with what's been offered to developers
- Song progress bar - I got one of my high-IQ boys back home working on this feature as we speak
- Listen with friends - Again, this is currently not possible, although there is still hope for the future
- Song permalink - Either have the image or song name an actual link to the song
- Change "Playing" to "Listening to"
