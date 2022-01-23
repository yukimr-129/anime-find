import { FormLabel, Select } from "@chakra-ui/react"
import { VFC, useCallback } from "react";
import { useRecoilState } from "recoil";
import { ApiKeyValue } from "store/ApiKeyValue";

import { useYearFactory } from "../../../customHooks/useYearFactory";
import { Year } from '../../../store/Year'
import { handleChange } from "../../../types/handleChange";

const YearInput: VFC = () => {
    const [ selectYear, setSelectyear ] = useRecoilState(Year)
    const [ apiKeyValue, setApiKeyValue] = useRecoilState(ApiKeyValue)
    const { years } = useYearFactory()
    
    const handleChangeYear: handleChange = useCallback((e) => {
        setSelectyear(e.target.value)
        setApiKeyValue({...apiKeyValue, year: e.target.value})
    }, [apiKeyValue])    

    return (
        <>
            <FormLabel>西暦</FormLabel>
            <Select onChange={handleChangeYear} defaultValue={selectYear}>
                {years.map((year, index) => (
                    <option key={year} >{year}</option>
                ))}
            </Select>
        </>
    )
}

export default YearInput