import { capitalize } from "@/utils";
import { Box, VStack, Select, Text } from "@chakra-ui/react";

type SelectOptionsType = {
  name: string;
  value: string;
  data: string[];
  onChange: (value: string, type: string) => void;
};

export const SelectOptions = ({
  name,
  value,
  data,
  onChange,
}: SelectOptionsType) => (
  <Box width={{ base: "full", md: "22%" }}>
    <VStack align="flex-start" spacing={2}>
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
