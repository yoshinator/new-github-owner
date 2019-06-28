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
            })
            .catch(e => {
                console.log("ERROR at getValues line 8")
            })
            
    }

    function callGithub(username, organization, token){
        axios.get(`https://api.github.com/users/${username}/repos?page=$page&per_page=1`)
        .then(response => {
                updateGithub(response.data, username, organization, token)
        })
        .catch(e =>{
            console.log("ERROR at callGitHub function see line 32",e)
        }) 
    }

    function updateGithub(repos, username, organization, token){
        for (repo of repos) {

            axios({
                method: 'post',
                url: `https://api.github.com/repos/${username}/${repo.name}/transfer`,
                headers: { 'Accept': 'application/vnd.github.nightshade-preview+json', 'Authorization': `token ${token}`},
                data: { "new_owner": organization}
            })
                .then(function (response) {
                    console.log("Moved repo: ",response.data.name, " \nto  ", organization)
                })
                .catch(e => {
                    console.log("ERROR at updateGithub line 46", e)
                });
        }    
    }

module.exports = getValues
