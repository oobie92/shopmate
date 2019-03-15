import React, {Component} from 'react'
import { connect } from 'react-redux'
import { bindActionCreators} from 'redux'
import StarRatings from 'react-star-ratings'
import * as actions from '../../../_actions/review.action'

class ReviewForm extends Component {

    constructor(props){
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.changeRating = this.changeRating.bind(this)
        this.setNicknameRef = this.setNicknameRef.bind(this)
    }

    handleSubmit(e){
        e.preventDefault()
        console.log(e)
    }

    setNicknameRef(e){
        this.nickname = e
    }
    
    setTextRef(e){
        this.textReview = e
    }

    changeRating(r){
        this.props.actions.changeRating(r)
        // this.rating = r
    }
    
    render(){
        // console.log(this)
        const {rating} = this.props
        return(
            <form onSubmit={this.handleSubmit}>
                <h1>add a review</h1>
                <label>choose a nickname</label>
                <input type='text' ref={this.setNicknameRef} />
                <label>Your review</label>
                {/* <textarea ref={this.setTextRef} /> */}
                <p></p>
                <label>Overall rating</label>
                <StarRatings
                    rating={rating}
                    starRatedColor="blue"
                    changeRating={this.changeRating}
                    numberOfStars={6}
                    name='rating'
                />
                <input type="submit" value="Submit" />
            </form>
        )
    }
}

function mapStateToProps(state, props){
    const rating = state.get('reviews').get('rating')
    // console.log(rating)
    return {
        rating
    }
}

function mapDispatchToProps(dispatch){
    return{
        actions : bindActionCreators(actions, dispatch) 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReviewForm)