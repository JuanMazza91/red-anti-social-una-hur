import { useEffect, useState } from "react";

type DateInput = Date | string | number;

function getTimeAgo(date: DateInput, now: number) {
    const created = new Date(date).getTime();

    const minutes = Math.floor((now - created) / 1000 / 60);

    if (minutes < 1) return "Ahora mismo";
    if (minutes < 60) return `Hace ${minutes} min`;

    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `Hace ${hours} h`;

    const days = Math.floor(hours / 24);
    return `Hace ${days} día${days > 1 ? "s" : ""}`;
    }

    export function useRelativeTime(date: DateInput, refreshMs = 60000) {
    const [relativeTime, setRelativeTime] = useState(() =>
        getTimeAgo(date, Date.now())
    );

    useEffect(() => {
        const interval = setInterval(() => {
        setRelativeTime(getTimeAgo(date, Date.now()));
        }, refreshMs);

        return () => clearInterval(interval);
    }, [date, refreshMs]);

    return relativeTime;
}