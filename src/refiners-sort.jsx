import React, {useState} from "react";
import {DownOutlined, UpOutlined} from  '@ant-design/icons';

const RefinerSorter = ({sortByDropdownOptions})=>{
   const [openModal, setOpenModal] = useState(false)

   return(
       <span onClick={()=>{setOpenModal(!openModal)}}> Filter {!openModal?<DownOutlined/>: <UpOutlined />} </span>
   );
}
export default RefinerSorter;



