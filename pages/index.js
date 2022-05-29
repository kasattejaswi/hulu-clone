import Head from "next/head";
import Header from "../components/Header";
import Nav from "../components/Nav";
import Results from "../components/Results";
import requests from "../utils/requests";

export default function Home({ results }) {
    return (
        <div>
            <Head>
                <title>Hulu 2.0</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Header />
            <Nav />
            <Results results={results} />
        </div>
    );
}

export async function getServerSideProps(context) {
    const genre = context.query.genre;
    console.log(genre);
    let url = `https://api.themoviedb.org/3${
        requests[genre]?.url || requests.fetchTrending
    }`;
    console.log(url);
    const request = await fetch(url, {
        headers: {
            Accept: "application/json, text/plain, */*",
            "User-Agent":
                "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:100.0) Gecko/20100101 Firefox/100.0",
        },
    }).then((res) => {
        return res.json();
    });
    return {
        props: {
            results: request.results,
        },
    };
}
