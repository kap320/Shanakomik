import Head from "next/head";
import Navbar from "./components/navbar/navbar";
import { Container, Row, Col, Card, Button, Image } from "react-bootstrap";
import { fetchHome } from "./components/apiData";
import { BsFire } from "react-icons/bs";
import { useEffect, useState } from "react";
import Link from "next/link";
export default function Home() {
  const [homeKomik, setHomeLatest] = useState([]);
  const [homeKomik2, setHomePopular] = useState([]);

  // function bypass gambar error
  function ImageOnError(e) {
    e.target.onerror = null;
    const base64img = btoa(e.target.src);

    return (e.target.src = `https://bypass.katowproject.my.id/?q=${base64img}`);
  }

  //function memanggil api dari file apiData
  async function getHome() {
    const res = await fetchHome();
    setHomeLatest(res.body.latest);
    setHomePopular(res.body.popular);
  }

  // Pemanggilan function
  useEffect(() => {
    getHome();
  }, []);

  return (
    <div>
      <Head>
        <title>Ryukomik | Tempat baca manga</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main>
        <div className="mb-3">
          <h2 style={{ fontFamily: "Poppins" }} className="container mt-5">
            Komik Populer <BsFire color="#fa7202" />
          </h2>
        </div>
        <Container>
          <hr />
          <Row>
            {homeKomik2.map((homeitems) => (
              <Col lg="4">
                <Link
                  href={`/${homeitems.link.endpoint}`}
                  className="text-decoration-none text-dark"
                >
                  <Image
                    src={homeitems.thumb}
                    height={300}
                    width={200}
                    onError={ImageOnError}
                    className="rounded mx-auto d-block "
                  ></Image>
                  <p
                    style={{ fontFamily: "Poppins" }}
                    className="mt-2 text-center font-weight-bold"
                  >
                    {homeitems.name}
                  </p>
                </Link>
              </Col>
            ))}
          </Row>
          <hr />
        </Container>
        <div className="mb-3">
          <h2 style={{ fontFamily: "Poppins" }} className="container mt-5">
            Komik Terbaru
          </h2>
        </div>
        <Container>
          <hr />
          <Row className="g-4">
            {homeKomik.map((homeitems) => (
              <Col className="col-lg-3 d-flex align-items-stretch">
                <Card>
                  <Card.Img
                    variant="top"
                    src={homeitems.thumb}
                    onError={ImageOnError}
                  />
                  <Card.Body>
                    <Card.Title style={{ fontFamily: "Poppins" }}>
                      {homeitems.name}
                    </Card.Title>
                    <Card.Text style={{ fontFamily: "Poppins" }}>
                      Baca {homeitems.name}
                    </Card.Text>
                    <Button
                      variant="danger"
                      style={{ fontFamily: "Poppins" }}
                      href={`/${homeitems.link.endpoint}`}
                    >
                      Baca sekarang!
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          <hr />
        </Container>
      </main>
    </div>
  );
}
