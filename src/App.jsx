import './App.css'
import {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import CategoryCard from "./category-card";
const categoryPageBaseUrl = "/Commerce/Categories/GetCategories?$top=1000&api-version=7.3"
const fetchInventoryURL = "/Commerce/GetInventoryConfiguration()"


function App() {
    const [categories, setCategories] = useState([])
    const [parentCategories, setParentCategories] = useState([])
    const navigate = useNavigate()
    const channelId = useRef(null)
    const categoryId = useRef(null)

    const fetchInventory = async () => {
        try {
            const response = await axios.get(fetchInventoryURL, {
                headers: {
                    // "oun": "00000021",
                    "oun": import.meta.env.VITE_OUN,
                }
            })
            return response.data.RecordId;
        } catch (e) {
            console.log(e)
        }
    }

    const fetchCategories = async () => {
        try {
            const tempChannelId = await fetchInventory();
            channelId.current = tempChannelId
            const response = await axios.post(categoryPageBaseUrl,{"channelId":tempChannelId}, {
                headers: {
                    // "oun": "00000021",
                    "oun": import.meta.env.VITE_OUN,
                }
            })
            const parentAllCategory = response.data.value.map((category)=>category.ParentCategory)
            const uniqueParentCategoriesId = [...new Set(parentAllCategory)]
            const parentCategories  = [];
            const subCategory  = [];
                response.data.value.forEach(cat=> {
                    if (uniqueParentCategoriesId.includes(cat.RecordId)){
                        parentCategories.push(cat)
                    }else{
                        subCategory.push(cat)
                    }
                }
            )
            setParentCategories(parentCategories)
            setCategories(subCategory)
        } catch (e) {
            console.log(e)
        }
    }
    useEffect(()=>{
        fetchCategories();
    },[])

  return (
    <>
        {<h2 className="categories-title">Categories {categories?.value?.length&&`(${categories?.value?.length})`} </h2>}
        <div className="category-grid">
            {/*{parentCategories.map((parentCategory)=>{*/}
            {/*    {categories?.value?.map((cat) => {*/}
            {/*        if(cat.ParentCategory === parentCategory)*/}
            {/*        return  <CategoryCard cat={cat}/>*/}
            {/*    })}*/}
            {/*})}*/}
            {/*{parentCategories.map((cat) => {*/}
            {/*    return  <CategoryCard cat={cat}/>*/}
            {/*})}*/}
            {categories?.map((cat) => {
                return  <CategoryCard channelId={channelId.current} cat={cat}/>
            })}
        </div>
    </>
  )
}

export default App
