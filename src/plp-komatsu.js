import React, {useEffect, useState} from 'react'
import './App.css'
import axios from "axios";
import Card from "antd/es/card";
const fetchInventoryURL = "/Commerce/GetInventoryConfiguration()"
const fetchAppProductsBaseURL = "/Commerce/Products/SearchByCriteria?$top=3&$count=true&$orderby=Attr_5637148327%20desc"

function PLPKomatsu() {
    const [products, setProducts] = useState();
    const fetchInventory = async ()=>{
        try{
            const response = await axios.get(fetchInventoryURL, {
                headers:{
                    "oun": "00000021",
                }
            })
            return response.data.RecordId;
        }catch (e) {
            console.log(e)
        }
    }
    const searchByCategory = async ()=>{
        const channelId = await fetchInventory();
        console.log(channelId)
        axios.post(fetchAppProductsBaseURL,
            {
                "searchCriteria": {
                    "Context": {
                        // "ChannelId": 5637144576,
                        "ChannelId": channelId,
                        "CatalogId": parseInt(import.meta.env.VITE_CATALOG_ID_KOM)
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
                        5637164077
                    ]
                }
            },{
                headers:{
                    'Content-Type': "application/json",
                    'Content-Length': 561,
                    // "oun": "00000021",
                    "oun": import.meta.env.VITE_OUN_KOM,
                    "origin": "https://kom-ut.dynamics365commerce.ms",
                    "Accept": "*/*",
                    "Accept-Language":"en-au"
                }}
        )
            .then(function (response) {
                setProducts(response.data)
                // console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });


    }
    useEffect(()=> {
        searchByCategory()
    },[])

    return (
        <>

            {products.value.map((product)=><Card>
                <EyeOutlined />
            </Card>)}
        </>
    )
}

export default PLPKomatsu
