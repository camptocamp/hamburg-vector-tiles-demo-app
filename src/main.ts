import 'ol/build/ol/ol.css'
import Map from 'ol/build/ol/Map'
import View from 'ol/build/ol/View'
import OSM from 'ol/build/ol/source/OSM'
import VectorTileSource from 'ol/build/ol/source/VectorTile'
import WebGLTileLayer from 'ol/build/ol/layer/WebGLTile'
import VectorTileLayer from 'ol/build/ol/layer/VectorTile'
import WebGLVectorTileLayerRenderer from 'ol/build/ol/renderer/webgl/VectorTileLayer'
import CanvasVectorTileLayerRenderer from 'ol/build/ol/renderer/canvas/VectorTileLayer'
import {asArray} from 'ol/build/ol/color';
import Link from 'ol/build/ol/interaction/Link';
import {packColor, parseLiteralStyle} from 'ol/build/ol/webgl/styleparser';
import MixedGeometryBatch from 'ol/build/ol/render/webgl/MixedGeometryBatch';
import TileGeometry from 'ol/build/ol/webgl/TileGeometry';
import BuilderGroup from 'ol/build/ol/render/canvas/BuilderGroup';
import ExecutorGroup from 'ol/build/ol/render/canvas/ExecutorGroup';
import CompositeMapRenderer from 'ol/build/ol/renderer/Composite';
import {applyStyle} from 'ol-mapbox-style/build/index'
import {defineFrameContainer, trackPerformance, showTable, showGraph} from '@camptocamp/rendering-analyzer'
import MapLibreLayer from '@geoblocks/ol-maplibre-layer/build/ol-maplibre-layer'

class WebGLVectorTileLayer extends VectorTileLayer {
  createRenderer() {
    const result = parseLiteralStyle({
      'fill-color': ['get', 'fillColor'],
      'stroke-color': ['get', 'strokeColor'],
      'stroke-width': ['get', 'strokeWidth'],
      symbol: {
        symbolType: 'circle',
        size: 8,
        color: '#777',
      },
    });
    return new WebGLVectorTileLayerRenderer(this, {
      style: {
          fill: {
            fragment: result.builder.getFillFragmentShader(),
            vertex: result.builder.getFillVertexShader(),
          },
          stroke: {
            fragment: result.builder.getStrokeFragmentShader(),
            vertex: result.builder.getStrokeVertexShader(),
          },
          symbol: {
            fragment: result.builder.getSymbolFragmentShader(),
            vertex: result.builder.getSymbolVertexShader(),
          },
          attributes: {
            fillColor: {
              size: 2,
              callback: (feature) => {
                const style = this.getStyle()(feature, 1)?.[0];
                let colorLike = style?.getFill()?.getColor();
                if (!colorLike || colorLike instanceof CanvasPattern) {
                  colorLike = '#eee';
                }
                const color = asArray(colorLike);
                return packColor(color);
              },
            },
            strokeColor: {
              size: 2,
              callback: (feature) => {
                const style = this.getStyle()(feature, 1)?.[0];
                let colorLike = style?.getStroke()?.getColor();
                if (!colorLike || colorLike instanceof CanvasPattern) {
                  colorLike = '#eee';
                }
                const color = asArray(colorLike);
                return packColor(color);
              },
            },
            strokeWidth: {
              size: 1,
              callback: (feature) => {
                const style = this.getStyle()(feature, 1)?.[0];
                return Math.min(1, style?.getStroke()?.getWidth() || 0);
              },
            },
          },
      }
    });
  }
}

const params = new URL(window.location).searchParams
const renderer: 'webgl' | 'canvas' | 'maplibre' = params.has('renderer') ?
  params.get('renderer') as 'webgl' | 'canvas' | 'maplibre' :
  'webgl'
const showAnalyzer = params.get('analyzer') !== null

const btnWebgl = document.querySelector('.btn[data-renderer=webgl]')
const btnCanvas = document.querySelector('.btn[data-renderer=canvas]')
const btnMaplibre = document.querySelector('.btn[data-renderer=maplibre]')
const btnAnalyzer = document.querySelector('.btn[data-analyzer]')
switch(renderer) {
  case 'webgl': btnWebgl.classList.add('toggled'); break;
  case 'canvas': btnCanvas.classList.add('toggled'); break;
  case 'maplibre': btnMaplibre.classList.add('toggled'); break;
}
btnWebgl.addEventListener('click', () => {
  const newUrl = new URL(window.location)
  newUrl.searchParams.set('renderer', 'webgl')
  window.location = newUrl.toString()
})
btnCanvas.addEventListener('click', () => {
  const newUrl = new URL(window.location)
  newUrl.searchParams.set('renderer', 'canvas')
  window.location = newUrl.toString()
})
btnMaplibre.addEventListener('click', () => {
  const newUrl = new URL(window.location)
  newUrl.searchParams.set('renderer', 'maplibre')
  window.location = newUrl.toString()
})

btnAnalyzer.classList.toggle('toggled', showAnalyzer)
btnAnalyzer.addEventListener('click', () => {
  const newUrl = new URL(window.location)
  if (showAnalyzer) newUrl.searchParams.delete('analyzer')
  else newUrl.searchParams.set('analyzer', '')
  window.location = newUrl.toString()
})

// const STYLE_URL = 'https://sgx.geodatenzentrum.de/gdz_basemapde_vektor/styles/bm_web_col.json'
const STYLE_URL = 'https://xplanung.ldproxy.devops.diplanung.de/rest/services/xplansyn/styles/xplansyn?f=mbs'

async function initMap() {
  let vectorTileLayer
  if (renderer === 'canvas') {
    vectorTileLayer = new VectorTileLayer({
      declutter: true
    })
    await applyStyle(vectorTileLayer, STYLE_URL, {accessTokenParam: 'f', accessToken: 'mvt'})
  } else if (renderer === 'webgl') {
    vectorTileLayer = new WebGLVectorTileLayer({})
    await applyStyle(vectorTileLayer, STYLE_URL, {accessTokenParam: 'f', accessToken: 'mvt'})
  } else {
    vectorTileLayer = new MapLibreLayer({
      maplibreOptions: {
        style: STYLE_URL,
      },
    });
  }

  if (showAnalyzer) {
    defineFrameContainer(CompositeMapRenderer, 'renderFrame');
    trackPerformance(VectorTileSource);
    if (renderer === 'canvas') {
      trackPerformance(BuilderGroup);
      trackPerformance(ExecutorGroup);
      trackPerformance(CanvasVectorTileLayerRenderer);
      trackPerformance(VectorTileLayer);
    }
    else if (renderer === 'webgl') {
      trackPerformance(TileGeometry);
      trackPerformance(MixedGeometryBatch);
      trackPerformance(WebGLVectorTileLayerRenderer);
    }
    showGraph();
    showTable();
  }

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
