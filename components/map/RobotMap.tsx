import React, { useEffect, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useAppSelector } from '@/lib/hooks';
import L, { LatLngTuple } from 'leaflet';
import Card from '@/components/card/Card';
import { RootState } from '@/lib/store';
import Papa from 'papaparse';

interface Robot {
  Timestamp: number;
  RunID: number;
  AverageWeight: number;
  AverageTemperature: number;
  AverageHumidity: number;
  AverageLatitude: number;
  AverageLongitude: number;
}

interface RobotMapProps {
  robots: Robot[];
}

const RobotMap = () => {
  const minWeight = useAppSelector((state: RootState) => state.runData.minWeight);
  const maxWeight = useAppSelector((state: RootState) => state.runData.maxWeight);
  const [filteredRobots, setFilteredRobots] = useState<any>([]);
  const [robotsData, setrobotsData] = useState<any>([]);
  
  const mapCenter: LatLngTuple = [40.6659, 140.4460];
  const mapZoom = 20;
  useEffect(() => {
    const fetchRobotData = async () => {
      try {
        const response = await fetch('/averaged_data.csv'); 
        const text = await response.text();

        Papa.parse(text, {
          header: true,
          dynamicTyping: true,
          complete: (result: any) => {
            setFilteredRobots(result.data);
            setrobotsData(result.data)
            console.log('map data: ', result.data)
          },
        });
      } catch (error) {
        console.error('Error fetching CSV file:', error);
      }
    };

    fetchRobotData();
  }, []);

  useEffect(() => {
  const robotsTempData = robotsData.filter(
    (robot:any) =>
      (minWeight === 0 || robot.AverageWeight >= +minWeight) &&
      (maxWeight === 120 || robot.AverageWeight <= +maxWeight) &&
      typeof robot.AverageLatitude === 'number' &&
      typeof robot.AverageLongitude === 'number'
  );
  setFilteredRobots(robotsTempData)
  }, [minWeight, maxWeight]);

  const getMarkerIcon = (weight: number): L.Icon => {
    const iconUrl = 'adam.png'; 

    const customIcon = new L.Icon({
      iconUrl: iconUrl,
      iconSize: [32, 32],
      iconAnchor: [16, 16],
    });

    return customIcon;
  };

  return (
    <Card >
      <MapContainer center={mapCenter} zoom={mapZoom} style={{ height: '500px', width: '100%', zIndex: '1' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {/* <DynamicZoomMap /> */}
        {filteredRobots.map((robot) => {
          const position: LatLngTuple = [robot.AverageLatitude, robot.AverageLongitude];

          return (
            <Marker
              key={robot.RunID}
              position={position}
              icon={getMarkerIcon(robot.AverageWeight)}
            >
              <Popup>
                Robot ID: {robot.RunID}<br />
                Latitude: {robot.AverageLatitude}<br />
                Longitude: {robot.AverageLongitude}<br />
                Weight: {robot.AverageWeight} g
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </Card>
  );
};

export default RobotMap;
