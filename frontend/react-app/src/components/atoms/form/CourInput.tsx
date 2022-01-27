import { memo, VFC } from "react"

import { FormLabel, Select } from "@chakra-ui/react"
import { useCallback } from 'react'
import { useRecoilState } from "recoil"
import { ApiKeyValue } from "store/ApiKeyValue"

import { useCourFactory } from "../../../customHooks/useCourFactory"
import { Cour } from '../../../store/Cour'
import { handleChange } from "../../../types/handleChange"

const CourInput: VFC = memo(() => {
    
    const { cours } = useCourFactory()
    const [ selectCour, setSelectCour ] = useRecoilState(Cour)
    const [ apiKeyValue, setApiKeyValue] = useRecoilState(ApiKeyValue)

    const handleChangeCour: handleChange = useCallback((e) => {
        e.preventDefault()
        const season = new Map<string, string>([['1期（冬期）', 'winter'], ['2期（春期）', 'spring'], ['3期（夏期）', 'summer'], ['4期（秋期）', 'autumn']])
        const select_season = season.get(e.target.value)
        
        setSelectCour(e.target.value)
        setApiKeyValue({...apiKeyValue, cour: select_season})
    }, [ setSelectCour, apiKeyValue, setApiKeyValue])
    
    return (
        <>
            <FormLabel>クール</FormLabel>
            <Select defaultValue={selectCour} onChange={handleChangeCour}>
                {cours.map((cour, index) => (
                    <option key={cour}>{cour}</option>
                ))}
            </Select>
        </>
    )
})

export default CourInput