import { Box, Text } from "@chakra-ui/react";
import styles from "../styles/Components.module.css";

export default function Notification(props) {
    const { rate, filter } = props;

    return (
        <>
            <Box ml="15px" mr="15px" pt="40px">
                <Text textAlign="right" mr="15px">
                    <b>{rate.base_currency}</b>
                </Text>
                <Box mt="10px" padding="20px" className={styles.ratesCard}>
                    {(() => {
                        let result = <></>;
                        for (let pair in rate.rates) {
                            let display_name;
                            if (pair === rate.base_currency) {
                                display_name = rate.base_currency;
                            } else {
                                display_name = rate.base_currency + "/" + pair;
                            }
                            if (
                                !filter ||
                                display_name.toLowerCase().includes(filter)
                            )
                                result = (
                                    <>
                                        {result}{" "}
                                        <Box
                                            m="5px"
                                            mt="10px"
                                            mb="10px"
                                            w="120px"
                                            maxW="120px"
                                        >
                                            <Text fontSize="12px">
                                                {display_name}
                                            </Text>
                                            <Text
                                                color="greenyellow"
                                                fontSize="10px"
                                            >
                                                {rate.rates[pair]}
                                            </Text>
                                        </Box>
                                    </>
                                );
                        }
                        return result;
                    })()}
                </Box>
            </Box>
        </>
    );
}
