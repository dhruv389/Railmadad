import React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";

import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import { IoMenu } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa6";

import { PiBagSimpleFill } from "react-icons/pi";
import { MdOutlineAccountCircle } from "react-icons/md";
import { IoCart } from "react-icons/io5";

import Badge from "@mui/material/Badge";
import { Link } from "react-router-dom";
// import InboxIcon from '@mui/icons-material/MoveToInbox';
// import MailIcon from '@mui/icons-material/Mail';
import { FaTrainSubway } from "react-icons/fa6";
import { HiMiniBuildingLibrary } from "react-icons/hi2";
import { RiFileList3Fill } from "react-icons/ri";
import { FaBuildingUser } from "react-icons/fa6";
import { IoHome } from "react-icons/io5";


export default function Sidebar() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
       <List>
       <div className="pl-6 mt-2 py-2 text-sm ">
          <div className="h-20">
          <b>Welcome to RailMadad</b>
          <p>To access account and Send your Enquiry</p>
          </div>
          
          <Link to="/login">

            
            <button className="w-[60%] flex gap-4 justify-center rounded-lg items-center py-2   p-1 bg-red-500 text-white  hover:bg-red-400 font-medium text-[12px] ">
              <FaTrainSubway  fontSize={"20px"} />
              LOGIN / SIGNUP
            </button>{" "}
          </Link>
        </div>


        <Link to="/">

<ListItemButton>
  <ListItemIcon>
    <IoHome   fontSize={"20px"} />
  </ListItemIcon>
  <p>Home</p>
</ListItemButton>
</Link>


        <Link to="dashboard/train">

          <ListItemButton>
            <ListItemIcon>
              <FaTrainSubway fontSize={"20px"} />
            </ListItemIcon>
            <p>Train</p>
          </ListItemButton>
        </Link>


        <Link to="/list_item">
          <ListItemButton>
            <ListItemIcon>

              <HiMiniBuildingLibrary  fontSize={"20px"} />
            </ListItemIcon>

            <p>Station</p>
          </ListItemButton>
        </Link>

        <Link to="/cart">
          <ListItemButton>
            <ListItemIcon>
              <Badge badgeContent={4} color="error">

                {" "}
                <RiFileList3Fill  fontSize={"20px"} />{" "}
              </Badge>
            </ListItemIcon>
           Apprecian
          </ListItemButton>
        </Link>

        <Link to="/wishlist">
          <ListItemButton>
            <ListItemIcon>

              <Badge badgeContent={4} color="primary">

                {" "}
                <FaBuildingUser fontSize={"20px"} />{" "}
              </Badge>
            </ListItemIcon>
           Track Your query
          </ListItemButton>
        </Link>
        
      </List>
    </Box>
  );

  return (
    <div>
      <Button   onClick={toggleDrawer(true)} style={{ minWidth: "10px" }}>
        <IoMenu fontSize={"25px"} color="black" />
      </Button>
      <Drawer  open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}