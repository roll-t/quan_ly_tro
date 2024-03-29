import { useEffect, useMemo, useRef } from "react";
import Banner from "../../components/Banner";
import { Image } from "react-bootstrap";
import GroupTextVertical from "../../components/GroupTextVertical";
import TittleContentLv3 from "../../components/TittleContentLv3";
import imglv3_1 from "../../assets/images/titlelv3_1.png";
import imglv3_2 from "../../assets/images/titlelv3_2.png";
import Contact from "../../components/Contact";
import Footer from "../../components/Footer";

// scss
import styles from "./UserHomePage.module.scss";
import classNames from "classNames/bind";
import FeedbackOfCustomer from "../../components/FeedbackOfCustomer";
import { useSearchParams } from "react-router-dom";
const cx = classNames.bind(styles);

function UserHomePage() {
  let [search] = useSearchParams();
  const feedbackRef = useRef(null);

  const bodyTitleContent1 = useMemo(
    () => [
      {
        title: "Find accommodation quickly",
        content: (
          <span>
            With <span className="hight-pink"> Future Motel</span>, finding
            accommodation is easier than ever. We offer an advanced search
            engine that allows you to filter results by location, price,
            utilities and many other factors. You can search and compare hostel
            options, helping you make smart decisions.
          </span>
        ),
      },
      {
        title: "Make sure to provide exact location",
        content: (
          <span>
            The location of the inn is verified by
            <span className="hight-pink"> Future Motel</span>, so there is no
            such thing as a virtual location
          </span>
        ),
      },
    ],
    []
  );

  const bodyTitleContent2 = useMemo(
    () => [
      {
        title: "Find accommodation quickly",
        content: (
          <span>
            When using our property management website, we guarantee the
            accuracy and reliability of posted information through
            <span className="hight-pink">
              &nbsp;The RoomsOwn - Renting Simplified&nbsp;
            </span>
            Verified Blue Tick. This signifies that all listings have undergone
            thorough checks and verification by our professional admin team
            before appearing on the website.
          </span>
        ),
      },
      {
        title: "Start Your Room Rental Journey Today",
        content: (
          <span>
            Ready to find your ideal room? Explore
            <span className="hight-pink"> Future Motel</span> and embark on a
            stress-free room rental journey. With our user-friendly interface,
            verified listings, and reliable support, you can find a room that
            feels like home.
          </span>
        ),
      },
    ],
    []
  );

  useEffect(() => {
    const comp = search.get("comp");
    comp &&
      feedbackRef?.current &&
      feedbackRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
  });

  return (
    <div className={cx("wrap")}>
      <div>
        <Banner />
        {/* <GroupTextVertical
          title={
            <>
              Cancel anytime.
              <br />
              No obligations.
            </>
          }
          content="All of our rental subscriptions automatically renew at the end of
          their period (either monthly or quarterly) for convenience.
          However, you have the flexibility to cancel at any time to prevent
          this renewal if you do not plan to continue your subscription for
          the next payment period. See more FAQs for further information."
        /> */}

        <div className="container">
          <div style={{ margin: "80px 0" }} className="row">
            <div className="col-md-5 col-12 ">
              <TittleContentLv3
                contentArray={bodyTitleContent1}
                header="DESIGNER SEARCH"
                title="Reliable Search"
              />
            </div>
            <div className="col-md-7 col-12 d-flex align-items-center justify-content-center">
              <Image className={cx("img")} src={imglv3_1} />
            </div>
          </div>
          <div
            style={{ margin: "80px 0" }}
            className={cx("reverse-item", "row")}
          >
            <div className="col-md-7 col-12 d-flex align-items-center justify-content-center ">
              <Image
                className={cx("img", "rounded", "bg-light", "shadow")}
                src="https://cdn.pixabay.com/photo/2019/06/01/11/04/plant-4243898_1280.jpg"
              />
            </div>
            <div className="col-md-5 col-12 ">
              <TittleContentLv3
                right
                contentArray={bodyTitleContent2}
                header="Verified Blue Tick"
                title="Admin's Verified Blue Tick - Ensuring Accuracy and Reliability"
              />
            </div>
          </div>
          <div ref={feedbackRef}>
            <Contact></Contact>
          </div>

          {/* Feedbacks of customer */}

          <FeedbackOfCustomer></FeedbackOfCustomer>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default UserHomePage;
