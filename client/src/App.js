import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { BrowserRouter as Router, Route, NavLink, Redirect } from 'react-router-dom'
import * as actions from './_actions/data.action'
import * as actionsCart from './_actions/shopingCart.action'
import * as actionsModal from './_actions/modalShoppingCart.action'
import * as actionsCategoriesModal from './_actions/modalCategories.action'
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
import CategoriesModal from './sections/categories/container/CategoriesModal'
import Categories from './sections/categories/Categories'
import ProductsByDepartment from './pages/products/container/ProductsByDepartment';
import ProductsByCategory from './pages/products/container/ProductsByCategory';

class App extends Component {

  constructor(props){
    super(props)
    this.closeShoppingCart = this.closeShoppingCart.bind(this)
    this.openShoppingCart = this.openShoppingCart.bind(this)
    this.openCategories = this.openCategories.bind(this)
    this.closeCategories = this.closeCategories.bind(this)
  }

  componentDidMount(){
    this.props.actions.departments()
    this.props.actionsCart.getItems()
  }

  openShoppingCart(e){
    e.preventDefault()
    this.props.actionsModal.openModal()
  }

  openCategories(e, id){
    e.preventDefault()
    this.props.actions.categoriesByDepartment(id)
    this.props.actionsCategoriesModal.openModal()
  }

  closeCategories(e){
    e.preventDefault()
    this.props.actionsCategoriesModal.closeModal()
  }

  closeShoppingCart(e){
    e.preventDefault()
    this.props.actionsModal.closeModal()
  }

  render() {
    const {
      isLoading, 
      cart, 
      cartItems, 
      modal, 
      departments, 
      categories, 
      modalCategories} = this.props
    return (
      <Router>        
        { 
          !isLoading ? 
        <div className="App">
          <Header>
              <TopBar>
                  <TopBarLogo />    
                  {
                    departments !== undefined ?
                    Object.keys(departments).length!==0 ?
                    Object.keys(departments).map((key) => (
                      <TopBarItem >
                        <div onMouseOver={(e) => this.openCategories(e, departments[key].department_id)} >
                          {departments[key].name}
                        </div>
                      </TopBarItem>                
                    )) : ''
                    : department.map((item, index) => (
                      <TopBarItem key={index}>
                        <div onClick={this.openCategories} >
                          {item.name}
                        </div>
                        </TopBarItem>                
                    ))
                  }
                  <Search />
                  <TopBarItem>
                      <ShopCounter cart={cart} />
                      <Icon openShoppingCart={this.openShoppingCart} iconName='icon-bag' />
                  </TopBarItem>
              </TopBar>
          </Header>
          <Main>
            {
              modalCategories &&
              <CategoriesModal>
                <Categories 
                  categories={categories}
                  closeModal={this.closeCategories}
                  // cart={cart}
                  // cartItems={cartItems}
                  // closeShoppingCart={this.closeShoppingCart} 
                />
              </CategoriesModal>
            }
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
            <Route exact={true} path='/products' render={ props => <Products {...props} /> } />
            <Route exact={true} path='/products/inDepartment/:id' 
              render={ props => <ProductsByDepartment {...props} /> } />
            <Route exact={true} path='/products/inCategory/:id' 
              render={ props => <ProductsByCategory {...props} /> } />
            <Route exact={true} path='/products/:id' render={ props => <Item {...props} /> } />
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
                <NavLink to='/products'>Product A-Z</NavLink>
                {
                  departments !== undefined 
                  ? Object.keys(departments).map((key) => (
                      <NavLink to={`/products/inDepartment/${departments[key].department_id}`} >
                        {departments[key].name}
                      </NavLink>                
                    )) 
                  : ''
                }
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
      name : 'Regional'
  },
  {
      id : 2,
      name : 'Nature'
  },
  {
      id : 3,
      name : 'Seasonal'
  }    
]

function mapStateToProps(state, props){
  
  const isLoading = state.get('isLoading')
  const cart = state.get('shoppingCart').get('quantity')
  const cartItems = state.get('shoppingCart').get('items')
  const modal = state.get('modal').get('visible')
  const modalCategories = state.get('modalCategories').get('visible')
  const departments = state.get('data').get('departments')
  const categories = state.get('data').get('categories')

  return {
    departments,
    categories,
    isLoading,
    cart,
    cartItems,
    modal,
    modalCategories
  }
}

function mapDispatchToProps(dispatch){
  return {
    actions : bindActionCreators(actions, dispatch),
    actionsCart : bindActionCreators(actionsCart, dispatch),
    actionsModal : bindActionCreators(actionsModal, dispatch),
    actionsCategoriesModal : bindActionCreators(actionsCategoriesModal, dispatch)
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
