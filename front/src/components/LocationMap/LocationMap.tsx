import React from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";

const MyMapComponent: any = withScriptjs(
  withGoogleMap((props: any) => (
    <GoogleMap
      defaultZoom={15}
      defaultCenter={{ lat: 54.6812, lng: 25.284605 }}
    >
      <Marker position={{ lat: 54.6812, lng: 25.284605 }} />
    </GoogleMap>
  ))
);

export const LocationMap: React.FC = () => {
  return (
    <>
      <MyMapComponent
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyD3Li3vN1n7j4zJd4Ool6q13uegevpp6BU`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `400px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    </>
  );
};
