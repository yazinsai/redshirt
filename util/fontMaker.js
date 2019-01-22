// Ref: https://hiddentao.com/archives/2017/03/10/get-custom-fonts-working-in-react-native/
import {Platform} from 'react-native';
const font = {
  Antipasto: {
    weights: {
      Demibold: '600',
      Light: '300',
      Regular: '400'
    }
  },
  Geezapro: {
    weights: {
      Regular: '400',
      Demibold: '600'
    }
  }
}

// generate styles for a font with given weight and style
export default fontMaker = (options = {}) => {
  let { weight, style, family } = Object.assign({
    weight: null,
    style: null,
    family: 'Antipasto'
  }, options)

  const { weights} = font[family]

  weight = weights[weight] ? weight : ''

  const suffix = weight 

  return {
    fontFamily: family + (suffix.length ? `-${suffix}` : '')
  }
}