import vhtml from '_vhtml'
import path from 'path'
import sizeOf from 'image-size'

export function requestProcessImage({ filePath, resolutions = [480, 800]}) {
  const { name, ext } = path.parse(filePath)
  const { width, height } = sizeOf(filePath)
  return {
    width,
    height,
    srcset: `/assets/${name}-480w${ext} 480w,
             /assets/${name}-800w${ext} 800w`,
    src: `/assets/${name}${ext}`
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