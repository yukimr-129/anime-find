import { FormLabel, Select } from "@chakra-ui/react"
import { VFC, useCallback } from "react";
import { useRecoilState } from "recoil";

import { useYearFactory } from "../../../customHooks/useYearFactory";
import { Year } from '../../../store/Year'
import { handleChange } from "../../../types/handleChange";

const YearInput: VFC = () => {
    const [ selectYear, setSelectyear ] = useRecoilState(Year)
    const { year } = useYearFactory()
    
    const handleChangeYear: handleChange = useCallback((e) => {
        e.preventDefault()
        setSelectyear(e.target.value)
    }, [selectYear])

    return (
        <>
            <FormLabel>西暦</FormLabel>
            <Select onChange={handleChangeYear}>
                {year.map((year, index) => (
                    <option key={year}>{year}</option>
                ))}
            </Select>
        </>
    )
}

export default YearInput