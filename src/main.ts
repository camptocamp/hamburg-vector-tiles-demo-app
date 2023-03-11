import 'ol/build/ol/ol.css'
import Map from 'ol/build/ol/Map'
import View from 'ol/build/ol/View'
import OSM from 'ol/build/ol/source/OSM'
import VectorTileSource from 'ol/build/ol/source/VectorTile'
import WebGLTileLayer from 'ol/build/ol/layer/WebGLTile'
import VectorTileLayer from 'ol/build/ol/layer/VectorTile'
import WebGLVectorTileLayerRenderer from 'ol/build/ol/renderer/webgl/VectorTileLayer'
import CanvasVectorTileLayerRenderer from 'ol/build/ol/renderer/canvas/VectorTileLayer'
import MVT from 'ol/build/ol/format/MVT'
import {asArray} from 'ol/build/ol/color';
import Link from 'ol/build/ol/interaction/Link';
import {packColor} from 'ol/build/ol/renderer/webgl/shaders';
import MixedGeometryBatch from 'ol/build/ol/render/webgl/MixedGeometryBatch';
import TileGeometry from 'ol/build/ol/webgl/TileGeometry';
import BuilderGroup from 'ol/build/ol/render/canvas/BuilderGroup';
import ExecutorGroup from 'ol/build/ol/render/canvas/ExecutorGroup';
import CompositeMapRenderer from 'ol/build/ol/renderer/Composite';
import {applyStyle} from 'ol-mapbox-style/build/index'
import {defineFrameContainer, trackPerformance, showTable, showGraph} from '@camptocamp/rendering-analyzer'

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

const params = new URL(window.location).searchParams
const useCanvas = params.get('canvas') !== null
const showAnalyzer = params.get('analyzer') !== null

const btnCanvas = document.querySelector('.btn.canvas')
const btnAnalyzer = document.querySelector('.btn.analyzer')
btnCanvas.textContent = `Default renderer (canvas) ${useCanvas ? 'enabled' : 'disabled'}`
btnCanvas.classList.toggle('toggled', useCanvas)
btnAnalyzer.textContent = `Performance analyzer ${showAnalyzer ? 'enabled' : 'disabled'}`
btnAnalyzer.classList.toggle('toggled', showAnalyzer)
btnCanvas.addEventListener('click', () => {
  const newUrl = new URL(window.location)
  if (useCanvas) newUrl.searchParams.delete('canvas')
  else newUrl.searchParams.set('canvas', '')
  window.location = newUrl.toString()
})
btnAnalyzer.addEventListener('click', () => {
  const newUrl = new URL(window.location)
  if (showAnalyzer) newUrl.searchParams.delete('analyzer')
  else newUrl.searchParams.set('analyzer', '')
  window.location = newUrl.toString()
})

async function initMap() {
  const source = new VectorTileSource({
    format: new MVT(),
    url: 'https://sgx.geodatenzentrum.de/gdz_basemapde_vektor/tiles/v1/bm_web_de_3857/{z}/{x}/{y}.pbf'
  })
  let vectorTileLayer
  if (useCanvas) {
    vectorTileLayer = new VectorTileLayer({
      source,
      declutter: true
    })
  } else {
    vectorTileLayer = new WebGLVectorTileLayer({
      source
    })
  }

  if (showAnalyzer) {
    defineFrameContainer(CompositeMapRenderer, 'renderFrame');
    trackPerformance(VectorTileSource);
    if (useCanvas) {
      trackPerformance(BuilderGroup);
      trackPerformance(ExecutorGroup);
      trackPerformance(CanvasVectorTileLayerRenderer);
      trackPerformance(VectorTileLayer);
    }
    else {
      trackPerformance(TileGeometry);
      trackPerformance(MixedGeometryBatch);
      trackPerformance(WebGLVectorTileLayerRenderer);
    }
    showGraph();
    showTable();
  }

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
      ],
      showFullExtent: true
    }),
    layers: [
      new WebGLTileLayer({
        source: new OSM({
          wrapX: false
        }),
        opacity: 0.25
      }),
      vectorTileLayer
    ],
  })
  map.addInteraction(new Link())
}
initMap()
