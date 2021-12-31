import { memo } from "react"
import { Box, Text, Wrap, WrapItem } from "@chakra-ui/react"
import { VFC } from "react"
import { useRecoilValue } from "recoil"

import { useCourFactory } from "../../customHooks/useCourFactory"
import { Year } from "../../store/Year"
import { AnnictApiType } from "../../types/api/AnnictApiType"
import AnimeCard from "../molecules/animeCard/AnimeCard"

type Props = {
    animeLists: AnnictApiType[];
}

const AnimeCardList: VFC<Props> = memo((props) => {
    const { animeLists } = props
    const year = useRecoilValue(Year)
    const { select_cour } = useCourFactory()
    const cours_detail_month = ['冬：1～3月', '春：4～6月', '夏：7～9月', '秋：10～12月']
    
    return (
        <>
            <Box justify='center' align='center' m='30px 10px 0'>
                <Text fontWeight='700' fontSize='1.17em'>
                    ― {year}{select_cour} ―
                </Text>
            </Box>
            {/* simpleGridに変更⇩ */}
            <Wrap p={{base: 3, md: 4}} w='100%' spacing={5} justify='center' align='center'>
                {animeLists.map((animeList, index) => (
                    <WrapItem key={index}>
                        <AnimeCard animeList={animeList}/>
                    </WrapItem>
                ))}
            </Wrap>
        </>
    )
})

export default AnimeCardList