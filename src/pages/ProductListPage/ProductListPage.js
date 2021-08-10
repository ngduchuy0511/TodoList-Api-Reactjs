import React, { Component } from 'react';
import ProductItem from '../../components/ProductItem/ProductItem';
import ProductList from '../../components/ProductList/ProductList';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { actDeleteProductsRequest, actFetchProductsRequest } from '../../actions/index'

class ProductListPage extends Component {
    //life cycle hook
    componentDidMount = () => {
        this.props.fetchAllProduct()
    }
    showProducts = (products) => {

        var result = null
        if (products.length > 0) {
            result = products.map((product, index) => {
                return (
                    <ProductItem
                        key={index}
                        product={product}
                        index={index}
                        onDelete={this.onDelete}
                    />
                )
            })
        }
        return result;
    }
    //xóa
    onDelete = (id) => {
        this.props.onDeleteProduct(id);
    }
    render() {

        var {products}=this.props;
        // var { products } = this.state;

        return (
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12" >
                <Link to="/product/add" className="btn btn-info mb-10">Thêm sản phẩm</Link>
                <ProductList>
                    {this.showProducts(products)}
                </ProductList>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        products: state.products
    }
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        fetchAllProduct: () => {
            dispatch(actFetchProductsRequest())
        },
        onDeleteProduct: (id) => {
            dispatch(actDeleteProductsRequest(id))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ProductListPage);