function waitForUserInput(text) {
    return new Promise((resolve, reject) => {
        process.stdin.resume()
        process.stdout.write(text)
        process.stdin.once('data', data => resolve(data.toString().trim()))
        process.stdin.once('error', reject)
    })
}

waitForUserInput("whats your github username?")
.then(userInput => {
    let username = userInput
    waitForUserInput('What organization do you want to transfer your repos to?')
    .then(userInput => {
        let organization = userInput
        fetch(`https://api.github.com/users/${username}/repos?page=$page&per_page=2`)
        .then(response => {
            console.log(response)
            callGithub(username, organization, reponse)
        })
    })
})

function callGithub(username, organization){
    console.log(username, organization, response)
    // fetch(`https://api.github.com/repos/${username}/:repo/transfer`)
}