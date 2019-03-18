import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { BrowserRouter as Router, Route, NavLink, Redirect } from 'react-router-dom'
import * as actions from './_actions/data.action'
import * as actionsCart from './_actions/shopingCart.action'
import * as actionsModal from './_actions/modalShoppingCart.action'
import Header from './sections/header/container/Header'
import Main from './pages/home/component/Main'
import Home from './pages/home/container/Home';
import Footer from './sections/footer/container/Footer';
import TopBar from './sections/header/component/TopBar'
import TopBarItem from './sections/header/component/TopBarItem'
import ShopCounter from './sections/header/component/ShopCounter'
import TopBarLogo from './sections/header/component/TopBarLogo'
import FooterLayout from './sections/footer/component/FooterLayout'
import FooterBox from './sections/footer/component/FooterBox'
import Search from './widgets/search/component/Search'
import Icon from './widgets/icon/Icon';
import Products from './pages/products/container/Products';
import Item from './sections/item/container/Item'
import SignUp from './sections/forms/containers/SignUp'
import SignIn from './sections/forms/containers/SignIn'
import ShoppingCartModal from './sections/shoppingCart/container/ShoppingCartModal'
import ShoppingCart from './sections/shoppingCart/component/ShoppingCart'

class App extends Component {

  constructor(props){
    super(props)
    this.closeShoppingCart = this.closeShoppingCart.bind(this)
    this.openShoppingCart = this.openShoppingCart.bind(this)
  }

  componentDidMount(){
    this.props.actions.departments()
    this.props.actionsCart.getItems()
  }

  openShoppingCart(e){
    e.preventDefault()
    this.props.actionsModal.openModal()
  }

  closeShoppingCart(e){
    e.preventDefault()
    this.props.actionsModal.closeModal()
  }

  render() {
    const {isLoading, loggedIn, cart, cartItems, modal, departments} = this.props
    // console.log(cart)
    return (
      <Router>        
        { 
          !isLoading ? 
        <div className="App">
          <Header>
              <TopBar>
                  <TopBarLogo />    
                  {/* {
                    departments !== undefined ?
                    Object.keys(departments).length!==0 ?
                    Object.keys(departments).map((key) => (
                      <TopBarItem key >
                        <NavLink activeStyle={{
                              textDecoration : 'none',
                              color : 'red'
                            }} to={`/g/${departments[key].name}`}>
                                {departments[key].name || 'no_description'}
                        </NavLink>
                      </TopBarItem>                
                    )) : ''
                    : ''
                  } */}
                  {department ?
                      department.map(item => (
                        <TopBarItem key={item.id}>
                          <NavLink activeStyle={{
                            textDecoration : 'none',
                            color : 'red'
                          }} to={`/g/${item.name}`}>
                              {item.name || 'no_description'}
                          </NavLink>
                          </TopBarItem>                
                      )) : <div>Loading...</div> 
                  }
                  <Search />
                  <TopBarItem>
                      {/* {
                        cart.length > 0
                        ?  */}
                      <ShopCounter cart={cart} />
                        {/* : ''
                      } */}
                      <Icon openShoppingCart={this.openShoppingCart} iconName='icon-bag' />
                  </TopBarItem>
              </TopBar>
          </Header>
          <Main>
            {
              modal &&
              <ShoppingCartModal>
                <ShoppingCart 
                  cart={cart}
                  cartItems={cartItems}
                  closeShoppingCart={this.closeShoppingCart} />
              </ShoppingCartModal>
            }
            <Route exact={true} path='/' render={() => <Home /> } />
            <Route exact={true} path='/register' render={() => <SignUp /> } />
            <Route exact={true} path='/login' render={ props =>(
              localStorage.getItem('user') 
              ? <Redirect to="/"/> 
              : <SignIn />
              )} />
            {/* <Route exact={true} path='/products:page?' render={ props => <Products {...props} /> } /> */}
            <Route exact={true} path='/products' render={ props => <Products {...props} /> } />
            <Route exact={true} path='/products/:id' render={()=>(
               <Item />
             )} />
            <Route path={`/g/:id`} render={Test} />
            <Route path={`/help`} render={Test} />
            <Route path={`/track-order`} render={Test} />
            <Route path={`/returns`} render={Test} />
          </Main>
          <Footer>
            <FooterLayout>
              <FooterBox>
                <h3>QUESTIONS?</h3>
                <NavLink to='/help'>Help</NavLink>
                <NavLink to='/track-order'>Track Order</NavLink>
                <NavLink to='/returns'>Returns</NavLink>
              </FooterBox>
              <FooterBox>
                <h3>WHAT'S IN STORE?</h3>
                <NavLink to='/women'>Women</NavLink>
                <NavLink to='/men'>Men</NavLink>
                <NavLink to='/products'>Product A-Z</NavLink>
                <NavLink to='/vouchers'>Buy Gift Vouchers</NavLink>
              </FooterBox>
              <FooterBox>
                <h3>FOLLOW US</h3>
                <NavLink to='/Facebook'>Facebook</NavLink>
                <NavLink to='/Twitter'>Twitter</NavLink>
                <NavLink to='/YouTube'>YouTube</NavLink>
              </FooterBox>
            </FooterLayout>
          </Footer>
        </div>
          : <div>Loading...</div> 
        }
      </Router>
    );
  }
}

const Test = ({match}) => {
  return(
    <div>
      <div>{match.params.id}</div>
      <div>NOTHING HERE</div>
    </div>
  )
} 

const department = [
  {
      id : 1,
      name : 'Women'
  },
  {
      id : 2,
      name : 'Men'
  },
  {
      id : 3,
      name : 'Kids'
  },
  {
      id : 4,
      name : 'Shoes'
  },    
  {
      id : 5,
      name : 'Brands'
  }    
]

function mapStateToProps(state, props){
  

  const isLoading = state.get('isLoading')
  const cart = state.get('shoppingCart').get('quantity')
  const cartItems = state.get('shoppingCart').get('items')
  const modal = state.get('modal').get('visible')

  // console.log(departments)
  // if(state.get('data').get('departments') !==undefined){

    const departments = state.get('data').get('departments')
    // departments.toArray().map(department => {
      // console.log(departments.values())
    // })

    // Object.keys(departments).length!==0 ?
    // Object.keys(departments).map((key, value) => {
    //   console.log(departments[value])
    // }) : console.log('valor')

  // }
  return {
    departments,
    isLoading,
    cart,
    cartItems,
    modal
  }
}

function mapDispatchToProps(dispatch){
  return {
    actions : bindActionCreators(actions, dispatch),
    actionsCart : bindActionCreators(actionsCart, dispatch),
    actionsModal : bindActionCreators(actionsModal, dispatch)
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
