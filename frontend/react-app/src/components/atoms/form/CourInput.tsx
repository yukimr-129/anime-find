import { FormLabel, Select } from "@chakra-ui/react"
import { VFC } from "react"
import { useCallback } from 'react'
import { useRecoilState } from "recoil"

import { useCourFactory } from "../../../customHooks/useCourFactory"
import { Cour } from '../../../store/Cour'
import { handleChange } from "../../../types/handleChange"

const CourInput: VFC = () => {
    
    const { cours } = useCourFactory()
    const [ selectCour, setSelectCour ] = useRecoilState(Cour)

    const handleChangeCour: handleChange = useCallback((e) => {
        e.preventDefault()
        setSelectCour(e.target.value)
    }, [selectCour])
    
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
}

export default CourInput