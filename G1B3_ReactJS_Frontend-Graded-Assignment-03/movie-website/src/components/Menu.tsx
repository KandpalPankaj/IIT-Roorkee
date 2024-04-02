import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, Container, Row } from "react-bootstrap";
import { faFilm } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import OptionCard from "./OptionCard";
import LoadingIndicator from "./LoadingIndicator";
import { getMenuData } from "../services/Movie";
import PageNotFound from "./PageNotFound";

const baseUrl = "/";

const Menu = () => {
  const imgArray = [
    "image1.jpg",
    "image2.jpg",
    "image3.jpg",
    "image4.jpg",
    "image5.jpg",
  ];

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | Error>(null);
  const [menu, setMenu] = useState<string[]>([]);

  const getData = async () => {
    setLoading(true);
    setError(null);
    try {
      const menuData = await getMenuData();
      setMenu(menuData);
    } catch (error) {
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {loading && (
        <>
          <LoadingIndicator
            message="Loading..."
            size="large"
          ></LoadingIndicator>
        </>
      )}
      {!loading && error && (
        <>
          <PageNotFound></PageNotFound>
        </>
      )}
      <h1>
        <FontAwesomeIcon icon={faFilm} className="me-2" />
        Movie<span style={{ color: "#02a8c7" }}>OnTip</span>
      </h1>
      <p
        className="ms-3 font text-center"
        style={{ fontWeight: "bolder", fontSize: "32px" }}
      >
        <br />
        Welcome to the{" "}
        <a href="/" style={{ textDecoration: "none" }}>
          Movie<span style={{ color: "#02a8c7" }}>OnTip</span>
        </a>{" "}
        App.
      </p>
      <hr />
      {menu.length !== 0 && !loading && !error && (
        <>
          <div>
            <Container fluid style={{ paddingTop: "0%", paddingBottom: "0%" }}>
              <Row className="my-3">
                <p>
                  Movies on the Tip is an online movie manager whose
                  responsibility is to take care of all the activities a user
                  can do on this portal.{" "}
                </p>
                <p>Here you can explore the below activities...</p>
                <hr />
              </Row>
              <Row xs={2} md={5}>
                {menu.map((item, idx) => (
                  <Col className="my-3">
                    <OptionCard
                      ImgUrl={`${imgArray[idx]}`}
                      RedirectUrl={`${baseUrl}`}
                      OptionName={item.replace(/-/g, " ")}
                    ></OptionCard>
                  </Col>
                ))}
              </Row>
            </Container>
          </div>
        </>
      )}
      <br />
      <p>
        And enjoy the Experience on{" "}
        <a href="/" style={{ textDecoration: "none" }}>
          Movie<span style={{ color: "#02a8c7" }}>OnTip</span>
        </a>{" "}
        .
      </p>
    </>
  );
};

export default Menu;
