const {exec} = require('child_process')
const fs = require('fs');
const path = require('path');
// const links = fs.readFileSync('./git-links.txt').toString().split('\n');
// simple txt file with comma separted links

const links = [
    'https://github.com/vercel/next.js',
    'https://github.com/vercel/next.js/tree/canary/examples/with-typescript',
    'https://github.com/vercel/next.js/tree/canary/examples/with-apollo',
];

(async function() {
    const result = await Promise.allSettled(
        links.map(link => {
            if (link){
                return new Promise((res, rej) => {
                    console.log(path.join(__dirname, link.slice(link.lastIndexOf('/'))))
                    // i can skip last two cmds if i want to just clone array 
                    exec(`git clone ${link} && cd ${path.join(__dirname, link.slice(link.lastIndexOf('/'), link.length))} && git checkout develop`, {
                        timeout: 20000
                    },(err, out, serr) => {
                        if (err) {
                            console.log(`Error: ${err}`)
                            rej(err)
                        }
    
                        console.log(serr)
                        console.log(out);
                        res({
                            serr,out
                        })
                    })
                })
            }
            return Promise.resolve()
        })
    )
    console.log(result);
})()