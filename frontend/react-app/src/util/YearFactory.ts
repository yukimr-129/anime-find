import { ChangeEvent, useCallback } from "react";
import { useRecoilState } from "recoil";
import { Year } from "../store/Year";
import { handleChange } from "../types/handleChange";

export const YearFactory = () => {
    const [ selectYear, setSelectyear ] = useRecoilState(Year)
    const current_year = (new Date()).getFullYear();
    const year: number[] = []

    const handleChangeYear: handleChange = useCallback((e) => {
        e.preventDefault()
        setSelectyear(e.target.value)
    }, [selectYear])

    for (let y = current_year; y >= 2014; y--) {
        year.push(y)
    }

    return { current_year, year, handleChangeYear }
}