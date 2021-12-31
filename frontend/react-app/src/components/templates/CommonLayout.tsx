import Header from "components/organisms/Header";
import { memo, VFC } from "react";

type Props = {
    children: React.ReactElement;
}

const CommonLayout: VFC<Props> = memo(({ children }) => {
    return (
        <> 
            <Header />
            {/* <Box w={{base: '98%', md: '70%'}} h='100%' bg='#ffff' m='100px auto 20px auto' borderRadius='10px'> */}
                {children}
            {/* </Box> */}

        </>
    )
})

export default CommonLayout