import 'ol/src/ol/ol.css'
import Map from 'ol/src/ol/Map'
import View from 'ol/src/ol/View'
import OSM from 'ol/src/ol/source/OSM'
import VectorTileSource from 'ol/src/ol/source/VectorTile'
import WebGLTileLayer from 'ol/src/ol/layer/WebGLTile'
import VectorTileLayer from 'ol/src/ol/layer/VectorTile'
import WebGLVectorTileLayerRenderer from 'ol/src/ol/renderer/webgl/VectorTileLayer'
import {Circle, Fill, Stroke, Style} from 'ol/src/ol/style'
import MVT from 'ol/src/ol/format/MVT'
import {asArray} from 'ol/src/ol/color';
import {packColor} from 'ol/src/ol/renderer/webgl/shaders';

const style = [new Style({
  stroke: new Stroke({
    width: 4,
    color: [255, 0, 0, 1]
  }),
  fill: new Fill({
    color: [0, 0, 255, 0.6]
  }),
}), new Style({
  stroke: new Stroke({
    width: 2,
    color: 'white'
  }),
  image: new Circle({
    radius: 4,
    fill: new Fill({
      color: 'white'
    })
  }),
})]

class WebGLVectorTileLayer extends VectorTileLayer {
  createRenderer() {
    return new WebGLVectorTileLayerRenderer(this, {
      fill: {
        attributes: {
          color: (feature) => {
            const style = this.getStyle()(feature, 1)[0];
            const color = asArray(style?.getFill()?.getColor() || '#eee');
            return packColor(color);
          },
          opacity: () => 1,
        },
      },
      stroke: {
        attributes: {
          color: (feature) => {
            const style = this.getStyle()(feature, 1)[0];
            const color = asArray(style?.getStroke()?.getColor() || '#eee');
            return packColor(color);
          },
          width: (feature) => {
            const style = this.getStyle()(feature, 1)[0];
            return style?.getStroke()?.getWidth() || 0;
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
  style
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
