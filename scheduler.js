function runTask(awaitTime) {
    return new Promise((resolve)=>{
        const time = awaitTime * 400
        setTimeout(()=> resolve(time), time)
    })
}

const run = async () => {

    let registeredCounter = 0
    const finishedIds = []
    const formatedResult = []

    const wrapFinishCounter = async (fn, taskId, awaitTime) => {
        await fn(awaitTime)

        registeredCounter++
        
        let hasSomeGreater = false
        for(const id of finishedIds) {
            if(id > taskId) hasSomeGreater = true
        }

        console.log(`task ${taskId} done.`);
        console.log('>', hasSomeGreater);
        
        if(finishedIds.length === 0) {
            formatedResult.push(0)
        } else if (!hasSomeGreater) {
            formatedResult.push(taskId)
        } else {
            formatedResult.push(-1)
        }

        finishedIds.push(taskId)
    }

    await Promise.all([
        wrapFinishCounter(runTask, 0, 0),
        wrapFinishCounter(runTask, 1, 2),
        wrapFinishCounter(runTask, 2, 1),
        wrapFinishCounter(runTask, 3, 3),
    ])

    console.log('................');
    console.log('Final order:', finishedIds);
    console.log('Result:', formatedResult);

}

run()