import vhtml from '_vhtml'
import path from 'path'
import sizeOf from 'image-size'
import { addToProcessList } from 'qmulo'

export function requestProcessImage({ filePath, resolutions = [480, 800], fallbackResolution = 0}) {
  const { base, name, ext } = path.parse(filePath)
  const { width, height } = sizeOf(filePath)
  const imageSet = resolutions.map(resolution => `/assets/${name}-${resolution}w${ext}`)
  const srcset = imageSet.map((imagePath, i) => `${imagePath} ${resolutions[i]}w`).join(',')

  resolutions.forEach((resolution, i) => {
    addToProcessList({
      fileName: base,
      input: filePath,
      width: resolution,
      ext,
      output: imageSet[i],
    })
  })
  
  return {
    width,
    height,
    srcset,
    src: imageSet[fallbackResolution],
  }
}

export const Image = ({
  src: filePath,
  alt,
  loading = 'lazy',
  className,
  wrapperClassName
}) => {
  const { src, srcset, width, height } = requestProcessImage({
    resolutions: [480, 800, 1200],
    fallbackResolution: 1,
    filePath,
  })
  const sizes = `
    (max-width: 375px) 240px,
    (max-width: 640px) 400px,
    (min-width: 641px) 600px,
    400px
  `

  const frameStyle = `
    position: relative;
    width: 100%;
    height: 0;
    padding-bottom: ${height / width * 100}%;
  `

  const innerStyle = `
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  `

  return (
    <div style={frameStyle} className={wrapperClassName}>
      <div style={innerStyle}>
        <img
          style="width: 100%; height: 100%;"
          className={className}
          srcset={srcset}
          sizes={sizes}
          src={src}
          alt={alt}
          loading={loading}
        />
      </div>
    </div>
  )
}