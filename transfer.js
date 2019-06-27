// const waitForUserInput = require('wait-for-user-input');
"b8f490eb1acb7708dce476b4365ffdd4e73f284d"

const axios = require('axios');
const inquirer = require('inquirer')

function getValues(){
    inquirer
        .prompt([
            {
                message: "Please provide your github username",
                name: "username"
            },
            {
                message: "What is the organization you would like to transfer",
                name: "organization"
            },
            {
                message: "What is your github authorization key \n you can get one at: \n  https://github.com/settings/tokens/new \n please select repo and organization when creating token",
                name: "token"
            }

        ])
        .then(answers => {
            callGithub(answers.username, answers.organization, answers.token)
        });
}

function callGithub(username, organization, token){
    axios.get(`https://api.github.com/users/${username}/repos?page=$page&per_page=20`)
        .then(response => {
                console.log()
                updateGithub(response.data, username, organization, token)
            })
    
}

function updateGithub(repos, username, organization, token){
    for (repo of repos) {
        console.log(repo.name)

        axios({
            method: 'post',
            url: `https://api.github.com/repos/${username}/${repo.name}/transfer`,
            headers: { 'Accept': 'application/vnd.github.nightshade-preview+json', 'Authorization': `token ${token}`},
            data: { "new_owner": organization}
        })
            .then(function (response) {
                console.log("Moved repo: ",response.data.name, " \nto  ", organization)
            });
    }    
}

getValues()