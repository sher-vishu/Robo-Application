import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import RobotMap from './RobotMap';
import Card from '@/components/card/Card';

interface RobotData {
  Timestamp: number;
  RunID: number;
  AverageWeight: number;
  AverageTemperature: number;
  AverageHumidity: number;
  AverageLatitude: number;
  AverageLongitude: number;
}

const Map: React.FC = (props: { [x: string]: any }) => {
  const { ...rest } = props;
  const [robotData, setRobotData] = useState<RobotData[]>([]);

  useEffect(() => {
    const fetchRobotData = async () => {
      try {
        const response = await fetch('/averaged_data.csv'); 
        const text = await response.text();

        Papa.parse(text, {
          header: true,
          dynamicTyping: true,
          complete: (result: any) => {
            setRobotData(result.data);
            console.log('map data: ', result.data)
          },
        });
      } catch (error) {
        console.error('Error fetching CSV file:', error);
      }
    };

    fetchRobotData();
  }, []);

  return (
    <>
      <Card {...rest}>
          <RobotMap robots={robotData}/>
      </Card>
    </>
  );
};

export default Map;
