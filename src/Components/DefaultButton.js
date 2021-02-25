import { ProgressViewIOS } from 'react-native';
import styled from 'styled-components/native';

export default styled.TouchableHighlight`
    width:${props=>props.width || 'auto'};
    background-color:${props=>props.bgcolor || '#e6e6e6'};
    padding:10px 20px;
    border-radius:100px;
    justify-content: center;
    align-items:center;
`;