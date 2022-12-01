import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import * as setting from '../config';

import googleMapStyles from "../GoogleMapStyle";
let markerCnt = 0;
function MapContainer(props) {
  const { size, _mapStyle,  setMapLoading } = props;

  const [mapData, setMapDataRender] = useState(null);
  // const [mapRender, setMapRender] = useState(null);
  const [containerStyle, setContainerStyle] = useState({
    width: props.size.wid + 'px' || '400px',
    height: props.size.hei + 'px' || '566px',
  })
  const [markers, setMarkers] = useState([]);

  const mapClicked = useCallback((mapProps, map, clickEvent) => {
    // ...
    markerCnt++;
    setMarkers([
      ...markers,
      {
        lat: clickEvent.latLng.lat(),
        lng: clickEvent.latLng.lng(),
        name: "Position " + markerCnt,
      }
    ])
  },[markers])

  const onClickMarker = useCallback((props, marker, e) => {
    const index = markers.findIndex(marker => marker.name === props.name);
    let newMarkers = markers;
    newMarkers.splice(index, 1)
    setMarkers([...newMarkers]);
  },[markers])


  // useEffect(() => {
  //   setMapRender(null);
  // }, [markers,containerStyle,_mapStyle])

  useEffect(() => {
    if(mapData!==null){
      mapData.setOptions({
        styles: _mapStyle,
      });
    }
  }, [mapData,_mapStyle])

  useEffect(() => {
    setMapLoading(true);
  }, [size, _mapStyle, setMapLoading])

  useEffect(() => {
    setContainerStyle({
      width: size.wid + 'px',
      height: size.hei + 'px'
    })
  }, [size])

  const mapLoaded = useCallback((mapProps, map) => {
    map.setOptions({
      styles: _mapStyle,
    });
    setMapDataRender(map);
  },[_mapStyle])


  // const mapRenderFunc = useMemo(() => 
  // <Map
  //   id="mapDom"
  //   google={props.google}
  //   zoomControl={false}
  //   scaleControl={false}
  //   streetViewControl={false}
  //   fullscreenControl={false}
  //   mapTypeControl={false}
  //   zoom={props._mapConfig.zoom}
  //   style={MapContainer.mapStyle}
  //   containerStyle={containerStyle}
  //   initialCenter={props._mapConfig.center}
  //   onReady={mapLoaded}
  //   onZoomChanged={props._mapZoomChanged}
  //   onCenterChanged={props._mapCenterChanged}
  //   onTilesloaded={setMapLoading(false)}
  //   onClick={mapClicked}
  // >
  //   {
  //     markers.map((marker, index) => {
  //       return (
  //         <Marker
  //           key={index}
  //           onClick={onClickMarker}
  //           name={marker.name}
  //           position={marker}
  //         />
  //       )
  //     })
  //   }
  // </Map>,[markers, containerStyle,setMapLoading, mapLoaded, mapClicked,onClickMarker, props]);

  // useEffect(() => {
  //   if (mapRender === null) {
  //     setMapRender(mapRenderFunc);
  //   }
  // }, [mapRender, mapRenderFunc])


  return useMemo(() =>
    <Map
      id="mapDom"
      google={props.google}
      zoomControl={false}
      scaleControl={false}
      streetViewControl={false}
      fullscreenControl={false}
      mapTypeControl={false}
      zoom={props._mapConfig.zoom}
      // style={MapContainer.mapStyle}
      containerStyle={containerStyle}
      // initialCenter={props._mapConfig.center}
      onReady={mapLoaded}
      onZoomChanged={props._mapZoomChanged}
      onCenterChanged={props._mapCenterChanged}
      onTilesloaded={setMapLoading(false)}
      onClick={mapClicked}
      centerAroundCurrentLocation = {true}
    >
      {
        markers.map((marker, index) => {
          return (
            <Marker
              key={index}
              onClick={onClickMarker}
              name={marker.name}
              position={marker}
            />
          )
        })
      }
    </Map>
    , [markers, containerStyle,setMapLoading, mapLoaded, mapClicked,onClickMarker, props])

  // return mapRender;
}

MapContainer.defaultProps = googleMapStyles;


const LoadingContainer = (props) => (
  <div>Fancy loading container!</div>
)

export default GoogleApiWrapper(
  (props) => {
    return ({
      apiKey: setting.mapApiKey,
      LoadingContainer: LoadingContainer,
      // language: props.language,
    })
  }
)(MapContainer)
