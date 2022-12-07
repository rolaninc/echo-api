import chromium from 'chrome-aws-lambda'
import puppeteer from 'puppeteer'
import { Types } from '../../utils/types'
import { BadRequest } from '../errors/bad-request'
import { getContrastHex, hexToRGB } from '../../utils/color'

/*
 /images/width/height?/hex<Background>_<Border>_<Text>?/label?.format?
 /images/256                      ... generate 256 x 256 jpg with default color
 /images/256/128                  ... generate 256 x 128 jpg with default color
 /images/256/128/hexf00           ... generate 256 x 128 jpg with red background color
 /images/256/128/hexf00/hello     ... generate 256 x 128 jpg with red background color and label "hello"
 /images/256/128/hexf00/hello.png ... generate 256 x 128 png with red background color and label "hello"
 so...
 /images/256.png                  ... generate 256 x 256 png with default color
 and...
 /images/256/hexf00_ff0_00f.png   ... generate 256 x 256 png with red background, yellow border and blue text color
*/

export type Input = {
  format: string
  width: number
  height: number
  colors: string[]
  label?: string
}

const supportedFormats = ['png', 'jpeg']

const parseFormat = (s: string) => {
  const components = s.split('.')
  if (components.length > 1) {
    let f = components[components.length - 1]!.toLowerCase()
    if (f === 'jpg') {
      f = 'jpeg'
    }
    return f
  }
  return undefined
}

const parseSize = (s: string) => {
  const n = +s
  if (Types.isNumber(n) && n > 0 && n <= 2048) {
    return n
  }
  return undefined
}

const parseHexColors = (s: string) => {
  if (s.startsWith('hex')) {
    return s
      .slice(3)
      .split('_')
      .map((c) => `#${c}`)
  }
  return []
}

const parseLabel = (s: string) => {
  if (s.length > 0) {
    return s.split('_').join(' ')
  }
  return undefined
}

export const parseParams = (params: string[]): Input => {
  // TODO: look for more efficient way...

  let ps = params
  if (!ps || !Types.isArray(ps) || ps.length === 0 || ps.length > 4) {
    throw new BadRequest(`unexpected parameters`)
  }

  // get format
  const f = parseFormat(ps[ps.length - 1]!)
  if (f) {
    if (!supportedFormats.includes(f)) {
      throw new BadRequest(`unexpected format`)
    }
    // cut format from last param
    const p = ps[ps.length - 1]!
    ps[ps.length - 1] = p.replace(/\.[^/.]+$/, '')
  }
  const format = f ?? 'jpeg'

  let height: number | undefined = undefined
  let colors: string[] = []
  let label: string | undefined = undefined

  // get width
  const width = parseSize(ps[0]!)
  ps = ps.slice(1)

  // get height
  if (ps.length > 0) {
    height = parseSize(ps[0]!)
    if (height) {
      ps = ps.slice(1)
    }
  }
  if (!height) {
    height = width
  }
  if (!width || !height) {
    throw new BadRequest(`unexpected size`)
  }

  // get color or label #1 ... these are unordered :(
  if (ps.length > 0) {
    colors = parseHexColors(ps[0]!)
    if (colors.length === 0) {
      label = parseLabel(ps[0]!)
    }
    if (colors.length > 0 || label) {
      ps = ps.slice(1)
    }
  }
  // get color or label #2
  if (ps.length > 0) {
    if (colors.length > 0) {
      label = parseLabel(ps[0]!)
      if (!label) {
        throw new BadRequest(`unexpected label`)
      }
    } else if (label) {
      colors = parseHexColors(ps[0]!)
      if (colors.length === 0) {
        throw new BadRequest(`unexpected color`)
      }
    }
  }

  // validate colors
  if (colors.length > 3) {
    throw new BadRequest(`unexpected colors`)
  }
  colors.forEach((c) => {
    if (!hexToRGB(c)) {
      throw new BadRequest(`unexpected colors`)
    }
  })

  return {
    format,
    width,
    height,
    colors,
    label,
  }
}

export const generate = async (input: Input) => {
  const { label, width, height, colors, format } = input
  const browser = await puppeteer.launch(
    process.env.NODE_ENV === 'production'
      ? {
          args: chromium.args,
          defaultViewport: { width, height },
          executablePath: await chromium.executablePath,
          headless: chromium.headless,
        }
      : { defaultViewport: { width, height } }
  )

  const title = label?.split('_').join(' ')

  //TODO: it would be nice to use random colors if color was undefined
  const backgroundColor = colors.length > 0 ? colors[0]! : '#007aff'
  const borderColor = colors.length > 1 ? colors[1]! : 'lightGray'
  const textColor =
    colors.length > 2 ? colors[2]! : getContrastHex(backgroundColor)

  const content = title
    ? `<div>
        <h1>${title}</h1>
        <p>${width} x ${height}</p>
       </div>`
    : `<div>
        <h1>${width} x ${height}</h1>
       </div>
      `

  const html = `
    <html lang="en">
      <head>
        <style>
        body {
          background-color: ${borderColor};
          padding: 2px;
          margin: 0;
        }
        div {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          color: ${textColor};
          background-color: ${backgroundColor};
        }
        h1 {
          font-family: monospace;
          font-weight: 900;
          font-size: 1.75em;
        }
        p {
          font-family: monospace;
          font-weight: 900;
          font-size: 1.25em;
        }
        </style>
        <title>image</title>
      </head>
      <body>
        ${content}
      </body>
    </html>
  `

  const page = await browser.newPage()
  await page.setContent(html)
  const snapshot = await page.screenshot(
    format === 'jpeg' ? { type: 'jpeg', quality: 50 } : undefined
  )
  await browser.close()
  return snapshot
}
