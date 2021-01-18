import Head from "next/head";
import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { Text, Image, Box, Input, Select, Button } from "@chakra-ui/react";
import { HamburgerIcon, WarningIcon } from "@chakra-ui/icons";
import refreshRates from "../Functions/refreshRates";
import RatesCollection from "../Components/RatesCollection";
import Notification from "../Components/Notification";
import styles from "../styles/Components.module.css";
export default function Home() {
    const symbols = [
        "AUD Index",
        "AUD",
        "Australian Index",
        "Bear Market Index",
        "Boom 500 Index",
        "Boom 1000 Index",
        "Bull Market Index",
        "Crash 500 Index",
        "Crash 1000 Index",
        "Dutch Index",
        "EUR Index",
        "EUR",
        "Euro 50 Index",
        "French Index",
        "GBP Index",
        "GBP",
        "German Index",
        "Gold",
        "Hong Kong Index",
        "Japanese Index",
        "NZD",
        "Oil",
        "Palladium",
        "Platinum",
        "Silver",
        "Step Index",
        "Swiss Index",
        "UK Index",
        "US Index",
        "US Tech Index",
        "USD Index",
        "USD",
        "Volatility 10 (1s) Index",
        "Volatility 10 Index",
        "Volatility 25 (1s) Index",
        "Volatility 25 Index",
        "Volatility 50 (1s) Index",
        "Volatility 50 Index",
        "Volatility 75 (1s) Index",
        "Volatility 75 Index",
        "Volatility 100 (1s) Index",
        "Volatility 100 Index",
        "Wall Street Index",
    ];
    const [email, setEmail] = useState("");
    const [displayNotifications, setDisplayNotifications] = useState(false);
    const [pip, setPip] = useState("");
    const [filter, setFilter] = useState("");
    const [rates, setRates] = useState([]);
    const [options, setOptions] = useState(<></>);
    const [notifications, setNotifications] = useState();
    const [notificationsArray, setNotificationsArray] = useState([]);
    const [notificationPair1, setNotificationPair1] = useState("");
    const [notificationPair2, setNotificationPair2] = useState("");
    const [ratesCollection, setRatesCollection] = useState(
        <RatesCollection rates={rates} filter={filter}></RatesCollection>
    );

    useEffect(() => {
        if (notificationsArray.length !== 0)
            setNotifications(
                notificationsArray.map((notification) => {
                    return (
                        <Notification
                            pair={notification.pair}
                            pip={notification.pip}
                        ></Notification>
                    );
                })
            );
        else {
            setNotifications(<>... No tienes notificaciones</>);
        }
    }, [notificationsArray]);
    useEffect(async () => {
        if (localStorage.getItem("email"))
            setEmail(localStorage.getItem("email"));
    }, []);

    useEffect(async () => {
        if (symbols.length > 0) {
            const _rates = await refreshRates();
            if (_rates.length > 0) {
                setRates(_rates);
            }
            setInterval(async () => {
                const _rates = await refreshRates();
                if (_rates.length > 0) {
                    setRates(_rates);
                }
            }, 1000);
            setOptions(
                <>
                    {symbols.map((symbol) => {
                        return (
                            <option
                                key={uuid()}
                                style={{
                                    background: "rgba(32, 32, 32)",
                                    textShadow: "0 1px 0 rgba(0, 0, 0, 0.4)",
                                }}
                            >
                                {symbol}
                            </option>
                        );
                    })}
                </>
            );
        }
    }, []);

    useEffect(() => {
        setRatesCollection(
            <RatesCollection rates={rates} filter={filter}></RatesCollection>
        );
    }, [rates, filter]);

    return (
        <div
            style={{
                display: rates.length <= 0 ? "none" : "inherit",
            }}
        >
            <Head>
                <title>{"KOB - Notificación del precio"}</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Box
                className="top"
                display="flex"
                flexDir="row"
                justifyContent="space-between"
            >
                <Image
                    src="https://kingsofbinary.com/assets/static/media/kob-logo.3558140f.svg"
                    mt="10px"
                    mb="10px"
                    ml="15px"
                    mr="15px"
                    w="100px"
                ></Image>
                <Box
                    p="15px"
                    w="500px"
                    display="flex"
                    flexDir="row"
                    alignItems="center"
                >
                    <Input
                        placeholder="Buscar..."
                        value={filter}
                        onChange={(e) => {
                            setFilter(e.target.value);
                        }}
                    ></Input>
                    <Box
                        textAlign="center"
                        ml="15px"
                        fontSize="20px"
                        className={styles.clickable}
                    >
                        <HamburgerIcon
                            onClick={() => {
                                setDisplayNotifications(!displayNotifications);
                            }}
                        ></HamburgerIcon>
                    </Box>
                </Box>
            </Box>
            <Box className="main" pt="70px" pb="50px">
                <Box
                    display={displayNotifications ? "flex" : "none"}
                    flexDir="row"
                    w="100%"
                    flexWrap="wrap"
                    p="35px"
                    justifyContent="space-between"
                    className={styles.notificationDrawer}
                >
                    <Box className={styles.notificationsCard}>
                        {notifications}
                    </Box>

                    <Box maxW="500px" w="500px" m="auto" mr="0">
                        <Box
                            p="15px"
                            pt="0"
                            m="auto"
                            mr="0"
                            maxW="500px"
                            textAlign="right"
                        >
                            <Text>
                                Configuración de notificaciones{" "}
                                <WarningIcon ml="10px"></WarningIcon>
                            </Text>
                        </Box>
                        <Box p="15px" m="auto" mr="0" maxW="500px">
                            <Input
                                value={email}
                                placeholder="Email"
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    localStorage.setItem(
                                        "email",
                                        e.target.value
                                    );
                                }}
                            ></Input>
                        </Box>
                        <Box
                            p="15px"
                            pt="0"
                            pb="0"
                            m="auto"
                            mr="0"
                            maxW="500px"
                            display="flex"
                            flexDir="row"
                        >
                            <Select
                                value={notificationPair1}
                                onChange={(e) => {
                                    setNotificationPair1(e.target.value);
                                }}
                                mr="3px"
                            >
                                {options}
                            </Select>
                            <Select
                                value={notificationPair2}
                                onChange={(e) => {
                                    setNotificationPair2(e.target.value);
                                }}
                                ml="3px"
                            >
                                {options}
                            </Select>
                        </Box>
                        <Box p="15px" m="auto" mr="0" maxW="500px">
                            <Input
                                value={pip}
                                placeholder="PIP"
                                onChange={(e) => {
                                    setPip(e.target.value);
                                }}
                            ></Input>
                        </Box>
                        <Box pr="15px" pl="15px" m="auto" mr="0" maxW="500px">
                            <Button
                                w="100%"
                                className={styles.button}
                                onClick={() => {
                                    setNotificationsArray([
                                        ...notificationsArray,
                                        {
                                            pair:
                                                notificationPair1 +
                                                "/" +
                                                notificationPair2,
                                            pip,
                                            id: uuid(),
                                        },
                                    ]);
                                }}
                            >
                                Añadir Notificación
                            </Button>
                        </Box>
                    </Box>
                </Box>
                {ratesCollection}
            </Box>
        </div>
    );
}
