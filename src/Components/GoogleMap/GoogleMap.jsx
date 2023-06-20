import React from "react";
import "./GoogleMap.css";

import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "20rem",
};



function Map() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyAdJVydfWiCfkLYlkhFUWRU8m0rd07IaRc",
  });
  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  return isLoaded ? (

    <div class="card mapCard">

      {/* Map start */}

      <GoogleMap
        mapContainerStyle={containerStyle}
        center={{ lat: 27.2046, lng: 77.4977 }}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
      />

      {/* Map end  */}
    </div>


  ) : (
    <></>
  );
}
export default React.memo(Map);
