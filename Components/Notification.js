import { Text, Box } from "@chakra-ui/react";
import { TimeIcon, CloseIcon } from "@chakra-ui/icons";
import styles from "../styles/Components.module.css";

export default function Notification(props) {
    const { pair, pip } = props;
    return (
        <Box display="flex" alignItems="center" flexDir="row">
            <TimeIcon mr="7px" fontSize="10px"></TimeIcon>
            <Text>
                {pair} : {pip}
            </Text>
            <CloseIcon
                ml="15px"
                color="black"
                fontSize="15px"
                borderRadius="100%"
                background="greenyellow"
                className={styles.clickable}
            ></CloseIcon>
        </Box>
    );
}
