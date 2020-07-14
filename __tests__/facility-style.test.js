import facilityStyle from '../src/js/facility-style'
import decorations from '../src/js/decorations'
import Circle from 'ol/style/Circle'
import Feature from 'ol/Feature'

let feature
beforeEach(() => {
  feature = new Feature({
    ID: 1,
    Name: 'Name',
    Hours: 'Hours',
    Street_Address_1: 'Address 1',
    Street_Address_2: 'Address 2',
    City: 'City',
    Boro: '1',
    State: 'NY',
    ZIP: 'ZIP',
    Details: 'Details',
    TypeID: '1',
    Longitude: 40.861042,
    Latitude: -73.891505,
    X: 1014289.645833,
    Y: 253102.03472200001
  })
  Object.assign(feature, decorations)
})

describe('pointStyle', () => {
  const textStyle = facilityStyle.textStyle
  
  beforeEach(() => {
    facilityStyle.textStyle = jest.fn()
  })
  afterEach(() => {
    facilityStyle.textStyle = textStyle
  })

  test('pointStyle', () => {
    expect.assertions(17)
    let style, typesMap = Object.entries(facilityStyle.FACILITY_TYPE)
    typesMap.forEach((obj, i) => {
      let type = obj[0]
      let color = obj[1]
      feature.set('TypeID', i+1)
      style = facilityStyle.pointStyle(feature, 305.748113140705)
      expect(style[0].getImage() instanceof Circle).toBe(true)
      expect(style[0].getImage().getFill().getColor()).toBe(obj[1])
      expect(style[0].getImage().getStroke().getWidth()).toBe(1)
      expect(style[0].getImage().getStroke().getColor()).toBe('#fff')
    })

    expect(facilityStyle.textStyle).toHaveBeenCalledTimes(0)

    const feature2 = Object.assign(new Feature({Longitude: feature.get('Longitude'), Latitude: feature.get('Latitude')}), decorations)
    feature2.extendFeature()
    feature.extendFeature()

    style = facilityStyle.pointStyle(feature2, 305.748113140705)
    expect(facilityStyle.textStyle).toHaveBeenCalledTimes(1)
    expect(facilityStyle.textStyle.mock.calls[0][0]).toBe(6)
    expect(facilityStyle.textStyle.mock.calls[0][1]).toBe(2)
    expect(facilityStyle.textStyle.mock.calls[0][2]).toBe(style)

  })
})
describe('textStyle', () => {
  test('textStyle count < 10', () => {
    expect.assertions(6)
    const style = []
    facilityStyle.textStyle(32, 5, style)

    expect(style.length).toBe(1)
    expect(style[0].getText().getFill().getColor()).toBe('#fff')
    expect(style[0].getText().getFont()).toBe('20px sans-serif')
    expect(style[0].getText().getText()).toBe('5')
    
    expect(style[0].getText().getTextAlign()).toBe('center')
    expect(style[0].getText().getScale()).toBe(32 / 10)
    
  })

  test('textStyle count > 9', () => {
    expect.assertions(6)
    const style = []
    facilityStyle.textStyle(32, 10, style)

    expect(style.length).toBe(1)
    expect(style[0].getText().getFill().getColor()).toBe('#fff')
    expect(style[0].getText().getFont()).toBe('15px sans-serif')
    expect(style[0].getText().getText()).toBe('10')
    
    expect(style[0].getText().getTextAlign()).toBe('center')
    expect(style[0].getText().getScale()).toBe(32 / 10)
    
  })
})
describe('calcRadius', () => {
  test('zoom > 11', () => {
    expect(facilityStyle.calcRadius(12)).toBe(8)
  })

  test('zoom > 13', () => {
    expect(facilityStyle.calcRadius(14)).toBe(12)
  })

  test('zoom > 15', () => {
    expect(facilityStyle.calcRadius(16)).toBe(16)
  })

  test('zoom > 17', () => {
    expect(facilityStyle.calcRadius(18)).toBe(20)
  })

  test('zoom < 11', () => {
    expect(facilityStyle.calcRadius(10)).toBe(6)
  })
})