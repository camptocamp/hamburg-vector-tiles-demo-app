import WebGLStyle from "ol/build/ol/style/webgl";

const base = {
  version: 8,
  name: "XPlanSyn",
  metadata: {
    "maputnik:renderer": "mbgljs",
  },
  center: [9.99157, 53.552976],
  zoom: 14.0,
  bearing: 0.0,
  pitch: 0.0,
  sources: {
    basemap: {
      type: "raster",
      tiles: [
        "https://sg.geodatenzentrum.de/wmts_topplus_open/tile/1.0.0/web_grau/default/WEBMERCATOR/{z}/{y}/{x}.png",
      ],
      scheme: "xyz",
      attribution:
        '&copy; <a href="http://www.bkg.bund.de" target="_new">Bundesamt f&uuml;r Kartographie und Geod&auml;sie</a> (2020), <a href="http://sg.geodatenzentrum.de/web_public/Datenquellen_TopPlus_Open.pdf" target="_new">Datenquellen</a>',
    },
    xplansyn: {
      type: "vector",
      tiles: [
        "https://xplanung.ldproxy.devops.diplanung.de/rest/services/xplansyn/tiles/WebMercatorQuad/{z}/{y}/{x}?f=mvt",
      ],
      scheme: "xyz",
      maxzoom: 22,
      attribution:
        '&copy; <a href="https://xleitstelle.de" target="_new">XLeitstelle</a>',
    },
  },
  sprite:
    "https://xplanung.ldproxy.devops.diplanung.de/rest/services/xplansyn/resources/xplanung",
  glyphs:
    "https://sgx.geodatenzentrum.de/gdz_basemapde_vektor/fonts/{fontstack}/{range}.pbf",
  layers: [
    {
      id: "basemap",
      type: "raster",
      source: "basemap",
      layout: {
        visibility: "visible",
      },
    },
    {
      id: "BP_Plan.f638df4c-5d44-4196-a708-6c645bc7e8b8.1",
      type: "fill",
      source: "xplansyn",
      "source-layer": "bp_plan",
      maxzoom: 14,
      paint: {
        "fill-color": "rgba( 128, 132, 122, 0.5)",
        "fill-outline-color": "rgba( 0, 0, 0, 1)",
        "fill-antialias": true,
      },
    },
    {
      id: "BP_StrassenVerkehrsFlaeche.d2cd05f6-5de0-4bbb-9d11-917d884a7be1",
      type: "fill",
      source: "xplansyn",
      "source-layer": "bp_strassenverkehrsflaeche",
      minzoom: 14,
      paint: {
        "fill-color": "rgba(255, 217, 47, 1)",
        "fill-antialias": true,
        "fill-outline-color": "rgba(0, 0, 0, 1)",
      },
    },
    {
      id: "BP_VerkehrsflaecheBesondererZweckbestimmung.63e8bd3e-ff43-401f-accd-4c1b2eb583c8",
      type: "fill",
      source: "xplansyn",
      "source-layer": "bp_verkehrsflaechebesondererzweckbestimmung",
      minzoom: 14,
      layout: {
        visibility: "visible",
      },
      paint: {
        "fill-pattern": "23842b4b-c2fe-424f-b163-f59e432150a1",
        "fill-outline-color": "rgba(0, 0, 0, 1)",
        "fill-antialias": true,
      },
    },
    {
      id: "BP_BaugebietsTeilFlaeche.5",
      type: "fill",
      source: "xplansyn",
      "source-layer": "bp_baugebietsteilflaeche",
      minzoom: 14,
      filter: [
        "any",
        ["==", "allgartderbaulnutzung", "9999"],
        ["==", "besondereartderbaulnutzung", "4000"],
        ["==", "besondereartderbaulnutzung", "9999"],
      ],
      paint: {
        "fill-outline-color": "rgba(0, 0, 0, 1)",
        "fill-antialias": true,
        "fill-color": "rgba(255,255, 255, 1)",
      },
    },
    {
      id: "BP_BaugebietsTeilFlaeche.4",
      type: "fill",
      source: "xplansyn",
      "source-layer": "bp_baugebietsteilflaeche",
      minzoom: 14,
      filter: [
        "any",
        ["==", "allgartderbaulnutzung", "4000"],
        ["==", "besondereartderbaulnutzung", "2000"],
        ["==", "besondereartderbaulnutzung", "2100"],
        ["==", "besondereartderbaulnutzung", "3000"],
      ],
      paint: {
        "fill-outline-color": "rgba(0, 0, 0, 1)",
        "fill-antialias": true,
        "fill-color": "rgba(254,127, 38, 1)",
      },
    },
    {
      id: "BP_BaugebietsTeilFlaeche.3",
      type: "fill",
      source: "xplansyn",
      "source-layer": "bp_baugebietsteilflaeche",
      minzoom: 14,
      filter: [
        "any",
        ["==", "allgartderbaulnutzung", "3000"],
        ["==", "besondereartderbaulnutzung", "1700"],
        ["==", "besondereartderbaulnutzung", "1800"],
      ],
      paint: {
        "fill-outline-color": "rgba(0, 0, 0, 1)",
        "fill-antialias": true,
        "fill-color": "rgba(166, 165, 150, 1)",
      },
    },
    {
      id: "BP_BaugebietsTeilFlaeche.2",
      type: "fill",
      source: "xplansyn",
      "source-layer": "bp_baugebietsteilflaeche",
      minzoom: 14,
      filter: [
        "any",
        ["==", "allgartderbaulnutzung", "2000"],
        ["==", "besondereartderbaulnutzung", "1400"],
        ["==", "besondereartderbaulnutzung", "1450"],
        ["==", "besondereartderbaulnutzung", "1500"],
        ["==", "besondereartderbaulnutzung", "1550"],
        ["==", "besondereartderbaulnutzung", "1600"],
      ],
      paint: {
        "fill-outline-color": "rgba(0, 0, 0, 1)",
        "fill-antialias": true,
        "fill-color": "rgba( 213, 167, 68, 1)",
      },
    },
    {
      id: "BP_BaugebietsTeilFlaeche.1",
      type: "fill",
      source: "xplansyn",
      "source-layer": "bp_baugebietsteilflaeche",
      minzoom: 14,
      filter: [
        "all",
        ["==", "xpplantype", "BP_Plan"],
        [
          "any",
          ["==", "allgartderbaulnutzung", "1000"],
          ["==", "besondereartderbaulnutzung", "1000"],
          ["==", "besondereartderbaulnutzung", "1100"],
          ["==", "besondereartderbaulnutzung", "1200"],
          ["==", "besondereartderbaulnutzung", "1300"],
        ],
      ],
      paint: {
        "fill-outline-color": "rgba(0, 0, 0, 1)",
        "fill-antialias": true,
        "fill-color": "rgba( 207, 147, 119, 1)",
      },
    },
    {
      id: "BP_GemeinbedarfsFlaeche.b8a261ba-7ff3-46c7-ad7a-86c0a98b18ca",
      type: "fill",
      source: "xplansyn",
      "source-layer": "bp_gemeinbedarfsflaeche",
      paint: {
        "fill-color": "rgba(233, 78, 165, 1)",
        "fill-outline-color": "rgba(0, 0, 0, 1)",
      },
    },
    {
      id: "BP_GruenFlaeche.1",
      type: "fill",
      source: "xplansyn",
      "source-layer": "bp_gruenflaeche",
      minzoom: 14,
      filter: ["all", ["==", "xpplantype", "BP_Plan"]],
      paint: {
        "fill-outline-color": "rgba(0, 0, 0, 1)",
        "fill-antialias": true,
        "fill-color": "rgba(127, 198, 67,1)",
      },
    },
    {
      id: "BP_Plan.f638df4c-5d44-4196-a708-6c645bc7e8b8.2",
      type: "line",
      source: "xplansyn",
      "source-layer": "bp_plan",
      minzoom: 14,
      maxzoom: 24,
      layout: {
        visibility: "visible",
        "line-join": "miter",
        "line-cap": "butt",
      },
      paint: {
        "line-width": [
          "interpolate",
          ["exponential", 2],
          ["zoom"],
          0,
          ["/", 10, 156543],
          24,
          ["/", 10, 0.00933075],
        ],
        "line-color": "rgba( 128, 132, 122, 1)",
        "line-offset": [
          "interpolate",
          ["exponential", 2],
          ["zoom"],
          0,
          ["/", -5, 156543],
          24,
          ["/", -5, 0.00933075],
        ],
      },
    },
    {
      id: "BP_Plan.f638df4c-5d44-4196-a708-6c645bc7e8b8.0",
      type: "line",
      source: "xplansyn",
      "source-layer": "bp_plan",
      minzoom: 14,
      maxzoom: 24,
      layout: {
        visibility: "visible",
        "line-join": "miter",
        "line-cap": "butt",
      },
      paint: {
        "line-width": 1,
        "line-color": "rgba(0, 0, 0, 1)",
        "line-offset": 0,
      },
    },
    {
      id: "BP_BauGrenze.1.1",
      type: "line",
      source: "xplansyn",
      "source-layer": "bp_baugrenze",
      minzoom: 17,
      layout: {
        "line-cap": "butt",
        "line-join": "miter",
      },
      paint: {
        "line-color": "rgba(23, 99, 170,1)",
        "line-opacity": 1,
        "line-width": [
          "interpolate",
          ["exponential", 2],
          ["zoom"],
          0,
          ["/", 2, 156543],
          24,
          ["/", 2, 0.00933075],
        ],
        "line-offset": [
          "interpolate",
          ["exponential", 2],
          ["zoom"],
          0,
          ["/", -1, 156543],
          24,
          ["/", -1, 0.00933075],
        ],
      },
    },
    {
      id: "BP_BauGrenze.1.0",
      type: "line",
      source: "xplansyn",
      "source-layer": "bp_baugrenze",
      minzoom: 16,
      layout: {
        "line-cap": "butt",
        "line-join": "miter",
      },
      paint: {
        "line-color": "rgba(0, 0, 0, 1)",
        "line-opacity": 1,
        "line-width": 1,
      },
    },
    {
      id: "BP_BauLinie.1.1",
      type: "line",
      source: "xplansyn",
      "source-layer": "bp_baulinie",
      minzoom: 17,
      layout: {
        "line-cap": "butt",
        "line-join": "miter",
      },
      paint: {
        "line-opacity": 1,
        "line-width": [
          "interpolate",
          ["exponential", 2],
          ["zoom"],
          0,
          ["/", 2, 156543],
          24,
          ["/", 2, 0.00933075],
        ],
        "line-offset": [
          "interpolate",
          ["exponential", 2],
          ["zoom"],
          0,
          ["/", -1, 156543],
          24,
          ["/", -1, 0.00933075],
        ],
        "line-color": "rgba(253, 52, 31,1)",
      },
    },
    {
      id: "BP_BauLinie.1.0",
      type: "line",
      source: "xplansyn",
      "source-layer": "bp_baulinie",
      minzoom: 16,
      layout: {
        "line-cap": "butt",
        "line-join": "miter",
      },
      paint: {
        "line-color": "rgba(0, 0, 0, 1)",
        "line-opacity": 1,
        "line-width": 1,
      },
    },
    {
      id: "BP_Wegerecht.1.2",
      type: "line",
      source: "xplansyn",
      "source-layer": "bp_wegerecht",
      minzoom: 17,
      maxzoom: 24,
      layout: {
        visibility: "none",
      },
      paint: {
        "line-color": "rgba(255, 217, 47,1)",
        "line-width": [
          "interpolate",
          ["exponential", 2],
          ["zoom"],
          0,
          ["/", 8, 156543],
          24,
          ["/", 8, 0.00933075],
        ],
        "line-offset": [
          "interpolate",
          ["exponential", 2],
          ["zoom"],
          0,
          ["/", 4, 156543],
          24,
          ["/", 4, 0.00933075],
        ],
        "line-dasharray": [3, 2],
      },
    },
    {
      id: "BP_Wegerecht.1.1",
      type: "symbol",
      source: "xplansyn",
      "source-layer": "bp_wegerecht",
      minzoom: 17,
      maxzoom: 24,
      layout: {
        "icon-size": [
          "interpolate",
          ["exponential", 2],
          ["zoom"],
          0,
          ["/", 0.5, 156543],
          24,
          ["/", 0.5, 0.00933075],
        ],
        "icon-allow-overlap": true,
        "icon-ignore-placement": true,
        "symbol-placement": "line",
        "symbol-spacing": 25,
        "icon-keep-upright": false,
        "symbol-avoid-edges": false,
        "icon-image": "BP_Wegerecht.1",
      },
    },
    {
      id: "BP_Wegerecht.0",
      type: "line",
      source: "xplansyn",
      "source-layer": "bp_wegerecht",
      paint: {
        "line-width": 1,
      },
    },
    {
      id: "BP_AnpflanzungBindungErhaltung.4f2bdd3c-612b-4a86-bc77-35e1107d8ba0.1",
      type: "symbol",
      source: "xplansyn",
      "source-layer": "bp_anpflanzungbindungerhaltung",
      minzoom: 17,
      filter: ["all", ["==", "$type", "Polygon"], ["==", "massnahme", "1000"]],
      layout: {
        "symbol-placement": "line",
        "icon-allow-overlap": true,
        "icon-ignore-placement": true,
        "symbol-spacing": [
          "interpolate",
          ["exponential", 2],
          ["zoom"],
          0,
          ["/", 25, 156543],
          24,
          ["/", 25, 0.00933075],
        ],
        "icon-image": "c804981f-5c99-4b27-a0ac-bb19d212bffb",
        "icon-size": [
          "interpolate",
          ["exponential", 2],
          ["zoom"],
          0,
          ["/", 0.4, 156543],
          24,
          ["/", 0.4, 0.00933075],
        ],
        visibility: "visible",
        "icon-rotation-alignment": "auto",
        "icon-anchor": "center",
        "icon-pitch-alignment": "auto",
        "icon-offset": [0, 10],
      },
    },
    {
      id: "BP_AnpflanzungBindungErhaltung.4f2bdd3c-612b-4a86-bc77-35e1107d8ba0.0",
      type: "line",
      source: "xplansyn",
      "source-layer": "bp_anpflanzungbindungerhaltung",
      minzoom: 16,
      filter: ["all", ["==", "$type", "Polygon"], ["==", "massnahme", "1000"]],
    },
    {
      id: "BP_AnpflanzungBindungErhaltung.03170495-e6a0-4db8-96df-c2ddb51296cf.2",
      type: "symbol",
      source: "xplansyn",
      "source-layer": "bp_anpflanzungbindungerhaltung",
      minzoom: 17,
      filter: ["all", ["==", "$type", "Polygon"], ["==", "massnahme", "3000"]],
      layout: {
        "symbol-placement": "line",
        "icon-allow-overlap": true,
        "icon-ignore-placement": true,
        "symbol-spacing": [
          "interpolate",
          ["exponential", 2],
          ["zoom"],
          0,
          ["/", 25, 156543],
          24,
          ["/", 25, 0.00933075],
        ],
        "icon-image": "bfdb0333-190e-4a2b-b80c-e2e4a3f34ca3",
        "icon-size": [
          "interpolate",
          ["exponential", 2],
          ["zoom"],
          0,
          ["/", 0.4, 156543],
          24,
          ["/", 0.4, 0.00933075],
        ],
        visibility: "visible",
        "icon-anchor": "center",
        "icon-offset": [0, 10],
      },
    },
    {
      id: "BP_AnpflanzungBindungErhaltung.03170495-e6a0-4db8-96df-c2ddb51296cf.1",
      type: "symbol",
      source: "xplansyn",
      "source-layer": "bp_anpflanzungbindungerhaltung",
      minzoom: 17,
      filter: ["all", ["==", "$type", "Polygon"], ["==", "massnahme", "3000"]],
      layout: {
        "symbol-placement": "line",
        "icon-allow-overlap": true,
        "icon-ignore-placement": true,
        "symbol-spacing": [
          "interpolate",
          ["exponential", 2],
          ["zoom"],
          0,
          ["/", 25, 156543],
          24,
          ["/", 25, 0.00933075],
        ],
        "icon-image": "c804981f-5c99-4b27-a0ac-bb19d212bffb",
        "icon-size": [
          "interpolate",
          ["exponential", 2],
          ["zoom"],
          0,
          ["/", 0.4, 156543],
          24,
          ["/", 0.4, 0.00933075],
        ],
        visibility: "visible",
        "icon-anchor": "center",
        "icon-offset": [25, 10],
      },
    },
    {
      id: "BP_AnpflanzungBindungErhaltung.03170495-e6a0-4db8-96df-c2ddb51296cf.0",
      type: "line",
      source: "xplansyn",
      "source-layer": "bp_anpflanzungbindungerhaltung",
      minzoom: 16,
      filter: ["all", ["==", "$type", "Polygon"], ["==", "massnahme", "3000"]],
    },
    {
      id: "BP_AnpflanzungBindungErhaltung.7b982ea0-1d8f-458f-833b-4ff7e4fac885.1",
      type: "symbol",
      source: "xplansyn",
      "source-layer": "bp_anpflanzungbindungerhaltung",
      minzoom: 17,
      filter: ["all", ["==", "$type", "Polygon"], ["==", "massnahme", "2000"]],
      layout: {
        "symbol-placement": "line",
        "icon-allow-overlap": true,
        "icon-ignore-placement": true,
        "symbol-spacing": [
          "interpolate",
          ["exponential", 2],
          ["zoom"],
          0,
          ["/", 25, 156543],
          24,
          ["/", 25, 0.00933075],
        ],
        "icon-image": "bfdb0333-190e-4a2b-b80c-e2e4a3f34ca3",
        "icon-size": [
          "interpolate",
          ["exponential", 2],
          ["zoom"],
          0,
          ["/", 0.4, 156543],
          24,
          ["/", 0.4, 0.00933075],
        ],
        visibility: "visible",
        "icon-offset": [0, 10],
      },
    },
    {
      id: "BP_AnpflanzungBindungErhaltung.7b982ea0-1d8f-458f-833b-4ff7e4fac885.0",
      type: "line",
      source: "xplansyn",
      "source-layer": "bp_anpflanzungbindungerhaltung",
      minzoom: 16,
      filter: ["all", ["==", "$type", "Polygon"], ["==", "massnahme", "2000"]],
    },
    {
      id: "BP_AnpflanzungBindungErhaltung.93c22665-0115-41f6-a312-e9b8877018cc",
      type: "symbol",
      source: "xplansyn",
      "source-layer": "bp_anpflanzungbindungerhaltung",
      minzoom: 17,
      filter: [
        "all",
        ["==", "$type", "Point"],
        ["==", "massnahme", "3000"],
        ["==", "gegenstand", "1000"],
      ],
      layout: {
        "symbol-placement": "point",
        "icon-image": "bb5e833a-bf31-414e-af04-966af6e917b0",
        "icon-size": [
          "interpolate",
          ["exponential", 2],
          ["zoom"],
          0,
          ["/", 0.3, 156543],
          24,
          ["/", 0.3, 0.00933075],
        ],
        "icon-allow-overlap": true,
        "icon-ignore-placement": true,
      },
    },
    {
      id: "BP_AnpflanzungBindungErhaltung.d5f77b81-469b-4ce7-ae38-a1496aba5f4f",
      type: "symbol",
      source: "xplansyn",
      "source-layer": "bp_anpflanzungbindungerhaltung",
      minzoom: 17,
      filter: [
        "all",
        ["==", "$type", "Point"],
        ["==", "massnahme", "1000"],
        ["==", "gegenstand", "1000"],
      ],
      layout: {
        "symbol-placement": "point",
        "icon-image": "42a82eee-e7ff-4cd1-8cab-818904341279",
        "icon-size": [
          "interpolate",
          ["exponential", 2],
          ["zoom"],
          0,
          ["/", 0.3, 156543],
          24,
          ["/", 0.3, 0.00933075],
        ],
        "icon-allow-overlap": true,
        "icon-ignore-placement": true,
        visibility: "visible",
      },
    },
    {
      id: "XP_PTO.b898e9ba-4ec8-4745-a61b-008ebeeb9932",
      type: "symbol",
      source: "xplansyn",
      "source-layer": "xp_pto",
      layout: {
        "icon-size": 1,
        "text-field": ["get", "schriftinhalt"],
        "text-allow-overlap": true,
        "text-ignore-placement": true,
        "text-font": ["Noto Sans Regular"],
        "text-size": [
          "interpolate",
          ["exponential", 2],
          ["zoom"],
          0,
          ["*", ["get", "schriftinhalt"], 6.388021e-5],
          24,
          ["*", ["get", "schriftinhalt"], 1071.725209656244],
        ],
        "icon-rotate": ["get", "drehwinkel"],
      },
    },
  ],
};

