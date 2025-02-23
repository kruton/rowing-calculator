import {
  Box,
  Field,
  Flex,
  HStack,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import {
  NativeSelectField,
  NativeSelectRoot,
} from "@/components/ui/native-select";
import { useEffect, useState } from "react";
import { useColorModeValue } from "@/components/ui/color-mode";
import { InputGroup } from "@/components/ui/input-group";

function TimeCalculator() {
  const [splitMinutes, setSplitMinutes] = useState("");
  const [splitSeconds, setSplitSeconds] = useState("");
  const [splitTenths, setSplitTenths] = useState("");
  const [totalHours, setTotalHours] = useState("");
  const [totalMinutes, setTotalMinutes] = useState("");
  const [totalSeconds, setTotalSeconds] = useState("");
  const [distance, setDistance] = useState("");
  const [weight, setWeight] = useState("");
  const [weightUnit, setWeightUnit] = useState("kg");
  const [error, setError] = useState("");
  const [lastTwoInputs, setLastTwoInputs] = useState<string[]>([]);
  const [watts, setWatts] = useState("");
  const [wattsPerKg, setWattsPerKg] = useState("");

  const calculatedFieldColor = useColorModeValue("gray.200", "gray.700");

  enum InputType {
    Split = "split",
    Total = "total",
    Distance = "distance",
  }

  // Retrieve the stored weight unit on component mount
  useEffect(() => {
    const storedWeightUnit = localStorage.getItem("weightUnit");
    if (storedWeightUnit) {
      setWeightUnit(storedWeightUnit);
    }
  }, []);

  // Store the weight unit in local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("weightUnit", weightUnit);
  }, [weightUnit]);

  // Track input changes
  const updateLastInputs = (inputType: InputType) => {
    setLastTwoInputs((prev) => {
      const filtered = prev.filter((type) => type !== inputType);
      const updated = [...filtered, inputType];
      return updated.slice(-2);
    });
  };

  useEffect(() => {
    setError("");
    if (lastTwoInputs.length < 2) return;

    try {
      const splitTimeInSeconds =
        (splitMinutes ? Number(splitMinutes) * 60 : 0) +
        (splitSeconds ? Number(splitSeconds) : 0) +
        (splitTenths ? Number(splitTenths) / 10 : 0);
      const totalTimeInSeconds =
        (totalHours ? Number(totalHours) * 3600 : 0) +
        (totalMinutes ? Number(totalMinutes) * 60 : 0) +
        (totalSeconds ? Number(totalSeconds) : 0);
      const distanceInMeters = Number(distance);

      const inputsToCalculate = [
        InputType.Split,
        InputType.Total,
        InputType.Distance,
      ].filter((type) => !lastTwoInputs.includes(type))[0];

      if (inputsToCalculate === InputType.Split) {
        setSplitMinutes("");
        setSplitSeconds("");
        setSplitTenths("");
      } else if (inputsToCalculate === InputType.Total) {
        setTotalHours("");
        setTotalMinutes("");
        setTotalSeconds("");
      } else if (inputsToCalculate === InputType.Distance) {
        setDistance("");
      }

      if (
        lastTwoInputs.includes(InputType.Split) &&
        lastTwoInputs.includes(InputType.Distance) &&
        splitTimeInSeconds > 0 &&
        distanceInMeters > 0
      ) {
        const totalTime = (splitTimeInSeconds / 500) * distanceInMeters;
        setTotalHours(Math.floor(totalTime / 3600).toString());
        setTotalMinutes(Math.floor((totalTime % 3600) / 60).toString());
        setTotalSeconds(Math.floor(totalTime % 60).toString());
      } else if (
        lastTwoInputs.includes(InputType.Total) &&
        lastTwoInputs.includes(InputType.Distance) &&
        totalTimeInSeconds > 0 &&
        distanceInMeters > 0
      ) {
        const splitTime = (totalTimeInSeconds / distanceInMeters) * 500;
        setSplitMinutes(Math.floor(splitTime / 60).toString());
        setSplitSeconds(Math.floor(splitTime % 60).toString());
        setSplitTenths(Math.floor((splitTime * 10) % 10).toString());
      } else if (
        lastTwoInputs.includes(InputType.Split) &&
        lastTwoInputs.includes(InputType.Total) &&
        splitTimeInSeconds > 0 &&
        totalTimeInSeconds > 0
      ) {
        const calculatedDistance =
          (totalTimeInSeconds / splitTimeInSeconds) * 500;
        setDistance(Math.round(calculatedDistance).toString());
      }

      // Corrected watts calculation using split time in seconds
      if (splitTimeInSeconds > 0) {
        const calculatedWatts = 2.8 / Math.pow(splitTimeInSeconds / 500, 3);
        setWatts(calculatedWatts.toFixed(2));

        // Calculate watts per kilogram
        const weightInKg =
          weightUnit === "lbs" ? Number(weight) * 0.453592 : Number(weight);
        if (weightInKg > 0) {
          const calculatedWattsPerKg = calculatedWatts / weightInKg;
          setWattsPerKg(calculatedWattsPerKg.toFixed(2));
        }
      }
    } catch (err) {
      setError("Invalid input values");
    }
  }, [
    lastTwoInputs,
    splitMinutes,
    splitSeconds,
    splitTenths,
    totalHours,
    totalMinutes,
    totalSeconds,
    distance,
    weight,
    weightUnit,
  ]);

  interface HandleChangeProps {
    value: string;
    setter: React.Dispatch<React.SetStateAction<string>>;
    name?: InputType;
    maxValue?: number;
  }

  const handleChange = ({
    value,
    setter,
    name = InputType.Split,
    maxValue = 60,
  }: HandleChangeProps) => {
    if (value === "" || (Number(value) >= 0 && Number(value) < maxValue)) {
      setter(value);
      updateLastInputs(name);
    }
  };

  const handleDistanceChange = (value: string) => {
    if (value === "" || Number(value) >= 0) {
      setDistance(value);
      updateLastInputs(InputType.Distance);
    }
  };

  const handleWeightChange = (value: string) => {
    if (value === "" || Number(value) >= 0) {
      setWeight(value);
    }
  };

  const getInputBgColor = (inputType: InputType) => {
    return lastTwoInputs.includes(inputType)
      ? "transparent"
      : calculatedFieldColor;
  };

  return (
    <VStack gap={6} align="stretch">
      <Field.Root>
        <Field.Label>Split Time (per 500m)</Field.Label>
        <HStack gap={2} align="center" w="full">
          <InputGroup w="full">
            <Input
              type="number"
              value={splitMinutes}
              onChange={(e) =>
                handleChange({
                  value: e.target.value,
                  setter: setSplitMinutes,
                })
              }
              placeholder="Min"
              bg={getInputBgColor(InputType.Split)}
            />
          </InputGroup>
          <Text>:</Text>
          <InputGroup w="full">
            <Input
              type="number"
              value={splitSeconds}
              onChange={(e) =>
                handleChange({
                  value: e.target.value,
                  setter: setSplitSeconds,
                })
              }
              placeholder="Sec"
              bg={getInputBgColor(InputType.Split)}
            />
          </InputGroup>
          <Text>.</Text>
          <InputGroup w="full">
            <Input
              type="number"
              value={splitTenths}
              onChange={(e) =>
                handleChange({
                  value: e.target.value,
                  setter: setSplitTenths,
                  maxValue: 10,
                })
              }
              placeholder="Tenths"
              bg={getInputBgColor(InputType.Split)}
              maxLength={1}
            />
          </InputGroup>
        </HStack>
      </Field.Root>

      <Field.Root>
        <Field.Label>Total Time</Field.Label>
        <HStack gap={2} align="center" w="full">
          <InputGroup w="full">
            <Input
              type="number"
              value={totalHours}
              onChange={(e) =>
                handleChange({
                  value: e.target.value,
                  setter: setTotalHours,
                  name: InputType.Total,
                })
              }
              placeholder="Hr"
              bg={getInputBgColor(InputType.Total)}
            />
          </InputGroup>
          <Text>:</Text>
          <InputGroup w="full">
            <Input
              type="number"
              value={totalMinutes}
              onChange={(e) =>
                handleChange({
                  value: e.target.value,
                  setter: setTotalMinutes,
                  name: InputType.Total,
                })
              }
              placeholder="Min"
              bg={getInputBgColor(InputType.Total)}
            />
          </InputGroup>
          <Text>:</Text>
          <InputGroup w="full">
            <Input
              type="number"
              value={totalSeconds}
              onChange={(e) =>
                handleChange({
                  value: e.target.value,
                  setter: setTotalSeconds,
                  name: InputType.Total,
                })
              }
              placeholder="Sec"
              bg={getInputBgColor(InputType.Total)}
            />
          </InputGroup>
        </HStack>
      </Field.Root>

      <Field.Root>
        <Field.Label>Distance</Field.Label>
        <InputGroup endElement={<Text>meters</Text>} w="full">
          <Input
            type="number"
            value={distance}
            onChange={(e) => handleDistanceChange(e.target.value)}
            placeholder="Enter distance"
            bg={getInputBgColor(InputType.Distance)}
          />
        </InputGroup>
      </Field.Root>

      <Field.Root>
        <Field.Label>Weight</Field.Label>
        <HStack gap={2} align="center" w="full">
          <InputGroup w="full">
            <Input
              type="number"
              value={weight}
              onChange={(e) => handleWeightChange(e.target.value)}
              placeholder="Enter weight"
            />
          </InputGroup>
          <NativeSelectRoot>
            <NativeSelectField
              value={weightUnit}
              onChange={(e) => setWeightUnit(e.target.value)}
            >
              <option value="kg">kg</option>
              <option value="lbs">lbs</option>
            </NativeSelectField>
          </NativeSelectRoot>
        </HStack>
      </Field.Root>

      {(watts || wattsPerKg) && (
        <Box p={4} borderRadius="md" borderWidth="1px">
          <Flex justify="center">
            <Box width="50%" textAlign="center">
              {watts && (
                <Text fontSize="lg" fontWeight="bold">
                  Watts: {watts}
                </Text>
              )}
            </Box>
            <Box width="50%" textAlign="center">
              {wattsPerKg && (
                <Text fontSize="lg" fontWeight="bold">
                  Watts/kg: {wattsPerKg}
                </Text>
              )}
            </Box>
          </Flex>
        </Box>
      )}

      {error && (
        <Box p={4} borderRadius="md" borderWidth="1px" borderColor="red.500">
          <Text color="red.500">{error}</Text>
        </Box>
      )}

      <Box p={4} borderRadius="md" borderWidth="1px">
        <Text fontSize="md">
          Enter any two values and the third will be calculated automatically.
          Currently tracking: <strong>{lastTwoInputs.join(" and ")}</strong>
        </Text>
      </Box>
    </VStack>
  );
}

export default TimeCalculator;
