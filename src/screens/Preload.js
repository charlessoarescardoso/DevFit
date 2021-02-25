import { StackActions, NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
const Preload = (props) => {
    props.navigation.dispatch(StackActions.reset({
        index:0,
        actions:[
            NavigationActions.navigate({routeName:'StarterStack'})
        ]
    }));
    return null;
}

const mapStateToProps = (state) => {
    return {
        name:state.userReducer.name
    };
}

export default connect(mapStateToProps)(Preload);