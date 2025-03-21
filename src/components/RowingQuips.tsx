import { useState, useEffect, useCallback } from 'react';
import { Box } from "@chakra-ui/react";

interface RowingQuipsProps {
    rotationInterval?: number; // Time in ms between quip changes
}

const RowingQuips = ({ rotationInterval = 10000 }: RowingQuipsProps) => {
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

    const [currentQuipIndex, setCurrentQuipIndex] = useState(() =>
        Math.floor(Math.random() * quips.length)
    );

    const [isVisible, setIsVisible] = useState(true);

    // Get a new random quip index different from the current one
    const getNewQuipIndex = useCallback((currentIndex: number) => {
        if (quips.length <= 1) return 0;

        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * quips.length);
        } while (newIndex === currentIndex);

        return newIndex;
    }, [quips.length]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setIsVisible(false);
        }, rotationInterval);

        return () => clearInterval(intervalId);
    }, [rotationInterval]);

    // Handle changing the quip after fade-out
    useEffect(() => {
        if (!isVisible) {
            const timeoutId = setTimeout(() => {
                setCurrentQuipIndex(prevIndex => getNewQuipIndex(prevIndex));
                setIsVisible(true);
            }, 500); // Fade duration

            return () => clearTimeout(timeoutId);
        }
    }, [isVisible, getNewQuipIndex]);

    return (
        <Box
            position="relative"
            minHeight="1.5em"
            display="flex"
            alignItems="center"
            justifyContent="center"
        >
            <Box
                as="span"
                fontSize="md"
                fontFamily="heading"
                textTransform="uppercase"
                letterSpacing="wider"
                fontWeight="medium"
                color="gray.500"
                opacity={isVisible ? 1 : 0}
                transition="opacity 0.5s ease-in-out"
            >
                {quips[currentQuipIndex]}
            </Box>
        </Box>
    );
};

export default RowingQuips;
