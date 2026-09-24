# EuthyMe #
## Project Description ##
EuthyMe is a light-weight web-based mood and sleep tracker aimed at people with bipolar disorder.
## Deploy ##
The web-app based on the main branch can be found [here](https://euthymefrontend-aucze9f9awc8f5da.denmarkeast-01.azurewebsites.net/login). The main content is locked behind a login page, but accounts for access can be created on the page. 
## Known Issues ##
- The app currently lacks refresh tokens meaning as a user, you will experience frequent prompts to log in as your session expires.
- The functionality yo switch languages has yet to be implemented.
- Theme selections are tied to your account and thus, when logged out or otherwise unauthorized, the app will always default to light mode.
## Build Instructions ##
### Frontend ### 
- Navigate to the `/Frontend` folder and run `npm install`. This should install all required packages
- If you intend to run the project locally, you will need to create local development certifications. These need to be placed in a new folder, `/Frontend/certs` and configured in `/Frontend/vite.config.js`
- Set the environment variable VITE_BASE_URL to your local Backend URL.
### Backend ###
- Dependencies listed in the `.csproj` file should install automatically.
- Set up a Connection string to a local or remote SQLServer database in your secrets file. Suggested name for variable is `DefaultConnection`
- Set up your Frontend URL in your secrets file. Suggested name `FrontendUrl`
## Instructions to Run ##
- Ensure Frontend, Backend and Database are all running and that all steps in *Build Instructions* have been completed.
## Database Diagram ##
<img width="1808" height="1648" alt="image" src="https://github.com/user-attachments/assets/1ecb1dc2-18e9-49cb-9420-d474f6e217bb" />

## Figma Design Board ##
The design board is not very detailed, but it may be found [here](https://www.figma.com/design/nefxTXWTMwlupqll3vmKjz/EuthyMe?node-id=0-1&t=VOFzG17aBeSrR9ph-1)
## Contributors ##
This repo is created by Malin Hallgren
## Contribution Guidelines ##
This is a school project and will not accept contributions to the main repo. You are however free to fork the repo and build upon it, should you so wish.
