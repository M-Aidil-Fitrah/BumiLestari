// src/pages/TestLokiSimple.tsx
// Halaman simple untuk test logging

import { useState } from 'react';
import { supabase } from '@/lib/supabase';

const TestLokiSimple = () => {
  const [result, setResult] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const sendTestLog = async () => {
    setLoading(true);
    setResult('Sending...');

    try {
      const timestamp = `${Date.now() * 1000000}`;
      
      const payload = {
        streams: [{
          stream: {
            application: 'bumilestari-test',
            source: 'test-page',
            environment: 'test'
          },
          values: [[
            timestamp,
            JSON.stringify({
              message: 'Test log from React app!',
              timestamp: new Date().toISOString(),
              browser: navigator.userAgent
            })
          ]]
        }]
      };

      // ✅ Use supabase.functions.invoke()
      const { data, error } = await supabase.functions.invoke('log-to-loki', {
        body: payload
      });

      if (error) {
        setResult(`❌ Error: ${JSON.stringify(error, null, 2)}`);
      } else {
        setResult(`✅ Success!\n\n${JSON.stringify(data, null, 2)}\n\n⏱️  Wait 10 seconds, then check Grafana:\n{application="bumilestari-test"}`);
      }
    } catch (err: any) {
      setResult(`❌ Exception: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">🧪 Test Loki Logging</h1>
        
        <div className="bg-gray-800 p-6 rounded-lg mb-6">
          <h2 className="text-xl mb-4">Configuration</h2>
          <div className="space-y-2 text-sm font-mono">
            <p>✅ VITE_SUPABASE_URL: {import.meta.env.VITE_SUPABASE_URL ? 'Set' : '❌ Missing'}</p>
            <p>✅ VITE_SUPABASE_ANON_KEY: {import.meta.env.VITE_SUPABASE_ANON_KEY ? 'Set' : '❌ Missing'}</p>
          </div>
        </div>

        <button
          onClick={sendTestLog}
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white font-bold py-4 px-6 rounded-lg text-lg"
        >
          {loading ? '⏳ Sending...' : '🚀 Send Test Log to Loki'}
        </button>

        {result && (
          <div className="mt-6 bg-black p-6 rounded-lg">
            <h3 className="text-lg font-bold mb-2">Result:</h3>
            <pre className="whitespace-pre-wrap text-sm text-green-400">
              {result}
            </pre>
          </div>
        )}

        <div className="mt-8 bg-blue-900/20 p-6 rounded-lg border border-blue-500/30">
          <h3 className="text-lg font-bold mb-3">📋 Instructions</h3>
          <ol className="list-decimal list-inside space-y-2 text-sm">
            <li>Click the button above</li>
            <li>Wait for success message</li>
            <li>Wait 10 seconds for Loki to process</li>
            <li>Go to Grafana: <code className="bg-black px-2 py-1 rounded">https://bumilestari.grafana.net/explore</code></li>
            <li>Select data source: <code className="bg-black px-2 py-1 rounded">grafanacloud-bumilestari-logs</code></li>
            <li>Query: <code className="bg-black px-2 py-1 rounded">{`{application="bumilestari-test"}`}</code></li>
            <li>Click "Run query"</li>
            <li>Logs should appear! 🎉</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default TestLokiSimple;