import { useMemo } from 'react';
import { Box, Container, Flex, VStack } from "@chakra-ui/react";

const RowingQuips = () => {
    const quips = [
        "For when your brain is as tired as your arms",
        "Row, row, row your splits... gently down the screen",
        "Making math easier than your last 2K test",
        "Because counting strokes is hard enough",
        "Helping you calculate how much you'll hurt tomorrow",
        "The only calculator that understands your pain",
        "Splits faster than your coach's expectations",
        "For calculations smoother than your technique",
        "Math that works even when your legs don't",
        "Rowing calculators: the original ergometer",
        "When your brain is too oxygen-deprived to do math",
        "Calculations faster than your personal best",
        "Converting sweat to numbers since forever",
        "Your virtual cox who's actually good at math",
        "Making sense of meters when you can't feel your legs",
        "Where numbers hurt less than your blisters",
        "For when 'just pull harder' isn't enough guidance",
        "Because mental math during a 6K is impossible",
        "More reliable than your recovery day promises",
        "Calculating everything except your excuses"
    ];

    const randomQuip = useMemo(() =>
        quips[Math.floor(Math.random() * quips.length)],
        []
    );

    return (
        <Box
            as="span"
            fontSize="md"
            fontFamily="heading"
            textTransform="uppercase"
            letterSpacing="wider"
            fontWeight="medium"
            color="gray.500"
        >
            {randomQuip}
        </Box>
    );
};

export default RowingQuips;
