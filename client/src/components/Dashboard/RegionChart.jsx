import React, { useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Box, Heading, Select } from "@chakra-ui/react";

const RegionChart = ({ data }) => {
  const [selectedRegion, setSelectedRegion] = useState("");

  const handleRegionChange = (event) => {
    setSelectedRegion(event.target.value);
  };

  // Extract unique regions from the data
  const getUniqueRegions = () => {
    const regions = data.map((item) => item.region);
    return Array.from(new Set(regions));
  };

  // Filter data based on the selected region
  const filteredData = data.filter((item) => {
    return !selectedRegion || item.region === selectedRegion;
  });

  // Count occurrences of each region in the filtered data
  const regionCounts = {};
  filteredData.forEach((item) => {
    if (item.region in regionCounts) {
      regionCounts[item.region]++;
    } else {
      regionCounts[item.region] = 1;
    }
  });

  // Define colors dynamically based on the number of unique regions
  const uniqueRegions = getUniqueRegions();
  const backgroundColors = uniqueRegions.map((_, index) => {
    const colors = [
      "#FF6384", // Red
      "#36A2EB", // Blue
      "#FFCE56", // Yellow
      "#4CAF50", // Green
      "#FF9800", // Orange
      "#9C27B0", // Purple
      "#3F51B5", // Indigo
      "#00BCD4", // Cyan
    ];
    return colors[index % colors.length];
  });

  const chartData = {
    labels: Object.keys(regionCounts),
    datasets: [
      {
        data: Object.values(regionCounts),
        backgroundColor: backgroundColors,
        hoverBackgroundColor: backgroundColors,
      },
    ],
  };

  return (
    <Box m={4} p={4} borderRadius="md" boxShadow="md">
      <Heading as="h2" mb={4}>
        Region Distribution
      </Heading>
      <Select
        placeholder="Select Region"
        value={selectedRegion}
        onChange={handleRegionChange}
        mb={4}
      >
        {getUniqueRegions().map((region) => (
          <option key={region} value={region}>
            {region}
          </option>
        ))}
      </Select>
      <Doughnut data={chartData} />
    </Box>
  );
};

export default RegionChart;
