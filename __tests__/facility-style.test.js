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
    X: 997267,
    Y: 234834
  })
  Object.assign(feature, decorations)
})

test('pointStyle', () => {
  expect.assertions(12)
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