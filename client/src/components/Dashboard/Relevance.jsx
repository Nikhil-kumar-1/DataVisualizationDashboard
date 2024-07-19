import React, { useState } from "react";
import { Bubble } from "react-chartjs-2";
import { Box, Heading, Select, Flex } from "@chakra-ui/react";

const RelevanceBubbleChart = ({ data }) => {
  const [selectedRelevance, setSelectedRelevance] = useState("");
  const [selectedIntensity, setSelectedIntensity] = useState("");

  const handleRelevanceChange = (event) => {
    setSelectedRelevance(event.target.value);
  };

  const handleIntensityChange = (event) => {
    setSelectedIntensity(event.target.value);
  };

  // Filter data based on selected relevance and intensity
  const filteredData = data.filter((item) => {
    return (
      (!selectedRelevance || item.relevance >= selectedRelevance) &&
      (!selectedIntensity || item.intensity >= selectedIntensity)
    );
  });

  const chartData = {
    datasets: [
      {
        label: "Relevance",
        data: filteredData.map((item) => ({
          x: item.likelihood,
          y: item.impact,
          r: item.relevance * 5,
        })),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
      },
      {
        label: "Intensity",
        data: filteredData.map((item) => ({
          x: item.likelihood,
          y: item.impact,
          r: item.intensity,
        })),
        backgroundColor: "rgba(255, 159, 64, 0.6)",
        borderColor: "rgba(255, 159, 64, 1)",
      },
    ],
  };

  const chartOptions = {
    scales: {
      x: {
        type: "linear",
        position: "bottom",
        title: {
          display: true,
          text: "Likelihood",
        },
      },
      y: {
        title: {
          display: true,
          text: "Impact",
        },
      },
    },
    plugins: {
      legend: {
        display: true,
      },
    },
  };

  // Extract unique values for filtering
  const getUniqueValues = (key) => {
    return Array.from(new Set(data.map((item) => item[key]))).sort(
      (a, b) => a - b
    );
  };

  return (
    <Box
      margin={50}
      p={4}
      mt={8}
      borderRadius={18}
      boxShadow="0px 0px 10px rgba(0, 0, 0, 0.1)"
    >
      <Heading as="h2" mb={4}>
        Relevance Chart
      </Heading>
      <Flex mb={4} wrap="wrap">
        <Box mr={4}>
          <Select
            placeholder="Select Minimum Relevance"
            value={selectedRelevance}
            onChange={handleRelevanceChange}
          >
            {getUniqueValues("relevance").map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </Select>
        </Box>
        <Box mr={4}>
          <Select
            placeholder="Select Minimum Intensity"
            value={selectedIntensity}
            onChange={handleIntensityChange}
          >
            {getUniqueValues("intensity").map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </Select>
        </Box>
      </Flex>
      <Bubble data={chartData} options={chartOptions} />
    </Box>
  );
};

export default RelevanceBubbleChart;
