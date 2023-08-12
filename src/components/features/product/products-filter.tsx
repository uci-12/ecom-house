import { useState, useEffect, useMemo } from "react";
import {
  Stack,
  Box,
  HStack,
  VStack,
  Flex,
  Text,
  Button,
  InputLeftAddon,
  InputLeftElement,
} from "@chakra-ui/react";
import { Search } from "react-feather";
import type { ProductRequestParams } from "@/types";
import { SelectOptions, Input } from "@/components/user-interfaces";

type ProductsFilterProps = {
  categories: string[];
  brands: string[];
  formValues: Omit<ProductRequestParams, "limit" | "skip" | "select">;
  onChangeCategoryBrand: (value: string, type: string) => void;
  onChangePriceRange: (min: number, max: number) => void;
  onChangeSearchProductName: (value: string) => void;
};

export function ProductsFilter({
  categories,
  brands,
  formValues,
  onChangeCategoryBrand,
  onChangePriceRange,
  onChangeSearchProductName,
}: ProductsFilterProps) {
  const {
    category: categoryValue = "",
    brand: brandValue = "",
    minPrice = "",
    maxPrice = "",
    q: searchProductName = "",
  } = formValues;

  const [priceRange, setPriceRange] = useState({
    min: `${minPrice}`,
    max: `${maxPrice}`,
  });

  useEffect(() => {
    if (!minPrice && !maxPrice) {
      setPriceRange({
        min: "",
        max: "",
      });
    }
  }, [maxPrice, minPrice]);

  const onChangePriceInput = (value: string, key: string) => {
    setPriceRange((currState) => ({
      ...currState,
      [key]: value,
    }));
  };

  const isNotValidPriceRange =
    (Number(priceRange.min) ?? 0) >= (Number(priceRange.max) ?? 0);

  const inputMinPrice = useMemo(
    () => (
      <Input
        value={priceRange.min}
        type="number"
        name="min"
        onChange={onChangePriceInput}
        placeholder="Minimum"
        leftAddon={<InputLeftAddon>$</InputLeftAddon>}
      />
    ),
    [priceRange.min],
  );

  return (
    <Stack
      spacing={4}
      width="full"
      justify="space-between"
      direction={{ base: "column", md: "column", lg: "row" }}
    >
      <SelectOptions
        name="category"
        value={categoryValue}
        data={categories}
        onChange={onChangeCategoryBrand}
      />
      <SelectOptions
        name="brand"
        value={brandValue}
        data={brands}
        onChange={onChangeCategoryBrand}
      />
      <Box w={{ base: "full", md: "30%" }}>
        <VStack align="flex-start" spacing={2}>
          <Text>Price Range</Text>
          <HStack spacing={2}>
            {inputMinPrice}
            {/* <Input
              value={priceRange.min}
              type="number"
              name="min"
              onChange={onChangePriceInput}
              placeholder="Minimum"
              leftAddon={<InputLeftAddon>$</InputLeftAddon>}
            /> */}
            <Input
              value={priceRange.max}
              type="number"
              name="max"
              onChange={onChangePriceInput}
              placeholder="Maximum"
              leftAddon={<InputLeftAddon>$</InputLeftAddon>}
            />
            <Button
              width="100px"
              colorScheme="teal"
              isDisabled={isNotValidPriceRange}
              onClick={() =>
                !isNotValidPriceRange &&
                onChangePriceRange(
                  Number(priceRange.min) ?? 0,
                  Number(priceRange.max) ?? 0,
                )
              }
            >
              Save
            </Button>
          </HStack>
        </VStack>
      </Box>
      <Flex
        width={{ base: "full", md: "auto" }}
        alignSelf={{ base: "flex-start", md: "flex-end" }}
      >
        <Input
          value={searchProductName}
          name="search product by name"
          onChange={onChangeSearchProductName}
          placeholder="Search product"
          leftElement={
            <InputLeftElement>
              <Search size={18} color="grey" />
            </InputLeftElement>
          }
        />
      </Flex>
    </Stack>
  );
}
