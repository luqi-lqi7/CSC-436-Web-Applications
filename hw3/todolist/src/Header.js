import React, {useContext} from 'react'
import {ThemeContext} from "./contexts";

// const Header = ({text}) => (
//   <ThemeContext.Consumer>
//     {theme => (<h1 style={{color: theme.primary}}>{text}</h1>)}
//   </ThemeContext.Consumer>
// );

// const Header = ({text}) => (
//   <h1 style={{color: useContext(ThemeContext).primary}}>{text}</h1>
// );

const Header = ({text}) => {
  // const {primaryColor} = useContext(ThemeContext);
  // return <h1 style={{color:primaryColor}}>{text}</h1>;

  const theme = useContext(ThemeContext);
  return <h1 style={{color: theme.primaryColor}}>{text}</h1>;
};
export default Header



