import * as core from '@actions/core';
import * as exec from '@actions/exec';
import * as io from '@actions/io';
// import path from 'path';
// import fs from 'fs';

const main = async (): Promise<void> => {
    const token = core.getInput('token');
    const home = process.env['HOME'];
    let infoOutput = '';
    let errorOutput = '';
    if (token === undefined || home === undefined) {
        core.error('Token not found.');
    } else {
        // const tokenDir = path.join(home, 'temp', 'setup_gh_cli');
        // await io.mkdirP(tokenDir);
        // const tokenFile = path.join(tokenDir, 'token.txt');
        // fs.writeFileSync(tokenFile, token, 'utf8');
        const options: exec.ExecOptions = {
            listeners: {
                stdout: (data: Buffer) => {
                    infoOutput += data.toString();
                },
                stderr: (data: Buffer) => {
                    errorOutput += data.toString();
                }
            },
            input: Buffer.from(token),
        };
        await exec.exec('gh', ['auth', 'login', '--with-token'], options);
    }
    core.info(`Standard output: ${infoOutput}`);
    core.info(`Error output: ${errorOutput}`);
}

main();