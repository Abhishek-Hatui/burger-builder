import React from "react";
import classes from './NavigationItems.module.css'
import NavigationItem from "./NavigationItem/NavigationItem";

const navigationItems = () => (
    <div className={classes.NavigationItems}>
        <ul>
            <NavigationItem link = "/" active>Burger Builder</NavigationItem>
            <NavigationItem link = "/" >Checkout</NavigationItem>
        </ul>
    </div>
);

export default navigationItems;