import vhtml from '_vhtml'
import path from 'path'
import sizeOf from 'image-size'

export function requestProcessImage({ filePath, resolutions = [480, 800]}) {
  const { name, ext } = path.parse(filePath)
  const { width, height } = sizeOf(filePath)
  const imageSet = resolutions.map(resolution => `/assets/${name}-${resolution}w${ext}`)
  const srcset = imageSet.map((imagePath, i) => `${imagePath} ${resolutions[i]}w`).join(',')
  // transform({ input, width, ext, output })
  
  return {
    width,
    height,
    srcset,
    src: imageSet[imageSet.length - 1],
  }
}

export const Image = ({ src: filePath, alt, loading = 'lazy', className }) => {
  const { src, srcset, width, height } = requestProcessImage({ filePath, resolutions: [480, 800] })
  const sizes = `(max-width: 800px) 480px, 800px`

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
    <div style={frameStyle}>
      <div style={innerStyle}>
        <img
          style="width: 100%;"
          className={className}
          src={src}
          srcset={srcset}
          sizes={sizes}
          alt={alt}
          loading={loading}
        />
      </div>
    </div>
  )
}