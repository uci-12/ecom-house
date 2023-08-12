import { useState, useEffect, useMemo } from "react";
import { Heading, Box, Text, VStack } from "@chakra-ui/react";
import { DoughnutChart } from "@/components/user-interfaces";
import { ChartData } from "chart.js";
import { ProductMapped } from "@/types";

type ChartProductsByCategoryProps = {
  products: ProductMapped[];
};

const defaultChartData: ChartData<"doughnut"> = {
  labels: [],
  datasets: [
    {
      label: "# of items",
      data: [],
      backgroundColor: ["rgba(0, 128, 128, 0.5)"],
      borderColor: ["rgba(0, 128, 128, 1)"],
      borderWidth: 1,
    },
  ],
};

export function ChartProductsByCategory({
  products,
}: ChartProductsByCategoryProps) {
  const [chartData, setChartData] = useState(defaultChartData);

  const newCategories = useMemo(() => {
    const totalCategories: Record<string, number> = {};
    products?.forEach((product) => {
      if (totalCategories[product.category]) {
        totalCategories[product.category] += 1;
      } else {
        totalCategories[product.category] = 1;
      }
    });
    return totalCategories;
  }, [products]);

  useEffect(() => {
    if (!products) return;

    setChartData((currState) => {
      const newData = { ...currState };
      newData.labels = Object.keys(newCategories);
      newData.datasets[0].data = Object.values(newCategories);
      return newData;
    });
  }, [products, newCategories]);

  const customChartData = useMemo(() => {
    const backgroundColors = chartData.labels?.map(
      () =>
        `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
          Math.random() * 255,
        )}, ${Math.floor(Math.random() * 255)}, 0.8)`,
    );

    const borderColors = backgroundColors?.map((color: string) =>
      color.replace("0.2", "1"),
    );
    return {
      ...chartData,
      datasets: [
        {
          ...chartData.datasets[0],
          borderColor: borderColors,
          backgroundColor: backgroundColors,
        },
      ],
    };
  }, [chartData]);

  const categoryCount = chartData.labels?.length || 0;

  return (
    <Box width="full" mt={4} boxShadow="lg" py={4}>
      <VStack spacing={0.5}>
        <Heading size="md" color="blackAlpha.800">
          Products of Category
        </Heading>
        <Text mb="4" fontSize="xs" fontWeight="semibold" color="gray.600">
          Total category: {`${categoryCount > 0 ? categoryCount : 0}`}
        </Text>
      </VStack>
      <DoughnutChart data={customChartData} />
    </Box>
  );
}