function fixExpression(expression) {
  if (!Array.isArray(expression)) return expression;
  if (expression[0] === "all" && expression.length === 2) {
    return fixExpression(expression[1]);
  }
  if (expression[0] === "get" && expression[1] === "$type") {
    return ["geometry-type"];
  }
  if (expression[0] === "==") {
    let compared = expression[1];
    if (typeof compared === "string") compared = ["get", expression[1]];
    return [
      expression[0],
      fixExpression(compared),
      ...expression.slice(2).map(fixExpression),
    ];
  }
  if (expression[0] === "interpolate") {
    return [
      expression[0],
      expression[1],
      ...expression.slice(2).map(fixExpression),
    ];
  }
  return [expression[0], ...expression.slice(1).map(fixExpression)];
}

export async function getXplanStyles(): Promise<WebGLStyle> {
  const spritesheet = await fetch(`${base.sprite}.json`).then((resp) =>
    resp.json()
  );
  const spritesPath = `${base.sprite}.png`;

  return base.layers
    .filter(
      (layer) => layer.layout?.visibility !== "none" && layer.type !== "raster"
    )
    .map((layer) => {
      const filters: any[] = [["==", ["get", "layer"], layer["source-layer"]]];
      if (layer.filter) {
        filters.push(fixExpression(layer.filter));
      }
      // convert zoom to web mercator resolution
      if (layer.maxzoom) {
        filters.push([
          ">",
          ["resolution"],
          156543.03392804097 / Math.pow(2, layer.maxzoom),
        ]);
      }
      if (layer.minzoom) {
        filters.push([
          "<",
          ["resolution"],
          156543.03392804097 / Math.pow(2, layer.minzoom),
        ]);
      }

      const style = {};
      const props = { ...layer.paint, ...layer.layout };
      for (const prop in props) {
        const value = fixExpression(props[prop]);
        switch (prop) {
          case "fill-outline-color":
            style["stroke-color"] = value;
            style["stroke-width"] = style["stroke-width"] || 1;
            break;
          case "fill-color":
            style["fill-color"] = value;
            break;
          case "fill-pattern": {
            const spriteInfo = spritesheet[value];
            style["fill-pattern-src"] = spritesPath;
            style["fill-pattern-offset"] = [spriteInfo.x, spriteInfo.y];
            style["fill-pattern-size"] = [spriteInfo.width, spriteInfo.height];
            style["fill-pattern-scale"] = 64 / spriteInfo.width;
            break;
          }
          case "line-color":
            style["stroke-color"] = value;
            break;
          case "line-width":
            style["stroke-width"] = value;
            break;
          case "line-cap":
            style["stroke-line-cap"] = value;
            break;
          case "line-join":
            style["stroke-line-join"] = value;
            break;
          case "line-offset":
            style["stroke-offset"] = ["/", value, 2]; // FIXME: width in OL shaders is doubled! this is a bug
            break;
          case "icon-image": {
            const spriteInfo = spritesheet[value];
            if (props["symbol-placement"] === "point") {
              style["icon-src"] = spritesPath;
              style["icon-offset"] = [spriteInfo.x, spriteInfo.y];
              style["icon-size"] = [spriteInfo.width, spriteInfo.height];
              style["icon-scale"] = fixExpression(props["icon-size"]);
            } else if (props["symbol-placement"] === "line") {
              style["stroke-pattern-src"] = spritesPath;
              style["stroke-pattern-offset"] = [spriteInfo.x, spriteInfo.y];
              style["stroke-pattern-size"] = [
                spriteInfo.width,
                spriteInfo.height,
              ];
              style["stroke-width"] = [
                "*",
                fixExpression(props["icon-size"]),
                spriteInfo.height * 0.5,
              ];
            }
            break;
          }
          case "symbol-spacing":
            style["stroke-pattern-spacing"] = ["*", 0.5, value];
            break;
        }
      }

      return {
        filter: filters.length === 1 ? filters[0] : ["all", ...filters],
        ...style,
      };
    });
}
