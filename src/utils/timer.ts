export const setTimer = async <T>(ms: number, task: () => T) => {
  return new Promise<T>((r) => {
    setTimeout(async () => {
      const ret = await task()
      r(ret)
    }, ms)
  })
}

export const sleep = async (ms: number) => setTimer<void>(ms, () => {})

export const randSleep = async (max: number) =>
  sleep(Math.floor(Math.random() * max))
