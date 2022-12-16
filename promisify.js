module.exports = function promisify(fn, hasCallback=true){
    console.log('>', typeof fn)

    if(typeof fn !== 'function') {
        return 'invalid'
    }

    return function(...args) {

        if(hasCallback) {
            return new Promise((resolve, reject)=>{
                fn(...args, (error, response)=>{
                    if(error) {
                        reject(error)
                    }else {
                        resolve(response)
                    }
                })
            })
        } else {
            return new Promise((resolve, reject)=>{
                try {
                    resolve(fn(...args))
                }catch(e) {
                    reject(e)
                }
            })
        }
    }
}
