import { VFC } from "react";
import { Helmet } from "react-helmet-async";


type Props = {
    title: string;
}
const Head: VFC<Props> = (props) => {
    const { title } = props

    return(
        <Helmet>
            <title>{title}</title>
        </Helmet>
    )
}

export default Head