import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";
import Link from "next/link";

export default function Home() {
  const [input, setInput] = useState("");
  const[creativityCheckValue, setCreativity] = useState(false);
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    console.log(creativityCheckValue);
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          msg: input,
          temp: creativityCheckValue
        }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setResult(data.result);
      setInput("");
    } catch(error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div>
      <Head>
        <title>OpenAI Quickstart</title>
        <link rel="icon" href="/favicon.png" />
      </Head>

      <main className={styles.main}>
        <Link href="https://chaitanyabhardwaj.github.io">
          <img src="/favicon.png" className={styles.img} width="90px" height="auto" />
        </Link>
        <h3>Suggest a data structure for the following situations</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="msg"
            placeholder="Describe the situation or use case..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <input type="submit" value="Generate"/>
          <div className={styles.row}>
            <b>Creativity Mode</b>
            <input type="checkbox" className={styles.checkbox} name="temp1" onChange={(e) => setCreativity(e.target.checked)} />
          </div>
        </form>
        <div className={styles.result}>{result}</div>
      </main>
    </div>
  );
}
