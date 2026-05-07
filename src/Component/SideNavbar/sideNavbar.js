import React from "react";
import "./sideNavbar.css";
import OtherHousesIcon from '@mui/icons-material/OtherHouses';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import RecentActorsIcon from "@mui/icons-material/RecentActors";
import HistoryIcon from "@mui/icons-material/History";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import SmartDisplayIcon from "@mui/icons-material/SmartDisplay";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ContentCutIcon from "@mui/icons-material/ContentCut";
import { Link } from "react-router-dom";

const SideNavbar = ({sideNavbar}) => {
  return (
      <div className={sideNavbar?"home-sideNavbar":"homeSideNavbarHide"}>
      <div className="home_sideNavbarTop">
        <div className={"home_sideNavbarTopOption"}>
          <OtherHousesIcon />
          <div className="home_sideNavbarTopOptionTitle">Home</div>
        </div>

        
<Link to="/reels" className="home_sideNavbar_link">
  <div className={"home_sideNavbarTopOption"}>
    <SlideshowIcon />
    <div className="home_sideNavbarTopOptionTitle">Shorts</div>
  </div>
</Link>

        <div className={"home_sideNavbarTopOption"}>
          <SubscriptionsIcon />
          <div className="home_sideNavbarTopOptionTitle">Subscription</div>
        </div>
      </div>
      <div className="home_sideNavbarMiddle">
        <div className={"home_sideNavbarTopOption"}>
          <div className="home_sideNavbarTopOptionTitle">You</div>
          <ChevronRightIcon />
        </div>
        <div className={"home_sideNavbarTopOption"}>
          <RecentActorsIcon />
          <div className="home_sideNavbarTopOptionTitle">Your Channel</div>
        </div>
        <div className={"home_sideNavbarTopOption"}>
          <HistoryIcon />
          <div className="home_sideNavbarTopOptionTitle">History</div>
        </div>
        <div className={"home_sideNavbarTopOption"}>
          <PlaylistAddIcon />
          <div className="home_sideNavbarTopOptionTitle">Playlist</div>
        </div>
        <div className={"home_sideNavbarTopOption"}>
          <SmartDisplayIcon />
          <div className="home_sideNavbarTopOptionTitle">Your videos</div>
        </div>
        <div className={"home_sideNavbarTopOption"}>
          <WatchLaterIcon />
          <div className="home_sideNavbarTopOptionTitle">Whatch later</div>
        </div>
        <div className={"home_sideNavbarTopOption"}>
          <ThumbUpIcon />
          <div className="home_sideNavbarTopOptionTitle">Liked videos</div>
        </div>
        <div className={"home_sideNavbarTopOption"}>
          <ContentCutIcon />
          <div className="home_sideNavbarTopOptionTitle">Your clips</div>
        </div>
      </div>

      <div className="home_sideNavbarMiddle">
        <div className="home_sideNavbarTopOption">
          <div className="home_sideNavbarTopOptionTitleHeader">
            Subscription
          </div>
        </div>

        <div className="home_sideNavbarTopOption">
          <img
            className="home_sideNavbar_ImgLogo"
            src="https://tse4.mm.bing.net/th/id/OIP.Auy5e_yPpkpidVF_ZRz7aQAAAA?w=404&h=316&rs=1&pid=ImgDetMain&o=7&rm=3"
            alt="Aaj Tak"
          />
          <div className="home_sideNavbarTopOptionTitle">Aaj Tak</div>
        </div>

        <div className="home_sideNavbarTopOption">
          <img
            className="home_sideNavbar_ImgLogo"
            src="https://tse1.mm.bing.net/th/id/OIP.At5eXfjQ0jLiO7tRFBjI_QAAAA?rs=1&pid=ImgDetMain&o=7&rm=3"
            alt="The LallanTop"
          />
          <div className="home_sideNavbarTopOptionTitle">The LallanTop</div>
        </div>

        <div className="home_sideNavbarTopOption">
          <img
            className="home_sideNavbar_ImgLogo"
            src="https://logodix.com/logo/2131933.jpg"
            alt="NDTV India"
          />
          <div className="home_sideNavbarTopOptionTitle">NDTV India</div>
        </div>

      </div>
    </div>
  );
};

export default SideNavbar;
