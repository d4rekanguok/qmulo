'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var vhtml = _interopDefault(require('vhtml-frag'));
var path = _interopDefault(require('path'));
var sizeOf = _interopDefault(require('image-size'));
var qmulo = require('qmulo');
var sharp = _interopDefault(require('sharp'));
var crypto = _interopDefault(require('crypto'));

function requestProcessImage({
  filePath,
  resolutions = [480, 800],
  fallbackResolution = 0
}) {
  const {
    base,
    name,
    ext
  } = path.parse(filePath);
  const {
    width,
    height
  } = sizeOf(filePath);
  const imageSet = resolutions.map(resolution => `/assets/${name}-${resolution}w${ext}`);
  const srcset = imageSet.map((imagePath, i) => `${imagePath} ${resolutions[i]}w`).join(',');
  resolutions.forEach((resolution, i) => {
    qmulo.addToProcessList({
      fileName: base,
      input: filePath,
      width: resolution,
      ext,
      output: imageSet[i]
    });
  });
  return {
    width,
    height,
    srcset,
    src: imageSet[fallbackResolution]
  };
}
const Image = ({
  src: filePath,
  alt,
  loading = 'lazy',
  className,
  wrapperClassName
}) => {
  const {
    src,
    srcset,
    width,
    height
  } = requestProcessImage({
    resolutions: [480, 800, 1200],
    fallbackResolution: 1,
    filePath
  });
  const sizes = `
    (max-width: 375px) 240px,
    (max-width: 640px) 400px,
    (min-width: 641px) 600px,
    400px
  `;
  const frameStyle = `
    position: relative;
    width: 100%;
    height: 0;
    padding-bottom: ${height / width * 100}%;
  `;
  const innerStyle = `
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  `;
  return vhtml.h("div", {
    style: frameStyle,
    className: wrapperClassName
  }, vhtml.h("div", {
    style: innerStyle
  }, vhtml.h("img", {
    style: "width: 100%; height: 100%;",
    className: className,
    srcset: srcset,
    sizes: sizes,
    src: src,
    alt: alt,
    loading: loading
  })));
};

async function transform(args, {
  processed
}) {
  const id = crypto.createHash('md5').update(JSON.stringify(args)).digest('hex');
  const result = processed.find({
    id: {
      '$eq': id
    }
  });

  if (result) {
    const {
      fileName,
      width
    } = args;
    console.log(`Skipped: ${args.fileName} -> ${width} has already been transformed.`);
    return;
  }

  const {
    input,
    width,
    ext,
    output
  } = args;

  try {
    await sharp(input).resize(width).toFile(output);
    processed.insert({
      id,
      args
    });
  } catch (err) {
    throw err;
  }

  console.log('image done');
}

exports.Image = Image;
exports.requestProcessImage = requestProcessImage;
exports.transform = transform;
