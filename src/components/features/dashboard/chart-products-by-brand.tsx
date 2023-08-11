import { useState, useEffect, useMemo } from "react";
import { Heading, Card, CardHeader, CardBody } from "@chakra-ui/react";
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
  const [brandsRecord, setBrandsRecord] = useState<Record<string, number>>({});

  useEffect(() => {
    if (!products) return;

    const newBrands = { ...brandsRecord };
    products?.forEach((product) => {
      if (newBrands[product.brand]) {
        newBrands[product.brand] += 1;
      } else {
        newBrands[product.brand] = 1;
      }
    });
    setBrandsRecord(newBrands);

    setChartData((prev) => {
      const newData = { ...prev };
      newData.labels = Object.keys(newBrands);
      newData.datasets[0].data = Object.values(newBrands);
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

  const brandCount = chartData.labels?.length || 0;

  return (
    <Card flex={1}>
      <CardHeader textAlign="center" pb={0}>
        <Heading size="md" color="blackAlpha.800">
          PRODUCTS OF {`${brandCount > 0 ? brandCount : 0}`} BRANDS
        </Heading>
      </CardHeader>
      <CardBody minW="xl">
        <DoughnutChart data={customChartData} />
      </CardBody>
    </Card>
  );
}
