import { Text } from "@chakra-ui/react";
import { ReactNode } from "react";

interface WebsiteTitleProps {
  children: ReactNode;
  fontSize?: string[] | string;
}

export const WebsiteTitle = ({ children, fontSize = ["xl", "2xl"] }: WebsiteTitleProps) => (
  <Text
    as="span"
    fontSize={fontSize}
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
    {children}
  </Text>
);
