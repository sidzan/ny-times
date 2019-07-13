import * as React from "react";
import { style, cssRaw } from "typestyle";
cssRaw(`
.post-module {
position: relative;
z-index: 1;
display: block;
background: #FFFFFF;
min-width: 270px;
height: 470px;
-webkit-box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.15);
-moz-box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.15);
box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.15);
-webkit-transition: all 0.3s linear 0s;
-moz-transition: all 0.3s linear 0s;
-ms-transition: all 0.3s linear 0s;
-o-transition: all 0.3s linear 0s;
transition: all 0.3s linear 0s;
}
.post-module:hover,
.hover {
-webkit-box-shadow: 0px 1px 35px 0px rgba(0, 0, 0, 0.3);
-moz-box-shadow: 0px 1px 35px 0px rgba(0, 0, 0, 0.3);
box-shadow: 0px 1px 35px 0px rgba(0, 0, 0, 0.3);
}
.post-module:hover .thumbnail img,
.hover .thumbnail img {
-webkit-transform: scale(1.1);
-moz-transform: scale(1.1);
transform: scale(1.1);
opacity: 0.6;
}
.post-module .thumbnail {
background: #000000;
height: 400px;
overflow: hidden;
}
.post-module .thumbnail .date {
position: absolute;
top: 20px;
right: 20px;
z-index: 1;
background: #e74c3c;
width: 55px;
height: 55px;
padding: 12.5px 0;
-webkit-border-radius: 100%;
-moz-border-radius: 100%;
border-radius: 100%;
color: #FFFFFF;
font-weight: 700;
text-align: center;
-webkti-box-sizing: border-box;
-moz-box-sizing: border-box;
box-sizing: border-box;
}
.post-module .thumbnail .date .day {
font-size: 18px;
}
.post-module .thumbnail .date .month {
font-size: 12px;
text-transform: uppercase;
}
.post-module .thumbnail img {
display: block;
width: 120%;
-webkit-transition: all 0.3s linear 0s;
-moz-transition: all 0.3s linear 0s;
-ms-transition: all 0.3s linear 0s;
-o-transition: all 0.3s linear 0s;
transition: all 0.3s linear 0s;
}
.post-module .post-content {
position: absolute;
bottom: 0;
background: #FFFFFF;
width: 100%;
padding: 30px;
-webkti-box-sizing: border-box;
-moz-box-sizing: border-box;
box-sizing: border-box;
-webkit-transition: all 0.3s cubic-bezier(0.37, 0.75, 0.61, 1.05) 0s;
-moz-transition: all 0.3s cubic-bezier(0.37, 0.75, 0.61, 1.05) 0s;
-ms-transition: all 0.3s cubic-bezier(0.37, 0.75, 0.61, 1.05) 0s;
-o-transition: all 0.3s cubic-bezier(0.37, 0.75, 0.61, 1.05) 0s;
transition: all 0.3s cubic-bezier(0.37, 0.75, 0.61, 1.05) 0s;
}
.post-module .post-content .category {
position: absolute;
top: -34px;
left: 0;
background: #e74c3c;
padding: 10px 15px;
color: #FFFFFF;
font-size: 14px;
font-weight: 600;
text-transform: uppercase;
}
.post-module .post-content .title {
margin: 0;
padding: 0 0 10px;
color: #333333;
font-size: 26px;
font-weight: 700;
}
.post-module .post-content .sub_title {
margin: 0;
padding: 0 0 20px;
color: #e74c3c;
font-size: 20px;
font-weight: 400;
}
.post-module .post-content .description {
display: none;
color: #666666;
font-size: 14px;
line-height: 1.8em;
}
.post-module .post-content .post-meta {
margin: 30px 0 0;
color: #999999;
}
.post-module .post-content .post-meta .timestamp {
margin: 0 16px 0 0;
}
.post-module .post-content .post-meta a {
color: #999999;
text-decoration: none;
}
.hover .post-content .description {
display: block !important;
height: auto !important;
opacity: 1 !important;
}
.container {
max-width: 800px;
min-width: 640px;
margin: 0 auto;
}
.container:before,
.container:after {
content: "";
display: block;
clear: both;
}
.container .column {
width: 50%;
padding: 0 25px;
-webkti-box-sizing: border-box;
-moz-box-sizing: border-box;
box-sizing: border-box;
float: left;
}
.container .column .demo-title {
margin: 0 0 15px;
color: #666666;
font-size: 18px;
font-weight: bold;
text-transform: uppercase;
}
.container .info {
width: 300px;
margin: 50px auto;
text-align: center;
}
.container .info h1 {
margin: 0 0 15px;
padding: 0;
font-size: 24px;
font-weight: bold;
color: #333333;
}
.container .info span {
color: #666666;
font-size: 12px;
}
.container .info span a {
color: #000000;
text-decoration: none;
}
.container .info span .fa {
color: #e74c3c;
}`
)

const cardStyle = style({
    $nest: {
        // IMPORTANT PART
        '&:hover': {
            boxShadow: "0 8px 16px 0 rgba(0,0,0,0.2)"
        },
        ".container": {
            padding: "2px 16px",
        }
    },
    boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
    transition: "0.3s",
    width: "40%"
});

export interface IProps {
    day: string;
    month: string;
    category: string;
    title: string;
    subTitle: string;
    description: string;
    img: string;
}

class Card extends React.Component<IProps> {
    public render(): JSX.Element {
        const { title, subTitle, img, category, description, day, month } = this.props;
        return (
            <div className={cardStyle}>
                <div className="post-module">
                    <div className="thumbnail">
                        <div className="date">
                            <div className="day">{day}</div>
                            <div className="month">{month}</div>
                        </div><img src={img} />
                    </div>
                    <div className="post-content">
                        <div className="category">{category}</div>
                        <h1 className="title">{title}</h1>
                        <h2 className="sub_title">{subTitle}</h2>
                        <p className="description">{description}</p>
                        {/* <div className="post-meta"><span className="timestamp"><i className="fa fa-clock-">o</i> 6 mins ago</span><span className="comments"><i className="fa fa-comments"></i><a href="#"> 39 comments</a></span></div> */}
                    </div>
                </div>
            </div>
        )
    }
}

export { Card }
