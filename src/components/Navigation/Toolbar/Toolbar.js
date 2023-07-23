import React from "react";
import classes from './Toolbar.module.css'
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import DrawerToggler from "../SideDrawer/DrawerToggle/DrawerToggler";

const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <DrawerToggler clicked = {props.drawerToggleClicked}/>
        <div className={classes.Logo}>

            <Logo />
        </div>
        <nav className={classes.DesktopOnly}>
            <NavigationItems />
        </nav>
    </header>
);

export default toolbar;