function runTask(maxRandomMs=100) {
    return new Promise((resolve)=>{
        const time = Math.floor(Math.random() * maxRandomMs)
        setInterval(()=>{
            resolve(time)
        }, time)
    })
}

const run = async () => {

    const finishedIds = []
    const formatedResult = []

    const wrapFinishCounter = async (fn, taskId) => {
        await fn()
        let counter = 0
        for(const id of finishedIds) {
            if(id < taskId) counter++
        }

        if(finishedIds.length === 0) {
            formatedResult.push(0)
        } else if (counter + 1 === taskId) {
            formatedResult.push(taskId)
        } else {
            formatedResult.push(-1)
        }

        finishedIds.push(taskId)
    }

    await Promise.all([
        wrapFinishCounter(runTask,1),
        wrapFinishCounter(runTask,2),
        wrapFinishCounter(runTask,3),
        wrapFinishCounter(runTask,4),
        wrapFinishCounter(runTask,5),
        wrapFinishCounter(runTask,6),
        wrapFinishCounter(runTask,7),
    ])

    console.log('................');
    console.log('Final order:', finishedIds);
    console.log('Result:', formatedResult);

}

run()