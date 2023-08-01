import React , {Component} from "react";
import Burger from "../../components/Burger/Burger";
import Auxillary from "../../hoc/Auxillary/Auxillary";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import axios from '../../axios-orders';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 1,
    meat: 1.5,
    bacon: 1
}

class BugerBuilder extends Component{
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false 
    }

    updatePurchaseState(ingredients){
        const sum = Object.keys(ingredients)
                        .map(igKey => {
                            return ingredients[igKey];
                        })
                        .reduce((sum,el)=>{
                            return sum+el;
                        },0);
        
        this.setState({purchasable: sum>0});
    }

    purchaseHandler = () =>{
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        //alert('You Continued!');
        this.setState({loading: true});
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'duks',
                address: {
                    country: 'India',
                    pincode: '401101',
                    street: 'ambadi road'
                },
                email: 'duks@duks.com'
            }
        }
        axios.post('/orders.json',order)
            .then(response => this.setState({loading: false, purchasing: false}))
            .catch(error => this.setState({loading: false, purchasing: false}));
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount;

        const priceToBeAdded = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceToBeAdded;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngerdientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if(oldCount <= 0){
            return;
        }
        const newCount = oldCount - 1;
        const updatedCount = {
            ...this.state.ingredients
        }
        updatedCount[type] = newCount;
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - INGREDIENT_PRICES[type];
        this.setState({totalPrice: newPrice, ingredients: updatedCount});
        this.updatePurchaseState(updatedCount);
    }

    render(){
        const disableInfo = {
            ...this.state.ingredients
        }
        for(let key in disableInfo){
            disableInfo[key] = disableInfo[key] <= 0; //{meat : true salad : false ...}
        }

        let orderSummary =  <OrderSummary 
            price = {this.state.totalPrice}
            purchaseCancelled = {this.purchaseCancelHandler} 
            purchaseContinued = {this.purchaseContinueHandler}
            ingredients = {this.state.ingredients} 
            />;
        if(this.state.loading){
            orderSummary = <Spinner />;
        }

        return(
            <Auxillary>
                <Burger ingredients = {this.state.ingredients}/>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                   {orderSummary}
                </Modal>
                <BuildControls 
                    ingredientsAdded = {this.addIngredientHandler} 
                    ingredientsRemoved = {this.removeIngerdientHandler}
                    disabled = {disableInfo}
                    price ={this.state.totalPrice}
                    purchasable={this.state.purchasable}
                    order = {this.purchaseHandler}/>
            </Auxillary>
        );
    }
}

export default withErrorHandler(BugerBuilder,axios);