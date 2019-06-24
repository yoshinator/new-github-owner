const waitForUserInput = require('wait-for-user-input');
const axios = require('axios');

waitForUserInput("whats your github username?")
.then(userInput => {
    let username = userInput
    waitForUserInput('What organization do you want to transfer your repos to?')
    .then(userInput => {
        let organization = userInput
        callGithub(username, organization)
    })
})

function callGithub(username, organization){
    axios.get(`https://api.github.com/users/${username}/repos?page=$page&per_page=2`)
        .then(response => {
                updateGithub(response.data, username, organization)
            })
    
}

function updateGithub(repos, username, organization){
    for (repo of repos) {
        console.log(repo.name)

        axios({
            method: 'post',
            url: `https://api.github.com/repos/${username}/${repo.name}/transfer`,
            headers: { 'Accept': 'application/vnd.github.nightshade-preview+json'},
            data: { "new_owner": organization}
        })
            .then(function (response) {
                response.data.pipe(fs.createWriteStream('ada_lovelace.jpg'))
            });
    }    
}