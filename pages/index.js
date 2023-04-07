import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";
import Link from "next/link";

export default function Home() {
  const [input, setInput] = useState("");
  const[creativityCheckValue, setCreativity] = useState(false);
  const [result, setResult] = useState();
  const [impl, setImpl] = useState("");
  const [implLang, setImplLang] = useState("C");

  async function onSubmit(event) {
    event.preventDefault();
    setImpl("");
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          msg: input,
          temp: creativityCheckValue
        })
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setResult("Suggestion: " + data.result);
      setInput("");
    } catch(error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  async function implement() {
    setImpl("");
    const results = result.split(',');
    let ans = '';
    for(const e of results) {
      try {
        const res = await fetch("/api/implement", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ds: e.trim(),
            lang: implLang
          })
        });
      const data = await res.json();
      if (res.status !== 200) {
        throw data.error || new Error(`Request failed with status ${res.status}`);
      }
      ans += data.result.replace(/(?:\r\n|\r|\n)/g,'<br>') + '<hr><br>';
      console.log(ans);
      }catch(error) {
        // Consider implementing your own error handling logic here
        console.error(error);
        alert(error.message);
      }
    }
    console.log('completed');
    setImpl(ans);
    setInput("");
  }

  return (
    <div>
      <Head>
        <title>OpenAI Quickstart</title>
        <link rel="icon" href="/favicon.png" />
      </Head>

      <main className={styles.main}>
        <Link href="https://chaitanyabhardwaj.github.io">
          <img src="/favicon.png" className={styles.img} width="65px" height="auto" />
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
        <div className={styles.row} style={{marginTop: "20px"}}>
          <button type="button" onClick={implement}>Implementation -&gt; {result}</button>
          <span style={{marginLeft:"10px"}}>in</span>
          <input
              type="text"
              name="impl-lang"
              placeholder="C"
              value={implLang}
              onChange={(e) => setImplLang(e.target.value)}
              className={styles.implLang}
            />
        </div>
        <div className={impl == ''?'':styles.impl} dangerouslySetInnerHTML={{__html: impl}}></div>
      </main>
    </div>
  );
}
