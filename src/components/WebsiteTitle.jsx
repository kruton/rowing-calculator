import { Text } from "@chakra-ui/react";
import './WebsiteTitle.css';

export const WebsiteTitle = () => <Text
    as="span"
    fontSize={["xl", "2xl"]}
    fontFamily="logo"
    fontWeight="900"
    letterSpacing="wider"
    textTransform="uppercase"
    bgSize="300% 300%"
    bgGradient="to-r"
    gradientFrom={"blue.400"}
    gradientVia={["cyan.400", "purple.400", "pink.400"]}
    gradientTo={"blue.400"}
    bgClip="text"
    animation="gradientAnimation"
    style={{ textShadow: "0 0 20px rgba(0,149,255,0.15)" }}
>
    Rowing Calculator
</Text>;
