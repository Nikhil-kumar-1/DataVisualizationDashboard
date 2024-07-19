import React, { useState } from "react";
import { PolarArea } from "react-chartjs-2";
import { Box, Heading, Select } from "@chakra-ui/react";

const TopicsPolarAreaChart = ({ data }) => {
  const [selectedTopic, setSelectedTopic] = useState("");

  const handleFilterChange = (event) => {
    setSelectedTopic(event.target.value);
  };

  // Filter data based on selected topic
  const filteredData = data.filter(
    (item) => !selectedTopic || item.topic === selectedTopic
  );

  const topics = filteredData.map((item) => item.topic);
  const relevanceData = filteredData.map((item) => item.relevance);

  const chartData = {
    labels: topics,
    datasets: [
      {
        data: relevanceData,
        backgroundColor: [
          "rgba(75, 192, 192, 0.6)",
          "rgba(255, 159, 64, 0.6)",
          "rgba(255, 205, 86, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(153, 102, 255, 0.6)",
        ],
        borderColor: [
          "rgba(75, 192, 192, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(255, 205, 86, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    scale: {
      ticks: {
        beginAtZero: true,
        stepSize: 1,
        max: 5,
      },
    },
  };

  return (
    <Box m={4} p={4} borderRadius="md" boxShadow="md">
      <Heading as="h2" mb={4}>
        Topics Chart
      </Heading>
      <Box mb={4}>
        <Select
          placeholder="Select Topic"
          value={selectedTopic}
          onChange={handleFilterChange}
        >
          <option value="">All Topics</option>
          <option value="gas">Gas</option>
          <option value="oil market">Oil Market</option>
          <option value="consumption">Consumption</option>
          <option value="battery">Battery</option>
          <option value="robot">Robot</option>
          <option value="economy">Economy</option>
        </Select>
      </Box>
      <PolarArea data={chartData} options={chartOptions} />
    </Box>
  );
};

export default TopicsPolarAreaChart;
