const _ctx_ = Symbol('_ctx_')
const _pixelRatio_ = Symbol('_pixelRatio_')
class Draw_Function {
  [_ctx_] = null;
  [_pixelRatio_] = null;
  constructor(_this_) {
    this[_ctx_] = _this_.ctx
    this[_pixelRatio_] = _this_.data.pixelRatio || 2
  }
  drawImages(imageParams) {
    this[_ctx_].beginPath()
    this[_ctx_].save()
    let {
      borderRadius,
      height,
      width,
      url,
      x,
      y,
    } = imageParams
    height = this.toRpx(height)
    width = this.toRpx(width)
    x = this.toRpx(x)
    y = this.toRpx(y)
    if (borderRadius) {
      this.drawRadiusRect({
        borderRadius,
        height,
        width,
        x,
        y,
      })
      this[_ctx_].clip()
    }
    this[_ctx_].drawImage(url, x, y, width, height)
    this[_ctx_].restore()
  }
  toRpx(val) {
    return this[_pixelRatio_] * val
  }
  drawText(textParams) {
    let {
      textDecoration,
      textBaseline,
      lineHeight,
      fontWeight,
      textAlign,
      textWidth,
      maxWidth,
      fontSize,
      opacity,
      lineNum,
      width,
      color,
      text,
      x,
      y,
    } = textParams
    textAlign = textAlign || 'left'
    textBaseline = textBaseline || 'normal'
    opacity = typeof opacity === 'number' ? opacity : 1
    lineHeight = this.toRpx(lineHeight || fontSize || 12)
    textWidth = this.toRpx(textWidth || 0)
    fontSize = this.toRpx(fontSize || 12)
    maxWidth = this.toRpx(maxWidth || width)
    width = this.toRpx(width)
    x = this.toRpx(x)
    y = this.toRpx(y)
    this[_ctx_].beginPath()
    this[_ctx_].setGlobalAlpha(opacity)
    this[_ctx_].setFontSize(fontSize)
    this[_ctx_].setFillStyle(color || '#000')
    this[_ctx_].setStrokeStyle(color || '#000')
    this[_ctx_].setTextBaseline(textBaseline)
    this[_ctx_].setTextAlign(textAlign)
    this[_ctx_].setLineWidth(this.toRpx(2))
    let fontX = this.getFontWidth({
      textAlign,
      fontSize,
      text,
      x,
    })
    if (lineNum > 1) {
      if (text.length * fontSize + fontX > width) {
        let maxLength = parseInt((width - fontX) / fontSize)
        for (let i = 0; i < lineNum; i++) {
          let newText = text.substring(i * maxLength, maxLength * i + maxLength)
          if (i === lineNum - 1 && Math.ceil(text.length / maxLength) > lineNum) newText = `${newText.substring(0, maxLength - 1)}...`
          let textHeight = y + i * (lineHeight || fontSize)
          this[_ctx_].fillText(newText, x, textHeight, maxWidth)
          if (checkFontWeight(fontWeight)) this[_ctx_].strokeText(newText, x, textHeight, maxWidth)
          if (checkTextDecoration(textDecoration)) {
            this.drawDecoration({
              'y': textHeight,
              textDecoration,
              textBaseline,
              textAlign,
              fontSize,
              newText,
              opacity,
              text,
              x
            })
          }
        }
      }
    } else {
      let newText = text
      let maxLength = -1
      if (textWidth && text.length * fontSize + fontX > textWidth) maxLength = parseInt((width - textWidth - fontX) / fontSize) - 1
      if (text.length * fontSize + fontX > width && !maxWidth) maxLength = parseInt((width - fontX) / fontSize) - 1
      newText = maxLength !== -1 ? `${text.substring(0,maxLength)}...` : text
      this[_ctx_].fillText(newText, x, y, maxWidth)
      if (checkFontWeight(fontWeight)) this[_ctx_].strokeText(newText, x, y, maxWidth)
      if (checkTextDecoration(textDecoration)) {
        this.drawDecoration({
          textDecoration,
          textBaseline,
          textAlign,
          fontSize,
          newText,
          opacity,
          text,
          y,
          x
        })
      }
    }
    this[_ctx_].stroke()
  }
  drawLine(lineParams) {
    this[_ctx_].beginPath()
    let {
      opacity,
      startX,
      startY,
      width,
      color,
      endX,
      endY,
    } = lineParams
    startX = this.toRpx(startX)
    startY = this.toRpx(startY)
    width = this.toRpx(width)
    endX = this.toRpx(endX)
    endY = this.toRpx(endY)
    this[_ctx_].setGlobalAlpha(typeof opacity === 'number' ? opacity : 1)
    this[_ctx_].setStrokeStyle(color || '#000')
    this[_ctx_].setLineWidth(width || this.toRpx(1))
    this[_ctx_].moveTo(startX, startY)
    this[_ctx_].lineTo(endX, endY)
    this[_ctx_].stroke()
    this[_ctx_].restore()
    this[_ctx_].save()
  }
  setLineY = params => {
    let {
      textDecoration,
      textBaseline,
      fontSize,
      y
    } = params
    let type = {
      'underline': {
        'top': y + fontSize,
        'middle': y + fontSize / 2,
        'bottom': y,
        'normal': y,
      },
      'overline': {
        'top': y,
        'middle': y - fontSize / 2,
        'bottom': y - fontSize,
        'normal': y,
      },
      'line-through': {
        'top': y + fontSize / 2,
        'middle': y - fontSize / 2,
        'bottom': y,
        'normal': y,
      }
    }
    return type[textDecoration][textBaseline]
  }

