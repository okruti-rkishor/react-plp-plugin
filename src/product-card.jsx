import './plp-adventureworks.css'
import { Card } from "antd";
import { StarFilled, StarOutlined } from "@ant-design/icons";

const ProductGrid = ({ product }) => {
    const renderStars = (rating) => {
        return Array.from({ length: 5 }, (_, i) =>
            i < Math.round(rating) ? (
                <StarFilled key={i} className="star filled" />
            ) : (
                <StarOutlined key={i} className="star" />
            )
        );
    };

    return (
        <div>
                <Card key={product.ProductNumber} className="product-card">
                    <div className="product-card__image-wrapper">
                        <img
                            className="product-card__image"
                            alt={product.Name}
                            src={`https://images-us-prod.cms.commerce.dynamics.com/cms/api/stpmsksxpr/imageFileData/search?fileName=/${product.PrimaryImageUrl}`}
                        />
                    </div>

                    <div className="product-card__details">
            <span className="product-card__number">
              #{product.ProductNumber}
            </span>
                        <h3 className="product-card__name">{product.Name}</h3>
                        <p className="product-card__description">{product.Description}</p>

                        <div className="product-card__rating">
                            {renderStars(product.AverageRating)}
                        </div>

                        <div className="product-card__price">
                            ${product.BasePrice?.toFixed(2)}
                        </div>
                    </div>
                </Card>
        </div>
    );
};

export default ProductGrid;

