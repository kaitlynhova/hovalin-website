# Hovalin website 1.0

This is the main website for our Hovalin project.

For more information about the project, [__please visit it live__](http://www.hovalin.com/).

### Setting up your dev environment
#### (Note: these instructions are for Linux and OS X)
Install Node. My personal favorite way of installing and managing node is with NVM (Node Version Manager).  
Copy this script into your terminal
```
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.0/install.sh | bash
```

Now we're going to run a few steps to get NVM up and running.  
**Copy and paste** the code below into your terminal. It will do the following:
- Set nvm to run whenever you open a terminal
```
sudo echo ". ~/.nvm/nvm.sh" >> ~/.bashrc
```
- Run nvm for this terminal window instance
```
. ~/.nvm/nvm.sh
```
- Download your favorite version of Node. For this project, we will be using Node V5.10  
```
nvm install v0.12
nvm alias default v0.12
```

As of now, the dev environment is only a Sass compiler and a file server. To download the required tools, type:  
```
npm install
```

Okay, all the tough stuff is done.
To run our server type:  
```
npm start
```

## Set up remotes

```

git remote add staging https://git.heroku.com/hovalin-staging.git

git remote add production https://git.heroku.com/hovalin.git

```

Go to [localhost:8080](http://localhost:8080) to check out the site!
