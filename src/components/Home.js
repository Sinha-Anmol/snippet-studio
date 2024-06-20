import Editor from "./Editor";
import { useEffect, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const Home = () => {
  const [html, setHtml] = useLocalStorage('html', '');
  const [css, setCss] = useLocalStorage('css', '');
  const [js, setJs] = useLocalStorage('js', '');
  const [srcDoc, setSrcDoc] = useState('');

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
        <html>
          <body>${html}</body>
          <style>${css}</style>
          <script>${js}</script>
        </html>
      `)
    }, 500);

    return () => clearTimeout(timeout);
  }, [html, css, js]);

  return (
    <div className="container">
      <div className="pane left-pane">
        <Editor 
          language='xml'
          displayName='HTML'
          value={html}
          onChange={setHtml}
        />
        <Editor 
          language='css'
          displayName='CSS'
          value={css}
          onChange={setCss}
        />
        <Editor 
          language='javascript'
          displayName='JS'
          value={js}
          onChange={setJs}
        />
      </div>
      <div className="pane right-pane">
        <iframe 
          srcDoc={srcDoc}
          title="output"
          sandbox="allow-scripts"
          className="output-frame"
        />
      </div>
    </div>
  );
}

export default Home;
