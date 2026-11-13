import { StatisticI } from "./statistic-i";

export interface StatisticsResponseI {

    statistics: StatisticI[];
    lastUpdated: string;
}
