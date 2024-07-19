import React, { useState } from "react";
import { Box, Select, Flex, Heading } from "@chakra-ui/react";
import { Bar } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";

const IntensityChart = ({ data }) => {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedEndYear, setSelectedEndYear] = useState("");

  const handleFilterChange = (setter) => (event) => {
    setter(event.target.value);
  };

  // Filter data based on the selected country and end year
  const filteredData = data.filter((item) => {
    return (
      (!selectedCountry || item.country === selectedCountry) &&
      (!selectedEndYear || item.end_year === selectedEndYear)
    );
  });

  // Prepare data for the chart
  const intensityData = filteredData.map((item) => item.intensity);
  const years = filteredData.map((item) => item.start_year);

  // Color mapping based on intensity
  const getColor = (value) => {
    const colors = ["#7F00FF", "#F2B93B", "#FF8000", "#FF453A"];
    const threshold = Math.max(...intensityData) / 4;
    if (value < threshold) return colors[0];
    if (value < threshold * 2) return colors[1];
    if (value < threshold * 3) return colors[2];
    return colors[3];
  };

  // Chart data configuration
  const chartData = {
    labels: years,
    datasets: [
      {
        label: "Intensity",
        backgroundColor: intensityData.map((value) => getColor(value)),
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 1,
        data: intensityData,
      },
    ],
  };

  // Chart options configuration
  const chartOptions = {
    layout: {
      padding: {
        top: 20,
        bottom: 20,
        left: 20,
        right: 20,
      },
    },
    plugins: {
      tooltip: {
        enabled: true,
        backgroundColor: "rgba(0,0,0,0.8)",
        titleColor: "white",
        bodyColor: "white",
        borderColor: "white",
        borderWidth: 1,
        cornerRadius: 5,
        displayColors: false,
      },
      legend: {
        display: false,
      },
      datalabels: {
        anchor: "end",
        align: "start",
        offset: -20,
        font: {
          size: 14,
          weight: "bold",
        },
        formatter: (value) => value + "%",
        shadowBlur: 10,
        shadowColor: "white",
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            family: "Roboto",
            size: 14,
            weight: "bold",
          },
        },
      },
      y: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            family: "Roboto",
            size: 14,
            weight: "bold",
          },
          callback: (value) => value + "%",
        },
      },
    },
    animation: {
      duration: 4000,
      easing: "easeInOutQuart",
      mode: "progressive",
    },
  };

  // Get unique values for filters
  const getUniqueValues = (key) => {
    return Array.from(new Set(data.map((item) => item[key])));
  };

  return (
    <Box m={4} p={4} borderRadius="md" boxShadow="md">
      <Heading as="h2" mb={4}>
        Intensity Chart
      </Heading>
      <Flex mb={4} wrap="wrap">
        <Box mr={4}>
          <Select
            placeholder="Select Country"
            onChange={handleFilterChange(setSelectedCountry)}
          >
            {getUniqueValues("country").map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </Select>
        </Box>
        <Box mr={4}>
          <Select
            placeholder="Select End Year"
            onChange={handleFilterChange(setSelectedEndYear)}
          >
            {getUniqueValues("end_year").map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </Select>
        </Box>
      </Flex>
      <Bar
        data={chartData}
        options={chartOptions}
        plugins={[ChartDataLabels]}
      />
    </Box>
  );
};

export default IntensityChart;
