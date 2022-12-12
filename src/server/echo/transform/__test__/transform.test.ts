import { Content, transform, Transformer } from '../transform'

const t = (input: string) => input
const pre = (input: Content) => input
const post = (input: Content) => input
const tool: Transformer = { t, pre, post }

describe('transform', () => {
  const spyT = jest.spyOn(tool, 't')
  const spyPre = jest.spyOn(tool, 'pre')
  const spyPost = jest.spyOn(tool, 'post')

  const reset = () => {
    spyT.mockClear()
    spyPre.mockClear()
    spyPost.mockClear()
  }

  it('number', () => {
    reset()

    const num = 9
    const ret = transform(num, [tool])
    expect(ret).toStrictEqual(num)

    expect(spyT).not.toBeCalled()
    expect(spyPre).not.toBeCalled()
    expect(spyPost).not.toBeCalled()
  })
  it('string', () => {
    reset()

    const str = 'hello'
    const ret = transform(str, [tool])
    expect(ret).toStrictEqual(str)

    expect(spyT).toBeCalledTimes(1)
    expect(spyPre).not.toBeCalled()
    expect(spyPost).not.toBeCalled()
  })

  it('empty array', () => {
    reset()

    const array = []
    const ret = transform(array, [tool])
    expect(ret).toStrictEqual(array)

    expect(spyT).not.toBeCalled()
    expect(spyPre).not.toBeCalled()
    expect(spyPost).not.toBeCalled()
  })
  it('number array', () => {
    reset()

    const array = [1, 2, 3]
    const ret = transform(array, [tool])
    expect(ret).toStrictEqual(array)

    expect(spyT).not.toBeCalled()
    expect(spyPre).not.toBeCalled()
    expect(spyPost).not.toBeCalled()
  })
  it('string array', () => {
    reset()

    const array = ['a', 'b', 'c']
    const ret = transform(array, [tool])
    expect(ret).toStrictEqual(array)

    expect(spyT).toBeCalledTimes(3)
    expect(spyPre).not.toBeCalled()
    expect(spyPost).not.toBeCalled()
  })

  it('empty object', () => {
    reset()

    const obj = {}
    const ret = transform(obj, [tool])
    expect(ret).toStrictEqual(obj)

    expect(spyT).not.toBeCalled()
    expect(spyPre).toBeCalledTimes(1)
    expect(spyPost).toBeCalledTimes(1)
  })
  it('object contains string', () => {
    reset()

    const obj = { text: 'hello' }
    const ret = transform(obj, [tool])
    expect(ret).toStrictEqual(obj)

    expect(spyT).toBeCalledTimes(1)
    expect(spyPre).toBeCalledTimes(1)
    expect(spyPost).toBeCalledTimes(1)
  })
  it('object contains string array', () => {
    reset()

    const obj = { texts: ['a', 'b', 'c'] }
    const ret = transform(obj, [tool])
    expect(ret).toStrictEqual(obj)

    expect(spyT).toBeCalledTimes(3)
    expect(spyPre).toBeCalledTimes(1)
    expect(spyPost).toBeCalledTimes(1)
  })
  it('object contains number array', () => {
    reset()

    const obj = { nums: [1, 2, 3] }
    const ret = transform(obj, [tool])
    expect(ret).toStrictEqual(obj)

    expect(spyT).not.toBeCalled()
    expect(spyPre).toBeCalledTimes(1)
    expect(spyPost).toBeCalledTimes(1)
  })
  it('nested object', () => {
    reset()

    const obj = {
      o: {
        texts: ['a', 'b', 'c'],
        nums: [1, 2, 3],
      },
      text: 'hello',
    }
    const ret = transform(obj, [tool])
    expect(ret).toStrictEqual(obj)

    expect(spyT).toBeCalledTimes(4)
    expect(spyPre).toBeCalledTimes(2)
    expect(spyPost).toBeCalledTimes(2)
  })
  it('object array', () => {
    reset()

    const array = [
      { text: 'hello' },
      { texts: ['a', 'b', 'c'] },
      { o: { text: 'hello' } },
    ]
    const ret = transform(array, [tool])
    expect(ret).toStrictEqual(array)

    expect(spyT).toBeCalledTimes(5)
    expect(spyPre).toBeCalledTimes(4)
    expect(spyPost).toBeCalledTimes(4)
  })
})
