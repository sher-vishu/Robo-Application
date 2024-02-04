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
  Legend
} from 'chart.js';
// Chakra imports
import { Box, Button, Flex, Icon, Text, useColorModeValue } from '@chakra-ui/react';
// Assets
import { RiArrowDownSFill } from 'react-icons/ri';
import { IoCheckmarkCircle } from 'react-icons/io5';
import { MdBarChart, MdOutlineCalendarToday } from 'react-icons/md';
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

const TemperatureComponent = (props: { [x: string]: any }) => {
  const { ...rest } = props;

  // Chakra Color Mode

	const textColor = useColorModeValue('secondaryGray.900', 'white');
	const textColorSecondary = useColorModeValue('secondaryGray.600', 'white');
	const boxBg = useColorModeValue('secondaryGray.300', 'whiteAlpha.100');
	const iconColor = useColorModeValue('brand.500', 'white');
	const bgButton = useColorModeValue('secondaryGray.300', 'whiteAlpha.100');
	const bgHover = useColorModeValue({ bg: 'secondaryGray.400' }, { bg: 'whiteAlpha.50' });
	const bgFocus = useColorModeValue({ bg: 'secondaryGray.300' }, { bg: 'whiteAlpha.100' });

  const dispatch = useAppDispatch();
  const [data, setData] = useState<any>();
  const stateData = useAppSelector((state: RootState) => state.runData.filteredData);
  const minTemp = useAppSelector((state: RootState) => state.runData.minTemp);
  const maxTemp = useAppSelector((state: RootState) => state.runData.maxTemp);

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

            let tempChartData = {
              labels: result.data.map((row: { Timestamp: number; }) => formatDate(row.Timestamp)),
              datasets: [
                {
                  label: 'Temperature',
                  data: result.data.map((row: { AverageTemperature: any; }) => row.AverageTemperature),
                  backgroundColor: 'rgba(39, 65, 255, 1)',
                  borderColor: 'rgba(39, 65, 255, 1)',
                  borderWidth: 1,
                },
              ],
            };
            setData(tempChartData)
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
  console.log("state Data: ", stateData) 
  let tempChartData = {
    labels: stateData.map((row) => formatDate(row.Timestamp)),
    datasets: [
      {
        label: 'Temperature',
        data: stateData.map((row) => row.AverageTemperature),
        backgroundColor: 'rgba(39, 65, 255, 1)',
        borderColor: 'rgba(39, 65, 255, 1)',
        borderWidth: 1,
      },
    ],
  };
  
  setData(tempChartData)
  }, [minTemp, maxTemp]);

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
    <Card justifyContent='center' alignItems='center' flexDirection='column' w='100%' mb='0px' {...rest}>
      <Flex justify='space-between' ps='0px' pe='20px' pt='5px' w='100%'>
				<Flex align='center' w='100%'>
					<Button bg={boxBg} fontSize='sm' fontWeight='500' color={textColorSecondary} borderRadius='7px'>
						<Icon as={MdOutlineCalendarToday} color={textColorSecondary} me='4px' />
						This month
					</Button>
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
      <Flex w='100%' flexDirection={{ base: 'column', lg: 'row' }}>
				<Flex flexDirection='column' me='20px' mt='28px'>
					<Text color={textColor} fontSize='34px' textAlign='start' fontWeight='700' lineHeight='100%'>
						11.3°C
					</Text>
					<Flex align='center' mb='20px'>
						<Text color='secondaryGray.600' fontSize='sm' fontWeight='500' mt='4px' me='12px'>
							Temperature
						</Text>
						<Flex align='center'>
							<Icon as={RiArrowDownSFill} color='green.500' me='2px' mt='2px' />
							<Text color='green.500' fontSize='sm' fontWeight='700' lineHeight='100%'>
								-2.45%
							</Text>
						</Flex>
					</Flex>

					<Flex align='center'>
						<Icon as={IoCheckmarkCircle} color='green.500' me='4px' />
						<Text color='green.500' fontSize='md' fontWeight='700'>
							On track
						</Text>
					</Flex>
				</Flex>
        </Flex>
      <Box minH='260px' minW='100%' mt='auto'>
      {data ? <Bar data={data} options={options} /> : null}
      </Box>
     
  </Card>
  );
};

export default TemperatureComponent;
