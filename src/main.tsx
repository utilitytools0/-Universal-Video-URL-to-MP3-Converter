import { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { open } from '@tauri-apps/plugin-dialog';
import { Command } from '@tauri-apps/plugin-shell';
import './style.css';

function App() {
  const [video, setVideo] = useState('');
  const [language, setLanguage] = useState('es');
  const [status, setStatus] = useState('Ready');

  async function chooseVideo() {
    const selected = await open({ multiple: false, filters: [{ name: 'Video', extensions: ['mp4', 'mkv', 'mov', 'avi', 'webm'] }] });
    if (typeof selected === 'string') setVideo(selected);
  }

  async function createDub() {
    if (!video) return;
    setStatus('Processing locally...');
    try {
      const command = Command.create('video_pipeline', [video, language]);
      command.stdout.on('data', (line) => setStatus(String(line)));
      const result = await command.execute();
      setStatus(result.code === 0 ? 'Completed' : 'Pipeline failed');
    } catch (error) {
      setStatus(String(error));
    }
  }

  return <main>
    <header><h1>Video Language Changer</h1><p>Free offline dubbing with preserved scene timing.</p></header>
    <section className="card">
      <button onClick={chooseVideo}>Choose video</button>
      <p className="path">{video || 'No video selected'}</p>
      <label>Target language
        <select value={language} onChange={(event) => setLanguage(event.target.value)}>
          <option value="es">Spanish</option><option value="hi">Hindi</option><option value="fr">French</option><option value="de">German</option><option value="ja">Japanese</option>
        </select>
      </label>
      <button className="primary" disabled={!video} onClick={createDub}>Create dubbed video</button>
      <p className="status">{status}</p>
    </section>
    <section className="card"><h2>Synchronization</h2><p>Each translated segment is fitted to its original timestamp. The video stream is copied unchanged to prevent scene drift.</p></section>
  </main>;
}

createRoot(document.getElementById('root')!).render(<App />);
