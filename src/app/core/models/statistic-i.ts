export type ChangeType = "positive" | "negative" | "neutral";

export interface StatisticI {
    id: string;
    title: string;
    icon: string;
    value: number;
    change: string;
    changeLabel: string;
    changeType: ChangeType;
    color: string;
}

export interface StatisticsResponseI {
    statistics: StatisticI[];
    lastUpdated: string;
}
