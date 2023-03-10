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

class WebGLVectorTileLayer extends VectorTileLayer {
  createRenderer() {
    return new WebGLVectorTileLayerRenderer(this, {
      fill: {
        attributes: {
          color: (feature) => {
            return packColor('#aaa');
          },
          opacity: () => 1,
        },
      },
      stroke: {
        attributes: {
          color: (feature) => {
            return packColor('#eee');
          },
          width: (feature) => {
            return 1;
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

const vectorTileLayer = new WebGLVectorTileLayer({
  source: new VectorTileSource({
    format: new MVT(),
    url: 'https://sgx.geodatenzentrum.de/gdz_basemapde_vektor/tiles/v1/bm_web_de_3857/{z}/{x}/{y}.pbf'
  }),
})

const map = new Map({
  target: 'map',
  view: new View({
    zoom: 2,
    center: [0, 0],
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
