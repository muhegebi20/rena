import React, { useState } from 'react'
import '../css/ProductCard.css'
import StarRatings from 'react-star-ratings';
function ProductCard({product}) {
    let {images, name, popularityScore, price} = product;
    popularityScore = Math.round(popularityScore * 5)
    const [seletedColor, setSelectedColor] = useState("yellow")

    let changeColor = (color)=>{
        setSelectedColor(color)
    }
  return (
    <div className="product-card">
      <img
        src={images[seletedColor]}
        alt="Yellow Gold Diamond Ring"
        className="product-image"
      />
      <div className="product-info">
        <h2 className="product-title montserrat">{name}</h2>
        <p className="product-price montserrat">${price.toFixed(2)} USD</p>

        <div className="color-selector">
          <span onClick={()=>changeColor("yellow")} className={`color-swatch yellow-gold`} title="Yellow Gold"></span>
          <span onClick={()=>changeColor("white")} className="color-swatch white-gold" title="white Gold"></span>
          <span onClick={()=>changeColor("rose")} className="color-swatch rose-gold" title="Rose Gold"></span>
        </div>
        <p className="selected-color avenir">{seletedColor} Gold</p>

        <div className="rating">
        <StarRatings
          rating={popularityScore}
          starRatedColor="orange"
          numberOfStars={5}
          name='rating'
          starDimension='30px'
          starSpacing='2px'
        />
          <span className="rating-value avenir">{popularityScore}/5</span>
        </div>
      </div>
    </div>
  )
}

export default ProductCard