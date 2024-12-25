import { Helmet } from "react-helmet";

const Title = ({title}) => {
    return (
        <Helmet>
            <title>Sea Haven | {title} </title>
        </Helmet>
    );
};

export default Title;