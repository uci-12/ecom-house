import {
  Stack,
  VStack,
  Box,
  Text,
  Select,
  NumberInput,
} from "@chakra-ui/react";
import type { ProductRequestParams } from "@/types/productsType";
import { capitalize } from "@/utils";

type ProductsFilterProps = {
  categories: string[];
  brands: string[];
  formValues: Omit<ProductRequestParams, "limit" | "skip" | "select">;
  onChangeSelect: (value: string, type: string) => void;
};

type SelectFilterType = {
  name: string;
  value: string;
  data: string[];
  onChange: (value: string, type: string) => void;
};

const SelectFilter = ({ name, value, data, onChange }: SelectFilterType) => {
  return (
    <Box width={{ base: "full", md: "30%" }}>
      <VStack align="flex-start" spacing={3}>
        <Text>{capitalize(name)}</Text>
        <Select
          placeholder={`Filter by ${name}`}
          onChange={(e) => onChange(e.target.value, name)}
          value={value ?? ""}
        >
          {data.map((item, idx) => (
            <option key={idx} value={item}>
              {item}
            </option>
          ))}
        </Select>
      </VStack>
    </Box>
  );
};

const ProductsFilter = ({
  categories,
  brands,
  formValues,
  onChangeSelect,
}: ProductsFilterProps) => {
  const {
    category: categoryValue = "",
    brand: brandValue = "",
    minPrice,
    maxPrice,
    q: searchProductValue,
  } = formValues;

  return (
    <Stack
      spacing={3}
      width="full"
      direction={{ base: "column", md: "column", lg: "row" }}
    >
      <SelectFilter
        name="category"
        value={categoryValue}
        data={categories}
        onChange={onChangeSelect}
      />
      <SelectFilter
        name="brand"
        value={brandValue}
        data={brands}
        onChange={onChangeSelect}
      />
    </Stack>
  );
};

export { ProductsFilter };
