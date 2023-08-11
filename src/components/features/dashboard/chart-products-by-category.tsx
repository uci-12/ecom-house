import { useState, useEffect, useMemo } from "react";
import { Heading, Card, CardHeader, CardBody } from "@chakra-ui/react";
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
  const [categoriesRecord, setCategoriesRecord] = useState<
    Record<string, number>
  >({});

  useEffect(() => {
    if (!products) return;

    const newCategories = { ...categoriesRecord };
    products?.forEach((product) => {
      if (newCategories[product.category]) {
        newCategories[product.category] += 1;
      } else {
        newCategories[product.category] = 1;
      }
    });
    setCategoriesRecord(newCategories);

    setChartData((prev) => {
      const newData = { ...prev };
      newData.labels = Object.keys(newCategories);
      newData.datasets[0].data = Object.values(newCategories);
      return newData;
    });
  }, [products]);

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
    <Card flex={1}>
      <CardHeader textAlign="center" pb={0}>
        <Heading size="md" color="blackAlpha.800">
          PRODUCTS OF {`${categoryCount > 0 ? categoryCount : 0}`} CATEGORIES
        </Heading>
      </CardHeader>
      <CardBody minW="xl">
        <DoughnutChart data={customChartData} />
      </CardBody>
    </Card>
  );
}
