/**
 * @module sbs/facility-style
 */
import Style from 'ol/style/Style'
import nycOl from 'nyc-lib/nyc/ol' 
import Circle from 'ol/style/Circle'
import Fill from 'ol/style/Fill'
import Stroke from 'ol/style/Stroke'

const facilityStyle = {
  FACILITY_TYPE: {
    'Business Center': '#4DA64D',
    'Workforce1 Center': '#679EC3',
    'Industrial & Transportation Services': '#888888',
  },
  pointStyle: (feature, resolution) => {
    const zoom = nycOl.TILE_GRID.getZForResolution(resolution)
    const radius = facilityStyle.calcRadius(zoom)
    const type = feature.getType()
    const style = [new Style({
      image: new Circle({
        fill: new Fill({color: facilityStyle.FACILITY_TYPE[type]}),
        stroke: new Stroke({color: '#fff', width: 1}),
        radius: radius * 1.1
      })
    })]
    return style
  },
  calcRadius: (zoom) => {
    let radius = 6
    if (zoom > 17) radius = 20
    else if (zoom > 15) radius = 16
    else if (zoom > 13) radius = 12
    else if (zoom > 11) radius = 8
    return radius
  }
}
export default facilityStyle