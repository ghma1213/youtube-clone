import React, { useEffect, useState } from "react";
import { Avatar, Col, Row, Typography, Card } from "antd";
import Axios from "axios";
import moment from "moment";

const { Title } = Typography;
const { Meta } = Card;

function Subscription() {
  const [Video, setVideo] = useState([]);
  useEffect(() => {
    const subscriptionVariables = {
      userFrom: localStorage.getItem("userId"),
    };
    Axios.post("/api/video/getSubscriptionVideos", subscriptionVariables).then(
      (response) => {
        if (response.data.success) {
          console.log(response.data);
          setVideo(response.data.videos);
        } else {
          alert("비디오 가져오기를 실패했습니다.");
        }
      }
    );
  }, []);

  const renderCards = Video.map((video, index) => {
    let minutes = Math.floor(video.duration / 60);
    let seconds = Math.floor(video.duration - minutes * 60);

    return (
      <Col lg={6} md={8} xs={24} key={index}>
        <div style={{ position: "relative" }}>
          <a href={`/video/${video._id}`}>
            <img
              style={{ width: "100%" }}
              src={`http://localhost:5000/${video.thumbnail}`}
            />
            <div className="duration">
              <span>
                {minutes} : {seconds}
              </span>
            </div>
          </a>
        </div>
        <br />
        <Meta
          avatar={<Avatar src={video.writer.image} />}
          title={video.title}
        />
        <span>{video.writer.name}</span> <br />
        <span style={{ marginLeft: "3rem" }}> {video.views}</span>-{" "}
        <span> {moment(video.createdAt).format("MMM Do YY")} </span>
      </Col>
    );
  });

  return (
    <div style={{ width: "85%", margin: "3rem auto" }}>
      <Title level={2}> Recommened</Title>
      <hr />
      <Row gutter={[32, 16]}>{renderCards}</Row>
    </div>
  );
}

export default Subscription;
