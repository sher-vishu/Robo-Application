import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import Papa from 'papaparse';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
// Chakra imports
import { Box, Button, Flex, Icon, Text, useColorModeValue } from '@chakra-ui/react';
// Assets
import { RiArrowUpSFill } from 'react-icons/ri';
import { MdBarChart } from 'react-icons/md';
// Custom Components
import Card from '@/components/card/Card';
import { filteredDataFun, setAllData } from "@/lib/features/roboRunDataSlice";
import { useAppSelector, useAppDispatch } from '@/lib/hooks';
import { RootState } from '@/lib/store';
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
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

interface IChartProps {
  filteredData: any[],
}

const HumidityComponent = (props: { [x: string]: any }) => {
  const { ...rest } = props;

  // Chakra Color Mode
	const textColor = useColorModeValue('secondaryGray.900', 'white');
	const iconColor = useColorModeValue('brand.500', 'white');
	const bgButton = useColorModeValue('secondaryGray.300', 'whiteAlpha.100');
	const bgHover = useColorModeValue({ bg: 'secondaryGray.400' }, { bg: 'whiteAlpha.50' });
	const bgFocus = useColorModeValue({ bg: 'secondaryGray.300' }, { bg: 'whiteAlpha.100' });

  const dispatch = useAppDispatch();
  const [data, setData] = useState<any>();
  const stateData = useAppSelector((state: RootState) => state.runData.filteredData);
  const minHumid = useAppSelector((state: RootState) => state.runData.minHumid);
  const maxHumid = useAppSelector((state: RootState) => state.runData.maxHumid);

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

            let humChartData = {
              labels: result.data.map((row: { Timestamp: number; }) => formatDate(row.Timestamp)),
              datasets: [
                {
                  label: 'Humidity',
                  data: result.data.map((row: { AverageHumidity: any; }) => row.AverageHumidity),
                  backgroundColor: 'rgba(39, 65, 255, 1)',
                  borderColor: 'rgba(39, 65, 255, 1)',
                  borderWidth: 1,
                },
              ],
            };
            setData(humChartData)
          },
        });
      } catch (error) {
        console.error('Error fetching CSV file:', error);
      }
    };

    fetchData();
  }, []);

  const formatDate = (timestamp: number): string => {
    const date = new Date(timestamp * 1000); 
    return date.toLocaleString(); 
  };

  useEffect(() => {
    dispatch(filteredDataFun()); 
    let humChartData = {
      labels: stateData.map((row) => formatDate(row.Timestamp)),
      datasets: [
        {
          label: 'Humidity',
          data: stateData.map((row) => row.AverageHumidity),
          backgroundColor: 'rgba(192,75,192,0.2)',
          borderColor: 'rgba(192,75,192,0.2)',
          borderWidth: 1,
        },
      ],
    };
    
    setData(humChartData)
    }, [minHumid, maxHumid]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
      },
    },
  };
  
  return (
    <Card alignItems='center' flexDirection='column' w='100%' {...rest}>
      <Flex justify='space-between' align='start' px='10px' pt='5px' w='100%'>
				<Flex flexDirection='column' align='start' me='20px'>
					<Text color='secondaryGray.600' fontSize='sm' fontWeight='500'>
						Humidity
					</Text>
					<Flex align='end'>
						<Text color={textColor} fontSize='34px' fontWeight='700' lineHeight='100%'>
						46.2
						</Text>
						<Text ms='6px' color='secondaryGray.600' fontSize='sm' fontWeight='500'>
							%
						</Text>
            <Icon as={RiArrowUpSFill} color='green.500' />
					<Text color='green.500' fontSize='sm' fontWeight='700'>
						+1.76%
					</Text>
					</Flex>
				</Flex>
        <Flex align='center' mt='4px'>
        <Button
						ms='auto'
						alignItems='center'
						justifyContent='center'
						bg={bgButton}
						_hover={bgHover}
						_focus={bgFocus}
						_active={bgFocus}
						w='37px'
						h='37px'
						lineHeight='100%'
						borderRadius='10px'
						{...rest}>
						<Icon as={MdBarChart} color={iconColor} w='24px' h='24px' />
					</Button>
				</Flex>
			</Flex>
   
      <Box h='260px' w='100%' mt='auto'>
      {data ? <Bar data={data} options={options} /> : null}
      </Box>
  </Card>
  );
};

export default HumidityComponent;
