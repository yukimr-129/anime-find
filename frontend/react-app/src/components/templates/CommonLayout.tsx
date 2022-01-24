import { memo, VFC } from "react";

import Header from "components/organisms/Header";

type Props = {
    children: React.ReactElement;
}

const CommonLayout: VFC<Props> = memo(({ children }) => {
    return (
        <> 
            <Header />
            {children}

        </>
    )
})

export default CommonLayout