  setLineX(params) {
    let {
      textAlign,
      text,
      x
    } = params
    let textWidth = this[_ctx_].measureText(text).width
    let type = {
      'left': x,
      'center': x - textWidth / 2,
      'right': x - textWidth
    }
    return type[textAlign]
  }

  drawRadiusRect(params) {
    let {
      borderRadius,
      height,
      width,
      x,
      y,
    } = params
    let radius = typeof borderRadius === 'string' ? (Number(borderRadius.split('%')[0]) / 100 * width) / 2 : borderRadius / 2
    radius = radius || 0
    this[_ctx_].beginPath()
    for (let i = 1; i < 5; i++) {
      let arcX = i === 1 || i === 4 ? x + width - radius : x + radius
      let arcY = i === 1 || i === 2 ? y + height - radius : y + radius
      this[_ctx_].arc(arcX, arcY, radius, 2 * Math.PI * ((i - 1) / 4), 2 * Math.PI * (i / 4))
    }
  }
  getFontWidth(params) {
    let {
      textAlign,
      fontSize,
      text,
      x
    } = params
    let type = {
      'left': x,
      'center': x - fontSize * text.length / 2,
      'right': x - fontSize * text.length
    }
    return type[textAlign] < 0 ? 0 : type[textAlign]
  }

  drawDecoration(params) {
    let {
      newText,
      opacity,
      y,
      x
    } = params
    let lineX = x
    let lineY = y
    lineX = this.setLineX(params)
    lineY = this.setLineY(params)
    this[_ctx_].setGlobalAlpha(opacity)
    this[_ctx_].moveTo(lineX, lineY)
    this[_ctx_].lineTo(lineX + this[_ctx_].measureText(newText).width, lineY)
  }
}
const checkFontWeight = (fontWeight = '0') => {
  return (fontWeight && (typeof fontWeight === 'string' || typeof fontWeight === 'number') && (fontWeight == 'bold' || fontWeight >= 700))
}
const checkTextDecoration = textDecoration => {
  return (textDecoration && (textDecoration === 'underline' || textDecoration === 'overline' || textDecoration === 'line-through'))
}
export default Draw_Function