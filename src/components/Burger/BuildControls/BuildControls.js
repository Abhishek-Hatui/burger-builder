import React from "react";
import classes from "./BuildControls.module.css"
import BuildControl from "./BuildControl/BuildControl";

const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'},
    {label: 'Bacon', type: 'bacon'},
];

const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
        {controls.map(ctrl => (
            <BuildControl 
                label = {ctrl.label} 
                key = {ctrl.label}
                add = {() => props.ingredientsAdded(ctrl.type)}
                remove = {() => props.ingredientsRemoved(ctrl.type)}
                disabled = {props.disabled[ctrl.type]}
                />
        ))}
        <button className={classes.OrderButton} onClick={props.order} disabled={!props.purchasable}>ORDER NOW</button>
    </div>
);

export default buildControls;