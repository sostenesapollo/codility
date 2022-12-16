function runTask(awaitTime) {
    return new Promise((resolve)=>{
        const time = awaitTime * 20
        setTimeout(()=> resolve(time), time)
    })
}

const run = async () => {

    let registeredCounter = 0
    let finishedPosition = 0
    const finishedPositionMap = new Map()
    const formatedResultMap = new Map()

    const wrapFinishCounter = async (fn, taskId, awaitTime) => {
        finishedPositionMap.set(taskId, null)
        formatedResultMap.set(taskId, null)
        registeredCounter++
        await fn(awaitTime)
        console.log(`task ${taskId} done.`);

        const hasSomeGreater = 
            Array.from(finishedPositionMap.entries())
                 .map(e=>e[0]).filter(id=>id<taskId)
                 .map(id=>finishedPositionMap.get(id) !== null)
                 .every(e=>e)
        
        if(registeredCounter === 0) {
            formatedResultMap.set(taskId, 0)
        } else if (hasSomeGreater) {
            formatedResultMap.set(taskId, taskId)
        } else {
            formatedResultMap.set(taskId, -1)
        }

        finishedPositionMap.set(taskId, finishedPosition)
        finishedPosition++
    }

    await Promise.all([
        wrapFinishCounter(runTask, 0, 0),
        wrapFinishCounter(runTask, 1, 2),
        wrapFinishCounter(runTask, 2, 1),
        wrapFinishCounter(runTask, 3, 3),
    ])

    console.log('Result:', Array.from(formatedResultMap).map(e=>e[1]));

}

run()