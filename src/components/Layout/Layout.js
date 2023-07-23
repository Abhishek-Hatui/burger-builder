import React, {Component} from "react";
import Auxillary from "../../hoc/Auxillary";
import classes from './Layout.module.css';
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";

class Layout extends Component{

    state = {
        showSideDrawer: false
    }

    sideDrawerToggleHandler = () =>{
        this.setState((prevState)=>{return {showSideDrawer: !prevState.showSideDrawer}});
    }

    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false});
    }

    render(){
        return(
            <Auxillary>
                <Toolbar drawerToggleClicked = {this.sideDrawerToggleHandler}/>
                <SideDrawer open = {this.state.showSideDrawer} closed = {this.sideDrawerClosedHandler}/>
                <main className={classes.Content}>{this.props.children}</main>
            </Auxillary>
        );
    }
}


export default Layout;