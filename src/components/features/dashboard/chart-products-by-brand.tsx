import { useState, useEffect, useMemo } from "react";
import { Heading, Box, VStack, Text } from "@chakra-ui/react";
import { DoughnutChart } from "@/components/user-interfaces";
import { ChartData } from "chart.js";
import { ProductMapped } from "@/types";

type ChartProductsByBrandProps = {
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

export function ChartProductsByBrand({ products }: ChartProductsByBrandProps) {
  const [chartData, setChartData] = useState(defaultChartData);

  const newBrands = useMemo(() => {
    const totalBrands: Record<string, number> = {};
    products?.forEach((product) => {
      if (totalBrands[product.brand]) {
        totalBrands[product.brand] += 1;
      } else {
        totalBrands[product.brand] = 1;
      }
    });
    return totalBrands;
  }, [products]);

  useEffect(() => {
    if (!products) return;

    setChartData((currState) => {
      const newData = { ...currState };
      newData.labels = Object.keys(newBrands);
      newData.datasets[0].data = Object.values(newBrands);
      return newData;
    });
  }, [products, newBrands]);

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

  const brandCount = chartData.labels?.length || 0;

  return (
    <Box width="full" mt={4} boxShadow="lg" py={4}>
      <VStack spacing={0.5}>
        <Heading size="md" color="blackAlpha.800">
          Products of Brand
        </Heading>
        <Text mb="4" fontSize="xs" fontWeight="semibold" color="gray.600">
          Total brand: {`${brandCount > 0 ? brandCount : 0}`}
        </Text>
      </VStack>
      <DoughnutChart data={customChartData} />
    </Box>
  );
}
