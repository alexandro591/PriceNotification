import { v4 as uuid } from "uuid";
import Rates from "./Rates";

export default function RatesCollection(props) {
    const { rates, filter } = props;
    return rates.map((rate) => {
        if (
            (rate.base_currency
                .toLowerCase()
                .includes(filter.toLocaleLowerCase().split("/")[0]) &&
                filter) ||
            !filter
        )
            return (
                <Rates
                    key={uuid()}
                    rate={rate}
                    filter={filter.toLocaleLowerCase().split("/")[1]}
                ></Rates>
            );
    });
}
