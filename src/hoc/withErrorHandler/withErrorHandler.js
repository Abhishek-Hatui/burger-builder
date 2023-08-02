import React, {Component} from "react";
import Auxillary from "../Auxillary/Auxillary";
import Modal from "../../components/UI/Modal/Modal";

const withErrorHandler= (WrappedComponent, axios) =>{
    return class extends Component {

        state = {
            error: null
        }

        componentWillMount(){
            this.reqInterceptor = axios.interceptors.request.use(req=> {
                this.setState({error: null});
                return req;
            });
            
            this.respInterceptor = axios.interceptors.response.use(resp => resp,
                error => {
                    this.setState({error: error});
                });
        }

        errorConfirmedHandler = () => {
            this.setState({error: null});
        }

        render(){
            return(
                <Auxillary>
                    <Modal 
                        show = {this.state.error} 
                        modalClosed = {this.errorConfirmedHandler}>
                        {this.state.error? this.state.error.message: null}
                    </Modal>
                    <WrappedComponent {...this.props}/>
                </Auxillary>
            );
        }

        componentWillUnmount(){
            console.log('will unmount',this.reqInterceptor,this.respInterceptor);
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.respInterceptor);
        }
    }
}

export default withErrorHandler;