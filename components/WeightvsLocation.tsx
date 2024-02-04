import React, { useEffect, useState } from 'react';
import { Scatter } from 'react-chartjs-2';
import Papa from 'papaparse';
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  PointElement
} from 'chart.js';
// Chakra imports
import { Box, Flex, Text, Select, useColorModeValue } from '@chakra-ui/react';
import Card from '@/components/card/Card';
import { filteredDataFun, setAllData } from "@/lib/features/roboRunDataSlice";
import { useAppSelector, useAppDispatch } from '@/lib/hooks';
import { RootState } from '@/lib/store';
import { VSeparator } from '@/components/separator/Separator';
ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  PointElement
);

interface DataRow {
  Timestamp: number;
  RunID: number;
  AverageWeight: number;
  AverageTemperature: number;
  AverageHumidity: number;
  AverageLatitude: number;
  AverageLongitude: number;
}

const ScatterPlot = (props: { [x: string]: any }) => {
  const { ...rest } = props;

	// Chakra Color Mode
	const textColor = useColorModeValue('secondaryGray.900', 'white');
	const cardColor = useColorModeValue('white', 'navy.700');
	const cardShadow = useColorModeValue('0px 18px 40px rgba(112, 144, 176, 0.12)', 'unset');

  const dispatch = useAppDispatch();
  const [data, setData] = useState<any>();
  const stateData = useAppSelector((state: RootState) => state.runData.filteredData);
  const minWeight = useAppSelector((state: RootState) => state.runData.minWeight);
  const maxWeight = useAppSelector((state: RootState) => state.runData.maxWeight);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/averaged_data.csv');
        const text = await response.text();

        Papa.parse(text, {
          header: true,
          dynamicTyping: true,
          complete: (result: any) => {
            dispatch(setAllData(result.data));
            dispatch(filteredDataFun()); 

            let scatterData = {
              datasets: [
                {
                  label: 'Weight vs Location',
                  data: result.data.map((row: { AverageLongitude: number; AverageLatitude: number; AverageWeight: number; }) => ({
                    x: row.AverageLongitude,
                    y: row.AverageLatitude,
                    weight: row.AverageWeight
                  })),
                  backgroundColor: 'rgba(39, 65, 255, 1)',
                  borderColor: 'rgba(39, 65, 255, 1)',
                  borderWidth: 1,
                  pointStyle: 'circle',
                  pointRadius: 5,
                },
              ],
            };
            setData(scatterData)
          },
        });
      } catch (error) {
        console.error('Error fetching CSV file:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    dispatch(filteredDataFun()); 
    console.log("state Data: ", stateData) 
    let scatterData = {
      datasets: [
        {
          label: 'Weight vs Location',
          data: stateData.map((row) => ({
            x: row.AverageLongitude,
            y: row.AverageLatitude,
            weight: row.AverageWeight
          })),
          backgroundColor: 'rgba(39, 65, 255, 1)',
          borderColor: 'rgba(39, 65, 255, 1)',
          borderWidth: 1,
          pointStyle: 'circle',
          pointRadius: 5,
        },
      ],
    };
    
    setData(scatterData)
  }, [minWeight, maxWeight]);

  const options = {
    scales: {
      x: {
        type: 'linear',
        position: 'bottom',
        title: {
          display: true,
          text: 'Longitude'
        }
      },
      y: {
        type: 'linear',
        position: 'left',
        title: {
          display: true,
          text: 'Latitude'
        }
      }
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function(context: { dataset: { data: { [x: string]: { weight: any; }; }; }; dataIndex: string | number; }) {
            return `Weight: ${context.dataset.data[context.dataIndex].weight}`;
          }
        }
      }
    }
  };
  

  return (
    <Card p='20px' alignItems='center' flexDirection='column' w='100%' {...rest}>
      <Flex
				px={{ base: '0px', '2xl': '10px' }}
				justifyContent='space-between'
				alignItems='center'
				w='100%'
				mb='8px'>
				<Text color={textColor} fontSize='md' fontWeight='600' mt='4px'>
					Scatter Plot 
				</Text>
				<Select fontSize='sm' variant='subtle' defaultValue='monthly' width='unset' fontWeight='700'>
					<option value='daily'>Daily</option>
					<option value='monthly'>Monthly</option>
					<option value='yearly'>Yearly</option>
				</Select>
			</Flex>
      {data ? <Scatter data={data} options={options} /> : null}
      <Card
				bg={cardColor}
				flexDirection='row'
				boxShadow={cardShadow}
				w='100%'
				p='15px'
				px='20px'
				mt='15px'
				mx='auto'>
				<Flex direction='column' py='5px'>
					<Flex align='center'>
						<Box h='8px' w='8px' bg='brand.500' borderRadius='50%' me='4px' />
						<Text fontSize='xs' color='secondaryGray.600' fontWeight='700' mb='5px'>
							Location 1
						</Text>
					</Flex>
					<Text fontSize='lg' color={textColor} fontWeight='700'>
						63%
					</Text>
				</Flex>
				<VSeparator mx={{ base: '60px', xl: '60px', '2xl': '60px' }} />
				<Flex direction='column' py='5px' me='10px'>
					<Flex align='center'>
						<Box h='8px' w='8px' bg='#6AD2FF' borderRadius='50%' me='4px' />
						<Text fontSize='xs' color='secondaryGray.600' fontWeight='700' mb='5px'>
							Location 2
						</Text>
					</Flex>
					<Text fontSize='lg' color={textColor} fontWeight='700'>
						25%
					</Text>
				</Flex>
			</Card>
    </Card>
  );
};

export default ScatterPlot;
