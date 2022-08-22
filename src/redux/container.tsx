import { connect } from 'react-redux';
import {Startpage} from '../components/start-page/Startpage';

const mapStateToProps = (state:any) => {
    return {
        count: state
    };
};
const mapDispatchToProps = (dispatch:any) => {
    return {
        handleLightClick: () => dispatch({ type: 'LIGHT' }),
        handleDarkClick: () => dispatch({ type: 'DARK' })
    };
};

export const Container = connect(mapStateToProps, mapDispatchToProps)(Startpage);