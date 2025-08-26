import React, {useEffect, useState, useRef} from 'react'
import axios from "axios";
import './plp-adventureworks.css'
import {useLocation, useParams} from "react-router";
import ProductCard from "./product-card";
import RefinerSorter from "./refiners-sort";
import Dropdown from './dropdown'

// when run locally use VITE_BASE_URL and deployment VITE_BASE_URL_PROD
const fetchAppProductsBaseURL = `/api/commerce/Products/SearchByCriteria?$top=5&$count=true&$orderby=Attr_5637148327%20desc`

const hideRating = false

const sortOptions = {
    relevanceDesc: 'Ranking-Desc',
    ratingAsc: 'AverageRating-Asc',
    ratingDesc: 'AverageRating-Desc',
    nameAsc: 'Name-Asc',
    nameDesc: 'Name-Desc',
    priceAsc: 'Price-Asc',
    priceDesc: 'Price-Desc',
    bestSelling: 'BestSelling',
    newScore: 'NewScore',
    trendingScore: 'TrendingScore'
};
const sortByOptionValues = {
    nameAsc: "Name: A to Z",
    nameDesc: "Name: Z to A",
    priceAsc: "Price: Low to High",
    priceDesc: "Price: High to Low",
    ratingDesc: "Rating: High to Low",
    bestSelling: "Best Selling",
    newScore: "New",
    trendingScore: "Trending",
    relevanceDesc: "Relevance",
}
const sortByDropdownOptions = [
    {key: sortOptions.relevanceDesc, value: sortByOptionValues.relevanceDesc},
    {key: sortOptions.nameAsc, value: sortByOptionValues.nameAsc},
    {key: sortOptions.nameDesc, value: sortByOptionValues.nameDesc},
    {key: sortOptions.priceAsc, value: sortByOptionValues.priceAsc},
    {key: sortOptions.priceDesc, value: sortByOptionValues.priceDesc},
    {key: sortOptions.ratingDesc, value: sortByOptionValues.ratingDesc},
    {key: sortOptions.bestSelling, value: sortByOptionValues.bestSelling},
    {key: sortOptions.newScore, value: sortByOptionValues.newScore},
    {key: sortOptions.trendingScore, value: sortByOptionValues.trendingScore}
];

function PlPAdventureworks() {
    const [products, setProducts] = useState();
    const [sortingState, setSortingState] = useState(sortByOptionValues.nameAsc);
    const allProductsRef = useRef(null)
    const params = useParams();
    const location = useLocation();
    const _getSortingDropDown = () => {
        const activeDropdown = sortingState;
        let dropdownOptions =  sortByDropdownOptions; // get how many options show in dropdown i think no need to show all option on every time
        if (hideRating) {
            dropdownOptions = dropdownOptions.filter(dropdownOption => dropdownOption.key !== sortOptions.sortByOptionRatingDesc);
        }
        return <Dropdown
            dropdownOptions={sortByDropdownOptions}
            selectedOption={activeDropdown}
            updateSortByDropdown={updateSortByDropdown}
        />
    };
    const searchByCategory = async () => {
        axios.post(fetchAppProductsBaseURL,
            {
                "searchCriteria": {
                    "Context": {
                        "ChannelId": location.state.channelId,
                        "CatalogId": parseInt(import.meta.env.VITE_CATALOG_ID)
                    },
                    "Refinement": [
                        // {
                        //     "RefinerRecordId": 0,
                        //     "DataTypeValue": 1,
                        //     "LeftValueBoundString": "17735.93",
                        //     "RightValueBoundString": "70321.5",
                        //     "UnitText": "AUD",
                        //     "RowNumber": 0,
                        //     "Count": 0,
                        //     "ExtensionProperties": [],
                        //     "RefinerSourceValue": 3,
                        //     "@odata.type": "#Microsoft.Dynamics.Commerce.Runtime.DataModel.ProductRefinerValue"
                        // }
                    ],
                    "IncludeAttributes": true,
                    "SkipVariantExpansion": true,
                    "CategoryIds": [
                        parseInt(location.state.categoryId),
                    ],
                }
            }, {
                headers: {
                    'Content-Type': "application/json",
                    'Content-Length': 561,
                    // "oun": "00000021",
                    "oun": import.meta.env.VITE_OUN,
                    "origin": "https://kom-ut.dynamics365commerce.ms",
                    "Accept": "*/*",
                    "Accept-Language": "en-au"
                }
            }
        )
            .then(function (response) {
                setProducts(response.data)
                allProductsRef.current = response.data;
            })
            .catch(function (error) {
                console.log(error);
            });


    }
    const updateSortByDropdown = (e) => {
        setSortingState(e);
        // show products according to sorter
        let newData = []
        switch (e) {
            case "Name: A to Z": {
                newData = allProductsRef.current.value.sort((product1, product2)=> product1.Name.localeCompare(product2.Name))
                break
            }
            case "Name: Z to A":{
                newData = allProductsRef.current.value.sort((product1, product2)=> product2.Name.localeCompare(product1.Name))
                break
            }
            case "Price: Low to High":{
                newData = allProductsRef.current.value.sort((product1, product2)=> product1.BasePrice - product2.BasePrice)
                break
            }
            case "Price: High to Low":{
                newData = allProductsRef.current.value.sort((product1, product2)=> product2.BasePrice - product1.BasePrice)
                break
            }
            case "Rating: High to Low":{
                break
            }

        }
        setProducts((prev)=>({...prev, value: newData}))

    }
    useEffect(() => {
        searchByCategory()
    }, [])

    return (
        <div style={{margin: 50}}>
            <h1>{params.name}{products?.value?.length && `(${products?.value?.length})`}</h1>
            <div style={{display: "flex", justifyContent: "space-between", minWidth: 1000}}>
                <RefinerSorter sortByDropdownOptions={sortByDropdownOptions} />
                {_getSortingDropDown()}
            </div>
            <div className="product-grid">
                {products?.value.map((product) => <ProductCard product={product}/>)}
            </div>
        </div>
    )
}

export default PlPAdventureworks;
