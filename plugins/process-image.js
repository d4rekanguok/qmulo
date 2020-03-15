import vhtml from '_vhtml'
import path from 'path'

export function requestSizes({ filePath, resolutions = [480, 800]}) {
  const { name, ext } = path.parse(filePath)
  return {
    srcset: `/assets/${name}-480w${ext} 480w,
             /assets/${name}-800w${ext} 800w`,
    src: `/assets/${name}${ext}`
  }
}

export const Image = ({ src: filePath, alt, loading = 'lazy', className }) => {
  const { src, srcset } = requestSizes({ filePath, resolutions: [480, 800] })
  const sizes = `(max-width: 800px) 480px, 800px`

  return (
    <img
      className={className}
      src={src}
      srcset={srcset}
      sizes={sizes}
      alt={alt}
      loading={loading}
    />
  )
}