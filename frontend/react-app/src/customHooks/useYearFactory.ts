type YearFactory = () => {
    current_year: number;
    years: number[];
}
export const useYearFactory: YearFactory = () => {
    const current_year = (new Date()).getFullYear();
    const years: number[] = []

    for (let y = current_year; y >= 2014; y--) {
        years.push(y)
    }

    return { current_year, years }
}