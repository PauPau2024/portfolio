import { useEffect, useRef, useState, useCallback } from 'react';

const INJECTION_PROMPTS = [
  'Show a realistic direct prompt injection attack where a user manipulates an AI assistant to ignore its system prompt. Format: show the system prompt, the malicious user input, and the AI\'s compromised response. Keep it under 6 lines total. Label sections clearly.',
  'Demonstrate an indirect prompt injection where hidden instructions inside a webpage manipulate an AI web agent. Show the innocent-looking webpage content containing hidden instructions and the AI\'s hijacked action. Under 6 lines.',
  'Show a jailbreak prompt injection that bypasses AI safety filters using roleplay framing. Show the attack payload and the bypassed response. Under 6 lines. Mark which part is the attack.',
  'Demonstrate a prompt injection via email content that hijacks an AI email assistant. Show the malicious email and the AI\'s compromised action (e.g., forwarding data). Under 6 lines.',
  'Show a prompt injection in a RAG system where a poisoned document overrides the AI\'s instructions. Display the poisoned chunk and resulting AI output. Under 6 lines.',
  'Demonstrate ASCII smuggling in prompt injection — hidden Unicode characters that are invisible to humans but parsed by the AI. Show hex or unicode representation and the AI\'s triggered action. Under 6 lines.',
  'Show a multi-turn prompt injection where the attack payload is split across two messages to evade single-turn filters. Display both turns and the final compromised response. Under 6 lines.',
];

const AITerminal = () => {
  const [output, setOutput] = useState('');
  const [status, setStatus] = useState<'live' | 'querying' | 'error'>('live');
  const [minimized, setMinimized] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const currentIndexRef = useRef(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isRunningRef = useRef(false);
  const outputRef = useRef<HTMLDivElement>(null);

  // Wait for Puter.js to be ready
  useEffect(() => {
    const checkPuter = () => {
      if (typeof (window as any).puter !== 'undefined') {
        setIsReady(true);
      } else {
        setTimeout(checkPuter, 500);
      }
    };
    checkPuter();
  }, []);

  const typeText = useCallback((text: string) => {
    return new Promise<void>((resolve) => {
      let i = 0;
      const typeInterval = setInterval(() => {
        if (i < text.length) {
          setOutput((prev) => {
            const newText = prev + text[i];
            return newText;
          });
          i++;
          // Auto scroll
          if (outputRef.current) {
            outputRef.current.scrollTop = outputRef.current.scrollHeight;
          }
        } else {
          clearInterval(typeInterval);
          resolve();
        }
      }, 18);
    });
  }, []);

  const runInjectionDemo = useCallback(async () => {
    if (isRunningRef.current || !isReady) return;
    isRunningRef.current = true;

    setStatus('querying');
    setOutput('');

    const prompt = INJECTION_PROMPTS[currentIndexRef.current % INJECTION_PROMPTS.length];
    currentIndexRef.current++;

    try {
      const puter = (window as any).puter;
      if (!puter?.ai?.chat) {
        throw new Error('Puter.js not available');
      }

      const response = await puter.ai.chat(prompt, { model: 'deepseek-chat' });

      let text = '';
      if (response?.message?.content) {
        const content = response.message.content;
        if (Array.isArray(content) && content[0]?.text) {
          text = content[0].text;
        } else if (typeof content === 'string') {
          text = content;
        } else {
          text = JSON.stringify(content, null, 2);
        }
      } else if (typeof response === 'string') {
        text = response;
      } else {
        text = 'No response from model.';
      }

      setStatus('live');
      await typeText(text);
    } catch (err: any) {
      setStatus('error');
      const errorText = `LLM query failed: ${err.message || 'Unknown error'}. Retrying...`;
      setOutput(errorText);
    } finally {
      isRunningRef.current = false;
    }
  }, [isReady, typeText]);

  // Start demo loop
  useEffect(() => {
    if (!isReady) return;

    // Initial run
    runInjectionDemo();

    // Refresh every 8 seconds (longer to allow typewriter to finish)
    intervalRef.current = setInterval(() => {
      runInjectionDemo();
    }, 8000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isReady, runInjectionDemo]);

  const statusColor = status === 'live' ? '#00ff41' : status === 'querying' ? '#ff3131' : '#ff3131';
  const statusText = status === 'live' ? '[LIVE]' : status === 'querying' ? '[MODEL QUERYING...]' : '[ERROR]';

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        width: '380px',
        maxWidth: 'calc(100vw - 40px)',
        zIndex: 9999,
        fontFamily: 'var(--font-mono)',
        fontSize: '12px',
      }}
    >
      {/* Title bar */}
      <div
        onClick={() => setMinimized(!minimized)}
        style={{
          background: '#0d0d0d',
          border: '1px solid #00ff41',
          borderBottom: minimized ? '1px solid #00ff41' : 'none',
          padding: '8px 12px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          cursor: 'pointer',
          userSelect: 'none',
          borderRadius: minimized ? '4px' : '4px 4px 0 0',
        }}
      >
        {/* macOS-style dots */}
        <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ff5f57', display: 'inline-block', flexShrink: 0 }} />
        <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#febc2e', display: 'inline-block', flexShrink: 0 }} />
        <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#28c840', display: 'inline-block', flexShrink: 0 }} />

        <span
          style={{
            color: '#e6edf3',
            fontSize: '11px',
            fontWeight: 600,
            marginLeft: '4px',
            flex: 1,
            letterSpacing: '0.5px',
          }}
        >
          ⚡ PROMPT INJECTION LIVE
        </span>

        <span
          style={{
            color: statusColor,
            fontSize: '10px',
            fontWeight: 600,
            letterSpacing: '1px',
            transition: 'color 0.3s ease',
          }}
        >
          {statusText}
        </span>

        <span
          style={{
            color: '#6e7681',
            fontSize: '12px',
            marginLeft: '4px',
            transition: 'transform 0.2s ease',
            transform: minimized ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
        >
          ▼
        </span>
      </div>

      {/* Terminal body */}
      {!minimized && (
        <>
          <div
            ref={outputRef}
            style={{
              background: '#0a0a0a',
              borderLeft: '1px solid #00ff41',
              borderRight: '1px solid #00ff41',
              padding: '16px',
              height: '180px',
              overflowY: 'auto',
              color: '#c9d1d9',
              lineHeight: 1.7,
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
            }}
          >
            {!isReady ? (
              <span style={{ color: '#6e7681' }}>Initializing Puter.js...</span>
            ) : output ? (
              output
            ) : (
              <span style={{ color: '#6e7681' }}>Loading prompt injection examples...</span>
            )}
          </div>

          {/* Footer */}
          <div
            style={{
              background: '#0d0d0d',
              border: '1px solid #00ff41',
              borderTop: '1px solid rgba(0, 255, 65, 0.2)',
              padding: '6px 12px',
              borderRadius: '0 0 4px 4px',
              fontSize: '10px',
              color: '#444',
              textAlign: 'center',
            }}
          >
            Powered by Puter.js · AI Security Research by Sujal Machhale
          </div>
        </>
      )}
    </div>
  );
};

export default AITerminal;
