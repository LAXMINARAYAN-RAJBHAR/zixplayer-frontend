import React from "react";
import "./profile.css";
import SideNavbar from "../../Component/SideNavbar/sideNavbar";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { reelsData } from "../../Component/Reels/reels";

const usersData = {
  jyoti: {
    name: "Jyoti",
    handle: "@User1",
    videos: 4,
    about: "About Section of Jyoti's channel",
    profilePic:
      "https://tse2.mm.bing.net/th/id/OIP.B-XQ4jOwe6ORilA0uQWGzQHaHa?w=740&h=740&rs=1&pid=ImgDetMain&o=7&rm=3",
  },
  rahul: {
    name: "Rahul",
    handle: "@User2",
    videos: 2,
    about: "About Section of Rahul's channel",
    profilePic: "https://randomuser.me/api/portraits/men/2.jpg",
  },
  laxminarayan: {
    name: "Laxminarayan",
    handle: "@laxminarayan",
    videos: 1,
    about: "Laxminarayan's channel",
    profilePic: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  anuradha: {
    name: "Anuradha",
    handle: "@anuradha",
    videos: 1,
    about: "Anuradha's channel",
    profilePic: "https://randomuser.me/api/portraits/men/3.jpg",
  },
  karthik: {
    name: "Karthik",
    handle: "@karthik",
    videos: 1,
    about: "Karthik's channel",
    profilePic: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  shyamnarayan: {
    name: "Shyamnarayan",
    handle: "@shyamnarayan",
    videos: 25,
    about: "Shyamnarayan's channel",
    profilePic: "https://randomuser.me/api/portraits/men/5.jpg",
  },
};

const Profile = ({ sideNavbar }) => {
  const { username } = useParams();
  const user = usersData[username];
  const userReels = reelsData.filter(
    (r) => r.username.toLowerCase() === username?.toLowerCase(),
  );

  if (!user) {
    return (
      <div style={{ color: "white", padding: "20px" }}>User not found!</div>
    );
  }

  return (
    <div className="profile">
      <SideNavbar sideNavbar={sideNavbar} />

      <div className={sideNavbar ? "profile_page" : "profile_page_inactive"}>
        {/* ── Top Section ── */}
        <div className="profile_top_section">
          <div className="profile_top_section_profile">
            <img
              className="profile_top_section_img"
              src={user.profilePic}
              alt={user.name}
            />
          </div>
          <div className="profile_top_section_About">
            <div className="profile_top_section_About_Name">{user.name}</div>
            <div className="profile_top_section_info">
              {user.handle} · {user.videos} videos
            </div>
            <div className="profile_top_section_info">{user.about}</div>
          </div>
        </div>

        {/* ── Videos Section ── */}
        <div className="profile_videos">
          <div className="profile_videos_title">
            Videos &nbsp; <ArrowRightIcon />
          </div>
          <div className="profileVideos">
            
            <Link to="/video/6" className="profileVideo_block">
              <div className="profileVideo_block_thumbnail">
                <img
                  className="profileVideo_block_thumbnail_img"
                  src="https://damassets.autodesk.net/content/dam/autodesk/www/industry/3d-animation/create-beautiful-3d-animations-thumb-1204x677.jpg"
                  alt=""
                />
              </div>
              <div className="profileVideo_block_detail">
                <div className="profileVideo_block_detai_name">
                  3D Animation Solutions
                </div>
                <div className="profileVideo_block_detai_about">
                  Created at 2024-09-12
                </div>
              </div>
            </Link>

            {/* <Link to="/video/8999" className="profileVideo_block">
              <div className="profileVideo_block_thumbnail">
                <img
                  className="profileVideo_block_thumbnail_img"
                  src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/48864a65-f142-40ff-9435-6701bef7955b/dlmyzqf-dc03db76-5564-4ee3-89a8-642606e3063d.png/v1/fill/w_1192,h_670,q_70,strp/_wwe_wrestlemania_42_2026_v2___mc_remake_by_wrestlingprimespace_dlmyzqf-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTU0OCIsInBhdGgiOiIvZi80ODg2NGE2NS1mMTQyLTQwZmYtOTQzNS02NzAxYmVmNzk1NWIvZGxteXpxZi1kYzAzZGI3Ni01NTY0LTRlZTMtODlhOC02NDI2MDZlMzA2M2QucG5nIiwid2lkdGgiOiI8PTI3NTIifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.FRcll9a5fPDX1_IjbVuFtezGZ2AEanuu0ZiYBi7f69c"
                  alt=""
                />
              </div>
              <div className="profileVideo_block_detail">
                <div className="profileVideo_block_detai_name">
                  WWE WRESTLEMENIA 2026
                </div>
                <div className="profileVideo_block_detai_about">
                  Created at 2024-09-12
                </div>
              </div>
            </Link>

            <Link to="/video/9000" className="profileVideo_block">
              <div className="profileVideo_block_thumbnail">
                <img
                  className="profileVideo_block_thumbnail_img"
                  src="https://img.youtube.com/vi/CN0lNff-zm0/maxresdefault.jpg"
                  alt=""
                />
              </div>
              <div className="profileVideo_block_detail">
                <div className="profileVideo_block_detai_name">
                  Dhurandhar: The Revenge
                </div>
                <div className="profileVideo_block_detai_about">
                  Created at 2024-09-12
                </div>
              </div>
            </Link> */}
          </div>
        </div>

        {/* ── Reels Section ── */}
        {userReels.length > 0 && (
          <div className="profile_videos" style={{ marginTop: "30px" }}>
            <div className="profile_videos_title">
              Reels &nbsp; <ArrowRightIcon />
            </div>
            <div className="profileVideos">
              {userReels.map((reel) => (
                <Link
                  to="/reels"
                  key={reel.id}
                  className="profileVideo_block"
                  state={{ reelId: reel.id }}
                >
                  <div
                    className="profileVideo_block_thumbnail"
                    style={{ position: "relative" }}
                  >
                    <img
                      className="profileVideo_block_thumbnail_img"
                      src={reel.thumbnail}
                      alt={reel.title}
                    />
                    <span
                      style={{
                        position: "absolute",
                        top: "6px",
                        left: "6px",
                        background: "rgba(0,0,0,0.7)",
                        color: "white",
                        fontSize: "10px",
                        padding: "2px 6px",
                        borderRadius: "4px",
                        fontWeight: "600",
                      }}
                    >
                      🎬 Reel
                    </span>
                    <span
                      style={{
                        position: "absolute",
                        bottom: "6px",
                        right: "6px",
                        background: "rgba(0,0,0,0.7)",
                        color: "white",
                        fontSize: "11px",
                        padding: "2px 5px",
                        borderRadius: "4px",
                      }}
                    >
                      {reel.duration}
                    </span>
                  </div>
                  <div className="profileVideo_block_detail">
                    <div className="profileVideo_block_detai_name">
                      {reel.title}
                    </div>
                    <div className="profileVideo_block_detai_about">
                      {reel.description}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
