import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';

interface DataRow {
  Timestamp: number;
  RunID: number;
  Weight: number;
  Temperature: number;
  Humidity: number;
  Latitude: number;
  Longitude: number;
}

interface AverageDataRow {
  Timestamp: number;
  RunID: number;
  AverageWeight: number;
  AverageTemperature: number;
  AverageHumidity: number;
  AverageLatitude: number;
  AverageLongitude: number;
}

const CSVParser: React.FC = () => {
  const [originalData, setOriginalData] = useState<DataRow[]>([]);
  const [averageData, setAverageData] = useState<AverageDataRow[]>([]);

  const parseCSV = async () => {
    try {
      const response = await fetch('/data.csv');
      const text = await response.text();
  
      Papa.parse(text, {
        header: true,
        dynamicTyping: true,
        complete: (result: any) => {
          setOriginalData(result.data || []); 
        },
      });
    } catch (error) {
      console.error('Error fetching CSV file:', error);
    }
  };

  const calculateAverage = () => {
    const groupedData: { [key: number]: DataRow[] } = {};

    originalData.forEach((row) => {
      const runID = row.RunID;
      if (!groupedData[runID]) {
        groupedData[runID] = [];
      }
      groupedData[runID].push(row);
    });

    const averages: AverageDataRow[] = [];

    Object.keys(groupedData).forEach((runID) => {
      const dataRows = groupedData[parseInt(runID, 10)];
      const averageRow: AverageDataRow = {
        Timestamp: dataRows[0].Timestamp, // Use the timestamp from the first row
        RunID: parseInt(runID, 10),
        AverageWeight: dataRows.reduce((sum, row) => sum + row.Weight/1000, 0) / dataRows.length,
        AverageTemperature: dataRows.reduce((sum, row) => sum + row.Temperature, 0) / dataRows.length,
        AverageHumidity: dataRows.reduce((sum, row) => sum + row.Humidity, 0) / dataRows.length,
        AverageLatitude: dataRows.reduce((sum, row) => sum + row.Latitude, 0) / dataRows.length,
        AverageLongitude: dataRows.reduce((sum, row) => sum + row.Longitude, 0) / dataRows.length,
      };
      averages.push(averageRow);
    });

    setAverageData(averages);
  };

  const saveToFile = () => {
    const csvContent = Papa.unparse(averageData, { header: true });
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'averaged_data.csv';
    link.click();
  };

  useEffect(() => {
    parseCSV();
  }, []);

  useEffect(() => {
    calculateAverage();
  }, [originalData]);

  return (
    <div>
      <h1>CSV Parser</h1>
      <button onClick={saveToFile}>Save Averaged Data</button>
    </div>
  );
};

export default CSVParser;
