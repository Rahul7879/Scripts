const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const reposDirectory = __dirname.toString();

const repos = [
    'repo-name-01',
    'repo-name-02',
    'repo-name-03',
    'repo-name-04',
    'repo-name-05'    
]

const pullDevelop = (repo) => {
    return new Promise((resolve, reject) => {
        const repoPath = path.join(reposDirectory, repo);
        console.log(`Pulling in: ${repoPath}`); 
        // check which branch is currently checked out
        // in which branch we want to pull
        exec('git pull origin develop --rebase', { cwd: repoPath }, (error, stdout, stderr) => {
            console.log(repo)
            if (error) {
                reject(`Error pulling ${repo}: ${stderr}`);
            } else {
                resolve(`Pulled from develop in ${repo}: ${stdout}`);
            }
        });
    });
};

const pullPromises = repos.map(repo => pullDevelop(repo));

Promise.all(pullPromises)
    .then(results => {
        results.forEach(result => console.log(result));
    })
    .catch(error => {
        console.error(error);
    });


    