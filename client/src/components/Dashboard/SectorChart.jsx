import React, { useState } from "react";
import { Pie } from "react-chartjs-2";
import { Box, Heading, Select, useColorModeValue } from "@chakra-ui/react";

const PieChart = ({ data }) => {
  const [selectedSector, setSelectedSector] = useState("");

  const handleSectorChange = (event) => {
    setSelectedSector(event.target.value);
  };

  // Filter data based on the selected sector
  const filteredData = selectedSector
    ? data.filter((entry) => entry.sector === selectedSector)
    : data;

  // Aggregate data for each sector
  const sectors = {};
  filteredData.forEach((entry) => {
    if (!sectors[entry.sector]) {
      sectors[entry.sector] = 0;
    }
    sectors[entry.sector] += entry.intensity;
  });

  const getRandomColor = (index) => {
    const colors = [
      "#FF0080", // Pink
      "#00BFFF", // Deep Sky Blue
      "#FFD700", // Gold
      "#32CD32", // Lime Green
      "#FF4500", // Orange Red
      "#9400D3", // Dark Violet
      // Add more colors as needed
    ];
    return colors[index % colors.length];
  };

  const chartData = {
    labels: Object.keys(sectors),
    datasets: [
      {
        data: Object.values(sectors),
        backgroundColor: Object.keys(sectors).map((_, index) =>
          getRandomColor(index)
        ),
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        position: "average",
      },
    },
  };

  // Extract unique sectors from the data
  const getUniqueSectors = () => {
    return Array.from(new Set(data.map((entry) => entry.sector)));
  };

  return (
    <Box
      p={6}
      borderRadius={20}
      boxShadow="0px 0px 10px rgba(0, 0, 0, 0.1)"
      mt={50}
      ml={50}
      shadow="md"
      pb={100}
      bg={useColorModeValue("white", "gray.800")}
      maxHeight={700}
      overflow="hidden"
    >
      <Heading as="h2" mb={4}>
        Sector Chart
      </Heading>
      <Select
        placeholder="Select Sector"
        value={selectedSector}
        onChange={handleSectorChange}
        mb={4}
      >
        {getUniqueSectors().map((sector) => (
          <option key={sector} value={sector}>
            {sector}
          </option>
        ))}
      </Select>
      <Pie data={chartData} options={chartOptions} />
    </Box>
  );
};

export default PieChart;
