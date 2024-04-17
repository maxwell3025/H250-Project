import { exec } from "child_process"

async function execPromise(cmd: string): Promise<{
    error: number,
    stdout: string,
    stderr: string
}>{
    return new Promise((resolve) => {
        exec(cmd, (error, stdout, stderr) => {
            resolve({
                error: error?.code ?? 0,
                stdout,
                stderr,
            })
        })
    });
};

const targetPath = process.env.TARGET ?? "quine.ts";
const targetFile = Bun.file(targetPath);

const originalText = await targetFile.text();

const SCRATCHPAD_FILE = "temp.ts";
for(let i = 0; i < originalText.length; i++){
    const mutant = originalText.substring(0, i) + originalText.substring(i + 1, originalText.length);
    await Bun.write(SCRATCHPAD_FILE, mutant, {
        createPath: true
    });
    const result = await execPromise(`bun run ${SCRATCHPAD_FILE}`)
    let passes = 0;
    let fails = 0;
    if(result.error === 0){
        if(result.stdout === originalText){
            passes++;
            console.log(mutant);
            console.log("=======================================================");
        } else {
            fails++;
        }
    }
    console.log(passes, fails);
}



