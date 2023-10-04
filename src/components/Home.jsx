import React, { useEffect, useState } from "react";
import { Card, Typography } from "@material-tailwind/react";
import axios from "axios";

const TABLE_HEAD = ["#", "Date","Time", "รูปทะเบียนรถ", "ป้ายทะเบียน"];


    
const Home = () => {

    const [data, setData ] = useState([])

    const fetchData = async()=>{
        try {
            const res = await axios.get('http://localhost:5000/products')
            console.log(res.data);
            setData(res.data)
            
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        fetchData()
    },[])
  return (
   <div>
    <h1 className="my-4 mx-4 text-xl" >Image Processing </h1>
     <Card className="h-screen  overflow-scroll m-5">
    <table className="w-full min-w-max table-auto text-left">
      <thead>
        <tr>
          {TABLE_HEAD.map((head) => (
            <th
              key={head}
              className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
            >
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal leading-none opacity-70"
              >
                {head}
              </Typography>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => {
          const isLast = index === data.length - 1;
          const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

          return (
            <tr key={index}>
              <td className={classes}>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {index + 1}
                </Typography>
              </td>
              <td className={classes}>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {row.date}
                </Typography>
              </td>
              <td className={classes}>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {row.time}
                </Typography>
              </td>
              <td className={classes}>
                {/* <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {row.date}
                </Typography> */}
                <img  className=" rounded-lg shadow-xl shadow-blue-gray-900/50 w-30 object-cover object-center"src={`http://localhost:5000/images/${row.image}`} alt="" />
              </td>
              <td className={classes}>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {row.lp_text}
                </Typography>
              </td>
         
            </tr>
          );
        })}
      </tbody>
    </table>
  </Card>
   </div>
  );
};

export default Home;
