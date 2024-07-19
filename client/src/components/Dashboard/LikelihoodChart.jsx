import React, { useState } from "react";
import { Radar } from "react-chartjs-2";
import { Box, useColorModeValue, Heading, Select } from "@chakra-ui/react";

const LikelihoodRadarChart = ({ data }) => {
  const [selectedRegion, setSelectedRegion] = useState("");

  const handleRegionChange = (event) => {
    setSelectedRegion(event.target.value);
  };

  // Filter data based on the selected region
  const filteredData = selectedRegion
    ? data.filter((entry) => entry.region === selectedRegion)
    : data;

  const chartData = {
    labels: filteredData.map((entry) => entry.country),
    datasets: [
      {
        label: "Likelihood",
        data: filteredData.map((entry) => entry.likelihood),
        backgroundColor: useColorModeValue(
          "rgba(79, 59, 169, 0.7)",
          "rgba(144, 104, 190, 0.7)"
        ),
        borderColor: useColorModeValue(
          "rgba(79, 59, 169, 1)",
          "rgba(144, 104, 190, 1)"
        ),
        borderWidth: 2,
        pointBackgroundColor: useColorModeValue("white", "black"),
        pointBorderColor: useColorModeValue(
          "rgba(79, 59, 169, 1)",
          "rgba(144, 104, 190, 1)"
        ),
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scale: {
      ticks: {
        beginAtZero: true,
        min: 0,
        max: 5,
        stepSize: 1,
      },
    },
  };

  // Extract unique regions from the data
  const getUniqueRegions = () => {
    return Array.from(new Set(data.map((entry) => entry.region)));
  };

  return (
    <Box
      borderRadius={20}
      pt={6}
      boxShadow="0px 0px 10px rgba(0, 0, 0, 0.1)"
      mt={50}
      shadow="md"
      pb={100}
      bg={useColorModeValue("white", "gray.800")}
      maxHeight={700}
      overflow="hidden"
    >
      <Heading as="h2" mb={4} ml={6}>
        Likelihood Chart
      </Heading>
      <Select
        placeholder="Select Region"
        value={selectedRegion}
        onChange={handleRegionChange}
        mb={4}
        ml={6}
      >
        {getUniqueRegions().map((region) => (
          <option key={region} value={region}>
            {region}
          </option>
        ))}
      </Select>
      <Radar data={chartData} options={chartOptions} />
    </Box>
  );
};

export default LikelihoodRadarChart;
