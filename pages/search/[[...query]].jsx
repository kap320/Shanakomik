import React from "react";
import { fetchSearch } from "../components/apiData";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Navbar from "../components/navbar/navbar";
import Head from "next/head";
import { Container, Row, Col, Card, Button, Pagination } from "react-bootstrap";

export default function search() {
  const router = useRouter();
  const { query } = router.query;
  console.log(router.query);
  const q = query ? query[0] : null;
  const page = query ? query[2] : null;
  const [usSearch, setSearch] = useState([]);
  const [buttonPage, setButton] = useState([]);

  async function getSearch() {
    const res = await fetchSearch(q, page);
    setSearch(res.mangas);
    const pagination = paginationHandling(res.pagination);
    setButton(pagination);
    console.log(res);
  }

  function ImageOnError(e) {
    e.target.onerror = null;
    const base64img = btoa(e.target.src);

    return (e.target.src = `https://bypass.katowproject.my.id/?q=${base64img}`);
  }

  //Function pagination
  function paginationHandling(pagination) {
    const arr = [];
    for (const p of pagination) {
      if (!p.url || !p.endpoint) {
        arr.push(
          <Pagination.Item
            key={p.name}
            style={{ fontFamily: "Poppins" }}
            active
          >
            {p.name}
          </Pagination.Item>
        );
      } else {
        let page = p.endpoint?.match(/\d+/g).pop();
        let query = p.endpoint?.split("/")[1];
        if (!page) page = "1";
        arr.push(
          <Pagination.Item
            key={p.name}
            href={`/search/${query}/page/${page}`}
            as={`/search/${query}/page/${page}`}
            style={{ fontFamily: "Poppins" }}
          >
            {p.name}
          </Pagination.Item>
        );
      }
    }

    return arr;
  }

  useEffect(() => {
    if (!router.isReady) return;
    getSearch(query);
  }, [router.isReady]);

  return (
    <div>
      <Head>
        <title>Ryukomik | Tempat baca manga</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <div className="mb-3">
        <h2 style={{ fontFamily: "Poppins" }} className="container mt-5">
          Daftar Komik
        </h2>
      </div>
      <Container>
        <hr />
        <Row className="g-4">
          {usSearch.map((pageitems) => (
            <Col className="col-lg-3 d-flex align-items-stretch">
              <Card>
                <Card.Img
                  variant="top"
                  src={pageitems.thumb}
                  onError={ImageOnError}
                />
                <Card.Body>
                  <Card.Title style={{ fontFamily: "Poppins" }}>
                    {pageitems.name}
                  </Card.Title>
                  <Card.Text style={{ fontFamily: "Poppins" }}>
                    Baca {pageitems.name}
                  </Card.Text>
                  <Button
                    variant="danger"
                    href={`/${pageitems.link.endpoint}`}
                    style={{ fontFamily: "Poppins" }}
                  >
                    Baca sekarang!
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
          <Pagination className="justify-content-center" size="lg">
            {buttonPage}
          </Pagination>
        </Row>
      </Container>
    </div>
  );
}
