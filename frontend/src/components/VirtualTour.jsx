import React, { useEffect, useRef, useState } from 'react';
import { Map, Marker } from 'react-amap';
import { Card } from 'antd';

const VirtualTour = () => {
  // 莫高窟的大致位置
  const [center, setCenter] = useState({
    longitude: 94.8184,
    latitude: 40.0359
  });

  const mapPlugins = [
    'Scale',
    'ToolBar',
    'ControlBar',
    'MapType'
  ];

  return (
    <Card style={{ width: '100%', height: '600px' }}>
      <Map 
        amapkey="GG7VHmC1zLl0z906wcQ56QFHQyPEbZOo"
        version="2.0"
        center={center}
        zoom={15}
        plugins={mapPlugins}
      >
        <Marker 
          position={center}
          title="莫高窟"
          label={{
            content: '莫高窟景区',
            direction: 'top'
          }}
        />
      </Map>
    </Card>
  );
};

export default VirtualTour; 