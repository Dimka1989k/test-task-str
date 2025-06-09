
import "./Phychic.styles.css";
import iconProfile from "../../assets/icon-profile.png";
import greenIcon from "../../assets/Ellipse 1.png";
import iconStar from "../../assets/icon-star.png";
import iconChat from "../../assets/chat-icon.png";
import blueIconChat from "../../assets/blue-icon-chat.png";
import eyeIcon from "../../assets/eye-icon.png";
import iconSleep from "../../assets/icon-sleep.png";
import iconMingcute from "../../assets/mingcute-icon.png";
import iconCards from "../../assets/icon-cards.png";
import iconWork from "../../assets/work-icon.png";
import eclisse from "../../assets/eclipse 1x.png";

import { Link } from "react-router";


export default function Psychic() {  
  return (
    <section className="section-conatiner">
      <div className="eclipse">
        <img src={eclisse} alt="eclisse" />
      </div>
      <div className="container-hero">
        <div className="icon-container">
          <img className="icon-profile" src={iconProfile} alt="iconProfile" />
          <img className="icon-green" src={greenIcon} alt="greenIcon" />
        </div>
        <div>
          <div className="container-name">
            <p className="name">Dr. Sarah Johnson</p>
            <p className="love-txt">Love and Light</p>
          </div>
          <div className="container-descr">
            <div className="container-rating">
              <div className="rating-descr">
                <img
                  src={iconStar}
                  alt="iconStar"                  
                />
                <p className="txt">4.9</p>
              </div>
              <p className="text">Rating</p>
            </div>
            <div className="container-reviews">
              <div className="rating-descr">
                <img
                  src={blueIconChat}
                  alt="iconChat"                 
                />
                <p className="txt">31,872</p>
              </div>
              <p className="text">Reviews</p>
            </div>
            <div className="container-price">
              <p className="price">$1.99/min</p>
            </div>
          </div>
          <p className="text-descr">
            Licensed clinical psychologist with over 10 years of experience
            helping individuals overcome anxiety, depression, and life
            transitions. I use evidence-based approaches including Cognitive
            Behavioral Therapy (CBT) and mindfulness techniques.
          </p>
          <div className="container-btn">
            
            <Link
    className="btn-blue"
    to={localStorage.getItem("accessToken") ? "/chat" : "/login"}
    onClick={() => console.log("Link clicked, isLoggedIn =", !!localStorage.getItem("accessToken"))}
  >
    <img
      className="chat-icon-blue"
      src={iconChat}
      alt="iconChat"
      
    />
    Sign In to Chat
  </Link>
          </div>
        </div>
      </div>
      <div className="container-specialties">
        <p className="text-txt">Specialties</p>
        <ul className="specialties-toogle">
          <li className="specialties">
            <img
              src={eyeIcon}
              alt="eyeIcon"
              style={{ width: "19px", height: "19px" }}
            />
            <p>Psychic Readings</p>
          </li>
          <li className="specialties">
            <img
              src={iconCards}
              alt="iconCards"
              style={{ width: "19px", height: "19px" }}
            />
            <p>Taro Readings</p>
          </li>
          <li className="specialties">
            <img
              src={iconSleep}
              alt="iconSleep"
              style={{ width: "19px", height: "19px" }}
            />
            <p>Dream Alasysis</p>
          </li>
          <li className="specialties">
            <img
              src={iconMingcute}
              alt="iconMingcute"
              style={{ width: "19px", height: "19px" }}
            />
            <p>Love Psychics</p>
          </li>
          <li className="specialties">
            <img
              src={iconWork}
              alt="iconWork"
              style={{ width: "19px", height: "19px" }}
            />
            <p>Career Forecasts</p>
          </li>
        </ul>
      </div>
      <div className="container-client">
        <p className="text-txt">Client Reviews</p>
        <ul className="client-list">
          <li className="client-item">
            <div className="container-client-name">
              <div className="container">
                <p className="client-name">Jennifer M.</p>
                <div className="container-star">
                  <img
                    src={iconStar}
                    alt="iconStar"
                    style={{ width: 22, height: 22 }}
                  />
                  <img
                    src={iconStar}
                    alt="iconStar"
                    style={{ width: 22, height: 22 }}
                  />
                  <img
                    src={iconStar}
                    alt="iconStar"
                    style={{ width: 22, height: 22 }}
                  />
                  <img
                    src={iconStar}
                    alt="iconStar"
                    style={{ width: 22, height: 22 }}
                  />
                  <img
                    src={iconStar}
                    alt="iconStar"
                    style={{ width: 22, height: 22 }}
                  />
                </div>
              </div>
              <p className="client-date">2 weeks ago</p>
            </div>
            <p className="client-comment">
              Dr. Johnson was incredibly helpful and understanding. Her approach
              really helped me work through my anxiety.
            </p>
          </li>
          <li className="client-item">
            <div className="container-client-name">
              <div className="container">
                <p className="client-name">Jennifer M.</p>
                <div className="container-star">
                  <img
                    src={iconStar}
                    alt="iconStar"
                    style={{ width: 22, height: 22 }}
                  />
                  <img
                    src={iconStar}
                    alt="iconStar"
                    style={{ width: 22, height: 22 }}
                  />
                  <img
                    src={iconStar}
                    alt="iconStar"
                    style={{ width: 22, height: 22 }}
                  />
                  <img
                    src={iconStar}
                    alt="iconStar"
                    style={{ width: 22, height: 22 }}
                  />
                  <img
                    src={iconStar}
                    alt="iconStar"
                    style={{ width: 22, height: 22 }}
                  />
                </div>
              </div>
              <p className="client-date">1 month ago</p>
            </div>
            <p className="client-comment">
              Professional, knowledgeable, and caring. I highly recommend Dr.
              Johnson to anyone seeking therapy.
            </p>
          </li>
          <li className="client-item">
            <div className="container-client-name">
              <div className="container">
                <p className="client-name">Jennifer M.</p>
                <div className="container-star">
                  <img
                    src={iconStar}
                    alt="iconStar"
                    style={{ width: 22, height: 22 }}
                  />
                  <img
                    src={iconStar}
                    alt="iconStar"
                    style={{ width: 22, height: 22 }}
                  />
                  <img
                    src={iconStar}
                    alt="iconStar"
                    style={{ width: 22, height: 22 }}
                  />
                  <img
                    src={iconStar}
                    alt="iconStar"
                    style={{ width: 22, height: 22 }}
                  />
                  <img
                    src={iconStar}
                    alt="iconStar"
                    style={{ width: 22, height: 22 }}
                  />
                </div>
              </div>
              <p className="client-date">2 months ago</p>
            </div>
            <p className="client-comment">
              Great experience overall. The sessions were very insightful and
              practical.
            </p>
          </li>
        </ul>
      </div>
    </section>
  );
}
