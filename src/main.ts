import 'ol/build/ol/ol.css'
import Map from 'ol/build/ol/Map'
import View from 'ol/build/ol/View'
import OSM from 'ol/build/ol/source/OSM'
import VectorTileSource from 'ol/build/ol/source/VectorTile'
import WebGLTileLayer from 'ol/build/ol/layer/WebGLTile'
import VectorTileLayer from 'ol/build/ol/layer/VectorTile'
import WebGLVectorTileLayerRenderer from 'ol/build/ol/renderer/webgl/VectorTileLayer'
import MVT from 'ol/build/ol/format/MVT'
import {asArray} from 'ol/build/ol/color';
import {packColor} from 'ol/build/ol/renderer/webgl/shaders';
import {applyStyle} from 'ol-mapbox-style/build/index'

class WebGLVectorTileLayer extends VectorTileLayer {
  createRenderer() {
    return new WebGLVectorTileLayerRenderer(this, {
      fill: {
        attributes: {
          color: (feature) => {
            const styles = this.getStyle()(feature, 1);
            const style = styles?.[0];
            const color = asArray(style?.getFill()?.getColor() || '#eee');
            return packColor(color);
          },
          opacity: () => 1,
        },
      },
      stroke: {
        attributes: {
          color: (feature) => {
            const styles = this.getStyle()(feature, 1);
            const style = styles?.[0];
            const color = asArray(style?.getStroke()?.getColor() || '#eee');
            return packColor(color);
          },
          width: (feature) => {
            const styles = this.getStyle()(feature, 1);
            const style = styles?.[0];
            return Math.min(1, style?.getStroke()?.getWidth() || 0);
          },
          opacity: () => 1,
        },
      },
      point: {
        attributes: {
          color: () => packColor(asArray('#777')),
        },
      },
    });
  }
}

async function initMap() {
  const vectorTileLayer = new WebGLVectorTileLayer({
    source: new VectorTileSource({
      format: new MVT(),
      url: 'https://sgx.geodatenzentrum.de/gdz_basemapde_vektor/tiles/v1/bm_web_de_3857/{z}/{x}/{y}.pbf'
    }),
  })

  await applyStyle(vectorTileLayer, 'https://sgx.geodatenzentrum.de/gdz_basemapde_vektor/styles/bm_web_col.json')

  const map = new Map({
    target: 'map',
    view: new View({
      // view values taken from https://test.geoportal-hamburg.de/basemapDE/config.json
      zoom: 1,
      center: [
        1151447.39,
        6643906.50
      ],
      extent: [
        82152,
        5655078,
        2192608,
        7583763
      ]
    }),
    layers: [
      new WebGLTileLayer({
        source: new OSM({
          wrapX: false
        })
      }),
      vectorTileLayer
    ],
  })
}
initMap()
