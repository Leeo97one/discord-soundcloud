# Discord Rich-Presence for SoundCloud

**PREVIEW**                                            
![alt text](https://i.imgur.com/h424T5I.png) ![alt text](https://i.imgur.com/1zAgvPG.png) ![alt text](https://i.imgur.com/Az7mghi.png)

**[STAND-ALONE INSTALLER](https://github.com/riverrrrrr/discord-soundcloud/releases)** *(~42mb)*                                     
*Just run the installer and it will add a shortcut to your desktop. It will install to AppData/Local/Programs*              

**NOTE -** 
- This is not an extension, it is a seperate browser for SoundCloud. Check preview below.
- The app refreshes your status every 10-15 seconds, which means when you switch songs it may not appear to change instantly. This is not a bug.

**KNOWN BUGS**
- Not having your SoundCloud language set to English will cause the application to keep your status stuck on "Currently Browsing"

**SETUP FOR DEVS ON WINDOWS -** Clone and navigate to the directory in CMD and run 
```npm install```
then
```npm start``` _(node.js required)_
 
**MAC INSTRUCTIONS -** Currently, there is no executable that is compatible with Mac. Although if you're tech savvy, you can clone the repository and run it using the instructions provided below for devs, just make sure you run Terminal instead of CMD :) 
 
   
This app was made with Electron so it will launch as it's own window seperate from the browser 
![alt text](https://i.imgur.com/YGXUuvo.png) 


**PLANNED FEATURES**
- Song art support - As it stands now, there is no possible way to achieve this with what's been offered to developers
- Song progress bar - I got one of my high-IQ boys back home working on this feature as we speak
- Listen with friends - Again, this is currently not possible, although there is still hope for the future
- Song permalink - Either have the image or song name an actual link to the song
- Change "Playing" to "Listening to"
