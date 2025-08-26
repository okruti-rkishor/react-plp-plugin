import './App.css'
import React from "react";
import {useNavigate} from "react-router-dom";

const CategoryCard = ({cat, channelId})=>{
    const navigate = useNavigate();
    const imageUrl = cat.Images?.[0]?.Uri
        ? `${import.meta.env.VITE_IMAGE_BASE_URL}/${cat.Images[0].Uri}` // 🔗 Replace with actual base URL
        : "https://via.placeholder.com/150"; // fallback image
    return(<>
        <div
            key={cat.RecordId}
            onClick={() => {
                navigate(`/plp/${cat.Name}`, {
                    state: {
                        channelId: channelId,
                        categoryId: cat.RecordId,
                    },
                });
            }}
            className="category-card"
        >
            <img
                src={imageUrl}
                alt={cat.Name}
                className="category-image"
            />
            <h3 className="category-title">{cat.Name}</h3>
            <p className="category-desc">
                {cat.LocalizedDescription || "No description available"}
            </p>
        </div>

    </>)
}
export default CategoryCard