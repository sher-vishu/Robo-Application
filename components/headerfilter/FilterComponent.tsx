import React, { Fragment, useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/lib/hooks'
import { RootState } from '@/lib/store';
import { setMinWeight, 
  setMaxWeight, 
  setMinHumid,
  setMaxHumid,
  setMinTemp,
  setMaxTemp,
  filteredDataFun } from "@/lib/features/roboRunDataSlice";
import { Dialog, Transition } from '@headlessui/react'
import {
  Box,
  FormLabel,
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderMark,
  Select,
  Grid,
  GridItem
} from '@chakra-ui/react'
import { Card } from '@chakra-ui/react'
import Nav from '../navbar/nav';

const FilterComponent = () => {

  const dispatch = useAppDispatch();

  // temperature
  const minTemp = useAppSelector((state: RootState) => state.runData.minTemp);
  const maxTemp = useAppSelector((state: RootState) => state.runData.maxTemp);
  let [isOpenTemp, setIsOpenTemp] = useState(false)
  const [tempSliderValue, setTempSliderValue] = useState([-10, 20]);

  // humidity
  let [isOpenHumid, setIsOpenHumid] = useState(false)
  const [humidSliderValue, setHumidSliderValue] = useState([5, 95]);
  const minHumid = useAppSelector((state: RootState) => state.runData.minHumid);
  const maxHumid = useAppSelector((state: RootState) => state.runData.maxHumid);

  //  weight
  let [isOpenWeight, setIsOpenWeight] = useState(false)
  const [weightSliderValue, setWeightSliderValue] = useState([0, 100]);
  const minWeight = useAppSelector((state: RootState) => state.runData.minWeight);
  const maxWeight = useAppSelector((state: RootState) => state.runData.maxWeight);

  // Temperature handler
  const handleTempChange = (newValues: any) => {
    setTempSliderValue(newValues);
    dispatch(setMinTemp(newValues[0]))
    dispatch(setMaxTemp(newValues[1]))
  };

  function closeTempModal() {
    setIsOpenTemp(false)
  }

  function openTempModal() {
    setIsOpenTemp(true)
    handleTempChange(tempSliderValue)
  }

    // Humidity handler
    const handleHumidChange = (newValues: any) => {
      setHumidSliderValue(newValues);
      dispatch(setMinHumid(newValues[0]))
      dispatch(setMaxHumid(newValues[1]))
    };
    function closeHumidModal() {
      setIsOpenHumid(false)
    }
  
    function openHumidModal() {
      setIsOpenHumid(true)
      handleHumidChange(humidSliderValue)
    }
  
  // Weight handler
  function closeWeightModal() {
    setIsOpenWeight(false)
  }

  function openWeightModal() {
    setIsOpenWeight(true)
  }

  const handleWeightChange = (newValues: any) => {
    console.log(newValues)
    setWeightSliderValue(newValues);
    dispatch(setMinWeight(newValues[0]))
    dispatch(setMaxWeight(newValues[1]))
    
  };

    
  useEffect(() => {
    dispatch(filteredDataFun());
  }, [minTemp, maxTemp, minHumid, maxHumid, minWeight, maxWeight]);

  return (
    <div style={{ backgroundColor: '#ebeef3', zIndex:"500", position:"fixed" }}>
      <Nav />
      <div>
        <Card className='p-3'>
        <Grid templateColumns='repeat(8, 1fr)' gap={6}>

            {/* Temperature slider render */}
            <GridItem>
            <div className="relative items-center justify-center">
            <label style={{ fontSize: '15px', marginBottom: '-22px' }}>Temperature</label>
              <Select variant='flushed' size="sm" onClick={openTempModal}>
                <option value="">{minTemp}-{maxTemp}</option>
              </Select>
            </div>

            <Transition appear show={isOpenTemp} as={Fragment}>
              <Dialog
                as="div"
                className="fixed inset-0 z-10 overflow-y-auto mt-20"
                onClose={closeTempModal}
                initialFocus={null}
              >
                <div className="flex items-center justify-center p-4 text-center">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                  >
                    <Dialog.Panel className="w-full max-w-xs mt-12 transform overflow-hidden rounded-xl bg-white p-5 text-left align-middle shadow-xl transition-all">
                      <div className="mt-2">
                        <FormLabel as="legend">Temperature</FormLabel>
                        <Box pt={6} pb={2} position="relative">
                          <RangeSlider aria-label={['min, max']}
                            onChange={handleTempChange}
                            value={tempSliderValue}
                            min={-10}
                            max={20}>
                            <RangeSliderMark value={tempSliderValue[0]} textAlign='center' bg="blue.500" color="white" mt='-10' w="12">
                              {tempSliderValue[0]}
                            </RangeSliderMark>
                            <RangeSliderTrack>
                              <RangeSliderFilledTrack />
                            </RangeSliderTrack>
                            <RangeSliderThumb index={0} />
                            <RangeSliderThumb index={1} />
                            <RangeSliderMark value={tempSliderValue[1]} textAlign='center' bg="blue.500" color="white" mt="-10" ml="-10" w="12">
                              {tempSliderValue[1]}
                            </RangeSliderMark>
                          </RangeSlider>
                        </Box>
                      </div>

                      <div className="mt-4">
                        <p>Between {tempSliderValue[0]} and {tempSliderValue[1]}</p>
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </Dialog>
            </Transition>
            </GridItem>

            {/* Humidity slider render */}
            <GridItem>
            <div className="relative items-center justify-center">
            <label style={{ fontSize: '15px', marginBottom: '-22px' }}>Humidity</label>
        <Select variant="flushed" size="sm" onClick={openHumidModal}>
          <option value="">{minHumid}-{maxHumid}</option>
        </Select>
      </div>

      <Transition appear show={isOpenHumid} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto mt-20"
          onClose={closeHumidModal}
          initialFocus={null}
        >
          <div className="flex items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-xs transform overflow-hidden rounded-xl bg-white p-5 mt-12 text-left align-middle shadow-xl transition-all">
                <div className="mt-2">
                  <FormLabel as="legend">Humidity</FormLabel>
                  <Box pt={6} pb={2} position="relative">
                    <RangeSlider aria-label={['min, max']} 
                    onChange={handleHumidChange} 
                    value={humidSliderValue}
                      min={5} 
                      max={95}>
                      <RangeSliderMark value={humidSliderValue[0]} textAlign='center' bg="blue.500" color="white" mt="-10" w="12">
                        {humidSliderValue[0]}
                      </RangeSliderMark>
                      <RangeSliderTrack>
                        <RangeSliderFilledTrack />
                      </RangeSliderTrack>
                      <RangeSliderThumb index={0} />
                      <RangeSliderThumb index={1} />
                      <RangeSliderMark value={humidSliderValue[1]} textAlign='center' bg="blue.500" color="white" mt="-10" ml="-10" w="12">
                        {humidSliderValue[1]}
                      </RangeSliderMark>
                    </RangeSlider>
                  </Box>
                </div>

                <div className="mt-4">
                  <p>Between {humidSliderValue[0]} and {humidSliderValue[1]}</p>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
      </GridItem>

      {/* Weight slider render */}
        <GridItem>
      <div className="relative items-center justify-center">
      <label style={{ fontSize: '15px', marginBottom: '-22px' }}>Weight</label>
        <Select variant="flushed" size="sm" onClick={openWeightModal}>
          <option value="">{minWeight}-{maxWeight}</option>
        </Select>
      </div>

      <Transition appear show={isOpenWeight} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto mt-20"
          onClose={closeWeightModal}
          initialFocus={null}
        >
          <div className="flex items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-xs transform overflow-hidden rounded-xl bg-white p-4 text-left mt-12 align-middle shadow-xl transition-all">
                <div className="mt-2">
                  <FormLabel as="legend">Weight</FormLabel>
                  <Box pt={6} pb={2} position="relative">
                    <RangeSlider aria-label={['min', 'max']} 
                    onChange={handleWeightChange} 
                    value={weightSliderValue}
                    min={0} 
                    max={100}>
                      <RangeSliderMark value={weightSliderValue[0]} textAlign='center' bg="blue.500" color="white" mt="-10" w="12">
                        {weightSliderValue[0]}
                      </RangeSliderMark>
                      <RangeSliderTrack>
                        <RangeSliderFilledTrack />
                      </RangeSliderTrack>
                      <RangeSliderThumb index={0} />
                      <RangeSliderThumb index={1} />
                      <RangeSliderMark value={weightSliderValue[1]} textAlign='center' bg="blue.500" color="white" mt="-10" ml="-10" w="12">
                        {weightSliderValue[1]}
                      </RangeSliderMark>
                    </RangeSlider>
                  </Box>
                </div>

                <div className="mt-4">
                  <p>Between {weightSliderValue[0]} and {weightSliderValue[1]}</p>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
      </GridItem>
            </Grid>
        </Card>
      </div>
    </div>
  );
};

export default FilterComponent;